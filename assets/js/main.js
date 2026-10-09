/**
 * Harish Ram A N - Portfolio Scripts
 * Handcrafted interactive systems:
 * - Theme Switcher (Dark / Light with persistence)
 * - Live Time Ticker (IST / Chennai, India)
 * - Interactive Code Workbench (x86_64, Flask, Cloud Functions, GDB)
 * - Command Palette (Ctrl+K / Cmd+K with fuzzy search & keyboard nav)
 * - Project Architecture Deep Dive Modals
 * - One-click Clipboard Copy with Toast Feedback
 * - Subtle Web Audio interaction feedback
 */

(function () {
  'use strict';

  // State Management
  const state = {
    theme: localStorage.getItem('harish_theme') || 'dark',
    audioEnabled: localStorage.getItem('harish_audio') === 'true',
    activeTab: 'asm',
    activeModal: null
  };

  // Sound Synth (Tasteful micro-click using Web Audio API)
  let audioCtx = null;
  function playClickSound(freq = 800, type = 'sine', duration = 0.03) {
    if (!state.audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext not allowed before user gesture
    }
  }

  // --- Theme Controller ---
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('harish_theme', theme);
    state.theme = theme;
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  function toggleTheme() {
    playClickSound(950);
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  }

  // --- Live Time Clock (IST / Asia/Kolkata) ---
  function updateLiveClock() {
    const clockEl = document.getElementById('live-time');
    if (!clockEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      clockEl.textContent = `${timeStr} IST`;
    } catch (e) {
      clockEl.textContent = new Date().toLocaleTimeString() + ' IST';
    }
  }

  // --- Toast System ---
  function showToast(message, icon = '✓') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color:var(--accent-emerald);font-weight:700;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // --- Copy to Clipboard Utility ---
  window.copyToClipboard = function (text, label) {
    playClickSound(1100);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label || text} to clipboard!`);
      }).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label || text} to clipboard!`);
    } catch (err) {
      prompt('Copy to clipboard: Ctrl+C, Enter', text);
    }
    document.body.removeChild(textArea);
  }

  // --- Systems Workbench Tabs ---
  function setupWorkbench() {
    const tabs = document.querySelectorAll('.wb-tab');
    const views = document.querySelectorAll('.code-view');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        playClickSound(750);
        const targetView = tab.getAttribute('data-target');
        
        tabs.forEach(t => t.classList.remove('active'));
        views.forEach(v => v.classList.remove('active'));

        tab.classList.add('active');
        const activeView = document.getElementById(`view-${targetView}`);
        if (activeView) activeView.classList.add('active');
      });
    });
  }

  // --- Modal Manager ---
  window.openModal = function (modalId) {
    playClickSound(600);
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    state.activeModal = modal;
  };

  window.closeModal = function (modalId) {
    playClickSound(500);
    const modal = modalId ? document.getElementById(modalId) : state.activeModal;
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    state.activeModal = null;
  };

  // Close modals on escape key or backdrop click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.activeModal) {
        closeModal();
      }
      closeCommandPalette();
    }
    // Command Palette hotkey: Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    }
  });

  // --- Command Palette System ---
  function toggleCommandPalette() {
    const palette = document.getElementById('cmd-palette-backdrop');
    if (!palette) return;
    if (palette.classList.contains('open')) {
      closeCommandPalette();
    } else {
      openCommandPalette();
    }
  }

  function openCommandPalette() {
    playClickSound(850);
    const palette = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-input');
    if (!palette) return;
    palette.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = '';
      input.focus();
      filterCommands('');
    }
  }

  function closeCommandPalette() {
    const palette = document.getElementById('cmd-palette-backdrop');
    if (!palette) return;
    palette.classList.remove('open');
    document.body.style.overflow = '';
  }

  function filterCommands(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.cmd-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const keywords = item.getAttribute('data-keywords') || '';
      if (!q || text.includes(q) || keywords.toLowerCase().includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // --- Scroll Spy & Smooth Scroll ---
  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(sec => observer.observe(sec));
  }

  // --- Audio Feedback Toggle ---
  window.toggleAudioFeedback = function () {
    state.audioEnabled = !state.audioEnabled;
    localStorage.setItem('harish_audio', state.audioEnabled);
    if (state.audioEnabled) {
      playClickSound(1200);
      showToast('Sound clicks enabled');
    } else {
      showToast('Sound clicks muted');
    }
    updateAudioBtnIcon();
  };

  function updateAudioBtnIcon() {
    const btn = document.getElementById('audio-toggle-btn');
    if (!btn) return;
    btn.innerHTML = state.audioEnabled
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"></path></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    btn.setAttribute('title', state.audioEnabled ? 'Mute micro-sounds' : 'Enable micro-sounds');
  }

  // --- Initialize on DOM Loaded ---
  document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme
    applyTheme(state.theme);
    updateAudioBtnIcon();

    // Start live clock
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // Setup tabs & scrollspy
    setupWorkbench();
    setupScrollSpy();

    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Command palette trigger
    const cmdTrigger = document.getElementById('cmd-palette-btn');
    if (cmdTrigger) cmdTrigger.addEventListener('click', openCommandPalette);

    // Command search input
    const cmdInput = document.getElementById('cmd-input');
    if (cmdInput) {
      cmdInput.addEventListener('input', (e) => filterCommands(e.target.value));
    }

    // Modal backdrop clicks
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('open');
          document.body.style.overflow = '';
          state.activeModal = null;
        }
      });
    });

    // Command item actions
    document.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        playClickSound(800);
        closeCommandPalette();
        const action = item.getAttribute('data-action');
        if (action === 'theme') {
          toggleTheme();
        } else if (action === 'audio') {
          window.toggleAudioFeedback();
        } else if (action === 'copy-email') {
          window.copyToClipboard('harishram2706@gmail.com', 'harishram2706@gmail.com');
        } else if (action === 'copy-phone') {
          window.copyToClipboard('+918838143041', '+91 8838143041');
        } else if (action === 'resume') {
          window.open('resume.pdf', '_blank');
        } else if (action.startsWith('#')) {
          const target = document.querySelector(action);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Attach subtle sounds to buttons and nav links
    document.querySelectorAll('a, button, .skill-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        playClickSound(1400, 'triangle', 0.015);
      });
    });
  });

})();
