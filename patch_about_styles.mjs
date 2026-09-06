import fs from 'fs';

let content = fs.readFileSync('styles.css', 'utf8');

content = content.replace(
  '.cover-cap { position: absolute; left: 0; right: 0; bottom: clamp(1.25rem, 3vw, 2.5rem); z-index: 2; color: #fff; }',
  '.cover-cap { position: absolute; left: 0; right: 0; top: clamp(3rem, 6vw, 5rem); z-index: 2; color: #fff; }'
);

const oldLead = `.about-lead { max-width: 64ch; margin-bottom: clamp(2.25rem, 4.5vw, 3.5rem); }
.about-lead p { font-family: var(--serif); font-size: clamp(1.12rem, 1rem + 0.6vw, 1.4rem); line-height: 1.55; color: var(--ink); margin-bottom: 1.1rem; }
.about-lead p:last-child { color: var(--ink-soft); font-size: 1.05rem; font-family: var(--sans); line-height: 1.65; margin-bottom: 0; }`;

const newLead = `.about-lead { max-width: 64ch; margin: 0 auto clamp(2.25rem, 4.5vw, 3.5rem) auto; text-align: center; }
.about-lead p { font-family: var(--serif); font-size: clamp(1.12rem, 1rem + 0.6vw, 1.4rem); line-height: 1.55; color: var(--ink); margin-bottom: 1.1rem; }
.about-lead p:last-child { margin-bottom: 0; }`;

content = content.replace(oldLead, newLead);

fs.writeFileSync('styles.css', content);
console.log("Patched styles.css for about page");
