const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'css', 'style.css');
const jsPath = path.join(rootDir, 'js', 'main.js');

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

describe('Static assets exist', () => {
  it('has index.html', () => {
    assert.ok(fs.existsSync(htmlPath), 'index.html should exist');
  });

  it('has css/style.css', () => {
    assert.ok(fs.existsSync(cssPath), 'css/style.css should exist');
  });

  it('has js/main.js', () => {
    assert.ok(fs.existsSync(jsPath), 'js/main.js should exist');
  });
});

describe('HTML semantic structure', () => {
  const html = read(htmlPath);

  it('declares language', () => {
    assert.match(html, /<html[^>]*\blang=["']en["']/, 'html lang should be en');
  });

  it('has a skip link to main content', () => {
    assert.match(html, /<a[^>]*class=["']skip-link["'][^>]*href=["']#main-content["']/, 'skip link should target main-content');
  });

  it('has a main landmark', () => {
    assert.match(html, /<main[^>]*id=["']main-content["']/, 'main#main-content should exist');
  });

  it('has exactly one h1', () => {
    const matches = html.match(/<h1[\s\S]*?<\/h1>/gi) || [];
    assert.equal(matches.length, 1, 'page should have exactly one h1');
  });

  it('has a visible disclaimer', () => {
    assert.match(html, /independent.?\s*concept\s*study/i, 'disclaimer text should be present');
    assert.match(html, /not\s+affiliated\s+with/i, 'disclaimer should state non-affiliation');
  });

  it('bottle SVG has an aria-label or title', () => {
    const bottleSvg = html.match(/<svg[^>]*class=["']bottle-silhouette["'][^>]*>/s);
    assert.ok(bottleSvg, 'bottle SVG should exist');
    const svgTag = bottleSvg[0];
    const hasLabel = /aria-label/.test(svgTag);
    const hasTitle = /<title>/.test(html.slice(html.indexOf(svgTag)));
    assert.ok(hasLabel || hasTitle, 'bottle SVG should have aria-label or title element');
  });

  it('loads its own CSS and JS, not third-party scripts', () => {
    assert.match(html, /<link[^>]*href=["']css\/style\.css["']/, 'should link css/style.css');
    assert.match(html, /<script[^>]*src=["']js\/main\.js["']/, 'should link js/main.js');
    const scriptSrcs = html.match(/<script[^>]*src=["']([^"']+)["']/gi) || [];
    assert.equal(scriptSrcs.length, 1, 'page should load exactly one external script (main.js)');
  });
});
