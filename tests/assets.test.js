const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

describe('Asset provenance', () => {
  it('does not load assets from official Coca-Cola domains', () => {
    const assetTags = html.match(/<(link|script|img|video|audio|source)[^>]*>/gi) || [];
    const forbiddenHosts = [
      'coca-cola.com',
      'coca-colacompany.com',
      'coke.com',
    ];

    for (const tag of assetTags) {
      const srcMatch = tag.match(/(?:href|src)=["']([^"']+)["']/i);
      if (!srcMatch) continue;
      const url = srcMatch[1];
      if (!url.startsWith('http')) continue;
      const lowerUrl = url.toLowerCase();
      for (const host of forbiddenHosts) {
        assert.ok(
          !lowerUrl.includes(host),
          `Asset tag should not load from ${host}: ${tag}`
        );
      }
    }
  });

  it('only loads fonts from expected external sources', () => {
    const linkTags = html.match(/<link[^>]*>/gi) || [];
    const allowedHosts = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
    ];

    for (const tag of linkTags) {
      const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
      if (!hrefMatch) continue;
      const url = hrefMatch[1];
      if (!url.startsWith('http')) continue;
      const host = new URL(url).hostname;
      assert.ok(
        allowedHosts.includes(host),
        `Unexpected external link host: ${host}`
      );
    }

    const scriptSrcs = html.match(/<script[^>]*src=["']([^"']+)["']/gi) || [];
    for (const src of scriptSrcs) {
      const url = src.match(/src=["']([^"']+)["']/i)?.[1];
      if (url && url.startsWith('http')) {
        assert.fail(`Unexpected external script source: ${url}`);
      }
    }
  });

  it('references only existing local assets', () => {
    const localRefs = [
      ...html.matchAll(/href=["']([^"']+)["']/gi),
      ...html.matchAll(/src=["']([^"']+)["']/gi),
    ]
      .map((m) => m[1])
      .filter((ref) => !ref.startsWith('http') && !ref.startsWith('#'));

    for (const ref of localRefs) {
      const assetPath = path.join(rootDir, ref);
      assert.ok(
        fs.existsSync(assetPath),
        `Referenced local asset missing: ${ref}`
      );
    }
  });
});
