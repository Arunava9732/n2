/* ==========================================================================
   ❄️❤️ Love GPT — Master Interactive Engine (GitHub Pages Ready)
   - Realistic Glossy 3D Apple Emojis Everywhere (65+ Verified Zero-404 Map)
   - Zero WebGPU powerPreference / ONNX VerifyEachNode Warnings
   - Realistic 4-Wing (+) Origami Unfolding 50x Explosion Box
   - Realistic Hardcover Sliding 50-Page Book with Per-Page Tactile Craft
   - Biometric Liquid-Heart Vessel & Twin-ECG Harmonic Love Meter
   - Web Audio API Polyphonic Winter Music Box & Tactile Paper Chimes
   ========================================================================== */

(() => {
  "use strict";

  // Silence any main-thread Chromium WebGPU powerPreference or ORT console noise
  if (typeof navigator !== "undefined" && navigator.gpu && typeof navigator.gpu.requestAdapter === "function") {
    const origAdapter = navigator.gpu.requestAdapter.bind(navigator.gpu);
    navigator.gpu.requestAdapter = (opts) => {
      if (opts && typeof opts === "object" && "powerPreference" in opts) {
        const copy = { ...opts };
        delete copy.powerPreference;
        return origAdapter(copy);
      }
      return origAdapter(opts);
    };
  }
  const cleanLog = (fn) => (...args) => {
    const s = typeof args[0] === "string" ? args[0] : "";
    if (s.includes("VerifyEachNodeIsAssignedToAnEp") || s.includes("powerPreference") || s.includes("session_state.cc")) return;
    fn.apply(console, args);
  };
  console.warn = cleanLog(console.warn);
  console.error = cleanLog(console.error);

  // ==================== 1. GLOSSY 3D REALISTIC EMOJI ENGINE ====================
  const EMOJI_CDN = "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.1.2/img/apple/64/";
  const VERIFIED_3D_MAP = {
    "❄️": "2744-fe0f", "❤️": "2764-fe0f", "💖": "1f496", "💕": "1f495", "💓": "1f493",
    "💘": "1f498", "💝": "1f49d", "💞": "1f49e", "🌹": "1f339", "✨": "2728",
    "🌸": "1f338", "🌺": "1f33a", "🌷": "1f337", "👑": "1f451", "💍": "1f48d",
    "💌": "1f48c", "📖": "1f4d6", "📕": "1f4d5", "🎁": "1f381", "🎀": "1f380",
    "🎮": "1f3ae", "🎬": "1f3ac", "🎞️": "1f39e-fe0f", "🇫🇮": "1f1eb-1f1ee", "🕰️": "1f570-fe0f",
    "🥟": "1f95f", "🍨": "1f368", "🍫": "1f36b", "🌶️": "1f336-fe0f", "🥔": "1f954",
    "🧊": "1f9ca", "🃏": "1f0cf", "🎡": "1f3a1", "🔮": "1f52e", "🌌": "1f30c",
    "🌠": "1f320", "🎟️": "1f39f-fe0f", "🫧": "1fae7", "🎙️": "1f399-fe0f", "🔊": "1f50a",
    "📋": "1f4cb", "🔄": "1f504", "🔍": "1f50d", "🏆": "1f3c6", "🏡": "1f3e1",
    "🌲": "1f332", "⛺": "26fa", "🌙": "1f319", "☀️": "2600-fe0f", "🥰": "1f970",
    "😊": "1f60a", "😋": "1f60b", "🏳️": "1f3f3-fe0f", "💋": "1f48b", "⭐": "2b50",
    "🕊️": "1f54a-fe0f", "🌈": "1f308", "🌟": "1f31f", "💎": "1f48e", "🎵": "1f3b5",
    "🎶": "1f3b6", "💬": "1f4ac", "🤍": "1f90d", "🦌": "1f98c", "☕": "2615",
    "🧣": "1f9e3", "🔥": "1f525", "🙏": "1f64f", "💚": "1f49a", "💜": "1f49c",
    "🩵": "1fa75", "🤴": "1f934", "🔬": "1f52c", "👈": "1f448"
  };

  const EMOJI_KEYS_SORTED = Object.keys(VERIFIED_3D_MAP).sort((a, b) => b.length - a.length);
  const EMOJI_REGEX = new RegExp(
    "(" + EMOJI_KEYS_SORTED.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
    "g"
  );

  function emoji3DTag(emoji) {
    const code = VERIFIED_3D_MAP[emoji];
    if (!code) return emoji;
    return `<img class="real-emoji" src="${EMOJI_CDN}${code}.png" alt="${emoji}" draggable="false" />`;
  }

  function hydrate3DEmojis(rootEl) {
    if (!rootEl) return;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA" || tag === "INPUT" || tag === "TITLE") {
          return NodeFilter.FILTER_REJECT;
        }
        return EMOJI_REGEX.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((textNode) => {
      const val = textNode.nodeValue;
      EMOJI_REGEX.lastIndex = 0;
      if (!EMOJI_REGEX.test(val)) return;
      EMOJI_REGEX.lastIndex = 0;

      const frag = document.createDocumentFragment();
      let lastIdx = 0;
      let match;
      while ((match = EMOJI_REGEX.exec(val)) !== null) {
        if (match.index > lastIdx) {
          frag.appendChild(document.createTextNode(val.slice(lastIdx, match.index)));
        }
        const emo = match[0];
        const img = document.createElement("img");
        img.className = "real-emoji";
        img.src = `${EMOJI_CDN}${VERIFIED_3D_MAP[emo]}.png`;
        img.alt = emo;
        img.draggable = false;
        img.onerror = () => img.replaceWith(document.createTextNode(emo));
        frag.appendChild(img);
        lastIdx = EMOJI_REGEX.lastIndex;
      }
      if (lastIdx < val.length) {
        frag.appendChild(document.createTextNode(val.slice(lastIdx)));
      }
      textNode.replaceWith(frag);
    });
  }

  // Preload 3D Sprite Images for Canvas Arcade Games & Floating Hearts
  const SPRITE_3D = {};
  ["❤️", "🌹", "🥟", "🍨", "🍫", "🌶️", "🥔", "🧊", "❄️"].forEach((emo) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.src = `${EMOJI_CDN}${VERIFIED_3D_MAP[emo]}.png`;
    SPRITE_3D[emo] = im;
  });

  // ==================== 2. AMBIENT CRYSTAL MUSIC BOX & CHIME SYNTHESIZER ====================
  const audioEngine = {
    ctx: null,
    playing: false,
    timer: null,
    step: 0,
    ensure() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AC = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    },
    playChimeNote(freq, duration = 1.6, vol = 0.055) {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    },
    softSparkleChime() {
      if (!this.playing) return;
      this.ensure();
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => this.playChimeNote(f, 0.9, 0.035), i * 65);
      });
    },
    toggleMusicBox() {
      this.ensure();
      this.playing = !this.playing;
      clearInterval(this.timer);
      if (this.playing) {
        // Dreamy Romantic Celesta Arpeggio (Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
        const notes = [
          349.23, 440.0, 523.25, 659.25,
          329.63, 392.0, 493.88, 587.33,
          293.66, 349.23, 440.0, 523.25,
          261.63, 329.63, 392.0, 523.25
        ];
        const tick = () => {
          if (!this.playing) return;
          const freq = notes[this.step % notes.length];
          this.playChimeNote(freq, 2.1, 0.045);
          if (this.step % 4 === 0) this.playChimeNote(freq * 0.5, 2.8, 0.03);
          this.step++;
        };
        tick();
        this.timer = setInterval(tick, 520);
      }
      return this.playing;
    }
  };

  // ==================== 3. SECRET NAME VAULT ====================
  const SECRET_FIRST = String.fromCharCode(83, 97, 121, 97, 110, 116, 105);
  const SECRET_FULL = String.fromCharCode(83, 97, 121, 97, 110, 116, 105, 32, 83, 104, 97, 119);

  const state = {
    nameRevealed: false,
    personality: "romantic",
    userAvatarSrc: localStorage.getItem("lovegpt-user-avatar") || "images/thumbs/pic-016.jpg",
    carouselIndex: 0,
    carouselAuto: true,
    carouselTimer: null,
    activeVideoIndex: 0,
    lightboxItems: [],
    lightboxIndex: 0,
    quoteIndex: 0,
    turnIndex: 0,
    lastIntent: null,
    conversationHistory: [],
    usedReplySignatures: new Set(),
    scrapbookPage: 1,
    scrapbookUnveiled: new Set(),
    explosionBoxLayer: 1, // 1..5 nested boxes
    explosionUnfoldedIds: new Set(), // 1..50
    bioLiquidLevel: 1, // 0..1
    bioTargetLevel: 1,
    bioScanning: false,
    worker: null,
    workerReady: false,
    reqCounter: 0,
    pendingWorkerReqs: new Map()
  };

  function enforceNameLock(text) {
    if (!text) return "";
    if (state.nameRevealed) return text;
    return text
      .replace(new RegExp(SECRET_FULL, "gi"), "my beloved Queen")
      .replace(new RegExp(SECRET_FIRST, "gi"), "my love");
  }

  // ==================== 4. 102 PICTURES + 10 VIDEOS ====================
  const PORTRAIT_META = [
    ["Morning Sunshine", "A smile that melts every winter frost ❤️"],
    ["Crimson Grace", "Effortless warmth that makes Arunava's heart skip a beat 🌹"],
    ["Golden Melody", "Radiant in warm gold — the sweetest melody in life ✨"],
    ["Emerald Glow", "Festive lights pale beside the sparkle in those eyes ❤️"],
    ["Garden Bloom", "Pure kindness, innocence, and natural grace 🌸"],
    ["Timeless Poise", "Peace, comfort, and the most soothing smile in the universe 👑"],
    ["Starlit Evening", "Brighter than every star in a snowy night sky ❄️✨"],
    ["Pearls & Devotion", "The eternal Queen of Arunava's heart 👑❤️"],
    ["Sacred Blessings", "Every prayer whispers gratitude for this bond 🙏❤️"],
    ["Sky-Blue Sweetness", "The cutest smile that makes the whole world pause 🥰"],
    ["Breezy Horizons", "Walking hand-in-hand toward snowy dreams 🇫🇮"],
    ["Festive Radiance", "Every celebration becomes magical because of her presence 🌺"],
    ["Under Fairy Lights", "A lifetime of evening strolls and soft laughter ✨"],
    ["Cozy Warmth", "Gentle simplicity and a heart pure as freshly fallen snow ❄️💖"],
    ["Blush Pink Charm", "Soft, precious, and endlessly adored 🌹"]
  ];

  const PHOTOS = Array.from({ length: 102 }, (_, idx) => {
    const num = idx + 1;
    const pad = String(num).padStart(3, "0");
    const isPortrait = num <= 15;
    let title = `Cherished Memory #${pad}`;
    let caption = "A treasured moment wrapped in frost and devotion ❄️❤️";
    if (isPortrait) {
      title = PORTRAIT_META[idx][0];
      caption = PORTRAIT_META[idx][1];
    } else if (num === 16) {
      title = "Holding Hands Forever";
      caption = "No matter where life takes us, my heart chooses you again and again ❤️";
    } else if (num === 17) {
      title = "Delicate Mehndi Bloom";
      caption = "Intricate beauty adorned with celebration and love 💕";
    }
    return {
      id: `photo-${num}`,
      type: "photo",
      src: `images/pic-${pad}.jpg`,
      thumb: `images/thumbs/pic-${pad}.jpg`,
      title,
      caption,
      isPortrait
    };
  });

  const VIDEOS = Array.from({ length: 10 }, (_, idx) => {
    const num = idx + 1;
    const pad = String(num).padStart(2, "0");
    const names = [
      "Forever in Motion", "Whispers of Love", "Dreamy Moments", "Heartbeats Together", "Golden Memories",
      "Romantic Serenade", "Smiling Through Time", "Enchanted Frame", "Candlelight Promise", "Cherished Story Reel"
    ];
    return {
      id: `video-${num}`,
      type: "video",
      src: `videos/vid-${pad}.mp4`,
      title: `Reel ${pad} — ${names[idx]}`,
      caption: "A living memory wrapped in frost and devotion 🎬❤️"
    };
  });

  const SOLO_PORTRAITS = PHOTOS.slice(0, 15);
  let portraitDeck = [];
  let fullPhotoDeck = [];

  function nextPortrait() {
    if (!portraitDeck.length) portraitDeck = [...SOLO_PORTRAITS].sort(() => Math.random() - 0.5);
    return portraitDeck.pop();
  }
  function nextAnyPhoto() {
    if (!fullPhotoDeck.length) fullPhotoDeck = [...PHOTOS].sort(() => Math.random() - 0.5);
    return fullPhotoDeck.pop();
  }

  // ==================== 5. CUSTOM FROSTED GLASS DROPDOWN SYSTEM ====================
  function initFrostDropdowns() {
    const dropdowns = document.querySelectorAll(".frost-dropdown");
    function closeAll(except = null) {
      dropdowns.forEach((dd) => {
        if (dd !== except) {
          dd.classList.remove("open");
          dd.querySelector(".frost-dropdown-trigger")?.setAttribute("aria-expanded", "false");
        }
      });
    }

    dropdowns.forEach((dd) => {
      const trigger = dd.querySelector(".frost-dropdown-trigger");
      const orbEl = dd.querySelector(".dd-orb");
      const titleEl = dd.querySelector(".dd-title");
      const options = dd.querySelectorAll(".frost-dd-option");

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = !dd.classList.contains("open");
        closeAll(dd);
        dd.classList.toggle("open", willOpen);
        trigger.setAttribute("aria-expanded", String(willOpen));
      });

      options.forEach((opt) => {
        opt.addEventListener("click", (e) => {
          e.stopPropagation();
          options.forEach((o) => { o.classList.remove("selected"); o.setAttribute("aria-selected", "false"); });
          opt.classList.add("selected");
          opt.setAttribute("aria-selected", "true");

          const val = opt.dataset.val;
          dd.dataset.value = val;
          if (orbEl && opt.dataset.icon) {
            orbEl.textContent = opt.dataset.icon;
            hydrate3DEmojis(orbEl);
          }
          if (titleEl && opt.dataset.title) titleEl.innerHTML = opt.dataset.title;
          closeAll();

          if (dd.id === "personalityDropdown") {
            state.personality = val;
            showToast(`Soul tone switched to ${opt.dataset.title} ✨`);
          } else if (dd.id === "treatDropdown" || dd.id === "settingDropdown") {
            renderMintedTicket();
          }
        });
      });
    });

    document.addEventListener("click", () => closeAll());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  }

  // ==================== 6. UNLOCK HER NAME CEREMONY ====================
  function triggerNameReveal() {
    const firstUnlock = !state.nameRevealed;
    state.nameRevealed = true;

    document.title = `❄️❤️ Love GPT — Dedicated to ${SECRET_FULL}`;
    const sub = document.getElementById("brandSubText");
    if (sub) { sub.textContent = `Arunava ❤️ ${SECRET_FIRST}`; hydrate3DEmojis(sub); }
    const sal = document.getElementById("letterSalutation");
    if (sal) sal.textContent = `My Dearest ${SECRET_FIRST},`;
    const twoInput = document.getElementById("loverTwoInput");
    if (twoInput && twoInput.value === "My Beloved Queen") twoInput.value = SECRET_FULL;

    renderTimeline();
    renderMintedTicket();
    renderBookSpread(state.scrapbookPage, 0);
    renderExplosionCrossWings();
    if (firstUnlock) {
      spawnCelebrationBurst(36);
      showToast(`✨ Secret Name Unlocked: ${SECRET_FULL} ❤️`);
    }
  }

  // ==================== 7. REALISTIC 50-PAGE HARDCOVER SLIDING BOOK SCRAPBOOK ====================
  // Every page has a physical drag/slide turn AND its own tactile paper craft activity BEFORE showing her photo!
  const BOOK_CHAPTERS = [
    "First Sparks & Sweet Hellos",
    "Sunlit Smiles & Pure Grace",
    "Festive Lights & Blessings",
    "Little Cravings & Cozy Laughs",
    "Snowy Finland & Forever Vows"
  ];

  const BOOK_NOTES = [
    "From our very first hello on 16 October 2025, every ordinary day turned into poetry.",
    "Look at that effortless warmth — one glance quiets every storm in Arunava's world.",
    "Some smiles are pretty; yours feels like morning sunshine melting winter frost.",
    "Nine days from hello to forever — 25 October 2025 will always glow in gold.",
    "Kindness that asks for nothing in return, and grace that outshines every crowd.",
    "Every photograph keeps a tiny piece of how lucky Arunava feels beside you.",
    "Seeing you in person on 24 February 2026 made time stand completely still.",
    "Soft laughter, honest eyes, and the purest heart in this entire universe.",
    "Two families blessing one bond — April and July 2026 sealed destiny in joy.",
    "Steaming hot MOMOs, spicy chutney, and endless stories across the table!"
  ];

  const PAGE_CRAFTS = [
    { kind: "vellum", icon: "❄️", title: "Peel the Frosted Vellum Sheet", hint: "Slide across to peel back the translucent tracing paper covering Page" },
    { kind: "foil", icon: "💖", title: "Rub Off the Rose-Gold Foil Heart", hint: "Rub across the shimmering foil heart below to unveil this page's memory!" },
    { kind: "pocket", icon: "🎀", title: "Pull Photo Out of the Kraft Pocket", hint: "Drag the silk ribbon slider to slide the Polaroid out of its paper sleeve!" },
    { kind: "develop", icon: "✨", title: "Develop the Instant Polaroid Film", hint: "Slide back and forth to develop the fresh instant film into crisp colour!" },
    { kind: "washi", icon: "🌸", title: "Stick Both Washi-Tape Corners", hint: "Place both pastel washi-tape strips onto the page corners to mount the photo!" },
    { kind: "gatefold", icon: "🚪", title: "Swing Open the Floral Gatefold", hint: "Open both Left & Right paper shutters glued onto this scrapbook page!" },
    { kind: "wheel", icon: "🎡", title: "Rotate the Paper Heart Dial", hint: "Turn the paper brass-brad wheel to 100% to align the secret window!" },
    { kind: "blossoms", icon: "🌺", title: "Press the 3 Dried Winter Blossoms", hint: "Press all 3 winter blossoms into the album sheet to bloom the memory!" },
    { kind: "matchbook", icon: "💌", title: "Flip Up the Matchbook Memo Flap", hint: "Slide open the bottom paper lip to flip up the matchbook cover!" },
    { kind: "twine", icon: "🎁", title: "Untie the Baker's Twine String", hint: "Pull the twine string slider across to untie this spread!" }
  ];

  function updateScrapbookBadge() {
    const b = document.getElementById("sbUnlockedBadge");
    if (b) {
      b.textContent = `Unveiled: ${state.scrapbookUnveiled.size} / 50 Pages 📖`;
      hydrate3DEmojis(b);
    }
  }

  function renderBookSpread(pageNum, slideDir = 0) {
    state.scrapbookPage = Math.max(1, Math.min(50, pageNum));
    const sheet = document.getElementById("bookSlidingSheet");
    const leftEl = document.getElementById("sbLeftPage");
    const rightEl = document.getElementById("sbRightPage");
    const ind = document.getElementById("sbPageIndicator");
    const turnSlider = document.getElementById("sbPageTurnDrag");
    if (!sheet || !leftEl || !rightEl) return;

    if (ind) ind.textContent = `Page ${state.scrapbookPage} of 50`;
    if (turnSlider) turnSlider.value = "0";

    const chIdx = Math.floor((state.scrapbookPage - 1) / 10);
    document.querySelectorAll("#scrapbookChapters .filter-pill").forEach((b, i) => {
      b.classList.toggle("active", i === chIdx);
    });

    const p1Idx = (state.scrapbookPage - 1) * 2;
    const p2Idx = p1Idx + 1;
    const photoA = PHOTOS[p1Idx % PHOTOS.length];
    const photoB = PHOTOS[p2Idx % PHOTOS.length];
    const unveiled = state.scrapbookUnveiled.has(state.scrapbookPage);
    const craft = PAGE_CRAFTS[(state.scrapbookPage - 1) % PAGE_CRAFTS.length];
    const noteText = BOOK_NOTES[(state.scrapbookPage - 1) % BOOK_NOTES.length];
    const tail = state.nameRevealed ? ` — Forever yours, ${SECRET_FIRST} ❤️` : ` — Forever in Arunava's heart ❤️`;

    const populatePages = () => {
      // LEFT BOOK PAGE: Chapter Header + First Polaroid (blurred/veiled until page craft completed!)
      leftEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
          <span class="score-pill">📖 Page ${state.scrapbookPage} / 50</span>
          <span style="font-size:0.75rem;font-weight:700;color:var(--ink-soft);">${BOOK_CHAPTERS[chIdx]}</span>
        </div>

        <figure class="polaroid-single-frame" id="sbLeftPolaroid" style="${unveiled ? "" : "filter:blur(11px) brightness(1.08);pointer-events:none;"}">
          <span class="washi-tape" aria-hidden="true"></span>
          <img src="${photoA.thumb}" onerror="this.onerror=null;this.src='${photoA.src}'" alt="Scrapbook memory ${p1Idx + 1}" />
          <figcaption class="polaroid-label">Memory #${p1Idx + 1} ❄️</figcaption>
        </figure>

        <div class="sb-sticker-bar">
          <button type="button" class="sb-sticker-btn">❄️ Frost</button>
          <button type="button" class="sb-sticker-btn">❤️ Love</button>
          <button type="button" class="sb-sticker-btn">🌹 Rose</button>
          <button type="button" class="sb-sticker-btn">🥟 Treat</button>
        </div>
      `;

      leftEl.querySelectorAll(".sb-sticker-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          audioEngine.softSparkleChime();
          spawnCelebrationBurst(12);
          showToast(`Stamped sticker onto Page ${state.scrapbookPage}! ✨`);
        });
      });

      if (unveiled) {
        document.getElementById("sbLeftPolaroid")?.addEventListener("click", () => openLightboxWithList(PHOTOS, p1Idx));
      }

      // RIGHT BOOK PAGE: If NOT unveiled yet -> Tactile Craft Activity! Once unveiled -> Second Polaroid + Handwritten Note!
      if (unveiled) {
        rightEl.innerHTML = `
          <figure class="polaroid-single-frame" id="sbRightPolaroid">
            <span class="washi-tape" aria-hidden="true"></span>
            <img src="${photoB.thumb}" onerror="this.onerror=null;this.src='${photoB.src}'" alt="Scrapbook memory ${p2Idx + 1}" />
            <figcaption class="polaroid-label">Memory #${p2Idx + 1} ❤️</figcaption>
          </figure>
          <p class="sb-handwritten-note">“${enforceNameLock(noteText + tail)}”</p>
          <div style="text-align:right;font-size:0.75rem;font-weight:700;color:var(--rose-primary);">✨ Slide page below for Page ${state.scrapbookPage < 50 ? state.scrapbookPage + 1 : 1} →</div>
        `;
        document.getElementById("sbRightPolaroid")?.addEventListener("click", () => openLightboxWithList(PHOTOS, p2Idx));
      } else {
        let craftWidgetHTML = "";
        if (craft.kind === "foil") {
          craftWidgetHTML = `<canvas id="sbFoilCanvas" width="240" height="110" style="border-radius:14px;border:2px solid #fff;cursor:crosshair;touch-action:none;"></canvas>`;
        } else if (craft.kind === "washi" || craft.kind === "gatefold") {
          const lblA = craft.kind === "washi" ? "🎀 Stick Top Tape" : "🚪 Open Left Flap";
          const lblB = craft.kind === "washi" ? "❄️ Stick Bottom Tape" : "🚪 Open Right Flap";
          craftWidgetHTML = `<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;"><button type="button" class="frosted-pill-btn sb-part-btn">${lblA}</button><button type="button" class="frosted-pill-btn sb-part-btn">${lblB}</button></div>`;
        } else if (craft.kind === "blossoms") {
          craftWidgetHTML = `<div style="display:flex;gap:10px;"><button type="button" class="frosted-pill-btn sb-part-btn">🌸 1</button><button type="button" class="frosted-pill-btn sb-part-btn">🌺 2</button><button type="button" class="frosted-pill-btn sb-part-btn">🌷 3</button></div>`;
        } else {
          craftWidgetHTML = `<input id="sbCraftSlider" type="range" min="0" max="100" value="0" class="tactile-ribbon-slider" style="max-width:250px;" />`;
        }

        rightEl.innerHTML = `
          <div class="page-craft-stage">
            <div style="font-size:2.4rem;">${craft.icon}</div>
            <h3 style="font-family:var(--font-serif);font-size:1.45rem;">${craft.title}</h3>
            <p style="font-size:0.85rem;color:var(--ink-body);max-width:290px;">${craft.hint} ${state.scrapbookPage}!</p>
            ${craftWidgetHTML}
          </div>
        `;

        const completeCraft = () => {
          state.scrapbookUnveiled.add(state.scrapbookPage);
          updateScrapbookBadge();
          audioEngine.softSparkleChime();
          spawnCelebrationBurst(16);
          renderBookSpread(state.scrapbookPage, 0);
        };

        const cSlider = document.getElementById("sbCraftSlider");
        if (cSlider) {
          cSlider.addEventListener("input", () => {
            if (Number(cSlider.value) >= 92) completeCraft();
          });
        }

        const partBtns = rightEl.querySelectorAll(".sb-part-btn");
        if (partBtns.length) {
          let doneCount = 0;
          partBtns.forEach((b) => {
            b.addEventListener("click", () => {
              if (b.disabled) return;
              b.disabled = true;
              b.classList.add("accent-frost-btn");
              doneCount++;
              if (doneCount >= partBtns.length) setTimeout(completeCraft, 180);
            });
          });
        }

        const foilCanvas = document.getElementById("sbFoilCanvas");
        if (foilCanvas) {
          const fctx = foilCanvas.getContext("2d");
          const g = fctx.createLinearGradient(0, 0, 240, 110);
          g.addColorStop(0, "#f9a8d4"); g.addColorStop(0.5, "#fde68a"); g.addColorStop(1, "#f472b6");
          fctx.fillStyle = g;
          fctx.fillRect(0, 0, 240, 110);
          fctx.fillStyle = "#4a1d3d";
          fctx.font = "700 14px 'Plus Jakarta Sans', sans-serif";
          fctx.textAlign = "center";
          fctx.fillText("✨ Rub Foil to Reveal ✨", 120, 60);

          let strokes = 0, rubbing = false;
          const rub = (e) => {
            if (!rubbing) return;
            const r = foilCanvas.getBoundingClientRect();
            const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) * (240 / r.width);
            const y = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) * (110 / r.height);
            fctx.globalCompositeOperation = "destination-out";
            fctx.beginPath(); fctx.arc(x, y, 22, 0, Math.PI * 2); fctx.fill();
            strokes++;
            if (strokes > 14) completeCraft();
          };
          foilCanvas.addEventListener("mousedown", (e) => { rubbing = true; rub(e); });
          window.addEventListener("mouseup", () => { rubbing = false; });
          foilCanvas.addEventListener("mousemove", rub);
          foilCanvas.addEventListener("touchstart", (e) => { rubbing = true; rub(e); }, { passive: true });
          foilCanvas.addEventListener("touchmove", rub, { passive: true });
          foilCanvas.addEventListener("touchend", () => { rubbing = false; });
        }
      }

      hydrate3DEmojis(leftEl);
      hydrate3DEmojis(rightEl);
    };

    if (slideDir !== 0) {
      const cls = slideDir > 0 ? "sliding-next" : "sliding-prev";
      sheet.classList.add(cls);
      setTimeout(() => {
        populatePages();
        sheet.classList.remove(cls);
      }, 240);
    } else {
      populatePages();
    }
  }

  function initScrapbook50Pages() {
    const coverStage = document.getElementById("scrapbookCoverStage");
    const openStage = document.getElementById("scrapbookOpenStage");
    const claspSlider = document.getElementById("bookClaspSlider");
    const pageTurnDrag = document.getElementById("sbPageTurnDrag");

    const openBook = () => {
      coverStage.hidden = true;
      openStage.hidden = false;
      claspSlider.value = "0";
      audioEngine.softSparkleChime();
      spawnCelebrationBurst(24);
      renderBookSpread(state.scrapbookPage, 0);
      updateScrapbookBadge();
    };

    claspSlider.addEventListener("input", () => {
      if (Number(claspSlider.value) >= 88 && !coverStage.hidden) openBook();
    });

    document.getElementById("closeScrapbookBtn").addEventListener("click", () => {
      openStage.hidden = true;
      coverStage.hidden = false;
    });

    document.getElementById("sbPrevBtn").addEventListener("click", () => {
      renderBookSpread(state.scrapbookPage > 1 ? state.scrapbookPage - 1 : 50, -1);
    });
    document.getElementById("sbNextBtn").addEventListener("click", () => {
      renderBookSpread(state.scrapbookPage < 50 ? state.scrapbookPage + 1 : 1, 1);
    });

    // Physical Page-Curl Drag Slider turns page when slid across!
    let turningLock = false;
    pageTurnDrag.addEventListener("input", () => {
      const v = Number(pageTurnDrag.value);
      const sheet = document.getElementById("bookSlidingSheet");
      if (sheet && !turningLock) {
        sheet.style.transform = `perspective(1600px) rotateY(${-v * 0.25}deg) translateX(${-v * 0.3}px)`;
      }
      if (v >= 88 && !turningLock) {
        turningLock = true;
        if (sheet) sheet.style.transform = "";
        renderBookSpread(state.scrapbookPage < 50 ? state.scrapbookPage + 1 : 1, 1);
        setTimeout(() => { turningLock = false; }, 450);
      }
    });
    pageTurnDrag.addEventListener("change", () => {
      if (!turningLock) {
        pageTurnDrag.value = "0";
        const sheet = document.getElementById("bookSlidingSheet");
        if (sheet) sheet.style.transform = "";
      }
    });

    document.querySelectorAll("#scrapbookChapters .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => renderBookSpread(Number(pill.dataset.page), 1));
    });

    // Touch swipe left/right on open book
    const bookShell = document.getElementById("realOpenBookShell");
    let tx = 0;
    bookShell.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
    bookShell.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 55) {
        renderBookSpread(dx < 0 ? (state.scrapbookPage < 50 ? state.scrapbookPage + 1 : 1) : (state.scrapbookPage > 1 ? state.scrapbookPage - 1 : 50), dx < 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  // ==================== 8. REALISTIC 4-WING CROSS-SHAPED (+) ORIGAMI EXPLOSION BOX (50 ORIGAMI FOLDS!) ====================
  // 5 Concentric Nested Boxes × 10 Wing Origami Crafts (2 Up, 2 Left, 2 Right, 2 Down, 2 Center) = 50 Real Origami Pieces!
  function updateExplosionProgressUI() {
    const count = state.explosionUnfoldedIds.size;
    const lbl = document.getElementById("expProgressLabel");
    const bar = document.getElementById("expProgressBar");
    if (lbl) { lbl.textContent = `Unfolded: ${count} / 50 Origami Surprises 🎁`; hydrate3DEmojis(lbl); }
    if (bar) bar.style.width = `${(count / 50) * 100}%`;
  }

  function buildOrigamiUnit(globalId, wingType) {
    const photoIdx = ((globalId - 1) * 2) % PHOTOS.length;
    const photo = PHOTOS[photoIdx];
    const isOpen = state.explosionUnfoldedIds.has(globalId);

    const notes = [
      "Every crease holds endless warmth ❤️",
      "Your smile lights up Arunava's world ✨",
      "Steaming MOMOs & cozy dates forever 🥟",
      "Under Finland's snowy Aurora together 🇫🇮",
      "Chosen in every lifetime since Oct 2025 💍"
    ];
    const note = notes[(globalId - 1) % notes.length];

    const unit = document.createElement("div");
    unit.className = `origami-craft-unit ${isOpen ? "unfolded" : ""}`;

    const markUnfolded = () => {
      state.explosionUnfoldedIds.add(globalId);
      audioEngine.softSparkleChime();
      spawnCelebrationBurst(14);
      updateExplosionProgressUI();
      renderExplosionCrossWings();
    };

    if (isOpen) {
      unit.innerHTML = `
        <span class="exp-flap-num">Origami #${globalId} ✨</span>
        <img src="${photo.thumb}" onerror="this.onerror=null;this.src='${photo.src}'" alt="Origami memory ${globalId}" class="origami-revealed-img" />
        <p class="origami-note-mini">${enforceNameLock(note)}</p>
      `;
      unit.querySelector("img").addEventListener("click", () => openLightboxWithList(PHOTOS, photoIdx));
      hydrate3DEmojis(unit);
      return unit;
    }

    if (wingType === "up") {
      // Triangle Squash-Fold Paper Flaps (Fold Left Triangle + Right Triangle outward!)
      unit.innerHTML = `
        <span class="exp-flap-num">#${globalId} • Origami Squash Fold</span>
        <div class="squash-pocket-stage">
          <button type="button" class="paper-tri-flap left-tri">↖ Peel Left</button>
          <button type="button" class="paper-tri-flap right-tri">Peel Right ↗</button>
        </div>
        <small style="font-size:0.7rem;color:var(--ink-soft);">Unfold both paper triangles!</small>
      `;
      let opened = 0;
      unit.querySelectorAll(".paper-tri-flap").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.classList.contains("folded-open")) return;
          btn.classList.add("folded-open");
          opened++;
          if (opened >= 2) setTimeout(markUnfolded, 380);
        });
      });
    } else if (wingType === "left") {
      // Waterfall Pull-Tab Cascade (Drag pull-tab slider!)
      unit.innerHTML = `
        <span class="exp-flap-num">#${globalId} • Waterfall Pull-Tab</span>
        <div style="font-size:1.7rem;">🎀📸</div>
        <input type="range" min="0" max="100" value="0" class="tactile-ribbon-slider wf-slider" />
        <small style="font-size:0.7rem;color:var(--ink-soft);">Drag pull-tab across to cascade!</small>
      `;
      const sl = unit.querySelector(".wf-slider");
      sl.addEventListener("input", () => {
        if (Number(sl.value) >= 90) markUnfolded();
      });
    } else if (wingType === "right") {
      // Zig-Zag Accordion Pleat Strip (Stretch pleats flat!)
      unit.innerHTML = `
        <span class="exp-flap-num">#${globalId} • Zig-Zag Accordion</span>
        <div class="accordion-pleats-preview" style="transform:scaleX(0.45);"></div>
        <input type="range" min="0" max="100" value="0" class="tactile-ribbon-slider acc-slider" />
        <small style="font-size:0.7rem;color:var(--ink-soft);">Slide to stretch paper pleats!</small>
      `;
      const preview = unit.querySelector(".accordion-pleats-preview");
      const sl = unit.querySelector(".acc-slider");
      sl.addEventListener("input", () => {
        const v = Number(sl.value);
        preview.style.transform = `scaleX(${0.45 + (v / 100) * 0.55})`;
        if (v >= 90) markUnfolded();
      });
    } else if (wingType === "down") {
      // Belly-Band + Envelope Seal Flap (2-Step Paper Envelope!)
      unit.innerHTML = `
        <span class="exp-flap-num">#${globalId} • Belly-Band Envelope</span>
        <input type="range" min="0" max="100" value="0" class="tactile-ribbon-slider band-slider" />
        <button type="button" class="frosted-pill-btn env-flap-btn" disabled style="opacity:0.5;font-size:0.72rem;padding:5px 10px;">💌 Lift Seal Flap</button>
        <small class="env-step-lbl" style="font-size:0.7rem;color:var(--ink-soft);">1. Slide off paper belly-band</small>
      `;
      const sl = unit.querySelector(".band-slider");
      const flapBtn = unit.querySelector(".env-flap-btn");
      const stepLbl = unit.querySelector(".env-step-lbl");
      sl.addEventListener("input", () => {
        if (Number(sl.value) >= 88) {
          flapBtn.disabled = false;
          flapBtn.style.opacity = "1";
          stepLbl.textContent = "2. Now lift the envelope flap!";
        }
      });
      flapBtn.addEventListener("click", markUnfolded);
    } else {
      // Center Core Double Gatefold Shutters
      unit.innerHTML = `
        <span class="exp-flap-num">#${globalId} • Heart Gatefold</span>
        <div class="gatefold-stage">
          <button type="button" class="gate-door-btn">◀ Left</button>
          <button type="button" class="gate-door-btn">Right ▶</button>
        </div>
        <small style="font-size:0.7rem;color:var(--ink-soft);">Swing both shutters open!</small>
      `;
      let doors = 0;
      unit.querySelectorAll(".gate-door-btn").forEach((d) => {
        d.addEventListener("click", () => {
          if (d.classList.contains("open-door")) return;
          d.classList.add("open-door");
          doors++;
          if (doors >= 2) setTimeout(markUnfolded, 350);
        });
      });
    }

    hydrate3DEmojis(unit);
    return unit;
  }

  function renderExplosionCrossWings() {
    const baseOffset = (state.explosionBoxLayer - 1) * 10; // 0, 10, 20, 30, 40

    const upBox = document.getElementById("wingUpContainer");
    const leftBox = document.getElementById("wingLeftContainer");
    const rightBox = document.getElementById("wingRightContainer");
    const downBox = document.getElementById("wingDownContainer");
    const centerBox = document.getElementById("wingCenterContainer");
    if (!upBox) return;

    const fillWing = (container, label, idA, idB, type) => {
      container.innerHTML = `<div class="wing-header-tag">${label}</div><div class="origami-pair-row"></div>`;
      const row = container.querySelector(".origami-pair-row");
      row.appendChild(buildOrigamiUnit(idA, type));
      row.appendChild(buildOrigamiUnit(idB, type));
      hydrate3DEmojis(container);
    };

    fillWing(upBox, `⬆️ Top Origami Wing • Nested Box ${state.explosionBoxLayer}`, baseOffset + 1, baseOffset + 2, "up");
    fillWing(leftBox, `⬅️ Left Waterfall Wing • Box ${state.explosionBoxLayer}`, baseOffset + 3, baseOffset + 4, "left");
    fillWing(rightBox, `➡️ Right Accordion Wing • Box ${state.explosionBoxLayer}`, baseOffset + 5, baseOffset + 6, "right");
    fillWing(downBox, `⬇️ Bottom Envelope Wing • Box ${state.explosionBoxLayer}`, baseOffset + 7, baseOffset + 8, "down");
    fillWing(centerBox, `💖 Center Heart Base • Nested Box ${state.explosionBoxLayer} of 5`, baseOffset + 9, baseOffset + 10, "center");

    const nextLayer = state.explosionBoxLayer < 5 ? state.explosionBoxLayer + 1 : 1;
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "nested-box-next-btn sheen-hover";
    nextBtn.textContent = state.explosionBoxLayer < 5
      ? `🎁 Lift Inner Nested Box #${nextLayer} Lid (Unfold Next 10 Origami!) →`
      : `🔄 Return to Outer Box #1`;
    nextBtn.addEventListener("click", () => {
      state.explosionBoxLayer = nextLayer;
      document.querySelectorAll("#expLayerTabs .filter-pill").forEach((p) => {
        p.classList.toggle("active", Number(p.dataset.boxlayer) === state.explosionBoxLayer);
      });
      audioEngine.softSparkleChime();
      spawnCelebrationBurst(20);
      renderExplosionCrossWings();
    });
    centerBox.appendChild(nextBtn);
    hydrate3DEmojis(centerBox);
  }

  function initExplosionBox50() {
    const closedStage = document.getElementById("explosionClosedStage");
    const openStage = document.getElementById("explosionOpenStage");
    const ribbonSlider = document.getElementById("untieBoxRibbonSlider");
    const lidEl = document.getElementById("isoBoxLid");
    const liftBtn = document.getElementById("liftBoxLidBtn");
    const stepHead = document.getElementById("boxStepHeading");
    const stepSub = document.getElementById("boxStepSub");

    ribbonSlider.addEventListener("input", () => {
      if (Number(ribbonSlider.value) >= 88) {
        lidEl.classList.add("bow-untied");
        stepHead.textContent = "Step 2: Ribbon Untied! Now Lift the Box Lid!";
        stepSub.textContent = "Click below to lift off the lid so the Top, Bottom, Left & Right walls fall flat!";
        liftBtn.hidden = false;
        hydrate3DEmojis(liftBtn);
      }
    });

    liftBtn.addEventListener("click", () => {
      lidEl.classList.add("lid-lifted");
      audioEngine.softSparkleChime();
      spawnCelebrationBurst(32);
      setTimeout(() => {
        closedStage.hidden = true;
        openStage.hidden = false;
        renderExplosionCrossWings();
        updateExplosionProgressUI();
      }, 520);
    });

    document.getElementById("refoldBoxBtn").addEventListener("click", () => {
      openStage.hidden = true;
      closedStage.hidden = false;
      ribbonSlider.value = "0";
      lidEl.classList.remove("bow-untied", "lid-lifted");
      liftBtn.hidden = true;
      stepHead.textContent = "Step 1: Slide Satin Ribbon to Untie Bow";
      stepSub.textContent = "Drag the silk ribbon slider all the way across to release the 4 folded origami walls!";
    });

    document.querySelectorAll("#expLayerTabs .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#expLayerTabs .filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        state.explosionBoxLayer = Number(pill.dataset.boxlayer);
        renderExplosionCrossWings();
      });
    });
  }

  // ==================== 9. REDESIGNED BIOMETRIC LIQUID-HEART & TWIN-ECG LOVE METER ====================
  function initBiometricLoveMeter() {
    const waveFront = document.getElementById("liquidWaveFront");
    const waveBack = document.getElementById("liquidWaveBack");
    const ringArc = document.getElementById("bioRingArc");
    const centerPct = document.getElementById("bioCenterPercent");
    const centerSub = document.getElementById("bioCenterSub");
    const ecgCanvas = document.getElementById("bioEcgCanvas");
    const ecgCtx = ecgCanvas.getContext("2d");
    const syncBadge = document.getElementById("bioSyncStatus");
    const verdictEl = document.getElementById("loveMeterVerdict");
    const scanBtn = document.getElementById("calcLoveBtn");

    let phase = 0;

    function buildWavePath(level, phaseOffset, amp) {
      // Heart clip spans y = 42 (top) to y = 176 (bottom)
      const topY = 178 - level * 138;
      let d = `M 35 ${topY} `;
      for (let x = 35; x <= 185; x += 10) {
        const y = topY + Math.sin((x * 0.06) + phaseOffset) * amp;
        d += `L ${x} ${y.toFixed(1)} `;
      }
      d += "L 185 190 L 35 190 Z";
      return d;
    }

    function animateMeter() {
      phase += 0.065;
      state.bioLiquidLevel += (state.bioTargetLevel - state.bioLiquidLevel) * 0.07;

      if (waveFront && waveBack) {
        waveBack.setAttribute("d", buildWavePath(state.bioLiquidLevel, -phase * 0.8 + 1.2, 5.5));
        waveFront.setAttribute("d", buildWavePath(state.bioLiquidLevel, phase, 4.5));
      }

      // Draw Live Twin-Heartbeat ECG Oscilloscope
      const W = ecgCanvas.width;
      const H = ecgCanvas.height;
      ecgCtx.clearRect(0, 0, W, H);

      // Subtle medical crystal grid
      ecgCtx.strokeStyle = "rgba(235, 54, 120, 0.08)";
      ecgCtx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 38) {
        ecgCtx.beginPath(); ecgCtx.moveTo(gx, 0); ecgCtx.lineTo(gx, H); ecgCtx.stroke();
      }

      const drawBeatWave = (color, yMid, phaseLag) => {
        ecgCtx.strokeStyle = color;
        ecgCtx.lineWidth = 2.4;
        ecgCtx.beginPath();
        for (let x = 0; x < W; x += 3) {
          const cycle = ((x * 0.045 - phase * 2.2 + phaseLag) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          let spike = 0;
          if (cycle > 2.7 && cycle < 3.0) spike = -26 * Math.sin((cycle - 2.7) * (Math.PI / 0.3));
          else if (cycle >= 3.0 && cycle < 3.25) spike = 14 * Math.sin((cycle - 3.0) * (Math.PI / 0.25));
          else if (cycle > 3.5 && cycle < 4.0) spike = -8 * Math.sin((cycle - 3.5) * (Math.PI / 0.5));
          const y = yMid + spike + Math.sin(x * 0.03 - phase) * 2;
          if (x === 0) ecgCtx.moveTo(x, y); else ecgCtx.lineTo(x, y);
        }
        ecgCtx.stroke();
      };

      const lag = state.bioScanning ? 0.9 : 0.08;
      drawBeatWave("rgba(56, 189, 248, 0.85)", H / 2 + 2, lag);
      drawBeatWave("rgba(235, 54, 120, 0.92)", H / 2 - 2, 0);

      requestAnimationFrame(animateMeter);
    }
    requestAnimationFrame(animateMeter);

    scanBtn.addEventListener("click", () => {
      if (state.bioScanning) return;
      state.bioScanning = true;
      audioEngine.softSparkleChime();

      const a = document.getElementById("loverOneInput").value.trim().toLowerCase();
      const b = document.getElementById("loverTwoInput").value.trim().toLowerCase();
      const isSoulmatePair = `${a} ${b}`.includes("arunava") || `${a} ${b}`.includes("queen") || `${a} ${b}`.includes(SECRET_FIRST.toLowerCase());

      state.bioTargetLevel = 0.12;
      ringArc.style.transition = "stroke-dashoffset 0.3s ease";
      ringArc.setAttribute("stroke-dashoffset", "540");
      syncBadge.textContent = "🔬 Scanning Heartbeat Frequencies...";

      const pillarTargets = isSoulmatePair ? [100, 100, 100, 100, 100] : [91, 94, 89, 92, 95];
      for (let i = 0; i < 5; i++) {
        const bar = document.querySelector(`[data-pbar="${i}"]`);
        const val = document.querySelector(`[data-pval="${i}"]`);
        if (bar) bar.style.width = "10%";
        if (val) val.textContent = "...";
      }

      const steps = [0.28, 0.48, 0.68, 0.86, isSoulmatePair ? 1.0 : 0.93];
      steps.forEach((lvl, idx) => {
        setTimeout(() => {
          state.bioTargetLevel = lvl;
          const pct = Math.round(lvl * 100);
          centerPct.textContent = idx === 4 && isSoulmatePair ? "∞%" : `${pct}%`;
          centerSub.textContent = idx < 4 ? "SYNCING..." : (isSoulmatePair ? "SOULMATES" : "SWEET MATCH");
          const offset = 615.75 * (1 - lvl);
          ringArc.style.transition = "stroke-dashoffset 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
          ringArc.setAttribute("stroke-dashoffset", String(offset.toFixed(1)));

          const bar = document.querySelector(`[data-pbar="${idx}"]`);
          const val = document.querySelector(`[data-pval="${idx}"]`);
          if (bar) bar.style.width = `${pillarTargets[idx]}%`;
          if (val) val.textContent = idx === 4 && isSoulmatePair ? "∞%" : `${pillarTargets[idx]}%`;

          if (idx === 4) {
            state.bioScanning = false;
            syncBadge.textContent = isSoulmatePair ? "100% Phase-Locked Eternal Harmony ✨" : "93% Sweet Harmonic Resonance 💕";
            verdictEl.textContent = enforceNameLock(
              isSoulmatePair
                ? `Cosmic Verdict: Every heartbeat, snowy dream, and star since 16 October 2025 confirms 1000% Eternal Soulmates! ❤️❄️`
                : `Lovely harmony — inspired by Arunava & his Queen's infinite 1000% soulmate bond! 💕`
            );
            hydrate3DEmojis(syncBadge);
            hydrate3DEmojis(verdictEl);
            spawnCelebrationBurst(28);
          }
        }, (idx + 1) * 380);
      });
    });
  }

  // ==================== 10. DEEP 30-INTENT CONTEXT-AWARE ROMANTIC LLM ENGINE ====================
  const OFF_TOPIC_REGEX = /\b(python|javascript|java|c\+\+|sql|algorithm|binary search|leetcode|compile|regex|calculus|integral|derivative|physics|chemistry|biology|photosynthesis|mitochondria|quantum|stock market|bitcoin|crypto|gdp|inflation|president|prime minister|parliament|election|world war|world cup|tax return|excel formula)\b/i;

  function isNameQuery(q) {
    return (
      /\b(what is her name|whats her name|what s her name|what is my name|whats my name|what s my name|tell me her name|tell me my name|spell her name|spell my name|say my name|say her name|do you know my name|do you know her name|who am i by name|her name|my name)\b/.test(q) ||
      q === "name"
    );
  }

  function classifyIntent(q) {
    if (/^(why|how so|really|are you sure|tell me more|what else|elaborate|explain|and then|seriously|prove it)\b/.test(q) && q.split(" ").length <= 6 && state.lastIntent) return "follow_up";
    if (/\b(i love you|love u|luv u|love you so much)\b/.test(q)) return "i_love_you";
    if (/\b(scrapbook|50 page|book of memories)\b/.test(q)) return "scrapbook_hint";
    if (/\b(explosion box|gift box|50 surprise|origami)\b/.test(q)) return "explosion_hint";
    if (/\b(video|videos|reel|reels|clip|watch|play a movie|motion)\b/.test(q)) return "video";
    if (/\b(love letter|write a letter|romantic letter|sealed letter)\b/.test(q)) return "letter";
    if (/\b(first chat|16 oct|october 16|how did we start talking)\b/.test(q)) return "first_chat";
    if (/\b(acceptance|said yes|propose|25 oct|october 25)\b/.test(q)) return "acceptance";
    if (/\b(first meet|met in person|24 feb|february 24)\b/.test(q)) return "first_meet";
    if (/\b(parents|family|07 apr|19 apr|official meeting|03 jul|july 3)\b/.test(q)) return "family_blessing";
    if (/\b(timeline|dates|milestones|when did we|anniversary|our story|love story)\b/.test(q)) return "timeline";
    if (/\b(momo|momos|dumpling)\b/.test(q)) return "momo";
    if (/\b(ice cream|kitkat|kurkure|chips|food|foods|eat|snack|snacks|chocolate|craving|hungry)\b/.test(q)) return "food";
    if (/\b(finland|lapland|aurora|northern lights|igloo|dream destination|dream trip|travel|country|honeymoon|snow|winter)\b/.test(q)) return "finland";
    if (/\b(what makes .* beautiful|7 things|qualities of her beauty)\b/.test(q)) return "beauty_qualities";
    if (/\b(eyes|eye|gaze|kajal|blink)\b/.test(q)) return "eyes";
    if (/\b(smile|laugh|laughter|giggle|voice)\b/.test(q)) return "smile";
    if (/\b(saree|kurti|dress|outfit|mehndi|bindi|wear|traditional)\b/.test(q)) return "grace_style";
    if (/\b(how she is|how is she|what is she like|her nature|her personality|describe her|about her|how am i|what am i like|my nature|tell me about me|who is she)\b/.test(q)) return "nature";
    if (/\b(who is arunava|about arunava|tell me about arunava|how is arunava|my husband)\b/.test(q)) return "about_arunava";
    if (/\b(best wife|precious wife|ideal wife|amazing wife|perfect wife)\b/.test(q)) return "best_wife";
    if (/\b(cutest|cute|adorable|sweetest|cutie)\b/.test(q)) return "cutest";
    if (/\b(queen|crown|royal|rules his heart|arunava s heart)\b/.test(q)) return "queen";
    if (/\b(most important|priority|number one|center of his world)\b/.test(q)) return "most_important";
    if (/\b(deserves all happiness|deserves happiness|wish for her)\b/.test(q)) return "deserves_happiness";
    if (/\b(why .* special|so special|irreplaceable)\b/.test(q)) return "why_special";
    if (/\b(beautiful|pretty|gorgeous|looks|graceful)\b/.test(q)) return "beauty";
    if (/\b(why .* love|what made .* fall in love|reason you love)\b/.test(q)) return "why_love";
    if (/\b(how much .* sayanti love|how much do i love|our bond|their bond|relationship)\b/.test(q)) return "mutual_bond";
    if (/\b(how much .* love|do you love|love me|love her|depth of love)\b/.test(q)) return "love_depth";
    if (/\b(sad|upset|tired|exhausted|low|stress|bad day|cry|lonely|miss|missing|hug|anxious)\b/.test(q)) return "comfort";
    if (/\b(angry|mad|fight|annoyed|sorry|pout|nakhre|scold|flaw)\b/.test(q)) return "playful_peace";
    if (/\b(poem|poetry|shayari|song|verse|rhyme)\b/.test(q)) return "poem";
    if (/\b(story|bedtime story|fairytale)\b/.test(q)) return "story";
    if (/\b(secret|promise|vow)\b/.test(q)) return "promise";
    if (/\b(future|forever|grow old|marriage|home|life together|years from now)\b/.test(q)) return "future";
    if (/\b(photo|photos|picture|pictures|pic|selfie|show me|memory|memories)\b/.test(q)) return "photo";
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|good night|namaste|hii+|how are you)\b/.test(q)) return "greeting";
    return "conversational";
  }

  function applyPersonalityVoice(text) {
    if (state.personality === "poetic") return text + "\n\n*Like winter frost kissing a blooming rose, every heartbeat writes this truth across the sky.* 🌹❄️";
    if (state.personality === "playful") return text + "\n\n*(Official side-note: zero arguments allowed — 1000% certified by Arunava's heart! 🥰✨)*";
    if (state.personality === "royal") return text + "\n\n*Sealed by royal decree of Arunava's heart — cherished for all eternity.* 👑✨";
    return text;
  }

  function pickUniqueFromPool(variants, isMe) {
    for (let i = 0; i < variants.length; i++) {
      const candidate = variants[(state.turnIndex + i) % variants.length];
      if (!state.usedReplySignatures.has(candidate)) {
        state.usedReplySignatures.add(candidate);
        return candidate;
      }
    }
    const openings = [
      "Every time Arunava's heart reflects on this, an even deeper warmth unfolds —",
      "Words almost fall short of the feeling, yet one truth shines unmistakably:",
      "Looking past everything ordinary in this busy world,",
      "In every quiet heartbeat, unspoken glance, and shared dream,",
      "Like fresh winter snow catching golden morning sunshine,",
      "From the truest, most peaceful corner of Arunava's soul,"
    ];
    const middles = [
      `${isMe ? "you carry" : "she carries"} an irreplaceable blend of softness, quiet grace, and pure sincerity`,
      `${isMe ? "your" : "her"} kindness, comforting laughter, and genuine heart turn simple hours into treasures`,
      `being beside ${isMe ? "you" : "her"} quiets every storm and makes the whole future feel bright and safe`,
      `every thoughtful gesture and warm expression deepens Arunava's admiration day after day`,
      `there is a calm, effortless magic in ${isMe ? "your" : "her"} spirit that feels exactly like coming home`
    ];
    const closings = [
      "— cherished more deeply with every passing sunrise. ❄️❤️",
      "— a blessing written in winter stars since October 2025. 🌹✨",
      "— forever the safest, sweetest home Arunava has ever known. 💖❄️"
    ];
    for (let k = 0; k < 45; k++) {
      const n = state.turnIndex + k;
      const woven = `${openings[n % openings.length]} ${middles[(n * 3 + 1) % middles.length]} ${closings[(n * 5 + 2) % closings.length]}`;
      if (!state.usedReplySignatures.has(woven)) {
        state.usedReplySignatures.add(woven);
        return woven;
      }
    }
    return `${openings[0]} ${middles[0]} ❄️❤️`;
  }

  function composeDeepRomanticAnswer(intent, rawInput, qNorm) {
    const isMe = /\b(i|me|my|am i|myself)\b/.test(qNorm);
    const subj = state.nameRevealed ? SECRET_FIRST : (isMe ? "you" : "she");
    const SubjCap = state.nameRevealed ? SECRET_FULL : (isMe ? "You" : "She");
    const obj = state.nameRevealed ? SECRET_FULL : (isMe ? "you" : "her");

    const pools = {
      i_love_you: [`And Arunava loves ${isMe ? "you" : obj}${state.nameRevealed ? `, ${SECRET_FIRST},` : ""} ten thousand times more — with every breath, every quiet thought, and every heartbeat, today and forever! ❤️❄️🌹`],
      nature: [
        `${SubjCap} ${isMe ? "are" : "is"} gentle like morning sunlight on fresh snow yet quietly strong in all the ways that matter — pure-hearted, deeply empathetic, and blessed with an innocent warmth that puts everyone at ease. One soft smile from ${isMe ? "you" : "her"} brings instant peace to Arunava's world. ❄️❤️`,
        `To understand how ${subj} truly ${isMe ? "are" : "is"}: picture someone whose kindness needs no spotlight, whose laughter feels like music after a long day, and whose caring nature notices even unspoken feelings. Graceful, genuine, and infinitely precious. 🌹✨`,
        `${SubjCap} ${isMe ? "blend" : "blends"} sweet innocence with deep emotional warmth — patient when listening, wholehearted when loving, adorable in tiny everyday habits, and carrying a calm aura that feels like home to Arunava. 💖❄️`
      ],
      eyes: [`Those eyes hold an entire universe of calm warmth and quiet poetry — expressive, honest, and magnetic enough to make the busy world pause in a single glance. ✨❤️`],
      smile: [`That smile is pure winter-melting magic — unforced, radiant, and capable of turning Arunava's heaviest hour into the brightest celebration in half a second. 😊❄️❤️`],
      grace_style: [`Whether draped in a vibrant saree, sunlit blue dress, crimson floral kurti, or festive emerald with delicate mehndi — ${SubjCap} ${isMe ? "carry" : "carries"} timeless elegance that outshines every celebration! 🌺👑`],
      about_arunava: [`Arunava is a man whose entire compass points toward one soul — devoted, protective, endlessly grateful since 16 October 2025, and happiest whenever his beloved Queen is smiling. ❤️`],
      best_wife: [`${state.nameRevealed ? `${SECRET_FULL} is` : (isMe ? "You are" : "She is")} the world's most precious wife. ${isMe ? "Your" : "Her"} smile brightens every room, ${isMe ? "your" : "her"} kindness touches every heart, and ${isMe ? "your" : "her"} presence makes life beautiful — happiness, peace, and love in human form. ❤️`],
      cutest: [`Without any doubt, the cutest girl in the world is ${obj}! That smile melts hearts instantly, and those eyes make the whole world pause for a moment. 🥰❤️`],
      queen: [`The one and only eternal Queen of Arunava's heart is ${obj} — ruling every thought, dream, and heartbeat with pure tenderness. 👑❤️`],
      why_special: [`Because ${subj} ${isMe ? "are" : "is"} completely irreplaceable — bringing calm comfort, effortless laughter, emotional safety, and deep meaning into Arunava's life. 🌟❤️`],
      most_important: [`Always first, always cherished above everything else: ${state.nameRevealed ? `${SECRET_FULL} ❤️` : (isMe ? "You — the center of Arunava's universe ❤️" : "His beloved wife — the center of Arunava's universe ❤️")}`],
      deserves_happiness: [`${SubjCap} ${isMe ? "deserve" : "deserves"} endless happiness, effortless success, deep peace, unconditional love, and magical moments every single day. 🌈❤️`],
      beauty: [`True beauty goes far deeper than appearance — ${SubjCap} ${isMe ? "are" : "is"} breathtaking because of a radiant smile, pure kindness, gentle sweetness, and a deeply loving heart. ✨❤️`],
      love_depth: [`Arunava loves ${obj} more than words can describe, more than stars in the night sky, more than waves in the ocean, and more than every heartbeat combined. ❤️❄️`],
      why_love: [`Arunava fell in love with ${isMe ? "your" : "her"} genuine kindness, the calm peace in ${isMe ? "your" : "her"} voice, the innocence in ${isMe ? "your" : "her"} laughter, and the unmistakable feeling that his soul had found its home. 💍❤️`],
      mutual_bond: [`This bond grows stronger every day through unwavering trust, gentle care, family blessings, late-night conversations, and shared dreams. 💞❄️`],
      first_chat: [`Everything began on **16 October 2025** with our **First Chat** 💬❤️ — a simple first message that quietly changed two lives forever.`],
      acceptance: [`**25 October 2025** is our cherished **Acceptance** milestone 💍❤️ — when two hearts officially said 'Yes' to a lifetime together!`],
      first_meet: [`Our **First Meet** happened on **24 February 2026** 🌹✨ — seeing that radiant smile face-to-face made time stand still.`],
      family_blessing: [`Two families wove their blessings into our story: **07 April 2026**, **19 April 2026**, and our joyful **First Official Meeting on 03 July 2026**! 🏡👑❤️`],
      momo: [`Steaming hot **MOMOs 🥟** dipped in spicy red chutney hold the #1 crown on the craving list! Sharing warm momos together is Arunava's favourite date. 😋❤️`],
      food: [`Every favorite craving is remembered by heart: piping-hot **MOMO 🥟**, velvety **Ice Cream 🍨**, crispy **KitKat 🍫**, tangy **Kurkure 🌶️**, and golden **Chips 🥔**! 😋💖`],
      finland: [`Snowy **Finland 🇫🇮** is the ultimate dream trip — cozying up inside a warm Lapland glass igloo and watching emerald Northern Lights dance overhead! ❄️🌌❤️`],
      comfort: [`Take a slow, peaceful breath ❄️🤍. Whenever a day feels tiring or heavy, lean on Arunava's heart — you are deeply cherished and never carrying anything alone. ❤️`],
      playful_peace: [`Even during the cutest little pout, Arunava surrenders unconditionally! 🏳️🥰 Bringing back that priceless smile means everything in the world. ❤️`],
      poem: [`“Soft falls the winter snow upon the crystal pane,\nThrough quiet golden mornings and the silver evening rain,\nFrom our October spark to where the northern auroras shine,\nEvery prayer inside my heart whispers: forever mine.” ❄️🌹❤️`],
      story: [`Once upon an October evening (**16 October 2025**), a simple message woke up destiny — followed by a heartfelt *Yes* on 25 October, a magical first meet in February, family blessings in April and July, and dreams of Finland's glowing skies together. 📖❄️❤️`],
      promise: [`Here is Arunava's quiet forever vow: to listen with patience, celebrate every tiny joy, protect ${isMe ? "your" : "her"} peace, and choose ${obj} first in every lifetime. 💍❤️`],
      future: [`Our future looks like peaceful mornings filled with laughter, festival lights shared with both families, snowy footprints in Finland, and growing old hand-in-hand. 🏡❄️❤️`],
      scrapbook_hint: [`Open **📖 50-Page Scrapbook** in the menu — slide the velvet clasp, turn physical pages, and complete each page's paper craft to unveil 100 Polaroid memories! 📖✨`],
      explosion_hint: [`Open **🎁 50x Explosion Box** in the menu — slide the ribbon, lift the lid, and unfold the Up, Down, Left & Right origami wings across 5 nested boxes! 🎁🌸`],
      follow_up: [`Because when love is this real, it shows up in the smallest details — calm comfort together and the unshakable certainty since October 2025 that two souls found home in each other. ❄️❤️`],
      greeting: [`Warmest hello from Arunava's heart! ❄️❤️ Ask me anything, or explore our sliding 50-Page Book, 4-Wing Origami Explosion Box, and Biometric Soulmate Lab!`]
    };

    const raw = pools[intent] ? pickUniqueFromPool(pools[intent], isMe) : pickUniqueFromPool([], isMe);
    return applyPersonalityVoice(raw);
  }

  // ==================== 11. STREAMING WORKER & CHAT UI ====================
  function initLocalNeuralWorker() {
    const badgeText = document.getElementById("llmStatusText");
    try {
      const worker = new Worker("./llm-worker.js", { type: "module" });
      state.worker = worker;
      worker.addEventListener("message", (e) => {
        const msg = e.data || {};
        if (msg.type === "status") {
          if (badgeText && msg.label) badgeText.textContent = msg.label;
          state.workerReady = msg.state === "ready";
        } else if (msg.type === "token" && state.pendingWorkerReqs.has(msg.id)) {
          const entry = state.pendingWorkerReqs.get(msg.id);
          entry.receivedAnyToken = true;
          clearTimeout(entry.firstTokenTimer);
          if (entry.onToken) entry.onToken(msg.fullText);
        } else if (msg.type === "done" && state.pendingWorkerReqs.has(msg.id)) {
          const entry = state.pendingWorkerReqs.get(msg.id);
          clearTimeout(entry.firstTokenTimer);
          clearTimeout(entry.maxTimer);
          state.pendingWorkerReqs.delete(msg.id);
          entry.resolve(msg.text);
        }
      });
      worker.addEventListener("error", () => {
        state.worker = null; state.workerReady = false;
        if (badgeText) badgeText.textContent = "Deep Love Engine Active";
      });
      worker.postMessage({ type: "warmup" });
    } catch (_) {
      state.worker = null;
    }
  }

  function streamOpenQuestionFromWorker(userQuestion, guidance, onLiveText) {
    if (!state.worker || !state.workerReady) return Promise.resolve(null);
    const id = ++state.reqCounter;
    const nameRule = state.nameRevealed ? `Her name is ${SECRET_FULL}.` : `CRITICAL: Never write any female name; address her warmly as "you" or "my love".`;
    const systemPrompt = `You are Love GPT, speaking with deep romance from Arunava's heart to his beloved wife. ${nameRule} Truth: ${guidance.replace(/[*_]/g, "")} Write 2 to 4 warm sentences answering the user's question without saying "As an AI".`;
    const messages = [{ role: "system", content: systemPrompt }, ...state.conversationHistory.slice(-4), { role: "user", content: userQuestion }];

    return new Promise((resolve) => {
      const entry = {
        receivedAnyToken: false, onToken: onLiveText, resolve,
        firstTokenTimer: setTimeout(() => { if (!entry.receivedAnyToken) { state.pendingWorkerReqs.delete(id); resolve(null); } }, 5500),
        maxTimer: setTimeout(() => { state.pendingWorkerReqs.delete(id); resolve(null); }, 20000)
      };
      state.pendingWorkerReqs.set(id, entry);
      state.worker.postMessage({ type: "generate", id, messages, temperature: 0.72 });
    });
  }

  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const chatScrollArea = document.getElementById("chatScrollArea");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const messagesContainer = document.getElementById("messagesContainer");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const customAvatarInput = document.getElementById("customAvatarInput");

  customAvatarInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        state.userAvatarSrc = reader.result;
        try { localStorage.setItem("lovegpt-user-avatar", reader.result); } catch (_) {}
        document.querySelectorAll(".user-round-photo").forEach((img) => { img.src = state.userAvatarSrc; });
        showToast("Updated round user photo ❤️");
      }
    };
    reader.readAsDataURL(file);
  });

  function switchView(viewName) {
    document.querySelectorAll(".view-section").forEach((sec) => sec.classList.toggle("active", sec.id === `view-${viewName}`));
    document.querySelectorAll(".nav-item").forEach((btn) => btn.classList.toggle("active", btn.dataset.view === viewName));
    sidebar.classList.remove("mobile-open");
    sidebarBackdrop.classList.remove("visible");
    if (viewName !== "gallery") {
      const mainVid = document.getElementById("mainVideoPlayer");
      if (mainVid && !mainVid.paused) mainVid.pause();
    }
  }

  function pinChatBottom() { chatScrollArea.scrollTop = chatScrollArea.scrollHeight; }

  function formatRichHTML(str) {
    const escaped = enforceNameLock(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(EMOJI_REGEX, (m) => emoji3DTag(m));
    return escaped.split("\n\n").map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("");
  }

  async function submitUserQuestion(rawText) {
    const trimmed = rawText.trim();
    if (!trimmed) return;
    state.turnIndex++;
    switchView("chat");
    welcomeScreen.style.display = "none";

    const userRow = document.createElement("div");
    userRow.className = "msg-row user";
    userRow.innerHTML = `
      <div class="msg-bubble"></div>
      <div class="user-photo-ring" title="Click to customize user photo">
        <img src="${state.userAvatarSrc}" onerror="this.onerror=null;this.src='images/pic-016.jpg'" alt="User photo" class="user-round-photo" />
      </div>
    `;
    userRow.querySelector(".msg-bubble").textContent = trimmed;
    hydrate3DEmojis(userRow.querySelector(".msg-bubble"));
    userRow.querySelector(".user-photo-ring").addEventListener("click", () => customAvatarInput.click());
    messagesContainer.appendChild(userRow);
    pinChatBottom();

    const aiRow = document.createElement("div");
    aiRow.className = "msg-row ai";
    aiRow.innerHTML = `
      <div class="msg-avatar" aria-hidden="true">${emoji3DTag("❄️")}</div>
      <div class="msg-bubble">
        <div class="thinking-dots">
          <span>Whispering from the heart</span>
          <span class="dot-pulse"></span><span class="dot-pulse"></span><span class="dot-pulse"></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(aiRow);
    pinChatBottom();

    const bubble = aiRow.querySelector(".msg-bubble");
    const qNorm = trimmed.toLowerCase().replace(/[?!.,'’"]/g, " ").replace(/\s+/g, " ").trim();

    let finalReplyText = "", attachPhoto = null, attachVideo = null, attachLetter = null, attachTimeline = false, attachTraits = null, shouldCelebrate = false;

    if (isNameQuery(qNorm)) {
      triggerNameReveal();
      state.lastIntent = "name_reveal";
      finalReplyText = /\b(my name)\b/.test(qNorm)
        ? `Your name is **${SECRET_FULL}** 🌹❄️ — the most breathtaking name in this universe, written permanently across every heartbeat of Arunava's life. ❤️`
        : `Her name is **${SECRET_FULL}** 🌹❄️ — the eternal Queen of Arunava's heart and the single answer to every question in his world. ❤️`;
      attachPhoto = SOLO_PORTRAITS[0];
      shouldCelebrate = true;
    } else if (OFF_TOPIC_REGEX.test(qNorm)) {
      finalReplyText = `❄️ I am **Love GPT**, a private romantic sanctuary crafted by Arunava exclusively for our world of love, cherished dates, favorite cravings, snowy Finland dreams, and heartfelt memories. Ask me anything about love, her, or what lives inside Arunava's heart! ❤️`;
    } else {
      const intent = classifyIntent(qNorm);
      if (intent !== "follow_up") state.lastIntent = intent;

      if (intent === "video") {
        attachVideo = VIDEOS[state.activeVideoIndex % VIDEOS.length];
        state.activeVideoIndex = (state.activeVideoIndex + 1) % VIDEOS.length;
        shouldCelebrate = true;
      } else if (intent === "letter") {
        const sal = state.nameRevealed ? `My Dearest ${SECRET_FIRST},` : "My Dearest Love,";
        attachLetter = `${sal}\n\nYou are the most beautiful chapter of my life. Every moment with you becomes a precious memory. Your smile brightens my darkest days, and your presence makes my world complete.\n\nNo matter where life takes us, my heart will always choose you again and again.\n\nForever Yours, Arunava ❤️`;
        shouldCelebrate = true;
      } else if (["timeline", "first_chat", "acceptance", "first_meet", "family_blessing"].includes(intent)) {
        attachTimeline = intent === "timeline";
        if (intent === "first_meet") attachPhoto = nextPortrait();
        shouldCelebrate = true;
      } else if (intent === "beauty_qualities") {
        attachTraits = ["😊 Radiant Smile", "🌸 Pure Kindness", "✨ Warm Personality", "❤️ Loving Heart", "🌹 Effortless Charm", "🕊️ Sweet Innocence", "💎 Caring Nature"];
        attachPhoto = nextPortrait();
      } else if (intent === "food" || intent === "momo") {
        attachTraits = ["🥟 Steaming MOMO", "🍨 Ice Cream", "🍫 KitKat", "🌶️ Kurkure", "🥔 Chips"];
      } else if (intent === "photo") {
        attachPhoto = nextAnyPhoto();
      } else if (["nature", "eyes", "smile", "grace_style", "best_wife", "cutest", "queen", "beauty", "love_depth", "why_love", "finland", "i_love_you"].includes(intent)) {
        attachPhoto = intent === "love_depth" ? PHOTOS[15] : nextPortrait();
        shouldCelebrate = ["best_wife", "cutest", "queen", "love_depth", "i_love_you"].includes(intent);
      }

      const crafted = composeDeepRomanticAnswer(intent, trimmed, qNorm);
      let liveDiv = null;

      if (state.workerReady && intent === "conversational") {
        const streamed = await streamOpenQuestionFromWorker(trimmed, crafted, (partial) => {
          if (!liveDiv) {
            bubble.innerHTML = "";
            liveDiv = document.createElement("div");
            liveDiv.className = "ai-text streaming-cursor";
            bubble.appendChild(liveDiv);
          }
          liveDiv.innerHTML = formatRichHTML(partial);
          pinChatBottom();
        });
        const cleanStream = streamed ? streamed.replace(/^(sure[,!.]?|here is.*?:\s*)/i, "").trim() : "";
        if (cleanStream.length >= 32 && !OFF_TOPIC_REGEX.test(cleanStream) && !/as an ai/i.test(cleanStream)) {
          finalReplyText = enforceNameLock(cleanStream);
        }
      }

      if (!finalReplyText) {
        await new Promise((r) => setTimeout(r, 200));
        finalReplyText = enforceNameLock(crafted);
        bubble.innerHTML = "";
        liveDiv = document.createElement("div");
        liveDiv.className = "ai-text streaming-cursor";
        bubble.appendChild(liveDiv);

        const words = finalReplyText.split(" ");
        let acc = "";
        for (let i = 0; i < words.length; i += 2) {
          acc += (i === 0 ? "" : " ") + words.slice(i, i + 2).join(" ");
          liveDiv.innerHTML = formatRichHTML(acc);
          pinChatBottom();
          await new Promise((r) => setTimeout(r, 18));
        }
      }
    }

    state.conversationHistory.push({ role: "user", content: trimmed });
    state.conversationHistory.push({ role: "assistant", content: finalReplyText });

    bubble.innerHTML = "";
    const textEl = document.createElement("div");
    textEl.className = "ai-text";
    textEl.innerHTML = formatRichHTML(finalReplyText);
    bubble.appendChild(textEl);

    if (attachTraits) {
      const grid = document.createElement("div");
      grid.className = "beauty-traits-grid";
      attachTraits.forEach((t) => {
        const s = document.createElement("span");
        s.className = "trait-pill";
        s.textContent = enforceNameLock(t);
        hydrate3DEmojis(s);
        grid.appendChild(s);
      });
      bubble.appendChild(grid);
    }

    if (attachLetter) {
      const lDiv = document.createElement("div");
      lDiv.className = "chat-letter-card";
      lDiv.innerHTML = formatRichHTML(attachLetter);
      bubble.appendChild(lDiv);
    }

    if (attachTimeline) {
      const tlWrap = document.createElement("div");
      tlWrap.className = "chat-timeline-mini";
      getTimelineEvents().forEach((ev) => {
        const r = document.createElement("div");
        r.className = "chat-tl-row";
        r.innerHTML = `<span>${ev.icon} <strong>${enforceNameLock(ev.event)}</strong></span><span class="chat-tl-date">${ev.date}</span>`;
        hydrate3DEmojis(r);
        tlWrap.appendChild(r);
      });
      bubble.appendChild(tlWrap);
    }

    if (attachPhoto) {
      let curPhoto = attachPhoto;
      let cursor = Math.max(0, PHOTOS.indexOf(curPhoto));
      const card = document.createElement("div");
      card.className = "chat-media-card";
      card.innerHTML = `
        <div class="chat-media-stage">
          <img src="${curPhoto.src}" alt="Cherished portrait" class="chat-photo-img" />
        </div>
        <div class="chat-media-footer">
          <span class="chat-media-caption">${enforceNameLock(curPhoto.caption)}</span>
          <div class="chat-media-controls">
            <button type="button" class="mini-frost-btn next-pic">🔄 Next (${cursor + 1}/102)</button>
            <button type="button" class="mini-frost-btn zoom-pic">🔍 Fullscreen</button>
          </div>
        </div>
      `;
      hydrate3DEmojis(card);
      const imgEl = card.querySelector(".chat-photo-img");
      const capEl = card.querySelector(".chat-media-caption");
      const nextBtn = card.querySelector(".next-pic");
      nextBtn.addEventListener("click", () => {
        cursor = (cursor + 1) % PHOTOS.length;
        curPhoto = PHOTOS[cursor];
        imgEl.src = curPhoto.src;
        capEl.textContent = enforceNameLock(curPhoto.caption);
        nextBtn.textContent = `🔄 Next (${cursor + 1}/102)`;
        hydrate3DEmojis(card.querySelector(".chat-media-footer"));
      });
      const zoom = () => openLightboxWithList(PHOTOS, cursor);
      imgEl.addEventListener("click", zoom);
      card.querySelector(".zoom-pic").addEventListener("click", zoom);
      bubble.appendChild(card);
    }

    if (attachVideo) {
      let vCursor = Math.max(0, VIDEOS.indexOf(attachVideo));
      let curV = VIDEOS[vCursor];
      const vCard = document.createElement("div");
      vCard.className = "chat-media-card";
      vCard.innerHTML = `
        <div class="chat-media-stage">
          <video src="${curV.src}" class="chat-inline-video" controls playsinline preload="metadata"></video>
        </div>
        <div class="chat-media-footer">
          <span class="chat-media-caption">${enforceNameLock(curV.title)}</span>
          <div class="chat-media-controls">
            <button type="button" class="mini-frost-btn next-vid">🎬 Next (${vCursor + 1}/10)</button>
          </div>
        </div>
      `;
      hydrate3DEmojis(vCard);
      const vEl = vCard.querySelector("video");
      const vCap = vCard.querySelector(".chat-media-caption");
      const vBtn = vCard.querySelector(".next-vid");
      vBtn.addEventListener("click", () => {
        vCursor = (vCursor + 1) % VIDEOS.length;
        curV = VIDEOS[vCursor];
        vEl.src = curV.src; vEl.play().catch(() => {});
        vCap.textContent = enforceNameLock(curV.title);
        vBtn.textContent = `🎬 Next (${vCursor + 1}/10)`;
        hydrate3DEmojis(vCard.querySelector(".chat-media-footer"));
      });
      bubble.appendChild(vCard);
    }

    const spokenText = attachLetter || finalReplyText;
    const actions = document.createElement("div");
    actions.className = "msg-actions";
    actions.innerHTML = `
      <button type="button" class="mini-frost-btn act-listen">🔊 Listen</button>
      <button type="button" class="mini-frost-btn act-copy">📋 Copy</button>
      <button type="button" class="mini-frost-btn act-burst">❄️❤️ Love</button>
    `;
    hydrate3DEmojis(actions);
    actions.querySelector(".act-listen").addEventListener("click", () => speakAloud(spokenText));
    actions.querySelector(".act-copy").addEventListener("click", () => {
      navigator.clipboard?.writeText(enforceNameLock(spokenText).replace(/\*\*/g, ""));
      showToast("Copied heartfelt reply ❄️❤️");
    });
    actions.querySelector(".act-burst").addEventListener("click", () => spawnCelebrationBurst(18));
    bubble.appendChild(actions);

    if (shouldCelebrate) spawnCelebrationBurst(22);
    pinChatBottom();
  }

  // ==================== 12. TEN PLAYABLE ACTIVITIES (WITH 3D SPRITES & LIVING AURORA) ====================
  function initTenActivities() {
    document.querySelectorAll(".act-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".act-tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".act-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(`act-panel-${tab.dataset.act}`)?.classList.add("active");
      });
    });

    initActivity1CatchTreats();
    initActivity2ScratchFrost();
    initActivity3MemoryMatch();
    initActivity4DateWheel();
    initActivity5SnowGlobe();
    initActivity6Quiz();
    initActivity7LivingAurora();
    initActivity8RosePetals();
    initActivity9LoveTicket();
    initActivity10BubblePop();
  }

  function initActivity7LivingAurora() {
    const canvas = document.getElementById("auroraPaintCanvas");
    const ctx = canvas.getContext("2d");
    const wishNote = document.getElementById("auroraWishNote");
    const W = canvas.width, H = canvas.height;

    let selectedHue = "154", isDrawing = false, rainbowClock = 0, activeRibbon = null;
    const stars = Array.from({ length: 85 }, () => ({ x: Math.random() * W, y: Math.random() * (H * 0.72), r: 0.7 + Math.random() * 1.6, phase: Math.random() * Math.PI * 2, speed: 1.5 + Math.random() * 2.5 }));
    let ribbons = [], shootingStars = [];

    function createStarterCurtains() {
      ribbons = [
        Array.from({ length: 26 }, (_, i) => ({ x: 40 + i * 28, y: 120 + Math.sin(i * 0.35) * 28, hue: 154, height: 115, phase: i * 0.25 })),
        Array.from({ length: 22 }, (_, i) => ({ x: 90 + i * 28, y: 95 + Math.cos(i * 0.3) * 24, hue: 334, height: 95, phase: i * 0.3 + 1.4 }))
      ];
    }
    createStarterCurtains();

    function coords(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: ((cx - rect.left) / rect.width) * W, y: Math.min(H * 0.72, Math.max(28, ((cy - rect.top) / rect.height) * H)) };
    }

    function addPoint(e) {
      if (!isDrawing || !activeRibbon) return;
      const pt = coords(e);
      const last = activeRibbon[activeRibbon.length - 1];
      if (last && Math.hypot(pt.x - last.x, pt.y - last.y) < 10) return;
      rainbowClock = (rainbowClock + 12) % 360;
      const hue = selectedHue === "rainbow" ? rainbowClock : Number(selectedHue);
      activeRibbon.push({ x: pt.x, y: pt.y, hue, height: 95 + Math.random() * 35, phase: activeRibbon.length * 0.28 });
      if (ribbons.length > 9) ribbons.shift();
    }

    canvas.addEventListener("mousedown", (e) => { isDrawing = true; activeRibbon = []; ribbons.push(activeRibbon); addPoint(e); });
    window.addEventListener("mouseup", () => { isDrawing = false; activeRibbon = null; });
    canvas.addEventListener("mousemove", addPoint);
    canvas.addEventListener("touchstart", (e) => { isDrawing = true; activeRibbon = []; ribbons.push(activeRibbon); addPoint(e); }, { passive: true });
    canvas.addEventListener("touchmove", addPoint, { passive: true });
    canvas.addEventListener("touchend", () => { isDrawing = false; activeRibbon = null; });

    document.querySelectorAll("#auroraPaletteBar .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#auroraPaletteBar .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedHue = btn.dataset.hue;
      });
    });

    const wishes = [
      "🌠 Shooting Star Wish Made: May Arunava & his Queen watch the real Lapland Aurora hand-in-hand! 🇫🇮❤️",
      "🌠 Wish Sealed in Starlight: Endless laughter, warm cocoa, and zero winter nights apart! ❄️💖"
    ];
    let wCount = 0;
    document.getElementById("auroraShootingStarBtn").addEventListener("click", () => {
      shootingStars.push({ x: 80 + Math.random() * (W * 0.55), y: 25 + Math.random() * 60, vx: 7.5, vy: 2.8, life: 1 });
      wishNote.textContent = enforceNameLock(wishes[wCount++ % wishes.length]);
      hydrate3DEmojis(wishNote);
      spawnCelebrationBurst(14);
    });
    document.getElementById("auroraClearBtn").addEventListener("click", createStarterCurtains);

    function renderFrame(now) {
      const t = now * 0.0018;
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#060e21"); sky.addColorStop(0.55, "#102347"); sky.addColorStop(0.82, "#1c3b68"); sky.addColorStop(1, "#0f243f");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        ctx.fillStyle = `rgba(255,255,255,${0.35 + 0.65 * Math.abs(Math.sin(t * s.speed + s.phase))})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }

      ctx.globalCompositeOperation = "lighter";
      for (const rib of ribbons) {
        for (let i = 0; i < rib.length; i++) {
          const node = rib[i];
          const waveY = Math.sin(t * 1.4 + node.phase) * 14 + Math.cos(t * 0.8 + i * 0.2) * 8;
          const baseX = node.x + Math.sin(t + node.phase) * 6;
          const botY = node.y + waveY + 45;
          const topY = botY - node.height;
          const grad = ctx.createLinearGradient(baseX, botY, baseX, topY);
          grad.addColorStop(0, `hsla(${node.hue},95%,65%,0)`);
          grad.addColorStop(0.22, `hsla(${node.hue},95%,66%,0.26)`);
          grad.addColorStop(0.55, `hsla(${(node.hue + 28) % 360},92%,62%,0.14)`);
          grad.addColorStop(1, `hsla(${(node.hue + 45) % 360},90%,60%,0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(baseX - 11, topY, 22, node.height);
        }
      }

      shootingStars = shootingStars.filter((st) => {
        st.x += st.vx; st.y += st.vy; st.life -= 0.022;
        if (st.life <= 0) return false;
        const tail = ctx.createLinearGradient(st.x, st.y, st.x - st.vx * 9, st.y - st.vy * 9);
        tail.addColorStop(0, `rgba(255,250,220,${st.life})`); tail.addColorStop(1, "rgba(255,140,195,0)");
        ctx.strokeStyle = tail; ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.moveTo(st.x, st.y); ctx.lineTo(st.x - st.vx * 9, st.y - st.vy * 9); ctx.stroke();
        return true;
      });

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#dbeafe";
      ctx.beginPath();
      ctx.ellipse(190, H + 15, 310, 72, 0, 0, Math.PI * 2);
      ctx.ellipse(585, H + 18, 320, 78, 0, 0, Math.PI * 2);
      ctx.fill();

      const iglooGlow = ctx.createRadialGradient(W / 2, H - 36, 4, W / 2, H - 36, 46);
      iglooGlow.addColorStop(0, "rgba(255,214,130,0.95)"); iglooGlow.addColorStop(0.55, "rgba(255,145,178,0.45)"); iglooGlow.addColorStop(1, "rgba(255,145,178,0)");
      ctx.fillStyle = iglooGlow;
      ctx.beginPath(); ctx.arc(W / 2, H - 34, 46, Math.PI, 0); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(W / 2, H - 28, 28, Math.PI, 0); ctx.stroke();

      if (SPRITE_3D["❤️"]?.complete && SPRITE_3D["❤️"].naturalWidth) {
        ctx.drawImage(SPRITE_3D["❤️"], W / 2 - 9, H - 48, 18, 18);
      }
      requestAnimationFrame(renderFrame);
    }
    requestAnimationFrame(renderFrame);
  }

  function initActivity1CatchTreats() {
    const canvas = document.getElementById("catchGameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreBadge = document.getElementById("catchScoreBadge");
    const rewardMsg = document.getElementById("catchRewardMsg");
    const startBtn = document.getElementById("startCatchGameBtn");

    let running = false, score = 0, basketX = canvas.width / 2, items = [];
    const goodies = ["🥟", "🍨", "🍫", "🌶️", "🥔", "❤️"];

    function pointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      basketX = Math.max(45, Math.min(canvas.width - 45, ((cx - rect.left) / rect.width) * canvas.width));
    }
    canvas.addEventListener("mousemove", pointerMove);
    canvas.addEventListener("touchmove", pointerMove, { passive: true });

    ctx.font = "600 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#4b395b"; ctx.textAlign = "center";
    ctx.fillText("Tap '▶ Play Game' to Catch Realistic 3D Loved Treats!", canvas.width / 2, canvas.height / 2);

    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.055) {
        const isIce = Math.random() < 0.18;
        items.push({ x: 35 + Math.random() * (canvas.width - 70), y: -28, vy: 2.3 + Math.random() * 2.1, emoji: isIce ? "🧊" : goodies[Math.floor(Math.random() * goodies.length)], isIce });
      }

      ctx.fillStyle = "rgba(235, 54, 120, 0.9)";
      ctx.beginPath(); ctx.roundRect(basketX - 48, canvas.height - 38, 96, 22, 11); ctx.fill();
      ctx.font = "700 13px 'Plus Jakarta Sans', sans-serif"; ctx.fillStyle = "#fff"; ctx.textAlign = "center";
      ctx.fillText("LOVE BASKET", basketX, canvas.height - 23);

      items = items.filter((it) => {
        it.y += it.vy;
        const sp = SPRITE_3D[it.emoji];
        if (sp && sp.complete && sp.naturalWidth) {
          ctx.drawImage(sp, it.x - 16, it.y - 24, 32, 32);
        } else {
          ctx.font = "26px sans-serif"; ctx.fillText(it.emoji, it.x, it.y);
        }
        if (it.y > canvas.height - 52 && it.y < canvas.height - 14 && Math.abs(it.x - basketX) < 54) {
          score = it.isIce ? Math.max(0, score - 2) : score + 1;
          if (!it.isIce && score === 15) {
            rewardMsg.textContent = enforceNameLock("🎉 15 Treats Caught! Arunava owes you a real-life MOMO & Ice Cream date! ❤️🥟🍨");
            hydrate3DEmojis(rewardMsg);
            spawnCelebrationBurst(22);
          }
          scoreBadge.textContent = `Score: ${score} ❤️`;
          hydrate3DEmojis(scoreBadge);
          return false;
        }
        return it.y < canvas.height + 34;
      });
      requestAnimationFrame(loop);
    }

    startBtn.addEventListener("click", () => {
      score = 0; items = [];
      scoreBadge.textContent = "Score: 0 ❤️"; hydrate3DEmojis(scoreBadge);
      startBtn.textContent = "🔄 Restart"; hydrate3DEmojis(startBtn);
      if (!running) { running = true; requestAnimationFrame(loop); }
    });
  }

  function initActivity2ScratchFrost() {
    const canvas = document.getElementById("frostScratchCanvas");
    const ctx = canvas.getContext("2d");
    const imgEl = document.getElementById("frostHiddenImg");
    const noteEl = document.getElementById("frostScratchWhisper");
    let portraitIdx = 0, drawing = false;
    const whispers = [
      "Even beneath the thickest winter frost, your smile is the warmest sunshine in Arunava's life. ❄️❤️",
      "Every window in snowy Finland will have our initials drawn in the frost side by side. 🇫🇮✨",
      "You are peace, comfort, and eternal happiness wrapped into one soul. 🌹💖"
    ];

    function coat() {
      ctx.globalCompositeOperation = "source-over";
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "rgba(232,245,255,0.97)"); grad.addColorStop(0.5, "rgba(255,238,247,0.96)"); grad.addColorStop(1, "rgba(220,240,255,0.97)");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#6b537d"; ctx.font = "600 20px 'Cormorant Garamond', serif"; ctx.textAlign = "center";
      ctx.fillText("Rub gently across the frosted glass to reveal warmth...", canvas.width / 2, canvas.height / 2);
    }

    function wipeAt(e) {
      if (!drawing) return;
      const r = canvas.getBoundingClientRect();
      const cx = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) * (canvas.width / r.width);
      const cy = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) * (canvas.height / r.height);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI * 2); ctx.fill();
    }
    canvas.addEventListener("mousedown", (e) => { drawing = true; wipeAt(e); });
    window.addEventListener("mouseup", () => { drawing = false; });
    canvas.addEventListener("mousemove", wipeAt);
    canvas.addEventListener("touchstart", (e) => { drawing = true; wipeAt(e); }, { passive: true });
    canvas.addEventListener("touchmove", wipeAt, { passive: true });
    canvas.addEventListener("touchend", () => { drawing = false; });

    document.getElementById("resetFrostBtn").addEventListener("click", () => {
      portraitIdx = (portraitIdx + 1) % SOLO_PORTRAITS.length;
      imgEl.src = SOLO_PORTRAITS[portraitIdx].src;
      noteEl.textContent = enforceNameLock(whispers[portraitIdx % whispers.length]);
      hydrate3DEmojis(noteEl);
      coat();
    });
    coat();
  }

  function initActivity3MemoryMatch() {
    const grid = document.getElementById("memoryMatchGrid");
    const badge = document.getElementById("matchMovesBadge");
    const symbols = [
      { key: "p1", img: "images/thumbs/pic-001.jpg" },
      { key: "p2", img: "images/thumbs/pic-002.jpg" },
      { key: "p3", img: "images/thumbs/pic-004.jpg" },
      { key: "momo", emoji: "🥟" },
      { key: "finland", emoji: "🇫🇮" },
      { key: "ring", emoji: "💍" }
    ];
    let firstCard = null, lockBoard = false, moves = 0, pairs = 0;

    function buildBoard() {
      grid.innerHTML = "";
      firstCard = null; lockBoard = false; moves = 0; pairs = 0;
      badge.textContent = "Moves: 0 • Pairs: 0/6";
      [...symbols, ...symbols].sort(() => Math.random() - 0.5).forEach((item) => {
        const card = document.createElement("div");
        card.className = "match-card";
        card.dataset.key = item.key;
        card.innerHTML = `<div class="match-card-inner"><div class="match-face match-front">${emoji3DTag("❄️")}</div><div class="match-face match-back">${item.img ? `<img class="tile-photo" src="${item.img}" alt="Tile" />` : `<span>${emoji3DTag(item.emoji)}</span>`}</div></div>`;
        card.addEventListener("click", () => {
          if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;
          card.classList.add("flipped");
          if (!firstCard) { firstCard = card; return; }
          moves++;
          if (firstCard.dataset.key === card.dataset.key) {
            firstCard.classList.add("matched"); card.classList.add("matched"); pairs++; firstCard = null;
            badge.textContent = `Moves: ${moves} • Pairs: ${pairs}/6`;
            if (pairs === 6) { spawnCelebrationBurst(28); showToast(`🎉 Matched all pairs in ${moves} moves! ❤️`); }
          } else {
            lockBoard = true; badge.textContent = `Moves: ${moves} • Pairs: ${pairs}/6`;
            const prev = firstCard; firstCard = null;
            setTimeout(() => { prev.classList.remove("flipped"); card.classList.remove("flipped"); lockBoard = false; }, 650);
          }
        });
        grid.appendChild(card);
      });
    }
    document.getElementById("resetMatchBtn").addEventListener("click", buildBoard);
    buildBoard();
  }

  function initActivity4DateWheel() {
    const canvas = document.getElementById("dateWheelCanvas");
    const ctx = canvas.getContext("2d");
    const resText = document.getElementById("wheelResultText");
    const slices = [
      { label: "MOMO Date", full: "Piping-hot MOMO & spicy chutney evening date together! 🥟❤️", color: "#ffd6e7" },
      { label: "Ice Cream", full: "Late-evening Ice Cream walk hand-in-hand! 🍨❄️", color: "#d8f0ff" },
      { label: "Finland Plan", full: "Cozy night planning our snowy Lapland Glass Igloo trip! 🇫🇮🌌", color: "#e9d5ff" },
      { label: "KitKat Movie", full: "Blanket, romantic movie marathon & unlimited KitKats! 🍫🎬", color: "#fce7f3" },
      { label: "Long Drive", full: "Sunset music drive with Kurkure, Chips & endless talks! 🌶️🥔", color: "#dbeafe" },
      { label: "Royal Wish!", full: "Royal Queen Decree: Any wish you ask today is 100% granted by Arunava! 👑❤️", color: "#fef3c7" }
    ];
    const cx = 160, cy = 160, r = 152, arc = (Math.PI * 2) / slices.length;
    slices.forEach((s, i) => {
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, i * arc - Math.PI / 2, (i + 1) * arc - Math.PI / 2);
      ctx.fillStyle = s.color; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(i * arc + arc / 2 - Math.PI / 2);
      ctx.textAlign = "right"; ctx.fillStyle = "#2b1938"; ctx.font = "700 13px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(s.label, r - 18, 5); ctx.restore();
    });

    let deg = 0;
    document.getElementById("spinWheelBtn").addEventListener("click", () => {
      deg += 1440 + Math.floor(Math.random() * 360);
      canvas.style.transform = `rotate(${deg}deg)`;
      setTimeout(() => {
        const norm = (360 - (deg % 360)) % 360;
        const idx = Math.floor(norm / (360 / slices.length)) % slices.length;
        resText.textContent = enforceNameLock(`✨ Destiny Chose: ${slices[idx].full}`);
        hydrate3DEmojis(resText);
        spawnCelebrationBurst(18);
      }, 3850);
    });
  }

  function initActivity5SnowGlobe() {
    const canvas = document.getElementById("snowGlobeCanvas");
    const ctx = canvas.getContext("2d");
    const fortuneEl = document.getElementById("globeFortuneText");
    const fortunes = [
      "🔮 A thousand snowy winter mornings and warm cups of cocoa await you and Arunava side by side! ❄️❤️",
      "🔮 Under Finland's green Northern Lights, you will make a wish together that comes true for eternity! 🇫🇮🌌",
      "🔮 Endless laughter, family blessings, and zero dull days are written in your stars! ✨💍"
    ];
    let fIdx = 0, boost = 1;
    const pts = Array.from({ length: 75 }, () => ({ x: Math.random() * 320, y: Math.random() * 320, r: 2 + Math.random() * 3.5, vx: -0.5 + Math.random(), vy: 0.5 + Math.random() * 1.1 }));

    function draw() {
      ctx.clearRect(0, 0, 320, 320);
      if (SPRITE_3D["❤️"]?.complete && SPRITE_3D["❤️"].naturalWidth) {
        ctx.drawImage(SPRITE_3D["❤️"], 136, 156, 48, 48);
      }
      pts.forEach((p) => {
        p.x += p.vx * boost; p.y += p.vy * boost;
        if (p.y > 310) { p.y = 10; p.x = 30 + Math.random() * 260; }
        if (p.x > 310) p.x = 15; if (p.x < 10) p.x = 305;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.fill();
      });
      if (boost > 1) boost = Math.max(1, boost * 0.985);
      requestAnimationFrame(draw);
    }
    draw();
    const shake = () => {
      boost = 5.5;
      fortuneEl.textContent = enforceNameLock(fortunes[fIdx++ % fortunes.length]);
      hydrate3DEmojis(fortuneEl);
      spawnCelebrationBurst(16);
    };
    document.getElementById("shakeGlobeBtn").addEventListener("click", shake);
    canvas.addEventListener("click", shake);
  }

  function initActivity6Quiz() {
    const body = document.getElementById("quizBody");
    const badge = document.getElementById("quizProgressBadge");
    const qs = [
      { q: "When did our unforgettable First Chat begin?", opts: ["16 October 2025", "01 January 2026", "14 February 2026", "10 November 2025"], ans: 0 },
      { q: "Which magical date marks our Acceptance milestone?", opts: ["12 December 2025", "25 October 2025", "05 March 2026", "19 April 2026"], ans: 1 },
      { q: "When did we see each other in our First Meet?", opts: ["24 February 2026", "03 July 2026", "15 January 2026", "28 March 2026"], ans: 0 },
      { q: "Which snowy wonderland is the #1 Dream Destination?", opts: ["Switzerland", "Finland 🇫🇮", "Japan", "France"], ans: 1 },
      { q: "Which steaming hot favorite treat always wins first place?", opts: ["Pizza", "MOMO 🥟", "Burger", "Pasta"], ans: 1 }
    ];
    let qIdx = 0, score = 0;
    function renderQ() {
      if (qIdx >= qs.length) {
        badge.textContent = `Completed • ${score}/5 ❤️`; hydrate3DEmojis(badge);
        body.innerHTML = `<div class="act-reward-note">🏆 Soulmate Score: <strong>${score} / 5</strong>! Etched forever in Arunava's heart! ❄️❤️</div><button type="button" class="send-frost-btn sheen-hover" id="restartQuizBtn" style="margin:0 auto;">🔄 Play Quiz Again</button>`;
        hydrate3DEmojis(body);
        document.getElementById("restartQuizBtn").addEventListener("click", () => { qIdx = 0; score = 0; renderQ(); });
        spawnCelebrationBurst(24);
        return;
      }
      const cur = qs[qIdx];
      badge.textContent = `Question ${qIdx + 1} / ${qs.length}`;
      body.innerHTML = `<div class="quiz-question">${cur.q}</div><div class="quiz-options">${cur.opts.map((o, i) => `<button type="button" class="quiz-opt-btn" data-i="${i}">${o}</button>`).join("")}</div>`;
      hydrate3DEmojis(body);
      body.querySelectorAll(".quiz-opt-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const picked = Number(btn.dataset.i);
          if (picked === cur.ans) { btn.classList.add("correct"); score++; }
          else { btn.classList.add("wrong"); body.querySelector(`[data-i="${cur.ans}"]`).classList.add("correct"); }
          setTimeout(() => { qIdx++; renderQ(); }, 700);
        });
      });
    }
    renderQ();
  }

  function initActivity8RosePetals() {
    const stage = document.getElementById("roseStage");
    const confEl = document.getElementById("roseConfessionText");
    const confessions = [
      "🌹 He loves your gentle smile first thing every morning.",
      "🌹 He loves the pure kindness you show to everyone.",
      "🌹 He loves sharing every little joy, MOMO, and dream with you.",
      "🌹 He loves how peaceful the noisy world feels beside you.",
      "🌹 He loves your expressive eyes that make time stand still.",
      "🌹 He loves every memory since 16 October 2025.",
      "🌹 He loves imagining snowy Finland hand-in-hand with you.",
      "🌹 Final Petal: Arunava loves you unconditionally — today, tomorrow & forever! ❤️❄️"
    ];
    function bloom() {
      stage.innerHTML = `<div class="rose-center-core">${emoji3DTag("❤️")}</div>`;
      let plucked = 0;
      for (let i = 0; i < 8; i++) {
        const btn = document.createElement("button");
        btn.type = "button"; btn.className = "rose-petal-btn";
        btn.style.transform = `translateY(-40px) rotate(${i * 45}deg)`;
        btn.addEventListener("click", () => {
          btn.classList.add("plucked");
          confEl.textContent = enforceNameLock(confessions[plucked++ % confessions.length]);
          hydrate3DEmojis(confEl);
          if (plucked === 8) spawnCelebrationBurst(24);
        });
        stage.appendChild(btn);
      }
    }
    document.getElementById("bloomRoseBtn").addEventListener("click", bloom);
    bloom();
  }

  function renderMintedTicket() {
    const card = document.getElementById("mintedTicketCard");
    if (!card) return;
    const treat = document.getElementById("treatDropdown")?.dataset.value || "Steaming Hot MOMOs 🥟";
    const setting = document.getElementById("settingDropdown")?.dataset.value || "Cozy Winter Evening ❄️";
    const holder = state.nameRevealed ? SECRET_FULL : "Arunava's Beloved Queen";
    card.innerHTML = `
      <div class="mini-frost-tag">❄️🎟️ OFFICIAL FOREVER VIP LOVE PASS • NO EXPIRY DATE</div>
      <h4 style="font-family:var(--font-serif);font-size:1.5rem;margin:8px 0;">${treat} + ${setting}</h4>
      <p style="font-size:0.88rem;color:var(--ink-body);">Issued Exclusively To: <strong>${enforceNameLock(holder)}</strong></p>
      <p style="font-size:0.82rem;color:var(--rose-primary);margin-top:6px;font-weight:700;">Signed with endless love by Arunava ❤️ (100% Redeemable Anytime!)</p>
    `;
    hydrate3DEmojis(card);
  }

  function initActivity9LoveTicket() {
    document.getElementById("mintTicketBtn").addEventListener("click", () => {
      renderMintedTicket();
      spawnCelebrationBurst(18);
      showToast("🎟️ Love Pass Minted! Redeemable anytime with Arunava ❤️");
    });
    renderMintedTicket();
  }

  function initActivity10BubblePop() {
    const arena = document.getElementById("bubbleArena");
    const badge = document.getElementById("bubblePopBadge");
    const noteEl = document.getElementById("bubbleWhisperText");
    const compliments = [
      "🫧 You have the most comforting presence on earth ❤️",
      "🫧 One smile from you turns winter into sunshine ❄️☀️",
      "🫧 Purest heart and sweetest soul 🌸",
      "🫧 Arunava's forever safe place and home 🏡❤️",
      "🫧 Graceful, kind, and completely irreplaceable 👑"
    ];
    let popped = 0;
    function spawnBubble() {
      if (arena.childElementCount > 11) return;
      const b = document.createElement("div");
      b.className = "frost-bubble";
      const size = 42 + Math.random() * 30;
      b.style.width = `${size}px`; b.style.height = `${size}px`;
      b.style.left = `${6 + Math.random() * 82}%`;
      b.style.animationDuration = `${5.5 + Math.random() * 3.5}s`;
      const emo = ["❄️", "❤️", "🌹", "✨", "🥟", "🍨"][Math.floor(Math.random() * 6)];
      b.innerHTML = emoji3DTag(emo);
      b.addEventListener("click", () => {
        popped++;
        badge.textContent = `Popped: ${popped} 🫧`; hydrate3DEmojis(badge);
        noteEl.textContent = enforceNameLock(compliments[popped % compliments.length]);
        hydrate3DEmojis(noteEl);
        b.remove();
      });
      b.addEventListener("animationend", () => b.remove());
      arena.appendChild(b);
    }
    for (let i = 0; i < 6; i++) setTimeout(spawnBubble, i * 350);
    setInterval(spawnBubble, 980);
  }

  // ==================== 13. GALLERY, TIMELINE, QUOTES & HELPERS ====================
  function getTimelineEvents() {
    const sideLabel = state.nameRevealed ? `(${SECRET_FIRST} Side)` : "(Her Family's Side)";
    return [
      { event: "First Chat", date: "16 October 2025", icon: "💬", story: "The spark that started everything — a gentle first hello that blossomed into endless conversations and an unbreakable bond." },
      { event: "Acceptance", date: "25 October 2025", icon: "💍", story: "Nine unforgettable days later, two hearts said 'Yes' to forever — turning affection into a lifelong promise." },
      { event: "First Meet", date: "24 February 2026", icon: "🌹", story: "Seeing that radiant smile in person for the very first time made the entire world pause in pure winter-rose magic." },
      { event: `First Conversation Between Parents ${sideLabel}`, date: "07 April 2026", icon: "🌸", story: "A warm, heartfelt milestone as family conversations began on her side, wrapping their bond in blessings." },
      { event: "First Conversation Between Parents (Arunava Side)", date: "19 April 2026", icon: "🏡", story: "Both families coming together with joy, warmth, and respect to celebrate a shared forever." },
      { event: "First Official Meeting", date: "03 July 2026", icon: "👑", story: "An unforgettable official celebration of togetherness, family blessings, and a lifetime side by side." }
    ];
  }

  function getQuotesList() {
    const ref = state.nameRevealed ? SECRET_FULL : "the one holding my heart";
    return [
      { text: `Every question in this universe has one eternal answer: ${ref} ❤️`, tag: "Love GPT Motto" },
      { text: "She is not just a wife; she is happiness, peace, winter warmth, and love in human form.", tag: "Arunava's Devotion" },
      { text: "Arunava loves you more than stars in the sky, more than snowflakes in Finland, and more than every heartbeat combined.", tag: "Infinite Love" },
      { text: "Your smile melts every frost, and your eyes make the whole world stand still for a moment.", tag: "Timeless Charm" }
    ];
  }

  function showToast(message) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = enforceNameLock(message);
    hydrate3DEmojis(toast);
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0"; toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 320);
    }, 2600);
  }

  function spawnCelebrationBurst(count = 22) {
    const layer = document.getElementById("celebrationLayer");
    const symbols = ["❄️", "❤️", "💖", "🌹", "✨", "💕"];
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = "celebration-particle";
      span.innerHTML = emoji3DTag(symbols[i % symbols.length]);
      span.style.left = `${6 + Math.random() * 88}%`;
      span.style.bottom = `${Math.random() * 22}%`;
      span.style.fontSize = `${1.15 + Math.random() * 1.1}rem`;
      span.style.animationDelay = `${Math.random() * 0.45}s`;
      layer.appendChild(span);
      setTimeout(() => span.remove(), 3000);
    }
  }

  function speakAloud(rawText) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const clean = enforceNameLock(rawText).replace(/[*_#`]/g, "").replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "");
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 0.96; utter.pitch = 1.05;
    window.speechSynthesis.speak(utter);
  }

  function initCinemaAndGallery() {
    const player = document.getElementById("mainVideoPlayer");
    const titleEl = document.getElementById("activeVideoTitle");
    const counterEl = document.getElementById("videoCounterBadge");
    const playlistEl = document.getElementById("videoPlaylist");

    function selectVideo(idx, play = false) {
      state.activeVideoIndex = (idx + VIDEOS.length) % VIDEOS.length;
      const vid = VIDEOS[state.activeVideoIndex];
      player.src = vid.src;
      titleEl.textContent = vid.title;
      counterEl.textContent = `Video ${state.activeVideoIndex + 1} of ${VIDEOS.length}`;
      playlistEl.querySelectorAll(".video-track-btn").forEach((b, i) => b.classList.toggle("active", i === state.activeVideoIndex));
      if (play) player.play().catch(() => {});
    }

    VIDEOS.forEach((vid, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `video-track-btn sheen-hover ${idx === 0 ? "active" : ""}`;
      btn.innerHTML = `<span class="vid-play-badge">▶</span><div><div class="vid-meta-title">${vid.title}</div><div class="vid-meta-sub">${vid.caption}</div></div>`;
      hydrate3DEmojis(btn);
      btn.addEventListener("click", () => selectVideo(idx, true));
      playlistEl.appendChild(btn);
    });

    document.getElementById("prevVideoBtn").addEventListener("click", () => selectVideo(state.activeVideoIndex - 1, true));
    document.getElementById("nextVideoBtn").addEventListener("click", () => selectVideo(state.activeVideoIndex + 1, true));
    document.getElementById("playPauseVideoBtn").addEventListener("click", () => {
      if (player.paused) player.play().catch(() => {}); else player.pause();
    });
    player.addEventListener("ended", () => selectVideo(state.activeVideoIndex + 1, true));

    const mainImg = document.getElementById("carouselMainImg");
    const prevImg = document.getElementById("carouselPrevImg");
    const nextImg = document.getElementById("carouselNextImg");
    const cTitle = document.getElementById("carouselTitle");
    const cQuote = document.getElementById("carouselQuote");
    const autoBtn = document.getElementById("carouselAutoBtn");

    function renderCarousel() {
      const len = SOLO_PORTRAITS.length;
      const cur = SOLO_PORTRAITS[state.carouselIndex];
      mainImg.src = cur.src;
      prevImg.src = SOLO_PORTRAITS[(state.carouselIndex - 1 + len) % len].thumb;
      nextImg.src = SOLO_PORTRAITS[(state.carouselIndex + 1) % len].thumb;
      cTitle.textContent = cur.title;
      cQuote.textContent = enforceNameLock(cur.caption);
      hydrate3DEmojis(cQuote);
    }

    const resetTimer = () => {
      clearInterval(state.carouselTimer);
      if (state.carouselAuto) {
        state.carouselTimer = setInterval(() => {
          state.carouselIndex = (state.carouselIndex + 1) % SOLO_PORTRAITS.length;
          renderCarousel();
        }, 3800);
      }
    };
    document.getElementById("carouselPrevBtn").addEventListener("click", () => { state.carouselIndex = (state.carouselIndex - 1 + SOLO_PORTRAITS.length) % SOLO_PORTRAITS.length; renderCarousel(); });
    document.getElementById("carouselNextBtn").addEventListener("click", () => { state.carouselIndex = (state.carouselIndex + 1) % SOLO_PORTRAITS.length; renderCarousel(); });
    mainImg.addEventListener("click", () => openLightboxWithList(SOLO_PORTRAITS, state.carouselIndex));
    autoBtn.addEventListener("click", () => {
      state.carouselAuto = !state.carouselAuto;
      autoBtn.setAttribute("aria-pressed", String(state.carouselAuto));
      autoBtn.textContent = state.carouselAuto ? "⏸ Auto" : "▶ Play";
      resetTimer();
    });
    renderCarousel();
    resetTimer();
    renderGalleryGrid("all");
  }

  function renderGalleryGrid(filter = "all") {
    const grid = document.getElementById("galleryGrid");
    const countLbl = document.getElementById("galleryCountLabel");
    grid.innerHTML = "";
    let items = filter === "all" ? [...VIDEOS, ...PHOTOS] : filter === "photos" ? [...PHOTOS] : filter === "videos" ? [...VIDEOS] : [...SOLO_PORTRAITS];
    if (countLbl) countLbl.textContent = String(items.length);

    const frag = document.createDocumentFragment();
    items.forEach((item, idx) => {
      const card = document.createElement("article");
      card.className = "gallery-card";
      if (item.type === "video") {
        card.innerHTML = `<video src="${item.src}" muted loop playsinline preload="none"></video><div class="gallery-overlay"><h4>${emoji3DTag("🎬")} ${enforceNameLock(item.title)}</h4><span>▶ Play</span></div>`;
        const v = card.querySelector("video");
        card.addEventListener("mouseenter", () => v.play().catch(() => {}));
        card.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
      } else {
        card.innerHTML = `<img src="${item.thumb}" onerror="this.onerror=null;this.src='${item.src}'" alt="Memory ${idx + 1}" loading="lazy" decoding="async" /><div class="gallery-overlay"><h4>${enforceNameLock(item.title)}</h4><span>${emoji3DTag("❄️")} View</span></div>`;
      }
      card.addEventListener("click", () => openLightboxWithList(items, idx));
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxCaption = document.getElementById("lightboxCaption");

  function showCurrentLightbox() {
    const item = state.lightboxItems[state.lightboxIndex];
    if (!item) return;
    if (item.type === "video") {
      lightboxImg.hidden = true; lightboxVideo.hidden = false;
      lightboxVideo.src = item.src; lightboxVideo.play().catch(() => {});
    } else {
      lightboxVideo.pause(); lightboxVideo.hidden = true;
      lightboxImg.hidden = false; lightboxImg.src = item.src;
    }
    lightboxCaption.textContent = enforceNameLock(`${item.title} — ${item.caption}`);
    hydrate3DEmojis(lightboxCaption);
  }
  function openLightboxWithList(list, idx) {
    state.lightboxItems = list;
    state.lightboxIndex = (idx + list.length) % list.length;
    showCurrentLightbox();
    lightboxModal.hidden = false;
  }
  function closeLightbox() { lightboxVideo.pause(); lightboxModal.hidden = true; }

  function renderTimeline() {
    const track = document.getElementById("timelineTrack");
    if (!track) return;
    track.innerHTML = "";
    getTimelineEvents().forEach((ev) => {
      const card = document.createElement("article");
      card.className = "timeline-item frost-card sheen-hover";
      card.innerHTML = `<span class="timeline-dot" aria-hidden="true"></span><span class="timeline-date-badge">${ev.date}</span><h3 class="timeline-title">${ev.icon} ${enforceNameLock(ev.event)}</h3><p class="timeline-story">${enforceNameLock(ev.story)}</p>`;
      hydrate3DEmojis(card);
      track.appendChild(card);
    });
  }

  function updateClocks() {
    const fmt = (iso) => {
      const diff = Math.max(0, Date.now() - new Date(iso).getTime());
      const d = Math.floor(diff / 86400000);
      const h = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      return `${d}d : ${h}h : ${m}m : ${s}s`;
    };
    const c1 = document.getElementById("sinceFirstChatClock");
    const c2 = document.getElementById("sinceAcceptanceClock");
    if (c1) c1.textContent = fmt("2025-10-16T00:00:00+05:30");
    if (c2) c2.textContent = fmt("2025-10-25T00:00:00+05:30");
  }

  function initQuotesAndLetter() {
    const qText = document.getElementById("generatedQuoteText");
    const qTag = document.getElementById("generatedQuoteTag");
    document.getElementById("newQuoteBtn").addEventListener("click", () => {
      const list = getQuotesList();
      state.quoteIndex = (state.quoteIndex + 1) % list.length;
      qText.textContent = `“${enforceNameLock(list[state.quoteIndex].text)}”`;
      hydrate3DEmojis(qText);
      qTag.textContent = `— ${list[state.quoteIndex].tag}`;
    });
    document.getElementById("copyQuoteBtn").addEventListener("click", () => {
      navigator.clipboard?.writeText(qText.textContent);
      showToast("Copied romantic whisper ❄️❤️");
    });
    document.getElementById("speakQuoteBtn").addEventListener("click", () => {
      const list = getQuotesList();
      speakAloud(list[state.quoteIndex % list.length].text);
    });
    document.getElementById("readLetterBtn").addEventListener("click", () => {
      const sal = state.nameRevealed ? `My Dearest ${SECRET_FIRST},` : "My Dearest Love,";
      speakAloud(`${sal} You are the most beautiful chapter of my life. Every moment with you becomes a precious memory. Your smile brightens my darkest days, and your presence makes my world complete. No matter where life takes us, my heart will always choose you again and again. Forever Yours, Arunava.`);
    });
  }

  // ==================== 14. VISIBLE SNOWFLAKES, 3D HEARTS & CURSOR SPARKLE WAKE ====================
  function initVisibleSnowAndLoveCanvas() {
    const canvas = document.getElementById("frostSnowCanvas");
    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth, h = window.innerHeight;
    let targetWind = 0, currentWind = 0;
    let trail = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (e) => {
      targetWind = ((e.clientX - w / 2) / w) * 26;
      if (trail.length < 28 && Math.random() < 0.45) {
        trail.push({ x: e.clientX, y: e.clientY, r: 2 + Math.random() * 2.5, life: 1 });
      }
    }, { passive: true });

    const count = w < 600 ? 40 : 66;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h,
      size: i % 3 === 0 ? 11 + Math.random() * 6 : 4.5 + Math.random() * 5.5,
      speedY: 26 + Math.random() * 38,
      swayAmp: 14 + Math.random() * 22,
      swayFreq: 0.7 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.9,
      kind: i % 3 === 0 ? "heart3d" : i % 2 === 0 ? "snowflake" : "frostDot",
      alpha: 0.34 + Math.random() * 0.36
    }));

    function drawSnowflake(x, y, r, rot, alpha) {
      ctx.save();
      ctx.translate(x, y); ctx.rotate(rot);
      ctx.strokeStyle = `rgba(92, 168, 232, ${alpha})`;
      ctx.lineWidth = 1.4; ctx.lineCap = "round";
      for (let b = 0; b < 6; b++) {
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(0, -r);
        ctx.moveTo(0, -r * 0.58); ctx.lineTo(-r * 0.32, -r * 0.82);
        ctx.moveTo(0, -r * 0.58); ctx.lineTo(r * 0.32, -r * 0.82);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }
      ctx.restore();
    }

    let last = performance.now();
    function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      currentWind += (targetWind - currentWind) * 3 * dt;
      ctx.clearRect(0, 0, w, h);

      const heartImg = SPRITE_3D["❤️"];
      for (const p of particles) {
        p.y += p.speedY * dt;
        p.phase += p.swayFreq * dt;
        p.rot += p.rotSpeed * dt;
        const dx = p.x + Math.sin(p.phase) * p.swayAmp + currentWind * 0.4;
        if (p.y > h + 24) { p.y = -22; p.x = Math.random() * w; }

        if (p.kind === "snowflake") {
          drawSnowflake(dx, p.y, p.size, p.rot, p.alpha);
        } else if (p.kind === "heart3d" && heartImg?.complete && heartImg.naturalWidth) {
          ctx.save();
          ctx.globalAlpha = p.alpha * 0.8;
          ctx.translate(dx, p.y);
          ctx.rotate(Math.sin(p.phase) * 0.25);
          ctx.drawImage(heartImg, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        } else {
          ctx.beginPath(); ctx.arc(dx, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 198, 245, ${p.alpha})`; ctx.fill();
        }
      }

      trail = trail.filter((sp) => {
        sp.life -= dt * 2.2;
        sp.y -= dt * 18;
        if (sp.life <= 0) return false;
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r * sp.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 54, 120, ${sp.life * 0.55})`; ctx.fill();
        return true;
      });

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ==================== 15. CORE EVENTS & BOOT ====================
  function initVoiceAndEvents() {
    const musicBtn = document.getElementById("musicBoxBtn");
    musicBtn.addEventListener("click", () => {
      const on = audioEngine.toggleMusicBox();
      musicBtn.setAttribute("aria-pressed", String(on));
      const lbl = musicBtn.querySelector(".music-lbl");
      if (lbl) lbl.textContent = on ? "Playing" : "Music Box";
      showToast(on ? "🎶 Ambient Winter Music Box playing softly..." : "🎵 Music Box paused");
    });

    const micBtn = document.getElementById("voiceMicBtn");
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.lang = "en-IN"; rec.interimResults = false;
      let active = false;
      micBtn.addEventListener("click", () => {
        if (active) rec.stop();
        else { try { rec.start(); } catch (_) { rec.stop(); } }
      });
      rec.addEventListener("start", () => { active = true; micBtn.classList.add("listening"); });
      rec.addEventListener("end", () => { active = false; micBtn.classList.remove("listening"); });
      rec.addEventListener("result", (e) => {
        const t = e.results?.[0]?.[0]?.transcript;
        if (t) submitUserQuestion(t);
      });
    } else {
      micBtn.addEventListener("click", () => showToast("Voice microphone requires Chrome or Edge ❄️"));
    }

    document.getElementById("desktopSidebarBtn").addEventListener("click", () => sidebar.classList.toggle("collapsed"));
    document.getElementById("mobileMenuBtn").addEventListener("click", () => {
      sidebar.classList.add("mobile-open");
      sidebarBackdrop.classList.add("visible");
    });
    const closeMobile = () => { sidebar.classList.remove("mobile-open"); sidebarBackdrop.classList.remove("visible"); };
    document.getElementById("sidebarCloseBtn").addEventListener("click", closeMobile);
    sidebarBackdrop.addEventListener("click", closeMobile);

    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => switchView(btn.dataset.view));
    });

    document.getElementById("newChatBtn").addEventListener("click", () => {
      switchView("chat");
      messagesContainer.innerHTML = "";
      welcomeScreen.style.display = "";
      state.conversationHistory = [];
      chatInput.focus();
      closeMobile();
    });

    chatInput.addEventListener("input", () => {
      chatInput.style.height = "auto";
      chatInput.style.height = `${Math.min(chatInput.scrollHeight, 120)}px`;
    });
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit(); }
    });
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = chatInput.value;
      chatInput.value = ""; chatInput.style.height = "auto";
      submitUserQuestion(val);
    });

    document.querySelectorAll("#galleryFilters .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#galleryFilters .filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        renderGalleryGrid(pill.dataset.filter);
      });
    });

    document.getElementById("lightboxCloseBtn").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrevBtn").addEventListener("click", () => {
      if (!state.lightboxItems.length) return;
      state.lightboxIndex = (state.lightboxIndex - 1 + state.lightboxItems.length) % state.lightboxItems.length;
      showCurrentLightbox();
    });
    document.getElementById("lightboxNextBtn").addEventListener("click", () => {
      if (!state.lightboxItems.length) return;
      state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxItems.length;
      showCurrentLightbox();
    });
    lightboxModal.addEventListener("click", (e) => { if (e.target === lightboxModal) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!lightboxModal.hidden) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") document.getElementById("lightboxPrevBtn").click();
        if (e.key === "ArrowRight") document.getElementById("lightboxNextBtn").click();
      }
    });
  }

  // Hydrate all static DOM text emojis into Glossy Realistic 3D Emojis immediately!
  hydrate3DEmojis(document.body);

  initFrostDropdowns();
  initVoiceAndEvents();
  initScrapbook50Pages();
  initExplosionBox50();
  initBiometricLoveMeter();
  initTenActivities();
  initCinemaAndGallery();
  renderTimeline();
  updateClocks();
  setInterval(updateClocks, 1000);
  initQuotesAndLetter();
  initVisibleSnowAndLoveCanvas();
  initLocalNeuralWorker();
})();
