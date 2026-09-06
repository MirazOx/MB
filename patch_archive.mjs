import fs from 'fs';

let content = fs.readFileSync('src/build.mjs', 'utf8');

// 1. Update the sort select to include Random and add the See More button
content = content.replace(
  '<option value="new">Newest first</option><option value="old">Oldest first</option><option value="az">Title A–Z</option>',
  '<option value="random" selected>Shuffle (Random)</option><option value="new">Newest first</option><option value="old">Oldest first</option><option value="az">Title A–Z</option>'
);

content = content.replace(
  '<ul class="stories archive-list" id="archive-list">${rows}</ul>',
  '<ul class="stories archive-list" id="archive-list">${rows}</ul>\n  <button id="load-more" class="btn btn--lg" type="button" style="margin: 2.5rem auto; display: none;">See more stories</button>'
);

// 2. Remove the subtitle from about.html and fix cover-cap HTML structure
content = content.replace(
  '<p class="cover-role">${esc(site.title)} · Dhaka, Bangladesh</p>',
  ''
);

// 3. Remove the beyond photo
const beyondPhotoMatch = /<figure class="beyond-photo[^>]*>[\s\S]*?<\/figure>/;
content = content.replace(beyondPhotoMatch, '');

fs.writeFileSync('src/build.mjs', content);
console.log("Patched src/build.mjs");
