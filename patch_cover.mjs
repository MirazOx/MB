import fs from 'fs';
let content = fs.readFileSync('src/build.mjs', 'utf8');

content = content.replace(
  '<div class="cover-cap wrap">',
  '<div class="cover-cap">'
);

fs.writeFileSync('src/build.mjs', content);
console.log("Patched cover-cap wrap");
