(function () {
  'use strict';

  var CONSENT_KEY = 'cookie-consent-v1';
  var REB2B_KEY = '9NMMZHRYV5NW';
  var CLARITY_ID = 'wgblz0vvjv';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function loadRB2B() {
    if (window.reb2b) return;
    window.reb2b = { loaded: true };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://ddwl4m2hdecbv.cloudfront.net/b/' + REB2B_KEY + '/' + REB2B_KEY + '.js.gz';
    var first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(s, first);
  }

  function loadClarity() {
    if (window.clarity && window.clarity.q) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function loadAccepted() {
    loadRB2B();
    loadClarity();
  }

  function injectStyles() {
    if (document.getElementById('cc-banner-styles')) return;
    var css = [
      '#cc-banner{position:fixed;bottom:1.25rem;right:1.25rem;max-width:380px;z-index:9998;',
      'background:#fffefa;',
      'border:1px solid #dcdedc;border-radius:6px;padding:1.25rem 1.25rem 1rem;',
      "color:#14233b;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;",
      'font-size:0.875rem;line-height:1.55;box-shadow:0 8px 32px rgba(20,35,59,0.14);',
      'transform:translateY(20px);opacity:0;transition:transform .4s ease,opacity .4s ease;}',
      '#cc-banner.cc-visible{transform:translateY(0);opacity:1;}',
      '#cc-banner p{color:#586477;margin:0 0 1rem 0;font-size:0.875rem;}',
      '#cc-banner a.cc-link{color:#2146d7;text-decoration:underline;text-underline-offset:2px;}',
      '#cc-banner a.cc-link:hover{color:#2146d7;}',
      '.cc-actions{display:flex;gap:0.5rem;flex-wrap:wrap;}',
      '.cc-btn{flex:1;min-width:100px;min-height:44px;padding:0.55rem 1rem;border:1px solid #b4bac2;',
      'border-radius:4px;background:transparent;color:#14233b;font-family:inherit;',
      'font-size:0.875rem;font-weight:500;cursor:pointer;transition:background .2s;}',
      '.cc-btn:hover{border-color:#14233b;}',
      '.cc-btn.cc-primary{background:#315efb;border-color:#315efb;color:#fff;}',
      '.cc-btn.cc-primary:hover{background:#2146d7;border-color:#2146d7;}',
      '.cc-btn:focus-visible,#cc-banner a:focus-visible{outline:3px solid #315efb;outline-offset:3px;}',
      '@media (prefers-reduced-motion:reduce){#cc-banner{transition:none;}}',
      '@media (max-width:560px){#cc-banner{left:1rem;right:1rem;max-width:none;bottom:1rem;}}'
    ].join('');
    var style = document.createElement('style');
    style.id = 'cc-banner-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function hideBanner() {
    var banner = document.getElementById('cc-banner');
    if (!banner) return;
    banner.classList.remove('cc-visible');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 400);
  }

  function showBanner() {
    injectStyles();
    if (document.getElementById('cc-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p>This site uses cookies and similar technologies to recognize returning visitors and improve the experience. See the <a class="cc-link" href="/privacy">Privacy Policy</a> for details.</p>' +
      '<div class="cc-actions">' +
        '<button type="button" class="cc-btn" data-cc-action="decline">Decline</button>' +
        '<button type="button" class="cc-btn cc-primary" data-cc-action="accept">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    void banner.offsetWidth;
    banner.classList.add('cc-visible');

    banner.addEventListener('click', function (e) {
      var target = e.target.closest ? e.target.closest('[data-cc-action]') : e.target;
      if (!target || !target.getAttribute) return;
      var action = target.getAttribute('data-cc-action');
      if (action === 'accept') {
        setConsent('accepted');
        loadAccepted();
        hideBanner();
      } else if (action === 'decline') {
        setConsent('declined');
        hideBanner();
      }
    });
  }

  window.showCookiePreferences = function () {
    try { localStorage.removeItem(CONSENT_KEY); } catch (e) {}
    var existing = document.getElementById('cc-banner');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    showBanner();
  };

  function init() {
    var consent = getConsent();
    if (consent === 'accepted') {
      loadAccepted();
    } else if (!consent) {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
