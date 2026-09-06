import fs from 'fs';

let content = fs.readFileSync('src/build.mjs', 'utf8');

const oldStripLogic = `  const strip = [...fellowships, ...awards]
    .filter((x) => x.logo)
    .map((x) => \`<li class="orgmark reveal"><img src="assets/logos/orgs/\${x.logo}" alt="\${attr(x.name)}" loading="lazy" onerror="this.style.visibility='hidden'"></li>\`)
    .join("");`;

const newStripLogic = `  const orgs = [...fellowships, ...awards].filter((x) => x.logo);
  const strip = [...orgs, ...orgs, ...orgs]
    .map((x) => \`<li class="orgmark"><img src="assets/logos/orgs/\${x.logo}" alt="\${attr(x.name)}" loading="lazy" onerror="this.style.visibility='hidden'"></li>\`)
    .join("");`;

content = content.replace(oldStripLogic, newStripLogic);

content = content.replace(
  '<ul class="orgstrip reveal d3">${strip}</ul>',
  '<div class="orgstrip-wrapper reveal d3"><ul class="orgstrip">${strip}</ul></div>'
);

fs.writeFileSync('src/build.mjs', content);
console.log("Patched src/build.mjs");
