import fs from 'fs';

let css = fs.readFileSync('styles.css', 'utf8');

const oldStrip = `.orgstrip { list-style: none; margin: clamp(1.75rem, 3vw, 2.5rem) 0 0; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: clamp(1.25rem, 3vw, 2.5rem); }
.orgmark img { height: 30px; width: auto; max-width: 130px; object-fit: contain; filter: grayscale(1); opacity: 0.5; transition: filter 0.3s var(--ease), opacity 0.3s var(--ease); }
.orgmark:hover img { filter: none; opacity: 1; }`;

const newStrip = `.orgstrip-wrapper {
  overflow: hidden;
  width: 100%;
  margin: clamp(1.75rem, 3vw, 2.5rem) 0 0;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.orgstrip {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  width: max-content;
  align-items: center;
  gap: clamp(2rem, 4vw, 3.5rem);
  animation: marquee-scroll 25s linear infinite;
}
.orgstrip:hover {
  animation-play-state: paused;
}
.orgmark img {
  height: 40px;
  width: auto;
  max-width: 140px;
  object-fit: contain;
  transition: transform 0.3s var(--ease);
}
.orgmark:hover img {
  transform: scale(1.05);
}
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-33.33333% - (clamp(2rem, 4vw, 3.5rem) / 3))); }
}`;

css = css.replace(oldStrip, newStrip);
fs.writeFileSync('styles.css', css);
console.log("Patched styles.css");
