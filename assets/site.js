/* ArcturusRidge shared script for article pages: theme, cookie consent, analytics */
(function () {
  var GA_ID = 'GTM-N35F6V72';
  var d = document.documentElement;
  try { localStorage.removeItem('ar-theme'); } catch (e) {}

  function loadGA() {
    if (!GA_ID || window.__arGA) return; window.__arGA = 1;
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GA_ID; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
  }

  var K = 'ar-consent', YEAR = 365 * 864e5;
  function get() { try { var v = JSON.parse(localStorage.getItem(K) || 'null'); if (v && Date.now() - v.t < YEAR) return v.c; } catch (e) {} return null; }

  document.addEventListener('DOMContentLoaded', function () {
    var box = document.createElement('div');
    box.className = 'cookie'; box.id = 'cookie'; box.hidden = true;
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-labelledby', 'ckT');
    box.innerHTML = '<h2 id="ckT">Your privacy</h2><p>We use only essential storage to make this site work and remember your choices. With your OK we may also use analytics cookies to understand how the site is used. <a href="/#privacy">Learn more</a></p><div class="row"><button type="button" class="rej" id="ckRej">Essential only</button><button type="button" class="acc" id="ckAcc">Accept all</button></div>';
    document.body.appendChild(box);
    function save(c) { try { localStorage.setItem(K, JSON.stringify({ c: c, t: Date.now() })); } catch (e) {} box.hidden = true; if (c === 'all') loadGA(); }
    var c = get(); if (!c) box.hidden = false; else if (c === 'all') loadGA();
    box.querySelector('#ckAcc').addEventListener('click', function () { save('all'); });
    box.querySelector('#ckRej').addEventListener('click', function () { save('essential'); });
    document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-cookie-settings]'); if (b) { box.hidden = false; box.querySelector('#ckRej').focus(); } });
  });
})();
