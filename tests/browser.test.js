const assert = require('node:assert/strict');
const { after, before, describe, it } = require('node:test');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

function waitFor(check, timeout = 10000) {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    function poll() {
      try {
        const value = check();
        if (value) {
          resolve(value);
          return;
        }
      } catch (error) {
        reject(error);
        return;
      }
      if (Date.now() - startedAt >= timeout) {
        reject(new Error(`Timed out after ${timeout}ms`));
        return;
      }
      setTimeout(poll, 25);
    }
    poll();
  });
}

function startServer() {
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, 'http://127.0.0.1');
    const pathname = decodeURIComponent(requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname);
    const filePath = path.resolve(rootDir, `.${pathname}`);
    if (!filePath.startsWith(`${rootDir}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    fs.stat(filePath, (statError, stat) => {
      if (statError || !stat.isFile()) {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(200, {
        'Cache-Control': 'no-store',
        'Content-Type': mimeTypes.get(path.extname(filePath)) || 'application/octet-stream',
      });
      fs.createReadStream(filePath).pipe(response);
    });
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({
        close: () => new Promise((done) => server.close(done)),
        origin: `http://127.0.0.1:${port}`,
        url: `http://127.0.0.1:${port}/`,
      });
    });
  });
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);
  const executable = candidates.find((candidate) => fs.existsSync(candidate));
  assert.ok(executable, 'Chrome or Chromium is required for rendered-page tests');
  return executable;
}

async function stopProcess(processHandle) {
  if (processHandle.exitCode !== null) return;
  const exited = new Promise((resolve) => processHandle.once('exit', resolve));
  processHandle.kill('SIGTERM');
  await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 3000))]);
  if (processHandle.exitCode === null) processHandle.kill('SIGKILL');
}

async function launchChrome() {
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'heritage-poster-chrome-'));
  const processHandle = spawn(findChrome(), [
    '--headless=new',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-sandbox',
    '--remote-debugging-address=127.0.0.1',
    '--remote-debugging-port=0',
    `--user-data-dir=${profileDir}`,
    'about:blank',
  ], { stdio: 'ignore' });
  const portFile = path.join(profileDir, 'DevToolsActivePort');
  let port;
  try {
    port = await waitFor(() => {
      if (processHandle.exitCode !== null) throw new Error(`Chrome exited with code ${processHandle.exitCode}`);
      if (!fs.existsSync(portFile)) return undefined;
      return Number(fs.readFileSync(portFile, 'utf8').split('\n')[0]);
    }, 30000);
  } catch (error) {
    await stopProcess(processHandle);
    fs.rmSync(profileDir, { force: true, recursive: true });
    throw error;
  }

  return {
    port,
    stop: async () => {
      await stopProcess(processHandle);
      fs.rmSync(profileDir, { force: true, recursive: true });
    },
  };
}

class CdpPage {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    this.requests = [];
    this.responses = [];
    socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${message.error.message} (${message.error.code})`));
        else pending.resolve(message.result);
        return;
      }
      const handlers = this.listeners.get(message.method) || [];
      handlers.forEach((handler) => handler(message.params));
    });
    this.on('Network.requestWillBeSent', ({ request, type }) => {
      this.requests.push({ type, url: request.url });
    });
    this.on('Network.responseReceived', ({ response, type }) => {
      this.responses.push({ status: response.status, type, url: response.url });
    });
  }

  static async create(port) {
    const response = await fetch(`http://127.0.0.1:${port}/json/new?about%3Ablank`, { method: 'PUT' });
    assert.equal(response.status, 200, 'Chrome should create a test page');
    const target = await response.json();
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    });
    const page = new CdpPage(socket);
    await Promise.all([
      page.send('Accessibility.enable'),
      page.send('Network.enable'),
      page.send('Page.enable'),
      page.send('Runtime.enable'),
    ]);
    return page;
  }

  on(event, handler) {
    const handlers = this.listeners.get(event) || [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
  }

  once(event) {
    return new Promise((resolve) => {
      const handler = (params) => {
        const handlers = this.listeners.get(event) || [];
        this.listeners.set(event, handlers.filter((candidate) => candidate !== handler));
        resolve(params);
      };
      this.on(event, handler);
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { reject, resolve });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const { result, exceptionDetails } = await this.send('Runtime.evaluate', {
      awaitPromise: true,
      expression,
      returnByValue: true,
    });
    if (exceptionDetails) throw new Error(exceptionDetails.text || 'Browser evaluation failed');
    return result.value;
  }

  async goto(url) {
    this.requests.length = 0;
    this.responses.length = 0;
    const loaded = this.once('Page.loadEventFired');
    await this.send('Page.navigate', { url });
    await loaded;
    await this.evaluate('document.fonts.ready.then(() => true)');
  }

  async viewport(width, height) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      deviceScaleFactor: 1,
      height,
      mobile: false,
      width,
    });
  }

  async motion(value) {
    await this.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value }],
      media: 'screen',
    });
  }

  async wait(milliseconds = 75) {
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async waitUntil(expression, timeout = 2000) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeout) {
      if (await this.evaluate(expression)) return;
      await this.wait(25);
    }
    throw new Error(`Browser condition timed out: ${expression}`);
  }

  async screenshot(filePath) {
    const { data } = await this.send('Page.captureScreenshot', {
      captureBeyondViewport: false,
      format: 'png',
      fromSurface: true,
    });
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
  }

  close() {
    this.socket.close();
  }
}

function parseColor(value) {
  const channels = value.match(/[\d.]+/g).map(Number);
  return {
    a: channels.length > 3 ? channels[3] : 1,
    b: channels[2],
    g: channels[1],
    r: channels[0],
  };
}

function composite(foreground, background) {
  return {
    a: 1,
    b: foreground.b * foreground.a + background.b * (1 - foreground.a),
    g: foreground.g * foreground.a + background.g * (1 - foreground.a),
    r: foreground.r * foreground.a + background.r * (1 - foreground.a),
  };
}

function luminance({ r, g, b }) {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(foreground, background) {
  const foregroundLuminance = luminance(composite(foreground, background));
  const backgroundLuminance = luminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
}

let app;
let browser;
let page;

before(async () => {
  app = await startServer();
  browser = await launchChrome();
  page = await CdpPage.create(browser.port);
  await page.viewport(1440, 900);
  await page.motion('no-preference');
  await page.goto(app.url);
});

after(async () => {
  page?.close();
  await browser?.stop();
  await app?.close();
});

describe('Rendered semantic structure', () => {
  it('exposes landmarks, headings, artwork, credits, and disclaimer', async () => {
    const { nodes } = await page.send('Accessibility.getFullAXTree');
    const roles = nodes.map((node) => node.role?.value).filter(Boolean);
    const headings = nodes.filter((node) => node.role?.value === 'heading');
    const images = nodes.filter((node) => node.role?.value === 'image');
    const visibleContent = await page.evaluate(`(() => {
      const disclaimer = document.querySelector('.disclaimer');
      const credits = [...document.querySelectorAll('.site-footer nav a')];
      const rect = disclaimer.getBoundingClientRect();
      return {
        disclaimer: disclaimer.innerText,
        disclaimerVisible: getComputedStyle(disclaimer).display !== 'none' && rect.width > 0 && rect.height > 0,
        h1Count: document.querySelectorAll('h1').length,
        language: document.documentElement.lang,
        prohibitedMediaCount: document.querySelectorAll('canvas, video, audio').length,
        sourceLinks: credits.map((link) => ({ href: link.href, text: link.innerText })),
      };
    })()`);

    assert.ok(roles.includes('main'));
    assert.ok(roles.includes('contentinfo'));
    assert.ok(roles.includes('navigation'));
    assert.equal(headings.filter((node) => node.properties?.some((property) => property.name === 'level' && property.value?.value === 1)).length, 1);
    assert.ok(images.some((node) => /bottle silhouette/i.test(node.name?.value || '')));
    assert.equal(visibleContent.language, 'en');
    assert.equal(visibleContent.h1Count, 1);
    assert.equal(visibleContent.disclaimerVisible, true);
    assert.match(visibleContent.disclaimer, /independent/i);
    assert.match(visibleContent.disclaimer, /non-commercial/i);
    assert.match(visibleContent.disclaimer, /unofficial/i);
    assert.match(visibleContent.disclaimer, /not affiliated/i);
    assert.ok(visibleContent.sourceLinks.length >= 3);
    assert.equal(visibleContent.prohibitedMediaCount, 0);
  });

  it('supports keyboard access through the skip link', async () => {
    await page.goto(app.url);
    await page.evaluate('document.activeElement.blur(); window.scrollTo(0, 0)');
    const hiddenSkipLink = await page.evaluate(`(() => {
      const rect = document.querySelector('.skip-link').getBoundingClientRect();
      return { bottom: rect.bottom, top: rect.top };
    })()`);
    assert.ok(hiddenSkipLink.bottom <= -1, `unfocused skip link remains visible at ${hiddenSkipLink.bottom}px`);
    await page.send('Input.dispatchKeyEvent', { code: 'Tab', key: 'Tab', type: 'keyDown', windowsVirtualKeyCode: 9 });
    await page.send('Input.dispatchKeyEvent', { code: 'Tab', key: 'Tab', type: 'keyUp', windowsVirtualKeyCode: 9 });
    await page.wait(250);
    const focusedSkipLink = await page.evaluate(`(() => {
      const active = document.activeElement;
      const rect = active.getBoundingClientRect();
      const style = getComputedStyle(active);
      return { className: active.className, outlineStyle: style.outlineStyle, top: rect.top };
    })()`);
    assert.equal(focusedSkipLink.className, 'skip-link');
    assert.equal(focusedSkipLink.top, 0);
    assert.notEqual(focusedSkipLink.outlineStyle, 'none');

    await page.send('Input.dispatchKeyEvent', { code: 'Enter', key: 'Enter', type: 'keyDown', windowsVirtualKeyCode: 13 });
    await page.send('Input.dispatchKeyEvent', { code: 'Enter', key: 'Enter', type: 'keyUp', windowsVirtualKeyCode: 13 });
    await page.wait();
    const destination = await page.evaluate('({ hash: location.hash, id: document.activeElement.id })');
    assert.equal(destination.hash, '#main-content');
    assert.equal(destination.id, 'main-content');
  });

  it('keeps the primary headline visible when enhancement fails', async () => {
    await page.send('Network.setBlockedURLs', { urls: ['*/js/main.js'] });
    await page.goto(app.url);
    const headline = await page.evaluate(`(() => {
      const line = document.querySelector('.reveal-line');
      const rect = line.getBoundingClientRect();
      const style = getComputedStyle(line);
      return {
        height: rect.height,
        opacity: style.opacity,
        transform: style.transform,
        width: rect.width,
      };
    })()`);
    assert.equal(headline.opacity, '1');
    assert.equal(headline.transform, 'none');
    assert.ok(headline.width > 0 && headline.height > 0);
    await page.send('Network.setBlockedURLs', { urls: [] });
    await page.goto(app.url);
  });
});

describe('Loaded asset provenance', () => {
  it('loads only local artwork and open font resources', async () => {
    await page.goto(app.url);
    const allowedOrigins = new Set([app.origin, 'https://fonts.googleapis.com', 'https://fonts.gstatic.com']);
    const resourceTypes = new Set(['Document', 'Font', 'Image', 'Media', 'Script', 'Stylesheet']);
    const resourceRequests = page.requests.filter((request) => resourceTypes.has(request.type));
    resourceRequests.forEach((request) => {
      const url = new URL(request.url);
      assert.ok(allowedOrigins.has(url.origin), `Unexpected loaded resource origin: ${url.origin}`);
      assert.ok(!/(^|\.)(coca-cola\.com|coca-colacompany\.com|coke\.com)$/i.test(url.hostname));
    });

    const localResponses = page.responses.filter((response) => new URL(response.url).origin === app.origin);
    const successfulPaths = new Set(localResponses.filter((response) => response.status >= 200 && response.status < 400).map((response) => new URL(response.url).pathname));
    assert.ok(successfulPaths.has('/'));
    assert.ok(successfulPaths.has('/css/style.css'));
    assert.ok(successfulPaths.has('/js/main.js'));
    assert.ok(localResponses.every((response) => response.status >= 200 && response.status < 400));
  });
});

describe('Responsive layout and rendered contrast', () => {
  const viewports = [
    ['desktop', 1920, 1080],
    ['laptop', 1280, 800],
    ['short-laptop', 1280, 600],
    ['tablet', 768, 1024],
    ['mobile', 375, 667],
    ['narrow-mobile', 320, 568],
  ];

  for (const [name, width, height] of viewports) {
    it(`keeps the ${name} composition inside its viewport`, async () => {
      await page.viewport(width, height);
      await page.motion('no-preference');
      await page.goto(app.url);
      await page.wait(850);
      const layout = await page.evaluate(`(() => {
        const canvas = document.querySelector('.poster-canvas').getBoundingClientRect();
        const selectors = ['.poster-meta', '.poster-headline', '.poster-subhead', '.bottle-silhouette', '.fact-rail'];
        const children = selectors.map((selector) => {
          const rect = document.querySelector(selector).getBoundingClientRect();
          return { selector, bottom: rect.bottom, left: rect.left, right: rect.right, top: rect.top };
        });
        const ink = [...document.querySelectorAll('.reveal-line')].map((line) => {
          const range = document.createRange();
          range.selectNodeContents(line);
          const rect = range.getBoundingClientRect();
          return { bottom: rect.bottom, left: rect.left, right: rect.right, text: line.textContent, top: rect.top };
        });
        const rectFor = (selector) => {
          const rect = document.querySelector(selector).getBoundingClientRect();
          return { bottom: rect.bottom, left: rect.left, right: rect.right, top: rect.top };
        };
        return {
          bottle: rectFor('.bottle-silhouette'),
          canvas: { bottom: canvas.bottom, left: canvas.left, right: canvas.right, top: canvas.top, ratio: canvas.height / canvas.width },
          children,
          ink,
          headline: rectFor('.poster-headline'),
          headlineFontSize: parseFloat(getComputedStyle(document.querySelector('.poster-headline')).fontSize),
          innerWidth,
          rail: rectFor('.fact-rail'),
          meta: rectFor('.poster-meta'),
          scrollWidth: document.documentElement.scrollWidth,
          subhead: rectFor('.poster-subhead'),
        };
      })()`);

      assert.equal(layout.innerWidth, width);
      assert.ok(layout.scrollWidth <= width + 1, `${name} creates horizontal overflow`);
      assert.ok(layout.canvas.left >= -1 && layout.canvas.right <= width + 1);
      layout.children.forEach((child) => {
        assert.ok(child.left >= layout.canvas.left - 1, `${child.selector} clips on the left at ${name}`);
        assert.ok(child.right <= layout.canvas.right + 1, `${child.selector} clips on the right at ${name}`);
        assert.ok(child.top >= layout.canvas.top - 1, `${child.selector} clips above the canvas at ${name}`);
        assert.ok(child.bottom <= layout.canvas.bottom + 1, `${child.selector} clips below the canvas at ${name}`);
      });
      layout.ink.forEach((line) => {
        assert.ok(line.left >= layout.canvas.left - 1, `${line.text} ink clips on the left at ${name}`);
        assert.ok(line.right <= layout.canvas.right + 1, `${line.text} ink clips on the right at ${name}`);
        assert.ok(line.top >= layout.canvas.top - 1, `${line.text} ink clips above the canvas at ${name}`);
        assert.ok(line.bottom <= layout.canvas.bottom + 1, `${line.text} ink clips below the canvas at ${name}`);
        assert.ok(line.left >= layout.headline.left - 1, `${line.text} ink overflows the headline on the left at ${name}`);
        assert.ok(line.right <= layout.headline.right + 1, `${line.text} ink overflows the headline on the right at ${name}`);
      });
      const overlapArea = (first, second) => Math.max(0, Math.min(first.right, second.right) - Math.max(first.left, second.left))
        * Math.max(0, Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top));
      assert.equal(overlapArea(layout.bottle, layout.meta), 0, `bottle covers poster metadata at ${name}`);
      assert.equal(overlapArea(layout.bottle, layout.subhead), 0, `bottle covers poster subhead at ${name}`);
      assert.equal(overlapArea(layout.bottle, layout.rail), 0, `bottle covers fact rail at ${name}`);
      assert.equal(overlapArea(layout.subhead, layout.rail), 0, `subhead covers fact rail at ${name}`);
      layout.ink.forEach((line) => {
        assert.equal(overlapArea(layout.bottle, line), 0, `bottle covers ${line.text} at ${name}`);
      });
      if (name === 'desktop' || name.includes('laptop')) {
        assert.ok(Math.abs(layout.canvas.ratio - Math.SQRT2) < 0.01, `${name} poster is not A-series ratio`);
      }
      if (name.includes('mobile')) {
        assert.ok(layout.headlineFontSize >= 48, `mobile headline is ${layout.headlineFontSize}px instead of at least 48px`);
      }
      if (process.env.UPDATE_SCREENSHOTS === '1' && ['desktop', 'laptop', 'tablet', 'mobile'].includes(name)) {
        await page.screenshot(path.join(rootDir, 'tests', 'screenshots', `${name}.png`));
      }
    });

    it(`meets rendered contrast at ${name} width`, async () => {
      await page.viewport(width, height);
      await page.motion('no-preference');
      await page.goto(app.url);
      const checks = [
        ['.poster-headline', 3],
        ['.year-badge', 3],
        ['.year-prefix', 4.5],
        ['.poster-subhead', 4.5],
        ['.fact-label', 4.5],
        ['.context-content p', 4.5],
        ['.disclaimer', 4.5],
        ['.site-footer a', 4.5],
      ];

      for (const [selector, minimum] of checks) {
        const sample = await page.evaluate(`(async () => {
          const element = document.querySelector(${JSON.stringify(selector)});
          element.scrollIntoView({ behavior: 'instant', block: 'center' });
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          if (element.matches('.reveal-line') || element.closest('.scroll-reveal')) {
            await new Promise((resolve) => setTimeout(resolve, 850));
          }
          const rect = element.getBoundingClientRect();
          const x = Math.max(0, Math.min(innerWidth - 1, rect.left + rect.width / 2));
          const y = Math.max(0, Math.min(innerHeight - 1, rect.top + rect.height / 2));
          const ownBackground = getComputedStyle(element).backgroundColor;
          const alpha = (color) => {
            const channels = color.match(/[\\d.]+/g) || [];
            return channels.length > 3 ? Number(channels[3]) : 1;
          };
          const stack = document.elementsFromPoint(x, y);
          const elementIndex = stack.indexOf(element);
          const candidates = elementIndex >= 0 ? stack.slice(elementIndex + 1) : stack;
          const ancestorBackground = (() => {
            let candidate = element.parentElement;
            while (candidate && alpha(getComputedStyle(candidate).backgroundColor) === 0) candidate = candidate.parentElement;
            return candidate;
          })();
          const backgroundElement = alpha(ownBackground) > 0
            ? element
            : candidates.find((candidate) => alpha(getComputedStyle(candidate).backgroundColor) > 0) || ancestorBackground;
          return {
            background: getComputedStyle(backgroundElement || document.body).backgroundColor,
            foreground: getComputedStyle(element).color,
          };
        })()`);
        const ratio = contrast(parseColor(sample.foreground), parseColor(sample.background));
        assert.ok(ratio >= minimum, `${selector} at ${name}: ${ratio.toFixed(2)}:1 is below ${minimum}:1`);
      }

      const linkRect = await page.evaluate(`(() => {
        const link = document.querySelector('.site-footer a');
        link.scrollIntoView({ block: 'center' });
        const rect = link.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })()`);
      await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: linkRect.x, y: linkRect.y });
      await page.wait(25);
      const hoverColors = await page.evaluate(`(() => {
        const link = document.querySelector('.site-footer a');
        return {
          background: getComputedStyle(document.querySelector('.site-footer')).backgroundColor,
          foreground: getComputedStyle(link).color,
        };
      })()`);
      const hoverRatio = contrast(parseColor(hoverColors.foreground), parseColor(hoverColors.background));
      assert.ok(hoverRatio >= 4.5, `footer hover at ${name}: ${hoverRatio.toFixed(2)}:1 is below 4.5:1`);
    });
  }
});

describe('Motion preferences and print output', () => {
  it('keeps mobile reveals static without a transition', async () => {
    await page.viewport(375, 667);
    await page.motion('no-preference');
    await page.goto(app.url);
    const mobileMotion = await page.evaluate(`(() => {
      const selectors = ['.reveal-line', '.scroll-reveal'];
      return selectors.map((selector) => {
        const style = getComputedStyle(document.querySelector(selector));
        return {
          opacity: style.opacity,
          selector,
          transform: style.transform,
          transitionDuration: style.transitionDuration,
        };
      });
    })()`);
    mobileMotion.forEach((state) => {
      assert.equal(state.opacity, '1', `${state.selector} should be immediately visible on mobile`);
      assert.equal(state.transform, 'none', `${state.selector} should not translate on mobile`);
      assert.equal(state.transitionDuration, '0s', `${state.selector} should not transition on mobile`);
    });
  });

  it('reveals scrolled content and responds to reduced motion changes', async () => {
    await page.viewport(1440, 900);
    await page.motion('no-preference');
    await page.goto(app.url);
    const initial = await page.evaluate(`({
      contextVisible: document.querySelector('.scroll-reveal').classList.contains('is-visible'),
      discTransform: document.querySelector('.red-disc').style.transform,
    })`);
    assert.equal(initial.contextVisible, false);

    await page.evaluate("document.querySelector('.context-panel').scrollIntoView({ block: 'center' })");
    await page.waitUntil("document.querySelector('.scroll-reveal').classList.contains('is-visible')");
    assert.equal(await page.evaluate("document.querySelector('.scroll-reveal').classList.contains('is-visible')"), true);
    assert.notEqual(await page.evaluate("document.querySelector('.red-disc').style.transform"), '');

    await page.motion('reduce');
    await page.waitUntil(`(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const bottle = document.querySelector('.bottle-silhouette');
      const disc = document.querySelector('.red-disc');
      return reduced
        && bottle.style.transform === ''
        && disc.style.transform === ''
        && getComputedStyle(bottle).transform === 'none'
        && getComputedStyle(disc).transform === 'none';
    })()`);
    const reduced = await page.evaluate(`({
      allRevealed: [...document.querySelectorAll('.reveal-line, .scroll-reveal')].every((element) => element.classList.contains('is-visible')),
      bottleInlineTransform: document.querySelector('.bottle-silhouette').style.transform,
      bottleTransform: getComputedStyle(document.querySelector('.bottle-silhouette')).transform,
      discInlineTransform: document.querySelector('.red-disc').style.transform,
      discTransform: getComputedStyle(document.querySelector('.red-disc')).transform,
    })`);
    assert.equal(reduced.allRevealed, true);
    assert.equal(reduced.bottleInlineTransform, '');
    assert.equal(reduced.discInlineTransform, '');
    assert.equal(reduced.bottleTransform, 'none');
    assert.equal(reduced.discTransform, 'none');
    if (process.env.UPDATE_SCREENSHOTS === '1') {
      await page.evaluate('window.scrollTo(0, 0)');
      await page.wait();
      await page.screenshot(path.join(rootDir, 'tests', 'screenshots', 'reduced-motion.png'));
    }
  });

  it('prints exactly one A2 poster page without supporting sections', async () => {
    await page.send('Emulation.setEmulatedMedia', { media: 'print' });
    await page.goto(app.url);
    const printLayout = await page.evaluate(`(() => {
      const poster = document.querySelector('.poster-canvas').getBoundingClientRect();
      return {
        contextDisplay: getComputedStyle(document.querySelector('.context-panel')).display,
        footerDisplay: getComputedStyle(document.querySelector('.site-footer')).display,
        posterVisible: poster.width > 0 && poster.height > 0,
      };
    })()`);
    assert.equal(printLayout.contextDisplay, 'none');
    assert.equal(printLayout.footerDisplay, 'none');
    assert.equal(printLayout.posterVisible, true);

    const { data } = await page.send('Page.printToPDF', {
      preferCSSPageSize: true,
      printBackground: true,
    });
    const pdf = Buffer.from(data, 'base64').toString('latin1');
    const pageObjects = pdf.match(/\/Type\s*\/Page(?!s)/g) || [];
    const mediaBox = pdf.match(/\/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/);
    assert.equal(pageObjects.length, 1);
    assert.ok(mediaBox, 'printed PDF should declare a media box');
    const widthPoints = Number(mediaBox[3]) - Number(mediaBox[1]);
    const heightPoints = Number(mediaBox[4]) - Number(mediaBox[2]);
    assert.ok(Math.abs(widthPoints - 1190.55) < 3, `printed width is ${widthPoints}pt instead of A2`);
    assert.ok(Math.abs(heightPoints - 1683.78) < 3, `printed height is ${heightPoints}pt instead of A2`);
  });
});
