import fs from 'fs';

let content = fs.readFileSync('main.js', 'utf8');

const oldArchiveBlock = `  // --- Archive: search / filter / sort ---------------------------------------
  var list = document.getElementById("archive-list");
  if (list) {
    var q = document.getElementById("q");
    var fBeat = document.getElementById("f-beat");
    var fOutlet = document.getElementById("f-outlet");
    var fYear = document.getElementById("f-year");
    var fSort = document.getElementById("f-sort");
    var countEl = document.getElementById("count");
    var noRes = document.getElementById("no-results");
    var items = [].slice.call(list.querySelectorAll(".story"));
    var total = items.length;
    // The DOM order as built is already newest-first; remember it for sorting.
    items.forEach(function (el, i) { el._ord = i; });

    // Arriving from a beat page's "see all in archive" link (#beat).
    var h = (location.hash || "").replace("#", "");
    if (h && fBeat && [].some.call(fBeat.options, function (op) { return op.value === h; })) fBeat.value = h;

    var run = function () {
      var term = (q.value || "").trim().toLowerCase();
      var bt = fBeat ? fBeat.value : "", o = fOutlet.value, y = fYear.value, sort = fSort.value;
      var shown = 0;
      items.forEach(function (el) {
        var ok =
          (!bt || el.dataset.beat === bt) &&
          (!o || el.dataset.outlet === o) &&
          (!y || el.dataset.year === y) &&
          (!term || el.dataset.title.indexOf(term) !== -1 || el.dataset.outlet.toLowerCase().indexOf(term) !== -1);
        el.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      var vis = items.filter(function (el) { return !el.classList.contains("is-hidden"); });
      vis.sort(function (a, bEl) {
        if (sort === "az") return a.dataset.title.localeCompare(bEl.dataset.title);
        return sort === "old" ? bEl._ord - a._ord : a._ord - bEl._ord; // newest = built order
      });
      var frag = document.createDocumentFragment();
      vis.forEach(function (el) { frag.appendChild(el); });
      list.appendChild(frag);
      countEl.textContent = "Showing " + shown + " of " + total + " pieces";
      noRes.classList.toggle("is-hidden", shown !== 0);
    };

    [q, fBeat, fOutlet, fYear, fSort].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", run);
      el.addEventListener("change", run);
    });
    run();
  }`;

const newArchiveBlock = `  // --- Archive: search / filter / sort ---------------------------------------
  var list = document.getElementById("archive-list");
  if (list) {
    var q = document.getElementById("q");
    var fBeat = document.getElementById("f-beat");
    var fOutlet = document.getElementById("f-outlet");
    var fYear = document.getElementById("f-year");
    var fSort = document.getElementById("f-sort");
    var countEl = document.getElementById("count");
    var noRes = document.getElementById("no-results");
    var loadMoreBtn = document.getElementById("load-more");
    var items = [].slice.call(list.querySelectorAll(".story"));
    var total = items.length;
    var limit = 20;
    
    // The DOM order as built is already newest-first; remember it for sorting.
    // Also assign a random order once on load for the default "random" sort.
    items.forEach(function (el, i) { 
      el._ord = i; 
      el._rand = Math.random();
    });

    // Arriving from a beat page's "see all in archive" link (#beat).
    var h = (location.hash || "").replace("#", "");
    if (h && fBeat && [].some.call(fBeat.options, function (op) { return op.value === h; })) fBeat.value = h;

    var run = function (resetLimit) {
      if (resetLimit) limit = 20;
      var term = (q.value || "").trim().toLowerCase();
      var bt = fBeat ? fBeat.value : "", o = fOutlet.value, y = fYear.value, sort = fSort.value;
      
      var vis = [];
      items.forEach(function (el) {
        var ok =
          (!bt || el.dataset.beat === bt) &&
          (!o || el.dataset.outlet === o) &&
          (!y || el.dataset.year === y) &&
          (!term || el.dataset.title.indexOf(term) !== -1 || el.dataset.outlet.toLowerCase().indexOf(term) !== -1);
        if (ok) {
          vis.push(el);
        } else {
          el.classList.add("is-hidden");
        }
      });
      
      vis.sort(function (a, bEl) {
        if (sort === "random") return a._rand - bEl._rand;
        if (sort === "az") return a.dataset.title.localeCompare(bEl.dataset.title);
        return sort === "old" ? bEl._ord - a._ord : a._ord - bEl._ord; // newest = built order
      });
      
      var frag = document.createDocumentFragment();
      vis.forEach(function (el, i) {
        if (i < limit) {
          el.classList.remove("is-hidden");
        } else {
          el.classList.add("is-hidden");
        }
        frag.appendChild(el);
      });
      list.appendChild(frag);
      
      var shown = Math.min(limit, vis.length);
      countEl.textContent = "Showing " + shown + " of " + vis.length + " pieces";
      noRes.classList.toggle("is-hidden", vis.length !== 0);
      
      if (loadMoreBtn) {
        loadMoreBtn.style.display = vis.length > limit ? "block" : "none";
      }
    };

    [q, fBeat, fOutlet, fYear, fSort].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", function() { run(true); });
      el.addEventListener("change", function() { run(true); });
    });
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function() {
        limit += 20;
        run(false);
      });
    }
    
    run(true);
  }`;

content = content.replace(oldArchiveBlock, newArchiveBlock);
fs.writeFileSync('main.js', content);
console.log("Patched main.js");
