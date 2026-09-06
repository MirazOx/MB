const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const regex = /\/\* Hero Texture Override \*\/[\s\S]*?\}\n/g;

const newTexture = `/* Hero Texture Override */
.banner {
  background-color: var(--paper) !important;
  background-image: 
    radial-gradient(ellipse at 15% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 65%),
    radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px) !important;
  background-size: 100% 100%, 20px 20px !important;
}
`;

css = css.replace(regex, newTexture);
fs.writeFileSync('styles.css', css);
console.log("Patched texture");
