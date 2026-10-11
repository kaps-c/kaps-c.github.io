// Site behaviour: theme toggle, active section in the top bar, copy email,
// and reduced-motion handling. Loaded with `defer`, so the DOM is ready.
// The saved theme is applied earlier by a tiny inline script in <head>
// to avoid a flash of the wrong theme.
(() => {
  'use strict';

  const root = document.documentElement;
  const THEME_KEY = 'c-theme';        // explicit choice from the toggle
  const HOST_KEY = 'c-theme-host';    // theme set by an embedding viewer

  const storage = (store, key, value) => {
    try {
      if (value === undefined) return store.getItem(key);
      store.setItem(key, value);
    } catch (e) { /* storage blocked: the page still works without it */ }
    return null;
  };

  // ---------- Theme ----------
  const toggle = document.getElementById('theme-toggle');
  const currentTheme = () =>
    root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const updateToggle = () => {
    if (!toggle) return;
    const dark = currentTheme() === 'dark';
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-pressed', String(dark));
  };

  // If an embedding viewer (e.g. a preview) sets the theme and the visitor
  // hasn't picked one, remember it for this tab so every page matches.
  if (!storage(localStorage, THEME_KEY)) {
    if (root.dataset.theme) storage(sessionStorage, HOST_KEY, root.dataset.theme);
    else {
      const host = storage(sessionStorage, HOST_KEY);
      if (host === 'light' || host === 'dark') root.dataset.theme = host;
    }
  }
  new MutationObserver(() => {
    if (!storage(localStorage, THEME_KEY) && root.dataset.theme) {
      storage(sessionStorage, HOST_KEY, root.dataset.theme);
    }
    updateToggle();
  }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      storage(localStorage, THEME_KEY, next);
    });
  }
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateToggle);
  updateToggle();

  // ---------- Active section in the top bar ----------
  const navLinks = [...document.querySelectorAll('.jump nav a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href')));
  if (navLinks.length && sections.every(Boolean)) {
    let ticking = false;
    const markActive = () => {
      ticking = false;
      let index = 0;
      sections.forEach((s, i) => { if (s.getBoundingClientRect().top < 120) index = i; });
      if (innerHeight + scrollY >= document.body.scrollHeight - 4) index = sections.length - 1;
      navLinks.forEach((a, i) => {
        a.classList.toggle('active', i === index);
        if (i === index) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(markActive); }
    }, { passive: true });
    markActive();
  }

  // ---------- Copy email ----------
  const copyButton = document.getElementById('copy-mail');
  const mail = document.getElementById('mail');
  const copyStatus = document.getElementById('copy-status');
  if (copyButton && mail && copyStatus) {
    const selectFallback = () => {
      const range = document.createRange();
      range.selectNodeContents(mail);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Selected, press Ctrl/⌘+C';
    };
    copyButton.addEventListener('click', () => {
      if (!navigator.clipboard) { selectFallback(); return; }
      navigator.clipboard.writeText(mail.textContent.trim())
        .then(() => { copyStatus.textContent = 'Copied'; })
        .catch(selectFallback);
    });
  }

  // ---------- Reduced motion: don't autoplay video ----------
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach((v) => {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }
})();
