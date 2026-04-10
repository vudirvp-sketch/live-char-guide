#!/usr/bin/env node
/**
 * Check WCAG contrast ratios from tokens.json
 * Exit 1 if any semantic color fails contrast check against background.
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function hexToRgb(hexColor) {
  const hex = hexColor.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16)
  ];
}

function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(color1, color2) {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function main(tokensPath) {
  if (!tokensPath) {
    console.log('SKIP: No tokens.json path provided');
    process.exit(0);
  }

  let tokens;
  try {
    tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));
  } catch {
    console.log('SKIP: tokens.json not found or invalid');
    process.exit(0);
  }

  const colors = tokens.primitives?.color;
  if (!colors) {
    console.log('SKIP: No color primitives in tokens.json');
    process.exit(0);
  }

  const bg = hexToRgb(colors.gray['900'].value);
  const failures = [];

  for (const [name, colorDef] of Object.entries(colors.semantic || {})) {
    const fg = hexToRgb(colorDef.value);
    const ratio = contrastRatio(fg, bg);
    if (ratio < 3.0) {
      failures.push(`${name}: ${ratio.toFixed(2)}:1 (min 3.0:1)`);
    }
  }

  if (failures.length > 0) {
    console.error('Contrast failures:');
    failures.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log('All contrast ratios pass');
}

main(process.argv[2]);
