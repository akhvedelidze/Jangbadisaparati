/*
 * Jangbadisaparati.ge — shared site behaviour (no dependencies)
 *
 * - Mobile navigation drawer
 * - FAQ accordion
 * - Click tracking for [data-track] elements
 * - Analytics stub: Google tag (gtag.js) is loaded ONLY when
 *   window.SITE_ANALYTICS_ID is set BEFORE this script runs, e.g.
 *     <script>window.SITE_ANALYTICS_ID = "G-XXXXXXXXXX";</script>
 *     <script src="/js/site.js"></script>
 *   If it is not set, nothing is loaded and no network requests are made.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  // JS is available: switch off the no-js fallback (FAQ answers visible by default).
  root.classList.remove("no-js");
  root.classList.add("js");

  /* ------------------------------------------------------------------ *
   * Analytics stub
   * ------------------------------------------------------------------ */
  var ANALYTICS_ID_PATTERN = /^(G|GT|AW)-[A-Z0-9]{4,}$/i;
  var analyticsLoaded = false;

  function loadAnalytics() {
    var id = window.SITE_ANALYTICS_ID;
    if (analyticsLoaded || !id || !ANALYTICS_ID_PATTERN.test(String(id))) {
      return;
    }
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });

    var s = doc.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    doc.head.appendChild(s);
  }

  function channelFromHref(href) {
    if (!href) return "";
    if (href.indexOf("tel:") === 0) return "phone";
    if (href.indexOf("wa.me") !== -1 || href.indexOf("whatsapp") !== -1) return "whatsapp";
    return "link";
  }

  function trackClick(el) {
    var href = el.getAttribute("href") || "";
    var detail = {
      track: el.getAttribute("data-track") || "",
      channel: el.getAttribute("data-channel") || channelFromHref(href),
      product: el.getAttribute("data-product") || "",
      href: href,
      page: location.pathname,
      lang: root.lang || ""
    };

    // Generic hook so any other tool can listen without code changes here.
    try {
      doc.dispatchEvent(new CustomEvent("site:track", { detail: detail }));
    } catch (e) { /* old browsers: ignore */ }

    if (typeof window.gtag === "function") {
      window.gtag("event", "contact_click", {
        contact_type: detail.track,
        contact_channel: detail.channel,
        product_size: detail.product,
        link_url: detail.href,
        page_path: detail.page,
        language: detail.lang
      });
    }
  }

  function initTracking() {
    doc.addEventListener("click", function (e) {
      var el = e.target && e.target.closest ? e.target.closest("[data-track]") : null;
      if (el) trackClick(el);
    });
  }

  /* ------------------------------------------------------------------ *
   * FAQ accordion (one open item at a time)
   * ------------------------------------------------------------------ */
  function setFaqState(item, open) {
    var btn = item.querySelector(".faq-question");
    item.classList.toggle("open", open);
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function initFaq() {
    var items = doc.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector(".faq-question");
      if (!btn) return;

      // Sync initial state: first item with .open stays open, others collapse.
      setFaqState(item, item.classList.contains("open"));

      btn.addEventListener("click", function () {
        var wasOpen = item.classList.contains("open");
        doc.querySelectorAll(".faq-item.open").forEach(function (openItem) {
          setFaqState(openItem, false);
        });
        if (!wasOpen) setFaqState(item, true);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Mobile navigation
   * ------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = doc.querySelector(".menu-toggle");
    var drawer = doc.querySelector(".mobile-nav");
    if (!toggle || !drawer) return;

    function close() {
      drawer.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      doc.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      doc.body.style.overflow = open ? "hidden" : "";
    });

    drawer.addEventListener("click", function (e) {
      if (e.target === drawer || (e.target.closest && e.target.closest("a"))) close();
    });

    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) close();
    });
  }

  /* ------------------------------------------------------------------ */
  function init() {
    initMobileNav();
    initFaq();
    initTracking();
    loadAnalytics();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
