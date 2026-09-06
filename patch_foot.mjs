import fs from 'fs';

let content = fs.readFileSync('src/build.mjs', 'utf8');

const footRegex = /function foot\(\) \{[\s\S]*?return `\$\{contactBand\(\)\}[\s\S]*?<\/html>`;\n\}/;

const newFoot = `function foot() {
  const year = new Date().getFullYear();
  const c = site.contact;
  const icon = (svg) => \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\${svg}</svg>\`;
  const icons = {
    email: icon('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>'),
    linkedin: icon('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>'),
    twitter: icon('<path d="M4 4l16 16m0-16L4 20"></path>'),
    youtube: icon('<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>')
  };

  return \`\${contactBand()}
<footer class="footer"><div class="wrap footer-grid">
  <div class="f-left">
    <div class="f-loc">
      <p class="f-eyebrow">Location &amp; local time</p>
      <p class="f-time">Dhaka, Bangladesh &ndash; <span id="clock">...</span></p>
    </div>
    <nav class="f-socials">
      <a href="mailto:\${attr(c.email)}">\${icons.email} email</a>
      <a href="\${attr(c.linkedin.url)}" target="_blank" rel="noopener">\${icons.linkedin} linkedin</a>
      <a href="\${attr(c.twitter.url)}" target="_blank" rel="noopener">\${icons.twitter} x</a>
      <a href="\${attr(c.youtube.url)}" target="_blank" rel="noopener">\${icons.youtube} youtube</a>
    </nav>
  </div>
  <div class="f-right">
    <p>&copy; \${year} Masum Billah. All rights reserved.<a href="about.html">About</a></p>
  </div>
</div></footer>
<script src="main.js?v=\${V}"></script>
</body>
</html>\`;
}`;

content = content.replace(footRegex, newFoot);
fs.writeFileSync('src/build.mjs', content);
console.log("Patched foot in build.mjs");
