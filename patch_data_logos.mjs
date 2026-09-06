import fs from 'fs';
let content = fs.readFileSync('src/data.mjs', 'utf8');

const replacements = [
  ['guardian.png', 'guardian.svg'],
  ['aljazeera.png', 'aljazeera.svg'],
  ['nikkei.png', 'nikkei.svg'],
  ['scmp.png', 'scmp.svg'],
  ['tbs.png', 'tbs.svg'],
  ['diplomat.png', 'diplomat.svg'],
  ['mongabay.png', 'mongabay.svg'],
  ['vice.png', 'vice.svg']
];

for (const [oldExt, newExt] of replacements) {
  content = content.replace(oldExt, newExt);
}

fs.writeFileSync('src/data.mjs', content);
console.log('Patched data.mjs with .svg extensions');
