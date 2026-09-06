import fs from 'fs';
let css = fs.readFileSync('styles.css', 'utf8');

const oldTexture = \`/* Hero Texture Override */
.banner {
  background-color: var(--paper);
  background-image: 
    radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.7) 0%, transparent 60%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}\`;

const newTexture = \`/* Hero Texture Override */
.banner {
  background-color: var(--paper) !important;
  background-image: 
    radial-gradient(ellipse at 15% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 65%),
    radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px) !important;
  background-size: 100% 100%, 20px 20px !important;
}\`;

css = css.replace(oldTexture, newTexture);
fs.writeFileSync('styles.css', css);
console.log("Patched texture");
