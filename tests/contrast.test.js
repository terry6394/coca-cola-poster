const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

// WCAG 2.1 relative luminance for sRGB hex colors.
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function channelLuminance(value) {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function contrastRatio(a, b) {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('WCAG color contrast', () => {
  const palette = {
    '--near-black': '#0A0A0A',
    '--warm-white': '#FFF8F0',
    '--coke-red': '#F40009',
    '--georgia-green': '#3A4A3A',
    '--gray-mid': '#6E6E6E',
  };

  const pairs = [
    ['body text on white', palette['--near-black'], palette['--warm-white'], 4.5],
    ['white text on red (large)', palette['--warm-white'], palette['--coke-red'], 3],
    ['red on white (large/UI)', palette['--coke-red'], palette['--warm-white'], 3],
    ['green accent text on white', palette['--georgia-green'], palette['--warm-white'], 4.5],
    ['context panel body text on black', palette['--warm-white'], palette['--near-black'], 4.5],
    ['gray text on white', palette['--gray-mid'], palette['--warm-white'], 4.5],
  ];

  for (const [name, fg, bg, min] of pairs) {
    it(`${name} meets AA ${min}:1`, () => {
      const ratio = contrastRatio(fg, bg);
      assert.ok(
        ratio >= min,
        `${name}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1, expected >= ${min}:1`
      );
    });
  }
});
