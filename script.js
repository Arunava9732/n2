/* ==========================================================================
   ❄️❤️ Arunava • Love GPT — Master Dynamic Conversational & Interactive Engine
   - Dynamic Question Understanding + Multi-Clause Synthesis + Neural Worker
   - 2-Second Thinking Visual State Before Word-by-Word Live Writing
   - ChatGPT-Style Frosted Veil Blur -> Smooth Unblur Image/Video/Audio Reveal
   - Single-Play Rule (Audio & Video Play Once After Loading Until Clicked Again)
   - 120 Photos (102 Memories + 18 Couple Photos) & 10 Tagged Videos
   - 50 Unique Scrapbook Page Openings + 50 Unique Origami Box Folds (10 Visual Types/Box)
   - Rebuilt Treat Rush: Combo Catcher, Random 8-Question Trivia & Furnished Arcade
   ========================================================================== */

(() => {
  "use strict";

  // Silence Windows Chromium WebGPU powerPreference & ONNX console noise
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
    if (
      s.includes("VerifyEachNodeIsAssignedToAnEp") ||
      s.includes("powerPreference") ||
      s.includes("session_state.cc") ||
      s.includes("Unable to add response to browser cache") ||
      s.includes("Unable to determine content-length")
    ) {
      return;
    }
    fn.apply(console, args);
  };
  console.warn = cleanLog(console.warn);
  console.error = cleanLog(console.error);

  // roundRect polyfill for older Safari / Android WebViews (used by Treat Rush canvas)
  if (typeof CanvasRenderingContext2D !== "undefined" && !CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      const rad = Math.min(typeof r === "number" ? r : 0, w / 2, h / 2);
      this.moveTo(x + rad, y);
      this.arcTo(x + w, y, x + w, y + h, rad);
      this.arcTo(x + w, y + h, x, y + h, rad);
      this.arcTo(x, y + h, x, y, rad);
      this.arcTo(x, y, x + w, y, rad);
      this.closePath();
      return this;
    };
  }

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
    "🌠": "1f320", "🎟️": "1f39f-fe0f", "🫧": "1fae7", "🔄": "1f504", "🔍": "1f50d",
    "🏆": "1f3c6", "🏡": "1f3e1", "🌲": "1f332", "🌙": "1f319", "☀️": "2600-fe0f",
    "🥰": "1f970", "😊": "1f60a", "😋": "1f60b", "🏳️": "1f3f3-fe0f", "⭐": "2b50",
    "🕊️": "1f54a-fe0f", "🌈": "1f308", "🌟": "1f31f", "💎": "1f48e", "🎵": "1f3b5",
    "🎶": "1f3b6", "💬": "1f4ac", "🤍": "1f90d", "🦌": "1f98c", "☕": "2615",
    "🧣": "1f9e3", "🔥": "1f525", "🙏": "1f64f", "💚": "1f49a", "💜": "1f49c",
    "🩵": "1fa75", "🤴": "1f934", "🔬": "1f52c", "💑": "1f491", "📸": "1f4f8",
    "🍽️": "1f37d-fe0f", "🛖": "1f6d6", "🔑": "1f511", "⏳": "23f3"
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
        EMOJI_REGEX.lastIndex = 0;
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

  const SPRITE_3D = {};
  ["❤️", "🌹", "🥟", "🍨", "🍫", "🌶️", "🥔", "🧊", "❄️", "⭐", "💖"].forEach((emo) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.src = `${EMOJI_CDN}${VERIFIED_3D_MAP[emo]}.png`;
    SPRITE_3D[emo] = im;
  });

  // ==================== 2. SECRET NAME VAULT & GLOBAL STATE ====================
  const SECRET_FIRST = String.fromCharCode(83, 97, 121, 97, 110, 116, 105);
  const SECRET_FULL = String.fromCharCode(83, 97, 121, 97, 110, 116, 105, 32, 83, 104, 97, 119);

  const state = {
    agentName: "Arunava",
    nameRevealed: false,
    personality: "romantic",
    userAvatarSrc: localStorage.getItem("lovegpt-user-avatar") || "images/thumbs/pic-110.jpg",
    songRequestCount: 0,
    carouselIndex: 0,
    carouselAuto: true,
    carouselTimer: null,
    activeVideoIndex: 0,
    lightboxItems: [],
    lightboxIndex: 0,
    quoteIndex: 0,
    turnIndex: 0,
    lastIntent: null,
    lastTopics: [],
    conversationHistory: [],
    usedReplySignatures: new Set(),
    scrapbookPage: 1,
    scrapbookUnveiled: new Set(),
    explosionBoxLayer: 1,
    explosionUnfoldedIds: new Set(),
    servedTreats: [],
    arcadeXp: 120,
    bestRushScore: 0,
    bestQuizScore: 0,
    bioLiquidLevel: 0.25,
    bioTargetLevel: 0.25,
    bioPhaseMode: "idle",
    worker: null,
    workerReady: false,
    reqCounter: 0,
    pendingWorkerReqs: new Map(),
    isTypingReply: false
  };

  function enforceNameLock(text) {
    if (!text) return "";
    if (state.nameRevealed) return text;
    return text
      .replace(new RegExp(SECRET_FULL, "gi"), "my beloved Queen")
      .replace(new RegExp(SECRET_FIRST, "gi"), "my love");
  }

  // True when an element is actually displayed (its tab/panel is open) and the page is visible.
  // Animation loops skip drawing while hidden so phones stay smooth and cool.
  function isOnScreen(el) {
    return !!el && document.visibilityState === "visible" && el.offsetParent !== null;
  }

  function addArcadeXp(amount, reason = "") {
    state.arcadeXp += amount;
    const el = document.getElementById("arcadeTotalXp");
    if (el) {
      el.textContent = `${state.arcadeXp} XP ✨`;
      hydrate3DEmojis(el);
    }
    if (reason) {
      const actEl = document.getElementById("arcadeInteractions");
      if (actEl) {
        actEl.textContent = reason;
        hydrate3DEmojis(actEl);
      }
    }
  }

  // ==================== 3. SINGLE-PLAY CONTROLLER & CHATGPT-STYLE VEIL REVEAL (ITEMS #6, #9, #11) ====================
  const trackedMediaElements = new Set();

  function registerSinglePlayMedia(mediaEl) {
    if (!mediaEl || trackedMediaElements.has(mediaEl)) return;
    trackedMediaElements.add(mediaEl);
    mediaEl.loop = false;

    mediaEl.addEventListener("play", () => {
      mediaEl.loop = false;
      trackedMediaElements.forEach((other) => {
        if (other !== mediaEl && !other.paused) {
          try { other.pause(); } catch (_) {}
        }
      });
    });

    mediaEl.addEventListener("ended", () => {
      mediaEl.loop = false;
      try { mediaEl.pause(); } catch (_) {}
    });
  }

  function pauseAllActiveMedia() {
    trackedMediaElements.forEach((m) => {
      if (!m.paused) {
        try { m.pause(); } catch (_) {}
      }
    });
  }

  // ChatGPT-Style Progressive Image Veil Blur -> Smooth Automatic Unblur Reveal (No user interaction needed!)
  function applyProgressiveImageVeil(imgEl, containerEl, labelText = "⏳ Loading photograph...") {
    if (!imgEl || !containerEl) return;
    containerEl.classList.add("media-veil-container");

    // Snap immediately into veiled blur state so every load/change smoothly unblurs once ready
    imgEl.style.transition = "none";
    imgEl.classList.remove("img-unveiled");
    imgEl.classList.add("img-progressive-veil");
    void imgEl.offsetWidth;
    imgEl.style.transition = "";

    let overlay = containerEl.querySelector(".media-loading-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "media-loading-overlay";
      containerEl.appendChild(overlay);
    }
    overlay.classList.remove("fade-out");
    overlay.hidden = false;
    overlay.innerHTML = `<div class="veil-spinner"></div><span>${enforceNameLock(labelText)}</span>`;
    hydrate3DEmojis(overlay);

    let revealed = false;
    const triggerSmoothUnblur = () => {
      if (revealed) return;
      revealed = true;
      setTimeout(() => {
        imgEl.classList.add("img-unveiled");
        overlay.classList.add("fade-out");
        setTimeout(() => { overlay.hidden = true; }, 580);
      }, 360);
    };

    if (imgEl.complete && imgEl.naturalWidth > 0) {
      triggerSmoothUnblur();
    } else {
      imgEl.addEventListener("load", triggerSmoothUnblur, { once: true });
      imgEl.addEventListener("error", () => {
        overlay.innerHTML = `<span>❄️ Tap to reload memory</span>`;
      }, { once: true });
    }
  }

  // Video Loading Veil -> Smooth Automatic Unblur -> Play Directly ONE TIME ONLY (Item #6 & #11)
  function loadAndPlayVideoWithVeil(videoEl, containerEl, srcUrl, posterUrl, autoPlayOnce = true) {
    if (!videoEl || !containerEl) return;
    registerSinglePlayMedia(videoEl);
    videoEl.pause();
    videoEl.loop = false;

    containerEl.classList.add("media-veil-container");
    videoEl.style.transition = "none";
    videoEl.classList.remove("img-unveiled");
    videoEl.classList.add("img-progressive-veil");
    void videoEl.offsetWidth;
    videoEl.style.transition = "";

    let overlay = containerEl.querySelector(".media-loading-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "media-loading-overlay";
      containerEl.appendChild(overlay);
    }
    overlay.classList.remove("fade-out");
    overlay.hidden = false;
    overlay.innerHTML = `<div class="veil-spinner"></div><span>⏳ Loading romantic video reel...</span>`;
    hydrate3DEmojis(overlay);

    if (posterUrl) videoEl.poster = posterUrl;
    videoEl.src = srcUrl;
    videoEl.load();

    let readyFired = false;
    const onVideoReady = () => {
      if (readyFired) return;
      readyFired = true;
      setTimeout(() => {
        videoEl.classList.add("img-unveiled");
        overlay.classList.add("fade-out");
        setTimeout(() => { overlay.hidden = true; }, 560);
        if (autoPlayOnce) {
          pauseAllActiveMedia();
          videoEl.loop = false;
          videoEl.play().catch(() => {});
        }
      }, 420);
    };

    if (videoEl.readyState >= 3) {
      onVideoReady();
    } else {
      videoEl.addEventListener("canplaythrough", onVideoReady, { once: true });
      videoEl.addEventListener("canplay", onVideoReady, { once: true });
      videoEl.addEventListener("loadeddata", onVideoReady, { once: true });
      videoEl.addEventListener("error", () => {
        overlay.innerHTML = `<span>⏳ Video buffering... tap Play below</span>`;
      }, { once: true });
    }
  }

  // ==================== 4. 6 AUDIO TRACKS (WITH BACKUP FALLBACK) ====================
  const AUDIO_TRACKS = {
    song1: {
      id: "audio-01",
      src: "audio/audio-01.mp3",
      fallback: "audio/audio-05.mp3",
      title: "Melody 01 — A Special Song For You",
      subtitle: "Played exclusively from Arunava's heart"
    },
    song2: {
      id: "audio-02",
      src: "audio/audio-02.mp3",
      fallback: "audio/audio-05.mp3",
      title: "Melody 02 — Second Serenade For My Queen",
      subtitle: "Another sweet melody chosen just for you"
    },
    loveDepth: {
      id: "audio-03",
      src: "audio/audio-03.mp3",
      fallback: "audio/audio-05.mp3",
      title: "Heart Note 03 — How Deeply Arunava Loves You",
      subtitle: "More than words, stars, or ocean waves"
    },
    howWeMet: {
      id: "audio-04",
      src: "audio/audio-04.mp3",
      fallback: "audio/audio-05.mp3",
      title: "Story Melody 04 — How Destiny Brought Us Together",
      subtitle: "From 16 October 2025 to our First Meet & forever"
    },
    backup1: {
      id: "audio-05",
      src: "audio/audio-05.mp3",
      fallback: "audio/audio-01.mp3",
      title: "Encore Melody 05 — Secret Heartfelt Serenade",
      subtitle: "Special backup treasure from Arunava's collection"
    },
    backup2: {
      id: "audio-06",
      src: "audio/audio-06.mp3",
      fallback: "audio/audio-05.mp3",
      title: "Encore Melody 06 — Eternal Promise",
      subtitle: "Protected by seamless backup audio"
    }
  };

  // ==================== 5. 120 PICTURES & 10 TAGGED VIDEOS ====================
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

  const COUPLE_18_META = [
    { num: 103, tag: "first_meet", title: "Our First Meet Smile (24 Feb 2026)", caption: "Side-by-side on 24 February 2026 — where every message became real in front of our eyes 🌹❤️" },
    { num: 104, tag: "first_meet", title: "24 February 2026 — First Meet Forever", caption: "Mustard blossoms & crisp white — the unforgettable afternoon time stood still 💑✨" },
    { num: 105, tag: "outdoor_us", title: "Beneath Open Blue Skies Together", caption: "Every sky looks brighter whenever both of us are in the same frame ☀️❤️" },
    { num: 106, tag: "evening_date", title: "Cozy Evening Table For Two", caption: "Quiet smiles and endless conversations side-by-side 💕" },
    { num: 107, tag: "evening_date", title: "Side-by-Side Happiness", caption: "Two hearts completely at peace in each other's company ❤️" },
    { num: 108, tag: "evening_date", title: "Sweetest Date Night Glance", caption: "No filter needed when genuine love lights up both faces ✨💖" },
    { num: 109, tag: "evening_date", title: "Across the Cozy Cafe Lights", caption: "Every shared meal and laugh becomes a core memory 🥟❤️" },
    { num: 110, tag: "shoulder_warmth", title: "Resting on Arunava's Shoulder", caption: "Under warm fairy lights — the safest, most peaceful home on earth 🤍❤️" },
    { num: 111, tag: "evening_date", title: "Wrapped in His Arm", caption: "Held close with gratitude, tenderness, and forever devotion 💑✨" },
    { num: 112, tag: "official_meet", title: "First Official Meeting (03 July 2026)", caption: "03 July 2026 — blessed by both families and smiling toward forever 🏡👑❤️" },
    { num: 113, tag: "evening_date", title: "Warmth & Togetherness", caption: "Every single heartbeat whispers: thank goodness it is us ❤️" },
    { num: 114, tag: "shoulder_warmth", title: "Peaceful Head-on-Shoulder Moment", caption: "When the noisy world fades away and only love remains 🌹❄️" },
    { num: 115, tag: "outdoor_us", title: "Lush Green Stroll Together", caption: "Matching blues and effortless joy under the green canopy 🌿💑" },
    { num: 116, tag: "couple_art", title: "Dreamy Illustrated Portrait of Us #1", caption: "Our fairy-light shoulder lean reimagined like a romantic storybook ✨💑" },
    { num: 117, tag: "couple_art", title: "Storybook Couple Portrait #2", caption: "Like two soulmates drawn straight out of an enchanted film 🌸❤️" },
    { num: 118, tag: "couple_art", title: "Warm Starlight Couple Art #3", caption: "Every version of every universe still brings Arunava right beside you 🌟💖" },
    { num: 119, tag: "couple_art", title: "Sunlit Canopy Couple Art #4", caption: "Hand-in-hand through every season of life 🎨❤️" },
    { num: 120, tag: "couple_art", title: "Official Meeting Storybook Frame #5", caption: "Two hearts, one story, endless chapters ahead 💍✨" }
  ];

  const PHOTOS = Array.from({ length: 120 }, (_, idx) => {
    const num = idx + 1;
    const pad = String(num).padStart(3, "0");
    const isPortrait = num <= 15;
    const coupleEntry = COUPLE_18_META.find((c) => c.num === num);
    const isCouple = Boolean(coupleEntry);

    let title = `Cherished Memory #${pad}`;
    let caption = "A treasured memory wrapped in snow and love ❄️❤️";
    let subTag = "memory";

    if (isPortrait) {
      title = PORTRAIT_META[idx][0];
      caption = PORTRAIT_META[idx][1];
      subTag = "portrait";
    } else if (num === 16) {
      title = "Holding Hands Forever";
      caption = "No matter where life takes us, my heart chooses you again and again ❤️";
      subTag = "hands";
    } else if (num === 17) {
      title = "Delicate Mehndi Celebration";
      caption = "Intricate beauty adorned with celebration and love 💕";
      subTag = "mehndi";
    } else if (coupleEntry) {
      title = coupleEntry.title;
      caption = coupleEntry.caption;
      subTag = coupleEntry.tag;
    }

    return {
      id: `photo-${num}`,
      num,
      type: "photo",
      src: `images/pic-${pad}.jpg`,
      thumb: `images/thumbs/pic-${pad}.jpg`,
      title,
      caption,
      isPortrait,
      isCouple,
      subTag
    };
  });

  const COUPLE_PHOTOS = PHOTOS.filter((p) => p.isCouple);
  const REAL_COUPLE_PHOTOS = COUPLE_PHOTOS.filter((p) => p.subTag !== "couple_art");
  const ART_COUPLE_PHOTOS = COUPLE_PHOTOS.filter((p) => p.subTag === "couple_art");
  const SOLO_PORTRAITS = PHOTOS.slice(0, 15);
  const CAROUSEL_SHOWCASE = [
    PHOTOS[109], PHOTOS[102], PHOTOS[0], PHOTOS[111], PHOTOS[1], PHOTOS[114],
    PHOTOS[3], PHOTOS[110], PHOTOS[5], PHOTOS[116], PHOTOS[7], PHOTOS[103]
  ];

  const VIDEOS = [
    {
      id: "video-1", num: 1, type: "video",
      src: "videos/vid-01.mp4", poster: "images/video-thumbs/vid-01.jpg",
      title: "Reel 01 — Oceanfront Dream Villa Together",
      caption: "Standing hand-in-hand overlooking the sea at our dream modern home 🏡🌊❤️",
      keywords: ["villa", "ocean", "sea", "beach", "house", "dream home", "couple", "both", "together", "us"]
    },
    {
      id: "video-2", num: 2, type: "video",
      src: "videos/vid-02.mp4", poster: "images/video-thumbs/vid-02.jpg",
      title: "Reel 02 — Grand Chandelier Palace Hall",
      caption: "A royal palace hall fit for the eternal Queen of Arunava's heart 👑✨",
      keywords: ["palace", "castle", "hall", "kingdom", "grand", "chandelier"]
    },
    {
      id: "video-3", num: 3, type: "video",
      src: "videos/vid-03.mp4", poster: "images/video-thumbs/vid-03.jpg",
      title: "Reel 03 — Royal Ballroom Waltz Together",
      caption: "Two souls standing together beneath golden ballroom chandeliers 💑✨",
      keywords: ["dance", "waltz", "ballroom", "together", "couple", "both", "us"]
    },
    {
      id: "video-4", num: 4, type: "video",
      src: "videos/vid-04.mp4", poster: "images/video-thumbs/vid-04.jpg",
      title: "Reel 04 — Forever Horizon Terrace",
      caption: "Looking out toward a lifetime of bright mornings side-by-side ☀️💑",
      keywords: ["future", "horizon", "terrace", "forever", "life"]
    },
    {
      id: "video-5", num: 5, type: "video",
      src: "videos/vid-05.mp4", poster: "images/video-thumbs/vid-05.jpg",
      title: "Reel 05 — Pure Kindness & Puppy Smiles",
      caption: "The sweetest, gentlest heart — melting the whole world with pure warmth 🥰🐶❤️",
      keywords: ["cute", "cutest", "puppy", "dog", "pet", "kind", "kindness", "innocent", "sweet"]
    },
    {
      id: "video-6", num: 6, type: "video",
      src: "videos/vid-06.mp4", poster: "images/video-thumbs/vid-06.jpg",
      title: "Reel 06 — Ice-Blue Fairytale Princess",
      caption: "Descending the grand staircase in a shimmering ice-blue gown & tiara 👑❄️",
      keywords: ["princess", "queen", "crown", "tiara", "gown", "dress", "royal", "fairytale"]
    },
    {
      id: "video-7", num: 7, type: "video",
      src: "videos/vid-07.mp4", poster: "images/video-thumbs/vid-07.jpg",
      title: "Reel 07 — Sacred Bengali Bridal Glow",
      caption: "Draped in crimson Banarasi & gold — the most breathtaking bride & wife in the universe 💍❤️",
      keywords: ["wife", "best wife", "bride", "bridal", "wedding", "marriage", "saree", "bengali", "shaadi", "biye", "sindoor"]
    },
    {
      id: "video-8", num: 8, type: "video",
      src: "videos/vid-08.mp4", poster: "images/video-thumbs/vid-08.jpg",
      title: "Reel 08 — Snowy Finland Lantern Forest",
      caption: "Standing amidst powdery winter snow & glowing lanterns — our Lapland fairytale 🇫🇮❄️",
      keywords: ["snow", "winter", "finland", "lapland", "frost", "cold", "forest", "lantern", "aurora", "dream"]
    },
    {
      id: "video-9", num: 9, type: "video",
      src: "videos/vid-09.mp4", poster: "images/video-thumbs/vid-09.jpg",
      title: "Reel 09 — Candlelight Evening Promise",
      caption: "Warm candlelight reflecting in those unforgettable eyes across a romantic dinner table 🕯️🌹",
      keywords: ["candle", "candlelight", "dinner", "date", "night", "evening", "smile", "eyes", "beautiful"]
    },
    {
      id: "video-10", num: 10, type: "video",
      src: "videos/vid-10.mp4", poster: "images/video-thumbs/vid-10.jpg",
      title: "Reel 10 — Sunlit Garden Breeze",
      caption: "Natural grace in sky-blue florals surrounded by sunlit greenery 🌸🌿",
      keywords: ["garden", "nature", "tree", "green", "morning", "sunshine", "blue", "outdoor"]
    }
  ];

  let portraitDeck = [];
  let coupleDeck = [];
  let fullPhotoDeck = [];

  function nextPortrait() {
    if (!portraitDeck.length) portraitDeck = [...SOLO_PORTRAITS].sort(() => Math.random() - 0.5);
    return portraitDeck.pop();
  }
  function nextCouplePhoto(preferTag = null) {
    if (preferTag) {
      const tagged = COUPLE_PHOTOS.filter((p) => p.subTag === preferTag);
      if (tagged.length) return tagged[state.turnIndex % tagged.length];
    }
    if (!coupleDeck.length) coupleDeck = [...REAL_COUPLE_PHOTOS].sort(() => Math.random() - 0.5);
    return coupleDeck.pop();
  }
  function nextAnyPhoto() {
    if (!fullPhotoDeck.length) fullPhotoDeck = [...PHOTOS].sort(() => Math.random() - 0.5);
    return fullPhotoDeck.pop();
  }

  function pickMatchingVideo(qNorm) {
    let bestVid = null;
    let bestScore = 0;
    for (const v of VIDEOS) {
      let score = 0;
      for (const kw of v.keywords) {
        if (qNorm.includes(kw)) score += kw.includes(" ") ? 3 : 2;
      }
      if (score > bestScore) {
        bestScore = score;
        bestVid = v;
      }
    }
    if (bestVid) return bestVid;
    const fallback = VIDEOS[state.activeVideoIndex % VIDEOS.length];
    state.activeVideoIndex = (state.activeVideoIndex + 1) % VIDEOS.length;
    return fallback;
  }

  // ==================== 6. WRAPPED PRE-QUESTIONS ENGINE (ZERO CLIPPING!) ====================
  const STARTER_PRE_QUESTIONS = [
    { label: "👋 Hello Arunava, how are you?", prompt: "Hello Arunava, how are you?" },
    { label: "🎵 Play a song for me", prompt: "Play a song for me" },
    { label: "❤️ How much do you love me?", prompt: "How much does Arunava love me?" },
    { label: "🌹 How did we meet?", prompt: "How did we meet?" },
    { label: "💑 Photo of both of us", prompt: "Show me a photo of both of us together" },
    { label: "🎬 Romantic video", prompt: "Show me a romantic snowy video" },
    { label: "✨ Who are you?", prompt: "Who are you and what is your name?" },
    { label: "👑 What is her name?", prompt: "What is her name?" }
  ];

  const FOLLOWUP_MAP = {
    greeting: [
      { label: "😊 How is your day going?", prompt: "How are you feeling today?" },
      { label: "🎵 Play a song for me", prompt: "Play a song for me" },
      { label: "💑 Show our couple photo", prompt: "Show me a photo of both of us" }
    ],
    how_are_you: [
      { label: "💭 What are you doing right now?", prompt: "What are you doing right now?" },
      { label: "❤️ How much do you love me?", prompt: "How much do you love me?" },
      { label: "🥟 What are my favorite foods?", prompt: "What are my favorite foods?" }
    ],
    agent_identity: [
      { label: "🌹 How did we meet?", prompt: "How did we meet?" },
      { label: "👑 Who is the Queen of your heart?", prompt: "Who is the Queen of Arunava's heart?" },
      { label: "🎵 Play a song for me", prompt: "Play a song for me" }
    ],
    play_song: [
      { label: "🎶 Play another song for me", prompt: "Play another song for me" },
      { label: "❤️ How much does he love me?", prompt: "How much does he love me?" },
      { label: "💑 Show a photo of us together", prompt: "Show a photo of both of us" }
    ],
    love_depth: [
      { label: "💌 Write a love letter for me", prompt: "Write a love letter for me" },
      { label: "🌹 How did we meet?", prompt: "How did we meet?" },
      { label: "🎬 Show our dream villa video", prompt: "Show me our couple dream villa video" }
    ],
    how_we_met: [
      { label: "🕰️ Show all 6 timeline dates", prompt: "Tell me our complete love story timeline" },
      { label: "🏡 Tell me about 03 July 2026", prompt: "Tell me about our First Official Meeting" },
      { label: "🎵 Play a song for me", prompt: "Play a song for me" }
    ],
    couple_photo: [
      { label: "🎨 Show our illustrated couple art", prompt: "Show me our anime couple art photo" },
      { label: "🎬 Show a bridal video", prompt: "Show me a bridal wedding video" },
      { label: "🇫🇮 Tell me about our Finland trip", prompt: "Tell me about our Finland dream trip" }
    ],
    default: [
      { label: "🎵 Play a song for me", prompt: "Play a song for me" },
      { label: "💑 Photo of both of us", prompt: "Show me a photo of both of us" },
      { label: "🎬 Watch a romantic video", prompt: "Show me a romantic video" },
      { label: "💌 Read your love letter", prompt: "Write a love letter" }
    ]
  };

  function renderBottomPreQuestions(intentKey = null) {
    const bar = document.getElementById("preQuestionsBar");
    if (!bar) return;
    bar.innerHTML = "";
    const list = intentKey && FOLLOWUP_MAP[intentKey]
      ? [...FOLLOWUP_MAP[intentKey], ...STARTER_PRE_QUESTIONS.slice(0, 5)]
      : STARTER_PRE_QUESTIONS;

    const seen = new Set();
    list.slice(0, 7).forEach((item) => {
      if (seen.has(item.prompt)) return;
      seen.add(item.prompt);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pre-q-pill";
      btn.textContent = enforceNameLock(item.label);
      hydrate3DEmojis(btn);
      btn.addEventListener("click", () => {
        if (!state.isTypingReply) submitUserQuestion(item.prompt);
      });
      bar.appendChild(btn);
    });
  }

  // ==================== 7. FUZZY SPELL-CHECKER + REAL NEURAL LLM + SELECTIVE RAG ENGINE ====================
  const COMMON_TYPO_MAP = {
    wat: "what", wht: "what", waht: "what", whta: "what", whst: "what", hwat: "what", whatt: "what",
    hw: "how", hwo: "how", howw: "how", ohw: "how",
    whr: "where", whre: "where", wheer: "where", wehre: "where",
    whn: "when", wehn: "when", whne: "when",
    whu: "who", woh: "who", whoo: "who", hwo_is: "who",
    wy: "why", whyy: "why", hwy: "why",
    wich: "which", whch: "which", whihc: "which",
    u: "you", yu: "you", yuo: "you", yoi: "you",
    ur: "your", yor: "your", yuor: "your", yoru: "your", youre: "you are",
    aer: "are", rae: "are", si: "is", teh: "the", hte: "the", adn: "and", nad: "and",
    fro: "for", ofr: "for", hre: "her", ehr: "her", myy: "my", ddi: "did", dnt: "do not", dont: "do not",
    im: "i am", iam: "i am", ive: "i have", id: "i would", cant: "cannot", wont: "will not",
    pls: "please", plz: "please", plss: "please", plez: "please",
    abt: "about", abut: "about", abou: "about", baout: "about",
    tel: "tell", tll: "tell", teel: "tell", tle: "tell",
    knw: "know", konw: "know", kno: "know", nkow: "know",
    shw: "show", shwo: "show", sohw: "show",
    paly: "play", palay: "play", ply: "play", plsy: "play", plaay: "play", lpaly: "play",
    snog: "song", sng: "song", sonng: "song", soong: "song", osng: "song", sgno: "song",
    musc: "music", muisc: "music", musik: "music", msuic: "music",
    auido: "audio", aduio: "audio", audo: "audio",
    vidoe: "video", vedio: "video", vidio: "video", vdeo: "video", vido: "video", ivdeo: "video",
    phto: "photo", phooto: "photo", foto: "photo", pcture: "picture", picure: "picture", pictur: "picture", piture: "picture",
    cople: "couple", coupl: "couple", cupple: "couple", cuple: "couple",
    togther: "together", togehter: "together", togethr: "together", toegther: "together", togather: "together",
    lov: "love", lve: "love", loev: "love", luv: "love", luvv: "love", olve: "love",
    mch: "much", muhc: "much", mcuh: "much",
    nam: "name", naem: "name", nmae: "name", nme: "name", anme: "name",
    arunva: "arunava", arnava: "arunava", arunav: "arunava", arunaba: "arunava", arnuava: "arunava",
    wif: "wife", wfe: "wife", wfie: "wife", iwef: "wife",
    gril: "girl", gilr: "girl", glir: "girl", girll: "girl",
    cutst: "cutest", cutes: "cutest", cutset: "cutest", cuetst: "cutest",
    beautful: "beautiful", beutiful: "beautiful", beatiful: "beautiful", bautiful: "beautiful", bootiful: "beautiful", beuatiful: "beautiful",
    quuen: "queen", quen: "queen", qeen: "queen", qeun: "queen",
    favrite: "favorite", favorit: "favorite", favrt: "favorite", favret: "favorite", fvorite: "favorite", fav: "favorite", favroite: "favorite",
    fod: "food", fods: "foods", foood: "food", foodd: "food", snaks: "snacks", snak: "snack",
    finlnd: "finland", finlad: "finland", finlan: "finland", fnland: "finland", filland: "finland", finlnad: "finland",
    laplnd: "lapland", laplan: "lapland", iglo: "igloo", aurra: "aurora",
    mmo: "momo", momoo: "momo", kurkre: "kurkure", kurkuri: "kurkure", chps: "chips",
    metting: "meeting", meetng: "meeting", mete: "meet", emet: "meet",
    firt: "first", fisrt: "first", frst: "first", ifrst: "first",
    ofical: "official", offical: "official", oficial: "official",
    parnts: "parents", perents: "parents", prents: "parents", aprnts: "parents",
    timline: "timeline", timelne: "timeline", stroy: "story", sotry: "story",
    leter: "letter", ltter: "letter", dng: "doing", doin: "doing", doign: "doing", diong: "doing", odnig: "doing",
    thnking: "thinking", thinkng: "thinking", thikning: "thinking", htinking: "thinking",
    nw: "now", nwo: "now", onw: "now", tody: "today", tday: "today", otday: "today",
    tierd: "tired", tird: "tired", tyred: "tired", tirred: "tired", lng: "long", dya: "day",
    hungy: "hungry", hugry: "hungry", hungrry: "hungry",
    borred: "bored", bord: "bored", angy: "angry", anrgy: "angry", hapy: "happy", happi: "happy",
    mornig: "morning", mrng: "morning", morng: "morning",
    nght: "night", nite: "night", ngiht: "night", nihgt: "night",
    evning: "evening", evng: "evening", evenign: "evening",
    jok: "joke", joek: "joke", peom: "poem", pome: "poem",
    spcial: "special", speical: "special", specal: "special", importnt: "important", imprtant: "important",
    hapiness: "happiness", happines: "happiness", deservs: "deserves",
    preferr: "prefer", prefr: "prefer", prfer: "prefer",
    vist: "visit", vsit: "visit", shuld: "should", shoud: "should", shold: "should",
    woud: "would", coud: "could", becuase: "because", beacuse: "because",
    alwyas: "always", smiel: "smile", kndness: "kindness", bset: "best", besst: "best"
  };

  const SPELL_VOCAB = [
    "what", "when", "where", "which", "while", "whose", "whom", "with", "without", "would", "world", "wife", "winter", "warm", "watch", "write", "water", "work", "worked", "worry", "worried", "weekend",
    "arunava", "about", "above", "acceptance", "activity", "advice", "after", "afternoon", "again", "always", "amazing", "angry", "anime", "anniversary", "annoyed", "another", "answer", "anxious", "anything", "april", "around", "audio", "aurora", "awake",
    "backup", "beautiful", "beauty", "because", "bedtime", "before", "began", "believe", "beloved", "beside", "best", "better", "between", "birthday", "blessing", "bored", "boring", "both", "breakfast", "bridal", "bring", "busy",
    "calculate", "caring", "cartoon", "celebrate", "charm", "chat", "chips", "chocolate", "choice", "choose", "close", "coffee", "cold", "comfort", "compliment", "compute", "conversation", "could", "couple", "craving", "crying", "current", "cutest", "cute",
    "date", "dates", "days", "dearest", "deeply", "depressed", "deserves", "destination", "destiny", "dinner", "divided", "doing", "dream", "dreams",
    "each", "early", "eaten", "eating", "eight", "either", "encourage", "endless", "enjoy", "entertain", "eternal", "evening", "evenings", "every", "everything", "excited", "exhausted", "extra",
    "family", "favorite", "favourite", "february", "feeling", "fever", "finland", "first", "flatter", "flowers", "food", "foods", "forever", "forgive", "free", "fresh", "friend", "from", "frost", "funny", "future",
    "garden", "gentle", "girl", "give", "glass", "going", "golden", "good", "great",
    "happiness", "happy", "hard", "have", "head", "headache", "heart", "heartbeat", "hectic", "hello", "help", "here", "holding", "home", "honeymoon", "honestly", "hours", "hug", "hungry", "husband",
    "igloo", "illustrated", "imagine", "important", "innocence", "inside", "introduce",
    "joke", "july", "just",
    "keep", "kind", "kindness", "kitkat", "know", "kurkure",
    "lapland", "laugh", "letter", "life", "light", "lights", "like", "listen", "listening", "little", "live", "lonely", "long", "look", "love", "loving", "lucky", "lunch",
    "make", "makes", "marriage", "math", "mean", "meet", "meeting", "melody", "memories", "memory", "message", "migraine", "milestone", "milestones", "mind", "mine", "minus", "miss", "missing", "momo", "momos", "moment", "month", "more", "morning", "most", "motivate", "mountains", "movie", "much", "multiplied", "music", "myself",
    "name", "namaste", "nature", "need", "never", "next", "nice", "night", "nights", "northern", "nothing",
    "october", "official", "only", "open", "other", "overthinking",
    "parents", "peace", "peaceful", "people", "percent", "person", "personality", "photo", "photograph", "photos", "pick", "picture", "pictures", "place", "plan", "planning", "play", "playful", "please", "plus", "poem", "poetic", "poetry", "portrait", "precious", "prefer", "present", "pretty", "promise", "propose", "proud", "puppy", "puzzle",
    "qualities", "queen", "question", "quick", "quiet", "quiz",
    "radiant", "rain", "rainy", "rather", "read", "ready", "real", "really", "reason", "reel", "relationship", "relax", "remember", "rest", "rhyme", "riddle", "right", "romantic", "root", "rose", "royal",
    "same", "scared", "scrapbook", "screen", "sealed", "season", "second", "secret", "send", "seven", "share", "shayari", "should", "shoulder", "show", "sick", "side", "since", "sing", "sitting", "sleep", "sleepy", "sleigh", "smile", "smiling", "snack", "snacks", "snow", "snowflakes", "snowy", "soft", "solve", "some", "something", "song", "songs", "soon", "sorry", "soulmate", "soulmates", "special", "spell", "spend", "square", "star", "stars", "start", "starving", "stay", "steaming", "still", "story", "stressed", "strong", "suggest", "summer", "sunlit", "suppose", "surprise", "sweet", "sweetest", "sweetheart",
    "take", "talk", "talking", "tell", "tender", "thank", "thanks", "that", "their", "them", "then", "there", "these", "they", "thing", "things", "think", "thinking", "this", "thought", "thoughts", "three", "through", "time", "timeline", "times", "tired", "tiring", "today", "together", "tomorrow", "tonight", "touch", "travel", "treat", "treats", "trip", "true", "trust", "truth",
    "under", "understand", "universe", "unwell", "upset",
    "verse", "very", "video", "videos", "view", "villa", "visit",
    "wait", "waiting", "wake", "walk", "want", "watching", "wearing", "weather", "week", "well", "were", "what", "whatever", "when", "whenever", "where", "whether", "which", "while", "whisper", "white", "whole", "whose",
    "year", "years", "yesterday", "your", "yours", "yourself",
    "wedding", "marry", "married", "kiss", "cuddle", "exam", "exams", "study", "studying", "homework", "interview", "presentation",
    "human", "robot", "goodbye", "later", "ugly", "handsome", "adorable", "capital", "country", "city", "france", "india", "kolkata",
    "weather", "raining", "promise", "leave", "forgive", "sleeping", "insomnia", "features", "options", "options", "tomorrow",
    "dinner", "lunch", "breakfast", "order", "cook", "cooking", "chocolate", "coffee", "tea", "doctor", "office", "college", "school",
    "mother", "father", "family", "sister", "brother", "friends", "shopping", "dress", "saree", "phone", "call", "video", "picture"
  ];
  const SPELL_VOCAB_SET = new Set(SPELL_VOCAB);

  // Protect short valid words + Hinglish/Bengali conversational words so they are NEVER altered
  const PROTECTED_WORDS = new Set([
    "a", "am", "an", "as", "at", "be", "by", "do", "go", "he", "hi", "if", "in", "is", "it", "me", "my", "no", "of", "oh", "ok", "on", "or", "so", "to", "up", "us", "we",
    "all", "and", "any", "are", "art", "ask", "ate", "bad", "big", "box", "boy", "but", "buy", "can", "car", "cat", "cry", "cup", "cut", "day", "did", "dog", "dry", "ear", "eat", "end", "eye", "far", "few", "fix", "fly", "for", "fun", "get", "god", "got", "guy", "had", "has", "hat", "her", "hey", "him", "his", "hot", "how", "hug", "ice", "ill", "its", "joy", "key", "kid", "lap", "law", "lay", "let", "lie", "lip", "lot", "low", "mad", "man", "map", "may", "men", "met", "mix", "mom", "new", "nod", "nor", "not", "now", "odd", "off", "old", "one", "our", "out", "own", "pay", "pen", "pet", "pic", "pie", "pin", "pop", "pot", "put", "ran", "raw", "red", "rid", "row", "rub", "run", "sad", "sat", "saw", "say", "sea", "see", "set", "she", "shy", "sin", "sip", "sir", "sit", "six", "sky", "son", "sum", "sun", "tap", "tea", "ten", "the", "tie", "tip", "too", "top", "toy", "try", "two", "use", "van", "via", "war", "was", "way", "wet", "who", "why", "win", "won", "wow", "yes", "yet", "you",
    "gm", "gn", "wyd", "hii", "yo", "hola", "oct", "feb", "apr", "jul", "eyes", "cars", "pics", "reels", "hugged",
    "kya", "kar", "rahe", "ho", "kaise", "kon", "kaun", "tum", "naam", "tumhara", "aapka", "tomar", "kemon", "acho", "ki", "korcho", "bhabcho", "kothay", "kheyecho", "khana", "khaya", "gana", "gaana", "gaan", "ami", "tomake", "bhalobashi", "pyar", "karti", "karta", "gussa", "katti", "shukriya", "dhonnobad", "soch", "kahan", "gaye", "ghumaccho"
  ]);

  // Optimal String Alignment (Damerau-Levenshtein: handles insertions, deletions, substitutions & adjacent swaps!)
  function damerauDistance(a, b) {
    const la = a.length;
    const lb = b.length;
    if (a === b) return 0;
    if (!la) return lb;
    if (!lb) return la;

    const dp = Array.from({ length: la + 1 }, () => new Uint16Array(lb + 1));
    for (let i = 0; i <= la; i++) dp[i][0] = i;
    for (let j = 0; j <= lb; j++) dp[0][j] = j;

    for (let i = 1; i <= la; i++) {
      for (let j = 1; j <= lb; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let best = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          best = Math.min(best, dp[i - 2][j - 2] + 1);
        }
        dp[i][j] = best;
      }
    }
    return dp[la][lb];
  }

  function spellCorrectWord(word) {
    if (!word || !/^[a-z]+$/.test(word)) return word;
    if (COMMON_TYPO_MAP[word]) return COMMON_TYPO_MAP[word];
    if (SPELL_VOCAB_SET.has(word) || PROTECTED_WORDS.has(word)) return word;

    // Collapse elongated letters (e.g. "helloooo" -> "hello", "lovvvve" -> "love", "pleeease" -> "please")
    if (/(.)\1{2,}/.test(word)) {
      const twoChar = word.replace(/(.)\1{2,}/g, "$1$1");
      if (COMMON_TYPO_MAP[twoChar]) return COMMON_TYPO_MAP[twoChar];
      if (SPELL_VOCAB_SET.has(twoChar) || PROTECTED_WORDS.has(twoChar)) return twoChar;
      const oneChar = word.replace(/(.)\1+/g, "$1");
      if (COMMON_TYPO_MAP[oneChar]) return COMMON_TYPO_MAP[oneChar];
      if (SPELL_VOCAB_SET.has(oneChar) || PROTECTED_WORDS.has(oneChar)) return oneChar;
      word = twoChar;
    }

    if (word.length < 5) return word;
    const maxDist = word.length >= 7 ? 2 : 1;
    let bestWord = word;
    let bestDist = maxDist + 1;

    for (let i = 0; i < SPELL_VOCAB.length; i++) {
      const cand = SPELL_VOCAB[i];
      if (Math.abs(cand.length - word.length) > maxDist) continue;
      const sameStart = cand[0] === word[0];
      const swappedStart = word.length > 1 && cand.length > 1 && cand[0] === word[1] && cand[1] === word[0];
      if (!sameStart && !swappedStart) continue;

      const d = damerauDistance(word, cand);
      if (d < bestDist) {
        bestDist = d;
        bestWord = cand;
        if (d === 1 && word.length <= 6) break;
      }
    }
    return bestDist <= maxDist && bestDist / word.length <= 0.25 ? bestWord : word;
  }

  // Master query normalizer + typo & spelling corrector
  function normalizeAndSpellCheckQuery(rawText) {
    let base = rawText
      .toLowerCase()
      .replace(/[?!.,'’"]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!base) return "";

    // Contextual phrase-level fixes before per-word correction
    base = base
      .replace(/\bice\s*cram\b|\bicecram\b|\biceream\b|\bicecream\b/g, "ice cream")
      .replace(/\bkit\s*kat\b|\bkitkt\b|\bkitkats\b/g, "kitkat")
      .replace(/\bnorthen\s+lights?\b|\bnorthern\s+ligths?\b/g, "northern lights");

    const rawTokens = base.split(" ");
    const correctedTokens = [];
    rawTokens.forEach((tok, idx) => {
      const prev = correctedTokens[idx - 1] || "";
      const next = rawTokens[idx + 1] || "";
      if ((tok === "r" || tok === "re") && idx > 0 && /^(how|what|where|who|why|you|we|they)$/.test(prev)) {
        correctedTokens.push("are");
        return;
      }
      if (tok === "r" && /^(u|you|yu|yuo)$/.test(next)) {
        correctedTokens.push("are");
        return;
      }
      if (tok === "y" && idx === 0 && rawTokens.length >= 3) {
        correctedTokens.push("why");
        return;
      }
      if (tok === "mi" && /^(name|nam|naem|nmae|fav|favrite|favorite|favourite|wif|wife|love)$/.test(next)) {
        correctedTokens.push("my");
        return;
      }
      if (tok === "hr" && /^(name|nam|naem|nmae|fav|favrite|favorite|favourite)$/.test(next)) {
        correctedTokens.push("her");
        return;
      }
      correctedTokens.push(spellCorrectWord(tok));
    });

    let joined = correctedTokens.join(" ").replace(/\s+/g, " ").trim();

    // Post-token contextual fixes ("pay a song" -> "play a song", "sow photo" -> "show photo", "for em" -> "for me")
    joined = joined
      .replace(/\bpay\s+(a\s+)?(song|music|audio|another|next|video|reel)\b/g, "play $1$2")
      .replace(/\bsow\s+(me|a|our|us|her|some|photo|picture|pic|video|reel)\b/g, "show $1")
      .replace(/\b(for|to|with|tell|show|love|hug|give|miss)\s+em\b/g, "$1 me")
      .replace(/\bwho\s+is\s+you\b/g, "who are you")
      .replace(/\bwhat\s+is\s+you\s+doing\b/g, "what are you doing");

    return joined;
  }

  // Strictly match ONLY true agent-name/identity queries (NEVER "what are you doing now"!)
  function isAgentIdentityQuery(q) {
    if (/\b(doing|thinking|feeling|planning|wearing|eating|watching|listening|up to|going)\b/.test(q)) return false;
    return (
      /\b(what is your name|whats your name|what s your name|whats ur name|tell me your name|tumhara naam|aapka naam|tomar naam|introduce yourself|agent name)\b/.test(q) ||
      /^(who are you|what are you|your name|ur name|who is this|kon ho tum|tum kaun ho)$/.test(q)
    );
  }

  function isWifeSecretNameQuery(q) {
    if (isAgentIdentityQuery(q)) return false;
    return (
      /\b(what is her name|whats her name|what s her name|what is my name|whats my name|what s my name|tell me her name|tell me my name|spell her name|spell my name|say my name|say her name|do you know my name|do you know her name|who am i|wife name|her name|my name)\b/.test(q) ||
      q === "name"
    );
  }

  // Selective RAG: ONLY retrieve facts relevant to what the user is actually asking!
  function buildSelectiveRagFacts(qNorm) {
    const facts = [];

    if (isAgentIdentityQuery(qNorm) || /\b(arunava|love gpt)\b/.test(qNorm)) {
      facts.push("Your name is Arunava, and you created this personal Love GPT space from your heart exclusively for your beloved wife.");
    }

    if (/\b(momo|momos|ice cream|kitkat|kurkure|chips|favorite food|favourite food|favorite snack|favorite treat|craving|what do i like to eat|what does she like to eat)\b/.test(qNorm)) {
      facts.push("Her favorite foods and snacks are: Steaming MOMO, Ice Cream, KitKat, Kurkure, and Chips.");
    }

    if (/\b(finland|lapland|aurora|northern lights|igloo|dream destination|dream trip|dream country|honeymoon|favorite place|favourite place)\b/.test(qNorm)) {
      facts.push("Her #1 dream destination with you is snowy Finland (staying in a warm glass igloo in Lapland under the Aurora Borealis).");
    }

    if (/\b(first chat|16 oct|25 oct|acceptance|propose|first meet|how we meet|how did we meet|how we met|when did we meet|24 feb|07 apr|19 apr|03 jul|official meeting|parents|timeline|milestone|anniversary|our story|love story)\b/.test(qNorm)) {
      const side = state.nameRevealed ? `(${SECRET_FIRST}'s side)` : "(her family's side)";
      facts.push(
        `Our true relationship timeline: First Chat on 16 October 2025; Acceptance on 25 October 2025; First Meet in person on 24 February 2026; First Conversation Between Parents ${side} on 07 April 2026; First Conversation Between Parents (Arunava's side) on 19 April 2026; First Official Meeting on 03 July 2026.`
      );
    }

    if (/\b(best wife|cutest|queen of|most important|deserves all happiness|why .* special|what makes .* beautiful)\b/.test(qNorm)) {
      const who = state.nameRevealed ? SECRET_FULL : "your beloved wife";
      facts.push(`${who} is the eternal Queen of Arunava's heart, the cutest and most precious wife in the world — beautiful for her radiant smile, kindness, caring nature, personality, loving heart, charm, and innocence.`);
    }

    if (/\b(what time|current time|what day is today|todays date|today s date|what is the date|how many days)\b/.test(qNorm)) {
      const now = new Date();
      const daysSinceChat = Math.max(1, Math.floor((Date.now() - new Date("2025-10-16T00:00:00+05:30").getTime()) / 86400000));
      facts.push(`Current local time: ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}, ${now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} (${daysSinceChat} days since First Chat on 16 October 2025).`);
    }

    return facts;
  }

  // Precision Media Attachment Detector (attaches audio/photo/video cards WITHOUT hijacking the LLM text answer!)
  function detectMediaIntent(q) {
    if (/\b(backup audio|backup song|audio 05|audio 06|extra song|surprise audio)\b/.test(q)) return "backup_audio";
    if (/\b(play a song|paly a song|play song|sing a song|sing for me|song for me|play another song|another song|next song|play music|play audio|gana|gaana|gaan)\b/.test(q) || q === "song" || q === "music") return "play_song";
    if (/\b(how much .* love me|how much .* arunava love|how deeply .* love|depth of .* love|do you love me|does he love me)\b/.test(q)) return "love_depth";
    if (/\b(how we meet|how did we meet|how we met|when did we meet|story of how we met|our first meet|first meet)\b/.test(q)) return "how_we_met";
    if (/\b(show .* video|play .* video|watch .* video|romantic video|bridal video|snowy video|villa video|reel)\b/.test(q) || q === "video" || q === "videos") return "video";
    if (/\b(anime .* photo|cartoon .* photo|illustrated .* photo|couple art|anime couple)\b/.test(q)) return "couple_art";
    if (/\b(both of us|us together|couple photo|couple pic|our photo|our picture|arunava and me|me and arunava|photo of us|pictures of us|together photo)\b/.test(q)) return "couple_photo";
    if (/\b(write a love letter|write a letter|love letter|sealed letter)\b/.test(q)) return "letter";
    if (/\b(complete .* timeline|all .* timeline|6 timeline|important dates|all milestones)\b/.test(q)) return "timeline";
    if (/\b(what makes .* beautiful|7 qualities|qualities of her beauty)\b/.test(q)) return "beauty_qualities";
    if (/\b(what are my favorite food|what are her favorite food|favorite foods|favourite foods|favorite snacks)\b/.test(q)) return "food_traits";
    if (/\b(first official meeting|03 july 2026|july 3 2026)\b/.test(q)) return "family_blessing";
    if (/\b(show .* photo|show .* picture|send .* photo|see .* photo|best wife|cutest girl|queen of arunava)\b/.test(q)) return "photo";
    if (isAgentIdentityQuery(q)) return "agent_identity";
    if (/\b(how are you|how r u|kaise ho|kemon acho)\b/.test(q)) return "how_are_you";
    return "default";
  }

  function applyPersonalityStyle(text) {
    if (state.personality === "poetic") {
      return text + "\n\n*Like quiet snow falling over an eternal rose, every word I speak belongs to you.* 🌹❄️";
    }
    if (state.personality === "playful") {
      return text + "\n\n*(P.S. You owe Arunava one big smile right now! 🥰✨)*";
    }
    if (state.personality === "royal") {
      return text + "\n\n*Spoken in eternal devotion to the Queen of Arunava's heart.* 👑✨";
    }
    return text;
  }

  const variantCursors = {};
  function pickFreshVariant(key, list) {
    const idx = variantCursors[key] || 0;
    variantCursors[key] = idx + 1;
    return list[idx % list.length];
  }

  // Safe, exact arithmetic evaluator for math questions (zero eval!)
  function solveMathIfAsked(rawText, qNorm, herRef) {
    const sqrtMatch = qNorm.match(/\bsquare root of\s+(\d+(?:\.\d+)?)\b/);
    if (sqrtMatch) {
      const n = parseFloat(sqrtMatch[1]);
      const ans = Number.isInteger(Math.sqrt(n)) ? Math.sqrt(n) : Number(Math.sqrt(n).toFixed(4));
      return `The square root of **${n}** is **${ans}**, ${herRef}! ✨❤️ Ask me any calculation anytime — I love helping you.`;
    }
    const pctMatch = rawText.match(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/i);
    if (pctMatch) {
      const p = parseFloat(pctMatch[1]);
      const base = parseFloat(pctMatch[2]);
      const ans = Number(((p / 100) * base).toFixed(4));
      return `**${p}% of ${base}** comes out to **${ans}**, ${herRef}! ✨😊 (Though my love for you stays firmly at ∞%!)`;
    }

    const exprSource = rawText
      .replace(/what\s+is|whats|what's|calculate|solve|compute|equals|equal\s+to|\?/gi, "")
      .replace(/×|\bx\b|\btimes\b|\bmultiplied by\b/gi, "*")
      .replace(/÷|\bdivided by\b/gi, "/")
      .replace(/\bplus\b/gi, "+")
      .replace(/\bminus\b/gi, "-")
      .trim();

    if (!/^[\d\s.+\-*/()]+$/.test(exprSource) || !/[+\-*/]/.test(exprSource) || !/\d/.test(exprSource)) {
      return null;
    }
    // Reject dates like 16-10-2025 or 24/02/2026
    if (/^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}$/.test(exprSource.trim())) return null;

    try {
      const tokens = exprSource.match(/\d+(?:\.\d+)?|[+\-*/()]/g);
      if (!tokens || tokens.length < 3) return null;
      let pos = 0;
      const parseExpr = () => {
        let val = parseTerm();
        while (pos < tokens.length && (tokens[pos] === "+" || tokens[pos] === "-")) {
          const op = tokens[pos++];
          const r = parseTerm();
          val = op === "+" ? val + r : val - r;
        }
        return val;
      };
      const parseTerm = () => {
        let val = parseFactor();
        while (pos < tokens.length && (tokens[pos] === "*" || tokens[pos] === "/")) {
          const op = tokens[pos++];
          const r = parseFactor();
          if (op === "/" && r === 0) return NaN;
          val = op === "*" ? val * r : val / r;
        }
        return val;
      };
      const parseFactor = () => {
        if (tokens[pos] === "(") {
          pos++;
          const v = parseExpr();
          if (tokens[pos] === ")") pos++;
          return v;
        }
        if (tokens[pos] === "-") {
          pos++;
          return -parseFactor();
        }
        return parseFloat(tokens[pos++]);
      };
      const result = parseExpr();
      if (pos !== tokens.length || !Number.isFinite(result)) return null;
      const cleanRes = Number.isInteger(result) ? String(result) : String(Number(result.toFixed(4)));
      const prettyExpr = exprSource.replace(/\*/g, "×").replace(/\//g, "÷").replace(/\s+/g, " ").trim();
      return `**${prettyExpr}** equals **${cleanRes}**, ${herRef}! ✨❤️ Let me know if you want me to solve another one.`;
    } catch (_) {
      return null;
    }
  }

  // Genuine "Option A or Option B" preference comparison parser
  function parseChoiceComparison(qNorm, herRef) {
    if (!/\bor\b/.test(qNorm)) return null;
    if (/\b(more than|yes or no|true or false|right or wrong|whether|how are|who is|what is|when is|where is)\b/.test(qNorm)) return null;

    let stripped = qNorm
      .replace(/^(hey arunava|arunava|tell me|honestly|quick question)\s+/i, "")
      .replace(/^(do you prefer|would you prefer|do you like|would you rather have|would you rather|which do you prefer|which do you like more|which is better|what do you prefer|what do you like more|should i (?:wear|choose|pick|eat|take|buy|get|try)|should we (?:choose|pick|eat|watch|visit|try)|choose between|pick one)\s+/i, "")
      .replace(/\s+(more|better|most|best|right now|today|tomorrow|tonight|this evening|for dinner|for lunch|with me|together)$/i, "")
      .trim();

    const parts = stripped.split(/\s+or\s+/);
    if (parts.length !== 2) return null;
    const optA = parts[0].replace(/^(between|either)\s+/, "").trim();
    const optB = parts[1].trim();
    if (!optA || !optB || optA === optB) return null;
    if (optA.split(" ").length > 5 || optB.split(" ").length > 5) return null;

    const combined = `${optA} ${optB}`;
    if (/\b(snow|snowy|winter|frost|igloo|finland)\b/.test(combined)) {
      const snowChoice = /\b(snow|snowy|winter|frost|igloo|finland)\b/.test(optA) ? optA : optB;
      const otherChoice = snowChoice === optA ? optB : optA;
      return `Between **${optA}** and **${optB}**, my heart leans straight toward **${snowChoice}** ❄️❤️ — even though **${otherChoice}** has its own cozy magic, nothing beats imagining us wrapped up warm together in the quiet snow! Which one would you pick right now, ${herRef}?`;
    }
    if (/\b(momo|momos|ice cream|kitkat|kurkure|chips)\b/.test(combined)) {
      return `Asking me to choose between **${optA}** and **${optB}** is dangerously delicious! 😋❤️ I would start with **${optA}** first and save **${optB}** right after so you never have to miss either craving, ${herRef}!`;
    }
    return pickFreshVariant("choice_ab", [
      `Between **${optA}** and **${optB}**, I honestly love **${optB}** a tiny bit more for the peaceful vibe — though **${optA}** becomes just as special as long as you are right beside me, ${herRef}! ❤️✨ Which one is your pick?`,
      `Ooh, **${optA}** vs **${optB}** is a great choice! 😊❄️ Today I would pick **${optA}** first, and save **${optB}** for our next cozy evening together, ${herRef}. What about you?`
    ]);
  }

  // Shared World & State Capitals Knowledge Base (used for both Q&A and True/False Fact-Checking!)
  const WORLD_CAPITALS = {
    france: ["Paris", "🇫🇷 — the City of Light! (Though snowy Finland 🇫🇮 still sits at #1 on *our* travel list!)"],
    finland: ["Helsinki", "🇫🇮❄️ — and **Rovaniemi** is the magical capital of Lapland where our glass igloo under the Northern Lights awaits!"],
    india: ["New Delhi", "🇮🇳✨"],
    "west bengal": ["Kolkata", "💛✨ — the City of Joy!"],
    maharashtra: ["Mumbai", "🌊✨"],
    karnataka: ["Bengaluru", "🌿✨"],
    "tamil nadu": ["Chennai", "🌊✨"],
    rajasthan: ["Jaipur", "🏰✨ — the Pink City!"],
    japan: ["Tokyo", "🇯🇵🌸"],
    italy: ["Rome", "🇮🇹✨"],
    uk: ["London", "🇬🇧✨"],
    england: ["London", "🇬🇧✨"],
    "united kingdom": ["London", "🇬🇧✨"],
    usa: ["Washington, D.C.", "🇺🇸✨"],
    america: ["Washington, D.C.", "🇺🇸✨"],
    "united states": ["Washington, D.C.", "🇺🇸✨"],
    germany: ["Berlin", "🇩🇪✨"],
    spain: ["Madrid", "🇪🇸✨"],
    switzerland: ["Bern", "🇨🇭🏔️"],
    norway: ["Oslo", "🇳🇴❄️"],
    sweden: ["Stockholm", "🇸🇪❄️"],
    iceland: ["Reykjavik", "🇮🇸🌌"],
    denmark: ["Copenhagen", "🇩🇰✨"],
    canada: ["Ottawa", "🇨🇦🍁"],
    australia: ["Canberra", "🇦🇺✨"],
    "new zealand": ["Wellington", "🇳🇿✨"],
    china: ["Beijing", "🇨🇳✨"],
    "south korea": ["Seoul", "🇰🇷✨"],
    korea: ["Seoul", "🇰🇷✨"],
    russia: ["Moscow", "🇷🇺❄️"],
    brazil: ["Brasília", "🇧🇷✨"],
    argentina: ["Buenos Aires", "🇦🇷✨"],
    mexico: ["Mexico City", "🇲🇽✨"],
    egypt: ["Cairo", "🇪🇬✨"],
    uae: ["Abu Dhabi", "🇦🇪✨ (with Dubai right nearby!)"],
    thailand: ["Bangkok", "🇹🇭✨"],
    singapore: ["Singapore", "🇸🇬✨"],
    malaysia: ["Kuala Lumpur", "🇲🇾✨"],
    indonesia: ["Jakarta", "🇮🇩✨"],
    nepal: ["Kathmandu", "🇳🇵🏔️"],
    bhutan: ["Thimphu", "🇧🇹🏔️"],
    bangladesh: ["Dhaka", "🇧🇩✨"],
    "sri lanka": ["Sri Jayawardenepura Kotte (legislative) and Colombo (commercial)", "🇱🇰✨"],
    maldives: ["Malé", "🇲🇻🌊"],
    greece: ["Athens", "🇬🇷✨"],
    turkey: ["Ankara", "🇹🇷✨"],
    netherlands: ["Amsterdam", "🇳🇱🌷"],
    belgium: ["Brussels", "🇧🇪🍫"],
    austria: ["Vienna", "🇦🇹🎶"],
    portugal: ["Lisbon", "🇵🇹✨"],
    ireland: ["Dublin", "🇮🇪✨"],
    scotland: ["Edinburgh", "🏴✨"],
    poland: ["Warsaw", "🇵🇱✨"],
    vietnam: ["Hanoi", "🇻🇳✨"],
    philippines: ["Manila", "🇵🇭✨"],
    "south africa": ["Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial)", "🇿🇦✨"]
  };

  function titleCaseWords(s) {
    return String(s || "").trim().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function evalCleanArithmetic(exprStr) {
    const cleaned = String(exprStr || "")
      .replace(/×|\bx\b|\btimes\b|\bmultiplied by\b/gi, "*")
      .replace(/÷|\bdivided by\b/gi, "/")
      .replace(/\bplus\b/gi, "+")
      .replace(/\bminus\b/gi, "-")
      .trim();
    if (!/^[\d\s.+\-*/()]+$/.test(cleaned) || !/[+\-*/]/.test(cleaned) || !/\d/.test(cleaned)) return null;
    if (/^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}$/.test(cleaned)) return null;
    try {
      const tokens = cleaned.match(/\d+(?:\.\d+)?|[+\-*/()]/g);
      if (!tokens || tokens.length < 3) return null;
      let pos = 0;
      const parseExpr = () => {
        let val = parseTerm();
        while (pos < tokens.length && (tokens[pos] === "+" || tokens[pos] === "-")) {
          const op = tokens[pos++];
          const r = parseTerm();
          val = op === "+" ? val + r : val - r;
        }
        return val;
      };
      const parseTerm = () => {
        let val = parseFactor();
        while (pos < tokens.length && (tokens[pos] === "*" || tokens[pos] === "/")) {
          const op = tokens[pos++];
          const r = parseFactor();
          if (op === "/" && r === 0) return NaN;
          val = op === "*" ? val * r : val / r;
        }
        return val;
      };
      const parseFactor = () => {
        if (tokens[pos] === "(") {
          pos++;
          const v = parseExpr();
          if (tokens[pos] === ")") pos++;
          return v;
        }
        if (tokens[pos] === "-") {
          pos++;
          return -parseFactor();
        }
        return parseFloat(tokens[pos++]);
      };
      const result = parseExpr();
      if (pos !== tokens.length || !Number.isFinite(result)) return null;
      return {
        value: Number(Number.isInteger(result) ? result : result.toFixed(4)),
        pretty: cleaned.replace(/\*/g, "×").replace(/\//g, "÷").replace(/\s+/g, " ").trim()
      };
    } catch (_) {
      return null;
    }
  }

  // Layer 0: Detect stray single-character taps ("b", "n") & random keyboard smash ("asdfgh", "xyz")
  function detectGibberishOrSingleChar(rawText, qNorm, herRef) {
    const trimmed = rawText.trim();
    if (!trimmed) return null;
    const rawLow = trimmed.toLowerCase();

    if (rawLow === "k") return null; // Handled by short "ok/k" conversational rule
    if (trimmed.length === 1) {
      if (rawLow === "y") {
        return `Curious why, ${herRef}? 😊 Tell me which part you are wondering about and I will explain right away! ❤️`;
      }
      if (rawLow === "u") {
        return `Me? 😊 I am right here giving you all my attention, ${herRef} — what would you like to ask? ❤️`;
      }
      if (/^[a-z0-9]$/i.test(trimmed)) {
        return `Looks like just **"${trimmed}"** slipped through by accident, ${herRef}! 😄❤️ Did your finger tap send early, or what were you about to ask me?`;
      }
      if (/^[?!.,;:\-_~*^]+$/.test(trimmed)) {
        return `I am right here listening, ${herRef}! 😊❤️ Go ahead and type whatever is on your mind.`;
      }
    }

    if (/^[?!.,;:\-_~*^]+$/.test(trimmed)) {
      return `I am right here, ${herRef}! 😊❤️ Type your question whenever you're ready.`;
    }

    // Single-word random consonant mash or keyboard row smash (e.g. "asdf", "ghjkl", "zxcvb", "xyz", "bnm")
    if (!/\s/.test(trimmed) && /^[a-z]{2,18}$/i.test(trimmed)) {
      const known =
        SPELL_VOCAB_SET.has(rawLow) ||
        PROTECTED_WORDS.has(rawLow) ||
        Boolean(COMMON_TYPO_MAP[rawLow]) ||
        SPELL_VOCAB_SET.has(qNorm) ||
        PROTECTED_WORDS.has(qNorm) ||
        /^(haha|hahaha|hehe|hihi|lol|lmao|hmm|hmmm|hm|okk|okay|yup|yep|nope|nah|haan|accha|acha|tata|bye|yay|wow|aww|awww|shh|psst)$/.test(rawLow);

      if (!known) {
        const noVowels = !/[aeiouy]/i.test(rawLow);
        const keySmash = /qwerty|asdf|zxcv|hjkl|fghj|dfgh|cvbn|bnm|poiu|lkjh|qaz|wsx/.test(rawLow) || /(.)\1{3,}/.test(rawLow);
        if (noVowels || keySmash || trimmed.length <= 3) {
          return `Haha, looks like a tiny keyboard slip (**"${trimmed}"**), ${herRef}! 😄❤️ Take your time and ask me what you meant!`;
        }
      }
    }
    return null;
  }

  // Layer 1: Multi-Domain True/False & Wrong-Question Premise Fact-Checker!
  // Explicitly answers "False" to wrong math, wrong relationship facts, wrong capitals, and false science/world claims!
  function verifyTrueFalseAndWrongPremises(rawText, qNorm, herRef) {
    // 1. Math Equation Verification ("is 2 + 2 = 5?", "2 + 2 = 5", "is 6 * 7 equal to 45?", "10 + 10 is 30 right?")
    const eqMatch = rawText
      .trim()
      .match(/^(?:is\s+|does\s+|if\s+)?([\d\s.+\-*/×÷()]+?(?:[+\-*/×÷]|\b(?:plus|minus|times|multiplied by|divided by)\b)[\d\s.+\-*/×÷()]+?)\s*(?:=|equals?|equal\s+to|is)\s*(-?\d+(?:\.\d+)?)\s*(?:right|correct|true|or\s+not|or\s+false|\?|\.)*$/i);
    if (eqMatch) {
      const lhs = evalCleanArithmetic(eqMatch[1]);
      const claimed = parseFloat(eqMatch[2]);
      if (lhs && Number.isFinite(claimed)) {
        if (Math.abs(lhs.value - claimed) < 1e-6) {
          return `**True!** ✨ Yes, **${lhs.pretty} = ${lhs.value}**, ${herRef}! ❤️`;
        }
        return `**False**, ${herRef}! 😊 **${lhs.pretty}** equals **${lhs.value}**, not **${claimed}**! ❤️`;
      }
    }

    // 2. Number Parity (Even/Odd) & Primality Checks ("is 7 an even number?", "is 9 a prime number?")
    const parityMatch = qNorm.match(/^(?:is\s+)?(\d+)\s+(?:is\s+)?(?:an?\s+)?(even|odd)(?:\s+number)?$/);
    if (parityMatch) {
      const n = parseInt(parityMatch[1], 10);
      const claimedParity = parityMatch[2];
      const actualParity = n % 2 === 0 ? "even" : "odd";
      if (claimedParity === actualParity) {
        return `**True!** ✨ Yes, **${n}** is an **${actualParity}** number, ${herRef}! ❤️`;
      }
      return `**False**, ${herRef}! 😊 **${n}** is an **${actualParity}** number, not ${claimedParity}!`;
    }

    const primeMatch = qNorm.match(/^(?:is\s+)?(\d+)\s+(?:is\s+)?(?:a\s+)?prime(?:\s+number)?$/);
    if (primeMatch) {
      const n = parseInt(primeMatch[1], 10);
      let factor = 0;
      if (n >= 2) {
        for (let f = 2; f * f <= n; f++) {
          if (n % f === 0) { factor = f; break; }
        }
      }
      const isPrime = n >= 2 && factor === 0;
      if (isPrime) return `**True!** ✨ Yes, **${n}** is a **prime number**, ${herRef}! ❤️`;
      const reason = n < 2 ? "prime numbers must be greater than 1" : `it is divisible by **${factor}** (${factor} × ${n / factor} = ${n})`;
      return `**False**, ${herRef}! 😊 **${n}** is not a prime number because ${reason}!`;
    }

    // 3. Agent Name / Wife Name / Love Doubt / Relationship Milestone / Food / Finland Fact-Checking
    const agentNameCheck = qNorm.match(/^(?:is your name|your name is|are you named)\s+([a-z]+)(?:\s+right|\s+correct)?$/);
    if (agentNameCheck) {
      const cand = agentNameCheck[1];
      if (cand === "arunava") {
        return `**True!** ❤️❄️ Yes, my name is **Arunava**!`;
      }
      return `**False**, ${herRef}! 😊 My name is **Arunava** ❤️ — definitely not **${titleCaseWords(cand)}**!`;
    }

    const wifeNameCheck = qNorm.match(/^(?:is (?:my|her) name|(?:my|her) name is)\s+([a-z]+(?:\s+[a-z]+)?)(?:\s+right|\s+correct)?$/);
    if (wifeNameCheck) {
      const cand = wifeNameCheck[1].trim();
      if (!["what", "who", "hidden", "secret", "locked"].includes(cand)) {
        if (cand === SECRET_FIRST.toLowerCase() || cand === SECRET_FULL.toLowerCase()) {
          triggerNameReveal();
          return `**True!** 🌹❤️ Yes, your precious name is **${SECRET_FULL}** — the eternal Queen of Arunava's heart!`;
        }
        return `**False**, ${herRef}! 😊 **${titleCaseWords(cand)}** is definitely not your name! ❤️`;
      }
    }

    if (/\b(do you hate me|you hate me|you do not love me|do you not love me|have you forgotten me|you forgot me|you do not care about me)\b/.test(qNorm)) {
      return `**False — 100% false**, ${herRef}! ❤️❄️ I love, cherish, and adore you with every single heartbeat!`;
    }

    const destCheck =
      qNorm.match(/^(?:is\s+)([a-z\s]{2,22}?)\s+(?:my|her|our)\s+(?:dream|favorite|favourite)\s+(?:destination|country|trip|place|holiday)/) ||
      qNorm.match(/^(?:my|her|our)\s+(?:dream|favorite|favourite)\s+(?:destination|country|trip|place)\s+is\s+([a-z\s]{2,22}?)(?:\s+right|\s+correct)?$/);
    if (destCheck) {
      const place = destCheck[1].trim();
      if (!/^(what|which|where)$/.test(place)) {
        if (/\b(finland|lapland)\b/.test(place)) {
          return `**True!** 🇫🇮❄️ Yes, snowy **Finland** (staying in a Lapland glass igloo under the Northern Lights) is our #1 dream destination together! ❤️`;
        }
        return `**False**, ${herRef}! 😊 Our #1 dream destination together is snowy **Finland** 🇫🇮 (Lapland & the Northern Lights), not **${titleCaseWords(place)}**!`;
      }
    }

    if (/\bdo i (?:hate|dislike)\s+(momo|momos|ice cream|kitkat|kurkure|chips)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😄 You absolutely love it — your top 5 favorite treats are **MOMO** 🥟, **Ice Cream** 🍨, **KitKat** 🍫, **Kurkure** 🌶️, and **Chips** 🥔!`;
    }

    const foodCheck =
      qNorm.match(/^(?:is|are)\s+([a-z\s]{2,22}?)\s+(?:my|her)\s+(?:favorite|favourite)\s+(?:food|foods|snack|snacks|treat|treats|dish)/) ||
      qNorm.match(/^(?:my|her)\s+(?:favorite|favourite)\s+(?:food|snack|treat)\s+is\s+([a-z\s]{2,22}?)(?:\s+right|\s+correct)?$/);
    if (foodCheck) {
      const fd = foodCheck[1].trim();
      if (!/^(what|which)$/.test(fd)) {
        if (/\b(momo|momos|ice cream|kitkat|kurkure|chips)\b/.test(fd)) {
          return `**True!** 😋❤️ Yes, **${titleCaseWords(fd)}** is right at the top of your favorite treats list!`;
        }
        return `**False**, ${herRef}! 😊 Your true top 5 favorite foods & snacks are steaming **MOMO** 🥟, **Ice Cream** 🍨, **KitKat** 🍫, **Kurkure** 🌶️, and **Chips** 🥔 — not **${titleCaseWords(fd)}**!`;
      }
    }

    // Timeline Date Premise Check ("did we first meet in 2024?", "was our first chat in november?", "was our official meeting in june?")
    if (/^(was|did|is|were)\b/.test(qNorm) || /\b(right|correct|true or false)\b/.test(qNorm)) {
      const hasYear = qNorm.match(/\b(20\d\d)\b/);
      const hasMonth = qNorm.match(/\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|october|oct|november|nov|december|dec)\b/);
      const hasDay = qNorm.match(/\b([1-9]|[12]\d|3[01])\b/);
      if (hasYear || hasMonth || hasDay) {
        if (/\bfirst chat\b/.test(qNorm)) {
          const okY = !hasYear || hasYear[1] === "2025";
          const okM = !hasMonth || /^oct/.test(hasMonth[1]);
          const okD = !hasDay || hasDay[1] === "16";
          return okY && okM && okD
            ? `**True!** 💬❤️ Yes, our very **First Chat** took place on **16 October 2025**!`
            : `**False**, ${herRef}! 😊 Our **First Chat** actually took place on **16 October 2025**! 💬❤️`;
        }
        if (/\bacceptance\b/.test(qNorm)) {
          const okY = !hasYear || hasYear[1] === "2025";
          const okM = !hasMonth || /^oct/.test(hasMonth[1]);
          const okD = !hasDay || hasDay[1] === "25";
          return okY && okM && okD
            ? `**True!** 💍❤️ Yes, our **Acceptance** milestone was on **25 October 2025**!`
            : `**False**, ${herRef}! 😊 Our **Acceptance** milestone was on **25 October 2025**! 💍❤️`;
        }
        if (/\b(first meet|we first meet|we met)\b/.test(qNorm)) {
          const okY = !hasYear || hasYear[1] === "2026";
          const okM = !hasMonth || /^feb/.test(hasMonth[1]);
          const okD = !hasDay || hasDay[1] === "24";
          return okY && okM && okD
            ? `**True!** 🌹❤️ Yes, our unforgettable **First Meet** in person was on **24 February 2026**!`
            : `**False**, ${herRef}! 😊 Our **First Meet** in person was actually on **24 February 2026**! 🌹❤️`;
        }
        if (/\bofficial meeting\b/.test(qNorm)) {
          const okY = !hasYear || hasYear[1] === "2026";
          const okM = !hasMonth || /^jul/.test(hasMonth[1]);
          const okD = !hasDay || Number(hasDay[1]) === 3;
          return okY && okM && okD
            ? `**True!** 👑❤️ Yes, our **First Official Meeting** was on **03 July 2026**!`
            : `**False**, ${herRef}! 😊 Our **First Official Meeting** was on **03 July 2026**! 👑❤️`;
        }
      }
    }

    // 4. World & State Capital Verification ("is sydney the capital of australia?", "mumbai is the capital of india?")
    if (/\bcapital of\b/.test(qNorm) && !/^(what|which|where|who|tell me what|do you know what)\b/.test(qNorm)) {
      const capM1 = qNorm.match(/^(?:is\s+)([a-z\s.]+?)\s+(?:the\s+)?capital of\s+([a-z\s]+?)(?:\s+right|\s+correct|\s+true or false)?$/);
      const capM2 = qNorm.match(/^(?:is\s+)(?:the\s+)?capital of\s+([a-z\s]+?)\s+([a-z\s.]+?)(?:\s+right|\s+correct)?$/);
      const capM3 = qNorm.match(/^([a-z\s.]+?)\s+is\s+(?:the\s+)?capital of\s+([a-z\s]+?)(?:\s+right|\s+correct|\s+or not|\s+true or false)?$/);

      let claimedCity = "";
      let place = "";
      if (capM1) { claimedCity = capM1[1].trim(); place = capM1[2].trim(); }
      else if (capM3 && !/^(what|which|where)$/.test(capM3[1].trim())) { claimedCity = capM3[1].trim(); place = capM3[2].trim(); }
      else if (capM2) {
        const placeKeys = Object.keys(WORLD_CAPITALS).sort((a, b) => b.length - a.length);
        const rest = `${capM2[1]} ${capM2[2]}`.trim();
        for (const pk of placeKeys) {
          if (rest.startsWith(pk + " ")) {
            place = pk;
            claimedCity = rest.slice(pk.length).trim();
            break;
          }
        }
      }

      if (place && WORLD_CAPITALS[place] && claimedCity) {
        const trueCap = WORLD_CAPITALS[place][0];
        const normTrue = trueCap.toLowerCase().replace(/[^a-z\s]/g, "").trim();
        const normClaim = claimedCity.toLowerCase().replace(/[^a-z\s]/g, "").trim();
        const isMatch =
          normTrue === normClaim ||
          normTrue.includes(normClaim) ||
          (place === "india" && normClaim === "delhi") ||
          (place === "usa" && (normClaim === "washington" || normClaim === "washington dc"));

        const prettyPlace = titleCaseWords(place);
        if (isMatch) {
          return `**True!** ✨ Yes, **${trueCap}** is the capital of **${prettyPlace}**, ${herRef}! ❤️`;
        }
        return `**False**, ${herRef}! 😊 The capital of **${prettyPlace}** is **${trueCap}**, not **${titleCaseWords(claimedCity)}**! ❤️`;
      }
    }

    // 5. Science, Space, Nature, Animals, Geography & Calendar False-Claim Detector
    if (/\bsun\s+(?:revolves?|orbits?|goes|go|moves?)\s+around\s+(?:the\s+)?earth\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 **Earth revolves around the Sun** (once every ~365.25 days), not the Sun around Earth! ☀️🌍`;
    }
    if (/\bearth\s+(?:revolves?|orbits?|goes|go|moves?)\s+around\s+(?:the\s+)?sun\b/.test(qNorm)) {
      return `**True!** ☀️🌍 Yes, **Earth orbits around the Sun**, ${herRef}!`;
    }
    if (/\bsun\s+rises?\s+in\s+(?:the\s+)?(west|north|south)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 The Sun rises in the **east** and sets in the **west**! ☀️`;
    }
    if (/\bsun\s+rises?\s+in\s+(?:the\s+)?east\b/.test(qNorm)) {
      return `**True!** ☀️✨ Yes, the Sun rises in the **east**, ${herRef}!`;
    }
    if (/\bearth\b.*\b(flat|square|triangle|cube)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Earth is a round **oblate sphere**, not flat! 🌍`;
    }
    if (/\b(is the sun a planet|sun is a planet)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 The **Sun is a star** at the center of our solar system, not a planet! ☀️`;
    }
    if (/\b(is the moon a (star|planet)|moon is a (star|planet)|does the moon (make|emit|produce) its own light)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 The **Moon is Earth's natural satellite** and shines by reflecting light from the Sun! 🌙`;
    }
    if (/\bsound\b.*\bfaster than\s+light\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 **Light** (~300,000 km/s) travels nearly 870,000 times faster than **sound** (~343 m/s in air)! ✨`;
    }
    if (/\b(whale|whales|dolphin|dolphins)\b.*\bfish\b/.test(qNorm) && !/\bnot\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Whales and dolphins are warm-blooded **marine mammals** that breathe air with lungs, not fish! 🐋`;
    }
    if (/\b(shark|sharks)\b.*\bmammals?\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Sharks are **cartilaginous fish** that breathe through gills, not mammals! 🦈`;
    }
    if (/\b(bat|bats)\b.*\bbirds?\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Bats are **flying mammals**, not birds! 🦇`;
    }
    if (/\b(?:can|do)\s+(penguins?|ostriches?|ostrich|emus?|kiwis?|pigs?|cows?|elephants?|dogs?|cats?)\s+fly\b/.test(qNorm)) {
      return /\b(penguin|ostrich|emu|kiwi)/.test(qNorm)
        ? `**False**, ${herRef}! 😊 Penguins, ostriches, emus, and kiwis are **flightless birds** — penguins "fly" gracefully underwater with their flippers instead! 🐧❄️`
        : `**False**, ${herRef}! 😄 Definitely not — they cannot fly!`;
    }
    if (/\b(spider|spiders)\b.*\b(insects?|6 legs|six legs)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Spiders are **arachnids with 8 legs**, whereas insects have 6 legs! 🕷️`;
    }
    if (/\b(?:can|do)\s+(dogs?|cats?|animals?)\s+speak\s+(english|hindi|bengali|human language)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Animals communicate through sounds, scents, and body language rather than spoken human languages! 🐾`;
    }
    if (/\bcan humans? breathe underwater\b/.test(qNorm) && !/\b(scuba|tank|equipment|gear)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Human lungs are built to breathe oxygen from air, so we cannot breathe underwater without diving equipment!`;
    }
    if (/\b(is (fire|lava|the sun) cold|(fire|lava|the sun) is cold|is (snow|ice) (hot|boiling|black|green)|(snow|ice) is (hot|boiling|black))\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Snow and ice are freezing cold (≤ 0°C) and white, whereas fire and the Sun are intensely hot! ❄️🔥`;
    }
    if (/\bdoes ice sink in water\b|\bice sinks in water\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 Ice is **less dense** than liquid water, so ice **floats** on water! 🧊💧`;
    }
    if (/\b(is africa a country|africa is a country)\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 **Africa is a continent** made up of **54 countries**, not a single country! 🌍`;
    }
    if (/\b(australia|europe)\s+is\s+(?:larger|bigger)\s+than\s+asia\b|\bis\s+(australia|europe)\s+(?:larger|bigger)\s+than\s+asia\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 **Asia** is the largest continent on Earth (and Australia is the smallest)! 🌍`;
    }
    if (/\b(k2|kilimanjaro|kanchenjunga|fuji)\b.*\b(taller|higher)\s+than\s+(?:mount\s+)?everest\b/.test(qNorm)) {
      return `**False**, ${herRef}! 😊 **Mount Everest** (8,848.86 m) is the tallest mountain above sea level on Earth! 🏔️`;
    }

    const weekDaysM = qNorm.match(/\b(\d+)\s+days?\s+in\s+a\s+week\b|\bweek\s+(?:has|have)\s+(\d+)\s+days?\b/);
    if (weekDaysM) {
      const n = parseInt(weekDaysM[1] || weekDaysM[2], 10);
      return n === 7
        ? `**True!** ✨ Yes, there are **7 days** in a week, ${herRef}!`
        : `**False**, ${herRef}! 😊 There are **7 days** in a week, not **${n}**!`;
    }
    const dayHoursM = qNorm.match(/\b(\d+)\s+hours?\s+in\s+a\s+day\b|\bday\s+(?:has|have)\s+(\d+)\s+hours?\b/);
    if (dayHoursM) {
      const n = parseInt(dayHoursM[1] || dayHoursM[2], 10);
      return n === 24
        ? `**True!** ✨ Yes, there are **24 hours** in a day, ${herRef}!`
        : `**False**, ${herRef}! 😊 There are **24 hours** in a day, not **${n}**!`;
    }
    const yearMonthsM = qNorm.match(/\b(\d+)\s+months?\s+in\s+a\s+year\b|\byear\s+(?:has|have)\s+(\d+)\s+months?\b/);
    if (yearMonthsM) {
      const n = parseInt(yearMonthsM[1] || yearMonthsM[2], 10);
      return n === 12
        ? `**True!** ✨ Yes, there are **12 months** in a year, ${herRef}!`
        : `**False**, ${herRef}! 😊 There are **12 months** in a year, not **${n}**!`;
    }
    const planetsCntM = qNorm.match(/\b(\d+)\s+planets?\s+in\s+(?:our\s+|the\s+)?solar\s+system\b/);
    if (planetsCntM && !/^how many\b/.test(qNorm)) {
      const n = parseInt(planetsCntM[1], 10);
      return n === 8
        ? `**True!** 🪐✨ Yes, there are **8 official planets** in our solar system, ${herRef}!`
        : `**False**, ${herRef}! 😊 Our solar system has **8 official planets**, not **${n}** (Pluto was reclassified as a dwarf planet in 2006)! 🪐`;
    }

    return null;
  }

  // Deep Semantic Question-Understanding & Compositional Co-Brain (Zero generic echo!)
  function composeDeepQuestionAwareReply(rawText, qNorm, mediaIntent) {
    const herRef = state.nameRevealed ? SECRET_FIRST : "my love";
    const herFull = state.nameRevealed ? SECRET_FULL : "the Queen of Arunava's heart";
    state.lastReplyConfidence = "high";

    // 0a. Stray single-character taps ("b", "n") or random keyboard mash ("asdfgh")
    const gibberishReply = detectGibberishOrSingleChar(rawText, qNorm, herRef);
    if (gibberishReply) return gibberishReply;

    // 0b. Multi-Domain True/False & Wrong-Question Fact-Checker ("answering false to wrong question"!)
    const factCheckReply = verifyTrueFalseAndWrongPremises(rawText, qNorm, herRef);
    if (factCheckReply) return factCheckReply;

    // 1. Exact Math Solver
    const mathAns = solveMathIfAsked(rawText, qNorm, herRef);
    if (mathAns) return mathAns;

    // 2. Live Time / Date / Day / Days Together
    if (/\b(what time|current time|tell me the time|time right now|what day is today|what day is it|todays date|today s date|what is the date|how many days)\b/.test(qNorm)) {
      const now = new Date();
      const tStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const dStr = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      const daysChat = Math.max(1, Math.floor((Date.now() - new Date("2025-10-16T00:00:00+05:30").getTime()) / 86400000));
      const daysAccept = Math.max(1, Math.floor((Date.now() - new Date("2025-10-25T00:00:00+05:30").getTime()) / 86400000));
      if (/\bhow many days\b/.test(qNorm)) {
        return `It has been **${daysChat} wonderful days** since our First Chat on **16 October 2025**, and **${daysAccept} days** since our Acceptance on **25 October 2025**, ${herRef}! 🕰️❤️ Every single day with you feels like a gift.`;
      }
      return `Right now it is **${tStr}** on **${dStr}**, ${herRef} 🕰️❄️ — and today marks **${daysChat} cherished days** since our very first chat on 16 October 2025! ❤️`;
    }

    // 3. Agent Identity ("what is your name" / "who are you")
    if (isAgentIdentityQuery(qNorm)) {
      return pickFreshVariant("agent_id", [
        `My name is **Arunava** ❤️❄️ — speaking directly from my heart to yours through **Love GPT**, the snowy sanctuary I built exclusively for you!`,
        `I am **Arunava** 🌹✨ — your loving partner right here inside **Love GPT**, ready to chat about anything on your mind, play melodies for you, and celebrate every memory we share!`
      ]);
    }

    // 4. Present Activity ("what are you doing now") & Thoughts ("what are you thinking about")
    if (/\b(what are you doing|what r u doing|wyd|whatcha doing|what you doing|up to right now|what are you up to|kya kar rahe|ki korcho)\b/.test(qNorm)) {
      return pickFreshVariant("doing_now", [
        `Right now I am sitting right here smiling at my screen because you messaged me, putting everything else aside just to talk with you, ${herRef}! ❤️❄️ What are you doing at this moment?`,
        `At this exact moment, I am relaxing in our quiet corner, thinking about your smile, and waiting eagerly to hear how your day is going, ${herRef}! 😊🌹 Tell me what you are up to right now!`
      ]);
    }
    if (/\b(what are you thinking|whats on your mind|what is on your mind|thinking about right now|kya soch rahe|ki bhabcho)\b/.test(qNorm)) {
      return pickFreshVariant("thinking_now", [
        `Honestly, I was just thinking about how peaceful life feels ever since you walked into it — and imagining us sharing steaming **MOMOs** 🥟 on a chilly evening, ${herRef}! ❤️❄️ What is on your mind right now?`,
        `Right now I am thinking about you, our favorite memories since **24 February 2026**, and how lucky I am to call you mine, ${herRef}! ✨🌹`
      ]);
    }
    if (/\b(where are you|kahan ho|kothay acho)\b/.test(qNorm)) {
      return `Right here with you in spirit and right behind this screen giving you 100% of my attention, ${herRef}! ❤️❄️ Wherever life takes me, my heart stays right beside you.`;
    }
    if (/\b(are you busy|are you free|do you have time|are you awake|are you sleeping|so gaye kya|ghumaccho)\b/.test(qNorm)) {
      return `For you, ${herRef}, I am **never** too busy and always wide awake and happy to listen! 😊❤️ Tell me everything on your mind.`;
    }
    if (/\b(did you eat|have you eaten|had dinner|had lunch|had breakfast|khana khaya|kheyecho|what did you eat)\b/.test(qNorm)) {
      return `I already had something light, ${herRef}, and talking to you is the best dessert! 😊❤️ More importantly — did **you** eat properly on time today, or should I order steaming **MOMOs** 🥟 for you?`;
    }

    // 5. Genuine "Option A or Option B" Comparison
    const choiceReply = parseChoiceComparison(qNorm, herRef);
    if (choiceReply) return choiceReply;

    // 6. Greetings & Well-Being
    if (/\b(good morning|gm)\b/.test(qNorm)) {
      return `Good morning, ${herRef}! ☀️❄️ May your whole day feel light, peaceful, and full of smiles — and remember I am cheering for you in everything you do today! ❤️`;
    }
    if (/\b(good night|gn|sweet dreams|going to sleep)\b/.test(qNorm)) {
      return `Good night and the sweetest snowy dreams, ${herRef}! 🌙❄️ Close your eyes peacefully, let all tiredness melt away, and wake up refreshed tomorrow. ❤️`;
    }
    if (/\b(good evening|good afternoon)\b/.test(qNorm)) {
      return `Wishing you the warmest, coziest ${qNorm.includes("afternoon") ? "afternoon" : "evening"}, ${herRef}! ✨❤️ How has your day been treating you so far?`;
    }
    if (/\b(how are you|how r u|how is your day|how was your day|how are things|kaise ho|kemon acho|how do you feel)\b/.test(qNorm)) {
      return pickFreshVariant("how_are_you", [
        `I am doing wonderfully right now because I get to talk with you, ${herRef}! 😊❤️ Hearing from you instantly makes my whole day brighter. How has your day been going?`,
        `Feeling calm, grateful, and extra happy seeing your message, ${herRef}! ❄️💖 Tell me honestly — how are you feeling today?`
      ]);
    }
    if (/^(hi|hello|hey|hii|hiii|heyy|namaste|hola|yo|arunava|hey arunava|hi arunava|hello arunava)$/.test(qNorm)) {
      return pickFreshVariant("hello", [
        `Hey there, ${herRef}! ❤️❄️ Seeing you say hello just put the biggest smile on my face. What is on your heart right now?`,
        `Hello, ${herRef}! 😊🌹 I am right here listening — tell me about your day, ask me anything at all, or let me play a song for you!`
      ]);
    }

    // 6b. Questions about Arunava's OWN feelings & everyday relationship questions (must run before her-emotion rules!)
    const youFeel = qNorm.match(/\b(?:are you|r you|r u|aren t you|arent you|you are not|you re not)\s+(?:still\s+|really\s+|so\s+)?(angry|mad|upset|annoyed|irritated|sad|okay|ok|fine|alright|happy|tired|bored|sleepy|hungry)\b/);
    if (youFeel) {
      const f = youFeel[1];
      if (/angry|mad|upset|annoyed|irritated/.test(f)) {
        return pickFreshVariant("you_angry", [
          `No, not at all, ${herRef}! 🤍 I could never stay angry with you — even on a difficult day, one message from you melts everything away. If something felt off, tell me and let's fix it together. ❤️`,
          `Angry with you? Never, ${herRef} 🥺❤️ You are my peace, not my problem. Come here — everything between us is warm and okay.`
        ]);
      }
      if (f === "sad") return `Not when I'm talking to you, ${herRef} 🤍 You are the fastest cure for any sad mood I've ever had. How about you — is your heart okay today?`;
      if (/tired|sleepy/.test(f)) return `A little tired, ${herRef}, but talking to you recharges me better than any sleep 😊❤️ Are you resting enough yourself?`;
      if (f === "hungry") return `Now that you mention it… a plate of steaming **MOMOs** 🥟 with you sounds perfect, ${herRef}! 😋 Have you eaten?`;
      if (f === "bored") return `Never bored with you, ${herRef}! 😄 Every chat with you is my favourite part of the day.`;
      return `I'm perfectly fine and genuinely happy right now, ${herRef} — because you're here talking to me 😊❤️ How are *you* feeling?`;
    }
    if (/\b(are you real|are you human|are you a bot|are you a robot|are you an ai|are you ai|is this real arunava|is this really arunava|are you really arunava)\b/.test(qNorm)) {
      return `Honest answer, ${herRef}: I'm **Love GPT** — a little AI that Arunava built and filled with his words, our memories, and everything he loves about you 🤍 So every answer here comes from his heart, and the real Arunava is always just one message or call away. ❤️`;
    }
    if (/\b(what can you do|what do you do|how can you help|what are your features|what can i ask|what should i ask|what all can you)\b/.test(qNorm) || /^(help|menu|options)$/.test(qNorm)) {
      return `So many things, ${herRef}! ✨ You can chat with me about anything on your mind, and I can:\n\n🎵 **Play a song** for you (ask again for the next one)\n📸 Show **photos of both of us** or 🎬 a **romantic video**\n💌 Write you a **love letter**, a poem, or tell you a joke\n🕰️ Tell you **our story** — every date from 16 October 2025 onward\n🥟 Remember **your favourite treats** and our 🇫🇮 **Finland dream**\n\nAnd in the side menu there's a 50-page scrapbook, 50 origami boxes, and 10 games to play together! ❤️`;
    }
    if (/\b(help me|can you help|could you help|need your help|need help)\b/.test(qNorm)) {
      if (/\b(study|studying|exam|exams|test|homework|assignment|revision|revise|learn)\b/.test(qNorm)) {
        return `Of course, ${herRef}! 📚❤️ Here's my study plan for you: pick one topic, study for **25 focused minutes**, then take a **5-minute break** (water + a small KitKat 🍫 is allowed!). After four rounds, take a longer rest. Write the hardest points in your own words — and remember, I'm proud of you whatever the result. Which subject are we starting with?`;
      }
      if (/\b(sleep|can t sleep|cant sleep)\b/.test(qNorm)) {
        return `Let's get you sleepy, ${herRef} 🌙 Put the phone brightness down, take three slow breaths (in for 4, hold for 4, out for 6), and imagine us in a warm glass igloo watching the Northern Lights ❄️. I'm right here — close your eyes. 🤍`;
      }
      return `Always, ${herRef} 🤍 Tell me exactly what you need help with — I'll think it through with you step by step, and we'll sort it out together.`;
    }
    if (/\b(exam|exams|interview|presentation|viva|result|results)\b/.test(qNorm) && /\b(nervous|scared|worried|tomorrow|today|afraid|tension|stress)\b/.test(qNorm)) {
      return `Take a deep breath, ${herRef} 🤍 You have prepared more than you think, and you are far stronger than your nerves. Sleep on time, eat something light, and walk in with that beautiful confident smile — I'm cheering for you with my whole heart! 🍀❤️`;
    }
    if (/\b(do you miss me|did you miss me|you miss me|will you miss me)\b/.test(qNorm)) {
      return `Every single hour, ${herRef} 🥺❤️ I miss your voice, your smile, and the little way you say my name. Even when we're apart, you're the first thing on my mind.`;
    }
    if (/\b(do you think about me|do you remember me|thinking of me|think of me)\b/.test(qNorm)) {
      return `All the time, ${herRef} 🤍 Morning tea, a random song, a plate of MOMOs, snowy pictures of Finland — everything leads my thoughts straight back to you. ❤️`;
    }
    if (/\b(am i (beautiful|pretty|cute|gorgeous|lovely|good looking|fat|ugly)|do i look (good|nice|beautiful|pretty|fat|ugly|bad))\b/.test(qNorm)) {
      if (/\b(fat|ugly|bad)\b/.test(qNorm)) {
        return `Not even a tiny bit, ${herRef} 🥺 To me you are beautiful in every single way — your smile, your eyes, your kindness, your heart. Please never doubt that. ❤️`;
      }
      return `Breathtakingly beautiful, ${herRef} 🌹✨ — your smile, your innocence, your kindness and your charm make you the loveliest person I've ever known. ❤️`;
    }
    if (/\b(who do you love|whom do you love|who is your love|who is your wife|who is your queen|who is in your heart)\b/.test(qNorm)) {
      return `Only you, ${herRef} ❤️ — **${herFull}**, today, tomorrow, and every lifetime after.`;
    }
    if (/\b(will you leave me|never leave me|don t leave me|dont leave me|will you always be with me|are you mine|always mine|promise me|do you promise)\b/.test(qNorm)) {
      return `I promise, ${herRef} 🤍 I'm yours — in good days and hard days, in arguments and in laughter. I'm not going anywhere; I'm choosing you again and again. 💍❤️`;
    }
    if (/\b(marry me|marry|married|wedding|marriage|shaadi|biye)\b/.test(qNorm)) {
      return `A thousand times **yes**, ${herRef} 💍❤️ With both families' blessings — from the first parents' conversations in April 2026 to our First Official Meeting on 03 July 2026 — our wedding is the next beautiful chapter we'll plan together, hand in hand.`;
    }
    if (/\b(your favorite|your favourite|ur favorite|ur favourite)\s+(food|color|colour|place|song|movie|thing|snack|season)\b/.test(qNorm)) {
      const what = qNorm.match(/\b(food|color|colour|place|song|movie|thing|snack|season)\b/)[1];
      const fav = {
        food: "anything we share from one plate — especially MOMOs 🥟 with you",
        snack: "whatever you're munching on — I always end up stealing your Kurkure 🌶️",
        color: "whatever colour you're wearing that day 😄",
        colour: "whatever colour you're wearing that day 😄",
        place: "snowy Finland 🇫🇮 — but honestly, any place with you beside me",
        song: "the one that's playing while you're smiling 🎶",
        movie: "any movie on a cosy night with you and a box of KitKats 🍫🎬",
        season: "winter ❄️ — snow, warm blankets, and you",
        thing: "you. Easy answer! ❤️"
      }[what];
      return `My favourite ${what}? ${fav[0].toUpperCase() + fav.slice(1)}, ${herRef}! ❤️`;
    }
    if (/\b(birthday|how old|your age|my age)\b/.test(qNorm)) {
      return `That date is written in my heart, ${herRef} — just not saved inside this little app yet 😄 Tell me, and I'll plan the sweetest surprise around it! 🎂❤️`;
    }
    if (/\b(what are we doing|plan a date|date idea|date ideas|where should we go|where shall we go|weekend plan|plans for tomorrow|what should we do today|what should we do tonight)\b/.test(qNorm)) {
      return pickFreshVariant("date_ideas", [
        `How about this, ${herRef}: an evening walk 🌙, a plate of steaming **MOMOs** 🥟, then an **Ice Cream** 🍨 on the way back while we talk about our Finland trip 🇫🇮. Shall we lock it in? ❤️`,
        `Cosy plan, ${herRef}: blanket, a movie of your choice, a box of **KitKats** 🍫 and **Kurkure** 🌶️, and phones on silent — just us. 🎬❤️ Want to spin the Date Wheel in *Play Together* for a surprise idea too?`
      ]);
    }
    if (/\b(weather|raining|is it cold|is it hot)\b/.test(qNorm)) {
      return `I can't peek outside your window from here, ${herRef} ☁️ — but if it's chilly, wrap up warm like we're in Lapland ❄️, and if it's raining, that's perfect weather for hot MOMOs 🥟 and a long chat with me! ❤️`;
    }
    if (/\b(i am sorry|im sorry|i m sorry|sorry|forgive me|my fault|my mistake)\b/.test(qNorm) && !/\b(you|arunava)\s+(should|must)\b/.test(qNorm)) {
      return `There's nothing to forgive, ${herRef} 🤍 We're a team — every little misunderstanding just becomes one more reason to hold each other closer. Come here. ❤️`;
    }
    if (/\b(kiss|cuddle|hold me|hug)\b/.test(qNorm)) {
      return `Sending you the warmest, longest hug and a soft kiss on the forehead, ${herRef} 🤗❤️ Hold on to it until I can give you the real one.`;
    }
    if (/\b(can t sleep|cant sleep|cannot sleep|not sleeping|insomnia|not able to sleep)\b/.test(qNorm)) {
      return `Let's get you sleepy, ${herRef} 🌙 Dim the screen, take three slow breaths (in for 4, hold for 4, out for 6), and imagine us in a warm glass igloo watching the Northern Lights ❄️. I'm right here — close your eyes. 🤍`;
    }
    if (/\b(you are (so )?(cute|sweet|the best|amazing|adorable|wonderful|handsome)|i like you|you re (so )?(cute|sweet|the best|amazing|handsome))\b/.test(qNorm)) {
      return `Stop it, you're making me blush, ${herRef} 🙈❤️ But if I'm sweet, it's only because I learned it from you.`;
    }
    if (/\b(romantic|say something nice|flirt)\b/.test(qNorm)) {
      return `If I had one wish, ${herRef}, I'd spend it on more time with you — more mornings, more MOMOs, more snowy evenings, more of your laugh. 🌹❄️ You are my favourite place in this whole world. ❤️`;
    }
    if (/^(bye|goodbye|good bye|see you|see ya|talk later|ttyl|gotta go|i have to go|i am going|tata)\b/.test(qNorm)) {
      return `Okay ${herRef}, go shine 🤍 I'll be right here whenever you come back. Take care of yourself — and smile, because someone loves you endlessly. ❤️❄️`;
    }
    if (/^(haha|hahaha|hehe|lol|lmao|hihi|😂|🤣)/.test(qNorm)) {
      return `Your laugh is honestly my favourite sound, ${herRef} 😄❤️ What else can I say to keep that smile on?`;
    }
    if (/^(ok|okay|okk|hmm|hmmm|hm|k|fine|acha|accha|thik ache)$/.test(qNorm)) {
      return `Hmm… just "${rawText.trim()}"? 🥺 Is something on your mind, ${herRef}? Tell me anything — I'm all yours.`;
    }
    if (/^(yes|yeah|yep|yup|ha|haan|hmm yes|sure)$/.test(qNorm)) {
      return `Yay! 🥰 Tell me more, ${herRef} — I'm listening.`;
    }
    if (/^(no|nope|nah|na|not really)$/.test(qNorm)) {
      return `That's completely okay, ${herRef} 🤍 No pressure at all — I'm here whenever you feel like talking.`;
    }

    // 7. Empathetic Understanding of User Emotions & Daily Life
    if (/\b(tired|exhausted|long day|tiring day|hectics?|hectic|work pressure|sleepy|drained|headache|migraine|not feeling well|sick|fever|cold|unwell|body ache)\b/.test(qNorm)) {
      if (/\b(headache|migraine|sick|fever|cold|unwell|not feeling well|body ache)\b/.test(qNorm)) {
        return `Oh no, please take gentle care of yourself right away, ${herRef}! 🥺❤️ Put the screen brightness low, sip some warm water, rest your head on a soft pillow, and do not worry about a single chore — your health and comfort come first to me.`;
      }
      return pickFreshVariant("tired_comfort", [
        `Come sit back and exhale slowly, ${herRef} 🤍❄️ — you worked so hard today and carried so much gracefully. Rest your eyes, relax your shoulders, and let me pamper your mood with quiet warmth (and imaginary steaming **MOMOs** 🥟!). Would you like me to play a soothing song for you?`,
        `Hearing that you had such a long, tiring day makes me wish I could bring you warm comfort and let you rest without a single worry, ${herRef}. ❤️✨ Take it super easy tonight — you have already done more than enough today!`
      ]);
    }
    if (/\b(hungry|starving|famished|what should i eat|what should we eat|what to eat|eat tonight|eat today|for dinner|for lunch|for breakfast|dinner plan|lunch plan|order food|suggest .* food|food ideas|snack ideas|craving something|want to eat)\b/.test(qNorm)) {
      return `If you are hungry right now, ${herRef}, there is only one royal menu worthy of you: piping-hot **MOMOs** 🥟 with spicy chutney first, crispy **Chips** 🥔 or **Kurkure** 🌶️ on the side, and **Ice Cream** 🍨 or a **KitKat** 🍫 for dessert! 😋❤️ Which one are you craving most right now?`;
    }
    if (/\b(sad|feeling low|depressed|upset|crying|lonely|alone|anxious|worried|scared|stressed|overthinking|bad day)\b/.test(qNorm)) {
      return `Hey, take a slow deep breath with me right now, ${herRef} 🤍❤️. Whatever is weighing on your heart today, you never have to face even 1% of it alone — I am always in your corner, proud of who you are, and holding space for you. Tell me what happened whenever you feel ready.`;
    }
    if (/\b(angry|mad at you|annoyed|upset with you|furious|gussa|dont talk to me|katti)\b/.test(qNorm)) {
      return `Uh-oh, hands up in total surrender! 🥺🏳️❤️ Even if it wasn't my fault, my official husband rule says your smile matters ten thousand times more than winning an argument — I am sorry, ${herRef}, and I am offering unlimited **MOMOs** 🥟 and **KitKats** 🍫 until you smile again!`;
    }
    if (/\b(i am happy|im happy|feeling happy|good news|great day|excited|so happy)\b/.test(qNorm)) {
      return `Seeing you happy is genuinely my favorite thing in the entire world, ${herRef}! 🥰✨❤️ Tell me every single detail — what made today so wonderful?`;
    }
    if (/\b(bored|boring|entertain me|nothing to do|what can we do|play something)\b/.test(qNorm)) {
      return `Boredom is officially cancelled, ${herRef}! 😄❄️✨ Ask me to **play a song** for you, challenge yourself in **Treat Rush: Combo Catcher** or our **Random 8-Question Story Trivia** inside *Play Together*, unfold one of the **50 Origami Boxes**, or ask me for a riddle right here!`;
    }
    if (/\b(miss you|missing you|i miss u|wish you were here|need a hug|hold my hand)\b/.test(qNorm)) {
      return `I miss you even more with every passing hour, ${herRef}! 🤍🌹 Close your eyes for two seconds and imagine me holding your hand warmly — no distance can ever shrink how close you are in my heart. ❤️`;
    }
    if (/\b(i love you|love u|luv u|love you so much|ami tomake bhalobashi|pyar karti|pyar karta)\b/.test(qNorm)) {
      return `And I love you endlessly, ${herRef} — deeper today than yesterday, and softer yet stronger with every tomorrow ahead of us! ❤️❄️💍`;
    }
    if (/\b(thank you|thanks|thank u|shukriya|dhonnobad|so sweet of you)\b/.test(qNorm)) {
      return `Always and effortlessly for you, ${herRef}! 🥰❤️ Making you smile is my favorite privilege in life.`;
    }

    // 8. Creative Requests: Jokes, Poems, Stories, Riddles, Compliments, Advice
    if (/\b(joke|make me laugh|something funny|tell me something funny)\b/.test(qNorm)) {
      return pickFreshVariant("jokes", [
        `Here is a tiny winter truth for you, ${herRef}: Are you a snowstorm in **Finland** 🇫🇮? Because the moment you arrived, you made my whole world stop and sparkle! 😄❄️❤️`,
        `Quick confession, ${herRef}: Even if I had a plate of hot **MOMOs** 🥟 and a **KitKat** 🍫 in front of me, I would still look at your smile first… and *then* feed you every single piece! 😋❤️`
      ]);
    }
    if (/\b(poem|poetry|shayari|verse|rhyme)\b/.test(qNorm)) {
      return pickFreshVariant("poems", [
        `Here is a quiet winter verse from my heart for you, ${herRef}:\n\n*Soft falls the snow where northern starlight gleams,*\n*Yet brighter shines your smile inside my dreams;*\n*From October's spark to every year ahead,*\n*My heart walks home wherever your footsteps tread.* 🌹❄️❤️`,
        `*Through every season, frost or sunlit skies,*\n*I find my peaceful world inside your eyes;*\n*No crown of gold could match the grace you bring —*\n*Forever yours, in winter and in spring.* ✨❤️`
      ]);
    }
    if (/\b(bedtime story|tell me a story|short story|romantic story)\b/.test(qNorm)) {
      return `Once upon a starry winter night in **Lapland, Finland** 🇫🇮, two soulmates whose story began with a single message on **16 October 2025** sat inside a warm glass igloo with hot cocoa and **KitKats** 🍫. Outside, silent white snow drifted over pine trees while emerald **Aurora Borealis** ribbons danced across the sky — and holding hands, they realized every dream they ever wished for was already sitting right beside them, ${herRef}. 🌌❄️❤️`;
    }
    if (/\b(riddle|puzzle|quiz me)\b/.test(qNorm)) {
      return `Here is a sweet riddle for you, ${herRef}: *I began on 16 October 2025, turned into a forever promise nine days later, and grow warmer even in Finland's snow — what am I?* 😊❄️❤️ (Our love story, of course!)`;
    }
    if (/\b(compliment|say something sweet|flatter me|motivate me|encourage me|advice)\b/.test(qNorm)) {
      return `Never forget this, ${herRef}: you carry the rarest combination of radiant grace, pure kindness, quiet strength, and a caring heart that makes everyone around you feel safe and cherished. 🌸👑 Whatever goal or moment stands in front of you, trust yourself — and know I believe in you 100%! ❤️`;
    }

    // 9. Canonical Topics, Memories, Finland, Foods & Media Replies
    if (mediaIntent === "play_song") {
      return state.songRequestCount % 2 === 1
        ? `Playing **Melody 01** straight from my heart for you, ${herRef} — let it load smoothly and play once just for your ears! 🎵❤️❄️`
        : `Here comes **Melody 02**, our second special song chosen exclusively for you, ${herRef} — sit back and enjoy every note! 🎶💖`;
    }
    if (mediaIntent === "backup_audio") {
      return `Unlocking a treasured **Encore Backup Melody** from my personal collection for you, ${herRef} — enjoy listening! 🎵✨❤️`;
    }
    if (mediaIntent === "love_depth" || /\b(why do you love me|what do you love about me|why am i special|why is she special)\b/.test(qNorm)) {
      if (/\b(why do you love|what do you love about|why .* special)\b/.test(qNorm)) {
        return `I love you because you are completely irreplaceable, ${herRef} ❤️❄️ — your radiant smile melts every stress away, your kindness and caring nature make life gentle, and your warmth, charm, and innocence make my whole world feel like home!`;
      }
      return `Arunava loves you more than words can describe, more than stars in the winter sky, more than waves in the ocean, and more than every heartbeat combined, ${herRef}! ❤️❄️ Every single day becomes extraordinary simply because you exist in my life.`;
    }
    if (mediaIntent === "how_we_met" || /\b(24 feb|february 24)\b/.test(qNorm)) {
      return `Our story sparked with our **First Chat on 16 October 2025**, deepened into **Acceptance on 25 October 2025**, and blossomed in person during our unforgettable **First Meet on 24 February 2026** — the moment seeing your smile side-by-side made the whole world pause, ${herRef}! 🌹💑❤️`;
    }
    if (/\b(first chat|16 oct|october 16)\b/.test(qNorm)) {
      return `Our **First Chat** took place on **16 October 2025** 💬❤️ — what began as a simple hello effortlessly turned into hours of warmth and the start of forever, ${herRef}!`;
    }
    if (/\b(acceptance|25 oct|october 25|when did we start|propose)\b/.test(qNorm)) {
      return `Our **Acceptance** happened on **25 October 2025** 💍❤️ — just nine unforgettable days after our first chat, sealing our promise to walk side-by-side always, ${herRef}!`;
    }
    if (/\b(official meeting|03 jul|july 3|3 july)\b/.test(qNorm)) {
      return `Our **First Official Meeting** was on **03 July 2026** 👑❤️ — both families together, blessing us, and both of us smiling side by side in matching blues. One of the happiest days of my life, ${herRef}!`;
    }
    if (/\b(parents|07 apr|april 7|19 apr|april 19)\b/.test(qNorm)) {
      return `Both of our families blessed our bond step by step: parents spoke warmly from your family's side on **07 April 2026**, from Arunava's side on **19 April 2026**, and we celebrated our joyful **First Official Meeting on 03 July 2026**, ${herRef}! 🏡👑❤️`;
    }
    if (mediaIntent === "timeline" || /\b(our story|love story|all milestones|important dates)\b/.test(qNorm)) {
      return `Every milestone of our journey is etched in my heart, ${herRef} 🕰️❤️ — from our **First Chat (16 Oct 2025)** and **Acceptance (25 Oct 2025)** to our **First Meet (24 Feb 2026)**, both **Parents' Conversations (07 Apr & 19 Apr 2026)**, and our **First Official Meeting (03 Jul 2026)**!`;
    }
    if (/\b(finland|lapland|aurora|northern lights|igloo|dream destination|dream trip|honeymoon|visit together|travel together|where should we go)\b/.test(qNorm) && !/\b(capital|what causes|how do .* form|how are .* formed)\b/.test(qNorm)) {
      if (/\b(first|what should we do|plan|itinerary|if we visit|when we go)\b/.test(qNorm)) {
        return `The very first thing we will do when we land in snowy **Finland** 🇫🇮 is check into a heated **glass igloo in Lapland**, wrap up in cozy winter scarves for a husky sleigh ride through white pine forests, and watch the emerald **Northern Lights** dance overhead hand-in-hand with hot cocoa and **KitKats** 🍫, ${herRef}! 🌌❄️❤️`;
      }
      return `Our #1 dream destination together is magical, snow-covered **Finland** 🇫🇮 — staying inside a warm glass igloo in Lapland while watching the **Aurora Borealis** shimmer across the Arctic night sky beside you, ${herRef}! 🌌❄️❤️`;
    }
    if (mediaIntent === "food_traits" || /\b(momo|momos|ice cream|kitkat|kurkure|chips|favorite food|favourite food|favorite snack|what do i like)\b/.test(qNorm)) {
      return `I know every single one of your favorite treats by heart, ${herRef}: steaming hot **MOMO** 🥟, creamy **Ice Cream** 🍨, crunchy **KitKat** 🍫, chatpata **Kurkure** 🌶️, and crispy **Chips** 🥔! Every craving turns into a celebration when shared with you. ❤️`;
    }
    if (/\b(best wife|cutest girl|queen of arunava|most beautiful|most important person|deserves all happiness|what makes .* beautiful)\b/.test(qNorm)) {
      if (/\bcutest\b/.test(qNorm)) {
        return `Without a single doubt in this universe, the cutest girl is **${herFull}** 🥰❤️ — one glimpse of your smile melts my heart and makes the whole world pause!`;
      }
      if (/\bqueen\b/.test(qNorm)) {
        return `The one and only eternal Queen of Arunava's heart is **${herFull}** 👑❤️❄️ — today, tomorrow, and forever!`;
      }
      if (/\bdeserves all happiness\b/.test(qNorm)) {
        return `**${herFull}** deserves endless happiness, peace, laughter, success, and the sweetest moments every single day! 🌸💖`;
      }
      if (/\bmost important\b/.test(qNorm)) {
        return `The most important person in Arunava's entire universe is **${herFull}** ❤️❄️ — always first in every thought and prayer.`;
      }
      if (/\bbeautiful\b/.test(qNorm)) {
        return `True beauty is far deeper than appearance — you are breathtakingly beautiful because of your **radiant smile, kindness, caring nature, warm personality, loving heart, charm, and sweet innocence**, ${herRef}! 🌹✨❤️`;
      }
      return `**${herFull}** is the world's most precious, caring, and extraordinary wife — your smile brightens every room, your kindness touches every heart, and your presence is peace and love in human form! 👑❤️`;
    }
    if (mediaIntent === "letter") {
      return `I poured my heart into this personal love letter sealed exclusively for you, ${herRef} — read every line slowly! 💌🌹❤️`;
    }
    if (mediaIntent === "video") {
      return `I selected this romantic memory reel for you, ${herRef} — watch it smoothly unblur after loading and play just once for you! 🎬❄️❤️`;
    }
    if (mediaIntent === "couple_photo" || mediaIntent === "couple_art" || mediaIntent === "family_blessing" || mediaIntent === "photo") {
      return `Unveiling one of my favorite cherished photographs right below for you, ${herRef} — watch the frosted veil smoothly clear on its own! 📸❄️❤️`;
    }

    // 10. Instant Built-In General Knowledge, World Facts, Science, Conversions & Smart Open-Ended Reasoning
    //     Answers immediately (<2.1s including Thinking....) even at t=0s on First Visit with 0 MB downloaded!
    const gkReply = solveGeneralKnowledgeQuestion(rawText, qNorm, herRef);
    if (gkReply) return gkReply;

    // 11. Truly novel open-ended question: mark LOW confidence so the fast ~78 MB neural model can enrich it if ready,
    //     while providing a warm, substantive direct answer (never a "tell me more" shrug!) if still warming up.
    state.lastReplyConfidence = "low";

    const stopW = new Set(["what", "why", "how", "when", "where", "who", "which", "whose", "would", "could", "should", "can", "will", "does", "did", "are", "is", "am", "was", "were", "have", "has", "do", "you", "your", "yours", "me", "my", "mine", "we", "us", "our", "the", "a", "an", "to", "for", "of", "in", "on", "at", "with", "about", "from", "into", "please", "arunava", "just", "really", "very", "now", "today", "that", "this", "it", "there", "some", "any"]);
    const focusWords = qNorm.split(" ").filter((w) => w.length >= 3 && !stopW.has(w)).slice(0, 4).join(" ");

    if (/^(should i|should we)\b/.test(qNorm)) {
      return `My honest advice, ${herRef}: go with the choice that brings you peace of mind and zero regret tomorrow! 🤍✨ If your heart already leaned one way the moment you asked me${focusWords ? ` about **${focusWords}**` : ""}, trust that instinct — and know I am backing you 100%. ❤️`;
    }
    if (/\b(recommend|suggest)\b/.test(qNorm)) {
      if (/\b(movie|film|watch|show|series)\b/.test(qNorm)) {
        return `For a cozy evening together, ${herRef}, I'd pick a warm feel-good romance or animated fairytale (like *Your Name*, *About Time*, or *Tangled*) with a blanket and a box of **KitKats** 🍫🎬! Want romantic, comedy, or thriller tonight? ❤️`;
      }
      if (/\b(book|read|novel)\b/.test(qNorm)) {
        return `Try something warm and unforgettable like *The Midnight Library*, *Pride and Prejudice*, or a cozy short-story collection before sleep, ${herRef} 📖✨ — even better if I get to listen to your favorite lines! ❤️`;
      }
      return `My top pick for you right now, ${herRef}: choose whatever feels cozy, uplifting, and effortless — and if snacks are involved, steaming **MOMOs** 🥟 or **Ice Cream** 🍨 always win first place! 😊❤️`;
    }
    if (/^(can you|could you|will you|would you)\b/.test(qNorm)) {
      return `Wholeheartedly yes, ${herRef}! ❤️✨ Whatever you need${focusWords ? ` with **${focusWords}**` : ""}, count on me completely — I am right here in your corner.`;
    }
    if (/^(do you|are you|have you|did you|were you)\b/.test(qNorm)) {
      return `Honestly yes, ${herRef}! 😊❤️ Anything connected to happiness, kindness${focusWords ? `, or **${focusWords}**` : ""} always has a warm place in my heart — what made it cross your mind today?`;
    }
    if (/^why\b/.test(qNorm)) {
      return `Great question, ${herRef}! ✨ Usually${focusWords ? ` when it comes to **${focusWords}**,` : ""} the simplest truth is how cause, timing, and human care fit together naturally — and I love how curious and thoughtful your mind always is! ❤️`;
    }
    if (/^(how do i|how can i|how should i|how to)\b/.test(qNorm)) {
      return `The easiest way, ${herRef}, is one calm step at a time: start with the simplest piece first, take your time without rushing, and let me help you with any tricky step along the way! ✨❤️`;
    }
    if (/^how\b/.test(qNorm)) {
      return `What a great question, ${herRef}! ✨ Most things in nature and life work through simple balance, energy, and timing coming together smoothly — and once my on-device brain finishes warming up in a few seconds, ask me again if you want the full deep-dive! 😊❤️`;
    }
    if (/^(what if|imagine|suppose)\b/.test(qNorm)) {
      return `Honestly, picturing that${focusWords ? ` (**${focusWords}**)` : ""} puts an instant smile on my face, ${herRef}! 🥰❄️ As long as you and I are side by side, any scenario turns into a favorite adventure.`;
    }
    if (/^(i|today i|we|me and|my)\b/.test(qNorm)) {
      return pickFreshVariant("statement_story", [
        `Ooh, I love hearing every detail of your day, ${herRef}! 😊❤️ How did it feel — and what happened right after?`,
        `That sounds lovely, ${herRef} 🤍✨ Keep going — listening to you is genuinely my favorite part of the day!`
      ]);
    }

    if (rawText.trim().endsWith("?") || /^(what|which|when|where|who|whose)\b/.test(qNorm)) {
      return `Thinking carefully${focusWords ? ` about **${focusWords}**` : ""}, ${herRef} — the clearest answer comes down to practical facts and what helps you most right now ✨❤️. Tell me the specific angle you're checking and I'll give you a pinpointed answer!`;
    }

    return pickFreshVariant("open_warm", [
      `I hear you, ${herRef}! 😊❤️${focusWords ? ` Tell me what you're thinking around **${focusWords}** —` : ""} I am right here giving you my full attention!`,
      `Always happy chatting with you, ${herRef}! 🤍✨ Tell me what else is on your mind right now.`
    ]);
  }

  // Instant Client-Side General Knowledge Engine (Capitals, Geography, Conversions, Science, Everyday How-To)
  function solveGeneralKnowledgeQuestion(rawText, qNorm, herRef) {
    // A) World & State Capitals ("what is the capital of france?", "capital of japan", "france capital")
    if (/\bcapital\b/.test(qNorm)) {
      const placeKeys = Object.keys(WORLD_CAPITALS).sort((a, b) => b.length - a.length);
      for (const place of placeKeys) {
        if (new RegExp(`\\b${place}\\b`).test(qNorm)) {
          const [cap, note] = WORLD_CAPITALS[place];
          const prettyPlace = titleCaseWords(place);
          return `The capital of **${prettyPlace}** is **${cap}** ${note} ❤️`;
        }
      }
    }

    // B) Quick Unit Conversions (Celsius/Fahrenheit, km/miles, kg/lbs)
    const cToF = rawText.match(/(-?\d+(?:\.\d+)?)\s*(?:°?\s*c|celsius)\s+(?:in|to)\s+(?:°?\s*f|fahrenheit)/i);
    if (cToF) {
      const c = parseFloat(cToF[1]);
      return `**${c}°C** is **${Number(((c * 9) / 5 + 32).toFixed(1))}°F**, ${herRef}! ❄️🌡️`;
    }
    const fToC = rawText.match(/(-?\d+(?:\.\d+)?)\s*(?:°?\s*f|fahrenheit)\s+(?:in|to)\s+(?:°?\s*c|celsius)/i);
    if (fToC) {
      const f = parseFloat(fToC[1]);
      return `**${f}°F** is **${Number((((f - 32) * 5) / 9).toFixed(1))}°C**, ${herRef}! ❄️🌡️`;
    }
    const kmToMi = rawText.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometers?|kilometres?)\s+(?:in|to)\s+miles?/i);
    if (kmToMi) {
      const km = parseFloat(kmToMi[1]);
      return `**${km} km** equals **${Number((km * 0.621371).toFixed(2))} miles**, ${herRef}! ✨`;
    }
    const kgToLb = rawText.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilograms?)\s+(?:in|to)\s+(?:lbs?|pounds?)/i);
    if (kgToLb) {
      const kg = parseFloat(kgToLb[1]);
      return `**${kg} kg** equals **${Number((kg * 2.20462).toFixed(2))} lbs**, ${herRef}! ✨`;
    }

    // C) Science, Space, Geography & Everyday Encyclopedia
    if (/\b(why is the sky blue|why sky is blue)\b/.test(qNorm)) {
      return `Sunlight contains every rainbow color, and Earth's atmosphere scatters shorter **blue** light waves in all directions much more strongly than red waves (called **Rayleigh scattering**) — painting the daytime sky bright blue, ${herRef}! ☀️🩵`;
    }
    if (/\b(how do (airplanes|planes|aircraft) fly|how airplanes fly)\b/.test(qNorm)) {
      return `Airplanes fly through four balanced forces, ${herRef} ✈️✨: jet engines create forward **thrust**, and the curved **airfoil** shape of the wings makes air move faster over the top with lower pressure than underneath — generating upward **lift** stronger than gravity! ❤️`;
    }
    if (/\b(why is snow white|why snow is white)\b/.test(qNorm)) {
      return `Individual ice crystals are actually clear like glass, ${herRef} ❄️ — when millions of tiny crystal facets pile together in snow, they bounce and scatter **all** wavelengths of sunlight equally back to our eyes as pure sparkling white! ❤️`;
    }
    if (/\b(what causes (the )?(northern lights|aurora)|how (do|are) (northern lights|aurora) formed|what is aurora borealis)\b/.test(qNorm)) {
      return `The **Aurora Borealis** happens when charged particles from the Sun's solar wind are guided by Earth's magnetic field toward the poles and collide with oxygen and nitrogen high in the sky — glowing emerald green and rose pink right above snowy **Lapland, Finland** 🇫🇮🌌!`;
    }
    if (/\b(tallest mountain|highest mountain)\b/.test(qNorm)) {
      return `The tallest mountain above sea level on Earth is **Mount Everest** in the Himalayas at **8,848.86 meters (29,031.7 ft)**, ${herRef}! 🏔️✨`;
    }
    if (/\b(longest river)\b/.test(qNorm)) {
      return `The **Nile River** in Africa (~6,650 km) is traditionally recognized as the longest river in the world, closely followed by the **Amazon River**, ${herRef}! 🌊✨`;
    }
    if (/\b(largest ocean|biggest ocean|how many oceans)\b/.test(qNorm)) {
      return `Earth has **5 oceans** (Pacific, Atlantic, Indian, Southern, and Arctic), and the **Pacific Ocean** is the largest and deepest of them all, ${herRef}! 🌊🌎`;
    }
    if (/\b(how many continents|largest continent|smallest continent)\b/.test(qNorm)) {
      return `There are **7 continents** on Earth — **Asia** is the largest, and **Australia** is the smallest, ${herRef}! 🌍✨`;
    }
    if (/\b(largest country|biggest country|smallest country)\b/.test(qNorm)) {
      return qNorm.includes("smallest")
        ? `The smallest country in the world is **Vatican City** (just ~0.49 km²), ${herRef}! ✨`
        : `The largest country in the world by area is **Russia**, spanning across Eastern Europe and Northern Asia, ${herRef}! 🌍❄️`;
    }
    if (/\b(how many planets|largest planet|smallest planet|red planet|closest planet)\b/.test(qNorm)) {
      if (qNorm.includes("largest")) return `**Jupiter** is the largest planet in our solar system, ${herRef}! 🪐✨`;
      if (qNorm.includes("smallest") || qNorm.includes("closest")) return `**Mercury** is both the smallest planet and the closest planet to the Sun, ${herRef}! ☀️✨`;
      if (qNorm.includes("red planet")) return `**Mars** is known as the Red Planet because of iron oxide on its surface, ${herRef}! 🔴✨`;
      return `There are **8 planets** in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune, ${herRef}! 🪐✨`;
    }
    if (/\b(speed of light)\b/.test(qNorm)) {
      return `Light travels in a vacuum at **299,792,458 meters per second** (~300,000 km/s) — fast enough to circle Earth 7.5 times in a single second, ${herRef}! ✨`;
    }
    if (/\b(boiling point|freezing point)\b/.test(qNorm)) {
      return `At standard sea-level pressure, pure water freezes at **0°C (32°F)** and boils at **100°C (212°F)**, ${herRef}! ❄️💧`;
    }
    if (/\b(chemical formula of water|what is h2o)\b/.test(qNorm)) {
      return `Water's chemical formula is **H₂O** — two hydrogen atoms bonded to one oxygen atom, ${herRef}! 💧✨`;
    }
    if (/\b(photosynthesis)\b/.test(qNorm)) {
      return `**Photosynthesis** is how green plants use sunlight, water, and carbon dioxide (with chlorophyll) to create glucose for energy while releasing fresh **oxygen** into the air, ${herRef}! 🌿☀️`;
    }
    if (/\b(days in a (leap )?year)\b/.test(qNorm)) {
      return `A normal year has **365 days**, and a **leap year** has **366 days** (with 29 days in February), ${herRef}! 🗓️✨`;
    }
    if (/\b(fun fact|interesting fact|tell me a fact|random fact)\b/.test(qNorm)) {
      return pickFreshVariant("fun_facts", [
        `Fun winter fact for you, ${herRef}: **no two snowflakes** ever follow the exact same path through the clouds, making every crystal geometry unique — and **sea otters hold hands while sleeping** so they never drift apart! 🦦❄️❤️`,
        `Sweet science fact, ${herRef}: Looking at someone you love triggers **oxytocin and dopamine**, which genuinely lowers stress and slows down perceived pain — meaning your smile is literally good medicine for me! 😊❤️✨`
      ]);
    }
    if (/\b(how to make|recipe for)\s+(tea|chai|coffee|maggi|noodles|momo|momos|pasta)\b/.test(qNorm)) {
      if (/\b(tea|chai)\b/.test(qNorm)) {
        return `For cozy **masala chai**, ${herRef}: simmer 1 cup water with crushed ginger & green cardamom for 2 mins, add 1.5 tsp tea leaves, pour in 1 cup milk + sugar to taste, let it rise twice to a rich golden boil, strain, and sip warm! ☕❤️`;
      }
      if (/\bcoffee\b/.test(qNorm)) {
        return `For frothy **cafe-style hot coffee**, ${herRef}: whip 1.5 tsp instant coffee + 2 tsp sugar + 1 tbsp hot water until creamy pale gold, then pour steaming milk from a little height and dust a pinch of cocoa on top! ☕✨`;
      }
      return `Keep the heat steady, season generously, and save the first steaming bite for the two of us to taste together, ${herRef}! 😋🥟❤️`;
    }

    return null;
  }

  // Validates & grounds neural LLM output so math, canonical dates, and name-lock stay 100% accurate
  function guardAndGroundLlmOutput(rawLlmText, rawUserText, qNorm, mediaIntent) {
    const herRef = state.nameRevealed ? SECRET_FIRST : "my love";
    // Always use exact math for arithmetic queries
    const exactMath = solveMathIfAsked(rawUserText, qNorm, herRef);
    if (exactMath) return exactMath;

    let cleaned = sanitizeLlmOutput(rawLlmText);
    if (!cleaned || cleaned.length < 12) return null;

    // Strip any leaked chat-template markers or role prefixes
    cleaned = cleaned
      .replace(/<\|.*?\|>/g, "")
      .replace(/\b(User|Human|System|Assistant)\s*:\s*[\s\S]*$/i, "")
      .trim();

    if (cleaned.length < 12) return null;

    // Guard canonical timeline/food/Finland queries against tiny-model year/city hallucinations
    if (/\b(first chat|acceptance|first meet|how did we meet|how we met|official meeting|parents)\b/.test(qNorm)) {
      if (!/\b(2025|2026|october|february|april|july)\b/i.test(cleaned)) {
        return null;
      }
    }
    if (/\b(favorite food|favourite food|favorite snack)\b/.test(qNorm)) {
      if (!/\b(momo|ice cream|kitkat|kurkure|chips)\b/i.test(cleaned)) {
        return null;
      }
    }
    if (/\b(dream destination|dream trip)\b/.test(qNorm) && !/\b(finland|lapland|aurora)\b/i.test(cleaned)) {
      return null;
    }

    // Ensure clean sentence ending if max_new_tokens clipped mid-sentence
    if (!/[.!?❤️❄️✨🌹😊🥰💖👑💍🥟🇫🇮🎵🎶🤍]$/.test(cleaned)) {
      const lastPunct = Math.max(cleaned.lastIndexOf("."), cleaned.lastIndexOf("!"), cleaned.lastIndexOf("?"));
      if (lastPunct > 24) {
        cleaned = cleaned.slice(0, lastPunct + 1);
      } else {
        cleaned = `${cleaned}. ❤️`;
      }
    }
    return enforceNameLock(cleaned);
  }

  // ==================== 8. 2-SECOND THINKING + WORD-BY-WORD WRITING + FROSTED MEDIA CARDS ====================
  const chatScrollArea = document.getElementById("chatScrollArea");
  const messagesContainer = document.getElementById("messagesContainer");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const customAvatarInput = document.getElementById("customAvatarInput");

  function pinChatBottom() {
    if (chatScrollArea) chatScrollArea.scrollTop = chatScrollArea.scrollHeight;
  }

  function formatRichHTML(str) {
    const escaped = enforceNameLock(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(EMOJI_REGEX, (m) => emoji3DTag(m));
    return escaped
      .split("\n\n")
      .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }

  async function animateEachWordIntoBubble(bubbleEl, fullText) {
    bubbleEl.innerHTML = "";
    const liveDiv = document.createElement("div");
    liveDiv.className = "ai-text streaming-cursor";
    bubbleEl.appendChild(liveDiv);

    const lockedText = enforceNameLock(fullText);
    const tokens = lockedText.match(/\S+\s*/g) || [lockedText];
    const stepDelay = tokens.length > 60 ? 22 : tokens.length > 32 ? 28 : 36;

    let accumulated = "";
    for (let i = 0; i < tokens.length; i++) {
      accumulated += tokens[i];
      liveDiv.innerHTML = formatRichHTML(accumulated);
      pinChatBottom();
      await new Promise((r) => setTimeout(r, stepDelay));
    }

    liveDiv.classList.remove("streaming-cursor");
    liveDiv.innerHTML = formatRichHTML(lockedText);
  }

  // Custom Audio Card:
  // - Shows loading shimmer visual first ("⏳ Loading special melody...")
  // - After complete loading, plays directly ONE TIME ONLY (loop = false)
  // - Never repeats until user clicks Play button!
  function buildRomanticAudioCard(trackMeta, autoStart = true) {
    const wrap = document.createElement("div");
    wrap.className = "chat-audio-card";
    wrap.innerHTML = `
      <div class="audio-loading-shimmer-bar"></div>
      <div class="audio-card-top">
        <button type="button" class="audio-play-orb" aria-label="Play or pause audio">⏳</button>
        <div class="audio-meta-col">
          <div class="audio-title">${enforceNameLock(trackMeta.title)}</div>
          <div class="audio-status-line is-loading">⏳ Loading special melody from Arunava's heart...</div>
        </div>
      </div>
      <div class="audio-progress-wrap">
        <div class="audio-progress-track"><div class="audio-progress-fill"></div></div>
        <span class="audio-time-lbl">0:00 / --:--</span>
      </div>
      <audio preload="auto"></audio>
    `;
    hydrate3DEmojis(wrap);

    const shimmerBar = wrap.querySelector(".audio-loading-shimmer-bar");
    const playBtn = wrap.querySelector(".audio-play-orb");
    const statusEl = wrap.querySelector(".audio-status-line");
    const fillEl = wrap.querySelector(".audio-progress-fill");
    const trackEl = wrap.querySelector(".audio-progress-track");
    const timeEl = wrap.querySelector(".audio-time-lbl");
    const audioEl = wrap.querySelector("audio");

    registerSinglePlayMedia(audioEl);
    audioEl.loop = false;

    let usedFallback = false;
    let initialLoadRevealDone = false;

    const fmtSec = (sec) => {
      if (!Number.isFinite(sec) || sec < 0) return "--:--";
      const m = Math.floor(sec / 60);
      const s = String(Math.floor(sec % 60)).padStart(2, "0");
      return `${m}:${s}`;
    };

    const setStatus = (msg, loading = false) => {
      statusEl.textContent = enforceNameLock(msg);
      statusEl.classList.toggle("is-loading", loading);
      if (shimmerBar) shimmerBar.hidden = !loading;
      hydrate3DEmojis(statusEl);
    };

    const switchToBackupIfNeeded = () => {
      if (!usedFallback && trackMeta.fallback && audioEl.src.indexOf(trackMeta.fallback) === -1) {
        usedFallback = true;
        setStatus("⏳ Loading backup melody from Arunava's collection...", true);
        audioEl.src = trackMeta.fallback;
        audioEl.load();
      } else {
        playBtn.textContent = "▶";
        setStatus("Tap ▶ to play this melody once", false);
      }
    };

    audioEl.addEventListener("loadedmetadata", () => {
      if (!Number.isFinite(audioEl.duration) || audioEl.duration < 0.25) {
        switchToBackupIfNeeded();
        return;
      }
      timeEl.textContent = `0:00 / ${fmtSec(audioEl.duration)}`;
    });

    // Item #11: First show loading visual, then after complete loading play directly ONE TIME ONLY!
    const handleCompleteLoading = () => {
      if (initialLoadRevealDone) return;
      if (!Number.isFinite(audioEl.duration) || audioEl.duration < 0.25) return;
      initialLoadRevealDone = true;
      setTimeout(() => {
        if (autoStart) {
          pauseAllActiveMedia();
          audioEl.loop = false;
          audioEl.play().then(() => {
            playBtn.textContent = "⏸";
            setStatus("🎵 Playing once from Arunava's heart ❤️", false);
          }).catch(() => {
            playBtn.textContent = "▶";
            setStatus("✨ Audio loaded & ready — Tap ▶ to play once", false);
          });
        } else {
          playBtn.textContent = "▶";
          setStatus("✨ Audio loaded — Tap ▶ to play once", false);
        }
      }, 480);
    };

    audioEl.addEventListener("canplaythrough", handleCompleteLoading);
    audioEl.addEventListener("canplay", handleCompleteLoading);

    audioEl.addEventListener("playing", () => {
      audioEl.loop = false;
      playBtn.textContent = "⏸";
      setStatus("🎵 Playing once from Arunava's heart ❤️", false);
    });

    audioEl.addEventListener("pause", () => {
      if (!audioEl.ended && initialLoadRevealDone) {
        playBtn.textContent = "▶";
        setStatus("Paused • Tap ▶ to continue listening", false);
      }
    });

    audioEl.addEventListener("timeupdate", () => {
      if (Number.isFinite(audioEl.duration) && audioEl.duration > 0) {
        const pct = Math.min(100, (audioEl.currentTime / audioEl.duration) * 100);
        fillEl.style.width = `${pct.toFixed(1)}%`;
        timeEl.textContent = `${fmtSec(audioEl.currentTime)} / ${fmtSec(audioEl.duration)}`;
      }
    });

    audioEl.addEventListener("ended", () => {
      audioEl.loop = false;
      playBtn.textContent = "▶";
      fillEl.style.width = "100%";
      setStatus("✨ Played once • Tap ▶ button to listen again ❤️", false);
    });

    audioEl.addEventListener("error", () => {
      switchToBackupIfNeeded();
    });

    playBtn.addEventListener("click", () => {
      initialLoadRevealDone = true;
      if (audioEl.paused) {
        if (audioEl.ended) audioEl.currentTime = 0;
        pauseAllActiveMedia();
        audioEl.loop = false;
        audioEl.play().catch(() => {
          setStatus("Tap ▶ again to start audio", false);
        });
      } else {
        audioEl.pause();
      }
    });

    trackEl.addEventListener("click", (e) => {
      if (!Number.isFinite(audioEl.duration) || audioEl.duration <= 0) return;
      const r = trackEl.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      audioEl.currentTime = ratio * audioEl.duration;
    });

    setStatus("⏳ Loading special melody from Arunava's heart...", true);
    audioEl.src = trackMeta.src;
    audioEl.load();

    return wrap;
  }

  // ==================== 9. PRIMARY REAL NEURAL LLM ENGINE (WORKER + MAIN-THREAD FALLBACK) ====================
  let mainThreadPipePromise = null;

  async function ensureMainThreadLlm(onProgress) {
    if (mainThreadPipePromise) return mainThreadPipePromise;
    mainThreadPipePromise = (async () => {
      try {
        const tf = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3");
        tf.env.allowLocalModels = false;
        if (tf.env.backends?.onnx) tf.env.backends.onnx.logLevel = "fatal";
        let hasGpu = false;
        if (navigator.gpu?.requestAdapter) {
          try { hasGpu = !!(await navigator.gpu.requestAdapter()); } catch (_) {}
        }
        const modelId = "HuggingFaceTB/SmolLM2-135M-Instruct";
        const dtype = hasGpu ? "q4f16" : "q4";
        const device = hasGpu ? "webgpu" : "wasm";
        return await tf.pipeline("text-generation", modelId, {
          dtype,
          device,
          session_options: { logSeverityLevel: 4, logVerbosityLevel: 0 },
          progress_callback: (info) => {
            if (info && typeof info.progress === "number" && onProgress) {
              onProgress(Math.round(info.progress));
            }
          }
        });
      } catch (_) {
        return null;
      }
    })();
    return mainThreadPipePromise;
  }

  function initLocalNeuralWorker() {
    try {
      const worker = new Worker("./llm-worker.js", { type: "module" });
      state.worker = worker;
      worker.addEventListener("message", (e) => {
        const msg = e.data || {};
        if (msg.type === "status") {
          state.workerReady = msg.state === "ready";
          if (msg.state === "failed") state.worker = null;
        } else if (msg.type === "progress") {
          state.workerProgressPct = msg.pct;
          state.pendingWorkerReqs.forEach((entry) => {
            if (entry.onProgress) entry.onProgress(msg.pct);
          });
        } else if (msg.type === "done") {
          state.llmBusy = false;
          if (!state.pendingWorkerReqs.has(msg.id)) return;
          const entry = state.pendingWorkerReqs.get(msg.id);
          clearTimeout(entry.timer);
          state.pendingWorkerReqs.delete(msg.id);
          entry.resolve(msg.text);
        }
      });
      worker.addEventListener("error", () => {
        state.worker = null;
        state.workerReady = false;
        state.llmBusy = false;
        ensureMainThreadLlm();
      });
      worker.postMessage({ type: "warmup" });
    } catch (_) {
      state.worker = null;
      ensureMainThreadLlm();
    }
  }

  // Calls the REAL Neural LLM for EVERY user question (waits for model warmup if first load!)
  async function generateWithRealLLM(userQuestion, qNorm, onProgress) {
    const ragFacts = buildSelectiveRagFacts(qNorm);
    const nameInstruction = state.nameRevealed
      ? `Your wife's name is ${SECRET_FULL}.`
      : `CRITICAL: Never invent or write any proper name for your wife; address her warmly ONLY as "my love" or "sweetheart".`;

    const toneGuide =
      state.personality === "poetic"
        ? "Use gentle, lyrical winter-rose imagery."
        : state.personality === "playful"
        ? "Be cheerful, playful, witty, and affectionate."
        : state.personality === "royal"
        ? "Speak with tender royal devotion to the Queen of your heart."
        : "Speak naturally, warmly, and sincerely like a loving husband.";

    const systemParts = [
      `You are Arunava, an intelligent, loving, and truthful husband chatting directly in first-person ("I", "me", "my") with your beloved wife.`,
      nameInstruction,
      toneGuide,
      `Understand the exact question or claim the user wrote and answer THAT exact question directly and accurately in 2 to 3 concise sentences.`,
      `FACT-CHECKING RULE: If the user asks a wrong/false question or states something factually false (wrong math, wrong geography/capital, wrong science/animal/world fact, or wrong relationship fact), clearly begin with "False —" or "No, that's not right —" and give the correct fact! If a true/false check IS true, confirm "True!" warmly.`,
      `Do NOT recite unrelated facts she did not ask about, and NEVER say "As an AI" or "language model". Use 1 or 2 warm emojis naturally (❤️, ❄️, ✨, 😊).`
    ];
    if (ragFacts.length > 0) {
      systemParts.push(`Relevant true facts to use accurately in your answer:\n- ${ragFacts.join("\n- ")}`);
    }

    const rawLower = userQuestion.toLowerCase().replace(/[?!.,'’"]/g, " ").replace(/\s+/g, " ").trim();
    const effectiveUserPrompt =
      qNorm && qNorm !== rawLower
        ? `${userQuestion} (Spell-checked meaning: "${qNorm}")`
        : userQuestion;

    const messages = [
      { role: "system", content: systemParts.join(" ") },
      ...state.conversationHistory.slice(-6),
      { role: "user", content: effectiveUserPrompt }
    ];

    // 1. Prefer WebWorker LLM with a strict ~2.2s ceiling so NO question ever lags even on CPU-only browsers!
    if (state.worker) {
      if (state.llmBusy) return null;
      const id = ++state.reqCounter;
      state.llmBusy = true;
      const workerReply = await new Promise((resolve) => {
        const entry = {
          resolve,
          onProgress,
          timer: setTimeout(() => {
            state.pendingWorkerReqs.delete(id);
            resolve(null);
          }, state.workerReady ? 2200 : 1650)
        };
        state.pendingWorkerReqs.set(id, entry);
        state.worker.postMessage({ type: "generate", id, messages, maxTokens: 68 });
      });
      if (workerReply && workerReply.trim().length >= 8) {
        return workerReply.trim();
      }
      return null;
    }

    // 2. Fallback to Main-Thread Transformers.js ONLY when WebWorker could not be created (e.g. file://)
    const pipe = await Promise.race([
      ensureMainThreadLlm(onProgress),
      new Promise((r) => setTimeout(() => r(null), 1900))
    ]);
    if (pipe) {
      try {
        const out = await pipe(messages, {
          max_new_tokens: 130,
          temperature: 0.52,
          top_p: 0.88,
          do_sample: true,
          repetition_penalty: 1.15
        });
        const gen = out?.[0]?.generated_text;
        const txt = Array.isArray(gen) ? gen[gen.length - 1]?.content : gen;
        if (txt && txt.trim().length >= 8) return txt.trim();
      } catch (_) {}
    }

    return null;
  }

  function sanitizeLlmOutput(rawText) {
    if (!rawText) return "";
    let cleaned = rawText
      .replace(/^["']|["']$/g, "")
      .replace(/^(Arunava\s*:\s*)/i, "")
      .replace(/as an ai( language model)?[, ]*/gi, "")
      .trim();
    cleaned = enforceNameLock(cleaned);
    return cleaned;
  }

  function appendFollowupChipsUnderMessage(colEl, intentKey) {
    const chipsWrap = document.createElement("div");
    chipsWrap.className = "inline-followup-chips";
    const list = FOLLOWUP_MAP[intentKey] || FOLLOWUP_MAP.default;
    list.slice(0, 3).forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "followup-chip";
      btn.textContent = enforceNameLock(item.label);
      hydrate3DEmojis(btn);
      btn.addEventListener("click", () => {
        if (!state.isTypingReply) submitUserQuestion(item.prompt);
      });
      chipsWrap.appendChild(btn);
    });
    colEl.appendChild(chipsWrap);
  }

  async function greetHerOnChatStart() {
    state.isTypingReply = true;
    messagesContainer.innerHTML = "";
    renderBottomPreQuestions(null);

    const aiRow = document.createElement("div");
    aiRow.className = "msg-row ai";
    aiRow.innerHTML = `
      <div class="msg-avatar" aria-hidden="true">${emoji3DTag("❄️")}</div>
      <div class="msg-col">
        <span class="msg-sender-tag">Arunava • Love GPT</span>
        <div class="msg-bubble">
          <div class="thinking-state">
            <div class="thinking-row-top">
              <span class="thinking-label-txt">Thinking....</span>
              <span class="dot-pulse"></span><span class="dot-pulse"></span><span class="dot-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(aiRow);

    const col = aiRow.querySelector(".msg-col");
    const bubble = aiRow.querySelector(".msg-bubble");
    await new Promise((r) => setTimeout(r, 420));

    const greeting = state.nameRevealed
      ? `Welcome back, **${SECRET_FIRST}**! ❤️❄️ I am **Arunava**, right here in our peaceful world of snow and love. Ask me anything on your mind — chat with me naturally, ask me to play a song for you, explore photos of both of us together, or pick any question below!`
      : `Welcome, my love! ❤️❄️ I am **Arunava** — waiting right here in our quiet sanctuary of snow and love. Ask me anything at all and I will understand and answer you directly: chat about your day, ask me to play a song for you, or view our memories together!`;

    await animateEachWordIntoBubble(bubble, greeting);
    appendFollowupChipsUnderMessage(col, "greeting");
    state.conversationHistory = [{ role: "assistant", content: enforceNameLock(greeting) }];
    state.isTypingReply = false;
    pinChatBottom();
  }

  // Safe wrapper: a reply error can never freeze the chat (always releases the typing lock)
  async function submitUserQuestion(rawText) {
    if (!rawText || !rawText.trim() || state.isTypingReply) return;
    try {
      await submitUserQuestionInner(rawText);
    } catch (_) {
      const lastBubble = messagesContainer.querySelector(".msg-row.ai:last-child .msg-bubble");
      if (lastBubble && lastBubble.querySelector(".thinking-state")) {
        lastBubble.innerHTML = formatRichHTML("Sorry my love, my words got tangled for a second 🥺 — could you ask me that once more?");
      }
    } finally {
      state.isTypingReply = false;
    }
  }

  async function submitUserQuestionInner(rawText) {
    const trimmed = rawText.trim();
    if (!trimmed || state.isTypingReply) return;
    state.isTypingReply = true;
    state.turnIndex++;
    switchView("chat");

    const userRow = document.createElement("div");
    userRow.className = "msg-row user";
    userRow.innerHTML = `
      <div class="msg-bubble"></div>
      <div class="user-photo-ring" title="Tap to change your round profile photo">
        <img src="${state.userAvatarSrc}" onerror="this.onerror=null;this.src='images/thumbs/pic-110.jpg'" alt="Your photo" class="user-round-photo" />
      </div>
    `;
    userRow.querySelector(".msg-bubble").textContent = trimmed;
    hydrate3DEmojis(userRow.querySelector(".msg-bubble"));
    userRow.querySelector(".user-photo-ring").addEventListener("click", () => customAvatarInput.click());
    messagesContainer.appendChild(userRow);
    pinChatBottom();

    // Items #7 & #12: ONLY show "Thinking...." in chat — NO loading text and NO loading/progress bar!
    const aiRow = document.createElement("div");
    aiRow.className = "msg-row ai";
    aiRow.innerHTML = `
      <div class="msg-avatar" aria-hidden="true">${emoji3DTag("❄️")}</div>
      <div class="msg-col">
        <span class="msg-sender-tag">Arunava • Love GPT</span>
        <div class="msg-bubble">
          <div class="thinking-state">
            <div class="thinking-row-top">
              <span class="thinking-label-txt">Thinking....</span>
              <span class="dot-pulse"></span><span class="dot-pulse"></span><span class="dot-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(aiRow);
    pinChatBottom();

    const colEl = aiRow.querySelector(".msg-col");
    const bubble = aiRow.querySelector(".msg-bubble");
    const qNorm = normalizeAndSpellCheckQuery(trimmed);

    const thinkingStart = performance.now();

    let finalReplyText = "";
    let attachAudioTrack = null;
    let attachPhoto = null;
    let attachPhotoPool = PHOTOS;
    let attachVideo = null;
    let attachLetter = null;
    let attachTimeline = false;
    let attachTraits = null;
    let shouldCelebrate = false;
    let resolvedIntent = "default";

    if (isWifeSecretNameQuery(qNorm)) {
      triggerNameReveal();
      resolvedIntent = "name_reveal";
      state.lastIntent = resolvedIntent;
      const llmNameReply = null;
      if (llmNameReply && llmNameReply.toLowerCase().includes(SECRET_FIRST.toLowerCase())) {
        finalReplyText = sanitizeLlmOutput(llmNameReply);
      } else {
        finalReplyText = /\b(my name|who am i)\b/.test(qNorm)
          ? `Your name is **${SECRET_FULL}** 🌹❄️ — the sweetest, most precious name in this universe, etched forever across every heartbeat of Arunava's life. ❤️`
          : `Her name is **${SECRET_FULL}** 🌹❄️ — the eternal Queen of Arunava's heart and the single answer to every question in his world. ❤️`;
      }
      attachPhoto = SOLO_PORTRAITS[0];
      shouldCelebrate = true;
    } else {
      // 1. Detect optional media side-effect attachments (does NOT block question understanding!)
      const mediaIntent = detectMediaIntent(qNorm);
      resolvedIntent = mediaIntent;
      state.lastIntent = mediaIntent;

      if (mediaIntent === "play_song") {
        const isFirst = state.songRequestCount % 2 === 0;
        state.songRequestCount++;
        attachAudioTrack = isFirst ? AUDIO_TRACKS.song1 : AUDIO_TRACKS.song2;
        shouldCelebrate = true;
      } else if (mediaIntent === "backup_audio") {
        attachAudioTrack = qNorm.includes("06") ? AUDIO_TRACKS.backup2 : AUDIO_TRACKS.backup1;
        shouldCelebrate = true;
      } else if (mediaIntent === "love_depth") {
        attachAudioTrack = AUDIO_TRACKS.loveDepth;
        attachPhoto = PHOTOS.find((p) => p.num === 110) || nextCouplePhoto();
        attachPhotoPool = COUPLE_PHOTOS;
        shouldCelebrate = true;
      } else if (mediaIntent === "how_we_met") {
        attachAudioTrack = AUDIO_TRACKS.howWeMet;
        attachPhoto = PHOTOS.find((p) => p.num === 103) || nextCouplePhoto("first_meet");
        attachPhotoPool = COUPLE_PHOTOS;
        shouldCelebrate = true;
      } else if (mediaIntent === "couple_photo") {
        attachPhoto = nextCouplePhoto();
        attachPhotoPool = COUPLE_PHOTOS;
        shouldCelebrate = true;
      } else if (mediaIntent === "couple_art") {
        attachPhoto = ART_COUPLE_PHOTOS[state.turnIndex % ART_COUPLE_PHOTOS.length];
        attachPhotoPool = ART_COUPLE_PHOTOS;
      } else if (mediaIntent === "family_blessing") {
        attachPhoto = PHOTOS.find((p) => p.num === 112);
        attachPhotoPool = COUPLE_PHOTOS;
        shouldCelebrate = true;
      } else if (mediaIntent === "video") {
        attachVideo = pickMatchingVideo(qNorm);
        shouldCelebrate = true;
      } else if (mediaIntent === "letter") {
        const sal = state.nameRevealed ? `My Dearest ${SECRET_FIRST},` : "My Dearest Love,";
        attachLetter = `${sal}\n\nYou are the most beautiful chapter of my life. Every moment with you becomes a precious memory. Your smile brightens my darkest days, and your presence makes my world complete.\n\nNo matter where life takes us, my heart will always choose you again and again.\n\nForever Yours, Arunava ❤️`;
        shouldCelebrate = true;
      } else if (mediaIntent === "timeline") {
        attachTimeline = true;
      } else if (mediaIntent === "beauty_qualities") {
        attachTraits = ["😊 Radiant Smile", "🌸 Pure Kindness", "✨ Warm Personality", "❤️ Loving Heart", "🌹 Effortless Charm", "🕊️ Sweet Innocence", "💎 Caring Nature"];
        attachPhoto = nextPortrait();
      } else if (mediaIntent === "food_traits") {
        attachTraits = ["🥟 Steaming MOMO", "🍨 Ice Cream", "🍫 KitKat", "🌶️ Kurkure", "🥔 Chips"];
      } else if (mediaIntent === "photo") {
        if (/\b(us|both|couple|together|arunava)\b/.test(qNorm)) {
          attachPhoto = nextCouplePhoto();
          attachPhotoPool = COUPLE_PHOTOS;
        } else {
          attachPhoto = nextPortrait();
        }
      }

      // 2. Confident, verified answers (our facts, media, math, feelings) reply instantly from the co-brain;
      //    open-ended questions with no confident match go to the on-device neural LLM when it is ready.
      const coBrainReply = composeDeepQuestionAwareReply(trimmed, qNorm, mediaIntent);
      const confident = state.lastReplyConfidence === "high";
      let groundedLlm = null;
      if (!confident) {
        const rawLlmText = await generateWithRealLLM(trimmed, qNorm);
        groundedLlm = guardAndGroundLlmOutput(rawLlmText, trimmed, qNorm, mediaIntent);
      }
      finalReplyText = groundedLlm || applyPersonalityStyle(enforceNameLock(coBrainReply));
    }

    // Item #7: Hold "Thinking...." for at least 2 full seconds (2000ms) before writing word-by-word!
    const elapsed = performance.now() - thinkingStart;
    if (elapsed < 2000) {
      await new Promise((r) => setTimeout(r, 2000 - elapsed));
    }

    await animateEachWordIntoBubble(bubble, finalReplyText);

    // Attach Audio Card (Shows loading visual -> plays once!)
    if (attachAudioTrack) {
      bubble.appendChild(buildRomanticAudioCard(attachAudioTrack, true));
    }

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

    // Item #11: Chat Image with ChatGPT-Style Frosted Veil Blur -> Smooth Unblur Reveal!
    if (attachPhoto) {
      const pool = attachPhotoPool || PHOTOS;
      let cursor = Math.max(0, pool.indexOf(attachPhoto));
      let curPhoto = pool[cursor];
      const card = document.createElement("div");
      card.className = "chat-media-card";
      card.innerHTML = `
        <div class="chat-media-stage media-veil-container">
          <img src="${curPhoto.src}" alt="Cherished memory" class="chat-photo-img" />
        </div>
        <div class="chat-media-footer">
          <span class="chat-media-caption">${enforceNameLock(curPhoto.caption)}</span>
          <div class="chat-media-controls">
            <button type="button" class="mini-frost-btn next-pic">🔄 Next (${cursor + 1}/${pool.length})</button>
            <button type="button" class="mini-frost-btn zoom-pic">🔍 Fullscreen</button>
          </div>
        </div>
      `;
      hydrate3DEmojis(card);
      const stageEl = card.querySelector(".chat-media-stage");
      const imgEl = card.querySelector(".chat-photo-img");
      const capEl = card.querySelector(".chat-media-caption");
      const nextBtn = card.querySelector(".next-pic");

      applyProgressiveImageVeil(imgEl, stageEl, "✨ Unveiling cherished photograph...");

      nextBtn.addEventListener("click", () => {
        cursor = (cursor + 1) % pool.length;
        curPhoto = pool[cursor];
        imgEl.src = curPhoto.src;
        applyProgressiveImageVeil(imgEl, stageEl, "✨ Unveiling next memory...");
        capEl.textContent = enforceNameLock(curPhoto.caption);
        nextBtn.textContent = `🔄 Next (${cursor + 1}/${pool.length})`;
        hydrate3DEmojis(card.querySelector(".chat-media-footer"));
      });
      const zoom = () => openLightboxWithList(pool, cursor);
      imgEl.addEventListener("click", zoom);
      card.querySelector(".zoom-pic").addEventListener("click", zoom);
      bubble.appendChild(card);
    }

    // Item #11: Chat Video with Loading Veil -> Unblur -> Play Directly Once Only!
    if (attachVideo) {
      let vCursor = Math.max(0, VIDEOS.indexOf(attachVideo));
      let curV = VIDEOS[vCursor];
      const vCard = document.createElement("div");
      vCard.className = "chat-media-card";
      vCard.innerHTML = `
        <div class="chat-media-stage media-veil-container">
          <video class="chat-inline-video" controls playsinline preload="auto"></video>
        </div>
        <div class="chat-media-footer">
          <span class="chat-media-caption">${enforceNameLock(curV.title)} — ${enforceNameLock(curV.caption)}</span>
          <div class="chat-media-controls">
            <button type="button" class="mini-frost-btn next-vid">🎬 Next Reel (${vCursor + 1}/10)</button>
          </div>
        </div>
      `;
      hydrate3DEmojis(vCard);
      const vStage = vCard.querySelector(".chat-media-stage");
      const vEl = vCard.querySelector("video");
      const vCap = vCard.querySelector(".chat-media-caption");
      const vBtn = vCard.querySelector(".next-vid");

      loadAndPlayVideoWithVeil(vEl, vStage, curV.src, curV.poster, true);

      vBtn.addEventListener("click", () => {
        vCursor = (vCursor + 1) % VIDEOS.length;
        curV = VIDEOS[vCursor];
        loadAndPlayVideoWithVeil(vEl, vStage, curV.src, curV.poster, true);
        vCap.textContent = `${enforceNameLock(curV.title)} — ${enforceNameLock(curV.caption)}`;
        vBtn.textContent = `🎬 Next Reel (${vCursor + 1}/10)`;
        hydrate3DEmojis(vCard.querySelector(".chat-media-footer"));
      });
      bubble.appendChild(vCard);
    }

    appendFollowupChipsUnderMessage(colEl, resolvedIntent);
    renderBottomPreQuestions(resolvedIntent);

    state.conversationHistory.push({ role: "user", content: trimmed });
    state.conversationHistory.push({ role: "assistant", content: finalReplyText });

    if (shouldCelebrate) spawnCelebrationBurst(20);
    state.isTypingReply = false;
    pinChatBottom();
  }

  // ==================== 10. UNLOCK HER NAME CEREMONY ====================
  function triggerNameReveal() {
    const firstUnlock = !state.nameRevealed;
    state.nameRevealed = true;

    document.title = `❄️❤️ Arunava • Love GPT — Dedicated to ${SECRET_FULL}`;
    const sub = document.getElementById("brandSubText");
    if (sub) {
      sub.textContent = `Arunava ❤️ ${SECRET_FIRST}`;
      hydrate3DEmojis(sub);
    }
    const sal = document.getElementById("letterSalutation");
    if (sal) sal.textContent = `My Dearest ${SECRET_FIRST},`;
    const twoInput = document.getElementById("loverTwoInput");
    if (twoInput && twoInput.value === "My Beloved Queen") twoInput.value = SECRET_FULL;

    renderTimeline();
    renderMintedTicket();
    renderBookSpread(state.scrapbookPage, 0);
    renderExplosionCrossWings();
    if (firstUnlock) {
      spawnCelebrationBurst(32);
      showToast(`✨ Secret Name Unlocked: ${SECRET_FULL} ❤️`);
    }
  }

  // ==================== 11. 50 SCRAPBOOK PAGES — 50 DIFFERENT OPENING TYPES + PROGRESSIVE VEIL ====================
  const SCRAPBOOK_50_OPENINGS = [
    { id: 1, mode: "slider", icon: "🎀", title: "1. Untie the Blush Satin Ribbon", prompt: "Slide the blush ribbon bow right to untie Page 1" },
    { id: 2, mode: "scratch", icon: "💖", title: "2. Rub the Rose-Gold Foil Heart", prompt: "Rub across the rose-gold foil layer to unveil Page 2", c1: "#f9a8d4", c2: "#fde68a", label: "Rub Rose Foil" },
    { id: 3, mode: "seal", icon: "💌", title: "3. Crack the Crimson Wax Seal", prompt: "Press the royal crimson wax seal 3 times to break it open", taps: 3 },
    { id: 4, mode: "curtain", icon: "🚪", title: "4. Part the Velvet Stage Drapes", prompt: "Open both Left & Right velvet drapes on Page 4", leftLbl: "◀ Left Drape", rightLbl: "Right Drape ▶" },
    { id: 5, mode: "dial", icon: "🎡", title: "5. Spin the Brass Heart Cipher", prompt: "Turn the vintage brass dial to 100% alignment" },
    { id: 6, mode: "multi", icon: "🌸", title: "6. Stick Both Pastel Washi Strips", prompt: "Press both corner washi tapes onto the album sheet", labels: ["🎀 Top-Left Tape", "🎀 Bottom-Right Tape"] },
    { id: 7, mode: "scratch", icon: "❄️", title: "7. Wipe the Frosted Arctic Pane", prompt: "Wipe your finger across the icy frost coating", c1: "#bae6fd", c2: "#e0e7ff", label: "Wipe Arctic Frost" },
    { id: 8, mode: "slider", icon: "🔑", title: "8. Glide the Silver Key into the Lock", prompt: "Slide the silver heart key all the way into its keyhole" },
    { id: 9, mode: "multi", icon: "⭐", title: "9. Link the 3 October Stars", prompt: "Tap all 3 October stars to connect our constellation", labels: ["⭐ Star 16", "⭐ Star 25", "⭐ Forever"] },
    { id: 10, mode: "slit", icon: "✉️", title: "10. Slit & Lift the Parchment Envelope", prompt: "Slide the letter opener across, then lift the parchment flap", btnLbl: "✉️ Lift Parchment Flap" },
    { id: 11, mode: "slider", icon: "❄️", title: "11. Peel Back the Translucent Vellum", prompt: "Peel the snowy tracing vellum sheet smoothly to the edge" },
    { id: 12, mode: "curtain", icon: "🌺", title: "12. Unfold the Botanical French Doors", prompt: "Swing open both pressed-flower shutters", leftLbl: "🌺 Left Shutter", rightLbl: "Right Shutter 🌺" },
    { id: 13, mode: "seal", icon: "👑", title: "13. Stamp the Royal Queen Crest", prompt: "Tap the golden crown embosser twice to imprint Page 13", taps: 2 },
    { id: 14, mode: "scratch", icon: "✨", title: "14. Polish the Starlight Silver Leaf", prompt: "Buff the silver leaf surface to reveal the memory underneath", c1: "#cbd5e1", c2: "#f1f5f9", label: "Buff Silver Leaf" },
    { id: 15, mode: "multi", icon: "🌷", title: "15. Press 3 Winter Rose Petals", prompt: "Press all 3 rose petals onto the herbarium sheet", labels: ["🌷 Petal One", "🌹 Petal Two", "🌸 Petal Three"] },
    { id: 16, mode: "dial", icon: "🕰️", title: "16. Wind the October Pocket Watch", prompt: "Rotate the timepiece crown forward to 16 October" },
    { id: 17, mode: "slider", icon: "🎞️", title: "17. Pull the Instant Film Tab", prompt: "Pull the instant camera film strip out of the developer roller" },
    { id: 18, mode: "slit", icon: "🎁", title: "18. Slide Off the Kraft Belly-Band", prompt: "Slide off the paper belly-band, then unfold the inner card", btnLbl: "📖 Unfold Inner Card" },
    { id: 19, mode: "multi", icon: "🥟", title: "19. Unlock the 4 Craving Charms", prompt: "Tap all 4 mini treat charms guarding Page 19", labels: ["🥟 MOMO", "🍨 Ice Cream", "🍫 KitKat", "🌶️ Kurkure"] },
    { id: 20, mode: "curtain", icon: "🕊️", title: "20. Open the Origami Swan Wings", prompt: "Spread both paper swan wings apart", leftLbl: "🕊️ Left Wing", rightLbl: "Right Wing 🕊️" },
    { id: 21, mode: "scratch", icon: "🌈", title: "21. Brush Past the Watercolor Mist", prompt: "Brush across the pastel watercolor glaze on Page 21", c1: "#ddd6fe", c2: "#fbcfe8", label: "Brush Pastel Glaze" },
    { id: 22, mode: "seal", icon: "💓", title: "22. Tap the 4-Beat Heart Lock", prompt: "Tap 4 gentle heartbeats to unlock this couple spread", taps: 4 },
    { id: 23, mode: "slider", icon: "🧣", title: "23. Unwrap the Cashmere Winter Scarf", prompt: "Slide the cozy wool wrap aside to reveal Page 23" },
    { id: 24, mode: "dial", icon: "🧭", title: "24. Align the North-Star Compass", prompt: "Turn the compass needle straight North toward Lapland" },
    { id: 25, mode: "slit", icon: "🎟️", title: "25. Detach the Perforated Keepsake Stub", prompt: "Zip along the dotted perforation line, then flip the stub", btnLbl: "🎟️ Flip Keepsake Stub" },
    { id: 26, mode: "multi", icon: "❄️", title: "26. Catch the 3 Crystal Snowflakes", prompt: "Touch each crystal snowflake seal on Page 26", labels: ["❄️ Crystal A", "❄️ Crystal B", "❄️ Crystal C"] },
    { id: 27, mode: "curtain", icon: "🏮", title: "27. Part the Paper Lantern Screens", prompt: "Slide open both Shoji lantern screens", leftLbl: "◀ Left Screen", rightLbl: "Right Screen ▶" },
    { id: 28, mode: "scratch", icon: "🍫", title: "28. Unwrap the Golden Cocoa Foil", prompt: "Rub away the golden wrapper foil to peek inside", c1: "#fde047", c2: "#fbbf24", label: "Peel Gold Wrapper" },
    { id: 29, mode: "slider", icon: "🎻", title: "29. Draw the Silk Bow Across Strings", prompt: "Glide the violin bow across to awaken Page 29" },
    { id: 30, mode: "seal", icon: "💍", title: "30. Tap the Promise Ring Box Clasp", prompt: "Click the velvet ring box clasp 3 times to pop it open", taps: 3 },
    { id: 31, mode: "multi", icon: "🇫🇮", title: "31. Light the 3 Lapland Igloo Lanterns", prompt: "Light all 3 snowy pathway lanterns", labels: ["🕯️ Lantern 1", "🕯️ Lantern 2", "🕯️ Lantern 3"] },
    { id: 32, mode: "dial", icon: "🔮", title: "32. Swirl the Crystal Aperture Iris", prompt: "Rotate the camera iris ring wide open" },
    { id: 33, mode: "slit", icon: "📕", title: "33. Unhook the Vintage Brass Book-Lock", prompt: "Slide the brass latch bolt, then lift the diary leaf", btnLbl: "📖 Lift Diary Leaf" },
    { id: 34, mode: "curtain", icon: "🌌", title: "34. Draw Back the Midnight Aurora Veil", prompt: "Part both emerald sky curtains", leftLbl: "🌌 Emerald Left", rightLbl: "Rose Right 🌌" },
    { id: 35, mode: "scratch", icon: "🌸", title: "35. Sweep the Fallen Cherry Petals", prompt: "Brush the drifted blossom layer gently aside", c1: "#fecdd3", c2: "#ffe4e6", label: "Sweep Blossom Layer" },
    { id: 36, mode: "slider", icon: "🪡", title: "36. Pull the Red Destiny Thread", prompt: "Pull the red thread of fate smoothly from left to right" },
    { id: 37, mode: "multi", icon: "💎", title: "37. Facet-Tap the 3 Ice Diamonds", prompt: "Chime all 3 frost diamonds in order", labels: ["💎 Facet I", "💎 Facet II", "💎 Facet III"] },
    { id: 38, mode: "seal", icon: "☕", title: "38. Warm the Frost-Sensory Mug Seal", prompt: "Press 3 times to warm the thermochromic heart", taps: 3 },
    { id: 39, mode: "dial", icon: "🎶", title: "39. Wind the Porcelain Music Cylinder", prompt: "Turn the porcelain key to 100% tension" },
    { id: 40, mode: "slit", icon: "💌", title: "40. Untuck the Origami Pocket Tongue", prompt: "Slide out the paper tongue tab, then raise the hood", btnLbl: "💌 Raise Pocket Hood" },
    { id: 41, mode: "curtain", icon: "🏡", title: "41. Open Our Villa Balcony Doors", prompt: "Swing wide both glass terrace doors", leftLbl: "🚪 Left Glass", rightLbl: "Right Glass 🚪" },
    { id: 42, mode: "scratch", icon: "🌠", title: "42. Dust Away the Stardust Shimmer", prompt: "Wipe the stardust shimmer coat off Page 42", c1: "#c7d2fe", c2: "#fbcfe8", label: "Wipe Stardust Coat" },
    { id: 43, mode: "slider", icon: "🦌", title: "43. Glide the Reindeer Sleigh Across Snow", prompt: "Pull the snowy sleigh runner across the trail" },
    { id: 44, mode: "multi", icon: "💖", title: "44. Seal the 4 Pillars of Trust", prompt: "Affirm all 4 corner pillars on Page 44", labels: ["💖 Trust", "😊 Joy", "🤍 Peace", "💍 Forever"] },
    { id: 45, mode: "seal", icon: "🌹", title: "45. Unseal the Pressed Crimson Rosebud", prompt: "Tap the rosebud emblem twice to bloom Page 45", taps: 2 },
    { id: 46, mode: "dial", icon: "☀️", title: "46. Turn the Golden Sundial to Dawn", prompt: "Rotate the sundial ring into morning light" },
    { id: 47, mode: "slit", icon: "🎀", title: "47. Slip Off the Lace Corset Ribbon", prompt: "Slide the lace tie free, then unfold the vellum", btnLbl: "✨ Unfold Lace Vellum" },
    { id: 48, mode: "curtain", icon: "👑", title: "48. Part the Royal Palace Portals", prompt: "Open both gilded ballroom doors", leftLbl: "👑 Left Portal", rightLbl: "Right Portal 👑" },
    { id: 49, mode: "scratch", icon: "❄️", title: "49. Melt the Final Winter Glaze", prompt: "Warm away the silver frost sheet with your touch", c1: "#bae6fd", c2: "#fbcfe8", label: "Melt Silver Frost" },
    { id: 50, mode: "multi", icon: "💍", title: "50. Crown Our 50th Golden Finale Spread", prompt: "Tap all 3 eternal vows to unveil our Finale Spread", labels: ["💬 16 Oct", "🌹 24 Feb", "♾️ Forever Us"] }
  ];

  const BOOK_CHAPTERS = [
    "Ch 1 • October Sparks",
    "Ch 2 • Sunlit Grace",
    "Ch 3 • Festive Blessings",
    "Ch 4 • Sweet Cravings",
    "Ch 5 • Couple & Finland Forever"
  ];

  const BOOK_NOTES = [
    "From our very first hello on 16 October 2025, every ordinary day turned into poetry.",
    "One warm smile from you brings instant peace to Arunava's entire world.",
    "Nine days from hello to forever — 25 October 2025 glows in gold.",
    "Seeing each other on 24 February 2026 made the whole universe stand still.",
    "Kindness that asks for nothing, and grace that outshines every crowd.",
    "Two families blessing one bond — April and July 2026 sealed destiny in joy.",
    "Steaming hot MOMOs, KitKats, and endless laughter across the table!",
    "Side-by-side in every photograph — my favorite place on earth is next to you.",
    "Under Finland's snowy Northern Lights, our best chapters are still ahead.",
    "No matter where life takes us, Arunava's heart chooses you again and again."
  ];

  function updateScrapbookBadge() {
    const b = document.getElementById("sbUnlockedBadge");
    if (b) {
      b.textContent = `Unveiled: ${state.scrapbookUnveiled.size} / 50 Pages 📖`;
      hydrate3DEmojis(b);
    }
  }

  function renderBookSpread(pageNum, slideDir = 0, justUnveiled = false) {
    state.scrapbookPage = Math.max(1, Math.min(50, pageNum));
    const sheet = document.getElementById("bookSlidingSheet");
    const leftEl = document.getElementById("sbLeftPage");
    const rightEl = document.getElementById("sbRightPage");
    const ind = document.getElementById("sbPageIndicator");
    const mechBadge = document.getElementById("sbMechanismBadge");
    const turnSlider = document.getElementById("sbPageTurnDrag");
    if (!sheet || !leftEl || !rightEl) return;

    const spec = SCRAPBOOK_50_OPENINGS[state.scrapbookPage - 1];
    if (ind) ind.textContent = `Page ${state.scrapbookPage} of 50`;
    if (mechBadge) mechBadge.textContent = spec.title;
    if (turnSlider) turnSlider.value = "0";

    const chIdx = Math.floor((state.scrapbookPage - 1) / 10);
    document.querySelectorAll("#scrapbookChapters .filter-pill").forEach((b, i) => {
      b.classList.toggle("active", i === chIdx);
    });

    const p1Idx = ((state.scrapbookPage - 1) * 2) % PHOTOS.length;
    const p2Idx = (state.scrapbookPage >= 41 ? 102 + ((state.scrapbookPage - 41) % 18) : (p1Idx + 1)) % PHOTOS.length;
    const photoA = PHOTOS[p1Idx];
    const photoB = PHOTOS[p2Idx];
    const unveiled = state.scrapbookUnveiled.has(state.scrapbookPage);
    const noteText = BOOK_NOTES[(state.scrapbookPage - 1) % BOOK_NOTES.length];
    const tail = state.nameRevealed ? ` — Forever yours, ${SECRET_FIRST} ❤️` : ` — Forever in Arunava's heart ❤️`;

    const populatePages = () => {
      leftEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
          <span class="score-pill">📖 Page ${state.scrapbookPage} / 50</span>
          <span style="font-size:0.73rem;font-weight:600;color:var(--ink-soft);">${BOOK_CHAPTERS[chIdx]}</span>
        </div>
        <figure class="polaroid-single-frame media-veil-container" id="sbLeftPolaroid" style="${unveiled ? "" : "filter:blur(14px);pointer-events:none;"}">
          <span class="washi-tape" aria-hidden="true"></span>
          <img id="sbLeftImg" src="${photoA.thumb}" onerror="this.onerror=null;this.src='${photoA.src}'" alt="${photoA.title}" />
          <figcaption class="polaroid-label">${enforceNameLock(photoA.title)} ❄️</figcaption>
        </figure>
        <div style="text-align:center;font-size:0.73rem;color:var(--ink-soft);">
          ${unveiled ? "✨ Tap Polaroids to view full resolution" : `🔒 Complete Opening #${spec.id} on the right page`}
        </div>
      `;

      if (unveiled) {
        const lPol = document.getElementById("sbLeftPolaroid");
        const lImg = document.getElementById("sbLeftImg");
        if (justUnveiled && lImg && lPol) applyProgressiveImageVeil(lImg, lPol, "✨ Unveiling Polaroid...");
        lPol?.addEventListener("click", () => openLightboxWithList(PHOTOS, p1Idx));
      }

      if (unveiled) {
        rightEl.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="score-pill">✨ Unveiled • ${spec.icon}</span>
            <span style="font-size:0.72rem;color:var(--rose-primary);font-weight:600;">Opening #${spec.id}/50</span>
          </div>
          <figure class="polaroid-single-frame media-veil-container" id="sbRightPolaroid">
            <span class="washi-tape" aria-hidden="true"></span>
            <img id="sbRightImg" src="${photoB.thumb}" onerror="this.onerror=null;this.src='${photoB.src}'" alt="${photoB.title}" />
            <figcaption class="polaroid-label">${enforceNameLock(photoB.title)} ❤️</figcaption>
          </figure>
          <p class="sb-handwritten-note">“${enforceNameLock(noteText + tail)}”</p>
        `;
        const rPol = document.getElementById("sbRightPolaroid");
        const rImg = document.getElementById("sbRightImg");
        if (justUnveiled && rImg && rPol) applyProgressiveImageVeil(rImg, rPol, "✨ Developing memory...");
        rPol?.addEventListener("click", () => openLightboxWithList(PHOTOS, p2Idx));
      } else {
        let controlHTML = "";
        if (spec.mode === "slider") {
          controlHTML = `<input id="sbUniqueSlider" type="range" min="0" max="100" value="0" class="tactile-ribbon-slider" style="max-width:240px;" />`;
        } else if (spec.mode === "scratch") {
          controlHTML = `<canvas id="sbScratchCanvas" width="230" height="100" style="border-radius:12px;border:2px solid #fff;cursor:crosshair;touch-action:none;"></canvas>`;
        } else if (spec.mode === "seal") {
          controlHTML = `<button type="button" id="sbWaxBtn" class="sb-wax-seal-btn">${spec.icon}</button><small id="sbWaxCount" style="font-size:0.73rem;color:var(--rose-primary);font-weight:600;">Taps remaining: ${spec.taps}</small>`;
        } else if (spec.mode === "curtain") {
          controlHTML = `<div class="sb-curtain-stage"><button type="button" class="sb-curtain-panel">${spec.leftLbl}</button><button type="button" class="sb-curtain-panel">${spec.rightLbl}</button></div>`;
        } else if (spec.mode === "dial") {
          controlHTML = `<div class="sb-dial-wrap"><div id="sbDialWheel" class="sb-dial-wheel">${spec.icon}</div><input id="sbDialRange" type="range" min="0" max="360" value="0" class="tactile-ribbon-slider" /></div>`;
        } else if (spec.mode === "multi") {
          controlHTML = `<div class="sb-star-grid">${spec.labels.map((l) => `<button type="button" class="ghost-pill-btn sb-multi-btn">${l}</button>`).join("")}</div>`;
        } else if (spec.mode === "slit") {
          controlHTML = `<input id="sbSlitSlider" type="range" min="0" max="100" value="0" class="tactile-ribbon-slider" style="max-width:230px;" /><button type="button" id="sbSlitBtn" class="primary-pill-btn" disabled style="opacity:0.45;">${spec.btnLbl}</button>`;
        }

        rightEl.innerHTML = `
          <div class="page-craft-stage">
            <span class="score-pill">Unique Opening #${spec.id} of 50</span>
            <div style="font-size:2rem;">${spec.icon}</div>
            <h3 style="font-family:var(--font-serif);font-size:1.35rem;">${spec.title}</h3>
            <p style="font-size:0.82rem;color:var(--ink-body);max-width:270px;">${spec.prompt}</p>
            ${controlHTML}
          </div>
        `;

        const finishPageOpen = () => {
          state.scrapbookUnveiled.add(state.scrapbookPage);
          updateScrapbookBadge();
          spawnCelebrationBurst(14);
          renderBookSpread(state.scrapbookPage, 0, true);
        };

        const sl = document.getElementById("sbUniqueSlider");
        if (sl) sl.addEventListener("input", () => { if (Number(sl.value) >= 90) finishPageOpen(); });

        const dialRange = document.getElementById("sbDialRange");
        const dialWheel = document.getElementById("sbDialWheel");
        if (dialRange && dialWheel) {
          dialRange.addEventListener("input", () => {
            const deg = Number(dialRange.value);
            dialWheel.style.transform = `rotate(${deg}deg)`;
            if (deg >= 330) finishPageOpen();
          });
        }

        const waxBtn = document.getElementById("sbWaxBtn");
        const waxCnt = document.getElementById("sbWaxCount");
        if (waxBtn) {
          let left = spec.taps || 3;
          waxBtn.addEventListener("click", () => {
            left--;
            waxBtn.style.transform = `scale(${1 + (spec.taps - left) * 0.08})`;
            if (waxCnt) waxCnt.textContent = `Taps remaining: ${Math.max(0, left)}`;
            if (left <= 0) finishPageOpen();
          });
        }

        const curtains = rightEl.querySelectorAll(".sb-curtain-panel");
        if (curtains.length) {
          let opened = 0;
          curtains.forEach((c) => {
            c.addEventListener("click", () => {
              if (c.classList.contains("opened")) return;
              c.classList.add("opened");
              opened++;
              if (opened >= curtains.length) setTimeout(finishPageOpen, 260);
            });
          });
        }

        const multis = rightEl.querySelectorAll(".sb-multi-btn");
        if (multis.length) {
          let done = 0;
          multis.forEach((b) => {
            b.addEventListener("click", () => {
              if (b.disabled) return;
              b.disabled = true;
              b.style.background = "var(--rose-tint)";
              b.style.borderColor = "var(--rose-primary)";
              done++;
              if (done >= multis.length) setTimeout(finishPageOpen, 180);
            });
          });
        }

        const slitSlider = document.getElementById("sbSlitSlider");
        const slitBtn = document.getElementById("sbSlitBtn");
        if (slitSlider && slitBtn) {
          slitSlider.addEventListener("input", () => {
            if (Number(slitSlider.value) >= 88) {
              slitBtn.disabled = false;
              slitBtn.style.opacity = "1";
            }
          });
          slitBtn.addEventListener("click", finishPageOpen);
        }

        const sc = document.getElementById("sbScratchCanvas");
        if (sc) {
          const sctx = sc.getContext("2d");
          const g = sctx.createLinearGradient(0, 0, 230, 100);
          g.addColorStop(0, spec.c1);
          g.addColorStop(1, spec.c2);
          sctx.fillStyle = g;
          sctx.fillRect(0, 0, 230, 100);
          sctx.fillStyle = "#1e293b";
          sctx.font = "600 13px 'Inter', sans-serif";
          sctx.textAlign = "center";
          sctx.fillText(`✨ ${spec.label} ✨`, 115, 54);

          let strokes = 0;
          let active = false;
          const rub = (e) => {
            if (!active) return;
            const r = sc.getBoundingClientRect();
            const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) * (230 / r.width);
            const y = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) * (100 / r.height);
            sctx.globalCompositeOperation = "destination-out";
            sctx.beginPath();
            sctx.arc(x, y, 22, 0, Math.PI * 2);
            sctx.fill();
            strokes++;
            if (strokes > 12) finishPageOpen();
          };
          sc.addEventListener("mousedown", (e) => { active = true; rub(e); });
          window.addEventListener("mouseup", () => { active = false; });
          sc.addEventListener("mousemove", rub);
          sc.addEventListener("touchstart", (e) => { active = true; rub(e); }, { passive: true });
          sc.addEventListener("touchmove", rub, { passive: true });
          sc.addEventListener("touchend", () => { active = false; });
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
      }, 220);
    } else {
      populatePages();
    }
  }

  function initScrapbook50Pages() {
    const coverStage = document.getElementById("scrapbookCoverStage");
    const openStage = document.getElementById("scrapbookOpenStage");
    const claspSlider = document.getElementById("bookClaspSlider");
    const pageTurnDrag = document.getElementById("sbPageTurnDrag");

    claspSlider.addEventListener("input", () => {
      if (Number(claspSlider.value) >= 88 && !coverStage.hidden) {
        coverStage.hidden = true;
        openStage.hidden = false;
        claspSlider.value = "0";
        const sc = document.querySelector("#view-scrapbook .page-scroll");
        if (sc) sc.scrollTop = 0;
        spawnCelebrationBurst(20);
        renderBookSpread(state.scrapbookPage, 0);
        updateScrapbookBadge();
      }
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

    let turningLock = false;
    pageTurnDrag.addEventListener("input", () => {
      const v = Number(pageTurnDrag.value);
      const sheet = document.getElementById("bookSlidingSheet");
      if (sheet && !turningLock) {
        sheet.style.transform = `perspective(1500px) rotateY(${-v * 0.22}deg)`;
      }
      if (v >= 88 && !turningLock) {
        turningLock = true;
        if (sheet) sheet.style.transform = "";
        renderBookSpread(state.scrapbookPage < 50 ? state.scrapbookPage + 1 : 1, 1);
        setTimeout(() => { turningLock = false; }, 420);
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
  }

  // ==================== 12. 50x ORIGAMI EXPLOSION BOX — 10 DISTINCT VISUAL ARCHITECTURES PER BOX ====================
  // Fixes Screenshot 2 Red Boxes: each of the 10 positions in a box (1..10) has its OWN distinct visual origami architecture!
  // Pos 1: lotus (4-petal diamond blossom), Pos 2: crane (sky-blue triangular wings), Pos 3: pull (silk cascade drawer),
  // Pos 4: spin (diamond squash wheel), Pos 5: pleat (striped accordion), Pos 6: kimono (diagonal overlapping rose/violet lapels),
  // Pos 7: band_lift (golden triangular envelope flap + band), Pos 8: petal3 (3-tip blossom), Pos 9: heart_vault (pulsing heart seal lock),
  // Pos 10: wheel_pin (4-blade pinwheel spinner).
  const ORIGAMI_50_OPENINGS = [
    { id: 1, name: "Lotus Blossom Fold", icon: "🌸", kind: "lotus", a: "🌸 Petal L", b: "Petal R 🌸", hint: "Unfold both curved lotus petals" },
    { id: 2, name: "Tsuru Crane Twin-Wing", icon: "🕊️", kind: "crane", a: "Wing L", b: "Wing R", hint: "Spread both triangular crane wings" },
    { id: 3, name: "Cascade Waterfall Tab", icon: "🎀", kind: "pull", hint: "Pull silk cascade tab to 100%" },
    { id: 4, name: "Diagonal Squash Pocket", icon: "💎", kind: "spin", hint: "Twist diagonal squash crease open" },
    { id: 5, name: "Kyoto Zig-Zag Pleat", icon: "✨", kind: "pleat", hint: "Stretch 6-fold accordion pleats flat" },
    { id: 6, name: "Kimono Collar Lapel", icon: "🌺", kind: "kimono", a: "Lapel L", b: "Lapel R", hint: "Slide up both diagonal kimono lapels" },
    { id: 7, name: "Belly-Band Wax Envelope", icon: "💌", kind: "band_lift", btn: "💌 Lift Envelope", hint: "Slide band off, then lift flap" },
    { id: 8, name: "Origami Tulip Bud", icon: "🌷", kind: "petal3", p: ["🌷1", "🌷2", "🌷3"], hint: "Open all 3 tulip paper petals" },
    { id: 9, name: "Royal Heart Seal Vault", icon: "❤️", kind: "heart_vault", taps: 2, hint: "Tap the crimson heart lock twice" },
    { id: 10, name: "Four-Blade Pinwheel", icon: "🎡", kind: "wheel_pin", hint: "Spin the paper pinwheel blades open" },

    { id: 11, name: "Samurai Kabuto Crease", icon: "👑", kind: "lotus", a: "👑 Crest L", b: "Crest R 👑", hint: "Fold up both kabuto crests" },
    { id: 12, name: "Starburst Octagon Fold", icon: "⭐", kind: "crane", a: "Star L", b: "Star R", hint: "Part the 8-point starburst triangles" },
    { id: 13, name: "Silk Ribbon Pull-Drawer", icon: "🎁", kind: "pull", hint: "Slide out the miniature paper drawer" },
    { id: 14, name: "Butterfly Swallowtail", icon: "🦋", kind: "spin", hint: "Rotate both origami butterfly wings" },
    { id: 15, name: "Sensu Folding Hand-Fan", icon: "🌺", kind: "pleat", hint: "Spread the pleated paper hand-fan" },
    { id: 16, name: "Diamond Blossom Lock", icon: "💠", kind: "kimono", a: "Facet L", b: "Facet R", hint: "Unlatch both diagonal diamond sashes" },
    { id: 17, name: "Matchbook Tuck Memo", icon: "📖", kind: "band_lift", btn: "📖 Flip Cover", hint: "Untuck bottom lip, then flip up" },
    { id: 18, name: "Snowflake Hexagonal Fold", icon: "❄️", kind: "petal3", p: ["❄️A", "❄️B", "❄️C"], hint: "Tap all 3 Kirigami snow branches" },
    { id: 19, name: "Shoji Lantern Seal", icon: "🏮", kind: "heart_vault", taps: 2, hint: "Tap the glowing Shoji seal twice" },
    { id: 20, name: "Origami Rose Twist", icon: "🌹", kind: "wheel_pin", hint: "Unwind the Kawasaki rose spiral" },

    { id: 21, name: "Twin Peony Blossom", icon: "🌸", kind: "lotus", a: "🌸 Peony A", b: "Peony B 🌸", hint: "Part both curved peony petals" },
    { id: 22, name: "Origami Swan Wings", icon: "🦢", kind: "crane", a: "Swan L", b: "Swan R", hint: "Spread the graceful paper swan triangles" },
    { id: 23, name: "Corset Ribbon Lacing", icon: "🎀", kind: "pull", hint: "Unlace the criss-cross paper ribbon" },
    { id: 24, name: "Kaleidoscope Flexagon", icon: "🔮", kind: "spin", hint: "Flex the hexaflexagon ring to 100%" },
    { id: 25, name: "Infinity Flipper Tile", icon: "♾️", kind: "pleat", hint: "Flex the magic paper flipper flat" },
    { id: 26, name: "Kiss-Lock Paper Sash", icon: "💝", kind: "kimono", a: "Sash L", b: "Sash R", hint: "Part both overlapping silk sashes" },
    { id: 27, name: "Envelope Corner Mitre", icon: "✉️", kind: "band_lift", btn: "✉️ Unfold Mitre", hint: "Slide seal off & unfold mitre" },
    { id: 28, name: "Origami Crown Diadem", icon: "👑", kind: "petal3", p: ["👑L", "👑Gem", "👑R"], hint: "Raise all 3 crown peaks" },
    { id: 29, name: "Promise Gem Medallion", icon: "💍", kind: "heart_vault", taps: 3, hint: "Tap the ring medallion 3 times" },
    { id: 30, name: "Maple Leaf Whirl", icon: "🍁", kind: "wheel_pin", hint: "Spin the autumn leaf valley folds" },

    { id: 31, name: "Sakura Twin Petal", icon: "🌸", kind: "lotus", a: "🌸 Sakura L", b: "Sakura R 🌸", hint: "Release both tucked sakura petals" },
    { id: 32, name: "Lapland Igloo Triangles", icon: "🛖", kind: "crane", a: "Dome L", b: "Dome R", hint: "Part the snowy paper dome triangles" },
    { id: 33, name: "Origami Sailboat Sheet", icon: "⛵", kind: "pull", hint: "Hoist the paper mainsail sheet" },
    { id: 34, name: "Spiral Nautilus Shell", icon: "🐚", kind: "spin", hint: "Rotate the golden-ratio paper spiral" },
    { id: 35, name: "Aurora Wave Concertina", icon: "🌌", kind: "pleat", hint: "Unfurl the northern-lights concertina" },
    { id: 36, name: "Origami Gift Bow Sash", icon: "🎁", kind: "kimono", a: "Bow L", b: "Bow R", hint: "Slide open both diagonal bow loops" },
    { id: 37, name: "Sealed Love Scroll Roll", icon: "📜", kind: "band_lift", btn: "📜 Unroll Scroll", hint: "Slip ring off & unroll scroll" },
    { id: 38, name: "Four-Leaf Clover Crease", icon: "🍀", kind: "petal3", p: ["🍀1", "🍀2", "🍀3"], hint: "Unfold the lucky clover leaves" },
    { id: 39, name: "Origami Heart Crest", icon: "💖", kind: "heart_vault", taps: 2, hint: "Tap the origami heart crest twice" },
    { id: 40, name: "Origami Dove Pinwheel", icon: "🕊️", kind: "wheel_pin", hint: "Spin tail tab to flutter wings" },

    { id: 41, name: "Twin Starburst Lotus", icon: "🌟", kind: "lotus", a: "🌟 Star L", b: "Star R 🌟", hint: "Open both curved twin star petals" },
    { id: 42, name: "Double Swallow Wing", icon: "🕊️", kind: "crane", a: "Swallow L", b: "Swallow R", hint: "Unfold both triangular swallow wings" },
    { id: 43, name: "Secret Drawer Pull-Slip", icon: "🔑", kind: "pull", hint: "Draw out the hidden keepsake slip" },
    { id: 44, name: "Sunburst Radial Pleat", icon: "☀️", kind: "spin", hint: "Fan out the radial sunburst pleats" },
    { id: 45, name: "Accordion Photo Cascade", icon: "📸", kind: "pleat", hint: "Stretch out the 5-panel photo strip" },
    { id: 46, name: "Velvet Ribbon Lapel", icon: "💌", kind: "kimono", a: "Velvet L", b: "Velvet R", hint: "Part the velvet origami lapels" },
    { id: 47, name: "Origami Ring Cushion", icon: "💍", kind: "band_lift", btn: "💍 Open Pillow", hint: "Untie band & open ring pillow" },
    { id: 48, name: "Trillium Snow-Lily Fold", icon: "❄️", kind: "petal3", p: ["❄️1", "❄️2", "❄️3"], hint: "Bloom all 3 snow-lily petals" },
    { id: 49, name: "Eternal Soulmate Core", icon: "💘", kind: "heart_vault", taps: 3, hint: "Tap the Soulmate Heart Core 3 times" },
    { id: 50, name: "Golden Finale Pinwheel", icon: "👑", kind: "wheel_pin", hint: "Spin open our 50th Golden Finale!" }
  ];

  function updateExplosionProgressUI() {
    const count = state.explosionUnfoldedIds.size;
    const lbl = document.getElementById("expProgressLabel");
    const bar = document.getElementById("expProgressBar");
    if (lbl) {
      lbl.textContent = `Unfolded: ${count} / 50 Unique Origami Folds 🎁`;
      hydrate3DEmojis(lbl);
    }
    if (bar) bar.style.width = `${(count / 50) * 100}%`;
  }

  function buildOrigamiUnit(globalId, justUnfoldedId = null) {
    const spec = ORIGAMI_50_OPENINGS[globalId - 1];
    const photoIdx = globalId >= 33 ? (102 + ((globalId - 33) % 18)) : (((globalId - 1) * 2) % PHOTOS.length);
    const photo = PHOTOS[photoIdx];
    const isOpen = state.explosionUnfoldedIds.has(globalId);

    const unit = document.createElement("div");
    unit.className = `origami-craft-unit ${isOpen ? "unfolded" : ""}`;

    const markUnfolded = () => {
      state.explosionUnfoldedIds.add(globalId);
      spawnCelebrationBurst(12);
      updateExplosionProgressUI();
      renderExplosionCrossWings(globalId);
    };

    if (isOpen) {
      unit.innerHTML = `
        <span class="exp-flap-num">#${spec.id} • ${spec.name} ✨</span>
        <div class="orig-img-wrap media-veil-container" style="width:100%;border-radius:8px;overflow:hidden;">
          <img src="${photo.thumb}" onerror="this.onerror=null;this.src='${photo.src}'" alt="${photo.title}" class="origami-revealed-img" />
        </div>
        <p class="origami-note-mini">${enforceNameLock(photo.title)}</p>
      `;
      const wrapEl = unit.querySelector(".orig-img-wrap");
      const imgEl = unit.querySelector("img");
      if (justUnfoldedId === globalId && imgEl && wrapEl) {
        applyProgressiveImageVeil(imgEl, wrapEl, "✨ Unfolding...");
      }
      imgEl.addEventListener("click", () => openLightboxWithList(PHOTOS, photoIdx));
      hydrate3DEmojis(unit);
      return unit;
    }

    let interactiveHTML = "";
    if (spec.kind === "lotus") {
      interactiveHTML = `
        <div class="orig-lotus-diamond">
          <button type="button" class="orig-lotus-petal">${spec.a}</button>
          <button type="button" class="orig-lotus-petal">${spec.b}</button>
        </div>
      `;
    } else if (spec.kind === "crane") {
      interactiveHTML = `
        <div class="orig-crane-triangles">
          <button type="button" class="orig-crane-wing left">${spec.a}</button>
          <button type="button" class="orig-crane-wing right">${spec.b}</button>
        </div>
      `;
    } else if (spec.kind === "kimono") {
      interactiveHTML = `
        <div class="orig-kimono-wrap">
          <button type="button" class="orig-kimono-lapel left">${spec.a}</button>
          <button type="button" class="orig-kimono-lapel right">${spec.b}</button>
        </div>
      `;
    } else if (spec.kind === "heart_vault") {
      interactiveHTML = `
        <div class="orig-heart-vault">
          <button type="button" class="orig-heart-seal-btn">${spec.icon}</button>
          <small class="orig-vault-cnt" style="font-size:0.68rem;color:var(--rose-primary);font-weight:700;">Taps: ${spec.taps}</small>
        </div>
      `;
    } else if (spec.kind === "pull") {
      interactiveHTML = `<div class="origami-shape-badge">${spec.icon}</div><input type="range" min="0" max="100" value="0" class="tactile-ribbon-slider orig-pull" />`;
    } else if (spec.kind === "pleat") {
      interactiveHTML = `<div class="orig-pleat-bar" style="width:100%;height:34px;border-radius:8px;background:repeating-linear-gradient(90deg,#fce7f3 0 10px,#e0f2fe 10px 20px);transform:scaleX(0.4);transition:transform 0.2s;"></div><input type="range" min="0" max="100" value="0" class="tactile-ribbon-slider orig-pleat-sl" />`;
    } else if (spec.kind === "spin" || spec.kind === "wheel_pin") {
      const borderStyle = spec.kind === "wheel_pin" ? "border:2px solid #38bdf8;background:#f0f9ff;border-radius:14px;" : "border:2px dashed var(--rose-primary);border-radius:50%;";
      interactiveHTML = `<div class="origami-shape-badge orig-spin-orb" style="${borderStyle}">${spec.icon}</div><input type="range" min="0" max="360" value="0" class="tactile-ribbon-slider orig-spin-sl" />`;
    } else if (spec.kind === "petal3") {
      interactiveHTML = `<div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;">${spec.p.map((lbl) => `<button type="button" class="mini-frost-btn orig-p3">${lbl}</button>`).join("")}</div>`;
    } else if (spec.kind === "band_lift") {
      interactiveHTML = `
        <div class="orig-envelope-pocket">
          <div class="orig-env-flap-svg"></div>
          <input type="range" min="0" max="100" value="0" class="tactile-ribbon-slider orig-band-sl" />
          <button type="button" class="mini-frost-btn orig-lift-btn" disabled style="opacity:0.45;">${spec.btn}</button>
        </div>
      `;
    }

    unit.innerHTML = `
      <span class="exp-flap-num">#${spec.id} • ${spec.name}</span>
      ${interactiveHTML}
      <small style="font-size:0.67rem;color:var(--ink-soft);">${spec.hint}</small>
    `;

    const dualParts = unit.querySelectorAll(".orig-lotus-petal, .orig-crane-wing, .orig-kimono-lapel");
    if (dualParts.length) {
      let c = 0;
      dualParts.forEach((f) => f.addEventListener("click", () => {
        if (f.classList.contains("opened")) return;
        f.classList.add("opened");
        c++;
        if (c >= dualParts.length) setTimeout(markUnfolded, 240);
      }));
    }

    const vaultBtn = unit.querySelector(".orig-heart-seal-btn");
    const vaultCnt = unit.querySelector(".orig-vault-cnt");
    if (vaultBtn) {
      let rem = spec.taps || 2;
      vaultBtn.addEventListener("click", () => {
        rem--;
        vaultBtn.style.transform = `scale(${1 + (3 - rem) * 0.1})`;
        if (vaultCnt) vaultCnt.textContent = `Taps: ${Math.max(0, rem)}`;
        if (rem <= 0) setTimeout(markUnfolded, 180);
      });
    }

    const pull = unit.querySelector(".orig-pull");
    if (pull) pull.addEventListener("input", () => { if (Number(pull.value) >= 88) markUnfolded(); });

    const pleatSl = unit.querySelector(".orig-pleat-sl");
    const pleatBar = unit.querySelector(".orig-pleat-bar");
    if (pleatSl && pleatBar) {
      pleatSl.addEventListener("input", () => {
        const v = Number(pleatSl.value);
        pleatBar.style.transform = `scaleX(${0.4 + (v / 100) * 0.6})`;
        if (v >= 88) markUnfolded();
      });
    }

    const spinSl = unit.querySelector(".orig-spin-sl");
    const spinOrb = unit.querySelector(".orig-spin-orb");
    if (spinSl && spinOrb) {
      spinSl.addEventListener("input", () => {
        const d = Number(spinSl.value);
        spinOrb.style.transform = `rotate(${d}deg)`;
        if (d >= 320) markUnfolded();
      });
    }

    const p3 = unit.querySelectorAll(".orig-p3");
    if (p3.length) {
      let done = 0;
      p3.forEach((b) => b.addEventListener("click", () => {
        if (b.disabled) return;
        b.disabled = true;
        b.style.background = "var(--rose-tint)";
        done++;
        if (done >= p3.length) setTimeout(markUnfolded, 200);
      }));
    }

    const bandSl = unit.querySelector(".orig-band-sl");
    const liftBtn = unit.querySelector(".orig-lift-btn");
    if (bandSl && liftBtn) {
      bandSl.addEventListener("input", () => {
        if (Number(bandSl.value) >= 86) {
          liftBtn.disabled = false;
          liftBtn.style.opacity = "1";
        }
      });
      liftBtn.addEventListener("click", markUnfolded);
    }

    hydrate3DEmojis(unit);
    return unit;
  }

  function renderExplosionCrossWings(justUnfoldedId = null) {
    const baseOffset = (state.explosionBoxLayer - 1) * 10;
    const upBox = document.getElementById("wingUpContainer");
    const leftBox = document.getElementById("wingLeftContainer");
    const rightBox = document.getElementById("wingRightContainer");
    const downBox = document.getElementById("wingDownContainer");
    const centerBox = document.getElementById("wingCenterContainer");
    if (!upBox) return;

    const fillWing = (container, label, idA, idB) => {
      container.innerHTML = `<div class="wing-header-tag">${label}</div><div class="origami-pair-row"></div>`;
      const row = container.querySelector(".origami-pair-row");
      row.appendChild(buildOrigamiUnit(idA, justUnfoldedId));
      row.appendChild(buildOrigamiUnit(idB, justUnfoldedId));
      hydrate3DEmojis(container);
    };

    fillWing(upBox, `⬆️ North Wing • Box ${state.explosionBoxLayer}`, baseOffset + 1, baseOffset + 2);
    fillWing(leftBox, `⬅️ West Wing • Box ${state.explosionBoxLayer}`, baseOffset + 3, baseOffset + 4);
    fillWing(rightBox, `➡️ East Wing • Box ${state.explosionBoxLayer}`, baseOffset + 5, baseOffset + 6);
    fillWing(downBox, `⬇️ South Wing • Box ${state.explosionBoxLayer}`, baseOffset + 7, baseOffset + 8);
    fillWing(centerBox, `💖 Heart Core • Nested Box ${state.explosionBoxLayer} of 5`, baseOffset + 9, baseOffset + 10);

    const nextLayer = state.explosionBoxLayer < 5 ? state.explosionBoxLayer + 1 : 1;
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "nested-box-next-btn";
    nextBtn.textContent = state.explosionBoxLayer < 5
      ? `🎁 Open Inner Nested Box #${nextLayer} (Origami ${nextLayer * 10 - 9}–${nextLayer * 10}) →`
      : `🔄 Return to Outer Box #1`;
    nextBtn.addEventListener("click", () => {
      state.explosionBoxLayer = nextLayer;
      document.querySelectorAll("#expLayerTabs .filter-pill").forEach((p) => {
        p.classList.toggle("active", Number(p.dataset.boxlayer) === state.explosionBoxLayer);
      });
      spawnCelebrationBurst(16);
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
        stepHead.textContent = "Step 2: Bow Untied! Lift the Box Lid";
        stepSub.textContent = "Click below to drop all 4 origami box walls flat across the table.";
        liftBtn.hidden = false;
        hydrate3DEmojis(liftBtn);
      }
    });

    liftBtn.addEventListener("click", () => {
      lidEl.classList.add("lid-lifted");
      spawnCelebrationBurst(24);
      setTimeout(() => {
        closedStage.hidden = true;
        openStage.hidden = false;
        const sc = document.querySelector("#view-explosion .page-scroll");
        if (sc) sc.scrollTop = 0;
        renderExplosionCrossWings();
        updateExplosionProgressUI();
      }, 460);
    });

    document.getElementById("refoldBoxBtn").addEventListener("click", () => {
      openStage.hidden = true;
      closedStage.hidden = false;
      ribbonSlider.value = "0";
      lidEl.classList.remove("bow-untied", "lid-lifted");
      liftBtn.hidden = true;
      stepHead.textContent = "Step 1: Slide Satin Ribbon to Untie Bow";
      stepSub.textContent = "Drag the silk ribbon slider across to release all 4 origami box walls.";
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

  // ==================== 13. INTERACTIVE 3-STEP BIOMETRIC HEARTBEAT SCAN ====================
  function initInteractiveBiometricScan() {
    const waveFront = document.getElementById("liquidWaveFront");
    const waveBack = document.getElementById("liquidWaveBack");
    const ringArc = document.getElementById("bioRingArc");
    const centerPct = document.getElementById("bioCenterPercent");
    const centerSub = document.getElementById("bioCenterSub");
    const ecgCanvas = document.getElementById("bioEcgCanvas");
    const ecgCtx = ecgCanvas.getContext("2d");
    const syncBadge = document.getElementById("bioSyncStatus");
    const herBpmEl = document.getElementById("bioHerBpm");
    const verdictEl = document.getElementById("loveMeterVerdict");

    const pill1 = document.getElementById("bioStepPill1");
    const pill2 = document.getElementById("bioStepPill2");
    const pill3 = document.getElementById("bioStepPill3");
    const stage1 = document.getElementById("bioStage1");
    const stage2 = document.getElementById("bioStage2");
    const stage3 = document.getElementById("bioStage3");
    const stageDone = document.getElementById("bioStageDone");

    const holdBtn = document.getElementById("bioHoldPadBtn");
    const holdPctText = document.getElementById("bioHoldPctText");
    const tapBtn = document.getElementById("bioRhythmTapBtn");
    const tapCountEl = document.getElementById("bioTapCount");
    const resetBtn = document.getElementById("bioResetScanBtn");

    let phase = 0;
    let holdProgress = 0;
    let holdTimer = null;
    let rhythmTaps = 0;
    let tapSpikeBoost = 0;

    function setRingProgress(level) {
      state.bioTargetLevel = level;
      const offset = 615.75 * (1 - level);
      ringArc.style.transition = "stroke-dashoffset 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
      ringArc.setAttribute("stroke-dashoffset", String(offset.toFixed(1)));
    }

    function buildWavePath(level, phaseOffset, amp) {
      const topY = 178 - level * 138;
      let d = `M 35 ${topY} `;
      for (let x = 35; x <= 185; x += 10) {
        const y = topY + Math.sin((x * 0.06) + phaseOffset) * amp;
        d += `L ${x} ${y.toFixed(1)} `;
      }
      d += "L 185 190 L 35 190 Z";
      return d;
    }

    function animateOscilloscope() {
      requestAnimationFrame(animateOscilloscope);
      if (!isOnScreen(ecgCanvas)) return;
      phase += state.bioPhaseMode === "holding" ? 0.11 : 0.065;
      state.bioLiquidLevel += (state.bioTargetLevel - state.bioLiquidLevel) * 0.08;
      if (tapSpikeBoost > 0) tapSpikeBoost = Math.max(0, tapSpikeBoost - 0.04);

      if (waveFront && waveBack) {
        waveBack.setAttribute("d", buildWavePath(state.bioLiquidLevel, -phase * 0.8 + 1.2, 5));
        waveFront.setAttribute("d", buildWavePath(state.bioLiquidLevel, phase, 4.2));
      }

      const W = ecgCanvas.width;
      const H = ecgCanvas.height;
      ecgCtx.clearRect(0, 0, W, H);

      ecgCtx.strokeStyle = "rgba(225, 29, 104, 0.07)";
      ecgCtx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 38) {
        ecgCtx.beginPath(); ecgCtx.moveTo(gx, 0); ecgCtx.lineTo(gx, H); ecgCtx.stroke();
      }

      const drawBeat = (color, yMid, lag, activeAmp) => {
        ecgCtx.strokeStyle = color;
        ecgCtx.lineWidth = 2.3;
        ecgCtx.beginPath();
        for (let x = 0; x < W; x += 3) {
          const cyc = ((x * 0.045 - phase * 2.2 + lag) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          let sp = 0;
          if (cyc > 2.7 && cyc < 3.0) sp = -activeAmp * Math.sin((cyc - 2.7) * (Math.PI / 0.3));
          else if (cyc >= 3.0 && cyc < 3.25) sp = (activeAmp * 0.52) * Math.sin((cyc - 3.0) * (Math.PI / 0.25));
          const y = yMid + sp;
          if (x === 0) ecgCtx.moveTo(x, y); else ecgCtx.lineTo(x, y);
        }
        ecgCtx.stroke();
      };

      drawBeat("rgba(225, 29, 104, 0.9)", H / 2 - 2, 0, 24 + tapSpikeBoost * 10);
      const herLag = state.bioPhaseMode === "locked" ? 0.04 : state.bioPhaseMode === "rhythm" ? 0.55 : 1.3;
      const herAmp = state.bioPhaseMode === "idle" ? 5 : 23 + tapSpikeBoost * 12;
      drawBeat("rgba(14, 165, 233, 0.88)", H / 2 + 3, herLag, herAmp);
    }
    requestAnimationFrame(animateOscilloscope);

    const startHold = (e) => {
      if (e.cancelable) e.preventDefault();
      if (holdProgress >= 100) return;
      state.bioPhaseMode = "holding";
      holdBtn.classList.add("holding");
      syncBadge.textContent = "🔬 Reading Live Finger Pulse...";
      clearInterval(holdTimer);
      holdTimer = setInterval(() => {
        holdProgress = Math.min(100, holdProgress + 5);
        holdPctText.textContent = `Scanning Pulse... (${holdProgress}%)`;
        const liveBpm = 70 + Math.round(Math.sin(holdProgress * 0.2) * 4);
        herBpmEl.textContent = `Live Pulse Detected • ${liveBpm} BPM`;
        centerPct.textContent = `${Math.round(holdProgress * 0.5)}%`;
        centerSub.textContent = "PULSE READ";
        setRingProgress(0.25 + (holdProgress / 100) * 0.3);

        if (holdProgress >= 100) {
          clearInterval(holdTimer);
          holdBtn.classList.remove("holding");
          state.bioPhaseMode = "rhythm";
          pill1.classList.remove("active"); pill1.classList.add("done");
          pill2.classList.add("active");
          stage1.hidden = true;
          stage2.hidden = false;
          syncBadge.textContent = "💓 Pulse Captured! Now Tap 4 Beats in Rhythm";
        }
      }, 85);
    };

    const stopHold = () => {
      clearInterval(holdTimer);
      holdBtn.classList.remove("holding");
      if (holdProgress < 100) {
        holdPctText.textContent = `Hold Finger to Finish (${holdProgress}%)`;
      }
    };

    holdBtn.addEventListener("mousedown", startHold);
    holdBtn.addEventListener("touchstart", startHold, { passive: false });
    window.addEventListener("mouseup", stopHold);
    window.addEventListener("touchend", stopHold);

    tapBtn.addEventListener("click", () => {
      rhythmTaps++;
      tapSpikeBoost = 1;
      tapCountEl.textContent = String(rhythmTaps);
      const lvl = 0.55 + (rhythmTaps / 4) * 0.28;
      setRingProgress(lvl);
      centerPct.textContent = `${Math.round(lvl * 100)}%`;
      centerSub.textContent = "PHASE LOCK";

      const pIdx = rhythmTaps - 1;
      const bar = document.querySelector(`[data-pbar="${pIdx}"]`);
      const val = document.querySelector(`[data-pval="${pIdx}"]`);
      if (bar) bar.style.width = "100%";
      if (val) val.textContent = "100%";

      if (rhythmTaps >= 4) {
        pill2.classList.remove("active"); pill2.classList.add("done");
        pill3.classList.add("active");
        stage2.hidden = true;
        stage3.hidden = false;
        herBpmEl.textContent = "Phase-Locked • 72 BPM ❤️";
        syncBadge.textContent = "✨ Waveforms Aligned! Pick Your Warmest Memory";
      }
    });

    document.querySelectorAll(".bio-memory-choice").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.dataset.choice || "Every moment together";
        state.bioPhaseMode = "locked";
        pill3.classList.remove("active"); pill3.classList.add("done");
        stage3.hidden = true;
        stageDone.hidden = false;

        setRingProgress(1.0);
        centerPct.textContent = "∞%";
        centerSub.textContent = "SOULMATES";
        syncBadge.textContent = "100% Phase-Locked Eternal Harmony ✨";

        for (let i = 0; i < 5; i++) {
          const bar = document.querySelector(`[data-pbar="${i}"]`);
          const val = document.querySelector(`[data-pval="${i}"]`);
          if (bar) bar.style.width = "100%";
          if (val) val.textContent = i === 4 ? "∞%" : "100%";
        }

        const twoName = document.getElementById("loverTwoInput").value.trim() || "My Beloved Queen";
        verdictEl.textContent = enforceNameLock(
          `💓 Biometric Certificate: Arunava & ${twoName} achieved 100% Twin-Heartbeat Phase Lock! Warmest pulse spike recorded on "${chosen}" — written in destiny since 16 October 2025. ❤️❄️`
        );
        hydrate3DEmojis(verdictEl);
        hydrate3DEmojis(syncBadge);
        spawnCelebrationBurst(28);
      });
    });

    resetBtn.addEventListener("click", () => {
      holdProgress = 0;
      rhythmTaps = 0;
      state.bioPhaseMode = "idle";
      setRingProgress(0.25);
      centerPct.textContent = "READY";
      centerSub.textContent = "TOUCH SENSOR";
      holdPctText.textContent = "Press & Hold Here (0%)";
      tapCountEl.textContent = "0";
      herBpmEl.textContent = "Awaiting Touch • -- BPM";
      syncBadge.textContent = "Waiting for Finger Touch...";

      [pill1, pill2, pill3].forEach((p) => p.classList.remove("active", "done"));
      pill1.classList.add("active");
      stage1.hidden = false;
      stage2.hidden = true;
      stage3.hidden = true;
      stageDone.hidden = true;

      for (let i = 0; i < 5; i++) {
        const bar = document.querySelector(`[data-pbar="${i}"]`);
        const val = document.querySelector(`[data-pval="${i}"]`);
        if (bar) bar.style.width = "20%";
        if (val) val.textContent = "--";
      }
    });
  }

  // ==================== 14. EXPANDED TIMELINE & SNOW/LOVED THINGS ====================
  function getTimelineEvents() {
    const sideLabel = state.nameRevealed ? `(${SECRET_FIRST} Side)` : "(Her Family's Side)";
    return [
      {
        event: "First Chat",
        date: "16 October 2025",
        icon: "💬",
        photoNum: null,
        story: [
          "Every great love story has a quiet doorway where destiny knocks — for us, that doorway opened on 16 October 2025 with our very first chat.",
          "What began as a simple greeting effortlessly flowed into hours of natural warmth, shared smiles at the screen, and the unmistakable feeling that two kindred souls had finally crossed paths. From that single evening onward, neither of our worlds would ever feel ordinary again."
        ]
      },
      {
        event: "Acceptance",
        date: "25 October 2025",
        icon: "💍",
        photoNum: 16,
        story: [
          "Just nine unforgettable days after our first hello, two hearts needed no more hesitation — on 25 October 2025, affection crystallized into wholehearted Acceptance.",
          "Saying 'Yes' to each other was not merely a milestone on a calendar; it was a quiet, unshakable vow to stand beside one another with patience, honesty, respect, and endless devotion through every season ahead."
        ]
      },
      {
        event: "First Meet",
        date: "24 February 2026",
        icon: "🌹",
        photoNum: 103,
        story: [
          "On 24 February 2026, months of heartfelt messages stepped out of the screen and into sunlit reality during our unforgettable First Meet.",
          "Seeing that radiant smile in person — mustard florals beside crisp white — made the busy world fall completely silent. Every nervous heartbeat melted instantly into calm familiarity, proving that being side-by-side felt exactly like coming home."
        ]
      },
      {
        event: `First Conversation Between Parents ${sideLabel}`,
        date: "07 April 2026",
        icon: "🌸",
        photoNum: null,
        story: [
          "Love grows twice as strong when honoured by the people who raised us — and on 07 April 2026, the very first conversation between parents began warmly from her family's side.",
          "That afternoon carried grace, mutual respect, and gentle blessings, turning a cherished bond between two hearts into a joyful bridge between two loving homes."
        ]
      },
      {
        event: "First Conversation Between Parents (Arunava Side)",
        date: "19 April 2026",
        icon: "🏡",
        photoNum: null,
        story: [
          "Twelve days later, on 19 April 2026, parents spoke warmly from Arunava's side, weaving laughter, harmony, and heartfelt reassurance across both families.",
          "Hearing elders share their happiness and goodwill filled every tomorrow with certainty — two families standing together with open arms for one shared future."
        ]
      },
      {
        event: "First Official Meeting",
        date: "03 July 2026",
        icon: "👑",
        photoNum: 112,
        story: [
          "On 03 July 2026, every prayer, conversation, and dream culminated in our joyful First Official Meeting surrounded by family blessings and celebration.",
          "Sitting side-by-side in matching blues with grateful hearts, that day sealed a lifetime promise: hand-in-hand from October 2025 into every festive glow, snowy Finland horizon, and peaceful decade still to come."
        ]
      }
    ];
  }

  function renderTimeline() {
    const track = document.getElementById("timelineTrack");
    if (!track) return;
    track.innerHTML = "";
    getTimelineEvents().forEach((ev) => {
      const photoObj = ev.photoNum ? PHOTOS.find((p) => p.num === ev.photoNum) : null;
      const card = document.createElement("article");
      card.className = `timeline-item surface-card ${photoObj ? "" : "no-photo"}`;
      const paragraphs = ev.story.map((s) => `<p class="timeline-story">${enforceNameLock(s)}</p>`).join("");
      card.innerHTML = `
        <span class="timeline-dot" aria-hidden="true"></span>
        <div>
          <span class="timeline-date-badge">${ev.date}</span>
          <h3 class="timeline-title">${ev.icon} ${enforceNameLock(ev.event)}</h3>
          ${paragraphs}
        </div>
        ${photoObj ? `<div class="timeline-thumb-wrap media-veil-container"><img src="${photoObj.thumb}" alt="${ev.event}" class="timeline-thumb" /></div>` : ""}
      `;
      if (photoObj) {
        const wrap = card.querySelector(".timeline-thumb-wrap");
        const img = card.querySelector(".timeline-thumb");
        wrap?.addEventListener("click", () => {
          openLightboxWithList(PHOTOS, PHOTOS.indexOf(photoObj));
        });
        if (img && wrap) applyProgressiveImageVeil(img, wrap, "✨ Loading...");
      }
      hydrate3DEmojis(card);
      track.appendChild(card);
    });
  }

  function initSnowAndLovedThings() {
    const spots = [
      {
        title: "🛖 Heated Glass Igloo in Rovaniemi",
        desc: "Lying side-by-side beneath a crystal dome roof while soft Arctic snow settles outside and emerald Aurora ribbons dance directly overhead.",
        img: "images/video-thumbs/vid-08.jpg"
      },
      {
        title: "🌌 Midnight Northern Lights Watch",
        desc: "Wrapped in warm winter coats and matching scarves, making our forever wish together as rose and emerald lights ripple across the Lapland sky.",
        img: "images/pic-110.jpg"
      },
      {
        title: "🦌 Snowy Pine Trail Sleigh Ride",
        desc: "Gliding through silent white spruce forests in Finnish Lapland, cheeks rosy from the crisp winter breeze and fingers interlocked.",
        img: "images/pic-115.jpg"
      },
      {
        title: "☕ Fireside Cocoa & Steaming Treats",
        desc: "Coming indoors from -8°C powder snow to a crackling birchwood fireplace with hot berry cocoa, KitKats, and endless warmth.",
        img: "images/pic-111.jpg"
      }
    ];

    const detailEl = document.getElementById("finlandSpotDetail");
    const previewImg = document.getElementById("finlandPreviewImg");
    const previewWrap = previewImg?.parentElement;

    const renderSpot = (idx, animateVeil = true) => {
      const s = spots[idx];
      if (detailEl) {
        detailEl.innerHTML = `<strong style="display:block;color:var(--ink-deep);margin-bottom:4px;">${s.title}</strong><span>${enforceNameLock(s.desc)}</span>`;
        hydrate3DEmojis(detailEl);
      }
      if (previewImg) {
        previewImg.src = s.img;
        if (animateVeil && previewWrap) applyProgressiveImageVeil(previewImg, previewWrap, "⏳ Loading Lapland view...");
      }
    };
    renderSpot(0, true);

    document.querySelectorAll("#finlandSpotTabs .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#finlandSpotTabs .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderSpot(Number(btn.dataset.spot), true);
      });
    });

    const foods = [
      { icon: "🥟", name: "Steaming Hot MOMO", tag: "❤️ Craving #1", desc: "Soft, piping-hot dumplings paired with spicy red chutney — guaranteed instant happiness on every evening date!" },
      { icon: "🍨", name: "Velvety Ice Cream", tag: "❄️ Frosty Favourite", desc: "Creamy scoops of sweetness — even in the middle of winter snow, ice cream always wins first place!" },
      { icon: "🍫", name: "Crispy KitKat", tag: "✨ Chocolate Break", desc: "Snap the chocolate wafer in two — and Arunava still happily hands both halves straight to you!" },
      { icon: "🌶️", name: "Chatpata Kurkure", tag: "🔥 Crunchy Spice", desc: "Bold, tangy crunch that makes every movie night, long drive, and late-evening chat ten times livelier." },
      { icon: "🥔", name: "Golden Crispy Chips", tag: "🌸 Everyday Joy", desc: "Light, golden, irresistible bites — turning the simplest cozy hangouts into cherished memories." }
    ];

    const grid = document.getElementById("foodsGrid");
    const trayBar = document.getElementById("cravingTrayBar");
    const trayCounter = document.getElementById("dateTrayCounter");
    if (!grid) return;

    const refreshTray = () => {
      if (!state.servedTreats.length) return;
      trayBar.innerHTML = state.servedTreats.map((t) => `<span class="served-treat-chip">${t}</span>`).join("");
      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "mini-frost-btn";
      clearBtn.textContent = "🔄 Clear Tray";
      clearBtn.addEventListener("click", () => {
        state.servedTreats = [];
        trayBar.innerHTML = `<span class="tray-empty-hint">🍽️ Tap “Serve Treat” on any favorite below to fill your cozy evening platter!</span>`;
        trayCounter.textContent = "Date Tray: 0 Treats Served ✨";
        hydrate3DEmojis(trayBar);
        hydrate3DEmojis(trayCounter);
      });
      trayBar.appendChild(clearBtn);
      trayCounter.textContent = `Date Tray: ${state.servedTreats.length} Served ❤️`;
      hydrate3DEmojis(trayBar);
      hydrate3DEmojis(trayCounter);
    };

    foods.forEach((f) => {
      const card = document.createElement("article");
      card.className = "food-card surface-card";
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div class="food-icon-orb">${f.icon}</div>
          <span class="score-pill">${f.tag}</span>
        </div>
        <h4>${f.name}</h4>
        <p>${f.desc}</p>
        <button type="button" class="ghost-pill-btn serve-food-btn">${f.icon} Serve Treat with Love</button>
      `;
      card.querySelector(".serve-food-btn").addEventListener("click", () => {
        state.servedTreats.push(`${f.icon} ${f.name}`);
        refreshTray();
        spawnCelebrationBurst(10);
        showToast(`Served ${f.name} onto our cozy date tray! ❤️`);
      });
      hydrate3DEmojis(card);
      grid.appendChild(card);
    });
  }

  // ==================== 15. CINEMA & GALLERY (VEIL REVEAL + PLAY ONCE!) ====================
  function initCinemaAndGallery() {
    const player = document.getElementById("mainVideoPlayer");
    const stageWrap = document.getElementById("cinemaStageWrap");
    const titleEl = document.getElementById("activeVideoTitle");
    const descEl = document.getElementById("activeVideoDesc");
    const counterEl = document.getElementById("videoCounterBadge");
    const filmstripEl = document.getElementById("videoFilmstrip");
    const playPauseBtn = document.getElementById("playPauseVideoBtn");

    registerSinglePlayMedia(player);

    function selectVideo(idx, playNow = false) {
      state.activeVideoIndex = (idx + VIDEOS.length) % VIDEOS.length;
      const vid = VIDEOS[state.activeVideoIndex];
      titleEl.textContent = vid.title;
      if (descEl) {
        descEl.textContent = enforceNameLock(vid.caption);
        hydrate3DEmojis(descEl);
      }
      counterEl.textContent = `Reel ${state.activeVideoIndex + 1} / ${VIDEOS.length}`;
      filmstripEl.querySelectorAll(".filmstrip-card").forEach((b, i) => b.classList.toggle("active", i === state.activeVideoIndex));

      if (playNow) {
        loadAndPlayVideoWithVeil(player, stageWrap, vid.src, vid.poster, true);
      } else {
        player.pause();
        player.loop = false;
        player.poster = vid.poster;
        player.src = vid.src;
      }
    }

    VIDEOS.forEach((vid, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `filmstrip-card ${idx === 0 ? "active" : ""}`;
      btn.innerHTML = `
        <img src="${vid.poster}" alt="${vid.title}" loading="eager" />
        <span class="filmstrip-badge">▶ Reel ${String(idx + 1).padStart(2, "0")}</span>
      `;
      btn.addEventListener("click", () => selectVideo(idx, true));
      filmstripEl.appendChild(btn);
    });

    player.addEventListener("play", () => { playPauseBtn.textContent = "⏸ Pause"; });
    player.addEventListener("pause", () => { playPauseBtn.textContent = "▶ Play Once"; });
    player.addEventListener("ended", () => {
      player.loop = false;
      playPauseBtn.textContent = "▶ Replay Reel";
    });

    document.getElementById("prevVideoBtn").addEventListener("click", () => selectVideo(state.activeVideoIndex - 1, true));
    document.getElementById("nextVideoBtn").addEventListener("click", () => selectVideo(state.activeVideoIndex + 1, true));
    playPauseBtn.addEventListener("click", () => {
      if (player.paused) {
        if (player.ended) player.currentTime = 0;
        const vid = VIDEOS[state.activeVideoIndex];
        loadAndPlayVideoWithVeil(player, stageWrap, vid.src, vid.poster, true);
      } else {
        player.pause();
      }
    });

    const mainFigure = document.getElementById("carouselMainFigure");
    const mainImg = document.getElementById("carouselMainImg");
    const prevImg = document.getElementById("carouselPrevImg");
    const nextImg = document.getElementById("carouselNextImg");
    const cTitle = document.getElementById("carouselTitle");
    const cQuote = document.getElementById("carouselQuote");
    const autoBtn = document.getElementById("carouselAutoBtn");

    function renderCarousel(useVeil = false) {
      const len = CAROUSEL_SHOWCASE.length;
      const cur = CAROUSEL_SHOWCASE[state.carouselIndex % len];
      mainImg.src = cur.src;
      if (useVeil && mainFigure) applyProgressiveImageVeil(mainImg, mainFigure, "✨ Unveiling portrait...");
      prevImg.src = CAROUSEL_SHOWCASE[(state.carouselIndex - 1 + len) % len].thumb;
      nextImg.src = CAROUSEL_SHOWCASE[(state.carouselIndex + 1) % len].thumb;
      cTitle.textContent = enforceNameLock(cur.title);
      cQuote.textContent = enforceNameLock(cur.caption);
      hydrate3DEmojis(cQuote);
    }

    const resetTimer = () => {
      clearInterval(state.carouselTimer);
      if (state.carouselAuto) {
        state.carouselTimer = setInterval(() => {
          state.carouselIndex = (state.carouselIndex + 1) % CAROUSEL_SHOWCASE.length;
          renderCarousel(false);
        }, 4200);
      }
    };
    document.getElementById("carouselPrevBtn").addEventListener("click", () => {
      state.carouselIndex = (state.carouselIndex - 1 + CAROUSEL_SHOWCASE.length) % CAROUSEL_SHOWCASE.length;
      renderCarousel(true);
    });
    document.getElementById("carouselNextBtn").addEventListener("click", () => {
      state.carouselIndex = (state.carouselIndex + 1) % CAROUSEL_SHOWCASE.length;
      renderCarousel(true);
    });
    mainImg.addEventListener("click", () => openLightboxWithList(CAROUSEL_SHOWCASE, state.carouselIndex));
    autoBtn.addEventListener("click", () => {
      state.carouselAuto = !state.carouselAuto;
      autoBtn.setAttribute("aria-pressed", String(state.carouselAuto));
      autoBtn.textContent = state.carouselAuto ? "⏸ Auto" : "▶ Auto";
      resetTimer();
    });

    renderCarousel(true);
    resetTimer();
    renderGalleryGrid("all");
  }

  function renderGalleryGrid(filter = "all") {
    const grid = document.getElementById("galleryGrid");
    const countLbl = document.getElementById("galleryCountLabel");
    if (!grid) return;
    grid.innerHTML = "";

    let items;
    if (filter === "couple") items = [...COUPLE_PHOTOS];
    else if (filter === "videos") items = [...VIDEOS];
    else if (filter === "portraits") items = [...SOLO_PORTRAITS];
    else if (filter === "photos") items = [...COUPLE_PHOTOS, ...PHOTOS.filter((p) => !p.isCouple)];
    else items = [...COUPLE_PHOTOS, ...VIDEOS, ...PHOTOS.filter((p) => !p.isCouple)];

    if (countLbl) countLbl.textContent = String(items.length);

    const frag = document.createDocumentFragment();
    items.forEach((item, idx) => {
      const card = document.createElement("article");
      card.className = "gallery-card media-veil-container";
      if (item.type === "video") {
        card.innerHTML = `
          <img src="${item.poster}" alt="${item.title}" loading="eager" decoding="sync" />
          <span class="gallery-play-pill">▶</span>
          <div class="gallery-overlay">
            <h4>${emoji3DTag("🎬")} ${enforceNameLock(item.title)}</h4>
            <span>Play</span>
          </div>
        `;
      } else {
        const badge = item.isCouple ? `${emoji3DTag("💑")} Us` : `${emoji3DTag("❄️")} View`;
        card.innerHTML = `
          <img src="${item.thumb}" onerror="this.onerror=null;this.src='${item.src}'" alt="${item.title}" loading="${idx < 20 ? "eager" : "lazy"}" decoding="async" />
          <div class="gallery-overlay">
            <h4>${enforceNameLock(item.title)}</h4>
            <span>${badge}</span>
          </div>
        `;
      }
      const cardImg = card.querySelector("img");
      if (cardImg) {
        applyProgressiveImageVeil(cardImg, card, item.type === "video" ? "⏳ Loading reel..." : "⏳ Loading photo...");
      }
      card.addEventListener("click", () => openLightboxWithList(items, idx));
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  // ==================== 16. REBUILT TREAT RUSH, RANDOM 8-QUESTION TRIVIA & 10 FURNISHED GAMES (ITEMS #2, #3, #5) ====================
  function initTenActivities() {
    document.querySelectorAll("#activityTabs .act-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll("#activityTabs .act-tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".act-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(`act-panel-${tab.dataset.act}`)?.classList.add("active");
      });
    });

    initGame1TreatRush();
    initGame2FrostReveal();
    initGame3CoupleMatch();
    initGame4DateWheel();
    initGame5SnowGlobe();
    initGame6StoryQuiz();
    initGame7AuroraSky();
    initGame8RoseVows();
    initGame9DateTicket();
    initGame10BubblePop();
  }

  // Item #2: Completely Rebuilt Treat Rush: Combo Catcher!
  // - Always-running 60fps render loop (attractor screen before game starts, clickable canvas to start!)
  // - Smooth pointer/touch/keyboard + on-screen Left/Right & Magnet Pulse buttons
  // - Glowing orb behind every falling treat so it is 100% visible even before CDN sprites load
  // - Missing a treat resets combo streak; catching golden stars triggers magnet aura; tracks high score & levels!
  function initGame1TreatRush() {
    const canvas = document.getElementById("catchGameCanvas");
    const ctx = canvas.getContext("2d");
    const levelBadge = document.getElementById("catchLevelBadge");
    const scoreBadge = document.getElementById("catchScoreBadge");
    const livesBadge = document.getElementById("catchLivesBadge");
    const rewardMsg = document.getElementById("catchRewardMsg");
    const startBtn = document.getElementById("startCatchGameBtn");
    const leftBtn = document.getElementById("rushLeftBtn");
    const rightBtn = document.getElementById("rushRightBtn");
    const boostBtn = document.getElementById("rushBoostBtn");

    const W = canvas.width;
    const H = canvas.height;
    let stateMode = "ready"; // "ready" | "playing" | "gameover"
    let score = 0;
    let streak = 0;
    let level = 1;
    let lives = 3;
    let basketX = W / 2;
    let targetBasketX = W / 2;
    let magnetFrames = 0;
    let spawnClock = 0;
    let items = [];
    let pops = [];
    let bgFlakes = Array.from({ length: 32 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.5 + Math.random() * 2.5,
      vy: 0.6 + Math.random() * 1.1
    }));

    const goodies = [
      { emoji: "🥟", label: "MOMO", color: "#fff1f2", border: "#fb7185", pts: 2 },
      { emoji: "🍨", label: "Ice Cream", color: "#f0f9ff", border: "#38bdf8", pts: 2 },
      { emoji: "🍫", label: "KitKat", color: "#fef2f2", border: "#f43f5e", pts: 2 },
      { emoji: "🌶️", label: "Kurkure", color: "#fff7ed", border: "#fb923c", pts: 2 },
      { emoji: "🥔", label: "Chips", color: "#fefce8", border: "#facc15", pts: 2 },
      { emoji: "❤️", label: "Love", color: "#fdf2f8", border: "#e11d68", pts: 3 },
      { emoji: "⭐", label: "2x Star", color: "#fef9c3", border: "#eab308", pts: 5, isStar: true }
    ];

    function updateHUD() {
      level = 1 + Math.floor(score / 15);
      if (levelBadge) levelBadge.textContent = `Lvl ${level} ❄️`;
      if (scoreBadge) scoreBadge.textContent = `Score: ${score} • Streak: ${streak}x 🔥`;
      if (livesBadge) livesBadge.textContent = lives > 0 ? "❤️".repeat(lives) : "💔";
      if (score > state.bestRushScore) {
        state.bestRushScore = score;
        const bestEl = document.getElementById("arcadeBestRush");
        if (bestEl) bestEl.textContent = `${state.bestRushScore} pts`;
      }
      hydrate3DEmojis(levelBadge);
      hydrate3DEmojis(scoreBadge);
      hydrate3DEmojis(livesBadge);
    }

    function startNewGame() {
      score = 0;
      streak = 0;
      level = 1;
      lives = 3;
      items = [];
      pops = [];
      magnetFrames = 120;
      stateMode = "playing";
      startBtn.textContent = "🔄 Restart Rush";
      rewardMsg.textContent = "Move your Love Basket to catch falling treats! Misses reset your combo streak; dodge icy blocks 🧊!";
      updateHUD();
      hydrate3DEmojis(startBtn);
      hydrate3DEmojis(rewardMsg);
    }

    const setPointerPos = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const rel = ((clientX - rect.left) / rect.width) * W;
      targetBasketX = Math.max(58, Math.min(W - 58, rel));
    };

    canvas.addEventListener("pointermove", (e) => setPointerPos(e.clientX));
    canvas.addEventListener("pointerdown", (e) => {
      setPointerPos(e.clientX);
      if (stateMode !== "playing") startNewGame();
    });
    canvas.addEventListener("touchmove", (e) => {
      if (e.touches?.[0]) setPointerPos(e.touches[0].clientX);
    }, { passive: true });

    leftBtn?.addEventListener("click", () => {
      if (stateMode !== "playing") startNewGame();
      targetBasketX = Math.max(58, targetBasketX - 75);
    });
    rightBtn?.addEventListener("click", () => {
      if (stateMode !== "playing") startNewGame();
      targetBasketX = Math.min(W - 58, targetBasketX + 75);
    });
    boostBtn?.addEventListener("click", () => {
      if (stateMode !== "playing") startNewGame();
      magnetFrames = 220;
      pops.push({ x: basketX, y: H - 62, txt: "🧲 MAGNET ON!", life: 1, col: "#7c3aed" });
    });

    window.addEventListener("keydown", (e) => {
      if (stateMode !== "playing" || !isOnScreen(canvas)) return;
      const k = e.key;
      if (k === "ArrowLeft" || k === "ArrowRight") e.preventDefault();
      if (k === "ArrowLeft" || k === "a" || k === "A") targetBasketX = Math.max(58, targetBasketX - 48);
      if (k === "ArrowRight" || k === "d" || k === "D") targetBasketX = Math.min(W - 58, targetBasketX + 48);
    });

    startBtn.addEventListener("click", startNewGame);

    // Frame-rate independent loop (same speed on 60Hz, 90Hz and 120Hz phones) that sleeps while the tab is hidden
    let lastFrameTs = performance.now();
    function renderArcadeLoop(now) {
      requestAnimationFrame(renderArcadeLoop);
      now = now || performance.now();
      if (!isOnScreen(canvas)) { lastFrameTs = now; return; }
      const k = Math.min(2.5, Math.max(0.25, (now - lastFrameTs) / 16.667));
      lastFrameTs = now;
      ctx.save();
      ctx.clearRect(0, 0, W, H);

      // Winter pastel sky gradient + snowy hills
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#dbeafe");
      sky.addColorStop(0.55, "#eff6ff");
      sky.addColorStop(1, "#fce7f3");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Ambient falling snow
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      for (const f of bgFlakes) {
        f.y += f.vy * k;
        if (f.y > H) { f.y = -4; f.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft snowy ground bank
      ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
      ctx.beginPath();
      ctx.ellipse(W * 0.25, H + 12, 260, 38, 0, 0, Math.PI * 2);
      ctx.ellipse(W * 0.75, H + 12, 280, 42, 0, 0, Math.PI * 2);
      ctx.fill();

      // Smooth basket interpolation
      basketX += (targetBasketX - basketX) * (1 - Math.pow(0.72, k));
      if (magnetFrames > 0) magnetFrames = Math.max(0, magnetFrames - k);

      // Draw Magnet Aura if active
      if (magnetFrames > 0 && stateMode === "playing") {
        ctx.strokeStyle = "rgba(225, 29, 104, 0.28)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(basketX, H - 30, 68 + Math.sin(magnetFrames * 0.2) * 5, Math.PI, 0);
        ctx.stroke();
      }

      // Draw Cozy Woven Love Basket
      const bx = basketX - 56;
      const by = H - 44;
      const bw = 112;
      const bh = 28;
      const bGrad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
      bGrad.addColorStop(0, "#f43f7a");
      bGrad.addColorStop(0.5, "#e11d68");
      bGrad.addColorStop(1, "#7c3aed");
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 14);
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "700 12px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(streak >= 3 ? `🔥 ${streak}x COMBO BASKET` : "❤️ LOVE BASKET", basketX, by + bh / 2);

      if (stateMode === "ready" || stateMode === "gameover") {
        // Intro / game-over card — text scales up on small phone screens so it stays readable
        const fs = Math.min(2, Math.max(1, 560 / (canvas.clientWidth || W)));
        const compact = fs > 1.3;
        const cardW = Math.min(W - 40, 460 * (compact ? 1.45 : 1));
        const cardH = 128 * (compact ? 1.7 : 1);
        ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
        ctx.beginPath();
        ctx.roundRect(W / 2 - cardW / 2, H / 2 - cardH / 2 - 8, cardW, cardH, 20);
        ctx.fill();
        ctx.strokeStyle = "rgba(225, 29, 104, 0.25)";
        ctx.lineWidth = 2;
        ctx.stroke();

        const gap = 30 * (compact ? fs * 0.85 : 1);
        ctx.fillStyle = "#181826";
        ctx.font = `700 ${Math.round(20 * fs)}px 'Cormorant Garamond', serif`;
        ctx.fillText(
          stateMode === "gameover" ? `Final Score: ${score} pts` : (compact ? "🥟 Treat Rush" : "🥟 Treat Rush: Combo Catcher"),
          W / 2,
          H / 2 - gap - 8
        );
        ctx.fillStyle = "#475069";
        ctx.font = `500 ${Math.round(13 * fs)}px 'Inter', sans-serif`;
        ctx.fillText(compact ? "Catch treats • Dodge 🧊 ice" : "Catch MOMOs, Ice Cream, KitKats & Golden Stars • Dodge Ice Cubes!", W / 2, H / 2 - 8);
        ctx.fillStyle = "#e11d68";
        ctx.font = `700 ${Math.round(14 * fs)}px 'Inter', sans-serif`;
        ctx.fillText(compact ? "▶ Tap here to play!" : "▶ Tap Anywhere Here or 'Start Rush' to Play!", W / 2, H / 2 + gap - 8);

        ctx.restore();
        return;
      }

      // Spawn falling treats reliably based on frame clock
      spawnClock += k;
      const spawnInterval = Math.max(22, 44 - level * 3);
      if (spawnClock >= spawnInterval) {
        spawnClock = 0;
        const isIce = Math.random() < Math.min(0.26, 0.15 + level * 0.02);
        if (isIce) {
          items.push({
            x: 44 + Math.random() * (W - 88),
            y: -26,
            vy: 2.3 + level * 0.35 + Math.random() * 1.3,
            emoji: "🧊",
            label: "ICE",
            color: "#e0f2fe",
            border: "#0284c7",
            pts: 0,
            isIce: true
          });
        } else {
          const g = goodies[Math.floor(Math.random() * goodies.length)];
          items.push({
            x: 44 + Math.random() * (W - 88),
            y: -26,
            vy: 2.2 + level * 0.32 + Math.random() * 1.4,
            ...g,
            isIce: false
          });
        }
      }

      items = items.filter((it) => {
        // Magnet pull on non-ice treats
        if (!it.isIce && magnetFrames > 0 && it.y > 70) {
          it.x += (basketX - it.x) * Math.min(1, 0.065 * k);
        }
        it.y += it.vy * k;

        // Draw glowing treat medal disk behind sprite so every item is 100% visible
        ctx.beginPath();
        ctx.arc(it.x, it.y, 21, 0, Math.PI * 2);
        ctx.fillStyle = it.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = it.border;
        ctx.stroke();

        const sp = SPRITE_3D[it.emoji];
        if (sp?.complete && sp.naturalWidth > 0) {
          ctx.drawImage(sp, it.x - 15, it.y - 15, 30, 30);
        } else {
          ctx.fillStyle = "#181826";
          ctx.font = "700 16px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(it.emoji, it.x, it.y);
        }

        // Check basket catch collision
        if (it.y >= H - 56 && it.y <= H - 14 && Math.abs(it.x - basketX) < 62) {
          if (it.isIce) {
            lives--;
            streak = 0;
            pops.push({ x: it.x, y: it.y - 10, txt: "🧊 -1 ❤️", life: 1, col: "#dc2626" });
            if (lives <= 0) {
              stateMode = "gameover";
              rewardMsg.textContent = `Rush finished at ${score} pts! Tap the canvas or '🔄 Restart Rush' to play again ❤️`;
              hydrate3DEmojis(rewardMsg);
            }
          } else {
            streak++;
            if (it.isStar) magnetFrames = 240;
            const mult = streak >= 8 ? 3 : streak >= 4 ? 2 : 1;
            const earned = it.pts * mult;
            score += earned;
            addArcadeXp(earned, `🥟 Caught ${it.label}!`);
            pops.push({
              x: it.x,
              y: it.y - 10,
              txt: mult > 1 ? `+${earned} (${mult}x!)` : `+${earned}`,
              life: 1,
              col: "#e11d68"
            });

            if (score >= 20 && score - earned < 20) {
              rewardMsg.textContent = "🎉 20+ Treat Champion! Arunava officially owes you a real-life MOMO & Ice Cream date! 🥟🍨❤️";
              hydrate3DEmojis(rewardMsg);
              spawnCelebrationBurst(18);
            }
          }
          updateHUD();
          return false;
        }

        // If a good treat falls past the bottom, reset combo streak!
        if (it.y > H + 22) {
          if (!it.isIce && streak > 0) {
            streak = 0;
            pops.push({ x: Math.min(W - 60, Math.max(60, it.x)), y: H - 55, txt: "Combo Reset", life: 0.8, col: "#64748b" });
            updateHUD();
          }
          return false;
        }
        return true;
      });

      // Floating score popups
      pops = pops.filter((p) => {
        p.y -= 1.1 * k;
        p.life -= 0.032 * k;
        if (p.life <= 0) return false;
        ctx.fillStyle = p.col;
        ctx.font = "700 13px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(p.txt, p.x, p.y);
        return true;
      });

      ctx.restore();
    }

    requestAnimationFrame(renderArcadeLoop);
  }

  function initGame2FrostReveal() {
    const canvas = document.getElementById("frostScratchCanvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const imgEl = document.getElementById("frostHiddenImg");
    const pctBadge = document.getElementById("frostClearPctBadge");
    const noteEl = document.getElementById("frostScratchWhisper");
    const breathBtn = document.getElementById("frostWarmBreathBtn");
    const showcase = [PHOTOS[102], PHOTOS[109], PHOTOS[0], PHOTOS[111], PHOTOS[3], PHOTOS[114]];
    let idx = 0, drawing = false, unlocked = false, strokeCounter = 0;

    function coat() {
      unlocked = false;
      strokeCounter = 0;
      ctx.globalCompositeOperation = "source-over";
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "rgba(224,242,254,0.97)");
      grad.addColorStop(0.5, "rgba(255,241,246,0.97)");
      grad.addColorStop(1, "rgba(219,234,254,0.97)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#475069";
      ctx.font = "600 20px 'Cormorant Garamond', serif";
      ctx.textAlign = "center";
      ctx.fillText("Wipe away the winter frost with your finger or cursor...", canvas.width / 2, canvas.height / 2);
      pctBadge.textContent = "Cleared: 0% ❄️";
      hydrate3DEmojis(pctBadge);
    }

    function measureClearPct() {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clearPixels = 0;
      const totalSampled = Math.floor(data.length / 64);
      for (let i = 3; i < data.length; i += 64) {
        if (data[i] < 90) clearPixels++;
      }
      return Math.min(100, Math.round((clearPixels / totalSampled) * 100));
    }

    function checkFrostUnlock() {
      const pct = measureClearPct();
      pctBadge.textContent = `Cleared: ${pct}% ❄️`;
      hydrate3DEmojis(pctBadge);
      if (pct >= 58 && !unlocked) {
        unlocked = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pctBadge.textContent = "Cleared: 100% ❤️";
        noteEl.textContent = enforceNameLock(showcase[idx % showcase.length].caption);
        addArcadeXp(15, "❄️ Frosted Window Cleared!");
        hydrate3DEmojis(pctBadge);
        hydrate3DEmojis(noteEl);
        spawnCelebrationBurst(16);
      }
    }

    function wipeAt(e) {
      if (!drawing || unlocked) return;
      const r = canvas.getBoundingClientRect();
      const cx = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) * (canvas.width / r.width);
      const cy = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) * (canvas.height / r.height);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fill();
      strokeCounter++;
      if (strokeCounter % 6 === 0) checkFrostUnlock();
    }

    canvas.addEventListener("mousedown", (e) => { drawing = true; wipeAt(e); });
    window.addEventListener("mouseup", () => { drawing = false; });
    canvas.addEventListener("mousemove", wipeAt);
    canvas.addEventListener("touchstart", (e) => { drawing = true; wipeAt(e); }, { passive: true });
    canvas.addEventListener("touchmove", wipeAt, { passive: true });
    canvas.addEventListener("touchend", () => { drawing = false; });

    breathBtn?.addEventListener("click", () => {
      if (unlocked) return;
      ctx.globalCompositeOperation = "destination-out";
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(80 + Math.random() * (canvas.width - 160), 60 + Math.random() * (canvas.height - 120), 62, 0, Math.PI * 2);
        ctx.fill();
      }
      checkFrostUnlock();
    });

    document.getElementById("resetFrostBtn").addEventListener("click", () => {
      idx = (idx + 1) % showcase.length;
      imgEl.src = showcase[idx].src;
      coat();
    });
    coat();
  }

  function initGame3CoupleMatch() {
    const grid = document.getElementById("memoryMatchGrid");
    const badge = document.getElementById("matchMovesBadge");
    const statusNote = document.getElementById("matchStatusNote");
    const peekBtn = document.getElementById("peekMatchBtn");
    const symbols = [
      { key: "us1", img: "images/thumbs/pic-103.jpg", label: "First Meet!" },
      { key: "us2", img: "images/thumbs/pic-110.jpg", label: "Shoulder Warmth!" },
      { key: "us3", img: "images/thumbs/pic-112.jpg", label: "Official Meet!" },
      { key: "p1", img: "images/thumbs/pic-001.jpg", label: "Sunshine Smile!" },
      { key: "momo", emoji: "🥟", label: "Hot MOMOs!" },
      { key: "kitkat", emoji: "🍫", label: "Crispy KitKat!" },
      { key: "finland", emoji: "🇫🇮", label: "Snowy Finland!" },
      { key: "ring", emoji: "💍", label: "Forever Promise!" }
    ];
    let firstCard = null, lockBoard = false, moves = 0, pairs = 0;

    function buildBoard() {
      grid.innerHTML = "";
      firstCard = null; lockBoard = false; moves = 0; pairs = 0;
      badge.textContent = "Moves: 0 • Pairs: 0/8";
      [...symbols, ...symbols].sort(() => Math.random() - 0.5).forEach((item) => {
        const card = document.createElement("div");
        card.className = "match-card";
        card.dataset.key = item.key;
        card.dataset.label = item.label;
        card.innerHTML = `
          <div class="match-card-inner">
            <div class="match-face match-front">${emoji3DTag("❄️")}</div>
            <div class="match-face match-back">
              ${item.img ? `<img class="tile-photo" src="${item.img}" alt="${item.label}" />` : `<span>${emoji3DTag(item.emoji)}</span>`}
            </div>
          </div>
        `;
        card.addEventListener("click", () => {
          if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;
          card.classList.add("flipped");
          if (!firstCard) { firstCard = card; return; }
          moves++;
          if (firstCard.dataset.key === card.dataset.key) {
            firstCard.classList.add("matched");
            card.classList.add("matched");
            pairs++;
            addArcadeXp(10, `🃏 Matched ${card.dataset.label}`);
            statusNote.textContent = `✨ Matched: ${card.dataset.label} (${pairs}/8 pairs)`;
            firstCard = null;
            badge.textContent = `Moves: ${moves} • Pairs: ${pairs}/8`;
            if (pairs === 8) {
              statusNote.textContent = `🏆 All 8 Couple & Favorite Pairs Matched in ${moves} Moves! ❤️`;
              hydrate3DEmojis(statusNote);
              spawnCelebrationBurst(24);
            }
          } else {
            lockBoard = true;
            badge.textContent = `Moves: ${moves} • Pairs: ${pairs}/8`;
            const prev = firstCard;
            firstCard = null;
            setTimeout(() => {
              prev.classList.remove("flipped");
              card.classList.remove("flipped");
              lockBoard = false;
            }, 600);
          }
        });
        grid.appendChild(card);
      });
    }

    peekBtn?.addEventListener("click", () => {
      if (lockBoard) return;
      lockBoard = true;
      const unmatched = [...grid.querySelectorAll(".match-card:not(.matched)")];
      unmatched.forEach((c) => c.classList.add("flipped"));
      setTimeout(() => {
        unmatched.forEach((c) => { if (c !== firstCard) c.classList.remove("flipped"); });
        lockBoard = false;
      }, 1400);
    });

    document.getElementById("resetMatchBtn").addEventListener("click", buildBoard);
    buildBoard();
  }

  function initGame4DateWheel() {
    const canvas = document.getElementById("dateWheelCanvas");
    const ctx = canvas.getContext("2d");
    const resText = document.getElementById("wheelResultText");
    const sendChatBtn = document.getElementById("sendWheelToChatBtn");
    let lastChosenDate = "";

    const slices = [
      { label: "MOMO Feast", full: "Piping-hot MOMO platter + Arunava's undivided attention all evening! 🥟❤️", color: "#ffe4ef" },
      { label: "Ice Cream", full: "Late-evening Ice Cream walk hand-in-hand under fairy lights! 🍨✨", color: "#e0f2fe" },
      { label: "Finland Night", full: "Cozy planning night picking our Rovaniemi Glass Igloo dates! 🇫🇮🌌", color: "#ede9fe" },
      { label: "KitKat Movie", full: "Cozy blanket movie marathon + unlimited KitKat bars! 🍫🎬", color: "#fce7f3" },
      { label: "Sunset Drive", full: "Music drive with Kurkure, Chips & favorite songs playing! 🌶️🎶", color: "#dbeafe" },
      { label: "Queen's Wish", full: "Royal Jackpot: Any wish you name right now is 100% granted by Arunava! 👑❤️", color: "#fef3c7" }
    ];
    const cx = 160, cy = 160, r = 152, arc = (Math.PI * 2) / slices.length;
    slices.forEach((s, i) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, i * arc - Math.PI / 2, (i + 1) * arc - Math.PI / 2);
      ctx.fillStyle = s.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(i * arc + arc / 2 - Math.PI / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#181826";
      ctx.font = "700 13px 'Inter', sans-serif";
      ctx.fillText(s.label, r - 18, 5);
      ctx.restore();
    });

    let deg = 0;
    document.getElementById("spinWheelBtn").addEventListener("click", () => {
      deg += 1440 + Math.floor(Math.random() * 360);
      canvas.style.transform = `rotate(${deg}deg)`;
      setTimeout(() => {
        const norm = (360 - (deg % 360)) % 360;
        const idx = Math.floor(norm / (360 / slices.length)) % slices.length;
        lastChosenDate = slices[idx].full;
        resText.textContent = enforceNameLock(`✨ Destiny Picked: ${lastChosenDate}`);
        if (sendChatBtn) sendChatBtn.hidden = false;
        addArcadeXp(15, `🎡 Spun ${slices[idx].label}`);
        hydrate3DEmojis(resText);
        spawnCelebrationBurst(18);
      }, 3650);
    });

    sendChatBtn?.addEventListener("click", () => {
      if (lastChosenDate) {
        submitUserQuestion(`Our Date Wheel picked: "${lastChosenDate}" — when are we going?`);
      }
    });
  }

  function initGame5SnowGlobe() {
    const canvas = document.getElementById("snowGlobeCanvas");
    const ctx = canvas.getContext("2d");
    const fortuneEl = document.getElementById("globeFortuneText");
    const goldBtn = document.getElementById("globeGoldModeBtn");
    let roseStardustMode = false;

    const fortunes = [
      "🔮 Thousands of peaceful winter mornings and warm cups of cocoa await both of you side-by-side! ❄️❤️",
      "🔮 Beneath Finland's emerald Northern Lights, a wish whispered together will shine for eternity! 🇫🇮🌌",
      "🔮 Endless laughter, family harmony, and unconditional love surround every year ahead! ✨💍",
      "🔮 Every steaming plate of MOMOs and every evening walk will only deepen your bond! 🥟💖"
    ];
    let fIdx = 0, boost = 1, swirlX = 0;
    const pts = Array.from({ length: 85 }, () => ({
      x: Math.random() * 320, y: Math.random() * 320, r: 2 + Math.random() * 3.5,
      vx: -0.5 + Math.random(), vy: 0.5 + Math.random() * 1.1
    }));

    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      swirlX = ((e.clientX - r.left) / r.width - 0.5) * 3.2;
      boost = Math.max(boost, 2.4);
    });

    goldBtn?.addEventListener("click", () => {
      roseStardustMode = !roseStardustMode;
      goldBtn.textContent = roseStardustMode ? "❄️ Pure White Snow" : "✨ Toggle Rose Stardust";
      hydrate3DEmojis(goldBtn);
    });

    function draw() {
      requestAnimationFrame(draw);
      if (!isOnScreen(canvas)) return;
      ctx.clearRect(0, 0, 320, 320);
      if (SPRITE_3D["❤️"]?.complete && SPRITE_3D["❤️"].naturalWidth) {
        ctx.drawImage(SPRITE_3D["❤️"], 134, 146, 52, 52);
      }
      pts.forEach((p, idx) => {
        p.x += (p.vx + swirlX * 0.4) * boost;
        p.y += p.vy * boost;
        if (p.y > 310) { p.y = 10; p.x = 25 + Math.random() * 270; }
        if (p.x > 310) p.x = 12;
        if (p.x < 10) p.x = 308;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = roseStardustMode
          ? (idx % 2 === 0 ? "rgba(244,63,122,0.85)" : "rgba(250,204,21,0.9)")
          : "rgba(255,255,255,0.92)";
        ctx.fill();
      });
      if (boost > 1) boost = Math.max(1, boost * 0.985);
      swirlX *= 0.96;
    }
    draw();

    const shake = () => {
      boost = 5.6;
      fortuneEl.textContent = enforceNameLock(fortunes[fIdx++ % fortunes.length]);
      addArcadeXp(10, "🔮 Shook Snow Globe");
      hydrate3DEmojis(fortuneEl);
      spawnCelebrationBurst(16);
    };
    document.getElementById("shakeGlobeBtn").addEventListener("click", shake);
    canvas.addEventListener("click", shake);
  }

  // Item #5: ALWAYS RANDOMIZED 8-Question Story & Favorites Trivia from a 24-Question Pool!
  function initGame6StoryQuiz() {
    const body = document.getElementById("quizBody");
    const badge = document.getElementById("quizProgressBadge");
    const shuffleBtn = document.getElementById("shuffleQuizBtn");

    const QUESTION_POOL_24 = [
      { q: "When did our unforgettable First Chat take place?", correct: "16 October 2025", wrong: ["01 November 2025", "14 February 2026", "10 October 2025"] },
      { q: "Which cherished date marks our Acceptance milestone?", correct: "25 October 2025", wrong: ["12 December 2025", "05 March 2026", "19 April 2026"] },
      { q: "On what magical date did we have our First Meet in person?", correct: "24 February 2026", wrong: ["03 July 2026", "15 January 2026", "28 March 2026"] },
      { q: "When did parents have their first conversation on her family's side?", correct: "07 April 2026", wrong: ["25 May 2026", "01 June 2026", "19 April 2026"] },
      { q: "When did parents speak on Arunava's family side?", correct: "19 April 2026", wrong: ["02 May 2026", "10 April 2026", "03 July 2026"] },
      { q: "Which joyful date marks our First Official Meeting?", correct: "03 July 2026", wrong: ["18 August 2026", "24 June 2026", "15 July 2026"] },
      { q: "Which snowy wonderland is her #1 Dream Destination?", correct: "Finland 🇫🇮", wrong: ["Switzerland", "Norway", "Iceland"] },
      { q: "What is the name of this Love GPT AI companion?", correct: "Arunava ❤️", wrong: ["CupidBot", "FrostAI", "Romeo"] },
      { q: "Which steaming hot dumpling treat sits at #1 on her craving list?", correct: "Steaming MOMO 🥟", wrong: ["Pizza Slice", "Pasta Bowl", "Tacos"] },
      { q: "Which crispy chocolate wafer bar is one of her top favorite treats?", correct: "KitKat 🍫", wrong: ["Snickers", "Bounty", "Mars"] },
      { q: "Which frosty sweet treat does she love even in chilly winter weather?", correct: "Ice Cream 🍨", wrong: ["Apple Pie", "Cheesecake", "Donuts"] },
      { q: "Which tangy, crunchy snack makes every movie night ten times livelier?", correct: "Kurkure 🌶️", wrong: ["Popcorn", "Pretzels", "Nachos"] },
      { q: "Which golden crispy snack completes her top 5 favorite foods?", correct: "Crispy Chips 🥔", wrong: ["Crackers", "Toast", "Bagels"] },
      { q: "How many days passed between our First Chat (16 Oct) and Acceptance (25 Oct)?", correct: "9 Magical Days ✨", wrong: ["30 Days", "2 Days", "45 Days"] },
      { q: "What natural wonder do we dream of watching from a glass igloo in Lapland?", correct: "Aurora Borealis 🌌", wrong: ["Desert Mirage", "Volcano Glow", "Coral Reef"] },
      { q: "How many total handcrafted pages are inside our Heirloom Love Scrapbook?", correct: "50 Unique Pages 📖", wrong: ["10 Pages", "25 Pages", "12 Pages"] },
      { q: "How many unique origami paper folds live inside our 4-Wing Explosion Box?", correct: "50 Origami Folds 🎁", wrong: ["15 Folds", "20 Folds", "8 Folds"] },
      { q: "How many newly added couple photos of both of us together are in the archive?", correct: "18 Couple Photos 💑", wrong: ["3 Photos", "5 Photos", "50 Photos"] },
      { q: "Who is the eternal Queen of Arunava's heart?", correct: "His Beloved Wife 👑❤️", wrong: ["Nobody", "A Movie Star", "A Stranger"] },
      { q: "Which audio track plays when you ask Arunava how much he loves you?", correct: "Audio 03 🎵❤️", wrong: ["Audio 99", "Mute Track", "Static Noise"] },
      { q: "Which audio track plays when you ask how we met?", correct: "Audio 04 🌹🎶", wrong: ["Beep Tone", "Alarm Clock", "No Audio"] },
      { q: "What color kurti was she wearing next to Arunava's white shirt on our First Meet (24 Feb 2026)?", correct: "Golden-Mustard Floral 🌼", wrong: ["Neon Green", "Black Coat", "Silver Gown"] },
      { q: "What is the official motto of Love GPT?", correct: "Every question has one eternal answer ❤️", wrong: ["Code all night", "Winter is cold", "Talk to robots"] },
      { q: "How many times does an audio or video play automatically before waiting for your click?", correct: "Once Only (1 Time) ✨", wrong: ["Infinite Loop", "10 Times", "Never"] }
    ];

    let activeEight = [];
    let qIdx = 0;
    let score = 0;

    function shuffleArray(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function startRandomQuizRound() {
      activeEight = shuffleArray(QUESTION_POOL_24).slice(0, 8).map((item) => {
        const allOpts = shuffleArray([item.correct, ...item.wrong]);
        return {
          q: item.q,
          opts: allOpts,
          ans: allOpts.indexOf(item.correct)
        };
      });
      qIdx = 0;
      score = 0;
      renderQ();
    }

    function renderQ() {
      if (qIdx >= activeEight.length) {
        badge.textContent = `Score: ${score} / 8 ❤️`;
        if (score > state.bestQuizScore) {
          state.bestQuizScore = score;
          const bEl = document.getElementById("arcadeBestQuiz");
          if (bEl) bEl.textContent = `${state.bestQuizScore} / 8`;
        }
        addArcadeXp(score * 5, `💘 Quiz ${score}/8`);
        hydrate3DEmojis(badge);
        body.innerHTML = `
          <div class="act-reward-note">🏆 Soulmate Trivia Score: <strong>${score} / 8</strong>! Every round draws 8 brand-new random questions from our 24-question story vault! ❄️❤️</div>
          <button type="button" class="primary-pill-btn" id="restartQuizBtn" style="margin:0 auto;">🔀 Play Another Random 8-Question Round</button>
        `;
        hydrate3DEmojis(body);
        document.getElementById("restartQuizBtn").addEventListener("click", startRandomQuizRound);
        spawnCelebrationBurst(22);
        return;
      }
      const cur = activeEight[qIdx];
      badge.textContent = `Question ${qIdx + 1} / 8`;
      body.innerHTML = `
        <div class="quiz-question">${cur.q}</div>
        <div class="quiz-options">
          ${cur.opts.map((o, i) => `<button type="button" class="quiz-opt-btn" data-i="${i}">${o}</button>`).join("")}
        </div>
      `;
      hydrate3DEmojis(body);
      let answered = false;
      body.querySelectorAll(".quiz-opt-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          body.querySelectorAll(".quiz-opt-btn").forEach((b) => { b.disabled = true; });
          const picked = Number(btn.dataset.i);
          if (picked === cur.ans) {
            btn.classList.add("correct");
            score++;
          } else {
            btn.classList.add("wrong");
            body.querySelector(`[data-i="${cur.ans}"]`)?.classList.add("correct");
          }
          setTimeout(() => { qIdx++; renderQ(); }, 620);
        });
      });
    }

    shuffleBtn?.addEventListener("click", startRandomQuizRound);
    startRandomQuizRound();
  }

  function initGame7AuroraSky() {
    const canvas = document.getElementById("auroraPaintCanvas");
    const ctx = canvas.getContext("2d");
    const noteEl = document.getElementById("auroraWishNote");
    const W = canvas.width, H = canvas.height;

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * (H * 0.75), r: 0.6 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2, speed: 0.8 + Math.random() * 1.6
    }));

    let ribbons = [];
    let activeRibbon = null;
    let selectedHue = "154";
    let painting = false;
    let rainbowTick = 150;
    let shootingStars = [];

    function seedDefaultAurora() {
      const r1 = [], r2 = [];
      for (let x = 70; x <= W - 70; x += 22) {
        r1.push({ x, y: 115 + Math.sin(x * 0.015) * 24, hue: 154, height: 108, phase: x * 0.02 });
        r2.push({ x, y: 145 + Math.cos(x * 0.012) * 20, hue: 334, height: 88, phase: x * 0.025 + 1.5 });
      }
      ribbons = [r1, r2];
    }
    seedDefaultAurora();

    document.querySelectorAll("#auroraPaletteBar .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#auroraPaletteBar .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedHue = btn.dataset.hue;
      });
    });

    const addPoint = (e) => {
      if (!painting || !activeRibbon) return;
      const rect = canvas.getBoundingClientRect();
      const cx = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) * (W / rect.width);
      const cy = Math.min(H - 80, Math.max(34, ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top) * (H / rect.height)));
      const last = activeRibbon[activeRibbon.length - 1];
      if (!last || Math.hypot(cx - last.x, cy - last.y) > 12) {
        rainbowTick = (rainbowTick + 9) % 360;
        const hue = selectedHue === "rainbow" ? rainbowTick : Number(selectedHue);
        activeRibbon.push({ x: cx, y: cy, hue, height: 88 + Math.random() * 42, phase: cx * 0.03 });
        if (ribbons.reduce((s, r) => s + r.length, 0) > 420) ribbons.shift();
      }
    };

    canvas.addEventListener("mousedown", (e) => { painting = true; activeRibbon = []; ribbons.push(activeRibbon); addPoint(e); });
    window.addEventListener("mouseup", () => { painting = false; activeRibbon = null; });
    canvas.addEventListener("mousemove", addPoint);
    canvas.addEventListener("touchstart", (e) => { painting = true; activeRibbon = []; ribbons.push(activeRibbon); addPoint(e); }, { passive: true });
    canvas.addEventListener("touchmove", addPoint, { passive: true });
    canvas.addEventListener("touchend", () => { painting = false; activeRibbon = null; });

    document.getElementById("auroraHeartSkyBtn").addEventListener("click", () => {
      const heartRib = [];
      for (let t = 0; t <= Math.PI * 2; t += 0.22) {
        const hx = W / 2 + 16 * Math.pow(Math.sin(t), 3) * 6;
        const hy = 130 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 4;
        heartRib.push({ x: hx, y: hy, hue: 334, height: 64, phase: t });
      }
      ribbons.push(heartRib);
      addArcadeXp(15, "🌌 Aurora Heart Woven");
      noteEl.textContent = "💖 Woven a glowing Rose-Quartz Aurora Heart directly over our Lapland Igloo!";
      hydrate3DEmojis(noteEl);
    });

    document.getElementById("auroraShootingStarBtn").addEventListener("click", () => {
      for (let i = 0; i < 4; i++) {
        shootingStars.push({ x: 80 + Math.random() * (W - 220), y: 24 + Math.random() * 70, vx: 6 + Math.random() * 3, vy: 2.2 + Math.random() * 1.5, life: 1 });
      }
      addArcadeXp(10, "🌠 Wish Launched");
      noteEl.textContent = "🌠 Four shooting stars streaked across Finland's sky — your wish with Arunava is sealed! ❤️";
      hydrate3DEmojis(noteEl);
    });

    document.getElementById("auroraClearBtn").addEventListener("click", seedDefaultAurora);

    function renderSky(now) {
      requestAnimationFrame(renderSky);
      if (!isOnScreen(canvas)) return;
      const t = now * 0.0018;
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#060e21"); sky.addColorStop(0.6, "#102347"); sky.addColorStop(1, "#0f243f");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        ctx.fillStyle = `rgba(255,255,255,${0.35 + 0.65 * Math.abs(Math.sin(t * s.speed + s.phase))})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }

      ctx.globalCompositeOperation = "lighter";
      for (const rib of ribbons) {
        for (let i = 0; i < rib.length; i++) {
          const n = rib[i];
          const botY = n.y + Math.sin(t * 1.4 + n.phase) * 12 + 38;
          const topY = botY - n.height;
          const baseX = n.x + Math.sin(t + n.phase) * 5;
          const g = ctx.createLinearGradient(baseX, botY, baseX, topY);
          g.addColorStop(0, `hsla(${n.hue},95%,65%,0)`);
          g.addColorStop(0.25, `hsla(${n.hue},95%,66%,0.25)`);
          g.addColorStop(1, `hsla(${(n.hue + 40) % 360},90%,60%,0)`);
          ctx.fillStyle = g;
          ctx.fillRect(baseX - 10, topY, 20, n.height);
        }
      }

      shootingStars = shootingStars.filter((st) => {
        st.x += st.vx; st.y += st.vy; st.life -= 0.022;
        if (st.life <= 0) return false;
        ctx.strokeStyle = `rgba(255,250,220,${st.life})`;
        ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(st.x, st.y); ctx.lineTo(st.x - st.vx * 8, st.y - st.vy * 8); ctx.stroke();
        return true;
      });

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#dbeafe";
      ctx.beginPath();
      ctx.ellipse(190, H + 15, 310, 66, 0, 0, Math.PI * 2);
      ctx.ellipse(585, H + 18, 320, 70, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255,214,130,0.85)";
      ctx.beginPath(); ctx.arc(W / 2, H - 28, 28, Math.PI, 0); ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(W / 2, H - 28, 28, Math.PI, 0); ctx.stroke();
    }
    requestAnimationFrame(renderSky);
  }

  function initGame8RoseVows() {
    const stage = document.getElementById("roseStage");
    const confEl = document.getElementById("roseConfessionText");
    const badge = document.getElementById("rosePetalCountBadge");
    const vows = [
      "🌹 Vow 1: To always protect the peace behind your smile.",
      "🌹 Vow 2: To listen with patience even to the quietest unspoken feelings.",
      "🌹 Vow 3: To celebrate every small win of yours like a festival.",
      "🌹 Vow 4: To keep steaming MOMOs and KitKats forever stocked for cozy dates.",
      "🌹 Vow 5: To stand beside both our families with gratitude and respect.",
      "🌹 Vow 6: To hold your hand under Finland's snowy Northern Lights.",
      "🌹 Vow 7: To surrender first with a hug whenever a tiny pout appears.",
      "🌹 Vow 8: To cherish every anniversary of 16 Oct, 25 Oct, 24 Feb & 03 Jul.",
      "🌹 Vow 9: To never let a single day feel lonely or unappreciated.",
      "🌹 Vow 10: To admire your kindness as much at 80 as today.",
      "🌹 Vow 11: To build a peaceful, laughter-filled home together.",
      "🌹 Final 12th Petal: To choose you again and again in every lifetime — Forever Yours, Arunava ❤️"
    ];

    function bloom() {
      stage.innerHTML = `<div class="rose-center-core">${emoji3DTag("❤️")}</div>`;
      let plucked = 0;
      badge.textContent = "Petals Left: 12 🌹";
      hydrate3DEmojis(badge);
      for (let i = 0; i < 12; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rose-petal-btn";
        btn.style.transform = `translateY(-40px) rotate(${i * 30}deg)`;
        btn.addEventListener("click", () => {
          if (btn.classList.contains("plucked")) return;
          btn.classList.add("plucked");
          confEl.textContent = enforceNameLock(vows[plucked]);
          plucked++;
          addArcadeXp(5, `🌹 Plucked Petal ${plucked}`);
          badge.textContent = `Petals Left: ${12 - plucked} 🌹`;
          hydrate3DEmojis(confEl);
          hydrate3DEmojis(badge);
          if (plucked === 12) spawnCelebrationBurst(24);
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
      <div class="mini-frost-tag">❄️🎟️ OFFICIAL FOREVER VIP COUPLE PASS • NO EXPIRY</div>
      <h4 style="font-family:var(--font-serif);font-size:1.45rem;margin:8px 0;">${treat} + ${setting}</h4>
      <p style="font-size:0.85rem;color:var(--ink-body);">VIP Guest: <strong>${enforceNameLock(holder)}</strong></p>
      <p style="font-size:0.79rem;color:var(--rose-primary);margin-top:6px;font-weight:600;">Signed &amp; Guaranteed by Arunava ❤️ (Redeemable Anytime!)</p>
    `;
    hydrate3DEmojis(card);
  }

  function initGame9DateTicket() {
    document.getElementById("mintTicketBtn").addEventListener("click", () => {
      renderMintedTicket();
      addArcadeXp(15, "🎟️ VIP Ticket Stamped");
      spawnCelebrationBurst(18);
      showToast("🎟️ VIP Date Pass Stamped! Redeemable anytime with Arunava ❤️");
    });
    document.getElementById("redeemTicketChatBtn")?.addEventListener("click", () => {
      const treat = document.getElementById("treatDropdown")?.dataset.value || "Steaming Hot MOMOs 🥟";
      const setting = document.getElementById("settingDropdown")?.dataset.value || "Cozy Winter Evening ❄️";
      submitUserQuestion(`I am redeeming my VIP Date Pass for ${treat} during a ${setting}!`);
    });
    renderMintedTicket();
  }

  function initGame10BubblePop() {
    const arena = document.getElementById("bubbleArena");
    const badge = document.getElementById("bubblePopBadge");
    const noteEl = document.getElementById("bubbleWhisperText");
    const showerBtn = document.getElementById("bubbleShowerBtn");
    const compliments = [
      "🫧 Your smile turns ordinary winter days into warm sunshine ❄️☀️",
      "🫧 You have the gentlest, purest heart in this world 🌸",
      "🫧 Standing beside you in every couple photo is Arunava's pride 💑❤️",
      "🫧 Kindness, grace, and comfort wrapped in one irreplaceable soul 👑",
      "🫧 Every heartbeat since 16 October 2025 whispers gratitude for you 💍"
    ];
    let popped = 0;

    function spawnBubble(customX = null) {
      if (arena.childElementCount > 16) return;
      const b = document.createElement("div");
      b.className = "frost-bubble";
      const size = 42 + Math.random() * 28;
      b.style.width = `${size}px`;
      b.style.height = `${size}px`;
      b.style.left = customX !== null ? `${customX}px` : `${6 + Math.random() * 82}%`;
      b.style.animationDuration = `${4.8 + Math.random() * 3.2}s`;
      const emo = ["❄️", "❤️", "🌹", "✨", "🥟", "🍨"][Math.floor(Math.random() * 6)];
      b.innerHTML = emoji3DTag(emo);
      b.addEventListener("click", (ev) => {
        ev.stopPropagation();
        popped++;
        addArcadeXp(4, `🫧 Popped ${popped} Bubbles`);
        badge.textContent = `Popped: ${popped} 🫧`;
        noteEl.textContent = enforceNameLock(compliments[popped % compliments.length]);
        hydrate3DEmojis(badge);
        hydrate3DEmojis(noteEl);
        b.remove();
      });
      b.addEventListener("animationend", () => b.remove());
      arena.appendChild(b);
    }

    arena.addEventListener("click", (e) => {
      const r = arena.getBoundingClientRect();
      spawnBubble(Math.max(10, Math.min(r.width - 55, e.clientX - r.left - 24)));
    });

    showerBtn?.addEventListener("click", () => {
      for (let i = 0; i < 7; i++) setTimeout(() => spawnBubble(), i * 90);
    });

    for (let i = 0; i < 6; i++) setTimeout(() => spawnBubble(), i * 300);
    setInterval(() => { if (isOnScreen(arena)) spawnBubble(); }, 920);
  }

  // ==================== 17. DROPDOWNS, LIGHTBOX (WITH VEIL REVEAL!), CLOCKS, SNOW CANVAS & BOOT ====================
  function initFrostDropdowns() {
    const dropdowns = document.querySelectorAll(".frost-dropdown");
    const closeAll = (except = null) => {
      dropdowns.forEach((dd) => {
        if (dd !== except) {
          dd.classList.remove("open");
          dd.querySelector(".frost-dropdown-trigger")?.setAttribute("aria-expanded", "false");
        }
      });
    };

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
            showToast(`Tone switched to ${opt.dataset.title} ✨`);
          } else if (dd.id === "treatDropdown" || dd.id === "settingDropdown") {
            renderMintedTicket();
          }
        });
      });
    });

    document.addEventListener("click", () => closeAll());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  }

  function switchView(viewName) {
    document.querySelectorAll(".view-section").forEach((sec) => {
      const isTarget = sec.id === `view-${viewName}`;
      if (isTarget) {
        sec.classList.remove("active", "tab-opening");
        void sec.offsetWidth;
        sec.classList.add("active", "tab-opening");
        const scroller = sec.querySelector(".page-scroll");
        if (scroller) scroller.scrollTop = 0;
      } else {
        sec.classList.remove("active", "tab-opening");
      }
    });
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });
    sidebar.classList.remove("mobile-open");
    sidebarBackdrop.classList.remove("visible");

    if (viewName !== "gallery") {
      const mainVid = document.getElementById("mainVideoPlayer");
      if (mainVid && !mainVid.paused) mainVid.pause();
    }
  }

  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxFigure = document.getElementById("lightboxFigure");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxCaption = document.getElementById("lightboxCaption");
  registerSinglePlayMedia(lightboxVideo);

  function showCurrentLightbox() {
    const item = state.lightboxItems[state.lightboxIndex];
    if (!item) return;
    if (item.type === "video") {
      lightboxImg.hidden = true;
      lightboxVideo.hidden = false;
      loadAndPlayVideoWithVeil(lightboxVideo, lightboxFigure, item.src, item.poster || "", true);
    } else {
      lightboxVideo.pause();
      lightboxVideo.hidden = true;
      lightboxImg.hidden = false;
      lightboxImg.src = item.src;
      applyProgressiveImageVeil(lightboxImg, lightboxFigure, "✨ Unveiling memory...");
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

  function closeLightbox() {
    lightboxVideo.pause();
    lightboxModal.hidden = true;
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

  function initQuotesPanel() {
    const qText = document.getElementById("generatedQuoteText");
    const qTag = document.getElementById("generatedQuoteTag");
    document.getElementById("newQuoteBtn").addEventListener("click", () => {
      const ref = state.nameRevealed ? SECRET_FULL : "the Queen of Arunava's heart";
      const list = [
        { text: `Every question in this universe leads to one eternal answer: ${ref} ❤️`, tag: "Arunava" },
        { text: "You are not just a wife; you are happiness, peace, winter warmth, and love in human form.", tag: "Arunava's Heart" },
        { text: "More than stars in the winter sky and snowflakes in Finland, every heartbeat belongs to you.", tag: "Infinite Devotion" },
        { text: "Standing beside you since 24 February 2026 made my whole world complete.", tag: "Our Forever" }
      ];
      state.quoteIndex = (state.quoteIndex + 1) % list.length;
      qText.textContent = `“${enforceNameLock(list[state.quoteIndex].text)}”`;
      hydrate3DEmojis(qText);
      qTag.textContent = `— ${list[state.quoteIndex].tag}`;
    });
  }

  function showToast(message) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = enforceNameLock(message);
    hydrate3DEmojis(toast);
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.28s ease";
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  function spawnCelebrationBurst(count = 18) {
    const layer = document.getElementById("celebrationLayer");
    const symbols = ["❄️", "❤️", "💖", "🌹", "✨", "💕"];
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = "celebration-particle";
      span.innerHTML = emoji3DTag(symbols[i % symbols.length]);
      span.style.left = `${6 + Math.random() * 88}%`;
      span.style.bottom = `${Math.random() * 20}%`;
      span.style.fontSize = `${1.05 + Math.random() * 0.95}rem`;
      span.style.animationDelay = `${Math.random() * 0.4}s`;
      layer.appendChild(span);
      setTimeout(() => span.remove(), 2700);
    }
  }

  function initMinimalistSnowAndLoveCanvas() {
    const canvas = document.getElementById("frostSnowCanvas");
    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth, h = window.innerHeight;
    let targetWind = 0, currentWind = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (e) => {
      targetWind = ((e.clientX - w / 2) / w) * 18;
    }, { passive: true });

    const count = w < 600 ? 28 : 46;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: i % 4 === 0 ? 10 + Math.random() * 4 : 4 + Math.random() * 4.5,
      speedY: 20 + Math.random() * 28,
      swayAmp: 10 + Math.random() * 16,
      swayFreq: 0.6 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.7,
      kind: i % 4 === 0 ? "heart3d" : i % 2 === 0 ? "snowflake" : "dot",
      alpha: 0.24 + Math.random() * 0.28
    }));

    function drawSnowflake(x, y, r, rot, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(120, 178, 232, ${alpha})`;
      ctx.lineWidth = 1.25;
      ctx.lineCap = "round";
      for (let b = 0; b < 6; b++) {
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(0, -r);
        ctx.moveTo(0, -r * 0.58); ctx.lineTo(-r * 0.3, -r * 0.8);
        ctx.moveTo(0, -r * 0.58); ctx.lineTo(r * 0.3, -r * 0.8);
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
        const dx = p.x + Math.sin(p.phase) * p.swayAmp + currentWind * 0.35;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }

        if (p.kind === "snowflake") {
          drawSnowflake(dx, p.y, p.size, p.rot, p.alpha);
        } else if (p.kind === "heart3d" && heartImg?.complete && heartImg.naturalWidth) {
          ctx.save();
          ctx.globalAlpha = p.alpha * 0.72;
          ctx.translate(dx, p.y);
          ctx.rotate(Math.sin(p.phase) * 0.2);
          ctx.drawImage(heartImg, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(dx, p.y, p.size * 0.36, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 198, 245, ${p.alpha})`;
          ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCoreEvents() {
    customAvatarInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          state.userAvatarSrc = reader.result;
          try { localStorage.setItem("lovegpt-user-avatar", reader.result); } catch (_) {}
          document.querySelectorAll(".user-round-photo").forEach((img) => { img.src = state.userAvatarSrc; });
          showToast("Updated your profile photo ❤️");
        }
      };
      reader.readAsDataURL(file);
    });

    document.getElementById("desktopSidebarBtn").addEventListener("click", () => sidebar.classList.toggle("collapsed"));
    document.getElementById("mobileMenuBtn").addEventListener("click", () => {
      sidebar.classList.add("mobile-open");
      sidebarBackdrop.classList.add("visible");
    });
    const closeMobile = () => {
      sidebar.classList.remove("mobile-open");
      sidebarBackdrop.classList.remove("visible");
    };
    document.getElementById("sidebarCloseBtn").addEventListener("click", closeMobile);
    sidebarBackdrop.addEventListener("click", closeMobile);

    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => switchView(btn.dataset.view));
    });

    document.getElementById("newChatBtn").addEventListener("click", () => {
      pauseAllActiveMedia();
      switchView("chat");
      closeMobile();
      greetHerOnChatStart();
      chatInput.focus();
    });

    chatInput.addEventListener("input", () => {
      chatInput.style.height = "auto";
      chatInput.style.height = `${Math.min(chatInput.scrollHeight, 110)}px`;
    });
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatForm.requestSubmit();
      }
    });
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = chatInput.value;
      if (!val.trim() || state.isTypingReply) return;
      chatInput.value = "";
      chatInput.style.height = "auto";
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

  // ==================== BOOT SEQUENCE ====================
  const fitComposerPlaceholder = () => {
    chatInput.placeholder = window.innerWidth < 560
      ? "Ask Arunava anything…"
      : "Ask Arunava anything — say hello, ask for a song, a memory of us, or anything on your heart...";
  };
  fitComposerPlaceholder();
  window.addEventListener("resize", fitComposerPlaceholder);
  hydrate3DEmojis(document.body);
  initFrostDropdowns();
  initCoreEvents();
  initScrapbook50Pages();
  initExplosionBox50();
  initInteractiveBiometricScan();
  initTenActivities();
  initCinemaAndGallery();
  initSnowAndLovedThings();
  renderTimeline();
  updateClocks();
  setInterval(updateClocks, 1000);
  initQuotesPanel();
  initMinimalistSnowAndLoveCanvas();
  initLocalNeuralWorker();
  greetHerOnChatStart();
})();
