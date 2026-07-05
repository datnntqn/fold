(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  var revealables = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  // Masthead reveal (letter-spacing settle)
  var mast = document.getElementById("mast");
  if (mast) {
    if (reduce) { mast.classList.add("in"); }
    else { setTimeout(function () { mast.classList.add("in"); }, 180); }
  }

  // Subtle parallax on the hero look image
  var hero = document.getElementById("hero-photo");
  if (hero && !reduce) {
    window.addEventListener("scroll", function () {
      var top = hero.getBoundingClientRect().top;
      hero.style.transform = "translateY(" + (top * -0.04) + "px)";
    }, { passive: true });
  }

  // Generic column parallax: any element with data-px="<factor>" drifts on scroll.
  var pxEls = document.querySelectorAll("[data-px]");
  if (pxEls.length && !reduce) {
    var onPx = function () {
      var vh = window.innerHeight;
      pxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var center = r.top + r.height / 2 - vh / 2;
        el.style.transform = "translateY(" + (center * parseFloat(el.getAttribute("data-px"))).toFixed(1) + "px)";
      });
    };
    window.addEventListener("scroll", function () { window.requestAnimationFrame(onPx); }, { passive: true });
    onPx();
  }
})();
