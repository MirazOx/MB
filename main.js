(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Live Dhaka clock (borrowed house detail) ------------------------------
  var clock = document.getElementById("clock");
  if (clock) {
    var tick = function () {
      try {
        var t = new Intl.DateTimeFormat("en-US", {
          timeZone: clock.dataset.tz || "Asia/Dhaka",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        clock.textContent = t;
      } catch (e) {
        clock.textContent = "";
      }
    };
    tick();
    setInterval(tick, 20000);
  }

  // --- Progressive reveal ----------------------------------------------------
  // Only hide-then-reveal when JS runs and motion is allowed; content stays
  // visible by default for no-JS / reduced-motion / headless renderers.
  if (!reduce) {
    var reveals = [].slice.call(document.querySelectorAll(".reveal"));
    // Animate only elements already on screen at load. Below-the-fold content
    // stays visible (no entrance) so nothing depends on a reveal firing.
    var animateInView = function () {
      reveals.forEach(function (el) {
        if (el.classList.contains("anim")) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add("anim");
      });
    };
    requestAnimationFrame(function () { requestAnimationFrame(animateInView); });
    window.addEventListener("load", animateInView);
  }

  // --- Work page: beat filter ------------------------------------------------
  var chips = document.querySelectorAll(".chip");
  if (chips.length) {
    var sections = Array.prototype.slice.call(document.querySelectorAll(".beat-sec"));

    function apply(filter) {
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.dataset.filter === filter));
      });
      sections.forEach(function (sec) {
        var show = filter === "all" || sec.dataset.beat === filter;
        sec.classList.toggle("is-hidden", !show);
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var filter = chip.dataset.filter;
        apply(filter);
        if (filter !== "all") {
          history.replaceState(null, "", "#" + filter);
        } else {
          history.replaceState(null, "", location.pathname);
        }
        // Nudge the beats into view under the sticky bars.
        var anchor = document.getElementById("beats");
        if (anchor) {
          var y = anchor.getBoundingClientRect().top + window.scrollY - 128;
          window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
        }
      });
    });

    // Honour an incoming #beat hash (from the homepage desks).
    var hash = (location.hash || "").replace("#", "");
    if (hash && sections.some(function (s) { return s.dataset.beat === hash; })) {
      apply(hash);
    }
  }

  // --- Archive: search / filter / sort ---------------------------------------
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
  }
})();
