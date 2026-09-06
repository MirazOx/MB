import fs from 'fs';
let content = fs.readFileSync('styles.css', 'utf8');

const regex = /\/\* ----------------------------- Footer ---------------------------------- \*\/[\s\S]*?\.footer nav a:hover \{ color: var\(--ember-band\); \}/;

const newCss = `/* ----------------------------- Footer ---------------------------------- */
.footer {
  background: var(--paper);
  color: var(--ink-muted);
  font-family: var(--mono);
  border-top: 1px solid var(--line);
}
.footer-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-block: 4rem 2.5rem;
  gap: 2rem;
}
.f-left {
  display: flex;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: flex-end;
  flex-wrap: wrap;
}
.f-loc {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.f-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  font-weight: 600;
  font-size: 0.65rem;
}
.f-time {
  color: var(--ink);
  font-weight: 600;
  font-size: 0.85rem;
}
.f-socials {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.f-socials a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--ink-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem;
  transition: color 0.2s;
}
.f-socials a:hover {
  color: var(--ink);
}
.f-socials svg {
  width: 14px;
  height: 14px;
}
.f-right {
  border-top: 1px solid var(--line-2);
  padding-top: 0.75rem;
  font-size: 0.75rem;
}
.f-right a {
  color: var(--ink);
  text-decoration: none;
  margin-left: 0.4rem;
}
.f-right a:hover {
  text-decoration: underline;
}

@media (max-width: 800px) {
  .footer-grid {
    flex-direction: column;
    align-items: flex-start;
  }
  .f-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  .f-right {
    width: 100%;
  }
}`;

content = content.replace(regex, newCss);
fs.writeFileSync('styles.css', content);
console.log("Patched styles.css for footer correctly");
