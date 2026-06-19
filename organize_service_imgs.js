const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'assets', 'imgs', 'service_imgs');

// Map existing folder names to snake_case prefix
const FOLDER_MAP = {
  'bathroom renovations':      'bathroom_renovations',
  'decking':                   'decking',
  'garage conversions':        'garage_conversions',
  'garden rooms':              'garden_rooms',
  'home extensions':           'home_extensions',
  'home renovations':          'home_renovations',
  'kitchen renovations':       'kitchen_renovations',
  'loft conversions':          'loft_conversions',
  'loft conversions':          'loft_conversions',
  'media walls and panelling': 'media_walls_and_panelling',
  'windows and doors':         'windows_and_doors',
};

// Root-level loose files -> target folder
const LOOSE_FILES = {
  'WhatsApp Image 2026-06-03 at 16.47.58 (9).jpeg':  'home renovations',
  'WhatsApp Image 2026-06-03 at 16.48.01 (7).jpeg':  'home extensions',
  'WhatsApp Image 2026-06-03 at 16.48.02 (2).jpeg':  'home extensions',
};

// Step 1: ensure all service folders exist
for (const folder of Object.keys(FOLDER_MAP)) {
  const dir = path.join(BASE, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${folder}/`);
  }
}

// Step 2: move loose root-level files to correct folders
for (const [file, targetFolder] of Object.entries(LOOSE_FILES)) {
  const src = path.join(BASE, file);
  const dst = path.join(BASE, targetFolder, file);
  if (fs.existsSync(src)) {
    fs.renameSync(src, dst);
    console.log(`Moved: ${file} -> ${targetFolder}/`);
  }
}

// Step 3: delete .DS_Store files
function deleteDSStore(dir) {
  const dsPath = path.join(dir, '.DS_Store');
  if (fs.existsSync(dsPath)) {
    fs.unlinkSync(dsPath);
    console.log(`Deleted: .DS_Store in ${path.basename(dir)}/`);
  }
}
deleteDSStore(BASE);
for (const folder of Object.keys(FOLDER_MAP)) {
  deleteDSStore(path.join(BASE, folder));
}

// Step 4: rename all images in each service folder
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

for (const [folder, prefix] of Object.entries(FOLDER_MAP)) {
  const dir = path.join(BASE, folder);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir)
    .filter(f => !f.startsWith('.') && IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log(`${folder}/  - no images (skipped)`);
    continue;
  }

  // Two-pass rename: first to temp names to avoid collisions
  files.forEach((file, i) => {
    fs.renameSync(
      path.join(dir, file),
      path.join(dir, `__tmp_${i}${path.extname(file).toLowerCase()}`)
    );
  });

  // Second pass: final names
  fs.readdirSync(dir)
    .filter(f => f.startsWith('__tmp_'))
    .sort((a, b) => {
      const ai = parseInt(a.match(/\d+/)[0]);
      const bi = parseInt(b.match(/\d+/)[0]);
      return ai - bi;
    })
    .forEach((file, i) => {
      const ext = path.extname(file).toLowerCase();
      const newName = `${prefix}_${i + 1}${ext}`;
      fs.renameSync(path.join(dir, file), path.join(dir, newName));
      console.log(`  ${folder}/  ${file.replace('__tmp_', '#')} -> ${newName}`);
    });
}

console.log('\nDone.');
