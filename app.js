(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const screenEl = $('#deviceScreen');
  const screens = $$('.screen');
  const tabbar = $('#tabbar');
  const toastEl = $('#toast');
  const scrim = $('#sheetScrim');
  const sheetLayer = $('#sheetLayer');
  const IS_ZH = document.documentElement.dataset.lang === 'zh-Hant';
  const ZH = window.MemoraZH || null;
  const tr = (value) => (IS_ZH && ZH ? ZH.t(value) : value);
  const localize = (root) => {
    if (IS_ZH && ZH && root) ZH.translateTree(root);
  };

  const state = {
    screen: 'home',
    textSize: 22,
    draft: true,
    familyNew: 2,
    showPhoto: false,
    readAloud: true,
    captions: true,
    contrast: false,
    chatSettings: { readAloud: true, showPhoto: false, captions: true },
    keyboardOpen: false,
    typed: '',
    recording: false,
    recordingStart: 0,
    recordingTimer: null,
    callTimer: null,
    callLineTimer: null,
    callSeconds: 0,
    callActive: false,
    callHistory: [],
    callIndex: 0,
    call: { muted: false, speaker: true, text: true },
    previewSong: null,
    chosenSong: { title: 'Moon River', meta: 'Andy Williams · 1961' },
    filmStep: 1,
    filmSelected: 2,
    chapter: 'Childhood',
    album: 'shared',
    member: 'Emma',
    sheet: null,
    identifyTimer: null,
    toastTimer: null
  };

  const CHAPTERS = {
    'Childhood': {
      years: '1948–1962',
      quote: '“A whole world, small enough to fit between the back gate and the kitchen table.”',
      cover: 'assets/photos/kitchen.jpg',
      caption: 'Willow Street · summer 1962',
      count: 12,
      memories: [
        ['JUN','1962','The kitchen on Willow Street','Cinnamon, rain, and the blue kettle.','kitchen'],
        ['AUG','1959','Peonies for the table','Dad’s Sunday morning ritual.','garden'],
        ['MAY','1957','My mother’s hands','Thread, flour, and a gold ring.','rings'],
        ['OCT','1954','The day we drove to the sea','Dad’s yellow car, windows down.','car']
      ]
    },
    'Becoming Me': {
      years: '1962–1968',
      quote: '“The first years I chose for myself — a room, a job, a train ticket.”',
      cover: 'assets/photos/car.jpg',
      caption: 'The yellow car · 1966',
      count: 7,
      memories: [
        ['SEP','1966','The yellow car','A first drive with the windows down.','car'],
        ['JUN','1965','A room of my own','One window, one chair, one plant.','peonies'],
        ['MAR','1964','The night train north','A suitcase and a paper cup of tea.','lake'],
        ['NOV','1963','My first winter coat','Navy wool, saved for all summer.','rings']
      ]
    },
    'Love & Family': {
      years: '1968–1985',
      quote: '“Then the house grew louder, and my life grew wider.”',
      cover: 'assets/photos/rings.jpg',
      caption: 'The rings · June 1968',
      count: 10,
      memories: [
        ['JUN','1968','Two gold rings','A small garden wedding, in the rain.','rings'],
        ['JUL','1976','The bench by the pond','The summer we stopped rushing.','lake'],
        ['MAY','1979','Beach at low tide','Sand in every pocket.','beach'],
        ['DEC','1982','Cinnamon Sunday','The kitchen full of children.','kitchen']
      ]
    },
    'Work & Purpose': {
      years: '1985–2004',
      quote: '“I learned that being useful and being needed are not the same thing.”',
      cover: 'assets/photos/garden.jpg',
      caption: 'The garden · 1991',
      count: 6,
      memories: [
        ['APR','1991','The garden gate','A bench, a spade, and a plan.','garden'],
        ['SEP','1994','The long table','Everyone squeezed in.','kitchen'],
        ['FEB','1998','A corner office','With a view of one small tree.','car'],
        ['JUN','2001','The lake at dawn','I learned to be quiet.','lake']
      ]
    },
    'Widening World': {
      years: '2004–2019',
      quote: '“With more time, I said yes to more weather.”',
      cover: 'assets/photos/beach.jpg',
      caption: 'The coast · 2012',
      count: 5,
      memories: [
        ['JUL','2012','The coast in November','Cold hands, warm tea.','beach'],
        ['MAY','2015','The lake without a map','We took the long way home.','lake'],
        ['AUG','2017','Peonies in a paper bag','From the market, for no reason.','peonies'],
        ['OCT','2019','A drive with no destination','The yellow car again, in a dream.','car']
      ]
    },
    'This Chapter': {
      years: 'Now',
      quote: '“These are the days I am living. They deserve a page, too.”',
      cover: 'assets/photos/peonies.jpg',
      caption: 'This morning · 2026',
      count: 2,
      memories: [
        ['TODAY','2026','The kitchen, again','The kettle still whistles.','kitchen'],
        ['THIS WEEK','2026','Peonies on the sill','A small, ordinary joy.','peonies'],
        ['LAST WEEK','2026','The lake with Emma','She brought the sandwiches.','lake'],
        ['SEPTEMBER','2026','Sunday with the family','The long table is still full.','garden']
      ]
    }
  };

  const CALL_SCRIPT = [
    'I can hear the kettle whistling.',
    'Was the kitchen warm when you came in from the rain?',
    'What did your mother hum while she baked?',
    'That sounds like a good afternoon to keep.'
  ];

  const NOTES = {
    home: {
      title: 'Home, without the homework.',
      p: 'Three large, unmistakable ways to begin — talk, photo, music — plus one unfinished memory. Nothing else competes for attention.',
      h: 'Made for older eyes & hands',
      bullets: [
        '22 pt body text by default; 56 px tap targets everywhere.',
        'A written label sits beside every icon, never an icon alone.',
        'Continue appears only when there is a real unfinished memory.'
      ],
      quote: '“Warmth is a feature, not decoration.”'
    },
    chat: {
      title: 'A conversation, not a form.',
      p: 'Momo carries the conversation. The composer keeps voice and typing side by side, and the keyboard’s own Send key finishes the thought.',
      h: 'Small choices, kept visible',
      bullets: [
        'Hold the microphone to speak; release to send. A timer and waveform reassure.',
        'Finish is pinned top-right, so the memory can end at any moment.',
        'Photo and music can be added halfway through without leaving the story.'
      ],
      quote: '“The best interface is a patient listener.”'
    },
    call: {
      title: 'Momo comes out of the frame.',
      p: 'When text is on, Momo steps back and the conversation moves to the centre. Each new line is large; the line before it shrinks and fades.',
      h: 'A call that becomes the diary',
      bullets: [
        'Four labelled controls: mute, read aloud, text, end.',
        'Hanging up returns to the chat and turns the call into transcript bubbles.',
        'One classic Momo. No appearance options to manage.'
      ],
      quote: '“Familiarity is a form of comfort.”'
    },
    family: {
      title: 'Close, without being exposed.',
      p: 'The family album and the private album are different colours, different locks, and different sentences. A quiet view is a message — not a score.',
      h: 'Privacy made legible',
      bullets: [
        'Add family lives in the family row and at the top of the screen.',
        'Watched-memory previews stay blurred until the older adult chooses to reveal them.',
        'No likes, no comments, no reply expected. Just “I was here.”'
      ],
      quote: '“Togetherness should never feel like a performance.”'
    },
    book: {
      title: 'A life, in chapters.',
      p: 'The old list becomes a table of contents. Pages, stitching, a ribbon, and a real page-turn motion make the archive feel like an heirloom.',
      h: 'Orientation before exploration',
      bullets: [
        'Chapters begin at childhood, matching the way life stories are recalled.',
        'Each row pairs a year range with a photograph and memory count.',
        'Make a film is the one dark, high-contrast action on the page.'
      ],
      quote: '“A book is a promise that the story can be returned to.”'
    },
    chapter: {
      title: 'One chapter at a time.',
      p: 'The chapter page keeps the book’s material language while becoming a readable list. Dates sit in the margin like a diary.',
      h: 'Never a wall of text',
      bullets: [
        'Large dates, one title, one line of context per memory.',
        'The chapter photo is a place-marker, not a decorative hero.',
        'A film can be made from this chapter alone.'
      ],
      quote: '“Structure is kindness when a life is large.”'
    },
    memory: {
      title: 'A page worth touching.',
      p: 'Taped photograph, generous leading, a drop cap, and a voice button. The memory reads like a page from a favourite book.',
      h: 'Deletion needs a pause',
      bullets: [
        'Delete is hidden in the page menu, then confirmed a second time.',
        'Read aloud sits before the metadata so it is easy to find.',
        'Private pages say so plainly at the bottom.'
      ],
      quote: '“Keep the words big. Keep the exits clear.”'
    },
    music: {
      title: 'A soundtrack, not a store.',
      p: 'Music is organised by decade and always preview-first. Nothing is chosen by accident; nothing becomes a playlist to manage.',
      h: 'Preview, then choose',
      bullets: [
        'The Use this song action appears only while the preview is playing.',
        'The chosen track is labelled as memoir background music.',
        'Music pauses automatically whenever Momo speaks — no extra switch.'
      ],
      quote: '“A song should open a door, not another task.”'
    },
    film: {
      title: 'A few moments, moving.',
      p: 'The film maker starts with memory checkboxes, not templates. Three or four moments are enough; the rest is warmth and pacing.',
      h: 'A gentle kind of editing',
      bullets: [
        'Large selection cards with the photograph and date always visible.',
        'One warm look and one song — no timeline, no trimming, no jargon.',
        'The preview feels like a cinema, then returns to the family album.'
      ],
      quote: '“Make the keepsake, not the content.”'
    },
    settings: {
      title: 'Comfort is a first-class setting.',
      p: 'Text size, voice, captions, photo visibility and contrast live together at the top. The minimum is 20, the maximum is 30.',
      h: 'Accessibility without a manual',
      bullets: [
        'The slider changes every screen live; the value is shown in points.',
        'No background-music switch exists. Auto-pause is the behaviour, not a chore.',
        'Privacy language names the album, not the database.'
      ],
      quote: '“If it needs explaining twice, it is not accessible yet.”'
    },
    welcome: {
      title: 'An invitation, not a sign-up wall.',
      p: 'The front door offers one clear continuation and one family-code path. The companion is already waiting, so the app feels lived-in.',
      h: 'Dignity at the threshold',
      bullets: [
        'No password grid. A family code is six large, legible digits.',
        'The brand promise is plain: every memory deserves a place.',
        'The private-by-default promise appears before any account is made.'
      ],
      quote: '“Begin with belonging, not administration.”'
    }
  };

  const PHOTOS = [
    ['kitchen','assets/photos/kitchen.jpg','Kitchen · 1962'],
    ['lake','assets/photos/lake.jpg','The lake · 1976'],
    ['garden','assets/photos/garden.jpg','Peonies · 1959'],
    ['rings','assets/photos/rings.jpg','The rings · 1968'],
    ['beach','assets/photos/beach.jpg','The coast · 2012'],
    ['car','assets/photos/car.jpg','The yellow car · 1966']
  ];

  const MUSIC = [
    ['Moon River','Andy Williams · 1961','moon'],
    ['The Very Thought of You','Nat King Cole · 1958','rose'],
    ['What a Wonderful World','Louis Armstrong · 1967','sage'],
    ['La Vie en Rose','Édith Piaf · 1947','gold'],
    ['Stand by Me','Ben E. King · 1961','clay']
  ];

  const ICONS = {
    phone: '<use href="#i-phone"/>',
    phoneOff: '<use href="#i-phone-off"/>',
    mic: '<use href="#i-mic"/>',
    mute: '<use href="#i-mute"/>',
    speaker: '<use href="#i-speaker"/>'
  };

  const photo = (name) => `assets/photos/${name}.jpg`;
  const check = `<svg><use href="#i-check"/></svg>`;

  /* ---------- boot ---------- */
  let booted = false;
  function init() {
    if (booted) return;
    booted = true;
    buildKeyboard();
    bindGlobalEvents();
    setTextSize(22, false);
    setFilmStep(1);
    markLanguagePills();

    const params = new URLSearchParams(location.search);
    const start = params.get('screen');
    const startSize = parseInt(params.get('size'), 10);
    if (startSize >= 20 && startSize <= 30) setTextSize(startSize, false);
    if (start && $(`.screen[data-screen="${start}"]`)) {
      navigate(start, { first: true });
    } else {
      navigate('home', { first: true });
    }
  }

  function markLanguagePills() {
    const current = IS_ZH ? 'zh-Hant' : 'en';
    $$('.lang-pill').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.lang === current);
    });
  }

  /* ---------- navigation ---------- */
  function navigate(id, opts = {}) {
    const target = $(`.screen[data-screen="${id}"]`);
    if (!target) return;
    if (!opts.first) closeSheet();
    if (state.screen === 'call' && id !== 'call') stopCallSession();
    if (id === 'call') {
      if (state.previewSong) {
        stopPreview();
        setTimeout(() => toast('Music paused while Momo speaks.'), 360);
      }
      startCallSession();
    }

    screens.forEach((s) => s.classList.toggle('is-active', s === target));
    state.screen = id;
    $('.screens').scrollTop = 0;

    const scroll = target.querySelector('.screen-scroll');
    if (scroll) scroll.scrollTop = 0;

    tabbar.classList.toggle('is-hidden', target.dataset.tabs === 'false');
    screenEl.classList.toggle('is-dark', target.dataset.theme === 'dark');

    const tabFor = { home: 'home', family: 'family', book: 'book', chapter: 'book', memory: 'book', film: 'book', music: 'music', settings: 'settings', welcome: '' }[id];
    $$('.tab').forEach((t) => t.classList.toggle('is-active', t.dataset.go === tabFor));
    $$('.index-item').forEach((t) => t.classList.toggle('is-active', t.dataset.go === id));

    if (id === 'chapter') renderChapter(state.chapter);
    if (id === 'film') setFilmStep(1);

    updateNotes(id);

    if (id === 'chat') {
      setTimeout(() => {
        const chatScroll = $('#chatScroll');
        if (chatScroll) chatScroll.scrollTop = 0;
      }, 80);
    }
    if (id === 'book') showBookCover(false);
  }

  function updateNotes(id) {
    const n = NOTES[id] || NOTES.home;
    const num = String($$('.screen').findIndex((s) => s.dataset.screen === id) + 1).padStart(2, '0');
    $('#notesCount').textContent = `${num} / 11`;
    $('#notesBody').innerHTML = `
      <h2>${n.title}</h2>
      <p>${n.p}</p>
      <h3>${n.h}</h3>
      <ul>${n.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      <div class="note-quote">${n.quote}</div>`;
  }

  let bookOpenTimer = null;

  function showBookCover(resetScroll = true) {
    const cover = $('#bookCoverView');
    const pages = $('#bookPagesView');
    if (!cover || !pages) return;
    clearTimeout(bookOpenTimer);
    pages.hidden = true;
    pages.classList.remove('is-arriving');
    cover.hidden = false;
    cover.classList.remove('is-opening');
    if (resetScroll) {
      const scroll = $('.screen--book .screen-scroll');
      if (scroll) scroll.scrollTop = 0;
    }
  }

  function openBookPagesDirect() {
    navigate('book');
    const cover = $('#bookCoverView');
    const pages = $('#bookPagesView');
    if (!cover || !pages) return;
    clearTimeout(bookOpenTimer);
    cover.hidden = true;
    cover.classList.remove('is-opening');
    pages.hidden = false;
    pages.classList.add('is-arriving');
    const page = $('#bookPage');
    if (page) {
      page.classList.remove('is-turning');
      void page.offsetWidth;
      page.classList.add('is-turning');
    }
    setTimeout(() => pages.classList.remove('is-arriving'), 620);
  }

  function openBookPages() {
    const cover = $('#bookCoverView');
    const pages = $('#bookPagesView');
    if (!cover || !pages || !pages.hidden || cover.classList.contains('is-opening')) return;
    cover.classList.add('is-opening');
    bookOpenTimer = setTimeout(() => {
      cover.hidden = true;
      cover.classList.remove('is-opening');
      pages.hidden = false;
      pages.classList.add('is-arriving');
      const page = $('#bookPage');
      if (page) {
        page.classList.remove('is-turning');
        void page.offsetWidth;
        page.classList.add('is-turning');
      }
      const scroll = $('.screen--book .screen-scroll');
      if (scroll) scroll.scrollTop = 0;
      setTimeout(() => pages.classList.remove('is-arriving'), 620);
    }, 380);
  }

  /* ---------- events ---------- */
  function bindGlobalEvents() {
    document.addEventListener('click', (event) => {
      const langPill = event.target.closest('button[data-lang]');
      if (langPill) {
        const target = langPill.dataset.lang;
        const current = IS_ZH ? 'zh-Hant' : 'en';
        if (target === current) return;
        const file = target === 'zh-Hant' ? 'index.html' : 'index-en.html';
        const targetScreen = langPill.classList.contains('lang-quick') ? state.screen : 'settings';
        try { localStorage.setItem('memora.lang', target); } catch (error) {}
        location.href = `${file}?screen=${encodeURIComponent(targetScreen)}&size=${state.textSize}`;
        return;
      }

      if (event.target.closest('[data-book-pages]')) {
        event.preventDefault();
        openBookPagesDirect();
        return;
      }

      if (event.target.closest('[data-book-open]')) {
        openBookPages();
        return;
      }

      if (event.target.closest('[data-book-cover]')) {
        showBookCover();
        return;
      }

      const go = event.target.closest('[data-go]');
      if (go) {
        event.preventDefault();
        const id = go.dataset.go;
        if (state.screen === 'call' && id === 'home') {
          stopCallSession();
        }
        navigate(id);
        return;
      }

      const sheet = event.target.closest('[data-sheet]');
      if (sheet) {
        event.preventDefault();
        openSheet(sheet.dataset.sheet);
        return;
      }

      if (event.target.closest('[data-close-sheet]') || event.target.closest('[data-close]')) {
        closeSheet();
        return;
      }

      const chapter = event.target.closest('[data-chapter]');
      if (chapter) {
        event.preventDefault();
        const name = chapter.dataset.chapter;
        state.chapter = name;
        const page = $('#bookPage');
        if (page) {
          page.classList.remove('is-turning');
          void page.offsetWidth;
          page.classList.add('is-turning');
        }
        setTimeout(() => {
          renderChapter(name);
          navigate('chapter');
        }, 310);
        return;
      }

      const member = event.target.closest('[data-member]');
      if (member) {
        state.member = member.dataset.member;
        openSheet('member-sheet');
        return;
      }

      const album = event.target.closest('[data-album]');
      if (album) {
        state.album = album.dataset.album;
        openSheet('album-sheet');
        return;
      }

      const preview = event.target.closest('[data-preview]');
      if (preview) {
        handlePreview(preview);
        return;
      }

      const use = event.target.closest('[data-use]');
      if (use) {
        handleUse(use);
        return;
      }

      const textStep = event.target.closest('[data-text-step]');
      if (textStep) {
        setTextSize(state.textSize + Number(textStep.dataset.textStep));
        return;
      }

      const toggle = event.target.closest('[data-toggle]');
      if (toggle) {
        toggleSetting(toggle.dataset.toggle);
        return;
      }

      const sheetAction = event.target.closest('[data-sheet-action]');
      if (sheetAction) {
        handleSheetAction(sheetAction);
        return;
      }

      const read = event.target.closest('[data-read]');
      if (read) {
        toast('Reading aloud in Momo’s voice…');
        return;
      }

      const sheetToggle = event.target.closest('[data-sheet-toggle]');
      if (sheetToggle) {
        toggleSheetSetting(sheetToggle);
        return;
      }
    });

    $('#activityReveal')?.addEventListener('click', revealActivity);
    $('#holdToTalk')?.addEventListener('pointerdown', startRecording);
    window.addEventListener('pointerup', finishRecording);
    window.addEventListener('pointercancel', finishRecording);

    $('#chatComposer')?.addEventListener('click', (e) => {
      const field = e.target.closest('[data-keyboard]');
      if (field) openKeyboard();
    });

    $('#keyboard')?.addEventListener('click', (e) => {
      const key = e.target.closest('[data-key]');
      if (key) pressKey(key.dataset.key);
      if (e.target.closest('[data-keyboard-close]')) hideKeyboard();
      if (e.target.closest('#keyboardSend')) sendTypedMessage();
    });

    document.addEventListener('keydown', handlePhysicalKey);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.sheet) closeSheet();
        else if (state.keyboardOpen) hideKeyboard();
      }
    });

    $('#textRange')?.addEventListener('input', (e) => setTextSize(e.target.value));
    $('#notesRange')?.addEventListener('input', (e) => setTextSize(e.target.value));
    $('#musicSearch')?.addEventListener('input', filterMusic);
    $$('.chip-filter').forEach((chip) => chip.addEventListener('click', () => {
      $$('.chip-filter').forEach((c) => c.classList.toggle('is-active', c === chip));
      filterMusic();
    }));
    $$('.style-tile').forEach((tile) => tile.addEventListener('click', () => {
      $$('.style-tile').forEach((t) => t.classList.toggle('is-active', t === tile));
      toast(`“${$('strong', tile).textContent}” selected for the film.`);
    }));

    $$('[data-film-memory]').forEach((cb) => cb.addEventListener('change', updateFilmCount));
    $('#filmPrimary')?.addEventListener('click', handleFilmPrimary);
    $('#filmStepPill')?.addEventListener('click', () => {
      if (state.filmStep === 2) setFilmStep(1);
    });

    $('#callMute')?.addEventListener('click', () => {
      state.call.muted = !state.call.muted;
      $('#callMute').classList.toggle('is-on', state.call.muted);
      $('#callMute').setAttribute('aria-pressed', String(state.call.muted));
      $('#callMute').querySelector('svg').innerHTML = state.call.muted ? ICONS.mute : ICONS.mic;
      const label = $('#callMute .control-label');
      if (label) label.textContent = state.call.muted ? tr('Muted') : tr('Mute');
    });

    $('#callSpeaker')?.addEventListener('click', () => {
      state.call.speaker = !state.call.speaker;
      syncCallControls();
    });

    $('#callText')?.addEventListener('click', () => {
      state.call.text = !state.call.text;
      syncCallControls();
    });

    $('#callClose')?.addEventListener('click', endCall);
    $('#callEnd')?.addEventListener('click', endCall);

    scrim?.addEventListener('click', closeSheet);
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1060) $('#mobileHint')?.remove();
    });
  }

  /* ---------- text size ---------- */
  function setTextSize(value, announce = true) {
    const size = Math.max(20, Math.min(30, Number(value) || 22));
    state.textSize = size;
    screenEl.style.setProperty('--reader', `${size}px`);
    screenEl.classList.toggle('is-large-text', size >= 27);
    $('#textSizeValue').textContent = `${size} pt`;
    $('#notesSize').textContent = `${size} pt`;
    $('#textRange').value = size;
    $('#notesRange').value = size;
    const aa = $('#aaPreview');
    if (aa) aa.style.fontSize = `${size + 4}px`;
    if (announce) toast(`Reading size: ${size} pt.`);
  }

  /* ---------- keyboard / chat ---------- */
  function buildKeyboard() {
    const rows = {
      qwerty: 'qwertyuiop'.split(''),
      asdf: 'asdfghjkl'.split(''),
      zxcv: 'zxcvbnm'.split('')
    };
    Object.entries(rows).forEach(([name, letters]) => {
      const row = $(`[data-key-row="${name}"]`);
      if (!row) return;
      row.innerHTML = letters.map((l) => `<button class="key" data-key="${l}">${l.toUpperCase()}</button>`).join('')
        + (name === 'zxcv' ? `<button class="key key--back" data-key="backspace" aria-label="Backspace">⌫</button>` : '');
    });
  }

  function openKeyboard() {
    if (state.keyboardOpen) return;
    state.keyboardOpen = true;
    $('#keyboard').hidden = false;
    $('#chatComposer').classList.add('is-keyboard');
    $('#chatScroll').classList.add('is-keyboard');
    updateComposerText();
    setTimeout(scrollChatToEnd, 100);
  }

  function hideKeyboard() {
    state.keyboardOpen = false;
    $('#keyboard').hidden = true;
    $('#chatComposer').classList.remove('is-keyboard');
    $('#chatScroll').classList.remove('is-keyboard');
    setTimeout(scrollChatToEnd, 100);
  }

  function updateComposerText() {
    const field = $('.composer-field');
    if (!field) return;
    if (state.typed) {
      field.innerHTML = `<span class="typed-line">${escapeHTML(state.typed)}</span><span class="caret"></span>`;
    } else {
      field.innerHTML = `<span>Type a message…</span><svg class="field-keyboard"><use href="#i-keyboard"/></svg>`;
    }
  }

  function pressKey(key) {
    if (!state.keyboardOpen) return;
    if (key === 'backspace') {
      state.typed = state.typed.slice(0, -1);
    } else if (key === '123' || key === 'space') {
      if (key === 'space') state.typed += ' ';
    } else {
      state.typed += key;
    }
    updateComposerText();
  }

  function handlePhysicalKey(e) {
    if (!state.keyboardOpen) return;
    if (document.activeElement?.tagName === 'INPUT') return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      pressKey('backspace');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      sendTypedMessage();
    } else if (e.key.length === 1) {
      pressKey(e.key);
    }
  }

  function sendTypedMessage() {
    const text = state.typed.trim();
    if (!text) return;
    appendUserText(text);
    state.typed = '';
    updateComposerText();
    hideKeyboard();
    simulateReply();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
  }

  function appendUserText(text) {
    const message = document.createElement('div');
    message.className = 'message message--me';
    message.innerHTML = `<div class="bubble bubble--me"><p>${escapeHTML(text)}</p></div>`;
    insertMessage(message);
  }

  function appendMomo(html, className = '') {
    const message = document.createElement('div');
    message.className = 'message message--momo';
    message.innerHTML = `<div class="momo-avatar"><img src="assets/momo.png" alt=""></div><div class="bubble bubble--momo ${className}"><p>${html}</p></div>`;
    localize(message);
    insertMessage(message);
  }

  function appendUserPhoto(src, label) {
    const message = document.createElement('div');
    message.className = 'message message--me';
    message.innerHTML = `<div class="bubble bubble--me bubble--with-photo"><div class="chat-photo"><img src="${src}" alt="${label}"><span>${label}</span></div><p>This one.</p></div>`;
    const caption = message.querySelector('.chat-photo span');
    if (caption) localize(caption);
    insertMessage(message);
  }

  function appendUserSong(title, meta) {
    const message = document.createElement('div');
    message.className = 'message message--me';
    message.innerHTML = `<div class="bubble bubble--me bubble--music"><div class="chat-song"><span class="mini-vinyl"><i></i></span><span><strong>${title}</strong><small>${meta}</small></span><button class="tiny-play" aria-label="Preview ${title}"><svg><use href="#i-play"/></svg></button></div></div>`;
    insertMessage(message);
  }

  function insertMessage(message) {
    const typing = $('#typingIndicator');
    const scroll = $('#chatScroll');
    if (typing) scroll.insertBefore(message, typing);
    else scroll.insertBefore(message, $('.chat-end-space'));
    setTimeout(scrollChatToEnd, 60);
  }

  function scrollChatToEnd() {
    const scroll = $('#chatScroll');
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }

  function simulateReply() {
    const typing = $('#typingIndicator');
    if (!typing) return;
    typing.hidden = false;
    scrollChatToEnd();
    setTimeout(() => {
      typing.hidden = true;
      appendMomo('That’s a lovely detail. I’ll keep it safe in this memory.');
      scrollChatToEnd();
    }, 1100);
  }

  /* ---------- recording ---------- */
  function startRecording(e) {
    if (e) e.preventDefault();
    if (state.recording) return;
    state.recording = true;
    state.recordingStart = Date.now();
    $('#recordingOverlay').hidden = false;
    $('#recordingTime').textContent = '0:00';
    stopPreview();
    state.recordingTimer = setInterval(() => {
      const secs = Math.floor((Date.now() - state.recordingStart) / 1000);
      $('#recordingTime').textContent = `0:${String(secs).padStart(2, '0')}`;
    }, 250);
  }

  function finishRecording(e) {
    if (!state.recording) return;
    if (e && e.type === 'pointerup' && e.target.closest('#recordingOverlay')) {
      // Release anywhere still sends; this is a safe hold-to-talk gesture.
    }
    state.recording = false;
    clearInterval(state.recordingTimer);
    const secs = Math.max(1, Math.round((Date.now() - state.recordingStart) / 1000));
    $('#recordingOverlay').hidden = true;
    const message = document.createElement('div');
    message.className = 'message message--me';
    message.innerHTML = `<div class="bubble bubble--me"><div class="voice-message"><button class="tiny-play" aria-label="Play voice message"><svg><use href="#i-play"/></svg></button><span class="voice-wave">${Array.from({ length: 18 }, (_, i) => `<i style="height:${5 + ((i * 7) % 15)}px"></i>`).join('')}</span><small>0:${String(secs).padStart(2, '0')}</small></div></div>`;
    insertMessage(message);
    simulateReply();
  }

  /* ---------- family ---------- */
  function revealActivity() {
    const button = $('#activityReveal');
    const hidden = $('#activityHidden');
    const memory = $('#activityMemory');
    if (!button || button.getAttribute('aria-expanded') === 'true') return;
    button.setAttribute('aria-expanded', 'true');
    hidden.hidden = true;
    memory.hidden = false;
    $('#activityTitle').textContent = 'Emma watched a memory';
    $('#activityAction').textContent = 'Seen';
    localize($('#activityCard'));
    const badge = $('#familyBadge');
    if (badge) badge.style.display = 'none';
  }

  /* ---------- book / chapter ---------- */
  function renderChapter(name) {
    const data = CHAPTERS[name] || CHAPTERS.Childhood;
    state.chapter = name;
    const opening = $('.chapter-opening');
    if (!opening) return;
    $('.chapter-opening .eyebrow', opening).textContent = `Chapter ${name === 'Childhood' ? 'one' : ''} · ${data.years}`.replace('Chapter  ·', 'Chapter ·');
    $('.chapter-opening h1', opening).textContent = name;
    const img = $('.chapter-cover img', opening);
    if (img) {
      img.src = data.cover;
      img.alt = `${name} chapter photograph`;
    }
    $('.chapter-toolbar > span').textContent = `${data.count} memories`;
    $('.book-footer-pill span:first-child').textContent = name;
    const list = $('.memory-list');
    if (list) {
      list.innerHTML = data.memories.map(([month, year, title, , imgName]) => `
        <button class="memory-row" data-go="memory">
          <span class="memory-date"><strong>${month}</strong><span>${year}</span></span>
          <span class="memory-thumb"><img src="${photo(imgName)}" alt=""></span>
          <span class="memory-copy"><strong>${title}</strong></span>
          <svg><use href="#i-chev-right"/></svg>
        </button>`).join('');
    }
    localize(opening);
    localize($('.chapter-toolbar'));
    localize($('.book-footer-pill'));
    if (list) localize(list);
  }

  /* ---------- music ---------- */
  function filterMusic() {
    const query = ($('#musicSearch')?.value || '').toLowerCase().trim();
    const decade = $('.chip-filter.is-active')?.dataset.decade || 'all';
    let shown = 0;
    $$('.song-row').forEach((row) => {
      const text = row.textContent.toLowerCase();
      const matchQuery = !query || text.includes(query);
      const matchDecade = decade === 'all' || row.dataset.decade === decade;
      const visible = matchQuery && matchDecade;
      row.hidden = !visible;
      if (visible) shown += 1;
    });
    const list = $('#songList');
    let empty = $('#musicEmpty');
    if (!shown) {
      if (!empty) {
        empty = document.createElement('p');
        empty.id = 'musicEmpty';
        empty.className = 'music-empty';
        empty.textContent = tr('No songs.');
        list.appendChild(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  }

  function handlePreview(button) {
    const row = button.closest('.song-row');
    if (!row) return;
    const isOpen = row.classList.contains('is-previewing');
    stopPreview();
    if (isOpen) return;
    state.previewSong = row.dataset.song;
    row.classList.add('is-previewing');
    button.innerHTML = `<svg><use href="#i-pause"/></svg><span>Playing</span>`;
    localize(button);
    row.querySelectorAll('.preview-wave span').forEach((s, i) => {
      s.style.animationDelay = `${i * 0.08}s`;
    });
    // Music belongs to the film; previewing never selects it.
    toast(`Previewing “${row.dataset.song}”. Choose Use this song when it feels right.`);
  }

  function stopPreview() {
    $$('.song-row.is-previewing').forEach((row) => {
      row.classList.remove('is-previewing');
      const b = row.querySelector('.preview-button');
      if (b) {
        b.innerHTML = `<svg><use href="#i-play"/></svg><span>Preview</span>`;
        localize(b);
      }
    });
    state.previewSong = null;
  }

  function handleUse(button) {
    const row = button.closest('.song-row');
    if (!row) return;
    const title = row.dataset.song;
    const meta = row.querySelector('.song-copy small').textContent;
    state.chosenSong = { title, meta };
    $('#chosenTitle').textContent = title;
    $('#chosenMeta').textContent = meta;
    const card = $('#chosenCard');
    card.style.transition = 'transform .2s ease';
    card.style.transform = 'scale(.98)';
    setTimeout(() => { card.style.transform = ''; }, 180);
    stopPreview();
    toast(`“${title}” will play under your memory film. Chosen only as background music.`);
  }

  function handleIdentifiedPreview(button) {
    const stage = button.closest('.identify-stage');
    if (!stage) return;
    const actions = button.closest('.center-actions');
    if (actions) {
      actions.innerHTML = `<button class="sheet-secondary" data-close-sheet>Keep looking</button><button class="sheet-primary" data-sheet-action="identified-use">Use this song</button>`;
      localize(actions);
    }
    toast('Previewing “Moon River”. Choose Use this song only if it feels right.');
  }

  /* ---------- film ---------- */
  function updateFilmCount() {
    const checked = $$('[data-film-memory]').filter((cb) => cb.checked);
    state.filmSelected = checked.length;
    $$('.select-card').forEach((label) => {
      const cb = $('input', label);
      label.classList.toggle('is-selected', !!(cb && cb.checked));
    });
    const note = $('#filmFooterNote');
    if (note) note.textContent = `${state.filmSelected} ${state.filmSelected === 1 ? 'moment' : 'moments'} selected`;
  }

  function setFilmStep(step) {
    state.filmStep = step;
    const one = $('#filmStepOne');
    const two = $('#filmStepTwo');
    if (!one || !two) return;
    one.hidden = step !== 1;
    two.hidden = step !== 2;
    $('#filmStepPill').textContent = `${step} of 2`;
    if (step === 1) {
      $('#filmPrimary').innerHTML = `<span>Choose music</span><svg><use href="#i-arrow-right"/></svg>`;
      updateFilmCount();
    } else {
      $('#filmPrimary').innerHTML = `<span>Preview the film</span><svg><use href="#i-play"/></svg>`;
      const note = $('#filmFooterNote');
      if (note) note.textContent = `${state.filmSelected || 2} moments · about 1 min`;
    }
    localize($('.screen--film'));
  }

  function handleFilmPrimary() {
    if (state.filmStep === 1) {
      if (!state.filmSelected) {
        toast('Choose at least one moment for the film.');
        return;
      }
      setFilmStep(2);
      $('.film-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      openSheet('film-preview-sheet');
      stopPreview();
    }
  }

  /* ---------- settings ---------- */
  function toggleSetting(name) {
    const map = {
      readAloud: { stateKey: 'readAloud', label: 'Read aloud' },
      showPhoto: { stateKey: 'showPhoto', label: 'Show my photo' },
      captions: { stateKey: 'captions', label: 'Captions' },
      contrast: { stateKey: 'contrast', label: 'High contrast' }
    };
    const item = map[name];
    if (!item) return;
    state[item.stateKey] = !state[item.stateKey];
    const button = $(`[data-toggle="${name}"]`);
    if (button) {
      button.classList.toggle('is-on', state[item.stateKey]);
      button.setAttribute('aria-pressed', String(state[item.stateKey]));
    }
    if (name === 'showPhoto') {
      $('#chatScroll').classList.toggle('show-user-photo', state.showPhoto);
    }
    if (name === 'contrast') {
      screenEl.classList.toggle('is-contrast', state.contrast);
    }
    toast(`${item.label} ${state[item.stateKey] ? 'on' : 'off'}.`);
  }

  function toggleSheetSetting(button) {
    const name = button.dataset.sheetToggle;
    if (name in state.chatSettings) {
      state.chatSettings[name] = !state.chatSettings[name];
      button.classList.toggle('is-on', state.chatSettings[name]);
      button.setAttribute('aria-pressed', String(state.chatSettings[name]));
      if (name === 'showPhoto') {
        state.showPhoto = state.chatSettings[name];
        $('#chatScroll').classList.toggle('show-user-photo', state.showPhoto);
      }
      if (name === 'readAloud') state.readAloud = state.chatSettings[name];
      if (name === 'captions') state.captions = state.chatSettings[name];
      return;
    }
    if (name === 'activityAlerts' || name === 'shareViews') {
      button.classList.toggle('is-on');
      button.setAttribute('aria-pressed', String(button.classList.contains('is-on')));
    }
  }

  /* ---------- call ---------- */
  function startCallSession() {
    clearInterval(state.callTimer);
    clearInterval(state.callLineTimer);
    state.callActive = true;
    state.callSeconds = 0;
    state.callHistory = [];
    state.callIndex = 1;
    state.call.text = true;
    const timer = $('#callTimer');
    if (timer) timer.textContent = '00:00';
    syncCallControls();
    addCallLine(CALL_SCRIPT[0]);
    state.callTimer = setInterval(() => {
      state.callSeconds += 1;
      const m = Math.floor(state.callSeconds / 60);
      const sec = state.callSeconds % 60;
      if (timer) timer.textContent = `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }, 1000);
    state.callLineTimer = setInterval(() => {
      if (state.callIndex >= CALL_SCRIPT.length) {
        clearInterval(state.callLineTimer);
        state.callLineTimer = null;
        return;
      }
      addCallLine(CALL_SCRIPT[state.callIndex]);
      state.callIndex += 1;
    }, 6500);
  }

  function addCallLine(line) {
    state.callHistory.push(line);
    const container = $('#callLines');
    if (!container) return;
    const previous = state.callHistory.length > 1 ? state.callHistory[state.callHistory.length - 2] : '';
    container.innerHTML = `
      ${previous ? `<p class="call-line call-line--previous">${escapeHTML(previous)}</p>` : ''}
      <p class="call-line call-line--current">${escapeHTML(line)}</p>`;
    localize(container);
  }

  function stopCallSession() {
    clearInterval(state.callTimer);
    clearInterval(state.callLineTimer);
    state.callTimer = null;
    state.callLineTimer = null;
    state.callActive = false;
  }

  function endCall() {
    if (!state.callActive) {
      navigate('chat');
      return;
    }
    const lines = state.callHistory.slice();
    const timer = $('#callTimer');
    const duration = timer ? timer.textContent : '00:00';
    state.callActive = false;
    stopCallSession();
    navigate('chat');
    setTimeout(() => appendCallTranscript(lines, duration), 160);
  }

  function appendCallTranscript(lines, duration) {
    if (!lines.length) return;
    const scroll = $('#chatScroll');
    if (!scroll) return;
    const marker = document.createElement('div');
    marker.className = 'call-transcript-marker';
    marker.innerHTML = `<span></span>${icon('phone')}<small>${duration}</small><span></span>`;
    const typing = $('#typingIndicator');
    const end = $('.chat-end-space');
    scroll.insertBefore(marker, typing || end);
    lines.forEach((line) => appendMomo(escapeHTML(line)));
    setTimeout(scrollChatToEnd, 80);
  }

  function syncCallControls() {
    const speaker = $('#callSpeaker');
    const text = $('#callText');
    const screen = $('.screen--call');
    if (speaker) {
      speaker.classList.toggle('is-on', state.call.speaker);
      speaker.setAttribute('aria-pressed', String(state.call.speaker));
    }
    if (text) {
      text.classList.toggle('is-on', state.call.text);
      text.setAttribute('aria-pressed', String(state.call.text));
    }
    if (screen) {
      screen.classList.toggle('has-text', state.call.text);
    }
  }

  /* ---------- sheets ---------- */
  function openSheet(name, options = {}) {
    if (!name) return;
    if (state.identifyTimer) {
      clearTimeout(state.identifyTimer);
      state.identifyTimer = null;
    }
    const built = sheetTemplates[name] ? sheetTemplates[name]() : null;
    if (!built) return;
    state.sheet = name;
    sheetLayer.classList.add('is-open');
    sheetLayer.classList.toggle('is-center', !!options.center);
    sheetLayer.innerHTML = typeof built === 'string' ? built : built.html;
    scrim.hidden = false;
    localize(sheetLayer);
    if (typeof built === 'object' && built.center !== undefined) {
      sheetLayer.classList.toggle('is-center', !!built.center);
    }
    if (name === 'identify-sheet') {
      state.identifyTimer = setTimeout(() => {
        const stage = $('.identify-stage');
        if (stage && state.sheet === 'identify-sheet') {
          stage.innerHTML = `<span class="eyebrow" style="color:#9a644e">Found it</span>
            <h2 style="margin-top:5px">Moon River</h2>
            <p>Andy Williams · 1961</p>
            <div class="identified"><span class="album-art album-art--moon"><i></i></span><div><strong>Moon River</strong><small>From “Breakfast at Tiffany’s”</small></div><span class="chosen-tick"><svg><use href="#i-check"/></svg></span></div>
            <div class="center-actions"><button class="sheet-secondary identified-preview" data-sheet-action="identified-preview"><svg><use href="#i-play"/></svg> Preview</button><button class="sheet-primary" data-sheet-action="identified-use">Use this song</button></div>`;
          localize(stage);
        }
      }, 2300);
    }
  }

  function closeSheet() {
    if (!state.sheet) {
      scrim.hidden = true;
      sheetLayer.innerHTML = '';
      sheetLayer.classList.remove('is-open', 'is-center');
      return;
    }
    state.sheet = null;
    if (state.identifyTimer) {
      clearTimeout(state.identifyTimer);
      state.identifyTimer = null;
    }
    scrim.hidden = true;
    sheetLayer.innerHTML = '';
    sheetLayer.classList.remove('is-open', 'is-center');
  }

  function handleSheetAction(button) {
    const action = button.dataset.sheetAction;
    switch (action) {
      case 'copy-code':
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText('482619').catch(() => {});
        }
        toast('Invite code copied: 482 619.');
        break;
      case 'share-invite':
        closeSheet();
        toast('Invite ready to share with your family.');
        break;
      case 'finish-save': {
        state.draft = false;
        closeSheet();
        navigate('home');
        toast('Saved to Childhood. You can find it in your book.');
        break;
      }
      case 'delete-memory':
        openSheet('delete-confirm');
        break;
      case 'confirm-delete':
        closeSheet();
        navigate('chapter');
        toast('Memory moved out of the book.');
        break;
      case 'photo-attach': {
        const [src, label] = (button.dataset.photoAttach || '').split('|');
        closeSheet();
        navigate('chat');
        setTimeout(() => {
          appendUserPhoto(src, label);
          simulateReply();
        }, 220);
        break;
      }
      case 'music-attach': {
        const [title, meta] = (button.dataset.musicAttach || '').split('|');
        closeSheet();
        navigate('chat');
        setTimeout(() => {
          appendUserSong(title, meta);
          simulateReply();
        }, 220);
        break;
      }
      case 'voice':
        $$('.voice-option').forEach((v) => v.classList.toggle('is-active', v === button.closest('.voice-option')));
        toast('Momo’s voice updated.');
        break;
      case 'identified-preview':
        handleIdentifiedPreview(button);
        break;
      case 'identified-use':
        state.chosenSong = { title: 'Moon River', meta: 'Andy Williams · 1961' };
        $('#chosenTitle').textContent = 'Moon River';
        $('#chosenMeta').textContent = 'Andy Williams · 1961';
        closeSheet();
        toast('“Moon River” will play under your memory film.');
        break;
      case 'share-film':
        closeSheet();
        toast('Sent to your Family album.');
        break;
      case 'close':
        closeSheet();
        break;
      default:
        closeSheet();
    }
  }

  function sheetShell(inner, opts = {}) {
    return `<div class="sheet ${opts.className || ''}" role="dialog" aria-modal="true">
      <div class="sheet-handle"></div>
      <button class="sheet-close" data-close-sheet aria-label="Close">${icon('x')}</button>
      ${inner}
    </div>`;
  }

  const sheetTemplates = {
    'add-family-sheet': () => sheetShell(`
      <h2>Add family</h2>
      <div class="invite-code"><span>4</span><span>8</span><span>2</span><span>6</span><span>1</span><span>9</span></div>
      <div class="sheet-actions">
        <button class="sheet-primary" data-sheet-action="share-invite">${icon('share')} Share invite</button>
        <button class="sheet-secondary" data-sheet-action="copy-code">${icon('copy')} Copy code</button>
      </div>
    `),

    'join-family-sheet': () => sheetShell(`
      <h2>Join a family circle</h2>
      <div class="invite-code"><span>7</span><span>3</span><span>1</span><span>2</span><span>0</span><span>4</span></div>
      <div class="sheet-actions">
        <button class="sheet-primary" data-go="home">${icon('users')} Join the circle</button>
        <button class="sheet-secondary" data-close-sheet>Not now</button>
      </div>
    `),

    'attach-sheet': () => sheetShell(`
      <h2>Add to this memory</h2>
      <div class="sheet-actions">
        <button class="sheet-action" data-sheet="photo-picker">${icon('image')} Add a photograph</button>
        <button class="sheet-action" data-sheet="music-attach-sheet">${icon('music')} Add a song</button>
        <button class="sheet-action" data-close-sheet data-start-recording>${icon('mic')} Record a voice note</button>
      </div>
    `),

    'photo-picker': () => sheetShell(`
      <h2>Choose a photograph</h2>
      <div class="photo-picker-grid">
        ${PHOTOS.map(([name, src, label]) => `<button class="photo-choice" data-sheet-action="photo-attach" data-photo-attach="${src}|${label}"><img src="${src}" alt="${label}"><span>${label}</span></button>`).join('')}
      </div>
      <button class="sheet-secondary" data-close-sheet>Cancel</button>
    `),

    'music-attach-sheet': () => sheetShell(`
      <h2>Choose a song</h2>
      <div class="music-choice-list">
        ${MUSIC.map(([title, meta, art]) => `<button class="music-choice" data-sheet-action="music-attach" data-music-attach="${title}|${meta}"><span class="album-art album-art--${art}"><i></i></span><span><strong>${title}</strong><small>${meta}</small></span>${icon('plus')}</button>`).join('')}
      </div>
    `),

    'finish-sheet': () => sheetShell(`
      <h2>Finish this memory</h2>
      <div class="finish-form">
        <div class="finish-field"><label>Title</label><input value="The kitchen on Willow Street" aria-label="Memory title"></div>
        <div class="finish-field"><label>Chapter</label><div class="chapter-select">
          <button class="chapter-pill is-active">Childhood</button><button class="chapter-pill">Becoming Me</button><button class="chapter-pill">Love &amp; Family</button><button class="chapter-pill">This Chapter</button>
        </div></div>
      </div>
      <div class="sheet-actions">
        <button class="sheet-primary" data-sheet-action="finish-save">${icon('check')} Keep this memory</button>
        <button class="sheet-secondary" data-close-sheet>Keep talking</button>
      </div>
    `),

    'chat-settings': () => sheetShell(`
      <h2>Conversation settings</h2>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('speaker')}</span><div><strong>Read Momo aloud</strong></div><button class="switch is-on" data-sheet-toggle="readAloud" aria-pressed="true"><span></span></button></div>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('users')}</span><div><strong>Show my photo</strong></div><button class="switch" data-sheet-toggle="showPhoto" aria-pressed="false"><span></span></button></div>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('captions')}</span><div><strong>Show captions</strong></div><button class="switch is-on" data-sheet-toggle="captions" aria-pressed="true"><span></span></button></div>
      <button class="sheet-secondary" style="margin-top:13px" data-sheet="voice-sheet">${icon('music')} Change Momo’s voice</button>
      <button class="sheet-primary" style="margin-top:8px" data-close-sheet>Done</button>
    `),

    'voice-sheet': () => sheetShell(`
      <h2>Momo’s voice</h2>
      <div class="voice-list">
        <button class="voice-option is-active" data-sheet-action="voice"><span class="voice-dot">${icon('speaker')}</span><div><strong>Warm &amp; slow</strong></div><span class="chosen-tick">${check}</span></button>
        <button class="voice-option" data-sheet-action="voice"><span class="voice-dot">${icon('speaker')}</span><div><strong>Bright &amp; clear</strong></div><span class="chosen-tick">${check}</span></button>
        <button class="voice-option" data-sheet-action="voice"><span class="voice-dot">${icon('speaker')}</span><div><strong>My own recording</strong></div><span class="chosen-tick">${check}</span></button>
      </div>
      <button class="sheet-primary" data-close-sheet>${icon('check')} Use this voice</button>
    `),

    'memory-menu': () => sheetShell(`
      <h2>This memory</h2>
      <div class="menu-list">
        <button class="menu-item" data-close-sheet>${icon('pencil')} Edit the words</button>
        <button class="menu-item" data-close-sheet>${icon('share')} Share with family</button>
        <button class="menu-item" data-close-sheet>${icon('book')} Move to another chapter</button>
        <button class="menu-item menu-item--danger" data-sheet-action="delete-memory">${icon('trash')} Delete this memory</button>
      </div>
      <button class="sheet-secondary" data-close-sheet>Cancel</button>
    `),

    'delete-confirm': () => ({
      html: sheetShell(`
        <div class="danger-illustration">${icon('trash')}</div>
        <h2>Delete this memory?</h2>
        <p>“The kitchen on Willow Street” will be removed from your book. This cannot be undone.</p>
        <div class="center-actions">
          <button class="cancel-button" data-close-sheet>Keep it</button>
          <button class="danger-button" data-sheet-action="confirm-delete">${icon('trash')} Delete</button>
        </div>
      `, { className: 'sheet--center' }),
      center: true
    }),

    'book-settings': () => sheetShell(`
      <h2>Book settings</h2>
      <div class="menu-list">
        <button class="menu-item" data-close-sheet>${icon('pencil')} Rename the book</button>
        <button class="menu-item" data-close-sheet>${icon('palette')} Cover &amp; colour</button>
        <button class="menu-item" data-close-sheet>${icon('share')} Share a reading copy</button>
        <button class="menu-item" data-close-sheet>${icon('book')} Order a printed book</button>
      </div>
      <button class="sheet-secondary" data-close-sheet>Close</button>
    `),

    'privacy-sheet': () => sheetShell(`
      <h2>What family can see</h2>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('users')}</span><div><strong>Family album</strong></div><span class="chosen-tick">${check}</span></div>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('lock')}</span><div><strong>My private album</strong></div><span class="chosen-tick">${check}</span></div>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('eye')}</span><div><strong>Quiet view messages</strong></div><button class="switch is-on" data-sheet-toggle="shareViews" aria-pressed="true"><span></span></button></div>
      <button class="sheet-primary" style="margin-top:13px" data-close-sheet>Done</button>
    `),

    'profile-sheet': () => sheetShell(`
      <h2>My details</h2>
      <div class="member-preview" style="margin-top:12px"><span class="avatar avatar--me avatar--large">M</span><div><strong>Margaret Chen</strong><small>“Maggie” · 74 · Willow Street</small></div></div>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('pencil')}</span><div><strong>Name</strong><small>Margaret Chen</small></div><span style="color:#a28b76;font-size:13px">Edit</span></div>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('sun')}</span><div><strong>Birthday</strong><small>14 March 1952</small></div><span style="color:#a28b76;font-size:13px">Edit</span></div>
      <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('users')}</span><div><strong>Family circle</strong><small>4 people · 2 albums</small></div><span style="color:#a28b76;font-size:13px">Manage</span></div>
      <button class="sheet-primary" style="margin-top:14px" data-close-sheet>Done</button>
    `),

    'family-activity-sheet': () => sheetShell(`
      <h2>Family moments</h2>
      <div class="activity-sheet-list">
        <div class="activity-sheet-item"><span class="reveal-avatar">Em</span><div><strong>Emma watched a memory</strong><small>“The kitchen on Willow Street”</small></div><span>12 min</span></div>
        <div class="activity-sheet-item"><span class="reveal-avatar">D</span><div><strong>Daniel opened the family album</strong><small>4 photographs</small></div><span>2 hrs</span></div>
        <div class="activity-sheet-item"><span class="reveal-avatar">E</span><div><strong>Eleanor watched your film</strong><small>“A Childhood, in three minutes”</small></div><span>Yesterday</span></div>
      </div>
      <button class="sheet-primary" data-close-sheet>Close</button>
    `),

    'member-sheet': () => {
      const members = {
        Eleanor: ['E', 'Eleanor Chen', 'Daughter', 'Family album · films'],
        Daniel: ['D', 'Daniel Chen', 'Son', 'Family album · films'],
        Emma: ['Em', 'Emma Chen', 'Granddaughter', 'Family album · films · quiet views']
      };
      const [initial, name, relation, access] = members[state.member] || members.Emma;
      const cls = state.member === 'Eleanor' ? 'avatar--rose' : state.member === 'Daniel' ? 'avatar--sage' : 'avatar--honey';
      return sheetShell(`
        <h2>${name}</h2>
        <div class="member-preview"><span class="avatar ${cls}">${initial}</span><div><strong>${relation}</strong></div></div>
        <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('users')}</span><div><strong>Can see</strong><small>${access}</small></div></div>
        <div class="settings-sheet-row"><span class="settings-sheet-icon">${icon('lock')}</span><div><strong>Cannot see</strong><small>My private album</small></div></div>
        <button class="sheet-primary" style="margin-top:12px" data-close-sheet>Done</button>
      `);
    },

    'album-sheet': () => {
      const shared = state.album === 'shared';
      return sheetShell(`
        <span class="eyebrow" style="color:${shared ? '#677a5d' : '#9a644e'}">${shared ? 'Everyone can see' : 'Only you'}</span>
        <h2>${shared ? 'Family album' : 'My private album'}</h2>
        <div class="photo-picker-grid">
          ${PHOTOS.map(([name, src, label]) => `<span class="photo-choice"><img src="${src}" alt="${label}"><span>${label}</span></span>`).join('')}
        </div>
        <button class="sheet-primary" data-close-sheet>${icon('book')} Open album</button>
      `);
    },

    'identify-sheet': () => sheetShell(`
      <div class="identify-stage">
        <span class="eyebrow" style="color:#9a644e">Listening</span>
        <div class="identify-orb">${icon('headphones')}</div>
        <h2>Listening</h2>
        <div class="waveform">${Array.from({ length: 15 }, () => '<span></span>').join('')}</div>
      </div>
    `),

    'film-preview-sheet': () => ({
      html: `<div class="sheet sheet--cinema" role="dialog" aria-modal="true">
        <div class="cinema-frame">
          <img src="assets/photos/kitchen.jpg" alt="A kitchen scene in the memory film">
          <div class="cinema-title"><span>CHILDHOOD · 1962</span><strong>The kitchen<br>on Willow Street</strong></div>
        </div>
        <div class="cinema-bar"><span class="play-circle">${icon('pause')}</span><div class="cinema-line"><span></span></div><span class="cinema-time">0:18 / 1:04</span></div>
        <button class="cinema-close" data-sheet-action="share-film">${icon('share')} Send to family album</button>
        <button class="cinema-close" data-close-sheet>Keep it for now</button>
      </div>`,
      center: true
    })
  };

  /* ---------- toast ---------- */
  function toast(message) {
    clearTimeout(state.toastTimer);
    toastEl.textContent = tr(message);
    toastEl.classList.toggle('toast--plain', !$('#tabbar') || $('#tabbar').classList.contains('is-hidden'));
    toastEl.classList.add('is-show');
    state.toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 3300);
  }

  document.addEventListener('DOMContentLoaded', init);
  if (document.readyState !== 'loading') init();})();
