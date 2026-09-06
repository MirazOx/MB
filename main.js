(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Live Dhaka clock (borrowed house detail) ------------------------------
  var clock = document.getElementById("clock");
  if (clock) {
    var tick = function () {
      try {
        var t = new Intl.DateTimeFormat("en-GB", {
          timeZone: clock.dataset.tz || "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        clock.textContent = "Dhaka · " + t;
      } catch (e) {
        clock.textContent = "Dhaka";
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

  // --- Archive page: search / filter / sort ----------------------------------
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

    // Preselect a beat if arriving from a work-page "more in the archive" link.
    var h = (location.hash || "").replace("#", "");
    if (h && [].some.call(fBeat.options, function (o) { return o.value === h; })) fBeat.value = h;

    var run = function () {
      var term = (q.value || "").trim().toLowerCase();
      var b = fBeat.value, o = fOutlet.value, y = fYear.value, sort = fSort.value;
      var shown = 0;
      items.forEach(function (el) {
        var ok =
          (!b || el.dataset.beat === b) &&
          (!o || el.dataset.outlet === o) &&
          (!y || el.dataset.year === y) &&
          (!term || el.dataset.title.indexOf(term) !== -1 || el.dataset.outlet.toLowerCase().indexOf(term) !== -1);
        el.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      // Sort the visible order.
      var vis = items.filter(function (el) { return !el.classList.contains("is-hidden"); });
      vis.sort(function (a, bEl) {
        if (sort === "az") return a.dataset.title.localeCompare(bEl.dataset.title);
        var d = Number(a.dataset.year) - Number(bEl.dataset.year);
        return sort === "old" ? d : -d;
      });
      vis.forEach(function (el) { list.appendChild(el); });
      countEl.textContent = "Showing " + shown + " of " + total + " pieces";
      noRes.classList.toggle("is-hidden", shown !== 0);
    };

    [q, fBeat, fOutlet, fYear, fSort].forEach(function (el) {
      el.addEventListener("input", run);
      el.addEventListener("change", run);
    });
    run();
  }
})();
