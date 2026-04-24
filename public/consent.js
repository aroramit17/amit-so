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
      'background:rgba(22,22,22,0.98);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);',
      'border:1px solid rgba(232,224,212,0.12);border-radius:12px;padding:1.25rem 1.25rem 1rem;',
      "color:#e8e0d4;font-family:'Sora',-apple-system,BlinkMacSystemFont,sans-serif;",
      'font-size:0.82rem;line-height:1.55;box-shadow:0 8px 32px rgba(0,0,0,0.4);',
      'transform:translateY(20px);opacity:0;transition:transform .4s ease,opacity .4s ease;}',
      '#cc-banner.cc-visible{transform:translateY(0);opacity:1;}',
      '#cc-banner p{color:rgba(232,224,212,0.75);margin:0 0 1rem 0;font-size:0.82rem;}',
      '#cc-banner a.cc-link{color:#c9965c;text-decoration:underline;text-underline-offset:2px;}',
      '#cc-banner a.cc-link:hover{color:#d4725c;}',
      '.cc-actions{display:flex;gap:0.5rem;flex-wrap:wrap;}',
      '.cc-btn{flex:1;min-width:100px;padding:0.55rem 1rem;border:1px solid rgba(232,224,212,0.12);',
      'border-radius:8px;background:transparent;color:#e8e0d4;font-family:inherit;',
      'font-size:0.78rem;font-weight:500;cursor:pointer;transition:all .25s;}',
      '.cc-btn:hover{border-color:rgba(232,224,212,0.3);}',
      '.cc-btn.cc-primary{background:#d4725c;border-color:#d4725c;color:#0e0e0e;}',
      '.cc-btn.cc-primary:hover{background:#c9965c;border-color:#c9965c;}',
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
