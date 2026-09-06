import fs from 'fs';

let buildContent = fs.readFileSync('src/build.mjs', 'utf8');

// 1. Remove "Get in touch" from nav
buildContent = buildContent.replace(
  /<a class="pill" href="mailto:\$\{site\.contact\.email\}">Get in touch<\/a>/g,
  ''
);

// 2. Add "Get in touch" to foot() and fix "X" double issue
const oldFootSocials = `<nav class="f-socials">
      <a href="mailto:\$\{attr(c.email)}">\${icons.email} email</a>
      <a href="\${attr(c.linkedin.url)}" target="_blank" rel="noopener">\${icons.linkedin} linkedin</a>
      <a href="\${attr(c.twitter.url)}" target="_blank" rel="noopener">\${icons.twitter} x</a>
      <a href="\${attr(c.youtube.url)}" target="_blank" rel="noopener">\${icons.youtube} youtube</a>
    </nav>`;

const newFootSocials = `<div style="display: flex; flex-direction: column; gap: 1.25rem; align-items: flex-start;">
      <a href="mailto:\$\{attr(c.email)}" class="btn btn--primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">Get in touch</a>
      <nav class="f-socials">
        <a href="mailto:\$\{attr(c.email)}">\${icons.email} email</a>
        <a href="\${attr(c.linkedin.url)}" target="_blank" rel="noopener">\${icons.linkedin} linkedin</a>
        <a href="\${attr(c.twitter.url)}" target="_blank" rel="noopener">\${icons.twitter} twitter</a>
        <a href="\${attr(c.youtube.url)}" target="_blank" rel="noopener">\${icons.youtube} youtube</a>
      </nav>
    </div>`;

buildContent = buildContent.replace(oldFootSocials, newFootSocials);

// 3. Break the name on the about page
buildContent = buildContent.replace(
  '<h1 class="display">Masum Billah</h1>',
  '<h1 class="display">Masum<br>Billah</h1>'
);

// 4. Redesign contact box in about page
const oldElsewhereList = `const elsewhere = [
    \`<li><a href="\${attr(c.twitter.url)}" target="_blank" rel="noopener">X / Twitter \${arw}</a></li>\`,
    \`<li><a href="\${attr(c.linkedin.url)}" target="_blank" rel="noopener">LinkedIn \${arw}</a></li>\`,
    \`<li><a href="\${attr(c.youtube.url)}" target="_blank" rel="noopener">YouTube \${arw}</a></li>\`,
    \`<li><a href="mailto:\${attr(c.email)}">Email \${arw}</a></li>\`,
  ].join("");`;

const newElsewhereList = `const elsewhere = \`
  <div class="contact-card">
    <h3 style="font-family: var(--display); font-size: 1.35rem; margin-bottom: 0.4rem; color: var(--ink);">Let's talk</h3>
    <p style="color: var(--ink-soft); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.25rem;">Open to freelance commissions and collaboration on cross-border investigations.</p>
    <a href="mailto:\${attr(c.email)}" class="btn btn--primary" style="display: block; text-align: center; margin-bottom: 1.25rem;">Get in touch</a>
    <div class="cc-socials" style="display: flex; gap: 1rem; border-top: 1px solid var(--line); padding-top: 1rem; flex-wrap: wrap;">
      <a href="\${attr(c.twitter.url)}" target="_blank" rel="noopener" style="color: var(--ink-muted); text-decoration: none; font-size: 0.8rem; font-weight: 500;">Twitter</a>
      <a href="\${attr(c.linkedin.url)}" target="_blank" rel="noopener" style="color: var(--ink-muted); text-decoration: none; font-size: 0.8rem; font-weight: 500;">LinkedIn</a>
      <a href="\${attr(c.youtube.url)}" target="_blank" rel="noopener" style="color: var(--ink-muted); text-decoration: none; font-size: 0.8rem; font-weight: 500;">YouTube</a>
    </div>
  </div>\`;`;

buildContent = buildContent.replace(oldElsewhereList, newElsewhereList);

const oldElsewhereHtml = `<div class="col reveal d2">
      <h2 class="col-h">Elsewhere</h2>
      <ul class="linklist">\${elsewhere}</ul>
    </div>`;

const newElsewhereHtml = `<div class="col reveal d2">
      \${elsewhere}
    </div>`;

buildContent = buildContent.replace(oldElsewhereHtml, newElsewhereHtml);

fs.writeFileSync('src/build.mjs', buildContent);


// Now patch styles.css
let cssContent = fs.readFileSync('styles.css', 'utf8');

// Justify text
cssContent = cssContent.replace(
  '.about-lead { max-width: 64ch; margin: 0 auto clamp(2.25rem, 4.5vw, 3.5rem) auto; text-align: center; }',
  '.about-lead { max-width: 64ch; margin: 0 auto clamp(2.25rem, 4.5vw, 3.5rem) auto; text-align: justify; }'
);

// Adjust cover image size and position to zoom out
cssContent = cssContent.replace(
  '.cover-img { width: 100%; height: clamp(340px, 62vh, 600px); object-fit: cover; object-position: 50% 12%; display: block; }',
  '.cover-img { width: 100%; height: clamp(400px, 75vh, 850px); object-fit: cover; object-position: 50% 30%; display: block; }'
);

// Add contact card styles just in case we need hover states
const cssToAdd = `
.contact-card {
  background: var(--surface);
  border: 1px solid var(--line-2);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.cc-socials a:hover { color: var(--ember-ink) !important; }
`;
cssContent += cssToAdd;

fs.writeFileSync('styles.css', cssContent);
console.log("Patched all requirements");
