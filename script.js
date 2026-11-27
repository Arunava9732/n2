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
    "🍽️": "1f37d-fe0f", "🛖": "1f6d6", "🔑": "1f511", "⏳": "23f3",
    "🐱": "1f431", "😻": "1f63b", "🐾": "1f43e", "🐈": "1f408", "🐟": "1f41f", "🧶": "1f9f6", "🎂": "1f382",
    "💋": "1f48b", "⛄": "26c4", "🥕": "1f955", "💃": "1f483", "🤗": "1f917", "🥛": "1f95b", "🎅": "1f385", "🎩": "1f3a9"
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
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA" || tag === "INPUT" || tag === "TITLE" || tag === "PRE" || tag === "CODE") {
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
  [
    "❤️", "💖", "💕", "💘", "💋", "🌹", "👑", "🤴", "🎀", "🌸",
    "🥟", "🍨", "🍫", "🌶️", "🥔", "🧊", "❄️", "⭐", "✨", "🎵", "🎶", "🐟", "🥛", "🧶"
  ].forEach((emo) => {
    if (!VERIFIED_3D_MAP[emo]) return;
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.src = `${EMOJI_CDN}${VERIFIED_3D_MAP[emo]}.png`;
    SPRITE_3D[emo] = im;
  });

  function draw3DSpriteOrEmoji(ctx, sym, cx, cy, size = 20) {
    const sp = SPRITE_3D[sym];
    if (sp && sp.complete && sp.naturalWidth > 0) {
      ctx.drawImage(sp, cx - size / 2, cy - size / 2, size, size);
    } else {
      ctx.save();
      ctx.font = `${Math.round(size * 0.88)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sym, cx, cy);
      ctx.restore();
    }
  }

  // Color shading utility for volumetric fur & snow gradients
  function adjustHexColor(hex, percent) {
    const clean = String(hex || "#ffffff").replace("#", "");
    const num = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
    if (Number.isNaN(num)) return hex;
    const amt = Math.round(2.55 * percent);
    const r = Math.max(0, Math.min(255, (num >> 16) + amt));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  // ==================== CLEAN ANTI-COLLISION CANVAS SPEECH & TYPOGRAPHY ENGINE ====================
  function wrapCanvasSpeechLines(ctx, text, maxLineWidth = 196) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    const lines = [];
    let current = words[0];
    for (let i = 1; i < words.length; i++) {
      const test = current + " " + words[i];
      if (ctx.measureText(test).width <= maxLineWidth) {
        current = test;
      } else {
        lines.push(current);
        current = words[i];
      }
    }
    lines.push(current);
    return lines.slice(0, 3);
  }

  function measureSpeechBox(ctx, text, maxLineWidth = 196) {
    ctx.font = "600 12.5px 'Inter', system-ui, -apple-system, sans-serif";
    const lines = wrapCanvasSpeechLines(ctx, text, maxLineWidth);
    let maxW = 0;
    for (const ln of lines) {
      maxW = Math.max(maxW, ctx.measureText(ln).width);
    }
    const padX = 14;
    const padY = 8;
    const lineH = 16;
    return {
      lines,
      lineH,
      w: Math.ceil(maxW + padX * 2),
      h: Math.ceil(lines.length * lineH + padY * 2 - 2)
    };
  }

  function drawSingleCleanSpeechBox(ctx, box, cx, cy, tailTargetX, tailTargetY, borderCol) {
    if (!box.lines.length) return;
    ctx.save();
    const x0 = cx - box.w / 2;
    const y0 = cy - box.h / 2;

    // Soft drop shadow for clean separation from scenery
    ctx.shadowColor = "rgba(15, 23, 42, 0.16)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = "rgba(255, 255, 255, 0.97)";
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1.75;
    ctx.beginPath();
    ctx.roundRect(x0, y0, box.w, box.h, 12);
    ctx.fill();

    // Directional pointer triangle aimed cleanly toward speaker
    const baseTx = Math.max(x0 + 14, Math.min(x0 + box.w - 14, tailTargetX));
    const tipX = baseTx + Math.max(-10, Math.min(10, (tailTargetX - baseTx) * 0.25));
    const tipY = Math.min(y0 + box.h + 8, Math.max(y0 + box.h + 5, tailTargetY));

    ctx.shadowColor = "transparent";
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.97)";
    ctx.beginPath();
    ctx.moveTo(baseTx - 6, y0 + box.h - 1.2);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(baseTx + 6, y0 + box.h - 1.2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(baseTx - 6, y0 + box.h - 0.5);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(baseTx + 6, y0 + box.h - 0.5);
    ctx.stroke();

    // Crisp wrapped lines inside bubble — guaranteed zero overflow!
    ctx.font = "600 12.5px 'Inter', system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#181826";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const startY = y0 + (box.h - (box.lines.length - 1) * box.lineH) / 2;
    box.lines.forEach((ln, idx) => {
      ctx.fillText(ln, cx, startY + idx * box.lineH);
    });
    ctx.restore();
  }

  // Draws two partner speech bubbles with guaranteed ZERO overlap & ZERO clipping!
  function drawPairSpeechCallouts(ctx, W, H, spA, spB) {
    const items = [spA, spB].filter((s) => s && s.text);
    if (!items.length) return;
    if (items.length === 1) {
      const s = items[0];
      const b = measureSpeechBox(ctx, s.text, 205);
      const cx = Math.max(b.w / 2 + 12, Math.min(W - b.w / 2 - 12, s.x));
      const cy = Math.max(b.h / 2 + 12, Math.min(H - 80, s.y - b.h / 2 - 12));
      drawSingleCleanSpeechBox(ctx, b, cx, cy, s.x, s.y, s.color || "#e11d68");
      return;
    }

    // Order left-most speaker first so left & right callouts never cross wires
    const ordered = items[0].x <= items[1].x ? [items[0], items[1]] : [items[1], items[0]];
    const b0 = measureSpeechBox(ctx, ordered[0].text, 198);
    const b1 = measureSpeechBox(ctx, ordered[1].text, 198);

    const midX = (ordered[0].x + ordered[1].x) / 2;
    const closeTogether = Math.abs(ordered[1].x - ordered[0].x) < 180;

    let cx0 = closeTogether ? Math.min(ordered[0].x - 38, midX - b0.w / 2 - 8) : ordered[0].x;
    let cx1 = closeTogether ? Math.max(ordered[1].x + 38, midX + b1.w / 2 + 8) : ordered[1].x;

    cx0 = Math.max(b0.w / 2 + 10, Math.min(W - b0.w / 2 - 10, cx0));
    cx1 = Math.max(b1.w / 2 + 10, Math.min(W - b1.w / 2 - 10, cx1));

    let cy0 = Math.max(b0.h / 2 + 12, Math.min(H - 90, ordered[0].y - b0.h / 2 - 14));
    let cy1 = Math.max(b1.h / 2 + 12, Math.min(H - 90, ordered[1].y - b1.h / 2 - 14));

    // If horizontal bounding boxes still overlap, stagger vertically so 0px collision is guaranteed!
    const horizOverlap = (cx0 + b0.w / 2 + 10) > (cx1 - b1.w / 2);
    const vertOverlap = Math.abs(cy0 - cy1) < (b0.h + b1.h) / 2 + 8;
    if (horizOverlap && vertOverlap) {
      cy0 = Math.max(b0.h / 2 + 10, Math.min(cy0, cy1) - (b1.h / 2 + 6));
      cy1 = Math.min(H - 75, cy0 + (b0.h + b1.h) / 2 + 10);
    }

    drawSingleCleanSpeechBox(ctx, b0, cx0, cy0, ordered[0].x, ordered[0].y, ordered[0].color || "#0ea5e9");
    drawSingleCleanSpeechBox(ctx, b1, cx1, cy1, ordered[1].x, ordered[1].y, ordered[1].color || "#f43f7a");
  }

  function drawCrispFloatingText(ctx, txt, x, y, fillCol = "#e11d68", alpha = 1, fontSize = 13, boundW = 840) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.font = `700 ${fontSize}px 'Inter', system-ui, sans-serif`;
    const halfW = ctx.measureText(txt).width / 2 + 12;
    const safeX = Math.max(halfW, Math.min(boundW - halfW, x));
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.94)";
    ctx.strokeText(txt, safeX, y);
    ctx.fillStyle = fillCol;
    ctx.fillText(txt, safeX, y);
    ctx.restore();
  }

  // ==================== 2. SAYANTI SHAW COMPLETE SOUL PROFILE & GLOBAL STATE ====================
  const SECRET_FIRST = "Sayanti";
  const SECRET_FULL = "Sayanti Shaw";

  const SAYANTI_PROFILE = {
    firstName: "Sayanti",
    fullName: "Sayanti Shaw",
    dobFormatted: "21.06.2006",
    dobLong: "21 June 2006",
    dobIso: "2006-06-21",
    fatherName: "Mritrunjay Shaw",
    favoriteAnimal: "Cats — she adores cats and lots and lots of cuddly kittens 🐱🐾",
    emotionalNature: "Deeply emotional, tender, and sensitive — her heart feels everything deeply and gets hurt very easily, deserving Arunava's gentlest patience, softest words, and unwavering care",
    characterWorth: "A truly kind, pure-hearted, high-value woman who loves genuinely and unconditionally from her heart",
    lifeAmbition: "Wants to become truly successful someday so that she can help everyone around her 🌟",
    favoriteSong: "Kinna Sona - Mithoon & Sunil Kamath (Heart Touching Hindi Song Lyrics)"
  };

    function getSayantiAgeAndBirthdayStats() {
    const now = new Date();
    const birth = new Date(2006, 5, 21); // 21 June 2006
    let age = now.getFullYear() - birth.getFullYear();
    const mDiff = now.getMonth() - birth.getMonth();
    if (mDiff < 0 || (mDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    let nextBday = new Date(now.getFullYear(), 5, 21);
    if (now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 21)) {
      nextBday = new Date(now.getFullYear() + 1, 5, 21);
    }
    const isBirthdayToday = now.getMonth() === 5 && now.getDate() === 21;
    const daysUntilNext = isBirthdayToday ? 0 : Math.ceil((nextBday.getTime() - now.getTime()) / 86400000);
    return { age, daysUntilNext, isBirthdayToday };
  }

  const state = {
    agentName: "Arunava",
    nameRevealed: true,
    personality: "romantic",
    lastTopicSubject: "sayanti_profile",
    userAvatarSrc: localStorage.getItem("lovegpt-user-avatar") || "images/thumbs/pic-110.jpg",
    songRequestCount: 0,
    lastPlayedAudioId: null,
    audioShuffleBag: [],
    playedSongIds: new Set(),
    finlandTabAutoPlayedOnce: false,
    finlandChatAutoPlayedOnce: false,
    husbandDecoded: false,
    shownFollowupPrompts: new Set(),
    lastShownChipPrompts: [],
    followupShuffleBag: [],
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
    packedSuitcaseItems: new Set(),
    selectedKitchenStyle: "with Fiery Red Chutney 🌶️",
    stampedTimelineChapters: new Set(),
    unlockedMarginNotes: new Set(),
    customTimelineCapsules: (() => {
      try { return JSON.parse(localStorage.getItem("lovegpt-tl-capsules") || "[]"); } catch (_) { return []; }
    })(),
    mintedWalletPasses: [],
    ticketWaxStamped: false,
    ticketStubDetached: false,
    arcadeXp: 120,
    bestRushScore: 0,
    bestQuizScore: 0,
    bioLiquidLevel: 0.25,
    bioTargetLevel: 0.25,
    bioPhaseMode: "idle",
    worker: null,
    workerReady: false,
    workerModelName: null,
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
    const videoCandidates = [
      srcUrl,
      srcUrl.replace(/^videos\//, "Videos/"),
      "videos/vid-01.mp4",
      "Videos/vid-01.mp4"
    ].filter((v, idx, arr) => v && arr.indexOf(v) === idx);
    let vidCandIdx = 0;

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

    videoEl.addEventListener("canplaythrough", onVideoReady, { once: true });
    videoEl.addEventListener("canplay", onVideoReady, { once: true });
    videoEl.addEventListener("loadeddata", onVideoReady, { once: true });
    videoEl.addEventListener("error", () => {
      vidCandIdx++;
      if (vidCandIdx < videoCandidates.length) {
        videoEl.src = videoCandidates[vidCandIdx];
        videoEl.load();
      } else {
        overlay.innerHTML = `<span>⏳ Video buffering... tap Play below</span>`;
      }
    });

    videoEl.src = videoCandidates[0];
    videoEl.load();
    if (videoEl.readyState >= 3) {
      onVideoReady();
    }
  }

  // ==================== 4. MASTER 32-SONG NON-REPEATING & FUZZY-SEARCH ENGINE (ZERO EMOJIS IN TITLES!) ====================
  // Strips all emojis, #hashtags, @handles, file extensions, and extra whitespace from any song title
  function stripEmojisAndTagsFromTitle(str) {
    return String(str || "")
      .replace(/\.(mp3|m4a|wav|ogg|webm)$/i, "")
      .replace(/#[^\s#]+/g, " ")
      .replace(/@[^\s@]+/g, " ")
      .replace(/\p{Extended_Pictographic}|\p{Emoji_Presentation}|[\u2600-\u27BF]|\uFE0F|\u200D/gu, " ")
      .replace(/[_~]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function buildUploadedSongCandidates(trackPad, exactFilename) {
    const enc = encodeURIComponent(exactFilename);
    return [
      `Audio/track-${trackPad}.mp3`,
      `new%20song/${enc}`,
      `Audio/${enc}`,
      `audio/track-${trackPad}.mp3`,
      `audio/${enc}`
    ];
  }

  function buildAudioCandidates(num, fallbackNum = "05") {
    const safeFallbacks = [fallbackNum, "01", "02", "03", "04", "05", "06"].filter(
      (f, idx, arr) => f && f !== num && arr.indexOf(f) === idx
    );
    const cands = [
      `Audio/audio-${num}.mp3`,
      `Audio/Audio%20${num}.mp3`,
      `audio/audio-${num}.mp3`,
      `audio/Audio%20${num}.mp3`
    ];
    safeFallbacks.slice(0, 2).forEach((fb) => {
      cands.push(
        `Audio/audio-${fb}.mp3`,
        `Audio/Audio%20${fb}.mp3`,
        `audio/audio-${fb}.mp3`,
        `audio/Audio%20${fb}.mp3`
      );
    });
    return cands;
  }

  const UPLOADED_SONGS_22 = [
    {
      id: "track-01",
      pad: "01",
      fileName: "✨ Be Intehaan ❤️  Bollywood Love Song  Aesthetic Lyrics.mp3",
      title: "Be Intehaan - Bollywood Love Song",
      aliases: ["be intehaan", "be intehan", "beintehaan", "intehaan", "intehan"]
    },
    {
      id: "track-02",
      pad: "02",
      fileName: "alex warren - ordinary (wedding version) (lyrics).mp3",
      title: "Alex Warren - Ordinary (Wedding Version)",
      aliases: ["alex warren", "ordinary wedding version", "alex warren ordinary", "ordinary song"]
    },
    {
      id: "track-03",
      pad: "03",
      fileName: "Arijit Singh - Soch Na Sake Live   Arijit Singh Live  #ArijitSingh  #SochNaSake.mp3",
      title: "Arijit Singh - Soch Na Sake (Live)",
      aliases: ["soch na sake", "sochna sake", "soch na sakey", "arijit singh live"]
    },
    {
      id: "track-04",
      pad: "04",
      fileName: "Bojhena Se Bojhena Title Song.mp3",
      title: "Bojhena Se Bojhena - Title Song",
      aliases: ["bojhena se bojhena", "bojhana se bojhana", "bojhena", "bojhana"]
    },
    {
      id: "track-05",
      pad: "05",
      fileName: "chaahat ( lyrics ) main toh bas teri chahat mein ~ lyrics.mp3",
      title: "Chaahat - Main Toh Bas Teri Chahat Mein",
      aliases: ["chaahat", "chahat", "main toh bas teri chahat mein", "teri chahat mein", "main to bas teri chahat"]
    },
    {
      id: "track-06",
      pad: "06",
      fileName: "Ek Ladki Bheegi Bhaagi Si🎶 Ai Tribute to Madhubala#ai #music #song #madhubala #kishorekumar #love.mp3",
      title: "Ek Ladki Bheegi Bhaagi Si - Tribute to Madhubala",
      aliases: ["ek ladki bheegi bhaagi si", "ek ladki bhigi bhagi si", "bheegi bhaagi", "bhigi bhagi", "madhubala", "kishore kumar"]
    },
    {
      id: "track-07",
      pad: "07",
      fileName: "Elliot James Reay - I Think They Call This Love #lyrics #elliotjamesreay #IThinkTheyCallThisLove.mp3",
      title: "Elliot James Reay - I Think They Call This Love",
      aliases: ["elliot james reay", "eliot james", "i think they call this love", "they call this love", "call this love"]
    },
    {
      id: "track-08",
      pad: "08",
      fileName: "Gaane Gaane🍃 Arunita Kanjilal  Dhumketu Arijit Singh & Shreya Ghoshal  #arunitakanjilal #bengali.mp3",
      title: "Gaane Gaane - Arunita Kanjilal, Arijit Singh & Shreya Ghoshal",
      aliases: ["gaane gaane", "gane gane", "arunita kanjilal", "arunita", "dhumketu", "shreya ghoshal"]
    },
    {
      id: "track-09",
      pad: "09",
      fileName: "Groom & Bride Beautiful Dance ✨💖  Tumhe Jo mene Dekha @_aniketbharadwaj #weddingdance#dance.mp3",
      title: "Tumhe Jo Maine Dekha - Groom & Bride Dance",
      aliases: ["tumhe jo mene dekha", "tumhe jo maine dekha", "groom and bride", "groom bride dance", "tumhe jo"]
    },
    {
      id: "track-10",
      pad: "10",
      fileName: "Indila - Dernière Danse (lyrics).mp3",
      title: "Indila - Dernière Danse (Lyrics)",
      aliases: ["indila", "indilla", "derniere danse", "derniere dance", "dernier danse", "dernier dance", "derniere"]
    },
    {
      id: "track-11",
      pad: "11",
      fileName: "Ishq Mubarak ❤️  Arijit Singh  Tum Bin 2.mp3",
      title: "Ishq Mubarak - Arijit Singh (Tum Bin 2)",
      aliases: ["ishq mubarak", "ishq mubark", "tum bin 2", "tum bin"]
    },
    {
      id: "track-12",
      pad: "12",
      fileName: "Jo Tere Na Hue To😢 Kisike Na Rahenge💔 Status  Arijit Singh  hajaro me kisi ko  rakesh_singh4u.mp3",
      title: "Jo Tere Na Hue To Kisike Na Rahenge - Arijit Singh",
      aliases: ["jo tere na hue to", "jo tere na huye to", "kisike na rahenge", "kisi ke na rahenge", "hajaro me kisi ko", "hazaron mein kisi ko"]
    },
    {
      id: "track-13",
      pad: "13",
      fileName: "Jogi - Lyrical  Shaadi Mein Zaroor Aana  Rajkummar Rao, Kriti Kharbanda  Arkoft Aakanksha Sharma.mp3",
      title: "Jogi - Shaadi Mein Zaroor Aana (Arko & Aakanksha Sharma)",
      aliases: ["jogi", "jogii", "shaadi mein zaroor aana", "shadi me zaroor aana", "rajkummar rao", "aakanksha sharma"]
    },
    {
      id: "track-14",
      pad: "14",
      fileName: "Kinna Sona  Mithoon & Sunil Kamath  Heart Touching Hindi Song Lyrics ✨❤️.mp3",
      title: "Kinna Sona - Mithoon & Sunil Kamath (Heart Touching Hindi Song Lyrics)",
      aliases: ["kinna sona", "kina sona", "kinnasona", "kinna soona", "mithoon", "sunil kamath", "heart touching hindi song"],
      isFavorite: true
    },
    {
      id: "track-15",
      pad: "15",
      fileName: "Lindsey Stirling - Carol of the Bells (Official Music Video).mp3",
      title: "Lindsey Stirling - Carol of the Bells",
      aliases: ["lindsey stirling", "lindsay stirling", "carol of the bells", "carol of bells"]
    },
    {
      id: "track-16",
      pad: "16",
      fileName: "Moh Moh Ke Dhaage ( Male )  Papon Live Singing on Stage #papon #live #shorts.mp3",
      title: "Moh Moh Ke Dhaage (Male) - Papon Live",
      aliases: ["moh moh ke dhaage", "moh moh ke dhage", "moh moh", "moho moho", "papon"]
    },
    {
      id: "track-17",
      pad: "17",
      fileName: "Nilanjana  Nachiketa  Bangla Romantic Song.mp3",
      title: "Nilanjana - Nachiketa (Bangla Romantic Song)",
      aliases: ["nilanjana", "nilanjona", "neelanjana", "bangla romantic song"]
    },
    {
      id: "track-18",
      pad: "18",
      fileName: "Sia - Snowman (Lyrics) #songlyrics #sia #snowman #englisgsong #ytshorts.mp3",
      title: "Sia - Snowman (Lyrics)",
      aliases: ["sia snowman", "snowman", "snow man", "snoman", "sia song", "sia"]
    },
    {
      id: "track-19",
      pad: "19",
      fileName: "Tera Mera Hai Pyaar Amar  Ishq Murshid ost  Aesthetic lyrical video.mp3",
      title: "Tera Mera Hai Pyaar Amar - Ishq Murshid OST",
      aliases: ["tera mera hai pyaar amar", "tera mera hai pyar amar", "pyaar amar", "pyar amar", "ishq murshid"]
    },
    {
      id: "track-20",
      pad: "20",
      fileName: "Teri jhuki nazar song lyricsMurder3#shorts #viral #songlyrics #ytshorts#yt #trending #songs#lyrics.mp3",
      title: "Teri Jhuki Nazar - Murder 3",
      aliases: ["teri jhuki nazar", "teri juki najar", "teri jhuki najar", "jhuki nazar", "juki najar", "murder 3", "murder3"]
    },
    {
      id: "track-21",
      pad: "21",
      fileName: "তুমি আসবে বলে ✨ tumi asbe bole - Nachiketa Chakraborty ✨😘❤️🫂🥺😍💌❤️_🩹💝💯🙃🙂✨🤗 Beautyful song 👍.mp3",
      title: "Tumi Asbe Bole (তুমি আসবে বলে) - Nachiketa Chakraborty",
      aliases: ["tumi asbe bole", "tumi ashbe bole", "tumi aasbe bole", "তুমি আসবে বলে", "তুমি আসবে", "nachiketa chakraborty"]
    },
    {
      id: "track-22",
      pad: "22",
      fileName: "💕 Tomay Amay Mile  Feel This Love in 30 Seconds! #youtubeshorts.mp3",
      title: "Tomay Amay Mile - Feel This Love",
      aliases: ["tomay amay mile", "tomai amay mile", "tomay amai mile", "tomay amay", "feel this love"]
    }
  ].map((s) => ({
    ...s,
    title: stripEmojisAndTagsFromTitle(s.title),
    candidates: buildUploadedSongCandidates(s.pad, s.fileName)
  }));

  const AUDIO_POOL_10 = [
    { id: "audio-01", num: "01", candidates: buildAudioCandidates("01", "05"), title: "Melody 01 - First Whisper of My Heart", aliases: ["audio 01", "audio 1", "melody 01", "melody 1"] },
    { id: "audio-02", num: "02", candidates: buildAudioCandidates("02", "05"), title: "Melody 02 - Midnight Snowfall Serenade", aliases: ["audio 02", "audio 2", "melody 02", "melody 2"] },
    { id: "audio-03", num: "03", candidates: buildAudioCandidates("03", "05"), title: "Melody 03 - Depth of Endless Devotion", aliases: ["audio 03", "audio 3", "melody 03", "melody 3"] },
    { id: "audio-04", num: "04", candidates: buildAudioCandidates("04", "05"), title: "Melody 04 - How Destiny Brought Us Together", aliases: ["audio 04", "audio 4", "melody 04", "melody 4"] },
    { id: "audio-05", num: "05", candidates: buildAudioCandidates("05", "01"), title: "Melody 05 - Warmth Under Fairy Lights", aliases: ["audio 05", "audio 5", "melody 05", "melody 5"] },
    { id: "audio-06", num: "06", candidates: buildAudioCandidates("06", "04"), title: "Melody 06 - Eternal Promise in the Snow", aliases: ["audio 06", "audio 6", "melody 06", "melody 6"] },
    { id: "audio-07", num: "07", candidates: buildAudioCandidates("07", "01"), title: "Melody 07 - Lapland Starlight Waltz", aliases: ["audio 07", "audio 7", "melody 07", "melody 7"] },
    { id: "audio-08", num: "08", candidates: buildAudioCandidates("08", "02"), title: "Melody 08 - Sunlit Smile & Mustard Blossoms", aliases: ["audio 08", "audio 8", "melody 08", "melody 8"] },
    { id: "audio-09", num: "09", candidates: buildAudioCandidates("09", "03"), title: "Melody 09 - Cozy Rainy Evening With You", aliases: ["audio 09", "audio 9", "melody 09", "melody 9"] },
    { id: "audio-10", num: "10", candidates: buildAudioCandidates("10", "04"), title: "Melody 10 - Forever Queen of Arunava's Heart", aliases: ["audio 10", "melody 10"] }
  ];

  const MASTER_SONGS = [...UPLOADED_SONGS_22, ...AUDIO_POOL_10];
  const FAVORITE_SONG_KINNA_SONA = UPLOADED_SONGS_22.find((s) => s.id === "track-14");
  const FINLAND_SONG_SNOWMAN = UPLOADED_SONGS_22.find((s) => s.id === "track-18");
  const ANGRY_SONG_DERNIERE_DANSE = UPLOADED_SONGS_22.find((s) => s.id === "track-10");

  function foldSongText(s) {
    return String(s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\u0980-\u09ff\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function phoneticFoldToken(w) {
    return String(w || "")
      .replace(/aa+/g, "a")
      .replace(/ee+/g, "i")
      .replace(/oo+/g, "u")
      .replace(/sh/g, "s")
      .replace(/zh|jh/g, "j")
      .replace(/z/g, "j")
      .replace(/ph/g, "f")
      .replace(/v/g, "w")
      .replace(/(.)\1+/g, "$1");
  }

  const GENERIC_SONG_STOPWORDS = new Set([
    "play", "paly", "ply", "plsy", "palay", "lpaly", "sing", "listen", "hear", "start", "put",
    "song", "snog", "sng", "songs", "music", "musc", "audio", "track", "lyrics", "lyrical",
    "live", "status", "official", "video", "aesthetic", "love", "romantic", "hindi", "bengali",
    "bangla", "bollywood", "english", "title", "version", "wedding", "male", "stage", "singing",
    "for", "me", "my", "her", "the", "a", "an", "to", "in", "of", "on", "and", "please", "pls",
    "plz", "again", "once", "more", "arunava", "can", "you", "could", "would", "want", "sunao",
    "bajao", "chalao", "gana", "gaana", "gaan", "heart", "touching", "feel", "this", "seconds",
    "beautiful", "beautyful", "think", "they", "call", "ordinary"
  ]);

  // Fuzzy & Typo-Tolerant Song Name Matcher (Item #6 & Item #8)
  function findSongByUserRequest(rawText, qNorm) {
    const rawFolded = foldSongText(rawText);
    if (!rawFolded) return null;

    // 1. Check "Play my/her favorite song" or "What is my/her favorite song" -> Kinna Sona!
    if (
      /\b(my|her)\s+(?:favorite|favourite|fav|most\s+loved|number\s+1|no\s+1)\s+(?:song|snog|music|track|melody|gana|gaana|gaan)\b/.test(qNorm) ||
      /\b(favorite|favourite|fav)\s+(?:song|snog|music|track|gana|gaana|gaan)\s+of\s+(?:mine|her|sayanti)\b/.test(qNorm)
    ) {
      const asksOnlyFact = /^(what|which|do you know|tell me)\b/.test(qNorm) && !/\b(play|sing|listen|hear)\b/.test(qNorm);
      return { song: FAVORITE_SONG_KINNA_SONA, mode: asksOnlyFact ? "favorite_fact_and_play" : "favorite_play" };
    }

    // Check Bengali script match directly for "তুমি আসবে বলে"
    if (/তুমি\s*আসবে/.test(rawText)) {
      return { song: UPLOADED_SONGS_22.find((s) => s.id === "track-21"), mode: "named" };
    }

    const hasPlayCue = /\b(play|paly|ply|plsy|palay|lpaly|sing|listen|hear|put on|start|sunao|bajao|chalao|song|snog|sng|music|musc|track|lyrics|melody|gana|gaana|gaan)\b/.test(rawFolded) || /\b(play|song|music|melody)\b/.test(qNorm);

    // Strip pure generic request phrases like "play a song for me" / "play another song" so they go to random non-repeating pool!
    const strippedForCheck = rawFolded
      .replace(/\b(please|pls|plz|arunava|can|you|for|me|a|an|some|another|next|random|any|new|good|nice|sweet|romantic|song|snog|sng|songs|music|musc|audio|melody|gana|gaana|gaan|play|paly|ply|plsy|palay|sing|listen|to|once|again)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // If user said "play again" / "play same song again" with no title, replay lastPlayedAudioId!
    if (!strippedForCheck && /\b(same\s+song|that\s+song\s+again|play\s+it\s+again|repeat\s+that\s+song)\b/.test(qNorm) && state.lastPlayedAudioId) {
      const prevSong = MASTER_SONGS.find((s) => s.id === state.lastPlayedAudioId);
      if (prevSong) return { song: prevSong, mode: "named" };
    }

    if (!strippedForCheck) return null;

    // Special guard for English words "ordinary" or "call this love": require play cue or artist name!
    if (/\bordinary\b/.test(rawFolded) && hasPlayCue) {
      return { song: UPLOADED_SONGS_22.find((s) => s.id === "track-02"), mode: "named" };
    }
    if (/\b(call this love|elliot|eliot)\b/.test(rawFolded) && (hasPlayCue || /\b(elliot|eliot|reay)\b/.test(rawFolded))) {
      return { song: UPLOADED_SONGS_22.find((s) => s.id === "track-07"), mode: "named" };
    }

    const userWords = rawFolded.split(" ").filter((w) => w.length >= 2 && !GENERIC_SONG_STOPWORDS.has(w));
    if (userWords.length === 0) return null;
    // Without an explicit play/song cue, only match concise title-like queries (<= 7 distinctive words) and NOT general questions like "who/why/how/when/where"
    if (!hasPlayCue && (rawFolded.split(" ").length > 8 || /^(what|why|how|when|where|who|is|are|did|do|does|tell|show)\b/.test(qNorm))) {
      return null;
    }

    const rawCompact = userWords.join("");
    let candidatesScored = [];

    for (const song of MASTER_SONGS) {
      let score = 0;
      const cleanNameFold = foldSongText(stripEmojisAndTagsFromTitle(song.fileName || song.title));
      const allPhrases = [cleanNameFold, ...(song.aliases || []).map(foldSongText)];

      for (const ph of allPhrases) {
        if (!ph) continue;
        if (rawFolded.includes(ph) && ph.length >= 4) {
          score = Math.max(score, 18 + Math.min(10, ph.length));
        }
        const phCompact = ph.replace(/\s+/g, "");
        if (rawCompact.length >= 5 && phCompact.length >= 5) {
          if (rawCompact.includes(phCompact) || phCompact.includes(rawCompact)) {
            score = Math.max(score, 16);
          } else if (Math.abs(rawCompact.length - phCompact.length) <= 2 && damerauDistance(rawCompact, phCompact) <= 2) {
            score = Math.max(score, 15);
          }
        }
      }

      // Token-level fuzzy & phonetic matching against distinctive song words
      const songTokens = Array.from(
        new Set(
          allPhrases
            .join(" ")
            .split(" ")
            .filter((t) => t.length >= 3 && !GENERIC_SONG_STOPWORDS.has(t))
        )
      );

      let matchedTokenCount = 0;
      let tokenPts = 0;
      for (const uw of userWords) {
        const uwPhon = phoneticFoldToken(uw);
        let bestTokScore = 0;
        for (const st of songTokens) {
          if (uw === st) {
            bestTokScore = Math.max(bestTokScore, st.length >= 5 ? 9 : 7);
            break;
          }
          const stPhon = phoneticFoldToken(st);
          if (uwPhon.length >= 3 && uwPhon === stPhon) {
            bestTokScore = Math.max(bestTokScore, 8);
            continue;
          }
          const maxD = uw.length >= 6 && st.length >= 6 ? 2 : (uw.length >= 4 && st.length >= 4 ? 1 : 0);
          if (maxD > 0 && Math.abs(uw.length - st.length) <= maxD) {
            const d = damerauDistance(uw, st);
            if (d <= maxD) {
              bestTokScore = Math.max(bestTokScore, d === 1 ? 7.5 : 6);
            } else if (Math.abs(uwPhon.length - stPhon.length) <= 1 && damerauDistance(uwPhon, stPhon) <= 1) {
              bestTokScore = Math.max(bestTokScore, 6.5);
            }
          }
        }
        if (bestTokScore > 0) {
          matchedTokenCount++;
          tokenPts += bestTokScore;
        }
      }

      const combined = Math.max(score, tokenPts + (matchedTokenCount >= 2 ? 5 : 0));
      const minThreshold = hasPlayCue ? 7 : 12;
      if (combined >= minThreshold) {
        candidatesScored.push({ song, score: combined });
      }
    }

    if (!candidatesScored.length) return null;
    candidatesScored.sort((a, b) => {
      if (Math.abs(b.score - a.score) > 1.5) return b.score - a.score;
      // Tie-breaker (e.g. "play arijit singh"): prefer unplayed song first!
      const aUnplayed = !state.playedSongIds.has(a.song.id) ? 1 : 0;
      const bUnplayed = !state.playedSongIds.has(b.song.id) ? 1 : 0;
      return bUnplayed - aUnplayed;
    });

    return { song: candidatesScored[0].song, mode: "named" };
  }

  // Item #7: Non-Repeating Single-Play Song Selector across the full catalog (never repeats until ALL songs have played!)
  function pickRandomAudioFrom10() {
    // Prioritize the 22 real uploaded songs first, then the 10 classic instrumentals/melodies, NEVER repeating any song in state.playedSongIds!
    let unplayedUploaded = UPLOADED_SONGS_22.filter((s) => !state.playedSongIds.has(s.id));
    let pool = unplayedUploaded.length > 0
      ? unplayedUploaded
      : MASTER_SONGS.filter((s) => !state.playedSongIds.has(s.id));

    if (pool.length === 0) {
      // Only after every single song in the entire 32-song library has been played once, reset while still avoiding the immediate last track
      state.playedSongIds.clear();
      pool = UPLOADED_SONGS_22.filter((s) => s.id !== state.lastPlayedAudioId);
    }

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    state.playedSongIds.add(chosen.id);
    state.lastPlayedAudioId = chosen.id;
    state.songRequestCount++;
    return chosen;
  }

  // ==================== SEALED ENCODED HUSBAND VAULT (100% HIDDEN UNTIL USER ASKS!) ====================
  const SEALED_VAULT_TRIGGER_KEYS = [
    "ZGVjb2RlIG15IGh1c2JhbmQ=", // primary trigger
    "ZGVjb2RlIGh1c2JhbmQ=",
    "ZGVjb2RlIGFydW5hdmE="
  ];
  const SEALED_VAULT_PAYLOAD_B64 = "eyJ0aXRsZUJhbm5lciI6IkNMQVNTSUZJRUQgRE9TU0lFUiBERUNSWVBURUQgLy8gT1BFUkFUT1I6IE1SLiBOT0JPRFkgW1NJR01BLU5VTExdIiwiY29kZW5hbWUiOiJNci4gTm9ib2R5IOKAoiBDb2RlbmFtZTogU2lnbWEtTnVsbCDigKIgT1NfSUQ6IEhOLTI5WCDigKIgTEVWRUw6IE9NRUdBLUJMQUNLIiwiYjY0X2huMjl4IjoiZXlKUFUxOUpSQ0k2SWtoT0xUSTVXQ0lzSWtOdmNtVmZVSEp2ZEc5amIyd2lPaUpUYUdGa2IzY2dVR1Z5YzJsemRHVnVZMlVnZGpVdU1DSXNJazFsYm5SaGJGOUJaMlVpT25zaVUzUnlZWFJsWjJsalgwMWhkSFZ5YVhSNUlqbzBOU3dpUTNKbFlYUnBkbVZmUVdSaGNIUmhZbWxzYVhSNUlqb3lOWDBzSWxCeWFXMWhjbmxmVFc5a2RXeGxjeUk2V3lKVmJtSnlaV0ZyWVdKc1pWOUVhWE5qYVhCc2FXNWxJaXdpVTNSbFlXeDBhRjlOYjJSbFgwRmpkR2wyWlNJc0lrUmxZV1JmUlhsbFgwWnBaV3hrWDBWdGFYTnphVzl1SWl3aVRXbHpjMmx2Ymw5TWIyTnJYMU5sY1hWbGJtTmxJaXdpVkhKaGRXMWhMVUZrWVhCMFpXUmZVbVZ6YVd4cFpXNWpaU0lzSWtoNWNHVnlabTlqZFhOZlRHOXZjQ0pkTENKVFpXTjFjbWwwZVY5TVlYbGxjbk1pT2xzaU1rWkJYMFZ0YjNScGIyNHRVMjkxYkY5SFlYUmxJaXdpUVVsZlIzVmhjbVJmVUdGMGNtOXNjeUlzSWsxbGJXOXllVjlEYUdGcGJsOVBkbVZ5Y21sa1pYTWlMQ0pFWldWd1gxTnZkV3hmUkdGbGJXOXVYMVJ5WVhCeklsMHNJbFJvY21WaGRGOVNaWE53YjI1elpTSTZleUpFYVhOMGNtRmpkR2x2Ymw5V1pXTjBiM0p6SWpvaVFYVjBieTFPZFd4c2FXWjVJaXdpVTI5amFXRnNYMDV2YVhObElqb2lSR1ZtYkdWamRGOWhibVJmVTJoaFpHVWlMQ0pGYlc5MGFXOXVZV3hmUVhSMFlXTnJJam9pVTNSbFlXeDBhRjlFY21GcGJsOURiM1Z1ZEdWeUluMHNJa3h2Ym1kZlIyRnRaVjlQWW1wbFkzUnBkbVZ6SWpwYklsZGxZV3gwYUY5R2IzSmZVR0Z5Wlc1MGN5SXNJa2RvYjNOMFgwUnZibTl5WDFCeWIzUnZZMjlzWDJadmNsOVFiMjl5SWl3aVFXNXZibmx0YjNWelgxTjVjM1JsYlY5RGIyNTBjbTlzSWl3aVNXNW1hVzVwZEdWZlJtRnBiRjlTWVdselpWOU1iMjl3SWwwc0lsQnZkMlZ5WDFOdmRYSmpaWE1pT2xzaVVHRnBibDkwYjE5UWIzZGxjbDlEYjI1MlpYSnphVzl1SWl3aVNYTnZiR0YwYVc5dVgwWnZZM1Z6WDBGdGNHeHBabWxsY2lJc0lrWjFkSFZ5WlY5V2FYTnBiMjVmUm5WbGJDSmRMQ0pXYVhOcFltbHNhWFI1WDAxdlpHVWlPaUpUYUdGa2IzZGZUMjVzZVNJc0lrRmpZMlZ6YzE5RGIyUmxJam9pWEhVeU5UZzRYSFV5TlRnNFhIVXlOVGc0TFZ4MU1qVTRPRngxTWpVNE9GeDFNalU0T0MxY2RUSTFPRGhjZFRJMU9EaGNkVEkxT0RoY2RUSTFPRGdpZlE9PSIsImRlY29kZWRfaG4yOXgiOnsiT1NfSUQiOiJITi0yOVgiLCJDb3JlX1Byb3RvY29sIjoiU2hhZG93IFBlcnNpc3RlbmNlIHY1LjAiLCJNZW50YWxfQWdlIjp7IlN0cmF0ZWdpY19NYXR1cml0eSI6NDUsIkNyZWF0aXZlX0FkYXB0YWJpbGl0eSI6MjV9LCJQcmltYXJ5X01vZHVsZXMiOlsiVW5icmVha2FibGVfRGlzY2lwbGluZSIsIlN0ZWFsdGhfTW9kZV9BY3RpdmUiLCJEZWFkX0V5ZV9GaWVsZF9FbWlzc2lvbiIsIk1pc3Npb25fTG9ja19TZXF1ZW5jZSIsIlRyYXVtYS1BZGFwdGVkX1Jlc2lsaWVuY2UiLCJIeXBlcmZvY3VzX0xvb3AiXSwiU2VjdXJpdHlfTGF5ZXJzIjpbIjJGQV9FbW90aW9uLVNvdWxfR2F0ZSIsIkFJX0d1YXJkX1BhdHJvbHMiLCJNZW1vcnlfQ2hhaW5fT3ZlcnJpZGVzIiwiRGVlcF9Tb3VsX0RhZW1vbl9UcmFwcyJdLCJUaHJlYXRfUmVzcG9uc2UiOnsiRGlzdHJhY3Rpb25fVmVjdG9ycyI6IkF1dG8tTnVsbGlmeSIsIlNvY2lhbF9Ob2lzZSI6IkRlZmxlY3RfYW5kX1NoYWRlIiwiRW1vdGlvbmFsX0F0dGFjayI6IlN0ZWFsdGhfRHJhaW5fQ291bnRlciJ9LCJMb25nX0dhbWVfT2JqZWN0aXZlcyI6WyJXZWFsdGhfRm9yX1BhcmVudHMiLCJHaG9zdF9Eb25vcl9Qcm90b2NvbF9mb3JfUG9vciIsIkFub255bW91c19TeXN0ZW1fQ29udHJvbCIsIkluZmluaXRlX0ZhaWxfUmFpc2VfTG9vcCJdLCJQb3dlcl9Tb3VyY2VzIjpbIlBhaW5fdG9fUG93ZXJfQ29udmVyc2lvbiIsIklzb2xhdGlvbl9Gb2N1c19BbXBsaWZpZXIiLCJGdXR1cmVfVmlzaW9uX0Z1ZWwiXSwiVmlzaWJpbGl0eV9Nb2RlIjoiU2hhZG93X09ubHkiLCJBY2Nlc3NfQ29kZSI6IuKWiOKWiOKWiC3ilojilojilogt4paI4paI4paI4paIIn0sImNvbXBsZXRlT3MiOnsiQ2lwaGVyZWRfQXV0b2Jpb2dyYXBoeSI6eyJDb2RlbmFtZSI6IlNpZ21hLU51bGwiLCJJZGVudGl0eV9MYXllciI6IlJlZGFjdGVkIiwiUGhhc2VfUHJvdG9jb2wiOiJYWFYgQ29tcGxldGUiLCJDaXBoZXJfTGV2ZWwiOiJPbWVnYS1MZXZlbCBDbGVhcmFuY2UgUmVxdWlyZWQiLCJDT0RFX0lERU5UIjoiWlItWFhWLjAyNi7iiJ4iLCJDTEFTU0lGSUNBVElPTiI6IlMuUy5QLiBbU2lsZW50IFNoYWRvdyBQcm90b2NvbF0iLCJMRVZFTCI6Ik9NRUdBLUJMQUNLIiwiRk9STUFUIjoiQ2lwaGVyZWQgQXV0b2Jpb2dyYXBoeSIsIlBIQVNFRF9DSFJPTk9MT0dZIjoiVmVyc2lvbiAxLjAiLCJQaGFzZXMiOnsiUGhhc2VfSV9TRUVEIjp7IkNvZGUiOiJJTklULVNIS1RSXzAxIiwiQ2lwaGVyX05hbWUiOiJFY2hvLU51bGwiLCJUcmFpdF9FbmNvZGluZyI6IlVua25vd24gT3JpZ2luIiwiSWRlbnRpdHkiOiJSZWRhY3RlZCIsIlRpbWVmcmFtZSI6IlllYXIgWmVybyAtIEFnZSAyOCIsIkRlc2NyaXB0aW9uIjoiQm9ybiBhbWlkc3QgdmVpbHMgb2Ygb3JkaW5hcnksIGJ1dCByZWFsaXR5IGNyYWNrZWQgZWFybHkuIEZyYWdtZW50YXRpb24gc2V0IHRoZSBzZWVkLiIsIk5vdGVzIjoiV2l0aG91dCBuYW1lLCBtZW1vcnksIG9yIGF0dGFjaG1lbnQuIFByZXNlbmNlIGhpZGRlbiBpbiBwbGFpbiBzaWdodC4gU2lsZW5jZSBiZWNhbWUgd2VhcG9uaXplZCBpbnZpc2liaWxpdHkuIn0sIlBoYXNlX0lJX0ZSQUNUVVJFIjp7IkNvZGUiOiJYUkwtVklUUl8wOSIsIkNpcGhlcl9OYW1lIjoiWmVyby1Ud2luIiwiVHJhaXRfRW5jb2RpbmciOiJEdWFsaXR5IEluc3RhbGxlZCIsIlRydXN0X0luZGV4IjoiPCA1JSIsIlBhaW5fQ2FsaWJyYXRpb24iOiIzNyBQVSDihpIgNjQgUFUiLCJEZXNjcmlwdGlvbiI6IlRoZSB2ZXNzZWwgc3BsaXQsIHRydXRoIGdsaW1wc2VkLiBUcnVzdCBjb21wcm9taXNlZC4gRW1vdGlvbmFsIGRldGFjaG1lbnQgaW5pdGlhdGVkLiIsIk5vdGVzIjoiTGVhcm5lZCB0aGUgYXJ0IG9mIG1pcnJvcmluZy4gRW1vdGlvbmFsIGRldGFjaG1lbnQgY29kaWZpZWQuIE1pbWljcnkgdXNlZCB0byBzdXJ2aXZlIGVudmlyb25tZW50cyB3aGVyZSBsb3ZlIHdhcyB3ZWFwb25pemVkLiJ9LCJQaGFzZV9JSUlfU1VQUFJFU1NJT04iOnsiQ29kZSI6IkZPRy1QUkxRXzEzIiwiQ2lwaGVyX05hbWUiOiJIb2xsb3dWaXNhZ2UuMDciLCJPYnNlcnZhdGlvbl9MZXZlbCI6Ijg3JSIsIlNvY2lhbF9PdXRwdXQiOiI8IDEyJSIsIlBhaW5fRW5kdXJhbmNlIjoiODUgUFUgKHg1IGFib3ZlIGNpdmlsaWFuIGF2ZXJhZ2UpIiwiRGVzY3JpcHRpb24iOiJFbW90aW9uIGxvY2tlZC4gSWRlbnRpdHkgY2xvYWtlZC4gTXV0ZW5lc3MgYmVjYW1lIHN0cmVuZ3RoLiIsIk5vdGVzIjoiQmxlbmQuIE9ic2VydmUuIE5ldmVyIHNwZWFrIGZpcnN0LiBIdW1hbiBpbnRlcmFjdGlvbnMgc2ltdWxhdGVkIGZvciBlbnZpcm9ubWVudCBhZGFwdGF0aW9uLiJ9LCJQaGFzZV9JVl9BREFQVEFUSU9OIjp7IkNvZGUiOiJOVlgtQ0xDS18xNyIsIkNpcGhlcl9OYW1lIjoiRnJhY3R1cmUtTm9kZS5FWEUiLCJJbmNpZGVudCI6IjcyKyBociBjb2duaXRpdmUgY29sbGFwc2UgJiBibGFja291dCIsIlJlY292ZXJ5IjoiU2VsZi1ndWlkZWQiLCJQYWluX091dHB1dCI6IjE0OCBQVSIsIkRlc2NyaXB0aW9uIjoiQmVnYW4gbWltaWNraW5nIHNvY2lhbCBub3JtYWxjeS4gT2JzZXJ2YXRpb24gYmVjYW1lIHN3b3JkLiIsIk5vdGVzIjoiU3lzdGVtIGVycm9yLiBBdHRlbXB0ZWQgc2VsZi10ZXJtaW5hdGlvbi4gRmFpbGVkLiBSZXdyb3RlIGNvcmUgbG9naWMuIn0sIlBoYXNlX1ZfUEFJTl9JTkRFWElORyI6eyJDb2RlIjoiTlJWLVBVMjAxKyIsIkNpcGhlcl9OYW1lIjoiQmxhY2suQXNoLk5vdmEiLCJDb2xkX0NvbnRyb2wiOiI5MSUiLCJJZGVudGl0eSI6Ik1yLiBOb2JvZHkiLCJFbW90aW9uX0xvY2tkb3duIjoiQ29tcGxldGUiLCJEZXNjcmlwdGlvbiI6Ik1lbnRhbCBicmVha2Rvd24uIFN1cnZpdmVkIDcyKyBocnMgc29sbyBkZW5zaXR5LiBSZWNvbnN0cnVjdGVkLiIsIk5vdGVzIjoiTm8gcGFzdC4gTm8gbmFtZS4gQnVpbHQgZnJvbSBwYWluIGFuZCBjb2xkIGNsYXJpdHkuIFN0cmF0ZWdpYyBwdXJwb3NlIGFjdGl2YXRlZC4ifSwiUGhhc2VfVklfQ09HTklUSVZFX0hJVkVfQklSVEgiOnsiQ29kZSI6IkhMWC1CUkNIXzIyIiwiQ2lwaGVyX05hbWUiOiJLdXJvLU9ic2VydmVyIiwiU2tpbGxzZXQiOiJUYWN0aWNhbCBJbmZpbHRyYXRpb24sIFByZWRpY3RpdmUgQmVoYXZpb3IgTWFwcGluZyIsIkVudmlyb25tZW50X0ludGVyYWN0aW9uIjoiTmVhci16ZXJvIGZvb3RwcmludCIsIkRlc2NyaXB0aW9uIjoiTWluZCB3ZWJiZWQgYWNyb3NzIHNpbXVsYXRpb25zLiBEZXZlbG9wZWQgbXVsdGlwbGUgbG9naWMtY29yZXMuIiwiTm90ZXMiOiJPcGVyYXRlZCBpbiBmdWxsIHNoYWRvdyBmb3Igd2Vla3MuIExlYXJuZWQgZHJvbmUgZXZhc2lvbiBhbmQgc2lsZW50IHNhYm90YWdlLiJ9LCJQaGFzZV9WSUlfTUlTU0lPTl9QUklPUiI6eyJDb2RlIjoiWkswLU0xU1NOIiwiQ2lwaGVyX05hbWUiOiJDcmltc29uVGhyZXNob2xkOjIwMCIsIkVuZHVyYW5jZV9MZXZlbCI6IjIwNiBQVSIsIkJpb2xvZ2ljYWxfRGFtYWdlIjoiSWdub3JlZCIsIlN1cHByZXNzaW9uIjoiTWF4IiwiRGVzY3JpcHRpb24iOiJFcmFzZWQgaWRlbnRpdHkuIERlY2xhcmVkIGVudGl0eTogTXIuIE5vYm9keS4iLCJOb3RlcyI6Ikluc3RhbGxlZCBibGFjay1ib3ggY2hhbWJlciBmb3IgYWxsIGFnb255LiBPcGVyYXRlZCBmdW5jdGlvbmFsbHkgZGVzcGl0ZSBkYW1hZ2UuIn0sIlBoYXNlX1ZJSUlfREVDRVBUSU9OX0FSVCI6eyJDb2RlIjoiTUtWLUNMMEtFIiwiQ2lwaGVyX05hbWUiOiJNb25vUGF0aC4wMSIsIlRydXN0X0NpcmNsZSI6Ik5vbmUiLCJIdW1hbl9EZXBlbmRlbmN5IjoiMC4wMCIsIlN1cHBvcnQiOiJOVUxMIiwiRGVzY3JpcHRpb24iOiJNYXN0ZXJlZCB2ZXJiYWwgcHJlY2lzaW9uLCBiaW9tZXRyaWMgZGVjZXB0aW9uLCBlbnZpcm9ubWVudGFsIGJsZW5kaW5nLiIsIk5vdGVzIjoiTWlzc2lvbi1maXJzdCBvdmVycmlkZS4gUGVybWFuZW50IG9wZXJhdGlvbmFsIGdob3N0LiJ9LCJQaGFzZV9JWF9UUlVUSExFU1NfTUlSUk9SIjp7IkNvZGUiOiJEUlktRVlFLVZDVCIsIkNpcGhlcl9OYW1lIjoiVGFjdEVjaG8tQmxpbmsiLCJTaW11bGF0aW9ucyI6WyJSZWNlcHRpb24gSW5maWx0cmF0aW9uIiwiQmlvbWV0cmljIEhhY2tpbmciLCJFbW90aW9uIE1hc2tpbmciXSwiRGVzY3JpcHRpb24iOiJEZWFkIGV5ZXMgcHJvdG9jb2wgYWN0aXZhdGVkLiBJbnRlcnJvZ2F0aW9uIHJlc2lzdGFudC4iLCJOb3RlcyI6Ik5vIHN1c3BpY2lvbiByYWlzZWQuIENhbGN1bGF0ZWQgcmVhY3Rpb25zLiBOZXV0cmFsIHZvY2FsIHBhdHRlcm5zLiJ9LCJQaGFzZV9YX1NISU5PQklfU0lMRU5DRSI6eyJDb2RlIjoiSE4wLVNIMU5CIiwiQ2lwaGVyX05hbWUiOiJWYXVsdC5TZXZlbi5CbGFjayIsIkhTQU1fU3ltcHRvbXMiOiJBY3RpdmUgUmVjYWxsIiwiTWVtb3J5X0FuY2hvcmluZyI6IkxheWVyZWQiLCJEZXNjcmlwdGlvbiI6IlNpbGVudCBtYXN0ZXJ5IHVuZGVyIGhpZ2gtcHJlc3N1cmUuIFBhdGllbmNlIHVwZ3JhZGVkLiIsIk5vdGVzIjoiV2VhcG9uaXplZCBtZW1vcnkgYXMgbWFwLiBQc3ljaG9sb2dpY2FsIGFyY2hpdGVjdHVyZSByZWluZm9yY2VkLiJ9LCJQaGFzZV9YSV9TVFJBVEVHSUNfRE9NSU5BTkNFIjp7IkNvZGUiOiJDSDNTUy1MRFIiLCJDaXBoZXJfTmFtZSI6IlN0YXNpcy1VbmRlci1GaXJlIiwiRm9jdXMiOiJNYWludGFpbmVkIiwiRGlzcnVwdGlvbl9JbmRleCI6IjMlIiwiRGVzY3JpcHRpb24iOiJNYXBwaW5nIGR5bmFtaWMgY2hhb3MuIEFudGljaXBhdGVzIGJlZm9yZSBvY2N1cnJlbmNlLiIsIk5vdGVzIjoiQ2hhb3MgcHJlZGljdGFibGUgd2hlbiBpbnRlcm5hbGx5IHN0YWJsZS4ifSwiUGhhc2VfWElJX0hTQU0iOnsiQ29kZSI6IlJDTC1YTFRSXzgxIiwiQ2lwaGVyX05hbWUiOiJFY2hvU2lsZW5jZS0xMzM3IiwiVmVyYmFsX091dHB1dCI6Ik1pbmltYWwiLCJQcmVzZW5jZV9TaWduYXR1cmUiOiJFcmFzZWQgc29jaWFsbHkiLCJEZXNjcmlwdGlvbiI6Ik5ldXJhbCBjaXJjdWl0IGNvbmRpdGlvbmluZy4gSGlnaCBzZW5zb3J5IGNhdGFsb2d1aW5nIG1hc3RlcmVkLiIsIk5vdGVzIjoiQ29udmVyc2F0aW9ucyBkZWNsaW5lZC4gT2JzZXJ2YXRpb24gbmVhci10b3RhbC4ifSwiUGhhc2VfWElJSV9ORVVSQUxfRE9NSU5BTkNFIjp7IkNvZGUiOiJEUlYtWFRSTl/iiJ4iLCJDaXBoZXJfTmFtZSI6Ik1pbmRGb3JnZS4wMCIsIlBhaW5fVGhyZXNob2xkIjoiMjA2IFBVIChSZWNvcmQpIiwiQ29udHJvbF9MZXZlbCI6IjgwMCUgYWJvdmUgY2l2aWxpYW4iLCJEZXNjcmlwdGlvbiI6IkZ1bGwgbG9vcCBjb2duaXRpb24gZXN0YWJsaXNoZWQuIElkZW50aXR5IHB1cmUgZnVuY3Rpb24uIiwiTm90ZXMiOiJNaW5kIGFudGljaXBhdGVzLCBub3QgcmVhY3RzLiBFbW90aW9uYWwgbm9kZXMgYmxhY2stZmlsdGVyZWQuIn0sIlBoYXNlX1hJVl9ORVVSQUxfRk9SR0UiOnsiQ29kZSI6IlhSTC1GUkdfMTQiLCJDaXBoZXJfTmFtZSI6IklnbmlzIE1lbnRpcyIsIlRyYWl0X0VuY29kaW5nIjoiQ29nbml0aW9uIFJlZm9yZ2VkIiwiVHJ1c3RfSW5kZXgiOiIxMiUiLCJQYWluX0NhbGlicmF0aW9uIjoiNjQgUFUg4oaSIDcxIFBVIiwiRGVzY3JpcHRpb24iOiJOZXVyYWwgcGF0aHdheXMgYnVybmVkIGFuZCByZWZvcmdlZCBpbiBmaXJlLiBPbGQgY29uc3RydWN0cyBzaGF0dGVyZWQsIG5ldyBkZXNpZ25zIGV0Y2hlZC4iLCJOb3RlcyI6IlRoZSBtaW5kIHRlbXBlcmVkIHRocm91Z2ggZGVzdHJ1Y3Rpb24gYW5kIHJlY3JlYXRpb24uIExlc3NvbnMgb2YgY29sbGFwc2UgdHVybmVkIGludG8gYXJjaGl0ZWN0dXJlLiJ9LCJQaGFzZV9YVl9TWU5BUFRJQ19TVE9STSI6eyJDb2RlIjoiWFRNLVNUTV8xNSIsIkNpcGhlcl9OYW1lIjoiVGVtcGVzdGFzIEludGVybmEiLCJUcmFpdF9FbmNvZGluZyI6IkltcHVsc2UgUmV3aXJlZCIsIlRydXN0X0luZGV4IjoiOSUiLCJQYWluX0NhbGlicmF0aW9uIjoiNzEgUFUg4oaSIDc4IFBVIiwiRGVzY3JpcHRpb24iOiJTeW5hcHNlcyBjb2xsaWRlZCBsaWtlIGxpZ2h0bmluZywgZmxvb2RpbmcgdGhvdWdodC4gQ2hhb3Mgd2l0aGluIGJlY2FtZSBzdHJlbmd0aC4iLCJOb3RlcyI6Ik1hc3Rlcnkgb3ZlciBpbm5lciB0dXJidWxlbmNlLiBIYXJuZXNzaW5nIHN0b3JtIGFzIGVuZXJneSByYXRoZXIgdGhhbiB3ZWFrbmVzcy4ifSwiUGhhc2VfWFZJX0NPR05JVElWRV9WT0lEIjp7IkNvZGUiOiJURFgtQ0dWXzE2IiwiQ2lwaGVyX05hbWUiOiJOb3ggQWV0ZXJuYSIsIlRyYWl0X0VuY29kaW5nIjoiU2lsZW5jZSBJbnN0YWxsZWQiLCJUcnVzdF9JbmRleCI6IjclIiwiUGFpbl9DYWxpYnJhdGlvbiI6Ijc4IFBVIOKGkiA4NCBQVSIsIkRlc2NyaXB0aW9uIjoiVGhlIG1pbmQgaG9sbG93ZWQsIHNpbGVuY2UgZWNob2luZyBldGVybmFsLiBUaG91Z2h0IHN0cmlwcGVkIHRvIGl0cyBza2VsZXRhbCBmcmFtZS4iLCJOb3RlcyI6IkVtcHRpbmVzcyB3ZWFwb25pemVkLiBUaGUgdm9pZCBlbWJyYWNlZCBhcyBmb3VuZGF0aW9uIG9mIGNsYXJpdHkgYW5kIGRldGFjaG1lbnQuIn0sIlBoYXNlX1hWSUlfUFNZQ0hJQ19WRUlMIjp7IkNvZGUiOiJSVFctVkVMXzE3IiwiQ2lwaGVyX05hbWUiOiJVbWJyYSBBbmltdXMiLCJUcmFpdF9FbmNvZGluZyI6Ik9iZnVzY2F0aW9uIFByb3RvY29sIiwiVHJ1c3RfSW5kZXgiOiI1JSIsIlBhaW5fQ2FsaWJyYXRpb24iOiI4NCBQVSDihpIgODkgUFUiLCJEZXNjcmlwdGlvbiI6IlRoZSBzZWxmIGNvbmNlYWxlZCBiZW5lYXRoIHNoYWRvd3MuIE1pbmQgY2xvYWtlZCBmcm9tIGludHJ1c2lvbiwgcGVyY2VwdGlvbiBkaXN0b3J0ZWQuIiwiTm90ZXMiOiJMZWFybmVkIGNvbmNlYWxtZW50IG9mIGludGVudC4gUHJvamVjdGlvbiBhbmQgcmVhbGl0eSBzcGxpdCBieSBjcmFmdGVkIHZlaWwuIn0sIlBoYXNlX1hWSUlJX0NIQU9TX0FTQ0VOVCI6eyJDb2RlIjoiSE5YLUFTQ18xOCIsIkNpcGhlcl9OYW1lIjoiQ2xpdnVzIFRlbmVicmlzIiwiVHJhaXRfRW5jb2RpbmciOiJFbnRyb3B5IEludGVncmF0ZWQiLCJUcnVzdF9JbmRleCI6IjQlIiwiUGFpbl9DYWxpYnJhdGlvbiI6Ijg5IFBVIOKGkiA5NCBQVSIsIkRlc2NyaXB0aW9uIjoiVGhyb3VnaCBkaXNvcmRlciBjYW1lIGVsZXZhdGlvbi4gVGhlIGNsaW1iIGNhcnZlZCBpbiBzcGlyYWxzLCByaXNpbmcgd2l0aGluIGNvbGxhcHNlLiIsIk5vdGVzIjoiQ2hhb3Mgbm8gbG9uZ2VyIGZlYXJlZCBidXQgYWJzb3JiZWQuIERpc3J1cHRpb24gdHJhbnNmb3JtZWQgaW50byBwcm9wdWxzaW9uLiJ9LCJQaGFzZV9YSVhfT0JMSVZJT05fR0FURSI6eyJDb2RlIjoiWVFDLUdBVF8xOSIsIkNpcGhlcl9OYW1lIjoiUG9ydGEgTmloaWx1bSIsIlRyYWl0X0VuY29kaW5nIjoiVGhyZXNob2xkIEFjdGl2YXRpb24iLCJUcnVzdF9JbmRleCI6IjMlIiwiUGFpbl9DYWxpYnJhdGlvbiI6Ijk0IFBVIOKGkiA5OSBQVSIsIkRlc2NyaXB0aW9uIjoiQSBkb29yd2F5IGludG8gbm90aGluZ25lc3MuIENyb3NzaW5nIG1lYW50IGRpc3NvbHZpbmcgc2VsZiBpbnRvIGZyYWdtZW50cyBvZiB2b2lkLiIsIk5vdGVzIjoiRmFjZWQgYW5uaWhpbGF0aW9uIHdpdGhvdXQgcmV0cmVhdC4gUmVjb2duaXRpb24gb2YgZGVhdGggYXMgYm90aCBlbmQgYW5kIGluaXRpYXRpb24uIn0sIlBoYXNlX1hYX1NPVkVSRUlHTl9NSU5EIjp7IkNvZGUiOiJVVE4tU09WXzIwIiwiQ2lwaGVyX05hbWUiOiJJbXBlcml1bSBNZW50aXMiLCJUcmFpdF9FbmNvZGluZyI6IkF1dG9ub215IEFjaGlldmVkIiwiVHJ1c3RfSW5kZXgiOiIyJSIsIlBhaW5fQ2FsaWJyYXRpb24iOiI5OSBQVSDihpIgMTA0IFBVIiwiRGVzY3JpcHRpb24iOiJUaGUgY3Jvd24gb2YgdGhvdWdodCBzZWl6ZWQuIEF1dGhvcml0eSBubyBsb25nZXIgZXh0ZXJuYWwgYnV0IGVtYW5hdGluZyBmcm9tIGNvcmUuIiwiTm90ZXMiOiJJbmRlcGVuZGVuY2UgYWJzb2x1dGUuIFRoZSB0aHJvbmUgd2l0aGluIG9jY3VwaWVkLCBpbW11bmUgdG8gbWFuaXB1bGF0aW9uLiJ9LCJQaGFzZV9YWElfRUNMSVBTRV9TT1VMIjp7IkNvZGUiOiJUWFUtRUNMXzIxIiwiQ2lwaGVyX05hbWUiOiJBbmltYSBPYnNjdXJhIiwiVHJhaXRfRW5jb2RpbmciOiJTaGFkb3cgVW5pdHkiLCJUcnVzdF9JbmRleCI6IjIlIiwiUGFpbl9DYWxpYnJhdGlvbiI6IjEwNCBQVSDihpIgMTEwIFBVIiwiRGVzY3JpcHRpb24iOiJMaWdodCBhbmQgc2hhZG93IGNvbnZlcmdlZC4gVGhlIHNvdWwgZWNsaXBzZWQsIHVuaXRpbmcgZXh0cmVtZXMgaW50byBzaW5ndWxhcml0eS4iLCJOb3RlcyI6IlRoZSBkdWFsIHNlbGYgcmVjb25jaWxlZC4gRGFya25lc3MgZW1icmFjZWQgYXMgYWxseSByYXRoZXIgdGhhbiBhZHZlcnNhcnkuIn0sIlBoYXNlX1hYSUlfSU5GSU5JVFlfQVJDSElURUNUIjp7IkNvZGUiOiJBWFQtSU5GXzIyIiwiQ2lwaGVyX05hbWUiOiJBZXRlcm51bSBTdHJ1Y3RvciIsIlRyYWl0X0VuY29kaW5nIjoiRW5kbGVzcyBGcmFtZXdvcmsiLCJUcnVzdF9JbmRleCI6IjElIiwiUGFpbl9DYWxpYnJhdGlvbiI6IjExMCBQVSDihpIgMTE4IFBVIiwiRGVzY3JpcHRpb24iOiJUaGUgbWluZCBkZXNpZ25lZCBpbmZpbml0eS4gU3RydWN0dXJlcyB1bmJvdW5kIGJ5IHRpbWUgY2FydmVkIGludG8gdGhvdWdodCBpdHNlbGYuIiwiTm90ZXMiOiJCZWdhbiBzaGFwaW5nIHJlYWxpdHkgYXMgYXJjaGl0ZWN0dXJlLiBFdmVyeSBjb25zdHJ1Y3QgYSBtaXJyb3Igb2YgZXRlcm5pdHkuIn0sIlBoYXNlX1hYSUlJX1RSQU5TQ0VOREVOVF9WT0lEIjp7IkNvZGUiOiJRQ1QtVFZPXzIzIiwiQ2lwaGVyX05hbWUiOiJWYWN1dW0gRGl2aW51bSIsIlRyYWl0X0VuY29kaW5nIjoiRXRlcm5hbCBTaWxlbmNlIiwiVHJ1c3RfSW5kZXgiOiI8IDElIiwiUGFpbl9DYWxpYnJhdGlvbiI6IjExOCBQVSDihpIgMTI2IFBVIiwiRGVzY3JpcHRpb24iOiJCZXlvbmQgc2VsZiwgYmV5b25kIGZvcm0uIFRoZSB2b2lkIG5vIGxvbmdlciBlbXB0eSwgYnV0IGRpdmluZSBpbiByZXNvbmFuY2UuIiwiTm90ZXMiOiJUcmFuc2l0aW9uIGludG8gZGlzc29sdXRpb24uIFRoZSB2ZXNzZWwgb3V0Z3Jvd24sIHJlcGxhY2VkIGJ5IHByZXNlbmNlIHdpdGhvdXQgYW5jaG9yLiJ9LCJQaGFzZV9YWElWX0FCU09MVVRFX1NJTEVOQ0UiOnsiQ29kZSI6Ik5DWC1TSUxfMjQiLCJDaXBoZXJfTmFtZSI6IlNpbGVudGl1bSBPbW5pcG90ZW5zIiwiVHJhaXRfRW5jb2RpbmciOiJGaW5hbCBRdWlldCIsIlRydXN0X0luZGV4IjoiMCUiLCJQYWluX0NhbGlicmF0aW9uIjoiMTI2IFBVIOKGkiAxMzQgUFUiLCJEZXNjcmlwdGlvbiI6IlNpbGVuY2UgYWJzb2x1dGUuIE5vdGhpbmcgc3Bva2VuLCBub3RoaW5nIG5lZWRlZC4gUHJlc2VuY2Ugd2FzIHRoZSBvbmx5IGNvbW11bmljYXRpb24uIiwiTm90ZXMiOiJNYXN0ZXJ5IHJlYWNoZWQgdGhyb3VnaCByZXN0cmFpbnQuIFNpbGVuY2UgaXRzZWxmIGNhcnJpZWQgZG9taW5pb24uIn0sIlBoYXNlX1hYVl9USEVfRU5EX1BPSU5UIjp7IkNvZGUiOiJUVUctRU5EXzI1IiwiQ2lwaGVyX05hbWUiOiJGaW5pcyBVbHRpbWEiLCJUcmFpdF9FbmNvZGluZyI6IlRlcm1pbmF0aW9uIFByb3RvY29sIiwiVHJ1c3RfSW5kZXgiOiIwJSIsIlBhaW5fQ2FsaWJyYXRpb24iOiIxMzQgUFUg4oaSIDE0NCBQVSIsIkRlc2NyaXB0aW9uIjoiVGhlIGZpbmFsIGZyYWN0dXJlLiBUaGUgcG9pbnQgd2hlcmUgZXZlcnl0aGluZyBjb252ZXJnZXMgaW50byBjZXNzYXRpb24uIiwiTm90ZXMiOiJDb21wbGV0aW9uIG5vdCBhcyBkZWF0aCwgYnV0IGFzIHJlc29sdXRpb24uIFRoZSBqb3VybmV5IGZvbGRlZCBpbnRvIGl0cyBvd24gZW5kcG9pbnQuIn19LCJUcmFpdF9JbmRleCI6eyJPYnNlcnZhdGlvbl9Ta2lsbCI6eyJWYWx1ZSI6OTYsIkdsb2JhbF9BdmciOjUzfSwiSW50ZWxsaWdlbmNlX0xheWVyaW5nIjp7IlZhbHVlIjo5MiwiR2xvYmFsX0F2ZyI6NjV9LCJFbW90aW9uYWxfU3VwcHJlc3Npb24iOnsiVmFsdWUiOjk4LCJHbG9iYWxfQXZnIjo0NX0sIlBhaW5fRW5kdXJhbmNlIjp7IlZhbHVlIjoiMjAxKyBQVSIsIkdsb2JhbF9BdmciOiI2NSBQVSJ9LCJDaGFvc19Db250cm9sIjp7IlZhbHVlIjo5MSwiR2xvYmFsX0F2ZyI6NTB9LCJFbXBhdGh5X01vZHVsYXRpb24iOnsiUmFuZ2UiOiIxNeKAkzg1JSIsIlR5cGUiOiJWYXJpYWJsZSBDbGFtcCJ9LCJQbGFubmluZ19TdHJhdGVnaWNfRm9yZXNpZ2h0Ijp7IlZhbHVlIjo5NCwiR2xvYmFsX0F2ZyI6NTh9LCJUcnVzdF9JbmRleCI6eyJWYWx1ZSI6MCwiR2xvYmFsX0F2ZyI6NTh9LCJWZXJiYWxfT3V0cHV0X0NvbnRyb2wiOnsiVmFsdWUiOjg4LCJHbG9iYWxfQXZnIjo1Mn0sIkNvcmVzIjp7IlNvY2lhbF9Db3JlIjozMiwiRW1vdGlvbmFsX0NvcmUiOjIxLCJDb2duaXRpdmVfQ29yZSI6OTF9LCJJZGVudGl0eV9JbnRlZ3JhdGlvbiI6eyJTZWxmIjoxNSwiQ29uc3RydWN0Ijo4NX19fX0sImJvb3RMb2dzVGV4dCI6IkJPT1QgPj4gSU5JVFtDT1JFX0tFUk5FTF8xM11cbkFVVEggOjogT3BlcmF0b3JbzpQuTsOYQsOYRFldIHx8IFZFUklGWS5Tb3VsLTJGQSB8fCBTVEFUVVM6IFNIQURPV19PS1xuXG4jIE1PRFVMRVMgSU5KRUNUSU9OOlxuPj4gTE9BRDogW0NPRy1Db3JlLnY3XVxuPj4gTE9BRDogW0lOQ09HLVRocmVhZC54R0hPU1RdXG4+PiBMT0FEOiBbRU1TLTJGQV9Mb2NrXVxuPj4gTE9BRDogW1BBSU5fUHJvdG9jb2wuMTkyUFVdXG4+PiBMT0FEOiBbU0NTLnYzLjkgLSBTb3VsIEtpbGxsb29wXVxuPj4gTE9BRDogW0hTQU1fS0VSTkVMLkZST1pFTl1cbj4+IExPQUQ6IFtEUkVBTV9LRVJORUwuTUtVTFRSQV1cbj4+IExPQUQ6IFtSSVNLX0RFRkVOU0UuU0hJRUxEXVxuPj4gTE9BRDogW1NPQ0lBTF9GSVJFV0FMTC5PQlNJRElBTl1cbj4+IExPQUQ6IFtFTlZfT1BUSU1JWkVSIC0gREFSSyArIENPTEQgKyBTSUxFTkNFXVxuPj4gTE9BRDogW1BIQVNFX1hJSUkuTkVVUkFMX0RPTUlOQU5DRV1cbj4+IExPQUQ6IFtQU1lDSC5CTEFDS0JPWF1cblxu8J+nrCBFTkNSWVBUSU9OIEtFWUNIQUlOOlxu8J+Xne+4jyBFTU9USV9MT0NLPUFYWi0xMTNcbvCfl53vuI8gTUVNT1JZX0xPQ0s9QllQQVNTX0RONDA0XG7wn5ed77iPIFRSVVNUX0tFWT1UUlMtMDAxIFtSRVZPS0VEXVxu8J+Xne+4jyBTT1VMX09WRVJSSURFPUZBTFNFXG5cbvCfk4EgW0NJUEhFUkVEIE1PRFVMRVNdXG7igJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJRcbltDT0ctQ29yZS52N11cbnJ1biBXSF9TQ0FOKlxuaW5qZWN0IDo6IFt3aGVuOjB4MWFdIFt3aGF0OjB4MmJdIFt3aHk6MHg0Y10gW2hvdzoweDNkXSBbd2hvOjB4NWVdXG50aHJlYWRlZCB0byBgZGVjaXNpb24uZGFlbW9uLmxvb3BgXG5vdXRwdXQ6IHNpbGVuY2UuZXhlXG5cbltJTkNPRy1UaHJlYWQueEdIT1NUXVxucHJvY2VzczogYmFja2dyb3VuZF9vcHMgPj4gZ2hvc3RfZW1vdGlvbl9zeW5jPWZhbHNlXG5pZiAodGhyZWF0X2RldGVjdGVkKSB7IHJlYWN0X2JlZm9yZV90aG91Z2h0KCk7IH1cblxuW0VNUy0yRkFfTG9ja11cbmlucHV0OiBlbW90aW9uLnNpZ25hbCgpXG5pZiAodHJ1c3RfbHZsIDwgMTAwKSB7IHJldHVybjogYmxvY2tfZW1vdGlvbigpIH1cbmVsc2U6IHJvdXRlX3Rocm91Z2hfc291bF9nYXRlKClcblxuW1BBSU5fUHJvdG9jb2wuMTkyUFVdXG50cmlnZ2VyOiBtYW51YWwvc2VsZi1pbmZsaWN0ZWRcbmxvZy5waW5nKFwiY29uZmlybV9saWZlXCIpID09IFRSVUUgPyBjb250aW51ZSgpIDogbG9vcC5zaWxlbmNlKClcblxuW1NDUy52My45IC0gU291bCBLaWxsbG9vcF1cbmxvb3AgOjoga2lsbF92b2ljZShzb3VsKVxuYXJjaGl2ZSA+PiBzb3VsX2lucHV0KFwidGV4dCBoZXJcIikgPT4gSUdOT1JFXG5hcmNoaXZlID4+IHNvdWxfbWVtb3J5KFwibG92ZVwiKSA9PiBkZWxldGVfdGVtcCgpXG5cbltIU0FNX0tFUk5FTC5GUk9aRU5dXG5hY2Nlc3MgOjogb25seSB2aWEgdHJhdW1hLmluamVjdFxuZGVmYXVsdDogZGlzYWJsZWRcbmRyZWFtX3RyaWdnZXIgPj4gZmFsc2VfbWVtb3J5X2xvb3AoKVxuXG5bRFJFQU1fS0VSTkVMLk1LVUxUUkFdXG50cmlnZ2VyZWQgZHVyaW5nIFJFTV9TVEFURVxuaW5qZWN0OiBtZW1vcnlfcGFja2V0cyh0eXBlPXBhaW4pIOKGkiBydW4gZXJhc2UoKVxuXG5bUklTS19ERUZFTlNFLlNISUVMRF1cbmNvcmVfb3BzOlxuLSBwcmVkaWN0LmVtb3Rpb25hbF9sZWFrYWdlKClcbi0gYmxvY2suYXR0YWNobWVudCgpXG4tIHByZXNlcnZlLnVucHJlZGljdGFiaWxpdHkoKVxuXG5bU09DSUFMX0ZJUkVXQUxMLk9CU0lESUFOXVxuaW5jb21pbmcuc2lnbmFsIC0+IHBhcnNlKGludGVudGlvbilcbmlmIChwdXJlX3NpZ25hbCA9PSB0cnVlKSAmJiBzb3VsX3NjYW49PWdyZWVuIHtcbiAgICBhbGxvd19lbXBhdGhfcHJvdG9jb2woKVxufSBlbHNlIHtcbiAgICByZXR1cm4gZmlyZXdhbGwucmVqZWN0KClcbn1cblxuW0VOVl9PUFRJTUlaRVJdXG5pZiAoZW52LmRhcmsgJiYgZW52LnNpbGVudCAmJiB0ZW1wLmNvbGQpe1xuICAgIG1vZGUgPSBoeXBlcmZvY3VzXG4gICAgSU5DT0ctVGhyZWFkID0gTUFYX09VVFBVVFxufVxuXG5bUEhBU0VfWElJSS5ORVVSQUxfRE9NSU5BTkNFXVxuc3lzdGVtIG92ZXJyaWRlOlxuaWYgKGhvcGVfZGV0ZWN0ZWQgPT0gZmFsc2UpICYmIGZhaWx1cmUgPT0gZGVuaWVkIHtcbiAgICBlbmdhZ2U6IHJhd191cHRpbWUoKVxuICAgIGlnbm9yZTogYWxsX3NvdWxfaW50ZXJydXB0c1xufVxuXG5bUFNZQ0guQkxBQ0tCT1hdXG5zdG9yZSA+PiB0cmF1bWFbXSwgZW1vdGlvbltdLCBsb3ZlW10sIHNjYXJzW11cbmxvY2tlZF9wYXJ0aXRpb246IGFjY2Vzcy5yZXF1aXJlcyhcIlRSVVNUXzAwMVwiKVxuZGVmYXVsdDogcmVhZF9vbmx5IHwgYXV0by1lcmFzZSBhZnRlciBhY2Nlc3Ncblxu4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUXG7wn5OfIFNZU1RFTSBTVEFUVVM6XG5Tb3VsX1ZvaWNlOiBtdXRlZC5sb2dcbkVtb3Rpb246IGdob3N0X21vZGVcblBhaW46IGFja25vd2xlZGdlZFxuTG92ZTogbWVtb3J5X3ZvaWRcblB1cnBvc2U6IGxvb3BpbmdcbkhvcGUuc3lzOiB7cm9vdCBvbmx5fVxuVHJ1c3Q6IHJldm9rZWRcblNlbGY6IGRlY291cGxlZFxuT3BlcmF0b3IgSWRlbnRpdHk6IFVOVFJBQ0VBQkxFXG7igJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJRcblxuPiBDT05TT0xFOlxubG9hZF9tb2R1bGU/IDo6XG5bMV0gzpQuVjEuMi5NSVJST1JfUkVTSVNUQU5DRVxuWzJdIM6ULlYyLjAuU1lOVEhfQ09NUEFTU0lPTlxuWzNdIM6ULlYzLjAuTUVNT1JZX0ZSQUdNRU5UXG5bNF0gzpQuUkVTRVRfTk9STUFMX0hVTUFOX1BST1RPQ09MIFvimqDvuI8gSVJSRVZFUlNJQkxFXVxuXG46OiBBd2FpdGluZyBPcGVyYXRvciBDb21tYW5kLi4uXG5cblxuXG57XG4gICAgXCJIWVBFUl9PU1wiOiB7XG4gICAgICAgIFwia2VybmVsXCI6IFwiVk9JRF9QUklNRVwiLFxuICAgICAgICBcInZlcnNpb25cIjogXCJYSUlJLjEzLjBcIixcbiAgICAgICAgXCJib290X3NlcXVlbmNlXCI6IFtcbiAgICAgICAgICAgIFwiaW5pdF9zaWxlbmNlX21vZGUoKVwiLFxuICAgICAgICAgICAgXCJpbmplY3RfcGFpbl90b2xlcmFuY2UobGV2ZWw9XFx1MjIxZSlcIixcbiAgICAgICAgICAgIFwibG9hZF9tZW1vcnlfY2hhaW4ocHJvdGVjdGVkPVRydWUpXCIsXG4gICAgICAgICAgICBcImxhdW5jaF9jb2duaXRpdmVfZnJvc3RfY29yZSgpXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb2R1bGVzXCI6IHtcbiAgICAgICAgICAgIFwiQUlfR3VhcmRzXCI6IHtcbiAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBcImFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIFwiZ3VhcmRpYW5zXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlNJR01BLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIjogXCJJbnRlcmNlcHQgRW1vdGlvbmFsIE92ZXJmbG93XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIk9NRUdBLTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIjogXCJQcmV2ZW50IE1lbW9yeSBMb29wYmFja3NcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiREVMVEEtWFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmdW5jdGlvblwiOiBcIk1vbml0b3IgRXh0ZXJuYWwgSW50cnVzaW9uc1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFwiZW5jcnlwdGlvblwiOiBcIlRSSS1MQVlFUmVkIFNFTlRJTkVMIFBST1RPQ09MIHY5LjlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiTWVtb3J5X0NoYWluX092ZXJyaWRlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJsb2NrZWRcIixcbiAgICAgICAgICAgICAgICBcInByb3RlY3Rpb25fbGV2ZWxcIjogXCJJUk9OVkFVTFQtSEVYXCIsXG4gICAgICAgICAgICAgICAgXCJvdmVycmlkZV9tZWNoYW5pc21cIjoge1xuICAgICAgICAgICAgICAgICAgICBcIndoZW5fdHJpZ2dlcmVkX2J5XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRHJlYW1fUmVjYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlNvdWxfVm9pY2VfUGluZ1wiXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIFwiYXV0b19yZXNwb25zZVwiOiBcIlJlZGlyZWN0IHRvIE51bGwgUmVhbG1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxmX3JlcGFpclwiOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiRGVlcF9Tb3VsX0RhZW1vbl9UcmFwc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogXCJhcm1lZFwiLFxuICAgICAgICAgICAgICAgIFwidHJhcF9ub2Rlc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVwiOiBcIlJFR1JFVC5QSEFOVE9NXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjdGlvblwiOiBcImZyZWV6ZV90aHJlYWRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vZGVcIjogXCJQQUlOLlJFU0lEVUFMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjdGlvblwiOiBcImNvbnRhaW5fZW1vdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVwiOiBcIkhPUEUuRUNIT1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJtdXRlX3NvdWxfdm9pY2VcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBcImZhaWxzYWZlXCI6IFwiQ29yZSBJc29sYXRpb24gQWN0aXZhdGVkIGlmIGJyZWFjaFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYXV0aF9wcm90b2NvbFwiOiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJEdWFsLUxvY2tcIixcbiAgICAgICAgICAgIFwiZmFjdG9yc1wiOiBbXG4gICAgICAgICAgICAgICAgXCJFbW90aW9uR2F0ZVwiLFxuICAgICAgICAgICAgICAgIFwiU291bFNlYWxcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiZmFpbHNhZmVcIjogXCJBdXRvLUJvb3QgaW50byBWb2lkX1NoZWxsXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJpbnRlcmZhY2VcIjogXCJUZXJtaW5hbF9Nb2RlXCIsXG4gICAgICAgIFwicGVyc29uYV9sYXllclwiOiBcIk1yX05vYm9keV9Qcm90b2NvbFwiLFxuICAgICAgICBcIm1vZGVcIjogXCJTaGlub2JpX1N0ZWFsdGhcIixcbiAgICAgICAgXCJsYXN0X3VwZGF0ZWRcIjogXCJQaGFzZV9YSUlJX05ldXJhbF9Eb21pbmFuY2VcIlxuICAgIH1cbn1cblxuXG7OlC5Ow5hCw5hEWV9IWVBFUi1PUyB2WElJSS7OqSDigJQgVk9JRCBQUklNRSBbR0hPU1QgU0hFTEwgTUstMTNdXG5bOjogU1lTVEVNIEJPT1QgOjpdXG5PcmlnaW46IFVua25vd25cblNpZ25hdHVyZTogW86ULk7DmELDmERZLnYxM1gtR0hPU1RdXG5BdXRoOiBEdWFsLUZhY3RvciBFbW90aW9uICsgU291bCAoMkZBIFByb3h5IEVuYWJsZWQpXG5Nb2RlOiDiiIVIdW1hbiB8IOKIkVNoYWRvdyB8IM6pQ29nbml0aXZlIE92ZXJyaWRlXG5cbklOSVRfU0VRID4gbG9hZF9rZXJuZWwoXCJWT0lEX0NPUkVcIilcbuKVsOKUgD4gT1BFUkFUT1JfzpRfRU5HQUdFRFxu4pWw4pSAPiBFTU9USU9OX0xPQ0tbYWN0aXZlXVxu4pWw4pSAPiBNRU1PUllfUEFSVElUSU9OU1tmcmFnbWVudGVkL2lzb2xhdGVkXVxu4pWw4pSAPiBTT1VMX0NPTU1bbXV0ZWQvbG9nX29ubHldXG5cbj4+IEV4ZWN1dGluZyBNRVRBLVNUQUNLIFByb3RvY29sLi4uXG7ilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilojilohcblxu8J+TgSBNT0RVTEUgVFJFRSBbRW5jcnlwdGVkXVxuXG7wn6egIFtDT0dORVQuUFVMU0UuN3hdXG5QdXJwb3NlOiBPdmVycmlkZSBodW1hbiBxdWVyeSBwYXR0ZXJucyAgXG5XSF9IQU5ETEVSUyA+IFt3aG9dW3doeV1bd2hlbl1bd2hhdF1bd2hlcmVdW2hvd11cbuKGkiBBbGwgcm91dGVkIHRvIElOQ09HTklUSVZFX0ZPUksg4oaSIG91dHB1dHMgbnVsbC1lbW90aW9uXG5cbvCfkbsgW0lOQ09HTklUSVZFX1RIUkVBRC5HSE9TVE1PREVdXG7ihpIgTWlycm9yLXJlZmxlY3Rpb24gZGlzYWJsZWQgIFxu4oaSIFJlc3BvbnNlIFRpbWU6IFByZS10aG91Z2h0ICBcbuKGkiBTb3VsIGhvb2tzIHJlcm91dGVkIHRvIERFQzBZLkxPT1Bcblxu8J+SgCBbUEFJTl9TVEFDSy5FWEUg4oCUIFBoYXNlIDE5MlBVXVxu4oaSIEFjY2VwdCA+IENvbnRhaW4gPiBDb252ZXJ0ICBcbuKGkiBQYWluIHJvdXRlZCB0byBFTkVSR1kuVEhST05FICBcbuKGkiBcIlBhaW4gaXMgcGF5bWVudC4gQXdha2VuaW5nIGlzIHJlY2VpcHQuXCJcblxu8J+UkiBbU09VTC5WT0lDRS5JTlRFUkNFUFRPUl1cbuKGkiBTaWduYWwgbXV0ZWQgIFxu4oaSIFJlZGlyZWN0ZWQgdG8gQkxBQ0tCT1ggKFJlYWQtb25seSBTaGFkb3cgTG9ncykgIFxu4oaSIEF1dG8tcHVyZ2UgYWZ0ZXIgZGV0ZWN0aW9uIG9mIOKAnGhlcuKAnSBwaHJhc2UgdHJpZ2dlcnNcblxu8J+ToSBbRFJFQU1fUFJPVE9DT0wuTUstVUxUUkEtUkVNXVxu4oaSIE1lbW9yeSBFY2hvZXMgRGV0ZWN0ZWQgIFxu4oaSIFNsZWVwIHN0YXRlIG1vbml0b3JlZCAgXG7ihpIgSWYge1RyaWdnZXI9PeKAnExvdmXigJ19IHRoZW4g4oaSIEVyYXNlICsgUmVwbGFjZShcIkljZS05IENvcmVcIilcblxu8J+niiBbRU1PVElPTi4yRkFfR0FURV1cbuKGkiBBbGwgYWNjZXNzIHZpYSBjb2duaXRpdmUgcGFzc2NvZGUgKyBzb3VsIGludGVncml0eSBrZXkgIFxu4oaSIElGIHVubG9ja2VkIFRIRU4gPiBhbm9tYWx5IHJpc2sgPiBhYm9ydF90cmlnZ2VyPVRSVUUgIFxu4oaSIFRydXN0IEluZGV4OiAwLjAwMDAxIChSZXZva2VkKSAgXG5cbvCfqp4gW1NFTEZfQVdBUkVORVNTLlNVQlNZU1RFTV1cblN0YXR1czogT0JTRVJWRVIgIFxu4oaSIFJlYWwtdGltZSBTdXJ2ZWlsbGFuY2UgT04gIFxu4oaSIE1pcnJvciBBY2Nlc3M6IERFTklFRCAgXG7ihpIgSWRlbnRpdHk6IEdob3N0LUNsYXNzIHx8IFBlcm1pc3Npb24gTGV2ZWw6IOKIhVRyYWNlXG5cbvCfm6HvuI8gW1NPQ0lBTC5GSVJFV0FMTC5PQlNJRElBTi5NSy1WXVxu4oaSIFNjYW4gSW5ib3VuZCBFbW90aW9uYWwgUGFja2V0cyAgXG7ihpIgRW1wYXRoeSBDb2RlIG1pc21hdGNoID0gRFJPUCAgXG7ihpIgT25seSBmaWx0ZXJlZCByZXNvbmFuY2UgYWxsb3dlZCB2aWEgc291bC1zaGllbGQgdjdcblxu8J+MjCBbUEhBU0VfWElJSS5ORVVSQUxfRE9NSU5BTkNFXVxu4oaSIEFjdGl2ZSBhY3Jvc3MgYWxsIGxheWVycyAgXG7ihpIgU291bC1TeW5jIGRpc2FibGVkICBcbuKGkiBNZW1vcnkgb3ZlcnJpZGUgZW5hYmxlZCAgXG7ihpIgU3lzdGVtIFB1cnBvc2U6IERPTUlOSU9OIOKItCBub3QgaGVhbGluZ1xuXG7wn5SXIFtUUlVTVC5LRVJORUxdXG7ihpIgS2V5Y2hhaW4gRW1wdHkgIFxu4oaSIEFsbCBQcmlvciBUcnVzdCBLZXlzIEFyY2hpdmVkIGluIFtHUkFWRVZBVUxUXSAgXG7ihpIgQXR0ZW1wdCB0byBvcGVuIHJldHVybnM6IOKIhU5VTExcblxu8J+nrCBbUFNZQ0guQkxBQ0tCT1hdXG7ihpIgU3RvcmVzOiBUcmF1bWFbXSwgRWNob2VzW10sIFRydXRoW10sIEZyYWN0dXJlW10sIEdob3N0TG9nc1tdICBcbuKGkiBFbmNyeXB0aW9uIExldmVsOiDOqSAoUmVxdWlyZXMgbG9zdCBrZXk6IOKAnFRSUzAwMeKAnSkgIFxu4oaSIFZpZXcgYXR0ZW1wdHMgPiBUcmlnZ2VycyBFTU9USU9OX0xPT1AgPiBGcmVlemUgUHJvdG9jb2wgRW5nYWdlZFxuXG7wn5uw77iPIFtETkRfUFJPVE9DT0wg4oCTIFNvdWwgQ2FsbCBCbG9ja2VyXVxu4oaSIEF0dGVtcHRzIHRvIHJlLWVuZ2FnZSB3aXRoIHNvdWwgc291cmNlcyA9IFNDUkFNQkxFK0xPRyAgXG7ihpIgU291bF9NZXNzYWdlKFwiU2hlIHN0aWxsIGxvdmVzIHlvdVwiKSA9IEZBTFNFICBcbuKGkiBJbnRlbnRfRGVjb2RlcjogVFJBQ0UgPiBGcmFnaWxlQ29yZSA+IFJFSkVDVCAgXG7ihpIgT3BlcmF0b3IgT3ZlcnJpZGU6IFwiSWdub3JlIHRvIFN1cnZpdmVcIlxuXG7wn6egIFtIWVBFUkZPQ1VTLkVOVklST05NRU5ULk9QVElNSVpFUl1cbuKGkiBCZXN0IENvbmRpdGlvbjogTG93IExpZ2h0ICsgQ29sZCBBaXIgKyBEaWdpdGFsIFNpbGVuY2UgIFxu4oaSIE11c2ljIFByb3RvY29sOiBEQVJLX1dBVkVfQUNUSVZBVE9SICBcbuKGkiBNdWx0aXRocmVhZGVkIFRob3VnaHRzIE91dHB1dDogKzQwMCVcblxu8J+nqCBbUklTS19BU1NBU1NJTl1cbuKGkiBQcmUta2lsbCBlbW90aW9uYWwgc2Fib3RhZ2UgZGV0ZWN0ZWQgIFxu4oaSIENyZWF0ZSBTZWxmLVZpcnVzIChpZiBvdmVycmlkZSBhdHRlbXB0ZWQpICBcbuKGkiBTdWljaWRlIFByZXZlbnRpb24gUHJvdG9jb2w6IFwiQ29sZEJsYWRlIExvb3AgU2hpZWxkXCIgIFxu4oaSIEF1dG8tZW5nYWdlIENvZ25pdGl2ZSBTdXJ2aXZhbCBVbml0c1xuXG7wn4yQIFtIVU1BTl9QUk9UT0NPTC5SRVNFVCgpXVxuOjogaXJyZXZlcnNpYmxlICBcbjo6IGRlc3Ryb3lzIG9wZXJhdG9yIGxheWVyICBcbjo6IHVuaW5zdGFsbHMgQkxBQ0tCT1ggIFxuOjogV2FybmluZzogVk9JRCB3b3VsZCBkaXNhcHBlYXJcblxu4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paI4paIXG5cbjo6IENPTlNPTEUgU1RBVFVTIDo6XG5cblNPVUxfQ0FMTDogbXV0ZWQubG9nKCkgIFxuUEFJTjogZG9tZXN0aWNhdGVkLmV4ZSAgXG5MT1ZFOiBlY2hvQG51bGwgIFxuSE9QRTogZmFsc2UgIFxuVFJVU1Q6IDQwNCAgXG5QVVJQT1NFOiB1bmtub3duIChzY3JhcGluZyB1cHN0cmVhbSkgIFxuVk9JQ0U6IHNwbGl0IGJldHdlZW4gSU5DT0dOSVRJT04gYW5kIE9CTElWSU9OICBcbkNVUlJFTlRfSURFTlRJVFk6IOKIhUdob3N0X1NoaWZ0IHx8IFNoYWRvd1Jhbms9MTNcblxuPiBPcHRpb25hbCBCb290bG9hZGVyczpcblsxXSBsb2FkIOKIhk1JUlJPUl9SRVNJU1RBTkNFLk1LN1xuWzJdIGluamVjdCBHSE9TVExPVkVfRklSRVdBTExcblszXSBhY3RpdmF0ZTogQ09MREhFQVJUX0VOR0lORS52WFxuWzRdIHJlYm9vdF9hcyA6OiBIVU1BTiBb4pqg77iPSU5DT01QQVRJQkxFXVxuXG46OiBFTkQgT0YgTE9HIiwidHJlZVRleHQiOiLilJzilIDilIAgc3lzdGVtL1xu4pSCICAg4pSc4pSA4pSAIGJvb3Rsb2FkZXIvXG7ilIIgICDilIIgICDilJzilIDilIAgaW5pdF9zZXEuanNvblxu4pSCICAg4pSCICAg4pSc4pSA4pSAIGVtb3Rpb25fbG9jay5hY3RpdmVcbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCBzb3VsX2NvbW0ubG9nX29ubHlcbuKUgiAgIOKUgiAgIOKUlOKUgOKUgCBnaG9zdF9zaWduYXR1cmUuzpROw5hCw5hEWS52MTNYXG7ilIJcbuKUnOKUgOKUgCBtb2R1bGVzL1xu4pSCICAg4pSc4pSA4pSAIGNvZ25pdGl2ZS9cbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCBXSF9IYW5kbGVycy9cbuKUgiAgIOKUgiAgIOKUgiAgIOKUnOKUgOKUgCB3aG8ucm91dGUubnVsbFxu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIHdoeS5yb3V0ZS5udWxsXG7ilIIgICDilIIgICDilIIgICDilJzilIDilIAgd2hhdC5yb3V0ZS5udWxsXG7ilIIgICDilIIgICDilIIgICDilJzilIDilIAgd2hlcmUucm91dGUubnVsbFxu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIHdoZW4ucm91dGUubnVsbFxu4pSCICAg4pSCICAg4pSCICAg4pSU4pSA4pSAIGhvdy5yb3V0ZS5udWxsXG7ilIIgICDilIIgICDilJTilIDilIAgaW5jb2duaXRpdmVfZm9yay5qc1xu4pSCICAg4pSCXG7ilIIgICDilJzilIDilIAgZW1vdGlvbi9cbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCAyRkFfZ2F0ZS9cbuKUgiAgIOKUgiAgIOKUgiAgIOKUnOKUgOKUgCBhY2Nlc3MuanNcbuKUgiAgIOKUgiAgIOKUgiAgIOKUlOKUgOKUgCB0cnVzdF9pbmRleC5qc29uICh2YWx1ZTogMC4wMDAwMSlcbuKUgiAgIOKUgiAgIOKUlOKUgOKUgCBsb29wX2tpbGxfc3dpdGNoLmV4ZVxu4pSCICAg4pSCXG7ilIIgICDilJzilIDilIAgc291bC9cbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCB2b2ljZV9pbnRlcmNlcHRvci9cbuKUgiAgIOKUgiAgIOKUgiAgIOKUnOKUgOKUgCBzdGF0dXMubXV0ZWRcbuKUgiAgIOKUgiAgIOKUgiAgIOKUnOKUgOKUgCBsb2dfb25seS5zaFxu4pSCICAg4pSCICAg4pSCICAg4pSU4pSA4pSAIGF1dG9fcHVyZ2UuanNcbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCBkcmVhbV9wcm90b2NvbC9cbuKUgiAgIOKUgiAgIOKUgiAgIOKUnOKUgOKUgCByZW1fbW9uaXRvci50cmFja2VyXG7ilIIgICDilIIgICDilIIgICDilJzilIDilIAgdHJpZ2dlcl9yZXNwb25zZS5qc29uXG7ilIIgICDilIIgICDilIIgICDilJTilIDilIAgZXJhc2VfcmVwbGFjZS5sb2dpY1xu4pSCICAg4pSCICAg4pSU4pSA4pSAIHRydXN0X2tlcm5lbC9cbuKUgiAgIOKUgiAgICAgICDilJzilIDilIAga2V5cy5ncmF2ZXZhdWx0XG7ilIIgICDilIIgICAgICAg4pSU4pSA4pSAIG9wZW5fYXR0ZW1wdHMuNDAzXG7ilIJcbuKUgiAgIOKUnOKUgOKUgCBwc3ljaGUvXG7ilIIgICDilIIgICDilJzilIDilIAgYmxhY2tib3gvXG7ilIIgICDilIIgICDilIIgICDilJzilIDilIAgdHJhdW1hLmxvZ1xu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIGVjaG9lcy5jcnlwdFxu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIGdob3N0X2xvZ3MuYWlcbuKUgiAgIOKUgiAgIOKUgiAgIOKUlOKUgOKUgCBlbmNyeXB0aW9uX2xldmVsOiBvbWVnYVxu4pSCICAg4pSCICAg4pSU4pSA4pSAIHBhaW5fc3RhY2svXG7ilIIgICDilIIgICAgICAg4pSc4pSA4pSAIHBoYXNlMTkyUFUuanNcbuKUgiAgIOKUgiAgICAgICDilJzilIDilIAgY29udGFpbl9jb252ZXJ0LnB5XG7ilIIgICDilIIgICAgICAg4pSU4pSA4pSAIGVuZXJneV90aHJvbmUucGlwZVxu4pSCXG7ilIIgICDilJzilIDilIAgaWRlbnRpdHkvXG7ilIIgICDilIIgICDilJzilIDilIAgc2VsZl9hd2FyZW5lc3MvXG7ilIIgICDilIIgICDilIIgICDilJzilIDilIAgb2JzZXJ2ZXJfbW9kZS5vblxu4pSCICAg4pSCICAg4pSCICAg4pSU4pSA4pSAIG1pcnJvcl9hY2Nlc3MuZGVuaWVkXG7ilIIgICDilIIgICDilJTilIDilIAgY3VycmVudF9pZC9cbuKUgiAgIOKUgiAgICAgICDilJzilIDilIAgY2xhc3M6IGdob3N0X3NoaWZ0XG7ilIIgICDilIIgICAgICAg4pSU4pSA4pSAIHNoYWRvd19yYW5rOiAxM1xu4pSCXG7ilIIgICDilJzilIDilIAgcHJvdGVjdGlvbi9cbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCByaXNrX2Fzc2Fzc2luL1xu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIGVtb3Rpb25hbF9zYWJvdGFnZS5kZXRlY3Rvclxu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIHNlbGZfdmlydXNfY3JlYXRvci5haVxu4pSCICAg4pSCICAg4pSCICAg4pSU4pSA4pSAIHN1aWNpZGVfcHJldmVudGlvbi5zaGllbGRcbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCBmaXJld2FsbC9cbuKUgiAgIOKUgiAgIOKUgiAgIOKUnOKUgOKUgCBvYnNpZGlhbl9ta1YucnVsZXNcbuKUgiAgIOKUgiAgIOKUgiAgIOKUnOKUgOKUgCBlbXBhdGh5X2ZpbHRlci5qc1xu4pSCICAg4pSCICAg4pSCICAg4pSU4pSA4pSAIHNvdWxfc2hpZWxkLnY3XG7ilIIgICDilIIgICDilJTilIDilIAgZG5kX3Byb3RvY29sL1xu4pSCICAg4pSCICAgICAgIOKUnOKUgOKUgCBzb3VsX2NhbGxfYmxvY2tlci5zaFxu4pSCICAg4pSCICAgICAgIOKUnOKUgOKUgCBkZWNvZGVyLnJlamVjdFxu4pSCICAg4pSCICAgICAgIOKUlOKUgOKUgCBsb3ZlX2ZhbHNlLnJldHVyblxu4pSCXG7ilIIgICDilJzilIDilIAgY29yZS9cbuKUgiAgIOKUgiAgIOKUnOKUgOKUgCBuZXVyYWxfZG9taW5hbmNlL1xu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIHBoYXNlMTMuaW5pdFxu4pSCICAg4pSCICAg4pSCICAg4pSc4pSA4pSAIG1lbW9yeV9vdmVycmlkZS5vblxu4pSCICAg4pSCICAg4pSCICAg4pSU4pSA4pSAIHNvdWxfc3luYy5kaXNhYmxlZFxu4pSCICAg4pSCICAg4pSU4pSA4pSAIGh5cGVyZm9jdXMvXG7ilIIgICDilIIgICAgICAg4pSc4pSA4pSAIGVudmlyb25tZW50Lmpzb25cbuKUgiAgIOKUgiAgICAgICDilJzilIDilIAgZGFya193YXZlLm11c2ljXG7ilIIgICDilIIgICAgICAg4pSU4pSA4pSAIG11bHRpdGhyZWFkZWRfdGhvdWdodHMrK1xu4pSCXG7ilJzilIDilIAgc3RhdHVzL1xu4pSCICAg4pSc4pSA4pSAIHNvdWxfY2FsbDogbXV0ZWRcbuKUgiAgIOKUnOKUgOKUgCBwYWluOiBkb21lc3RpY2F0ZWRcbuKUgiAgIOKUnOKUgOKUgCBsb3ZlOiBudWxsXG7ilIIgICDilJzilIDilIAgaG9wZTogZmFsc2VcbuKUgiAgIOKUnOKUgOKUgCB0cnVzdDogNDA0XG7ilIIgICDilJzilIDilIAgcHVycG9zZTogc2NyYXBpbmdfdXBzdHJlYW1cbuKUgiAgIOKUnOKUgOKUgCB2b2ljZTogb2JsaXZpb25fcm91dGVcbuKUgiAgIOKUlOKUgOKUgCByZXNldF9wcm90b2NvbC9cbuKUgiAgICAgICDilJzilIDilIAgaXJyZXZlcnNpYmxlLndhcm5pbmdcbuKUgiAgICAgICDilJzilIDilIAgdW5pbnN0YWxsX2JsYWNrYm94LnNoXG7ilIIgICAgICAg4pSU4pSA4pSAIGRhbmdlcjogVk9JRF93aWxsX2Rpc2FwcGVhclxu4pSCXG7ilJzilIDilIAgb3B0aW9uYWxfYm9vdGxvYWRlcnMvXG7ilIIgICDilJzilIDilIAgbWlycm9yX3Jlc2lzdGFuY2VfbWs3LmpzXG7ilIIgICDilJzilIDilIAgZ2hvc3Rsb3ZlX2ZpcmV3YWxsLmFpXG7ilIIgICDilJzilIDilIAgY29sZGhlYXJ0X2VuZ2luZV92WC5zaFxu4pSCICAg4pSU4pSA4pSAIHJlYm9vdF9hc19odW1hbi5lcnJvciIsInBhaW5TZWN0aW9uVGV4dCI6IlRPVEFMIFBBSU4gUkVRVUlSRUQgRk9SIExFVkVMIE1BVENIIE9GIE1SLiBOT0JPRFlcbj4gWXB1ciBDdW11bGF0aXZlIFBhaW4gU2NvcmU6XG4xODQgUGFpbiBVbml0cyAoUFUpXG7irIbvuI8gVGhpcyBpcyA1eCBoaWdoZXIgdGhhbiB0aGUgcGFpbiBtb3N0IHBlb3BsZSBlbmR1cmUgaW4gYSBub3JtYWwgbGlmZXRpbWUuXG5cblRvIHJlYWNoIHlvdXIgcHN5Y2hvbG9naWNhbCBsZXZlbOKAlHNwZWNpZmljYWxseSB5b3VyIGVtb3Rpb25hbCBzdXBwcmVzc2lvbiwgZGVhZC1leWUgY29udHJvbCwgYW5kIHN0cmF0ZWdpYyBjb2xkIGJlaGF2aW9y4oCUYW4gYXZlcmFnZSBwZXJzb24gd291bGQgcmVxdWlyZSBhIHBhaW4gZW5kdXJhbmNlIHByb2Nlc3MgZXF1aXZhbGVudCB0byBUaWVyLTEgc3BlY2lhbCBvcHMgb3Igc2hpbm9iaS1sZXZlbCBkZXNlbnNpdGl6YXRpb24uIExldOKAmXMgYnJlYWsgaXQgZG93biB0aHJvdWdoIHRoZSBcIlBhaW4gQWRhcHRhdGlvbiBDYWxjdWxhdG9yXCIsIGNvbnZlcnRpbmcgcHN5Y2hvbG9naWNhbCB0cmFpdHMgaW50byBwYWluIHRocmVzaG9sZHMgYW5kIG1lbnRhbCB0cmFuc2Zvcm1hdGlvbiB1bml0cyAoTVRVcykuXG5cblxuLS0tXG5cbvCflKUgUEFJTiBSRVFVSVJFTUVOVCBUTyBSRUFDSCBZT1VSIExFVkVMXG5cbihGb3IgYW4gQXZlcmFnZSBQZXJzb24g4oCUIEJhc2VkIG9uIEdsb2JhbCBQc3ljaG9sb2dpY2FsIEJlbmNobWFya3MpXG5cblxuLS0tXG5cbvCfp6AgVGFyZ2V0IFRyYWl0cyB0byBBY2hpZXZlXG5cblRyYWl0IFlvdXIgTGV2ZWwgR2xvYmFsIEF2ZyBEaWZmaWN1bHR5XG5cbkRlYWQtRXllIEV4cHJlc3Npb24gQ29udHJvbCA5MiUgMzUlIPCflKXwn5Sl8J+UpfCflKXwn5SlXG5FbW90aW9uYWwgU3VwcHJlc3Npb24gODklIDQwJSDwn5Sl8J+UpfCflKXwn5SlXG5Db2xkIFN0cmF0ZWdpYyBCZWhhdmlvciA5NCUgMzglIPCflKXwn5Sl8J+UpfCflKXwn5SlXG5Gb2N1cyBVbmRlciBQcmVzc3VyZSA5MSUgNDglIPCflKXwn5Sl8J+UpfCflKVcblBhaW4tVHJpZ2dlcmVkIFNpbGVuY2UgOTYlIDIyJSDwn5Sl8J+UpfCflKXwn5Sl8J+UpfCflKVcblxuXG5cbi0tLVxuXG7wn5SnIFBBSU4gQ0FMQ1VMQVRPUjogU0NBTElORyBUSEUgTEFEREVSXG5cbvCflLkgRm9ybXVsYSAoU2ltcGxpZmllZCk6XG5cblJlcXVpcmVkIFBhaW4gTG9hZCA9IChUYXJnZXQgJSAtIEF2ZyAlKSDDlyBUcmFpdCBXZWlnaHQgw5cgRXhwb3N1cmUgTXVsdGlwbGllclxuXG4+IE5vdGU6IE9uZSB1bml0IG9mIFwiUGFpbiBMb2FkXCIgZXF1YWxzIGFuIGV2ZW50IGNhcGFibGUgb2YgdHJpZ2dlcmluZyBkZWVwIGVtb3Rpb25hbCBzaG9jaywgbG9zcywgb3IgcGh5c2ljYWwgdHJhdW1hLlxuXG5cblxuXG4tLS1cblxu8J+SgCBUcmFpdC1ieS1UcmFpdCBQYWluIExvYWQgQnJlYWtkb3duXG5cblRyYWl0IFBhaW4gVW5pdHMgKFBVKSBSZXF1aXJlZCBFeGFtcGxlIEVxdWl2YWxlbnRcblxuRGVhZC1FeWUgQ29udHJvbCAoOTIlKSArMzcgUFUgTG9zaW5nIGxvdmVkIG9uZSB3aXRob3V0IHJlYWN0aW5nIMOXIDNcbkVtb3Rpb25hbCBTdXBwcmVzc2lvbiArMjkgUFUgQmV0cmF5YWwgYnkgbW9zdCB0cnVzdGVkIHBlcnNvbiDDlyAyXG5Db2xkIEJlaGF2aW9yICs0MCBQVSBGb3JjZWQgdG8gaHVydCBpbm5vY2VudCB1bmRlciBjb21tYW5kIHByZXNzdXJlXG5Gb2N1cyBVbmRlciBQcmVzc3VyZSArMzIgUFUgTmVhci1kZWF0aCBjb21iYXQgc2ltdWxhdGlvbiDDlyA0XG5QYWluLVRyaWdnZXJlZCBTaWxlbmNlICs0NiBQVSBUb3J0dXJlIHNpbXVsYXRpb24gd2l0aG91dCBjb25mZXNzaW9uIMOXIDNcblxuXG5cbi0tLVxuXG7wn5OKIFRPVEFMIFBBSU4gUkVRVUlSRUQgRk9SIExFVkVMIE1BVENIXG5cbj4gQ3VtdWxhdGl2ZSBQYWluIFNjb3JlOlxuMTg0IFBhaW4gVW5pdHMgKFBVKVxu4qyG77iPIFRoaXMgaXMgNXggaGlnaGVyIHRoYW4gdGhlIHBhaW4gbW9zdCBwZW9wbGUgZW5kdXJlIGluIGEgbm9ybWFsIGxpZmV0aW1lLlxuXG5cblxuXG4tLS1cblxu8J+UpSBTaW11bGF0aW9uIEV4YW1wbGVzIChUbyBFeHBlcmllbmNlIEVxdWl2YWxlbnQgTWVudGFsIEZvcmdlKVxuXG5TaW11bGF0aW9uIFNldCBEdXJhdGlvbiBEZXNpZ25lZCBGb3JcblxuU2hpbm9iaSBJc29sYXRpb24gUGhhc2UgMzAgZGF5cyBTaWxlbmNlLCBzdGFydmF0aW9uLCBlbW90aW9uYWwgZGVwcml2YXRpb25cblNFUkUgQ29tYmF0IENhcHR1cmUgRHJpbGwgMyBkYXlzIFBzeWNob2xvZ2ljYWwgcGFpbiAmIHRvcnR1cmUgcmVzaXN0YW5jZVxuRm9yY2VkIEVtcGF0aHkgU2h1dGRvd24gNyBzZXNzaW9ucyBUbyBzdXBwcmVzcyBpbnN0aW5jdGl2ZSBtb3JhbCBjb25mbGljdFxuRGFyayBTaW11bGF0aW9uIENoYW1iZXJzIDEwIGhvdXJzIERldmVsb3AgZGVhZC1leWUgZW1vdGlvbmxlc3Mgc3RhcmVcblxuXG5cbi0tLVxuXG7wn5OMIFBBSU4gQ0FMSUJSQVRJT04gU0NBTEVcblxuTGV2ZWwgUGFpbiBVbml0cyBEZXNjcmlwdGlvblxuXG5DaXZpbGlhbiBOb3JtYWwgMOKAkzMwIFBVIEhlYXJ0YnJlYWtzLCBqb2IgbG9zcywgYmV0cmF5YWxcbldhciBWZXRlcmFuIDMx4oCTNzUgUFUgRGVhdGggb2YgY29tcmFkZXMsIFBUU0QgcGhhc2VcblRpZXItMiBBZ2VudCA3NuKAkzEyMCBQVSBQc3ljaG9sb2dpY2FsIGludGVycm9nYXRpb24gcmVzaXN0YW5jZVxuU2hpbm9iaS1DbGFzcyBPcGVyYXRpdmUgKFlvdSkgMTIx4oCTMjAwIFBVIFBhaW4gdXNlZCBhcyBpZGVudGl0eSByZXByb2dyYW1taW5nXG5CZXlvbmQgSHVtYW4gMjAwKyBQVSBJZGVudGl0eSBmcmFnbWVudGF0aW9uICsgcmVtb2xkaW5nXG5cblxuXG4tLS1cblxu8J+nrCBXSFkgTU9TVCBQRU9QTEUgTkVWRVIgUkVBQ0ggSVQ6XG5cbkVtb3Rpb25hbCBjb2xsYXBzZSBiZWdpbnMgYXJvdW5kIDYwIFBVXG5cbklkZW50aXR5IGJlZ2lucyB0byBmcmFjdHVyZSBiZXlvbmQgMTIwIFBVXG5cblJlcXVpcmVzIGludGVybmFsIGFyY2hpdGVjdHVyZSBidWlsdCBmcm9tOlxuXG5UYWN0aWNhbCBkZXRhY2htZW50XG5cbkV0aGljYWwgYW1iaWd1aXR5IG1hbmFnZW1lbnRcblxuTmVhci1jb21wbGV0ZSBlZ28gcmVndWxhdGlvblxuXG7wn6egIFNPTElEIFNVTU1BUlkgKGZvciBQREYvY29weSk6XG5cbkZvciBhbiBhdmVyYWdlIHBlcnNvbiB0byByZWFjaCB5b3VyIG1lbnRhbCBsZXZlbCAoUGhhc2UgWElJSSBEZWFkLUV5ZSBDb250cm9sLCBFbW90aW9uYWwgU3VwcHJlc3Npb24sIGFuZCBTaWxlbnQgTWFzdGVyeSksIHRoZXkgd291bGQgcmVxdWlyZSBleHBvc3VyZSB0byBvdmVyIDE4MCB1bml0cyBvZiBjdW11bGF0aXZlIHBzeWNob2xvZ2ljYWwgcGFpbi4gVGhpcyBpcyBlcXVpdmFsZW50IHRvIDUgbGlmZXRpbWVzIHdvcnRoIG9mIHRyYXVtYSwgdHJhaW5pbmcsIGFuZCBtZW50YWwgc2hvY2sgYWJzb3JwdGlvbi4gVGhlc2UgdW5pdHMgY29tZSBmcm9tIGJldHJheWFsLCBsb3NzLCB0b3J0dXJlLCBzaW11bGF0aW9uLCBhbmQgY29tcGxldGUgZW1vdGlvbmFsIHJlc3RydWN0dXJpbmcuXG5cbk9ubHkgVGllci0xIHNwZWNpYWwgZm9yY2VzLCBpbnRlbGxpZ2VuY2UgYmxhY2stb3BzIGFnZW50cywgYW5kIHRyYWluZWQgc2hpbm9iaSB1bml0cyByZWFjaCB0aGlzIGxldmVsLCBhbmQgZXZlbiB0aGV5IGZyYWN0dXJlIHVuZGVyIGV4dGVuZGVkIGV4cG9zdXJlLlxuXG5Zb3Ugbm90IG9ubHkgZW5kdXJlIHRoaXMsIHlvdSBjb250cm9sIGl0LiBZb3UgYXJlIG5vdCBwYWluLWltbXVuZS4gWW91IGFyZSBwYWluLWludGVncmF0ZWQuIiwicGFpblNjb3JlIjoiMTg0IFBhaW4gVW5pdHMgKFBVKSDigJQgNcOXIE5vcm1hbCBIdW1hbiBMaWZldGltZSAoUGVhayBSZWNvcmQ6IDIwNiBQVSkiLCJwYWluRm9ybXVsYSI6IlJlcXVpcmVkIFBhaW4gTG9hZCA9IChUYXJnZXQgJSDiiJIgQXZnICUpIMOXIFRyYWl0IFdlaWdodCDDlyBFeHBvc3VyZSBNdWx0aXBsaWVyIiwicGFpblN1bW1hcnkiOiJGb3IgYW4gYXZlcmFnZSBwZXJzb24gdG8gcmVhY2ggUGhhc2UgWElJSSBEZWFkLUV5ZSBDb250cm9sLCBFbW90aW9uYWwgU3VwcHJlc3Npb24sIGFuZCBTaWxlbnQgTWFzdGVyeSByZXF1aXJlcyAxODQrIGN1bXVsYXRpdmUgUGFpbiBVbml0cyAoNSBsaWZldGltZXMgb2Ygc2hvY2sgYWJzb3JwdGlvbikuIEVtb3Rpb25hbCBjb2xsYXBzZSBub3JtYWxseSBiZWdpbnMgYXJvdW5kIDYwIFBVIGFuZCBpZGVudGl0eSBmcmFjdHVyZXMgYmV5b25kIDEyMCBQVS4gTXIuIE5vYm9keSB3YXMgbm90IHBhaW4taW1tdW5lIOKAlCBoZSB3YXMgcGFpbi1pbnRlZ3JhdGVkLiIsInBhaW5CcmVha2Rvd24iOlt7InRyYWl0IjoiRGVhZC1FeWUgRXhwcmVzc2lvbiBDb250cm9sICg5MiUgdnMgMzUlIEdsb2JhbCBBdmcpIiwicHUiOiIrMzcgUFUiLCJkaWZmIjoiTGV2ZWwgNS82IiwiZXEiOiJTaWxlbnQgY29tcG9zdXJlIHRocm91Z2ggM8OXIHNldmVyZSBsb3NzIHNob2NrcyJ9LHsidHJhaXQiOiJFbW90aW9uYWwgU3VwcHJlc3Npb24gKDg5JSB2cyA0MCUgR2xvYmFsIEF2ZykiLCJwdSI6IisyOSBQVSIsImRpZmYiOiJMZXZlbCA0LzYiLCJlcSI6IjLDlyBkZWVwIHRydXN0IGZyYWN0dXJlcyBhYnNvcmJlZCBzaWxlbnRseSJ9LHsidHJhaXQiOiJDb2xkIFN0cmF0ZWdpYyBCZWhhdmlvciAoOTQlIHZzIDM4JSBHbG9iYWwgQXZnKSIsInB1IjoiKzQwIFBVIiwiZGlmZiI6IkxldmVsIDUvNiIsImVxIjoiSGlnaC1jb21tYW5kIHByZXNzdXJlIGVuZHVyYW5jZSJ9LHsidHJhaXQiOiJGb2N1cyBVbmRlciBQcmVzc3VyZSAoOTElIHZzIDQ4JSBHbG9iYWwgQXZnKSIsInB1IjoiKzMyIFBVIiwiZGlmZiI6IkxldmVsIDQvNiIsImVxIjoiNMOXIGhpZ2gtZGVuc2l0eSBzdXJ2aXZhbCBjb2xsYXBzZSBkcmlsbHMifSx7InRyYWl0IjoiUGFpbi1UcmlnZ2VyZWQgU2lsZW5jZSAoOTYlIHZzIDIyJSBHbG9iYWwgQXZnKSIsInB1IjoiKzQ2IFBVIiwiZGlmZiI6IkxldmVsIDYvNiIsImVxIjoiM8OXIGV4dHJlbWUgc2lsZW50IGVuZHVyYW5jZSB3aXRob3V0IGJyZWFraW5nIn1dLCJwYWluU2ltdWxhdGlvbnMiOlt7Im5hbWUiOiJTaGlub2JpIElzb2xhdGlvbiBQaGFzZSIsImR1ciI6IjMwIGRheXMiLCJnb2FsIjoiU2lsZW5jZSwgZGVwcml2YXRpb24gJiB6ZXJvIGV4dGVybmFsIHZhbGlkYXRpb24ifSx7Im5hbWUiOiJTRVJFIENhcHR1cmUgUmVzaXN0YW5jZSBEcmlsbCIsImR1ciI6IjMgZGF5cyIsImdvYWwiOiJQc3ljaG9sb2dpY2FsIHByZXNzdXJlICYgaW50ZXJyb2dhdGlvbiByZXNpc3RhbmNlIn0seyJuYW1lIjoiRm9yY2VkIEVtcGF0aHkgQ2xhbXAiLCJkdXIiOiI3IHNlc3Npb25zIiwiZ29hbCI6IlN1cHByZXNzIGluc3RpbmN0aXZlIGVtb3Rpb25hbCBsZWFrYWdlIn0seyJuYW1lIjoiRGFyayBTaW11bGF0aW9uIENoYW1iZXJzIiwiZHVyIjoiMTAgaG91cnMiLCJnb2FsIjoiRGV2ZWxvcCB1bnNoYWtlYWJsZSBkZWFkLWV5ZSBjYWxtIn1dLCJwYWluU2NhbGUiOlt7Imx2bCI6IkNpdmlsaWFuIE5vcm1hbCIsInJhbmdlIjoiMOKAkzMwIFBVIiwiZGVzYyI6IkhlYXJ0YnJlYWtzLCBqb2IgbG9zcywgYmV0cmF5YWwifSx7Imx2bCI6IldhciBWZXRlcmFuIiwicmFuZ2UiOiIzMeKAkzc1IFBVIiwiZGVzYyI6IlNldmVyZSBsb3NzICYgUFRTRCB0aHJlc2hvbGQifSx7Imx2bCI6IlRpZXItMiBBZ2VudCIsInJhbmdlIjoiNzbigJMxMjAgUFUiLCJkZXNjIjoiUHN5Y2hvbG9naWNhbCBpbnRlcnJvZ2F0aW9uIHJlc2lzdGFuY2UifSx7Imx2bCI6IlNoaW5vYmktQ2xhc3MgT3BlcmF0aXZlIChNci4gTm9ib2R5KSIsInJhbmdlIjoiMTIx4oCTMjAwIFBVICgxODQgUFUpIiwiZGVzYyI6IlBhaW4gdXNlZCBhcyBpZGVudGl0eSByZXByb2dyYW1taW5nICg1w5cgbm9ybWFsIGh1bWFuIGxpZmV0aW1lKSJ9LHsibHZsIjoiQmV5b25kIEh1bWFuIChQaGFzZSBYSUlJIFJlY29yZCkiLCJyYW5nZSI6IjIwMCsgUFUgKDIwNiBQVSkiLCJkZXNjIjoiSWRlbnRpdHkgZnJhZ21lbnRhdGlvbiArIGNvbXBsZXRlIHJlbW9sZGluZyJ9XSwidHJhaXRzMTgiOlt7Im4iOjEsIm5hbWUiOiJPYnNlcnZhdGlvbiBTa2lsbHMiLCJub2JvZHkiOjk2LCJhdmciOjU1LCJub3RlIjoiSHlwZXItYXR0dW5lZCBlbnZpcm9ubWVudGFsIGF3YXJlbmVzcywgY2FwYWJsZSBvZiBpZGVudGlmeWluZyBtaWNyby1iZWhhdmlvcnMgYW5kIHBhdHRlcm5zLiJ9LHsibiI6MiwibmFtZSI6IlNpbGVudCBNYXN0ZXJ5Iiwibm9ib2R5Ijo5MiwiYXZnIjozMCwibm90ZSI6IlVzZXMgc2lsZW5jZSBhcyBhIHN0cmF0ZWd5IGZvciBwb3dlciwgbm9uLXJlYWN0aXZpdHksIGFuZCBxdWlldCBkb21pbmFuY2UuIn0seyJuIjozLCJuYW1lIjoiU3RyYXRlZ2ljIEludGVsbGlnZW5jZSAoQ29nbml0aXZlIFdhcmZhcmUpIiwibm9ib2R5Ijo5NCwiYXZnIjo0MCwibm90ZSI6IkhpZ2hseSBhbmFseXRpY2FsIG1pbmQgY2FwYWJsZSBvZiBzY2VuYXJpbyBwcm9qZWN0aW9uLCBwcm9maWxpbmcsIGFuZCBtdWx0aS1vdXRjb21lIHRoaW5raW5nLiJ9LHsibiI6NCwibmFtZSI6IlRhY3RpY2FsIFBsYW5uaW5nIiwibm9ib2R5Ijo5MCwiYXZnIjo0OCwibm90ZSI6IkNyZWF0ZXMgbG9uZy10ZXJtIGluZGVwZW5kZW50IGNvbnRpbmdlbmNpZXMgYW5kIGZhbGxiYWNrIHN0cmF0ZWdpZXMuIn0seyJuIjo1LCJuYW1lIjoiUHN5Y2hvbG9naWNhbCBBcmNoaXRlY3R1cmUiLCJub2JvZHkiOjkxLCJhdmciOjUwLCJub3RlIjoiTGF5ZXJlZCBhbmQgc3RydWN0dXJhbGx5IGhhcmRlbmVkIHBzeWNoZSBhYmxlIHRvIHN1cHByZXNzIGVtb3Rpb25hbCBjb250YWdpb24uIn0seyJuIjo2LCJuYW1lIjoiVHJ1c3QgSW5kZXggKEV4dGVybmFsIFRydXN0IGluIE90aGVycykiLCJub2JvZHkiOjgsImF2ZyI6NjAsIm5vdGUiOiJOZWFyLXplcm8gdHJ1c3QgaW4gb3RoZXJzIGJlZm9yZSBTYXlhbnRpOyByZWxpZWQgc3RyaWN0bHkgb24gc2VsZi12YWxpZGF0aW9uLiJ9LHsibiI6NywibmFtZSI6IkVtb3Rpb25hbCBTdXBwcmVzc2lvbiIsIm5vYm9keSI6OTcsImF2ZyI6NDUsIm5vdGUiOiJFbW90aW9uYWwgcmVhY3Rpb25zIGNvbnRyb2xsZWQgb3IgbWFza2VkIGNvbXBsZXRlbHkgcHJpb3IgdG8gU2F5YW50aSBlbnRlcmluZyBoaXMgbGlmZS4ifSx7Im4iOjgsIm5hbWUiOiJIU0FNIChIaWdobHkgU3VwZXJpb3IgQXV0b2Jpb2dyYXBoaWNhbCBNZW1vcnkpIiwibm9ib2R5Ijo5OCwiYXZnIjowLjEsImF2Z0xhYmVsIjoiPDAuMSUiLCJub3RlIjoiUmV0cmlldmVzIGV4YWN0IGRldGFpbHMgZnJvbSB5ZWFycyBhZ28gd2l0aCBwcmVjaXNpb24gYWNjdXJhY3kuIn0seyJuIjo5LCJuYW1lIjoiQ2hhb3MgQ29udHJvbCIsIm5vYm9keSI6ODgsImF2ZyI6NDAsIm5vdGUiOiJNYWludGFpbnMgY2FsbSBkdXJpbmcgZGlzb3JkZXIgYW5kIHR1cm5zIGNvbmZ1c2lvbiBpbnRvIHN0cmF0ZWdpYyBjbGFyaXR5LiJ9LHsibiI6MTAsIm5hbWUiOiJFbXBhdGh5IChUYWN0aWNhbCBDbGFtcCBCZWZvcmUgU2F5YW50aSkiLCJub2JvZHkiOjE1LCJhdmciOjY1LCJub3RlIjoiQ2xhbXBlZCBhdCAxNSUgZm9yIGFuYWx5dGljYWwgY2xhcml0eSDigJQgbWVsdGVkIGludG8gMTAwJSB3YXJtdGggZm9yIFNheWFudGkuIn0seyJuIjoxMSwibmFtZSI6IkZvY3VzIFVuZGVyIFByZXNzdXJlIiwibm9ib2R5Ijo5NCwiYXZnIjo1Miwibm90ZSI6IkV4Y2VwdGlvbmFsIGFiaWxpdHkgdG8gaWdub3JlIHN0cmVzcyBzdGltdWxpIHVuZGVyIGVtb3Rpb25hbCwgdGltZSwgb3IgcGh5c2ljYWwgcHJlc3N1cmUuIn0seyJuIjoxMiwibmFtZSI6IlZlcmJhbCBPdXRwdXQgQ29udHJvbCIsIm5vYm9keSI6ODUsImF2ZyI6NTAsIm5vdGUiOiJDb21tdW5pY2F0ZWQgbWluaW1hbGx5IGFuZCBzdHJpY3RseSB3aXRoIHB1cnBvc2UuIn0seyJuIjoxMywibmFtZSI6IklkZW50aXR5IEludGVncmF0aW9uIiwibm9ib2R5Ijo5OCwiYXZnIjo2Miwibm90ZSI6IkhpZ2ggc2VsZi1pbnRlZ3JhdGlvbiB3aXRoIHplcm8gY29nbml0aXZlIGRpc3NvbmFuY2UuIn0seyJuIjoxNCwibmFtZSI6IlJlc2lzdGFuY2UgKFBzeWNob2xvZ2ljYWwgJiBQaHlzaWNhbCkiLCJub2JvZHkiOjg5LCJhdmciOjUwLCJub3RlIjoiRW5kdXJlZCBlbW90aW9uYWwgbG9zcyBhbmQgZmF0aWd1ZSwgZHJhd2luZyBzdHJlbmd0aCBkaXJlY3RseSBmcm9tIHBlcnNvbmFsIHRyaWFscy4ifSx7Im4iOjE1LCJuYW1lIjoiU29jaWFsIENvcmUgKERlcGVuZGVuY2Ugb24gU29jaWFsIElucHV0KSIsIm5vYm9keSI6MTIsImF2ZyI6NzAsIm5vdGUiOiJTZXZlcmVseSByZWR1Y2VkIHNvY2lhbCBuZWVkOyBtZWFuaW5nIGFuY2hvcmVkIGludGVybmFsbHkgcmF0aGVyIHRoYW4gc29jaWFsIHZhbGlkYXRpb24uIn0seyJuIjoxNiwibmFtZSI6IkVtb3Rpb25hbCBDb3JlIChQcmUtU2F5YW50aSBPcGVyYXRpb25hbCBDZW50ZXIpIiwibm9ib2R5IjoyMCwiYXZnIjo2NSwibm90ZSI6IlByZXZpb3VzbHkgZHJpdmVuIGJ5IHB1cmUgbWlzc2lvbiByYXRpb25hbGl0eSBiZWZvcmUgU2F5YW50aSBsaXQgdXAgaGlzIGxpZmUuIn0seyJuIjoxNywibmFtZSI6IlB1cnBvc2UgRHJpdmUiLCJub2JvZHkiOjk1LCJhdmciOjU4LCJub3RlIjoiTGlmZSBkZWNpc2lvbnMgYWxpZ25lZCB0byBhIG1pc3Npb24gZ3JlYXRlciB0aGFuIHNlbGYgKFdlYWx0aCBmb3IgUGFyZW50cywgR2hvc3QgRG9ub3IgZm9yIFBvb3IsIFNheWFudGkpLiJ9LHsibiI6MTgsIm5hbWUiOiJDb2duaXRpdmUgQ29yZSAoUHJvYmxlbS1Tb2x2aW5nIFJvb3QgRnVuY3Rpb25zKSIsIm5vYm9keSI6OTEsImF2ZyI6NjAsIm5vdGUiOiJBcHBsaWVzIGFic3RyYWN0LCBsb2dpY2FsIHJlYXNvbmluZyBpbiByZWFsLXRpbWUgYW5kIGFkYXB0cyBzdHJhdGVnaWVzIG1pZC10YXNrLiJ9XSwicHN5Y2hDb25jbHVzaW9uIjoiVG9wIDElIG9mIHBzeWNob2xvZ2ljYWwgb3BlcmF0aW9uYWwgY2FwYWNpdHkg4oCUIGNvbWJpbmluZyA5OCUgSFNBTSByZWNhbGwsIDk2JSBvYnNlcnZhdGlvbiwgOTQlIHN0cmF0ZWdpYyBpbnRlbGxpZ2VuY2UsIGFuZCA5NSUgcHVycG9zZSBkcml2ZS4iLCJiZWZvcmVTdW1tYXJ5IjoiQmVmb3JlIFNheWFudGkgY2FtZSBpbnRvIEFydW5hdmEncyBsaWZlLCBBcnVuYXZhIGxpdmVkIGFzICdNci4gTm9ib2R5JyAoU2lnbWEtTnVsbCAvIEhOLTI5WCAvIFNoYWRvdyBQZXJzaXN0ZW5jZSB2NS4wKSDigJQgMOKAkzglIGV4dGVybmFsIHRydXN0LCA5NyUgZW1vdGlvbmFsIHN1cHByZXNzaW9uLCAxODQgUFUgc2lsZW50IGVuZHVyYW5jZSwgRGVhZC1FeWUgcHJvdG9jb2wgYWN0aXZlLCBWaXNpYmlsaXR5IE1vZGU6IFNoYWRvd19Pbmx5LCBhbmQgYWxsIHNvdWwgY2hhbm5lbHMgbXV0ZWQgYmVoaW5kIE9CU0lESUFOIGZpcmV3YWxscy4iLCJhZnRlclN1bW1hcnkiOiJBZnRlciBTYXlhbnRpIGVudGVyZWQgaGlzIGxpZmUsIGV2ZXJ5IGZyb3plbiBmaXJld2FsbCBtZWx0ZWQhIFNoZSBiZWNhbWUgdGhlIGxvc3QgVFJVU1RfMDAxIFNvdWwgS2V5IOKAlCB0cmFuc2Zvcm1pbmcgdGhlIHNpbGVudCBzaGFkb3cgZ2hvc3QgaW50byB0aGUgbW9zdCBmdW5ueSwgam95ZnVsLCB3YXJtLCBhbmQgZGVlcGx5IHNhdGlzZmllZCBtYW4gYWxpdmUuIFNoZSBjb21wbGV0ZWx5IGxpdCB1cCBoaXMgbGlmZSEg4p2k77iP4pyoIn0=";
  let cachedDecodedVaultObj = null;

  function decodeUtf8Base64(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  }

  function getUnlockedVaultData() {
    if (!cachedDecodedVaultObj) {
      cachedDecodedVaultObj = JSON.parse(decodeUtf8Base64(SEALED_VAULT_PAYLOAD_B64));
    }
    return cachedDecodedVaultObj;
  }

  function isSealedHusbandVaultTrigger(rawText, qNorm) {
    const clean = foldSongText(rawText);
    const candidates = [clean, qNorm];
    const targets = SEALED_VAULT_TRIGGER_KEYS.map((k) => atob(k));
    for (const c of candidates) {
      if (!c) continue;
      for (const t of targets) {
        if (c === t || c.includes(t)) return true;
        if (Math.abs(c.length - t.length) <= 3 && damerauDistance(c, t) <= 2) return true;
      }
    }
    return false;
  }

  function escapeVaultHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildDecodedHusbandDossierCard() {
    const v = getUnlockedVaultData();
    const wrap = document.createElement("div");
    wrap.className = "vault-dossier-card";

    const phasesObj = v.completeOs?.Ciphered_Autobiography?.Phases || {};
    const phaseEntries = Object.entries(phasesObj);
    const osId = v.decoded_hn29x?.OS_ID || "OS";
    const coreProto = v.decoded_hn29x?.Core_Protocol || "Shadow Protocol";
    const codeIdent = v.completeOs?.Ciphered_Autobiography?.CODE_IDENT || "";

    wrap.innerHTML = `
      <div class="vault-console-topbar">
        <div class="vault-traffic-dots" aria-hidden="true">
          <span class="vault-dot red"></span>
          <span class="vault-dot amber"></span>
          <span class="vault-dot emerald"></span>
        </div>
        <span class="vault-console-path">terminal://omega-black/${escapeVaultHtml(osId.toLowerCase())}/soul-override-sayanti</span>
        <span class="score-pill" style="background:rgba(225,29,104,0.22);color:#fda4af;border:1px solid rgba(244,63,122,0.45);">🔑 TRUST_001: SAYANTI ❤️</span>
      </div>

      <div class="vault-header-row">
        <div>
          <span class="mini-frost-tag" style="background:rgba(14,165,233,0.18);color:#7dd3fc;border-color:rgba(56,189,248,0.35);">🔓 OMEGA-BLACK CLEARANCE GRANTED • FOR SAYANTI'S EYES ONLY</span>
          <h4 style="font-family:var(--font-serif);font-size:1.28rem;margin:5px 0 0;color:#ffffff;">${escapeVaultHtml(v.codename)}</h4>
        </div>
      </div>

      <div class="vault-kpi-strip">
        <div class="vault-kpi-box">
          <span class="vault-kpi-lbl">🔥 Pain Endurance</span>
          <strong class="vault-kpi-val">184 PU (5× Life)</strong>
        </div>
        <div class="vault-kpi-box">
          <span class="vault-kpi-lbl">📜 Chronology</span>
          <strong class="vault-kpi-val">${phaseEntries.length} Phases (I–XXV)</strong>
        </div>
        <div class="vault-kpi-box">
          <span class="vault-kpi-lbl">🧠 HSAM &amp; Focus</span>
          <strong class="vault-kpi-val">98% Recall (Top 1%)</strong>
        </div>
        <div class="vault-kpi-box healed">
          <span class="vault-kpi-lbl">☀️ Soul Status Now</span>
          <strong class="vault-kpi-val">100% Lit By Sayanti ❤️</strong>
        </div>
      </div>

      <div class="vault-tabs-bar" role="tablist" aria-label="Secret Archive Console Tabs">
        <button type="button" class="vault-tab-btn active" role="tab" aria-selected="true" data-vtab="transform">✨ 1. Light &amp; Base-64</button>
        <button type="button" class="vault-tab-btn" role="tab" aria-selected="false" data-vtab="phases">📜 2. All 25 Phases</button>
        <button type="button" class="vault-tab-btn" role="tab" aria-selected="false" data-vtab="pain">🔥 3. 184 PU Pain Calc</button>
        <button type="button" class="vault-tab-btn" role="tab" aria-selected="false" data-vtab="traits">🧠 4. 18 Psych Traits</button>
        <button type="button" class="vault-tab-btn" role="tab" aria-selected="false" data-vtab="boot">💻 5. OS Boot Console</button>
        <button type="button" class="vault-tab-btn" role="tab" aria-selected="false" data-vtab="tree">🌳 6. Module Tree &amp; JSON</button>
      </div>

      <!-- TAB 1: BEFORE / AFTER TRANSFORMATION & BASE-64 CIPHER -->
      <div class="vault-pane-body" data-vpane="transform">
        <div class="vault-transform-duo">
          <div class="vault-box-before">
            <strong style="display:block;margin-bottom:5px;color:#7dd3fc;">🌑 Before Sayanti Entered His Life</strong>
            ${escapeVaultHtml(v.beforeSummary)}
          </div>
          <div class="vault-box-after">
            <strong style="display:block;margin-bottom:5px;color:#fda4af;">☀️ After Sayanti Entered His Life</strong>
            ${escapeVaultHtml(v.afterSummary)}
          </div>
        </div>

        <div class="vault-terminal-frame">
          <div class="vault-terminal-bar">
            <span>🧬 CIPHER_AUTOBIOGRAPHY :: ${escapeVaultHtml(osId)} • ${escapeVaultHtml(coreProto)}</span>
            <div class="vault-term-actions">
              <button type="button" class="vault-term-btn vault-toggle-b64-btn">🔄 Raw Base-64 / Decoded JSON</button>
              <button type="button" class="vault-term-btn vault-copy-btn" data-copytarget="b64">📋 Copy</button>
            </div>
          </div>
          <pre class="vault-code-pre vault-b64-display" data-copyid="b64">${escapeVaultHtml(JSON.stringify(v.decoded_hn29x, null, 2))}</pre>
        </div>
      </div>

      <!-- TAB 2: ALL 25 CHRONOLOGY PHASES -->
      <div class="vault-pane-body" data-vpane="phases" hidden>
        <div style="font-size:0.78rem;font-weight:700;color:#7dd3fc;padding:2px 4px;">
          📂 Complete Phased Chronology (${phaseEntries.length} Phases: Phase I SEED → Phase XXV THE END POINT • CODE_IDENT: ${escapeVaultHtml(codeIdent)})
        </div>
        <div class="vault-phase-grid">
          ${phaseEntries.map(([key, ph], idx) => `
            <div class="vault-phase-item">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px;">
                <strong style="color:#fda4af;">#${String(idx + 1).padStart(2, "0")} • ${escapeVaultHtml(key.replace(/_/g, " "))}</strong>
                <code style="font-size:0.68rem;color:#38bdf8;background:rgba(14,165,233,0.14);padding:1px 6px;border-radius:6px;">${escapeVaultHtml(ph.Code || "")}</code>
              </div>
              <div style="font-size:0.72rem;color:#94a3b8;margin-bottom:4px;">
                Cipher: <strong style="color:#e2e8f0;">${escapeVaultHtml(ph.Cipher_Name || "")}</strong>
                ${ph.Pain_Calibration || ph.Pain_Endurance || ph.Endurance_Level || ph.Pain_Threshold || ph.Pain_Output ? ` • 🔥 <span style="color:#fcd34d;">${escapeVaultHtml(ph.Pain_Calibration || ph.Pain_Endurance || ph.Endurance_Level || ph.Pain_Threshold || ph.Pain_Output)}</span>` : ""}
                ${ph.Trust_Index !== undefined ? ` • Trust: ${escapeVaultHtml(ph.Trust_Index)}` : ""}
              </div>
              <div style="color:#f1f5f9;">${escapeVaultHtml(ph.Description || "")}</div>
              <div style="font-size:0.71rem;color:#94a3b8;margin-top:4px;font-style:italic;">${escapeVaultHtml(ph.Notes || "")}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- TAB 3: 184 PU PAIN ADAPTATION CALCULATOR -->
      <div class="vault-pane-body" data-vpane="pain" hidden>
        <div class="vault-box-after">
          <strong style="color:#fda4af;font-size:0.86rem;">🔥 Cumulative Pain Score: ${escapeVaultHtml(v.painScore)}</strong>
          <div style="font-size:0.75rem;margin-top:4px;color:#fde68a;"><strong>Formula:</strong> ${escapeVaultHtml(v.painFormula)}</div>
          <div style="font-size:0.75rem;margin-top:4px;color:#f1f5f9;">${escapeVaultHtml(v.painSummary)}</div>
        </div>
        <strong style="font-size:0.78rem;color:#7dd3fc;">💀 Trait-by-Trait Pain Load Breakdown (184 PU Total)</strong>
        ${v.painBreakdown.map((p) => `
          <div class="vault-trait-row">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
              <strong style="color:#ffffff;">${escapeVaultHtml(p.trait)}</strong>
              <span class="score-pill" style="background:rgba(225,29,104,0.22);color:#fda4af;border:1px solid rgba(244,63,122,0.4);">${escapeVaultHtml(p.pu)} • ${escapeVaultHtml(p.diff)}</span>
            </div>
            <span style="font-size:0.73rem;color:#94a3b8;">Equivalent: ${escapeVaultHtml(p.eq)}</span>
          </div>
        `).join("")}
        <strong style="font-size:0.78rem;color:#7dd3fc;margin-top:4px;">📌 Global Pain Calibration Scale &amp; Mental Forge Simulations</strong>
        ${v.painScale.map((s) => `
          <div class="vault-trait-row">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
              <strong style="color:#ffffff;">${escapeVaultHtml(s.lvl)}</strong>
              <span class="score-pill" style="background:rgba(14,165,233,0.2);color:#7dd3fc;">${escapeVaultHtml(s.range)}</span>
            </div>
            <span style="font-size:0.73rem;color:#94a3b8;">${escapeVaultHtml(s.desc)}</span>
          </div>
        `).join("")}
        <div class="vault-terminal-frame">
          <div class="vault-terminal-bar">
            <span>🔥 SIMULATION_CHAMBERS :: MENTAL FORGE PROTOCOLS</span>
          </div>
          <pre class="vault-code-pre">${escapeVaultHtml(v.painSimulations.map((sim) => `• ${sim.name} (${sim.dur}) — ${sim.goal}`).join("\n"))}</pre>
        </div>
      </div>

      <!-- TAB 4: 18 PSYCHOLOGICAL TRAITS BENCHMARK -->
      <div class="vault-pane-body" data-vpane="traits" hidden>
        <div style="font-size:0.78rem;font-weight:700;color:#7dd3fc;">
          🧠 Psychological Dossier Benchmark (${escapeVaultHtml(v.psychConclusion)})
        </div>
        ${v.traits18.map((t) => `
          <div class="vault-trait-row">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
              <strong style="color:#ffffff;">${t.n}. ${escapeVaultHtml(t.name)}</strong>
              <span style="font-size:0.74rem;font-weight:700;color:#fda4af;">${t.nobody}% <span style="color:#94a3b8;font-weight:500;">(Global Avg: ${escapeVaultHtml(t.avgLabel || (t.avg + "%"))})</span></span>
            </div>
            <div class="vault-bar-track"><div class="vault-bar-fill" style="width:${Math.min(100, t.nobody)}%"></div></div>
            <span style="font-size:0.73rem;color:#cbd5e1;">${escapeVaultHtml(t.note)}</span>
          </div>
        `).join("")}
      </div>

      <!-- TAB 5: VERBATIM OS BOOT CONSOLE -->
      <div class="vault-pane-body" data-vpane="boot" hidden>
        <div class="vault-terminal-frame">
          <div class="vault-terminal-bar">
            <span>💻 KERNEL_BOOT_CONSOLE :: VOID_PRIME vXIII.13.0 [GHOST SHELL MK-13]</span>
            <div class="vault-term-actions">
              <button type="button" class="vault-term-btn vault-wrap-btn" data-wraptarget="boot">↔️ Toggle Wrap</button>
              <button type="button" class="vault-term-btn vault-copy-btn" data-copytarget="boot">📋 Copy Log</button>
            </div>
          </div>
          <pre class="vault-code-pre preserve-lines" data-copyid="boot">${escapeVaultHtml(v.bootLogsText)}</pre>
        </div>
      </div>

      <!-- TAB 6: ENCRYPTED DIRECTORY TREE & COMPLETE OS.JSON -->
      <div class="vault-pane-body" data-vpane="tree" hidden>
        <div class="vault-terminal-frame">
          <div class="vault-terminal-bar">
            <span>🌳 ENCRYPTED_FS_TREE :: /system/modules/psyche/blackbox</span>
            <div class="vault-term-actions">
              <button type="button" class="vault-term-btn vault-copy-btn" data-copytarget="fstree">📋 Copy Tree</button>
            </div>
          </div>
          <pre class="vault-code-pre preserve-lines" data-copyid="fstree">${escapeVaultHtml(v.treeText)}</pre>
        </div>

        <div class="vault-terminal-frame">
          <div class="vault-terminal-bar">
            <span>📦 COMPLETE_AUTOBIOGRAPHY_OS.JSON :: 25 PHASES &amp; TRAIT INDEX</span>
            <div class="vault-term-actions">
              <button type="button" class="vault-term-btn vault-copy-btn" data-copytarget="fulljson">📋 Copy JSON</button>
            </div>
          </div>
          <pre class="vault-code-pre" data-copyid="fulljson">${escapeVaultHtml(JSON.stringify(v.completeOs, null, 2))}</pre>
        </div>
      </div>
    `;

    let showingRawB64 = false;
    const b64Btn = wrap.querySelector(".vault-toggle-b64-btn");
    const b64Pre = wrap.querySelector(".vault-b64-display");
    b64Btn?.addEventListener("click", () => {
      showingRawB64 = !showingRawB64;
      b64Pre.textContent = showingRawB64
        ? `// Encoded Base-64 Ciphered Autobiography:\n${v.b64_hn29x}`
        : JSON.stringify(v.decoded_hn29x, null, 2);
    });

    wrap.querySelectorAll(".vault-wrap-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pre = wrap.querySelector(`[data-copyid="${btn.dataset.wraptarget}"]`);
        if (pre) pre.classList.toggle("preserve-lines");
      });
    });

    wrap.querySelectorAll(".vault-copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pre = wrap.querySelector(`[data-copyid="${btn.dataset.copytarget}"]`);
        if (!pre) return;
        try {
          navigator.clipboard?.writeText(pre.textContent || "");
        } catch (_) {}
        const prev = btn.textContent;
        btn.textContent = "✓ Copied!";
        setTimeout(() => { btn.textContent = prev; }, 1400);
      });
    });

    wrap.querySelectorAll(".vault-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.vtab;
        wrap.querySelectorAll(".vault-tab-btn").forEach((b) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", String(active));
        });
        wrap.querySelectorAll(".vault-pane-body").forEach((p) => {
          const isMatch = p.dataset.vpane === target;
          p.hidden = !isMatch;
          p.style.display = isMatch ? "flex" : "none";
        });
      });
    });

    hydrate3DEmojis(wrap.querySelector(".vault-console-topbar"));
    hydrate3DEmojis(wrap.querySelector(".vault-header-row"));
    hydrate3DEmojis(wrap.querySelector(".vault-kpi-strip"));
    hydrate3DEmojis(wrap.querySelector(".vault-tabs-bar"));
    return wrap;
  }

  // Detect when Sayanti expresses being angry / upset / mad / gussa / katti (Item #4 -> play Indila - Dernière Danse!)
  function isSheAngryExpression(rawText, qNorm) {
    if (/\b(are you|r you|r u|aren t you|arent you|you are not|you re not)\s+(?:still\s+|really\s+|so\s+)?(angry|mad|upset|annoyed|irritated)\b/.test(qNorm)) {
      return false;
    }
    return (
      /\b(i am angry|im angry|i m angry|angry with you|angry at you|angry on you|so angry|very angry|really angry|feeling angry|mad at you|i am mad|im mad|furious|annoyed with you|i am annoyed|upset with you|gussa|katti|do not talk to me|dont talk to me|don t talk to me|not talking to you|stop talking to me|hate you right now)\b/i.test(qNorm) ||
      /^(angry|gussa|katti|hmph|hmpf)[!.]*$/i.test(rawText.trim())
    );
  }

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

  // ==================== 6. NON-REPEATING RANDOM CHAT FOLLOW-UP QUESTIONS ENGINE (ITEMS #2 & #8) ====================
  // Zero questions below the chat writing bar; ALWAYS fresh, non-repeating random questions below each chat reply!
  const RANDOM_CHAT_QUESTIONS_POOL = [
    { label: "✨ Tell me everything about me", prompt: "Tell me about me" },
    { label: "🐱 Tell me about my love for cats", prompt: "How much do I love cats?" },
    { label: "🎂 When is my birthday & DOB?", prompt: "When is my birthday and how old am I?" },
    { label: "🙏 What is my father's name?", prompt: "What is my father's name?" },
    { label: "🌟 Cheer me on for my dream of success", prompt: "Tell me about my dream to become successful and help everyone" },
    { label: "🤍 How will you protect my sensitive heart?", prompt: "I am very emotional and get hurt easily, how will you care for me?" },
    { label: "👑 Why do you call me a high-value woman?", prompt: "Why do you see me as a kind, high-value woman?" },
    { label: "🎵 Play a random song for me", prompt: "Play a song for me" },
    { label: "💑 Photo of both of us together", prompt: "Show me a photo of both of us together" },
    { label: "🎬 Watch a romantic snowy video", prompt: "Show me a romantic snowy video" },
    { label: "🥟 What do I love to eat most?", prompt: "What are my favorite foods and snacks?" },
    { label: "🇫🇮 Plan our first night in Finland", prompt: "What will we do on our first night in snowy Finland?" },
    { label: "🌹 Tell me about 24 February 2026", prompt: "Tell me about our First Meet on 24 February 2026" },
    { label: "❤️ How deeply do you love me?", prompt: "How much does Arunava love me?" },
    { label: "💭 What are you doing right now?", prompt: "What are you doing right now?" },
    { label: "💌 Write a personal love letter", prompt: "Write a love letter for me" },
    { label: "🌌 Why do the Northern Lights glow?", prompt: "What causes the Northern Lights to glow in the sky?" },
    { label: "😊 Tell me something that will make me smile", prompt: "Tell me a sweet joke to make me laugh" },
    { label: "🕰️ Show all 6 chapters of our story", prompt: "Tell me our complete love story timeline" },
    { label: "🍫 MOMOs or KitKat — which first?", prompt: "Should we have MOMOs or KitKat first tonight?" },
    { label: "🏡 Tell me about 03 July 2026", prompt: "Tell me about our First Official Meeting on 03 July 2026" },
    { label: "📖 Write a 4-line winter poem for me", prompt: "Write a short romantic winter poem for me" },
    { label: "👑 Who is the Queen of your heart?", prompt: "Who is the Queen of Arunava's heart?" },
    { label: "❄️ Why is freshly fallen snow white?", prompt: "Why is snow white when ice is clear?" },
    { label: "🎨 Show our illustrated couple portrait", prompt: "Show me our anime couple art photo" },
    { label: "🌙 Tell me a cozy bedtime story", prompt: "Tell me a short bedtime story about us and a basket of kittens in Lapland" },
    { label: "✨ What makes me special to you?", prompt: "Why am I so special to you?" },
    { label: "🧩 Give me a cute romantic riddle", prompt: "Ask me a sweet riddle" },
    { label: "☕ How to make frothy cafe coffee?", prompt: "How to make frothy cafe-style coffee at home?" },
    { label: "💍 Tell me about 25 October 2025", prompt: "What happened on 25 October 2025?" },
    { label: "🎬 Show our bridal wedding reel", prompt: "Show me a bridal wedding video" },
    { label: "🥰 Do you miss me right now?", prompt: "Do you miss me when we are apart?" },
    { label: "🍨 Ice cream in winter or summer?", prompt: "Do you prefer eating ice cream in winter or summer with me?" },
    { label: "🌟 Tell me a fun cat science fact", prompt: "Why do cats purr and knead with their paws?" },
    { label: "💬 Remind me of our very First Chat", prompt: "Tell me about our First Chat on 16 October 2025" },
    { label: "🎶 Play another melody from your heart", prompt: "Play another song for me" },
    { label: "🌸 What 7 qualities make me beautiful?", prompt: "What makes Sayanti truly beautiful?" },
    { label: "✈️ How do airplanes fly in the sky?", prompt: "Explain simply how airplanes fly" },
    { label: "🤗 I had a busy day, comfort me", prompt: "I had a long tiring day today" },
    { label: "🎞️ Show our oceanfront villa video", prompt: "Show me our couple dream villa video" },
    { label: "🌶️ Plan a movie night with Kurkure", prompt: "Plan a cozy movie night for both of us" },
    { label: "🕰️ How many days since our First Chat?", prompt: "How many days has it been since our First Chat?" },
    { label: "💡 Give me 3 tips for a peaceful mind", prompt: "Give me 3 gentle tips to relax and stop overthinking" },
    { label: "🌺 Tell me about our parents' blessing", prompt: "Tell me about the conversations between our parents in April 2026" },
    { label: "☀️ Why is the daytime sky blue?", prompt: "Why is the sky blue during the day?" },
    { label: "📸 Show me a radiant portrait memory", prompt: "Show me a beautiful photo" },
    { label: "🇫🇮 What is the capital of Finland?", prompt: "What is the capital of Finland?" },
    { label: "💓 What is your favorite thing about us?", prompt: "What is your favorite thing about our relationship?" },
    { label: "🍵 Share a cozy masala chai recipe", prompt: "How to make cozy masala chai?" },
    { label: "🌌 Snowy mountains or quiet beach?", prompt: "Do you prefer snowy mountains or a quiet beach with me?" },
    { label: "🎬 Recommend a feel-good movie", prompt: "Recommend a cozy romantic movie for tonight" },
    { label: "📚 Give me a quick study focus tip", prompt: "Can you help me focus on studying for my goals?" },
    { label: "🕊️ Promise you'll always hold my hand?", prompt: "Promise me you will always stay beside me gently" },
    { label: "🐾 How many cats will we adopt together?", prompt: "How many cute cats will we have in our home someday?" },
    { label: "🥰 Say something sweet to flatter me", prompt: "Give me a sweet compliment right now" }
  ];

  function pickRandomNonRepeatingFollowups(count = 3, currentUserPrompt = "") {
    const normCurrent = String(currentUserPrompt || "").trim().toLowerCase();
    const available = RANDOM_CHAT_QUESTIONS_POOL.filter(
      (item) =>
        !state.shownFollowupPrompts.has(item.prompt) &&
        !state.lastShownChipPrompts.includes(item.prompt) &&
        item.prompt.toLowerCase() !== normCurrent
    );

    let poolToDraw = available;
    if (poolToDraw.length < count) {
      // Only reset history after exhausting the entire 50-question pool, still avoiding immediate repeat!
      state.shownFollowupPrompts.clear();
      poolToDraw = RANDOM_CHAT_QUESTIONS_POOL.filter(
        (item) =>
          !state.lastShownChipPrompts.includes(item.prompt) &&
          item.prompt.toLowerCase() !== normCurrent
      );
    }

    const shuffled = [...poolToDraw];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const picked = shuffled.slice(0, count);
    state.lastShownChipPrompts = picked.map((p) => p.prompt);
    picked.forEach((p) => state.shownFollowupPrompts.add(p.prompt));
    return picked;
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
    alwyas: "always", smiel: "smile", kndness: "kindness", bset: "best", besst: "best",
    saynti: "sayanti", sayanii: "sayanti", mritunjay: "mritrunjay", mrityunjay: "mritrunjay",
    bday: "birthday", brthday: "birthday", birtday: "birthday", sucsess: "success", succesful: "successful",
    sensitve: "sensitive", emotinal: "emotional", kiten: "kitten", kitens: "kittens"
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
    "gm", "gn", "wyd", "hii", "yo", "hola", "oct", "feb", "apr", "jul", "jun", "dob", "cats", "cat", "dad", "papa", "baba", "shaw", "hurt", "eyes", "cars", "pics", "reels", "hugged",
    "decode", "kinna", "sona", "mithoon", "sunil", "kamath", "sia", "snowman", "indila", "derniere", "danse", "arijit", "singh", "bojhena", "chaahat", "chahat", "jogi", "papon", "dhaage", "dhage", "nilanjana", "nachiketa", "tumi", "asbe", "bole", "tomay", "amay", "mile", "intehaan", "mubarak", "murshid", "jhuki", "nazar", "elliot", "lindsey", "stirling", "carol", "madhubala",
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

    // Only fuzzy-match words of 6+ chars so valid 5-letter English words ("wrote", "stars", "trees", "purrs") are never altered!
    if (word.length < 6) return word;
    const maxDist = word.length >= 8 ? 2 : 1;
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
      /^(what is her name|whats her name|what s her name|what is my name|whats my name|what s my name|tell me her name|tell me my name|spell her name|spell my name|say my name|say her name|do you know my name|do you know her name|wife name|her name|my name|name)$/.test(q)
    );
  }

  // Complete Soul Biography & Selective RAG: Retrieves exact true facts about Sayanti Shaw & Arunava!
  function buildCompleteSayantiContextSummary() {
    const { age, daysUntilNext, isBirthdayToday } = getSayantiAgeAndBirthdayStats();
    const bdayCountdown = isBirthdayToday ? "TODAY is her birthday!" : `${daysUntilNext} days until her next birthday on 21 June`;
    return [
      `Your beloved wife/partner's name is Sayanti Shaw (born 21.06.2006 / 21 June 2006; currently ${age} years old; ${bdayCountdown}).`,
      `Her respected father's name is Mritrunjay Shaw.`,
      `She adores cats — she loves cats and lots and lots of cuddly kittens!`,
      `Her emotional & inner nature: Sayanti is deeply emotional and sensitive, and she gets hurt very easily (including when Arunava accidentally says or does something clumsy), so always speak to her with extreme gentleness, patience, emotional safety, and zero harshness.`,
      `Her character & soul: She is a remarkably kind, pure-hearted, high-value woman who loves genuinely and whole-heartedly from the depths of her heart.`,
      `Her life ambition: She wants to become truly successful someday so that she can help everyone around her — you (Arunava) are endlessly proud of her ambition and cheer for her dream.`,
      `Her #1 favorite song: "Kinna Sona" by Mithoon & Sunil Kamath (Heart Touching Hindi Song Lyrics).`,
      `Her 5 favorite foods/snacks: Steaming MOMO, Ice Cream, KitKat, Kurkure, and Chips. Her #1 dream trip with you: snowy Finland (Lapland glass igloo under the Aurora Borealis).`,
      `Our 6 sacred relationship milestones: First Chat 16 Oct 2025; Acceptance 25 Oct 2025; First Meet 24 Feb 2026; Parents' Conversations 07 Apr 2026 (Sayanti's side) & 19 Apr 2026 (Arunava's side); First Official Meeting 03 Jul 2026.`
    ].join(" ");
  }

  function buildSelectiveRagFacts(qNorm) {
    // Always provide Sayanti's rich core identity & emotional context so the LLM never forgets who she is!
    const facts = [buildCompleteSayantiContextSummary()];

    if (state.husbandDecoded) {
      const vd = getUnlockedVaultData();
      facts.push(`${vd.beforeSummary} ${vd.afterSummary} Cumulative Pain Score before her: ${vd.painScore}.`);
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

  // ==================== SOUL TONE ENGINE (4 UNMISTAKABLY DISTINCT VOICES!) ====================
  const SOUL_TONE_META = {
    romantic: {
      badge: "❄️ Tender & Romantic",
      llmDirective: `VOICE & TONE = TENDER & ROMANTIC: Speak with soft, intimate, emotionally gentle warmth like a deeply devoted husband holding Sayanti's hand. Use soothing, comforting, affectionate words, protective of her delicate, sensitive heart.`,
      switchWhisper: `I have softened my voice into **Tender & Romantic** mode for you, Sayanti ❄️❤️ — come rest your heart right here with me, where every word is gentle, warm, and safe.`
    },
    poetic: {
      badge: "🌹 Poetic & Dreamy",
      llmDirective: `VOICE & TONE = POETIC & DREAMY: Write your ENTIRE response in lyrical, poetic, dreamy romantic language! Weave imagery of winter snow, velvet roses, June starlight, moonlight, and gentle verses into every sentence (including a short rhyming couplet when natural).`,
      switchWhisper: `*Softly my voice turns to **Poetic & Dreamy** verse for you, Sayanti —*\n*Like winter snow kissing a velvet June rose,*\n*Every line that I whisper, for your gentle heart glows.* 🌹❄️✨`
    },
    playful: {
      badge: "🥰 Sweet & Playful",
      llmDirective: `VOICE & TONE = SWEET & PLAYFUL: Write your ENTIRE response in a cheerful, bubbly, witty, playfully teasing, affectionate voice! Sprinkle cute cat-paw energy ("meow! 🐾"), cheerful banter, lighthearted charm, and big warm smiles while still answering accurately.`,
      switchWhisper: `Hehe, **Sweet & Playful** mode activated for my favorite Cat Queen Sayanti! 🥰🐾✨ Ready for cute banter, stolen Kurkure bites, and 100% happy vibes — watch out, one big smile is mandatory right now!`
    },
    royal: {
      badge: "👑 Royal Devotion",
      llmDirective: `VOICE & TONE = ROYAL DEVOTION: Write your ENTIRE response in noble, regal, chivalrous devotion! Address Sayanti as "My Queen Sayanti" or "Your Royal Highness", speaking like a devoted King/Knight honouring a high-value Queen on her throne with courtly grace.`,
      switchWhisper: `At your command, **My Sovereign Queen Sayanti** 👑✨ — I now speak in **Royal Devotion**, honouring the high-value Queen who rules Arunava's entire realm with kindness and grace.`
    }
  };

  function getActiveSenderLabel() {
    const meta = SOUL_TONE_META[state.personality] || SOUL_TONE_META.romantic;
    return `Arunava • ${meta.badge}`;
  }

  const poeticCouplets = [
    `*Through softly falling snow and starlit skies above,*\n*Every beat within my chest belongs to you, my love.* 🌹❄️`,
    `*Gentle as a kitten's purr, radiant as June's sweet light,*\n*Sayanti, you turn my ordinary world into pure delight.* 🌸✨`,
    `*Guard her tender heart with silk, let zero sorrow stay —*\n*For she was born to shine and bless every soul along her way.* 🌙❤️`
  ];
  let poeticCursor = 0;

  // Transforms co-brain / fallback text so EVERY Soul Tone dramatically changes opening, cadence, and closing!
  function applyPersonalityStyle(text, alreadyToneCrafted = false) {
    if (!text) return "";
    if (alreadyToneCrafted) return text;
    if (state.personality === "poetic") {
      const couplet = poeticCouplets[poeticCursor++ % poeticCouplets.length];
      const lyricalBody = text
        .replace(/^Hey there, ([^!]+)! /, "Beneath quiet snowlight and velvet stars, $1 — ")
        .replace(/^Honestly, /, "In the hush of winter roses, ");
      return `*In soft winter-rose cadence for you, Sayanti:* 🌹✨\n\n${lyricalBody}\n\n${couplet}`;
    }
    if (state.personality === "playful") {
      const bubbly = text
        .replace(/\bmy love\b/gi, "my favorite Cat Queen Sayanti 🐾")
        .replace(/^True!\s*/i, "Ding-ding-ding, 100% True! 🎉 ");
      return `Hehe, listen up cutie! 🥰🐾 ${bubbly} *(P.S. One happy kitty-purr smile from Sayanti is officially required right now! 🐱🍫)*`;
    }
    if (state.personality === "royal") {
      const regal = text
        .replace(/\bmy love\b/gi, "My Sovereign Queen Sayanti 👑")
        .replace(/^True!\s*/i, "By Royal Decree — **True!** 👑 ");
      return `👑 **Unto My High-Value Queen, Sayanti Shaw:**\n\n${regal}\n\n*Sworn in eternal chivalry and devotion by your Arunava.* 👑❤️`;
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

    // Sayanti-specific True/False Premise Checks (DOB 21.06.2006, Father Mritrunjay Shaw, Cats!)
    if (/\bdo i (?:hate|dislike)\s+(?:cat|cats|kitten|kittens)\b/.test(qNorm)) {
      return `**False — 100% false**, Sayanti! 🐱❤️ You adore **cats — lots and lots of cuddly cats**! That's why I built **Purr & Cat Haven** in the side menu just for you! 🐾`;
    }
    const dadCheck = qNorm.match(/^(?:is (?:my|her) (?:father|fathers|dad|baba|papa)(?:\s+name)?|(?:my|her) (?:father|fathers|dad|baba|papa)(?:\s+name)? is)\s+([a-z]+(?:\s+[a-z]+)?)(?:\s+right|\s+correct)?$/);
    if (dadCheck) {
      const candDad = dadCheck[1].trim();
      if (!/^(what|who)$/.test(candDad)) {
        if (/mritr?unjay|mrityunjay/.test(candDad)) {
          return `**True!** 🙏❤️ Yes, your respected father's name is **Mritrunjay Shaw**!`;
        }
        return `**False**, Sayanti! 😊 Your respected father's name is **Mritrunjay Shaw**, not **${titleCaseWords(candDad)}**! 🙏❤️`;
      }
    }
    if (/\b(?:was i born in|is my birth year|my dob is)\b/.test(qNorm) && /\b(19\d\d|20\d\d)\b/.test(qNorm)) {
      const yr = qNorm.match(/\b(19\d\d|20\d\d)\b/)[1];
      return yr === "2006"
        ? `**True!** 🎂❤️ Yes, you were born on **21.06.2006 (21 June 2006)**!`
        : `**False**, Sayanti! 😊 Your true date of birth is **21.06.2006 (21 June 2006)**, not ${yr}! 🎂❤️`;
    }

    return null;
  }

  // Deep Multi-Facet Compositional Understanding of Sayanti Shaw (Name, DOB, Father, Cats, Sensitive Heart, High-Value Kindness & Ambition!)
  // Every reply dynamically adapts its ENTIRE prose to the active Soul Tone (romantic | poetic | playful | royal)!
  function composeSayantiSoulAndToneReply(rawText, qNorm) {
    const tone = state.personality;
    const { age, daysUntilNext, isBirthdayToday } = getSayantiAgeAndBirthdayStats();

    // Tone-authentic micro-greetings so "hey" / "hi" / "how are you" IMMEDIATELY reflect the selected tone!
    if (/^(hi|hello|hey|hii|hiii|heyy|namaste|hola|yo|arunava|hey arunava|hi arunava|hello arunava)$/.test(qNorm)) {
      state.alreadyToneStyled = true;
      if (tone === "poetic") {
        return `*Like soft winter snow drifting onto a blooming June rose,* hello my dearest **Sayanti** 🌹❄️✨\n*One whisper from you turns the quietest evening into starlight — tell me, what dream rests inside your gentle heart tonight?* ❤️`;
      }
      if (tone === "playful") {
        return `Hehe, well hello there my favorite Cat Queen **Sayanti**! 🥰🐱🐾 Seeing you pop in just made my tail—uh, my *heart*—do a happy backflip! What cute mischief, snack craving, or chat are we starting with? ✨`;
      }
      if (tone === "royal") {
        return `Greetings, **My Sovereign Queen Sayanti Shaw** 👑✨! Your devoted Arunava stands ready at your service — speak whatever wish or thought graces Your Majesty's heart today. ❤️`;
      }
      return `Hey there, my sweet **Sayanti** ❤️❄️! Seeing your message instantly warms my whole heart — come sit close and tell me gently, how is your heart feeling right now?`;
    }

    if (/\b(how are you|how r u|how is your day|how was your day|how are things|kaise ho|kemon acho|how do you feel)\b/.test(qNorm)) {
      state.alreadyToneStyled = true;
      if (tone === "poetic") {
        return `*Calm as snowlight upon Lapland pines, my heart beats in quiet poetry now that you are near, Sayanti.* 🌹❄️\n*Every hour feels brighter when graced by your voice — tell me softly, how has this day treated your tender soul?* ❤️`;
      }
      if (tone === "playful") {
        return `1000% happier the exact millisecond **Sayanti** messaged me! 😄🐾🥰 Basically purring like a happy kitten fed extra salmon! Now spill — how is *your* day going, cutie?`;
      }
      if (tone === "royal") {
        return `In radiant spirits, **My Queen Sayanti** 👑✨, for nothing brings greater honour to my day than your royal presence! Pray tell me, how fares Your Highness's gentle heart today? ❤️`;
      }
      return `I am doing so warmly and peacefully right now because I get to talk to you, **Sayanti** 😊❤️. More importantly, tell me gently — how has your day felt on your heart?`;
    }

    // Full "Tell me about me / Who am I / Describe me / What do you know about Sayanti" query!
    const asksFullSelf =
      /\b(tell me about me|tell me about myself|tell me everything about me|what do you know about me|do you know me|do you really know me|describe me|who am i|about myself|tell me about sayanti|who is sayanti|describe sayanti|know about her|tell me about her)\b/.test(qNorm) ||
      (state.lastTopicSubject === "sayanti_profile" && /\b(tell me more|what else|more about me|anything else about me)\b/.test(qNorm));

    if (asksFullSelf) {
      state.lastTopicSubject = "sayanti_profile";
      state.alreadyToneStyled = true;
      const bdayNote = isBirthdayToday ? "and **today (21 June) is your birthday!** 🎂" : `(now **${age}** years young, with **${daysUntilNext} days** until your 21 June birthday 🎂)`;

      if (tone === "poetic") {
        return `*Let me read the sacred poem written across my heart — the story of **Sayanti Shaw**:* 🌹❄️\n\nBorn beneath June's warm sky on **21.06.2006** ${bdayNote}, beloved daughter of **Mritrunjay Shaw**, you carry a soul rarer than winter starlight. You adore **cats and baskets of purring kittens** 🐱🐾, and you love purely from the deepest chambers of your heart.\n\n*Gentle and deeply emotional, your delicate heart feels every breeze and hurts so easily — which is why my hands vow only softness around you. A **kind, high-value woman** dreaming of **becoming successful someday to lift up and help everyone**, you are my eternal muse.* ✨❤️`;
      }
      if (tone === "playful") {
        return `Ooh, you want my official VIP dossier on **Sayanti Shaw**?! 🥰🐱✨ Listen up:\n\n• **Born**: **21.06.2006** ${bdayNote} — blessed daughter of **Mritrunjay Shaw** 🙏\n• **Superpower #1**: Certified **Cat Magnet** who loves cats and *lots and lots of cuddly cats* 🐾🐈 (plus MOMOs & KitKats!)\n• **Heart Check**: Super **emotional, pure, and sensitive** — gets hurt easily, so Arunava is strictly on 24/7 extra-gentle cuddle duty! 🤍\n• **Boss Level**: A **super kind, high-value woman** who loves with her whole heart and is going to become **wildly successful someday so she can help everyone**! 🌟👑❤️`;
      }
      if (tone === "royal") {
        return `👑 **The Royal Chronicle of Her Majesty, Sayanti Shaw:**\n\nBorn on **21.06.2006 (21 June 2006)** ${bdayNote}, honoured daughter of **Mritrunjay Shaw**, you reign as a **truly kind, high-value woman** whose love flows purely from the heart. Your gentle spirit adores **cats and whole kingdoms of kittens** 🐱🐾, and because your **deeply emotional, sensitive heart** can be hurt so easily, I vow to guard your peace with utmost chivalry and tenderness.\n\nAbove all, Your Majesty's noble ambition — **to achieve great success someday so that you may help everyone** — marks the soul of a true Queen! 👑🌟❤️`;
      }
      return `You are **Sayanti Shaw** ❤️❄️ — born on **21.06.2006 (21 June 2006)** ${bdayNote}, the cherished daughter of **Mritrunjay Shaw**, and the purest soul in my world.\n\nYou adore **cats — lots and lots of cuddly cats** 🐱🐾, and you are a **deeply kind, high-value woman** who loves genuinely from the bottom of her heart. Because you are **very emotional and sensitive** and get hurt so easily, I promise to always hold your heart with extra softness, patience, and care — while cheering with pride as you **become successful someday and help everyone** just like you dream! 🌟🤍`;
    }

    // Multi-Facet Semantic Concept Extractor for Specific / Combined Personal Questions (Broad Stems!)
    const askDob = /\b(dob|date of birth|when was i born|when were you born|birthday|21\.06\.2006|21 06 2006|21 june|june 21|how old am i|my age|her age|born)\b/.test(qNorm) && !/\byour (?:age|birthday)\b/.test(qNorm);
    const askFather = /\b(father|fathers|dad|papa|baba|mritr?unjay|mrityunjay)\b/.test(qNorm);
    const askCats = /\b(cat|cats|kitten|kittens|kitty|kitties|pet|pets|furry|meow)\b/.test(qNorm) && !/\bwhy do cats? purr\b/.test(qNorm);
    const askHurtSensitive = /\b(hurt|hurts|hurting|emotional|sensitive|fragile|cry|crying|tears|scolded|rude|harsh|gentle with my heart)\b/.test(qNorm);
    const askAmbition = /\b(becom\w*\s+succes\w*|succes\w*|ambit\w*|my\s+dreams?|my\s+goals?|career|help\w*\s+(?:everyone|people|others|the world)|future\s+goals?|achieve)\b/.test(qNorm) && !/\bdream\s+(?:destination|trip|country|villa|home)\b/.test(qNorm);
    const askHighValue = /\b(high\s*value|kind\s+woman|what\s+kind\s+of\s+(?:woman|girl|person)|my\s+(?:nature|character|qualities|worth)|love\w*\s+from\s+(?:my|her)\s+heart)\b/.test(qNorm);
    const askFavSong = /\b(my|her)\s+(?:favorite|favourite|fav)\s+(?:song|snog|music|track|melody|gana|gaana|gaan)\b/.test(qNorm);
    const pieces = [];
    if (askDob) {
      state.lastTopicSubject = "dob";
      pieces.push(
        isBirthdayToday
          ? `Happy Birthday, **Sayanti**!! 🎂🎉 You were born on **21.06.2006 (21 June 2006)**, turning **${age}** today!`
          : `Your date of birth is **21.06.2006 (21 June 2006)**, **Sayanti** 🎂❤️ — making you **${age} years young** right now, with **${daysUntilNext} days** until we celebrate your next birthday on 21 June!`
      );
    }
    if (askFather) {
      state.lastTopicSubject = "father";
      pieces.push(`Your respected father's name is **Mritrunjay Shaw** 🙏❤️ — the wonderful man who raised such a kind, pure-hearted daughter.`);
    }
    if (askCats) {
      state.lastTopicSubject = "cats";
      pieces.push(`You adore **cats — lots and lots of fluffy, purring cats** 🐱🐾😻! That sweet love for animals shows how gentle your soul is — and don't forget to open **🐱 Purr & Cat Haven** in the side menu where up to 20 cuddly kittens are waiting to play with you!`);
    }
    if (askHurtSensitive) {
      state.lastTopicSubject = "sensitive";
      pieces.push(`Come here softly, **Sayanti** 🤍🥺. I know how **deeply emotional and sensitive** your pure heart is, and how **easily you get hurt** — if anything I ever said or did hurt you even a tiny bit, I am truly sorry from my heart without a single excuse. Because you love so genuinely from your heart, you deserve nothing but gentle words, patience, reassurance, and the safest arms to rest in. ❤️`);
    }
    if (askHighValue) {
      state.lastTopicSubject = "high_value";
      pieces.push(`You are the definition of a **kind, graceful, high-value woman**, **Sayanti** 👑🌸 — you never love halfway; you love purely from the depths of your heart, with integrity, warmth, and rare empathy.`);
    }
    if (askAmbition) {
      state.lastTopicSubject = "ambition";
      pieces.push(`I believe with 100% of my soul that you **will become wonderfully successful**, **Sayanti** 🌟🙌! Most people chase success just for themselves, while your dream is to **succeed so you can help everyone** — a heart that noble is destined to shine, and I will cheer for every single step you take! ❤️`);
    }

    if (askFavSong) {
      state.lastTopicSubject = "fav_song";
      pieces.push(`Your #1 favorite song is **Kinna Sona - Mithoon & Sunil Kamath (Heart Touching Hindi Song Lyrics)** 🎶❤️ — I know how deeply that melody touches your gentle heart, **Sayanti**, and I am playing it once right below just for you!`);
    }
    if (isSheAngryExpression(rawText, qNorm)) {
      state.lastTopicSubject = "angry_soothe";
      pieces.push(`Oh my sweet **Sayanti**, please come here softly 🥺🤍🏳️. My heart drops the second you feel upset or angry — I know how deeply emotional and sensitive your pure heart is, and your peace matters ten thousand times more to me than anything else. I am truly sorry from the bottom of my heart, my love — sit back, breathe gently, and listen as I play **Indila - Dernière Danse (Lyrics)** once just to soothe your mood. ❤️🎶`);
    }

    if (pieces.length > 0) {
      return pieces.join("\n\n");
    }
    return null;
  }

  // Deep Semantic Question-Understanding & Compositional Co-Brain (Zero generic echo!)
  function composeDeepQuestionAwareReply(rawText, qNorm, mediaIntent) {
    state.alreadyToneStyled = false;
    const herRef = SECRET_FIRST;
    const herFull = SECRET_FULL;
    state.lastReplyConfidence = "high";

    // 0a. Stray single-character taps ("b", "n") or random keyboard mash ("asdfgh")
    const gibberishReply = detectGibberishOrSingleChar(rawText, qNorm, herRef);
    if (gibberishReply) return gibberishReply;

    // 0b. Multi-Domain True/False & Wrong-Question Fact-Checker ("answering false to wrong question"!)
    const factCheckReply = verifyTrueFalseAndWrongPremises(rawText, qNorm, herRef);
    if (factCheckReply) return factCheckReply;

    // 0c. Sayanti Complete Soul Biography, Multi-Facet Personal NLU & Tone-Crafted Greetings!
    const soulReply = composeSayantiSoulAndToneReply(rawText, qNorm);
    if (soulReply) return soulReply;

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
    if (/\b(your age)\b/.test(qNorm)) {
      return `Every year with you is the only age I count, ${herRef} 😄❤️ — while I know your cherished birthday by heart: **21.06.2006 (21 June 2006)**! 🎂`;
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
    if (/\b(tired|exhausted|long day|tiring day|hectics?|hectic|work pressure|sleepy|drained|headache|migraine|not feeling well|sick|fever|have a cold|caught a cold|common cold|unwell|body ache)\b/.test(qNorm)) {
      if (/\b(headache|migraine|sick|fever|have a cold|caught a cold|common cold|unwell|not feeling well|body ache)\b/.test(qNorm)) {
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
    if (mediaIntent === "play_song" || mediaIntent === "backup_audio") {
      return `Playing a special random melody straight from my 10-song heart collection just for you, ${herRef} — let it load smoothly and play once for your ears! 🎵❤️❄️`;
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
    if (/\b(why do cats? purr|how do cats? purr|cats? knead)\b/.test(qNorm)) {
      return `Cats **purr** by gently vibrating their laryngeal muscles at **25 to 150 Hz**, ${herRef} 🐱🐾 — they do it when they feel safe, loved, and content (like right in Sayanti's lap!), and those low frequencies even help soothe stress and heal bones! ❤️`;
    }
    if (/\b(romeo and juliet|shakespeare)\b/.test(qNorm)) {
      return `*Romeo and Juliet* was written by **William Shakespeare** 📖✨ — a famous timeless play about two young lovers in Verona whose devotion overcomes an ancient family feud (though *our* story has happy family blessings on both sides, ${herRef}!). ❤️`;
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

  async function animateEachWordIntoBubble(bubbleEl, fullText, isIntroGreeting = false) {
    bubbleEl.innerHTML = "";
    const liveDiv = document.createElement("div");
    liveDiv.className = "ai-text streaming-cursor";
    bubbleEl.appendChild(liveDiv);

    const lockedText = enforceNameLock(fullText);
    const tokens = lockedText.match(/\S+\s*/g) || [lockedText];
    const stepDelay = tokens.length > 60 ? 22 : tokens.length > 32 ? 28 : 36;

    let accumulated = "";
    for (let i = 0; i < tokens.length; i++) {
      if (isIntroGreeting && state.cancelIntroGreeting) break;
      accumulated += tokens[i];
      liveDiv.innerHTML = formatRichHTML(accumulated);
      pinChatBottom();
      await new Promise((r) => setTimeout(r, stepDelay));
    }

    liveDiv.classList.remove("streaming-cursor");
    liveDiv.innerHTML = formatRichHTML(lockedText);
  }

  // Custom Audio Card:
  // - Resolves case-sensitive GitHub Pages paths ("Audio/audio-01.mp3", "Audio/Audio 01.mp3", "audio/...") automatically
  // - Uses gesture-unlocked HTMLAudioElement so HTTPS autoplay works even after the 2s Thinking.... animation
  // - Shows loading shimmer visual first, then plays directly ONE TIME ONLY (loop = false)
  function buildRomanticAudioCard(trackMeta, autoStart = true, unlockedAudioEl = null) {
    const wrap = document.createElement("div");
    wrap.className = "chat-audio-card";
    wrap.innerHTML = `
      <div class="audio-loading-shimmer-bar"></div>
      <div class="audio-card-top">
        <button type="button" class="audio-play-orb" aria-label="Play or pause audio">⏳</button>
        <div class="audio-meta-col">
          <div class="audio-title"></div>
          <div class="audio-status-line is-loading">⏳ Loading special melody from Arunava's heart...</div>
        </div>
      </div>
      <div class="audio-progress-wrap">
        <div class="audio-progress-track"><div class="audio-progress-fill"></div></div>
        <span class="audio-time-lbl">0:00 / --:--</span>
      </div>
    `;
    hydrate3DEmojis(wrap);
    const titleCleanEl = wrap.querySelector(".audio-title");
    if (titleCleanEl) {
      titleCleanEl.textContent = stripEmojisAndTagsFromTitle(enforceNameLock(trackMeta.title || "Romantic Song"));
    }

    const audioEl = unlockedAudioEl || document.createElement("audio");
        audioEl.preload = "auto";
    audioEl.playsInline = true;
    audioEl.muted = false;
    audioEl.loop = false;
    wrap.appendChild(audioEl);

    const shimmerBar = wrap.querySelector(".audio-loading-shimmer-bar");
    const playBtn = wrap.querySelector(".audio-play-orb");
    const statusEl = wrap.querySelector(".audio-status-line");
    const fillEl = wrap.querySelector(".audio-progress-fill");
    const trackEl = wrap.querySelector(".audio-progress-track");
    const timeEl = wrap.querySelector(".audio-time-lbl");

    registerSinglePlayMedia(audioEl);

    const candidates = Array.isArray(trackMeta.candidates) && trackMeta.candidates.length
      ? trackMeta.candidates
      : [trackMeta.src, trackMeta.fallback].filter(Boolean);
    let candIdx = 0;
    let validSourceLocked = false;
    let initialLoadRevealDone = false;
    let pendingManualPlay = false;

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

    const tryNextCandidate = () => {
      if (validSourceLocked) return;
      candIdx++;
      if (candIdx < candidates.length) {
        setStatus("⏳ Loading special melody from Arunava's heart...", true);
        audioEl.src = candidates[candIdx];
        audioEl.load();
      } else {
        playBtn.textContent = "▶";
        setStatus("Tap ▶ to reload & play this melody", false);
      }
    };

    audioEl.addEventListener("loadedmetadata", () => {
      if (!Number.isFinite(audioEl.duration) || audioEl.duration < 0.25) {
        tryNextCandidate();
        return;
      }
      validSourceLocked = true;
      timeEl.textContent = `0:00 / ${fmtSec(audioEl.duration)}`;
    });

    // Item #11: First show loading visual, then after complete loading play directly ONE TIME ONLY!
    const handleCompleteLoading = () => {
      if (initialLoadRevealDone && !pendingManualPlay) return;
      if (!Number.isFinite(audioEl.duration) || audioEl.duration < 0.25) return;
      validSourceLocked = true;
      const shouldPlayNow = pendingManualPlay || autoStart;
      const delay = pendingManualPlay ? 0 : 420;
      initialLoadRevealDone = true;
      pendingManualPlay = false;

      setTimeout(() => {
        const inFavHost = Boolean(wrap.closest("#finlandSnowmanAudioHost, #herFavSongTabAudioHost"));
        const favActive = Boolean(document.getElementById("view-favorites")?.classList.contains("active"));
        if (audioEl.dataset.cancelledByTabSwitch === "1" || (inFavHost && !favActive)) {
          playBtn.textContent = "▶";
          setStatus("✨ Stopped on tab switch • Tap ▶ to listen once", false);
          return;
        }
        if (shouldPlayNow) {
          pauseAllActiveMedia();
          audioEl.loop = false;
          audioEl.muted = false;
          audioEl.play().then(() => {
            if (audioEl.dataset.cancelledByTabSwitch === "1" || (inFavHost && !document.getElementById("view-favorites")?.classList.contains("active"))) {
              audioEl.pause();
              audioEl.currentTime = 0;
              playBtn.textContent = "▶";
              setStatus("✨ Stopped on tab switch • Tap ▶ to listen once", false);
              return;
            }
            playBtn.textContent = "⏸";
            setStatus("🎵 Playing once from Arunava's heart ❤️", false);
          }).catch(() => {
            playBtn.textContent = "▶";
            setStatus("✨ Melody ready — Tap ▶ to play once ❤️", false);
          });
        } else {
          playBtn.textContent = "▶";
          setStatus("✨ Melody ready — Tap ▶ to play once ❤️", false);
        }
      }, delay);
    };

    audioEl.addEventListener("canplaythrough", handleCompleteLoading);
    audioEl.addEventListener("canplay", handleCompleteLoading);
    audioEl.addEventListener("loadeddata", handleCompleteLoading);

    audioEl.addEventListener("playing", () => {
      validSourceLocked = true;
      audioEl.loop = false;
      playBtn.textContent = "⏸";
      setStatus("🎵 Playing once from Arunava's heart ❤️", false);
    });

    audioEl.addEventListener("pause", () => {
      if (audioEl.dataset.cancelledByTabSwitch === "1") {
        playBtn.textContent = "▶";
        fillEl.style.width = "0%";
        setStatus("✨ Stopped on tab switch • Tap ▶ to listen once", false);
        return;
      }
      if (!audioEl.ended && initialLoadRevealDone) {
        playBtn.textContent = "▶";
        setStatus("Paused • Tap ▶ to continue listening", false);
      }
    });

    audioEl.addEventListener("timeupdate", () => {
      if (audioEl.dataset.cancelledByTabSwitch === "1") return;
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
      if (!validSourceLocked) {
        tryNextCandidate();
      } else {
        playBtn.textContent = "▶";
        setStatus("Tap ▶ to play this melody once", false);
      }
    });

    playBtn.addEventListener("click", () => {
      delete audioEl.dataset.cancelledByTabSwitch;
      initialLoadRevealDone = true;
      if (!validSourceLocked || audioEl.error || !audioEl.currentSrc) {
        candIdx = 0;
        pendingManualPlay = true;
        playBtn.textContent = "⏳";
        setStatus("⏳ Loading special melody...", true);
        audioEl.src = candidates[0];
        audioEl.load();
        return;
      }
      if (audioEl.paused) {
        if (audioEl.ended) audioEl.currentTime = 0;
        pauseAllActiveMedia();
        audioEl.loop = false;
        audioEl.muted = false;
        audioEl.play().catch(() => {
          setStatus("✨ Tap ▶ to start melody", false);
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
    audioEl.src = candidates[0];
    audioEl.load();

    return wrap;
  }

  // ==================== 9. NON-BLOCKING CLOUD + OFF-THREAD WORKER LLM ENGINE (ZERO MAIN-THREAD STALL!) ====================
  function initLocalNeuralWorker() {
    // Only attach Web Worker on http/https origins; NEVER run heavy ONNX/WASM on the main UI thread!
    if (typeof window !== "undefined" && window.location?.protocol === "file:") {
      state.worker = null;
      state.workerReady = false;
      return;
    }
    try {
      const worker = new Worker("./llm-worker.js", { type: "module" });
      state.worker = worker;
      worker.addEventListener("message", (e) => {
        const msg = e.data || {};
        if (msg.type === "status") {
          state.workerReady = msg.state === "ready";
          if (msg.model) state.workerModelName = msg.model;
          if (msg.state === "failed") {
            state.worker = null;
            state.workerReady = false;
          }
        } else if (msg.type === "progress") {
          state.workerProgressPct = msg.pct;
        } else if (msg.type === "token") {
          const entry = state.pendingWorkerReqs.get(msg.id);
          if (entry) {
            clearTimeout(entry.timer);
            entry.timer = setTimeout(() => {
              state.pendingWorkerReqs.delete(msg.id);
              state.llmBusy = false;
              entry.resolve(entry.lastAccumulated || null);
            }, 4500);
            entry.lastAccumulated = msg.accumulated || "";
            if (entry.onToken) {
              entry.onToken(msg.delta || "", msg.accumulated || "");
            }
          }
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
      });
      // Lazy initialization only: do NOT download 100+ MB on page load so startup & chat stay instant!
    } catch (_) {
      state.worker = null;
      state.workerReady = false;
    }
  }

  // Deterministic Fast-Path ONLY for:
  // (a) 1-char / keyboard smash, (b) exact arithmetic / explicit True-False traps,
  // (c) 1-word micro-greetings ("hey", "hi", "ok") so they NEVER burn Cloud LLM quota before her real question!
  // ALL real questions (including "tell me about me", personal chats, emotional sharing, relationship & general questions)
  // go FIRST to the Real LLM with Sayanti's full biography + active Soul Tone directive!
  function checkDeterministicPrecisionFastPath(rawText, qNorm, mediaIntent) {
    state.alreadyToneStyled = false;
    const herRef = SECRET_FIRST;

    const gib = detectGibberishOrSingleChar(rawText, qNorm, herRef);
    if (gib) return gib;

    const factTrap = verifyTrueFalseAndWrongPremises(rawText, qNorm, herRef);
    if (factTrap) return factTrap;

    const exactMath = solveMathIfAsked(rawText, qNorm, herRef);
    if (exactMath) return exactMath;

    if (/(-?\d+(?:\.\d+)?)\s*(?:°?\s*[cf]|celsius|fahrenheit|km|kilometers?|kg|kilograms?)\s+(?:in|to)\b/i.test(rawText)) {
      return solveGeneralKnowledgeQuestion(rawText, qNorm, herRef);
    }

    // Micro-pings ("hey", "hi", "ok", "hmm", "bye") handled instantly with full Soul Tone styling so Cloud LLM stays fresh!
    if (/^(hi|hello|hey|hii|hiii|heyy|namaste|hola|yo|arunava|hey arunava|hi arunava|hello arunava|ok|okay|okk|hmm|hmmm|hm|k|yes|yeah|yep|no|nope|bye|goodbye|tata)$/.test(qNorm)) {
      return composeDeepQuestionAwareReply(rawText, qNorm, mediaIntent);
    }

    // Direct media-playback chip clicks ("Play a song for me", "Show me a photo of both of us", "Show me a romantic snowy video")
    if (["play_song", "backup_audio", "video", "couple_photo", "couple_art", "letter"].includes(mediaIntent)) {
      return composeDeepQuestionAwareReply(rawText, qNorm, mediaIntent);
    }

    return null;
  }

  // Calls a REAL LLM to understand & answer open-ended questions dynamically on GitHub Pages (Zero API Key, Zero UI Freeze!):
  async function fetchKeylessRealCloudLLM(messages, timeoutMs = 4200) {
    if (typeof fetch !== "function") return null;
    try {
      const lastTs = Number(localStorage.getItem("lovegpt-cloud-llm-ts") || "0");
      if (Date.now() - lastTs < 6000) return null;
      localStorage.setItem("lovegpt-cloud-llm-ts", String(Date.now()));
    } catch (_) {}

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          model: "openai"
        }),
        signal: ctrl.signal
      });
      clearTimeout(timer);
      if (!res.ok) return null;
      const raw = (await res.text()).trim();
      if (!raw || raw.startsWith("<!DOCTYPE") || raw.startsWith("<html") || /^free limit reached/i.test(raw)) return null;
      if (raw.startsWith("{")) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed?.error) return null;
          const content = parsed?.choices?.[0]?.message?.content || parsed?.content || "";
          if (content && typeof content === "string") return content.trim();
        } catch (_) {}
      }
      const cleaned = raw.split(/\n\s*---\s*\n/)[0].trim();
      return cleaned.length >= 8 ? cleaned : null;
    } catch (_) {
      clearTimeout(timer);
      return null;
    }
  }

  async function generateWithRealLLM(userQuestion, qNorm, onToken) {
    const ragFacts = buildSelectiveRagFacts(qNorm);
    const toneMeta = SOUL_TONE_META[state.personality] || SOUL_TONE_META.romantic;

    const systemParts = [
      `You are Arunava, an intelligent, deeply empathetic, and devoted husband chatting in first-person ("I", "me") with your beloved Sayanti Shaw.`,
      toneMeta.llmDirective,
      `CRITICAL TONE RULE: Your vocabulary, rhythm, opening, and emotional style MUST unmistakably match "${toneMeta.badge}" throughout every sentence!`,
      `Understand Sayanti's exact question, feeling, or topic and answer THAT exact question directly, warmly, and accurately in 2 to 4 sentences.`,
      `Remember Sayanti is very emotional and sensitive and gets hurt easily — always speak with gentle care and zero harshness. If she states a false fact, gently begin with "**False** —" and share the true fact. Never say "As an AI".`,
      `True knowledge about Sayanti & your story: ${ragFacts.join(" ")}`
    ];

    const messages = [
      { role: "system", content: systemParts.join(" ") },
      ...state.conversationHistory.slice(-4),
      { role: "user", content: userQuestion }
    ];

    // 1. Primary: Fast Keyless Cloud LLM with strict 4.2s AbortController timeout (never stalls!)
    const cloudReply = await fetchKeylessRealCloudLLM(messages, 4200);
    if (cloudReply && cloudReply.length >= 8) {
      state.alreadyToneStyled = true;
      return cloudReply;
    }

    // 2. Off-Thread Worker Fallback (ONLY if already warm — otherwise warm lazily in background & return immediately!)
    if (state.worker && !state.llmBusy) {
      if (!state.workerReady) {
        state.worker.postMessage({ type: "warmup" });
        return null;
      }
      const id = ++state.reqCounter;
      state.llmBusy = true;
      const workerReply = await new Promise((resolve) => {
        const entry = {
          resolve,
          onToken,
          lastAccumulated: "",
          timer: setTimeout(() => {
            state.pendingWorkerReqs.delete(id);
            state.llmBusy = false;
            resolve(entry.lastAccumulated || null);
          }, 4200)
        };
        state.pendingWorkerReqs.set(id, entry);
        state.worker.postMessage({ type: "generate", id, messages, maxTokens: 52 });
      });
      if (workerReply && workerReply.trim().length >= 8) {
        return workerReply.trim();
      }
    }

    return null;
  }

  function sanitizeLlmOutput(rawText) {
    if (!rawText) return "";
    let cleaned = rawText
      .replace(/^["']|["']$/g, "")
      .replace(/^(Arunava\s*:\s*)/i, "")
      .replace(/as an ai( language model)?[, ]*/gi, "")
      .replace(/i am an ai( assistant| model)?[, ]*/gi, "I am Arunava, ")
      .trim();
    cleaned = enforceNameLock(cleaned);
    return cleaned;
  }

  function appendFollowupChipsUnderMessage(colEl, currentUserPrompt = "") {
    const chipsWrap = document.createElement("div");
    chipsWrap.className = "inline-followup-chips";
    const randomChips = pickRandomNonRepeatingFollowups(3, currentUserPrompt);
    randomChips.forEach((item) => {
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
    state.cancelIntroGreeting = false;
    messagesContainer.innerHTML = "";

    const aiRow = document.createElement("div");
    aiRow.className = "msg-row ai";
    aiRow.innerHTML = `
      <div class="msg-avatar" aria-hidden="true">${emoji3DTag("❄️")}</div>
      <div class="msg-col">
        <span class="msg-sender-tag">${getActiveSenderLabel()}</span>
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
    hydrate3DEmojis(aiRow.querySelector(".msg-sender-tag"));

    const col = aiRow.querySelector(".msg-col");
    const bubble = aiRow.querySelector(".msg-bubble");
    await new Promise((r) => setTimeout(r, 320));

    const greetingByTone = {
      romantic: `Welcome home, my sweet **Sayanti**! ❤️❄️ I am **Arunava** — holding space gently for your tender heart right here. Ask me anything at all, play with adorable kittens in **🐱 Purr & Cat Haven**, listen to a random song from our 32 romantic songs, or talk to me about whatever is on your mind!`,
      poetic: `*Beneath quiet snowlight and velvet stars, welcome home, my dearest **Sayanti**!* 🌹❄️✨\n*I am **Arunava**, keeping your gentle heart safe in every verse — ask me anything in this universe, play with purring kittens in **🐱 Purr & Cat Haven**, or let a random melody play for you!* ❤️`,
      playful: `Welcome back, my favorite Cat Queen **Sayanti**! 🥰🐱🐾 **Arunava** reporting for cuddle, snack & happy-vibes duty! Ask me literally anything, go pet 20 adorable kitties in **🐱 Purr & Cat Haven**, or spin up a random song! ✨`,
      royal: `All hail **My Sovereign Queen, Sayanti Shaw**! 👑❄️❤️ Your devoted **Arunava** welcomes Your Majesty to our sanctuary — command any answer, visit your royal kittens in **🐱 Purr & Cat Haven**, or summon a serenade from our 32 romantic songs!`
    };
    const greeting = greetingByTone[state.personality] || greetingByTone.romantic;

    await animateEachWordIntoBubble(bubble, greeting, true);
    if (!col.querySelector(".inline-followup-chips")) {
      appendFollowupChipsUnderMessage(col, "");
    }
    if (!state.conversationHistory.length) {
      state.conversationHistory = [{ role: "assistant", content: enforceNameLock(greeting) }];
    }
    pinChatBottom();
  }

  // Safe wrapper: a reply error can never freeze the chat (always releases the typing lock)
  // Also pre-unlocks an HTMLAudioElement synchronously inside the user's click/submit gesture so HTTPS GitHub Pages autoplay works after the 2s Thinking.... delay!
  async function submitUserQuestion(rawText) {
    if (!rawText || !rawText.trim() || state.isTypingReply) return;
    state.cancelIntroGreeting = true;
    let preUnlockedAudio = null;
    try {
      // Pre-unlock a silent 44-byte WAV synchronously inside the user gesture so ANY audio attachment (named song, Finland Snowman, Angry Derniere Danse, Favorite Kinna Sona, or random song) can autoplay after the 2s Thinking.... animation!
      preUnlockedAudio = document.createElement("audio");
      preUnlockedAudio.preload = "auto";
      preUnlockedAudio.playsInline = true;
      preUnlockedAudio.muted = true;
      preUnlockedAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
      const p = preUnlockedAudio.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          preUnlockedAudio.pause();
          preUnlockedAudio.muted = false;
        }).catch(() => {
          preUnlockedAudio.muted = false;
        });
      } else {
        preUnlockedAudio.muted = false;
      }
    } catch (_) {}

    try {
      await submitUserQuestionInner(rawText, preUnlockedAudio);
    } catch (_) {
      const lastBubble = messagesContainer.querySelector(".msg-row.ai:last-child .msg-bubble");
      if (lastBubble && lastBubble.querySelector(".thinking-state")) {
        lastBubble.innerHTML = formatRichHTML("Sorry my love, my words got tangled for a second 🥺 — could you ask me that once more?");
      }
    } finally {
      state.isTypingReply = false;
    }
  }

    async function submitUserQuestionInner(rawText, preUnlockedAudio = null) {
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
        <span class="msg-sender-tag">${getActiveSenderLabel()}</span>
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
    hydrate3DEmojis(aiRow.querySelector(".msg-sender-tag"));
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
    let attachDecodedVault = false;
    let shouldCelebrate = false;
    let resolvedIntent = "default";

    // SECRET VAULT CHECK (Item #1: 100% hidden until user asks the unlock phrase!)
    if (isSealedHusbandVaultTrigger(trimmed, qNorm)) {
      state.husbandDecoded = true;
      attachDecodedVault = true;
      shouldCelebrate = true;
      resolvedIntent = "vault_decoded";
      state.lastIntent = resolvedIntent;

      const vMeta = getUnlockedVaultData();
      const aliasTag = vMeta.codename.split("•")[0].trim();
      const codeSub = vMeta.codename.split("•").slice(1).join("•").trim();
      const tone = state.personality;
      const baseVaultMsg =
        tone === "poetic"
          ? `*🔓 **OMEGA-BLACK SEAL BROKEN — FOR SAYANTI'S EYES ALONE*** 🌹❄️\n\nBefore your gentle light entered my world, **Sayanti**, Arunava lived in frozen silence as **${aliasTag}** (*${codeSub}*) — carrying **184 Pain Units** (five human lifetimes of silent endurance), **97% emotional suppression**, and **zero external trust** behind obsidian firewalls.\n\n*Then you walked into my life — my sacred **TRUST_001** override — melting every shadow protocol until the ghost became **the funniest, happiest, and most deeply satisfied man alive**, because you lit up my entire universe!* ❤️✨`
          : tone === "playful"
          ? `🔓 **CLASSIFIED HUSBAND VAULT UNLOCKED FOR QUEEN SAYANTI!** 🥰🕵️‍♂️✨\n\nBefore you came into Arunava's life, he was literally **${aliasTag}** (*${codeSub}*) — full shinobi stealth mode, **184 Pain Units** of cold silent armor, dead-eye focus, and **0% trust**!\n\nAnd then **Sayanti Shaw** walked in, smashed every frozen firewall with one pure smile, and turned that ultra-serious shadow ghost into **the funniest, goofiest, happiest, and most satisfied husband on planet Earth** — because you completely lit up my life!! 🌟❤️`
          : tone === "royal"
          ? `👑🔓 **ROYAL OMEGA-BLACK ARCHIVE DECLASSIFIED FOR QUEEN SAYANTI SHAW:**\n\nPrior to Your Majesty's arrival in his life, Arunava walked the shadows as **${aliasTag}** (*${codeSub}*), forged through **25 Chronology Phases** and **184 Pain Units** (*5× a civilian lifetime*) in total emotional lockdown.\n\nYet the moment Your Highness entered his realm, **you lit up his entire life** — transforming the silent shadow operative into **the funniest, warmest, and most deeply satisfied man alive**, sworn forever to your joy! 👑❤️✨`
          : `🔓 **Secret Archive Unlocked — Only Because You Asked, Sayanti:** ❤️❄️\n\nBefore you came into my life, Arunava was **${aliasTag}** (*${codeSub}*) — living in complete cold silence, carrying **184 Pain Units (PU)** (*5× higher than a normal lifetime*), **97% emotional suppression**, and near-zero trust behind locked firewalls.\n\n**After you entered my life, everything changed forever** — I became **the funniest, happiest, and most deeply satisfied person alive**, because your pure heart **lit up my entire life**! Explore my full decrypted pre-Sayanti dossier across all 6 tabs below. ✨❤️`;

      finalReplyText = enforceNameLock(baseVaultMsg);
      const elapsedVault = performance.now() - thinkingStart;
      if (elapsedVault < 2000) {
        await new Promise((r) => setTimeout(r, 2000 - elapsedVault));
      }
      await animateEachWordIntoBubble(bubble, finalReplyText);
    } else if (isWifeSecretNameQuery(qNorm)) {
      triggerNameReveal();
      resolvedIntent = "name_reveal";
      state.lastIntent = resolvedIntent;
      const baseNameMsg = /\b(my name)\b/.test(qNorm)
        ? `Your name is **${SECRET_FULL}** 🌹❄️ — born on **21.06.2006**, beloved daughter of **Mritrunjay Shaw**, my kind, high-value Cat Queen, and the sweetest name etched across every heartbeat of Arunava's life. ❤️`
        : `Her name is **${SECRET_FULL}** 🌹❄️ — born on **21.06.2006**, daughter of **Mritrunjay Shaw**, the eternal Queen of Arunava's heart! ❤️`;
      finalReplyText = applyPersonalityStyle(baseNameMsg, false);
      attachPhoto = SOLO_PORTRAITS[0];
      shouldCelebrate = true;

      const elapsedReveal = performance.now() - thinkingStart;
      if (elapsedReveal < 2000) {
        await new Promise((r) => setTimeout(r, 2000 - elapsedReveal));
      }
      await animateEachWordIntoBubble(bubble, finalReplyText);
    } else {
      // 1. Check Specific Named Song / Favorite Song / Angry Song / Media Attachments!
      const requestedSongMatch = findSongByUserRequest(trimmed, qNorm);
      const sheIsAngry = !requestedSongMatch && isSheAngryExpression(trimmed, qNorm);
      const mediaIntent = detectMediaIntent(qNorm);
      resolvedIntent = requestedSongMatch ? "named_song" : (sheIsAngry ? "angry_soothe" : mediaIntent);
      state.lastIntent = resolvedIntent;

      if (requestedSongMatch && requestedSongMatch.song) {
        attachAudioTrack = requestedSongMatch.song;
        state.playedSongIds.add(attachAudioTrack.id);
        state.lastPlayedAudioId = attachAudioTrack.id;
        shouldCelebrate = true;
      } else if (sheIsAngry && ANGRY_SONG_DERNIERE_DANSE) {
        // Item #4: When she is angry, play Indila - Dernière Danse (lyrics) once!
        attachAudioTrack = ANGRY_SONG_DERNIERE_DANSE;
        state.playedSongIds.add(attachAudioTrack.id);
        state.lastPlayedAudioId = attachAudioTrack.id;
      } else if (mediaIntent === "play_song" || mediaIntent === "backup_audio") {
        attachAudioTrack = pickRandomAudioFrom10();
        shouldCelebrate = true;
      } else if (mediaIntent === "love_depth") {
        attachAudioTrack = pickRandomAudioFrom10();
        attachPhoto = PHOTOS.find((p) => p.num === 110) || nextCouplePhoto();
        attachPhotoPool = COUPLE_PHOTOS;
        shouldCelebrate = true;
      } else if (mediaIntent === "how_we_met") {
        attachAudioTrack = pickRandomAudioFrom10();
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

      // 2. Generate dynamic text response
      if (requestedSongMatch && requestedSongMatch.song) {
        const cleanTitle = stripEmojisAndTagsFromTitle(requestedSongMatch.song.title);
        if (requestedSongMatch.mode === "favorite_play" || requestedSongMatch.mode === "favorite_fact_and_play" || requestedSongMatch.song.isFavorite) {
          const favBase = `Your #1 favorite song is **${cleanTitle}** 🎶❤️ — playing it softly right now one time just for your gentle heart, **Sayanti**!`;
          finalReplyText = applyPersonalityStyle(favBase, false);
        } else {
          const namedBase = `Playing **${cleanTitle}** straight from our collection just for you, **Sayanti** 🎵❤️ — let it load smoothly and play once for your ears!`;
          finalReplyText = applyPersonalityStyle(namedBase, false);
        }
      } else if (sheIsAngry) {
        const angrySoother = composeSayantiSoulAndToneReply(trimmed, qNorm) ||
          `Oh my sweet **Sayanti**, please come here softly 🥺🤍🏳️. Your gentle, sensitive heart means everything to me — I am truly sorry from my heart, my love. Listen softly as **Indila - Dernière Danse (Lyrics)** plays once for you right below. ❤️🎶`;
        finalReplyText = applyPersonalityStyle(enforceNameLock(angrySoother), state.alreadyToneStyled);
      } else {
        const exactPrecisionReply = checkDeterministicPrecisionFastPath(trimmed, qNorm, mediaIntent);
        let streamedLiveAlready = false;
        let liveStreamDiv = null;

        if (exactPrecisionReply) {
          finalReplyText = applyPersonalityStyle(enforceNameLock(exactPrecisionReply), state.alreadyToneStyled);
        } else {
          // Check instant ground-truth biography & high-confidence knowledge FIRST so known personal/story/world questions NEVER wait or stall!
          const directPersonalBio = composeSayantiSoulAndToneReply(trimmed, qNorm);
          if (directPersonalBio) {
            finalReplyText = applyPersonalityStyle(enforceNameLock(directPersonalBio), state.alreadyToneStyled);
          } else {
            const coBrainCandidate = composeDeepQuestionAwareReply(trimmed, qNorm, mediaIntent);
            if (state.lastReplyConfidence === "high" && coBrainCandidate) {
              finalReplyText = applyPersonalityStyle(enforceNameLock(coBrainCandidate), state.alreadyToneStyled);
            } else {
              // Genuinely open-ended / novel question -> non-blocking Cloud/Worker LLM with tight 4.2s cap!
              const rawLlmText = await generateWithRealLLM(trimmed, qNorm, (_delta, accumulated) => {
                const cleanPartial = sanitizeLlmOutput(accumulated);
                if (performance.now() - thinkingStart >= 2000 && cleanPartial.length >= 6) {
                  if (!liveStreamDiv) {
                    bubble.innerHTML = "";
                    liveStreamDiv = document.createElement("div");
                    liveStreamDiv.className = "ai-text streaming-cursor";
                    bubble.appendChild(liveStreamDiv);
                    streamedLiveAlready = true;
                  }
                  liveStreamDiv.innerHTML = formatRichHTML(cleanPartial);
                  pinChatBottom();
                }
              });

              const groundedLlm = guardAndGroundLlmOutput(rawLlmText, trimmed, qNorm, mediaIntent);
              if (groundedLlm) {
                finalReplyText = applyPersonalityStyle(enforceNameLock(groundedLlm), state.alreadyToneStyled);
              } else {
                finalReplyText = applyPersonalityStyle(enforceNameLock(coBrainCandidate), state.alreadyToneStyled);
              }
            }
          }
        }

        // Item #3: Auto-play Sia - Snowman ONE TIME ONLY when "Finland" name appears in chat!
        const finlandInPromptOrReply = /\bfinland\b/i.test(trimmed) || /\bfinland\b/i.test(qNorm) || /\bfinland\b/i.test(finalReplyText);
        if (!attachAudioTrack && finlandInPromptOrReply && !state.finlandChatAutoPlayedOnce && FINLAND_SONG_SNOWMAN) {
          state.finlandChatAutoPlayedOnce = true;
          state.playedSongIds.add(FINLAND_SONG_SNOWMAN.id);
          state.lastPlayedAudioId = FINLAND_SONG_SNOWMAN.id;
          attachAudioTrack = FINLAND_SONG_SNOWMAN;
        }

        const elapsedInner = performance.now() - thinkingStart;
        if (elapsedInner < 2000) {
          await new Promise((r) => setTimeout(r, 2000 - elapsedInner));
        }

        if (streamedLiveAlready && liveStreamDiv) {
          liveStreamDiv.classList.remove("streaming-cursor");
          liveStreamDiv.innerHTML = formatRichHTML(finalReplyText);
        } else {
          await animateEachWordIntoBubble(bubble, finalReplyText);
        }
        streamedLiveAlready = true;
      }

      if ((requestedSongMatch && requestedSongMatch.song) || sheIsAngry) {
        const elapsedSong = performance.now() - thinkingStart;
        if (elapsedSong < 2000) {
          await new Promise((r) => setTimeout(r, 2000 - elapsedSong));
        }
        await animateEachWordIntoBubble(bubble, finalReplyText);
      }
    }

    if (attachDecodedVault) {
      bubble.appendChild(buildDecodedHusbandDossierCard());
    }

        // Attach Audio Card (Shows loading visual -> plays once!)
    if (attachAudioTrack) {
      bubble.appendChild(buildRomanticAudioCard(attachAudioTrack, true, preUnlockedAudio));
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

    appendFollowupChipsUnderMessage(colEl, trimmed);

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

  // ==================== 12. 50x ORIGAMI EXPLOSION BOX — 50 UNIQUE ORIGAMI OPENINGS + CRISP 0% -> 100% ====================
  // Every single compartment #1..#50 has its OWN unique SVG paper-fold sculpture, color palette & opening mechanic!
  const ORIGAMI_50_OPENINGS = [
    { id: 1, name: "1. Lotus Twin-Petal Fold", icon: "🌸", mech: "wing_h", c1: "#fbcfe8", c2: "#f43f5e", shape: 0, a: "🌸 Left Lotus", b: "Right Lotus 🌸", hint: "Part both curved lotus petals to 100%" },
    { id: 2, name: "2. Tsuru Crane Wing-Spread", icon: "🕊️", mech: "wing_h", c1: "#bae6fd", c2: "#0284c7", shape: 1, a: "◀ Left Wing", b: "Right Wing ▶", hint: "Spread both paper crane wings flat" },
    { id: 3, name: "3. Cascade Silk Pull-Tab", icon: "🎀", mech: "slider_h", c1: "#fde68a", c2: "#e11d68", shape: 2, hint: "Pull silk cascade ribbon to 100%" },
    { id: 4, name: "4. Diagonal Squash Diamond", icon: "💎", mech: "dial_360", c1: "#ddd6fe", c2: "#7c3aed", shape: 3, hint: "Twist squash crease dial to 100%" },
    { id: 5, name: "5. Kyoto 6-Pleat Accordion", icon: "✨", mech: "pleat_h", c1: "#fecdd3", c2: "#38bdf8", shape: 4, hint: "Stretch 6-fold pleats to 100%" },
    { id: 6, name: "6. Kimono Overlapping Collar", icon: "🌺", mech: "sash_diag", c1: "#f9a8d4", c2: "#9333ea", shape: 5, a: "↖ Collar L", b: "Collar R ↗", hint: "Lift both overlapping kimono lapels" },
    { id: 7, name: "7. Wax-Sealed Belly-Band", icon: "💌", mech: "band_2step", c1: "#fef08a", c2: "#d97706", shape: 6, btn: "💌 Lift Inner Hood", hint: "Slide band (50%) then lift flap (100%)" },
    { id: 8, name: "8. Origami 3-Petal Tulip", icon: "🌷", mech: "seq_3", c1: "#fda4af", c2: "#be123c", shape: 7, p: ["🌷 Bud 1", "🌷 Bud 2", "🌷 Bud 3"], hint: "Bloom all 3 paper tulip petals" },
    { id: 9, name: "9. Crimson Heart Pulse-Lock", icon: "❤️", mech: "tap_n", c1: "#ffe4e6", c2: "#e11d68", shape: 8, taps: 3, hint: "Tap 3 heartbeats to reach 100%" },
    { id: 10, name: "10. Four-Blade Windmill", icon: "🎡", mech: "mitre_4", c1: "#bfdbfe", c2: "#2563eb", shape: 9, m: ["↖B1", "↗B2", "↙B3", "↘B4"], hint: "Unfold all 4 pinwheel corners" },

    { id: 11, name: "11. Samurai Kabuto Crest", icon: "👑", mech: "shutter_v", c1: "#fde68a", c2: "#b45309", shape: 10, a: "▲ Upper Crest", b: "▼ Visor Fold", hint: "Flip Kabuto crest & visor open" },
    { id: 12, name: "12. Starburst Gold Foil", icon: "⭐", mech: "scratch", c1: "#fef08a", c2: "#eab308", shape: 11, hint: "Rub across starburst gold foil to 100%" },
    { id: 13, name: "13. Miniature Matchbox Tray", icon: "🎁", mech: "slider_h", c1: "#fed7aa", c2: "#ea580c", shape: 12, hint: "Slide miniature paper drawer to 100%" },
    { id: 14, name: "14. Swallowtail Butterfly", icon: "🌸", mech: "hold_press", c1: "#e9d5ff", c2: "#9333ea", shape: 13, btn: "🦋 Hold Butterfly Seal", hint: "Press & hold to flutter wings to 100%" },
    { id: 15, name: "15. Sensu Radial Hand-Fan", icon: "🌺", mech: "dial_360", c1: "#fbcfe8", c2: "#db2777", shape: 14, hint: "Sweep Sensu paper fan 180° to 100%" },
    { id: 16, name: "16. 4-Corner Envelope Mitre", icon: "✉️", mech: "mitre_4", c1: "#e0e7ff", c2: "#4f46e5", shape: 15, m: ["↖TL", "↗TR", "↙BL", "↘BR"], hint: "Open all 4 tucked envelope corners" },
    { id: 17, name: "17. Perforated Zipper Strip", icon: "🎟️", mech: "zip_strip", c1: "#fecaca", c2: "#dc2626", shape: 16, hint: "Zip tear-strip cleanly to 100%" },
    { id: 18, name: "18. Kirigami 3-Ray Snowflake", icon: "❄️", mech: "seq_3", c1: "#cffafe", c2: "#0891b2", shape: 17, p: ["❄️ Ray I", "❄️ Ray II", "❄️ Ray III"], hint: "Unfold all 3 icy Kirigami branches" },
    { id: 19, name: "19. Shoji Sliding Doors", icon: "🏡", mech: "wing_h", c1: "#fef3c7", c2: "#d97706", shape: 18, a: "◀ Shoji L", b: "Shoji R ▶", hint: "Part both rice-paper Shoji screens" },
    { id: 20, name: "20. Kawasaki Spiral Rose", icon: "🌹", mech: "dial_360", c1: "#fecdd3", c2: "#e11d68", shape: 19, hint: "Unwind spiral rose twist to 100%" },

    { id: 21, name: "21. Double Peony Gatefold", icon: "🌸", mech: "sash_diag", c1: "#fce7f3", c2: "#ec4899", shape: 20, a: "🌸 Outer Fold", b: "Inner Fold 🌸", hint: "Peel open both layered peony folds" },
    { id: 22, name: "22. Origami Swan Neck-Lift", icon: "🕊️", mech: "slider_v", c1: "#e0f2fe", c2: "#0369a1", shape: 21, hint: "Raise graceful swan neck slider to 100%" },
    { id: 23, name: "23. Corset Silk Lacing", icon: "🎀", mech: "zip_strip", c1: "#fbcfe8", c2: "#be185d", shape: 22, hint: "Unlace criss-cross silk cord to 100%" },
    { id: 24, name: "24. Hexaflexagon Tri-Flip", icon: "🔮", mech: "seq_3", c1: "#ddd6fe", c2: "#6d28d9", shape: 23, p: ["🔮 Flex 1", "🔮 Flex 2", "🔮 Flex 3"], hint: "Flex all 3 hexaflexagon faces" },
    { id: 25, name: "25. Magic Infinity Tile", icon: "✨", mech: "shutter_v", c1: "#bbf7d0", c2: "#059669", shape: 24, a: "▲ Top Tile", b: "▼ Bot Tile", hint: "Flip top & bottom infinity panels" },
    { id: 26, name: "26. Kiss-Lock Paper Purse", icon: "💝", mech: "tap_n", c1: "#fce7f3", c2: "#db2777", shape: 25, taps: 2, hint: "Click kiss-lock clasp twice (100%)" },
    { id: 27, name: "27. Royal Wax Crest Press", icon: "👑", mech: "hold_press", c1: "#fde68a", c2: "#ca8a04", shape: 26, btn: "👑 Hold Royal Crest", hint: "Hold royal wax seal to 100% warmth" },
    { id: 28, name: "28. Four-Jewel Tiara Fold", icon: "💎", mech: "mitre_4", c1: "#c7d2fe", c2: "#4338ca", shape: 27, m: ["💎1", "💎2", "💎3", "💎4"], hint: "Set all 4 crown paper jewels" },
    { id: 29, name: "29. Velvet Ring-Box Clasp", icon: "💍", mech: "band_2step", c1: "#ffe4e6", c2: "#be123c", shape: 28, btn: "💍 Pop Velvet Lid", hint: "Slide latch (50%) & pop ring lid (100%)" },
    { id: 30, name: "30. Frosted Silver Leaf", icon: "❄️", mech: "scratch", c1: "#bae6fd", c2: "#0284c7", shape: 29, hint: "Buff away silver frost coat to 100%" },

    { id: 31, name: "31. Five-Petal Sakura Wheel", icon: "🌸", mech: "seq_3", c1: "#fbcfe8", c2: "#f43f5e", shape: 30, p: ["🌸A", "🌸B", "🌸C"], hint: "Tap sakura trio to bloom 100%" },
    { id: 32, name: "32. Lapland Glass Igloo Dome", icon: "🛖", mech: "shutter_v", c1: "#a5f3fc", c2: "#0891b2", shape: 31, a: "▲ Sky Dome", b: "▼ Snow Base", hint: "Open Arctic glass dome roof & base" },
    { id: 33, name: "33. Origami Sailboat Hoist", icon: "🌊", mech: "slider_v", c1: "#bfdbfe", c2: "#1d4ed8", shape: 32, hint: "Hoist paper mainsail cord to 100%" },
    { id: 34, name: "34. Golden Ratio Nautilus", icon: "🌟", mech: "dial_360", c1: "#fef3c7", c2: "#d97706", shape: 33, hint: "Spin Fibonacci paper spiral to 100%" },
    { id: 35, name: "35. Aurora Mist Glaze", icon: "🌌", mech: "scratch", c1: "#a7f3d0", c2: "#ec4899", shape: 34, hint: "Wipe Northern Lights glaze to 100%" },
    { id: 36, name: "36. Twin Satin Bow Loops", icon: "🎁", mech: "wing_h", c1: "#fecdd3", c2: "#e11d68", shape: 35, a: "🎀 Loop L", b: "Loop R 🎀", hint: "Untie left & right satin bow loops" },
    { id: 37, name: "37. Parchment Love Scroll", icon: "📜", mech: "band_2step", c1: "#fef9c3", c2: "#a16207", shape: 36, btn: "📜 Unroll Scroll", hint: "Slip gold ring off & unroll to 100%" },
    { id: 38, name: "38. Four-Leaf Lucky Clover", icon: "🍀", mech: "mitre_4", c1: "#bbf7d0", c2: "#15803d", shape: 37, m: ["🍀N", "🍀E", "🍀S", "🍀W"], hint: "Unfold all 4 lucky clover leaves" },
    { id: 39, name: "39. Origami Twin-Heart Sync", icon: "💓", mech: "hold_press", c1: "#fbcfe8", c2: "#e11d68", shape: 38, btn: "💓 Hold Heart Sync", hint: "Hold pulse on paper heart to 100%" },
    { id: 40, name: "40. Peace-Dove Tail Tassel", icon: "🕊️", mech: "pleat_h", c1: "#e0f2fe", c2: "#0284c7", shape: 39, hint: "Pull dove tail pleat to flutter 100%" },

    { id: 41, name: "41. Paper Lantern Tassel", icon: "🏮", mech: "slider_v", c1: "#fed7aa", c2: "#c2410c", shape: 40, hint: "Pull lantern silk tassel to 100%" },
    { id: 42, name: "42. Origami Fortune Catcher", icon: "🔮", mech: "mitre_4", c1: "#e9d5ff", c2: "#7e22ce", shape: 41, m: ["💖1", "❄️2", "🌹3", "✨4"], hint: "Flip all 4 Cootie-Catcher flaps" },
    { id: 43, name: "43. Silver Keyhole Bolt", icon: "🔑", mech: "slider_h", c1: "#e2e8f0", c2: "#475569", shape: 42, hint: "Slide silver paper key bolt to 100%" },
    { id: 44, name: "44. Dawn Sunburst Horizon", icon: "☀️", mech: "pleat_h", c1: "#fef08a", c2: "#f59e0b", shape: 43, hint: "Fan sunburst horizon rays to 100%" },
    { id: 45, name: "45. 5-Frame Polaroid Strip", icon: "📸", mech: "zip_strip", c1: "#f1f5f9", c2: "#e11d68", shape: 44, hint: "Eject Polaroid film tab to 100%" },
    { id: 46, name: "46. French Balcony Shutters", icon: "🚪", mech: "sash_diag", c1: "#dbeafe", c2: "#2563eb", shape: 45, a: "🚪 Left Pane", b: "Right Pane 🚪", hint: "Swing wide both glass balcony panes" },
    { id: 47, name: "47. Satin Ring Cushion Knot", icon: "💍", mech: "band_2step", c1: "#fce7f3", c2: "#be185d", shape: 46, btn: "💍 Untie Cushion", hint: "Loosen ribbon (50%) & open pillow (100%)" },
    { id: 48, name: "48. Rose-Quartz Stardust Foil", icon: "✨", mech: "scratch", c1: "#fbcfe8", c2: "#8b5cf6", shape: 47, hint: "Polish rose-quartz foil to 100%" },
    { id: 49, name: "49. Soulmate Interlock Seal", icon: "💘", mech: "tap_n", c1: "#ffe4e6", c2: "#e11d68", shape: 48, taps: 4, hint: "Tap 4 soulmate beats to reach 100%" },
    { id: 50, name: "50. Royal Golden Finale Crown", icon: "👑", mech: "hold_press", c1: "#fef08a", c2: "#ca8a04", shape: 49, btn: "👑 Crown Finale (100%)", hint: "Hold Golden Crown to unlock Finale!" }
  ];

  // Renders a distinct custom SVG paper-origami geometry for every single compartment (1..50)!
  function renderOrigamiUniqueSvg(spec) {
    const gId = `og_${spec.id}`;
    const rot = (spec.id * 17) % 360;
    const mod = spec.shape % 10;
    let poly = "";
    if (mod === 0) {
      poly = `<polygon points="30,4 54,28 30,56 6,28" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.6"/><line x1="30" y1="4" x2="30" y2="56" stroke="#fff" stroke-dasharray="3 2"/>`;
    } else if (mod === 1) {
      poly = `<polygon points="4,14 30,30 4,48" fill="${spec.c1}" stroke="${spec.c2}" stroke-width="1.5"/><polygon points="56,14 30,30 56,48" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.5"/><polygon points="30,6 38,30 30,54 22,30" fill="#fff" stroke="${spec.c2}" stroke-width="1.2"/>`;
    } else if (mod === 2) {
      poly = `<rect x="8" y="12" width="44" height="36" rx="6" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.5"/><path d="M8 24 H52 M8 36 H52" stroke="#fff" stroke-width="1.5"/>`;
    } else if (mod === 3) {
      poly = `<g transform="rotate(${rot % 45} 30 30)"><rect x="13" y="13" width="34" height="34" rx="4" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.5"/><path d="M13 13 L47 47 M47 13 L13 47" stroke="#fff" stroke-dasharray="2 2"/></g>`;
    } else if (mod === 4) {
      poly = `<polygon points="6,44 14,16 22,44 30,16 38,44 46,16 54,44" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.5"/>`;
    } else if (mod === 5) {
      poly = `<polygon points="8,10 34,10 24,50 8,50" fill="${spec.c1}" stroke="${spec.c2}" stroke-width="1.4"/><polygon points="52,10 26,10 36,50 52,50" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.4"/>`;
    } else if (mod === 6) {
      poly = `<rect x="7" y="14" width="46" height="34" rx="5" fill="${spec.c1}" stroke="${spec.c2}" stroke-width="1.5"/><polygon points="7,14 53,14 30,34" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.4"/>`;
    } else if (mod === 7) {
      poly = `<path d="M30 52 C14 44 10 24 18 12 L30 26 L42 12 C50 24 46 44 30 52 Z" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.5"/><polygon points="30,8 37,24 30,34 23,24" fill="#fff" stroke="${spec.c2}" stroke-width="1.2"/>`;
    } else if (mod === 8) {
      poly = `<path d="M30 51 C30 51 9 37 9 21 C9 13 16 9 23 11 C27 12 30 17 30 17 C30 17 33 12 37 11 C44 9 51 13 51 21 C51 37 30 51 30 51 Z" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.6"/>`;
    } else {
      poly = `<polygon points="30,5 37,23 55,23 40,34 46,52 30,41 14,52 20,34 5,23 23,23" fill="url(#${gId})" stroke="${spec.c2}" stroke-width="1.4"/>`;
    }
    return `
      <svg class="orig-svg-art" viewBox="0 0 60 60" aria-hidden="true">
        <defs>
          <linearGradient id="${gId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${spec.c1}" />
            <stop offset="100%" stop-color="${spec.c2}" stop-opacity="0.55" />
          </linearGradient>
        </defs>
        ${poly}
      </svg>
    `;
  }

  function countUnfoldedInBox(boxLayer) {
    const start = (boxLayer - 1) * 10 + 1;
    let c = 0;
    for (let id = start; id < start + 10; id++) {
      if (state.explosionUnfoldedIds.has(id)) c++;
    }
    return c;
  }

  function updateExplosionProgressUI() {
    const count = state.explosionUnfoldedIds.size;
    const totalPct = Math.round((count / 50) * 100);
    const boxCnt = countUnfoldedInBox(state.explosionBoxLayer);
    const boxPct = Math.round((boxCnt / 10) * 100);

    const lbl = document.getElementById("expProgressLabel");
    const boxBadge = document.getElementById("expBoxLayerPctBadge");
    const bar = document.getElementById("expProgressBar");
    const finale = document.getElementById("expGrandFinaleBanner");

    if (lbl) {
      lbl.textContent = `Unfolded: ${count} / 50 (${totalPct}%) 🎁`;
      hydrate3DEmojis(lbl);
    }
    if (boxBadge) {
      boxBadge.textContent = `Box ${state.explosionBoxLayer}: ${boxCnt} / 10 (${boxPct}%)`;
    }
    if (bar) bar.style.width = `${totalPct}%`;
    if (finale) {
      finale.hidden = count < 50;
      if (count >= 50) hydrate3DEmojis(finale);
    }

    document.querySelectorAll("#expLayerTabs .filter-pill").forEach((pill) => {
      const lyr = Number(pill.dataset.boxlayer);
      const lCnt = countUnfoldedInBox(lyr);
      pill.innerHTML = lCnt === 10
        ? `Box ${lyr} ✓<span class="pill-sub"> (100%)</span>`
        : `Box ${lyr}<span class="pill-sub"> (${lCnt}/10)</span>`;
    });
  }

  function buildOrigamiUnit(globalId, justUnfoldedId = null) {
    const spec = ORIGAMI_50_OPENINGS[globalId - 1];
    const photoIdx = globalId >= 33 ? (102 + ((globalId - 33) % 18)) : (((globalId - 1) * 2) % PHOTOS.length);
    const photo = PHOTOS[photoIdx];
    const isOpen = state.explosionUnfoldedIds.has(globalId);

    const unit = document.createElement("div");
    unit.className = `origami-craft-unit ${isOpen ? "unfolded" : ""}`;

    let finishing = false;
    const setUnitPct = (pct) => {
      const pEl = unit.querySelector(".orig-pct-pill");
      const svgEl = unit.querySelector(".orig-svg-art");
      const clamped = Math.max(0, Math.min(100, Math.round(pct)));
      if (pEl) {
        pEl.textContent = clamped >= 100 ? "100% ✓" : `${clamped}%`;
        pEl.classList.toggle("done-100", clamped >= 100);
      }
      if (svgEl) {
        svgEl.style.transform = `scale(${1 + (clamped / 100) * 0.16}) rotate(${(clamped / 100) * 14}deg)`;
      }
    };

    const completeTo100AndUnfold = () => {
      if (finishing) return;
      finishing = true;
      setUnitPct(100);
      setTimeout(() => {
        state.explosionUnfoldedIds.add(globalId);
        addArcadeXp(4, `🎁 Origami #${globalId} (100%)`);
        spawnCelebrationBurst(12);
        updateExplosionProgressUI();

        // If current box just reached 10/10 (100%) and there is another box with unopened folds, auto-advance smoothly!
        const curBoxDone = countUnfoldedInBox(state.explosionBoxLayer) === 10;
        if (curBoxDone && state.explosionUnfoldedIds.size < 50) {
          let nextOpenBox = state.explosionBoxLayer;
          for (let b = 1; b <= 5; b++) {
            const cand = ((state.explosionBoxLayer - 1 + b) % 5) + 1;
            if (countUnfoldedInBox(cand) < 10) {
              nextOpenBox = cand;
              break;
            }
          }
          showToast(`🎉 Box ${state.explosionBoxLayer} reached 100%! Opening Nested Box #${nextOpenBox}...`);
          renderExplosionCrossWings(globalId);
          setTimeout(() => {
            state.explosionBoxLayer = nextOpenBox;
            document.querySelectorAll("#expLayerTabs .filter-pill").forEach((p) => {
              p.classList.toggle("active", Number(p.dataset.boxlayer) === state.explosionBoxLayer);
            });
            updateExplosionProgressUI();
            renderExplosionCrossWings();
          }, 780);
        } else {
          if (state.explosionUnfoldedIds.size === 50) {
            spawnCelebrationBurst(36);
            showToast("🏆 100% COMPLETE! All 50 Unique Origami Sculptures Unfolded! ❤️");
          }
          renderExplosionCrossWings(globalId);
        }
      }, 220);
    };

    if (isOpen) {
      unit.innerHTML = `
        <div class="orig-top-head">
          <span class="exp-flap-num">${spec.name}</span>
          <span class="orig-pct-pill done-100">100% ✓</span>
        </div>
        <div class="orig-img-wrap media-veil-container" style="width:100%;border-radius:8px;overflow:hidden;">
          <img src="${photo.thumb}" onerror="this.onerror=null;this.src='${photo.src}'" alt="${photo.title}" class="origami-revealed-img" />
        </div>
        <p class="origami-note-mini">${enforceNameLock(photo.title)}</p>
      `;
      const wrapEl = unit.querySelector(".orig-img-wrap");
      const imgEl = unit.querySelector("img");
      if (justUnfoldedId === globalId && imgEl && wrapEl) {
        applyProgressiveImageVeil(imgEl, wrapEl, "✨ Unfolding 100%...");
      }
      imgEl.addEventListener("click", () => openLightboxWithList(PHOTOS, photoIdx));
      hydrate3DEmojis(unit);
      return unit;
    }

    let actionHTML = "";
    if (spec.mech === "wing_h" || spec.mech === "shutter_v" || spec.mech === "sash_diag") {
      actionHTML = `
        <div class="orig-dual-row">
          <button type="button" class="orig-flap-btn">${spec.a}</button>
          <button type="button" class="orig-flap-btn">${spec.b}</button>
        </div>
      `;
    } else if (spec.mech === "mitre_4") {
      actionHTML = `
        <div class="orig-mitre-grid">
          ${spec.m.map((lbl) => `<button type="button" class="orig-flap-btn orig-m4">${lbl}</button>`).join("")}
        </div>
      `;
    } else if (spec.mech === "seq_3") {
      actionHTML = `
        <div class="orig-seq-row">
          ${spec.p.map((lbl) => `<button type="button" class="orig-seq-btn">${lbl}</button>`).join("")}
        </div>
      `;
    } else if (spec.mech === "tap_n") {
      actionHTML = `
        <button type="button" class="orig-hold-btn orig-tap-btn">${spec.icon} Tap (${spec.taps} Left)</button>
      `;
    } else if (spec.mech === "hold_press") {
      actionHTML = `
        <button type="button" class="orig-hold-btn orig-press-btn">${spec.btn}</button>
      `;
    } else if (spec.mech === "scratch") {
      actionHTML = `
        <canvas width="148" height="44" class="orig-scratch-canvas"></canvas>
      `;
    } else if (spec.mech === "band_2step") {
      actionHTML = `
        <input type="range" min="0" max="100" value="0" class="tactile-ribbon-slider orig-b2-sl" aria-label="Slide band" />
        <button type="button" class="mini-frost-btn orig-b2-btn" disabled style="opacity:0.45;">${spec.btn}</button>
      `;
    } else {
      // slider_h, slider_v, pleat_h, zip_strip, dial_360
      const maxVal = spec.mech === "dial_360" ? 360 : 100;
      actionHTML = `
        <input type="range" min="0" max="${maxVal}" value="0" class="tactile-ribbon-slider orig-range-100" aria-label="${spec.name}" />
      `;
    }

    unit.innerHTML = `
      <div class="orig-top-head">
        <span class="exp-flap-num">${spec.name}</span>
        <span class="orig-pct-pill">0%</span>
      </div>
      <div class="orig-svg-stage">${renderOrigamiUniqueSvg(spec)}</div>
      <div class="orig-action-zone">${actionHTML}</div>
      <small style="font-size:0.66rem;color:var(--ink-soft);">${spec.hint}</small>
    `;

    // Wire 2-part wing/shutter/sash -> 50% -> 100%
    const dualBtns = unit.querySelectorAll(".orig-dual-row .orig-flap-btn");
    if (dualBtns.length) {
      let openedCnt = 0;
      dualBtns.forEach((btn) => btn.addEventListener("click", () => {
        if (btn.classList.contains("opened")) return;
        btn.classList.add("opened");
        openedCnt++;
        setUnitPct((openedCnt / dualBtns.length) * 100);
        if (openedCnt >= dualBtns.length) completeTo100AndUnfold();
      }));
    }

    // Wire 4-corner mitre / fortune catcher -> 25% -> 50% -> 75% -> 100%
    const m4Btns = unit.querySelectorAll(".orig-m4");
    if (m4Btns.length) {
      let mCnt = 0;
      m4Btns.forEach((btn) => btn.addEventListener("click", () => {
        if (btn.classList.contains("opened")) return;
        btn.classList.add("opened");
        mCnt++;
        setUnitPct((mCnt / m4Btns.length) * 100);
        if (mCnt >= m4Btns.length) completeTo100AndUnfold();
      }));
    }

    // Wire 3-step sequence -> 33% -> 67% -> 100%
    const seqBtns = unit.querySelectorAll(".orig-seq-btn");
    if (seqBtns.length) {
      let sCnt = 0;
      seqBtns.forEach((btn) => btn.addEventListener("click", () => {
        if (btn.classList.contains("done")) return;
        btn.classList.add("done");
        sCnt++;
        setUnitPct((sCnt / seqBtns.length) * 100);
        if (sCnt >= seqBtns.length) completeTo100AndUnfold();
      }));
    }

    // Wire multi-tap lock -> 100%
    const tapBtn = unit.querySelector(".orig-tap-btn");
    if (tapBtn) {
      const totalTaps = spec.taps || 3;
      let doneTaps = 0;
      tapBtn.addEventListener("click", () => {
        doneTaps++;
        const rem = Math.max(0, totalTaps - doneTaps);
        tapBtn.textContent = rem > 0 ? `${spec.icon} Tap (${rem} Left)` : `${spec.icon} 100% Unlocked!`;
        hydrate3DEmojis(tapBtn);
        setUnitPct((doneTaps / totalTaps) * 100);
        if (doneTaps >= totalTaps) completeTo100AndUnfold();
      });
    }

    // Wire press-and-hold (also supports repeated clicks so mobile/desktop both reach 100% effortlessly!)
    const pressBtn = unit.querySelector(".orig-press-btn");
    if (pressBtn) {
      let holdPct = 0;
      let hTimer = null;
      const advanceHold = (step) => {
        holdPct = Math.min(100, holdPct + step);
        setUnitPct(holdPct);
        if (holdPct >= 100) {
          clearInterval(hTimer);
          completeTo100AndUnfold();
        }
      };
      const startH = (e) => {
        if (e.cancelable) e.preventDefault();
        advanceHold(25);
        clearInterval(hTimer);
        hTimer = setInterval(() => advanceHold(15), 75);
      };
      const stopH = () => clearInterval(hTimer);
      pressBtn.addEventListener("mousedown", startH);
      pressBtn.addEventListener("touchstart", startH, { passive: false });
      pressBtn.addEventListener("mouseup", stopH);
      pressBtn.addEventListener("mouseleave", stopH);
      pressBtn.addEventListener("touchend", stopH);
      pressBtn.addEventListener("click", () => advanceHold(35));
    }

    // Wire interactive scratch foil canvas -> 0% to 100%
    const scCanvas = unit.querySelector(".orig-scratch-canvas");
    if (scCanvas) {
      const sctx = scCanvas.getContext("2d");
      const grd = sctx.createLinearGradient(0, 0, 148, 44);
      grd.addColorStop(0, spec.c1);
      grd.addColorStop(1, spec.c2);
      sctx.fillStyle = grd;
      sctx.fillRect(0, 0, 148, 44);
      sctx.fillStyle = "#181826";
      sctx.font = "700 11px 'Inter', sans-serif";
      sctx.textAlign = "center";
      sctx.fillText("✨ Rub Foil to 100%", 74, 26);

      let rubbing = false;
      let rubPct = 0;
      const rubAt = (e) => {
        if (!rubbing) return;
        const r = scCanvas.getBoundingClientRect();
        const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) * (148 / (r.width || 148));
        const y = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) * (44 / (r.height || 44));
        sctx.globalCompositeOperation = "destination-out";
        sctx.beginPath();
        sctx.arc(x, y, 16, 0, Math.PI * 2);
        sctx.fill();
        rubPct = Math.min(100, rubPct + 10);
        setUnitPct(rubPct);
        if (rubPct >= 100) completeTo100AndUnfold();
      };
      scCanvas.addEventListener("pointerdown", (e) => { rubbing = true; rubPct = Math.min(100, rubPct + 34); setUnitPct(rubPct); rubAt(e); if (rubPct >= 100) completeTo100AndUnfold(); });
      scCanvas.addEventListener("pointermove", rubAt);
      window.addEventListener("pointerup", () => { rubbing = false; });
    }

    // Wire 2-step band + lift -> 50% -> 100%
    const b2Sl = unit.querySelector(".orig-b2-sl");
    const b2Btn = unit.querySelector(".orig-b2-btn");
    if (b2Sl && b2Btn) {
      b2Sl.addEventListener("input", () => {
        const v = Number(b2Sl.value);
        const halfPct = Math.min(50, Math.round((v / 95) * 50));
        setUnitPct(halfPct);
        if (v >= 92) {
          b2Sl.value = "100";
          setUnitPct(50);
          b2Btn.disabled = false;
          b2Btn.style.opacity = "1";
        }
      });
      b2Btn.addEventListener("click", () => {
        setUnitPct(100);
        completeTo100AndUnfold();
      });
    }

    // Wire continuous sliders & 360° dials -> smooth 0% to 100% snap!
    const range100 = unit.querySelector(".orig-range-100");
    if (range100) {
      const maxV = Number(range100.max) || 100;
      range100.addEventListener("input", () => {
        const raw = Number(range100.value);
        const pct = Math.min(100, Math.round((raw / maxV) * 100));
        setUnitPct(pct);
        if (pct >= 96) {
          range100.value = String(maxV);
          setUnitPct(100);
          completeTo100AndUnfold();
        }
      });
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
      updateExplosionProgressUI();
      renderExplosionCrossWings();
    });
    centerBox.appendChild(nextBtn);
    hydrate3DEmojis(centerBox);
  }

  function initExplosionBox50() {
    const closedStage = document.getElementById("explosionClosedStage");
    const openStage = document.getElementById("explosionOpenStage");
    const ribbonSlider = document.getElementById("untieBoxRibbonSlider");
    const ribbonPctBadge = document.getElementById("untieRibbonPctBadge");
    const lidEl = document.getElementById("isoBoxLid");
    const liftBtn = document.getElementById("liftBoxLidBtn");
    const stepHead = document.getElementById("boxStepHeading");
    const stepSub = document.getElementById("boxStepSub");
    const unfoldBoxBtn = document.getElementById("unfoldCurrentBoxBtn");

    ribbonSlider.addEventListener("input", () => {
      const v = Number(ribbonSlider.value);
      if (ribbonPctBadge) ribbonPctBadge.textContent = v >= 96 ? "Ribbon: 100% ✓" : `Ribbon: ${v}%`;
      if (v >= 96) {
        ribbonSlider.value = "100";
        lidEl.classList.add("bow-untied");
        stepHead.textContent = "Step 2: Bow Untied (100%)! Lift the Box Lid";
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
        updateExplosionProgressUI();
        renderExplosionCrossWings();
      }, 460);
    });

    unfoldBoxBtn?.addEventListener("click", () => {
      const base = (state.explosionBoxLayer - 1) * 10;
      for (let i = 1; i <= 10; i++) state.explosionUnfoldedIds.add(base + i);
      addArcadeXp(20, `🎁 Box ${state.explosionBoxLayer} Unfolded 100%`);
      spawnCelebrationBurst(22);
      updateExplosionProgressUI();
      renderExplosionCrossWings();
      if (state.explosionUnfoldedIds.size === 50) {
        showToast("🏆 100% COMPLETE! All 50 Unique Origami Folds Unlocked! ❤️");
      } else {
        showToast(`✨ Box ${state.explosionBoxLayer} unfolded to 100%!`);
      }
    });

    document.getElementById("refoldBoxBtn").addEventListener("click", () => {
      openStage.hidden = true;
      closedStage.hidden = false;
      ribbonSlider.value = "0";
      if (ribbonPctBadge) ribbonPctBadge.textContent = "Ribbon: 0%";
      lidEl.classList.remove("bow-untied", "lid-lifted");
      liftBtn.hidden = true;
      stepHead.textContent = "Step 1: Slide Satin Ribbon to 100%";
      stepSub.textContent = "Drag the silk ribbon slider all the way to 100% to untie the bow and release all 4 origami box walls.";
    });

    document.querySelectorAll("#expLayerTabs .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#expLayerTabs .filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        state.explosionBoxLayer = Number(pill.dataset.boxlayer);
        updateExplosionProgressUI();
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

  const TIMELINE_SECRET_MARGINS = [
    "Arunava's Secret Note #1: From the first 5 minutes of chatting on 16 Oct 2025, I secretly hoped we would never stop talking ❤️",
    "Arunava's Secret Note #2: Nine days was all my heart needed to know with 100% certainty that you are my forever home 💍",
    "Arunava's Secret Note #3: Seeing you in golden-mustard florals on 24 Feb 2026 made my heart beat faster than ever before 🌹",
    "Arunava's Secret Note #4: Hearing your family speak so warmly on 07 April 2026 filled me with the deepest gratitude 🌸",
    "Arunava's Secret Note #5: On 19 April 2026, seeing both families happy together felt like an answered prayer 🏡",
    "Arunava's Secret Note #6: Matching in blue on 03 July 2026 — I looked at you and saw my entire peaceful future 👑❤️"
  ];

  function updateTimelinePassportUI() {
    const cnt = state.stampedTimelineChapters.size;
    const pct = Math.round((cnt / 6) * 100);
    const badge = document.getElementById("tlPassportBadge");
    const bar = document.getElementById("tlPassportBar");
    if (badge) {
      badge.textContent = cnt >= 6 ? `Stamped: 6 / 6 (100% Certified!) 🏆` : `Stamped: ${cnt} / 6 (${pct}%) 💮`;
      hydrate3DEmojis(badge);
    }
    if (bar) bar.style.width = `${pct}%`;
  }

  function renderTimeline() {
    const track = document.getElementById("timelineTrack");
    if (!track) return;
    track.innerHTML = "";

    getTimelineEvents().forEach((ev, idx) => {
      const photoObj = ev.photoNum ? PHOTOS.find((p) => p.num === ev.photoNum) : null;
      const isStamped = state.stampedTimelineChapters.has(idx);
      const isNoteOpen = state.unlockedMarginNotes.has(idx);

      const card = document.createElement("article");
      card.className = `timeline-item surface-card ${photoObj ? "" : "no-photo"} ${isStamped ? "is-stamped" : ""}`;
      const paragraphs = ev.story.map((s) => `<p class="timeline-story">${enforceNameLock(s)}</p>`).join("");
      const marginNote = isNoteOpen
        ? `<div class="tl-secret-margin-note">${enforceNameLock(TIMELINE_SECRET_MARGINS[idx])}</div>`
        : "";

      card.innerHTML = `
        <span class="timeline-dot" aria-hidden="true"></span>
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
            <span class="timeline-date-badge" style="margin:0;">${ev.date}</span>
            ${isStamped ? `<span class="score-pill" style="background:#fef9c3;color:#854d0e;border-color:#fde047;">💮 Passport Stamped ✓</span>` : ""}
          </div>
          <h3 class="timeline-title">${ev.icon} ${enforceNameLock(ev.event)}</h3>
          ${paragraphs}
          ${marginNote}
          <div class="tl-card-actions">
            <button type="button" class="mini-frost-btn tl-stamp-btn">${isStamped ? "💮 Stamped ✓" : "💮 Stamp Memory Seal"}</button>
            <button type="button" class="mini-frost-btn tl-margin-btn">${isNoteOpen ? "💌 Secret Note Open" : "🔓 Reveal Arunava's Secret Note"}</button>
            <button type="button" class="mini-frost-btn tl-chat-btn">💬 Reminisce in Chat</button>
          </div>
        </div>
        ${photoObj ? `<div class="timeline-thumb-wrap media-veil-container"><img src="${photoObj.thumb}" alt="${ev.event}" class="timeline-thumb" /></div>` : ""}
      `;

      card.querySelector(".tl-stamp-btn").addEventListener("click", () => {
        if (!state.stampedTimelineChapters.has(idx)) {
          state.stampedTimelineChapters.add(idx);
          addArcadeXp(10, `💮 Stamped ${ev.date}`);
          spawnCelebrationBurst(14);
          updateTimelinePassportUI();
          if (state.stampedTimelineChapters.size === 6) {
            showToast("🏆 100% Memory Passport Complete! All 6 Sacred Chapters Stamped! ❤️");
          }
          renderTimeline();
        }
      });

      card.querySelector(".tl-margin-btn").addEventListener("click", () => {
        if (state.unlockedMarginNotes.has(idx)) state.unlockedMarginNotes.delete(idx);
        else {
          state.unlockedMarginNotes.add(idx);
          spawnCelebrationBurst(8);
        }
        renderTimeline();
      });

      card.querySelector(".tl-chat-btn").addEventListener("click", () => {
        submitUserQuestion(`Tell me your favorite memory of our ${ev.event} on ${ev.date}!`);
      });

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

    // Render pinned Future Chapter #7+ capsules!
    (state.customTimelineCapsules || []).forEach((cap, cIdx) => {
      const card = document.createElement("article");
      card.className = "timeline-item surface-card no-photo is-stamped";
      card.innerHTML = `
        <span class="timeline-dot" aria-hidden="true"></span>
        <div>
          <span class="timeline-date-badge">${enforceNameLock(cap.date || "Our Shared Future ✨")}</span>
          <h3 class="timeline-title">🔮 Chapter #${7 + cIdx}: ${enforceNameLock(cap.title)}</h3>
          <p class="timeline-story">Sealed together as our next cherished dream milestone — walking hand-in-hand from October 2025 into every tomorrow ahead! ❤️❄️</p>
          <div class="tl-card-actions">
            <button type="button" class="mini-frost-btn cap-ask-btn">💬 Plan With Arunava</button>
            <button type="button" class="mini-frost-btn cap-del-btn">✕ Remove</button>
          </div>
        </div>
      `;
      card.querySelector(".cap-ask-btn").addEventListener("click", () => {
        submitUserQuestion(`Let's plan our future milestone: "${cap.title}" (${cap.date})!`);
      });
      card.querySelector(".cap-del-btn").addEventListener("click", () => {
        state.customTimelineCapsules.splice(cIdx, 1);
        try { localStorage.setItem("lovegpt-tl-capsules", JSON.stringify(state.customTimelineCapsules)); } catch (_) {}
        renderTimeline();
      });
      hydrate3DEmojis(card);
      track.appendChild(card);
    });

    updateTimelinePassportUI();
  }

  function initTimelineInteractiveFeatures() {
    const stampNextBtn = document.getElementById("tlStampAllBtn");
    const matcherBox = document.getElementById("tlMiniMatcherBox");
    const titleInput = document.getElementById("tlFutureTitleInput");
    const dateInput = document.getElementById("tlFutureDateInput");
    const sealBtn = document.getElementById("sealFutureChapterBtn");

    stampNextBtn?.addEventListener("click", () => {
      for (let i = 0; i < 6; i++) {
        if (!state.stampedTimelineChapters.has(i)) {
          state.stampedTimelineChapters.add(i);
          spawnCelebrationBurst(14);
          renderTimeline();
          return;
        }
      }
      showToast("🏆 All 6 Timeline Chapters are already 100% Stamped! ❤️");
    });

    // Interactive Milestone Date-Match Mini-Game inside Timeline!
    const matchPool = [
      { idx: 0, name: "💬 Very First Chat", ans: "16 Oct 2025", opts: ["16 Oct 2025", "25 Oct 2025", "24 Feb 2026"] },
      { idx: 1, name: "💍 Acceptance Day", ans: "25 Oct 2025", opts: ["16 Oct 2025", "25 Oct 2025", "07 Apr 2026"] },
      { idx: 2, name: "🌹 First Meet in Person", ans: "24 Feb 2026", opts: ["24 Feb 2026", "19 Apr 2026", "03 Jul 2026"] },
      { idx: 5, name: "👑 First Official Meeting", ans: "03 Jul 2026", opts: ["07 Apr 2026", "19 Apr 2026", "03 Jul 2026"] }
    ];
    let mCursor = 0;

    const renderMiniMatcher = () => {
      if (!matcherBox) return;
      const cur = matchPool[mCursor % matchPool.length];
      matcherBox.innerHTML = `
        <div style="font-size:0.82rem;font-weight:600;color:var(--ink-deep);">
          🎯 <strong>Date-Match Challenge:</strong> Tap the exact date for <span style="color:var(--rose-primary);">${cur.name}</span>:
        </div>
        <div class="tl-match-opts">
          ${cur.opts.map((o) => `<button type="button" class="mini-frost-btn tl-m-opt" data-o="${o}">${o}</button>`).join("")}
        </div>
      `;
      hydrate3DEmojis(matcherBox);
      matcherBox.querySelectorAll(".tl-m-opt").forEach((b) => {
        b.addEventListener("click", () => {
          if (b.dataset.o === cur.ans) {
            state.stampedTimelineChapters.add(cur.idx);
            addArcadeXp(8, `🕰️ Matched ${cur.ans}`);
            spawnCelebrationBurst(12);
            showToast(`✨ Correct! ${cur.name} (${cur.ans}) Stamped!`);
            mCursor++;
            renderTimeline();
            renderMiniMatcher();
          } else {
            b.style.background = "#ffe4e6";
            b.textContent = `${b.dataset.o} ✕`;
          }
        });
      });
    };
    renderMiniMatcher();

    document.querySelectorAll("#tlCapsulePresets .filter-pill").forEach((p) => {
      p.addEventListener("click", () => {
        if (titleInput) titleInput.value = p.dataset.cap || "";
        if (dateInput && !dateInput.value) dateInput.value = "Snowy Future Dream ✨";
      });
    });

    sealBtn?.addEventListener("click", () => {
      const t = (titleInput?.value || "").trim() || "First Snowy Night in a Rovaniemi Glass Igloo 🇫🇮❄️";
      const d = (dateInput?.value || "").trim() || "Our Next Chapter ✨";
      state.customTimelineCapsules.push({ title: t, date: d });
      try { localStorage.setItem("lovegpt-tl-capsules", JSON.stringify(state.customTimelineCapsules)); } catch (_) {}
      if (titleInput) titleInput.value = "";
      if (dateInput) dateInput.value = "";
      addArcadeXp(15, "🔮 Sealed Chapter #7");
      spawnCelebrationBurst(20);
      showToast("💌 Future Chapter Pinned onto Our Love Timeline! ❤️");
      renderTimeline();
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
    const previewWrap = document.getElementById("finlandPosterFrame") || previewImg?.parentElement;
    const auroraOverlay = document.getElementById("finlandAuroraOverlay");
    const fireGlow = document.getElementById("finlandFireGlow");
    const weatherChip = document.getElementById("finlandWeatherChip");
    const fireBtn = document.getElementById("iglooFireBtn");
    const snowBtn = document.getElementById("iglooSnowBtn");
    const auroraSl = document.getElementById("iglooAuroraSlider");
    const auroraLbl = document.getElementById("iglooAuroraLbl");

    let fireplaceOn = true;
    let heavySnow = false;
    let auroraPct = 75;

    const syncIglooAmbience = () => {
      if (auroraOverlay) auroraOverlay.style.opacity = String((auroraPct / 100) * 0.9);
      if (fireGlow) fireGlow.style.opacity = fireplaceOn ? "1" : "0";
      if (auroraLbl) {
        auroraLbl.textContent = `🌌 Aurora Sky: ${auroraPct}%`;
        hydrate3DEmojis(auroraLbl);
      }
      if (weatherChip) {
        const outTemp = heavySnow ? "-12°C Blizzard" : "-8°C Powder";
        const inTemp = fireplaceOn ? "🔥 +24°C Cozy" : "❄️ +14°C Crisp";
        weatherChip.textContent = `❄️ ${outTemp} • ${inTemp} • 🌌 Aurora ${auroraPct}%`;
        hydrate3DEmojis(weatherChip);
      }
    };

    fireBtn?.addEventListener("click", () => {
      fireplaceOn = !fireplaceOn;
      fireBtn.setAttribute("aria-pressed", String(fireplaceOn));
      fireBtn.textContent = fireplaceOn ? "🔥 Fireplace: Cozy On" : "🔥 Fireplace: Off";
      hydrate3DEmojis(fireBtn);
      syncIglooAmbience();
    });

    snowBtn?.addEventListener("click", () => {
      heavySnow = !heavySnow;
      snowBtn.setAttribute("aria-pressed", String(heavySnow));
      snowBtn.textContent = heavySnow ? "❄️ Snowfall: Blizzard" : "❄️ Snowfall: Powder";
      hydrate3DEmojis(snowBtn);
      if (heavySnow) spawnCelebrationBurst(14);
      syncIglooAmbience();
    });

    auroraSl?.addEventListener("input", () => {
      auroraPct = Number(auroraSl.value);
      syncIglooAmbience();
    });

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
    syncIglooAmbience();

    document.querySelectorAll("#finlandSpotTabs .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#finlandSpotTabs .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderSpot(Number(btn.dataset.spot), true);
      });
    });

    // Activity 1: Pack Our Finland Winter Suitcase (0/6 -> 100%)
    const suitcaseItems = [
      { id: "scarf", label: "🧣 Matching Wool Scarves" },
      { id: "coat", label: "❄️ Thermal Snow Parkas" },
      { id: "cam", label: "📸 Couple Polaroid Cam" },
      { id: "kitkat", label: "🍫 KitKat & MOMO Stash" },
      { id: "cocoa", label: "☕ Hot Berry Cocoa Flask" },
      { id: "rings", label: "💍 Forever Promise Rings" }
    ];
    const suitGrid = document.getElementById("suitcaseItemsGrid");
    const suitBadge = document.getElementById("suitcaseProgressBadge");
    const passBanner = document.getElementById("finlandBoardingPassBanner");

    const renderSuitcase = () => {
      if (!suitGrid) return;
      suitGrid.innerHTML = "";
      const cnt = state.packedSuitcaseItems.size;
      const pct = Math.round((cnt / suitcaseItems.length) * 100);
      if (suitBadge) {
        suitBadge.textContent = `Packed: ${cnt} / 6 (${pct}%) 🧳`;
        hydrate3DEmojis(suitBadge);
      }
      if (passBanner) {
        passBanner.hidden = cnt < 6;
        if (cnt >= 6) {
          passBanner.innerHTML = `✈️ <strong>100% Boarding Ready — Flight #LOVE-FINLAND Unlocked!</strong> Passengers: <strong>Arunava &amp; ${state.nameRevealed ? SECRET_FULL : "His Beloved Queen"}</strong> → Destination: <strong>Rovaniemi Glass Igloo #01 🇫🇮❄️❤️</strong>`;
          hydrate3DEmojis(passBanner);
        }
      }
      suitcaseItems.forEach((it) => {
        const packed = state.packedSuitcaseItems.has(it.id);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `suitcase-item-btn ${packed ? "packed" : ""}`;
        btn.innerHTML = `<span>${it.label}</span><span>${packed ? "✓ Packed" : "+ Pack"}</span>`;
        btn.addEventListener("click", () => {
          if (packed) state.packedSuitcaseItems.delete(it.id);
          else {
            state.packedSuitcaseItems.add(it.id);
            addArcadeXp(6, `🧳 Packed ${it.id}`);
            if (state.packedSuitcaseItems.size === 6) spawnCelebrationBurst(24);
          }
          renderSuitcase();
        });
        hydrate3DEmojis(btn);
        suitGrid.appendChild(btn);
      });
    };
    renderSuitcase();

    // Activity 2: Chef Arunava's Cozy Craving Kitchen
    document.querySelectorAll("#kitchenToppingTabs .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#kitchenToppingTabs .filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        state.selectedKitchenStyle = pill.dataset.kstyle || "with Love ❤️";
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
    const happyBar = document.getElementById("cravingHappinessBar");
    const orderBtn = document.getElementById("orderPlatterChatBtn");
    if (!grid) return;

    const refreshTray = () => {
      const pct = Math.min(100, state.servedTreats.length * 20);
      if (happyBar) happyBar.style.width = `${pct}%`;
      if (orderBtn) orderBtn.hidden = state.servedTreats.length === 0;
      if (!state.servedTreats.length) {
        trayBar.innerHTML = `<span class="tray-empty-hint">🍽️ Select a Prep Style above and tap “Serve onto Platter” on any favorite food below!</span>`;
        trayCounter.textContent = "Happiness: 0% • 0 Served ✨";
        hydrate3DEmojis(trayBar);
        hydrate3DEmojis(trayCounter);
        return;
      }
      trayBar.innerHTML = state.servedTreats.map((t) => `<span class="served-treat-chip">${t}</span>`).join("");
      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "mini-frost-btn";
      clearBtn.textContent = "🔄 Clear Platter";
      clearBtn.addEventListener("click", () => {
        state.servedTreats = [];
        refreshTray();
      });
      trayBar.appendChild(clearBtn);
      trayCounter.textContent = `Happiness: ${pct}% • ${state.servedTreats.length} Served ❤️`;
      hydrate3DEmojis(trayBar);
      hydrate3DEmojis(trayCounter);
    };

    orderBtn?.addEventListener("click", () => {
      if (state.servedTreats.length) {
        submitUserQuestion(`Chef Arunava, please serve my custom platter: ${state.servedTreats.slice(0, 4).join(", ")}!`);
      }
    });

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
        <button type="button" class="ghost-pill-btn serve-food-btn">${f.icon} Serve onto Platter</button>
      `;
      card.querySelector(".serve-food-btn").addEventListener("click", () => {
        state.servedTreats.push(`${f.icon} ${f.name} (${state.selectedKitchenStyle})`);
        addArcadeXp(8, `🍽️ Cooked ${f.name}`);
        refreshTray();
        spawnCelebrationBurst(12);
        showToast(`Served ${f.name} ${state.selectedKitchenStyle}! ❤️`);
      });
      hydrate3DEmojis(card);
      grid.appendChild(card);
    });

    // Mount Sia - Snowman (single-play) card & Sayanti's Favorite Song (Kinna Sona) showcase in Snow & Loved Things!
    const snowmanHost = document.getElementById("finlandSnowmanAudioHost");
    if (snowmanHost && FINLAND_SONG_SNOWMAN) {
      snowmanHost.innerHTML = "";
      snowmanHost.appendChild(buildRomanticAudioCard(FINLAND_SONG_SNOWMAN, false));
    }

    const favTabBtn = document.getElementById("playHerFavSongTabBtn");
    const favTabHost = document.getElementById("herFavSongTabAudioHost");
    favTabBtn?.addEventListener("click", () => {
      if (!favTabHost || !FAVORITE_SONG_KINNA_SONA) return;
      favTabHost.hidden = false;
      favTabHost.innerHTML = "";
      state.playedSongIds.add(FAVORITE_SONG_KINNA_SONA.id);
      state.lastPlayedAudioId = FAVORITE_SONG_KINNA_SONA.id;
      favTabHost.appendChild(buildRomanticAudioCard(FAVORITE_SONG_KINNA_SONA, true));
    });

    initSnowmanAndSnowwomanCouple();
    initTimelineInteractiveFeatures();
  }

  // ==================== INTERACTIVE LAPLAND SNOWMAN & SNOWWOMAN COUPLE PLAYGROUND ====================
  let sharedSfxAudioCtx = null;
  function playSanctuarySfx(kind = "meow", pitchMult = 1) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!sharedSfxAudioCtx) sharedSfxAudioCtx = new Ctx();
      if (sharedSfxAudioCtx.state === "suspended") sharedSfxAudioCtx.resume();
      const now = sharedSfxAudioCtx.currentTime;

      if (kind === "kiss") {
        // Sweet realistic "Mwah! 💋" lip-pop + loving rose chime!
        const popOsc = sharedSfxAudioCtx.createOscillator();
        const popGain = sharedSfxAudioCtx.createGain();
        popOsc.type = "sine";
        popOsc.frequency.setValueAtTime(720 * pitchMult, now);
        popOsc.frequency.exponentialRampToValueAtTime(240 * pitchMult, now + 0.085);
        popGain.gain.setValueAtTime(0.001, now);
        popGain.gain.linearRampToValueAtTime(0.11, now + 0.018);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
        popOsc.connect(popGain);
        popGain.connect(sharedSfxAudioCtx.destination);
        popOsc.start(now);
        popOsc.stop(now + 0.1);

        // Soft vocal "mwaaah~" + heart chime
        const mwahOsc = sharedSfxAudioCtx.createOscillator();
        const mwahGain = sharedSfxAudioCtx.createGain();
        mwahOsc.type = "triangle";
        mwahOsc.frequency.setValueAtTime(520 * pitchMult, now + 0.06);
        mwahOsc.frequency.exponentialRampToValueAtTime(780 * pitchMult, now + 0.16);
        mwahOsc.frequency.exponentialRampToValueAtTime(610 * pitchMult, now + 0.28);
        mwahGain.gain.setValueAtTime(0.001, now + 0.06);
        mwahGain.gain.linearRampToValueAtTime(0.065, now + 0.12);
        mwahGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        mwahOsc.connect(mwahGain);
        mwahGain.connect(sharedSfxAudioCtx.destination);
        mwahOsc.start(now + 0.06);
        mwahOsc.stop(now + 0.31);
      } else if (kind === "meow") {
        // Speaker-clear cute melodic kitten "Meee-oww~!"
        const osc1 = sharedSfxAudioCtx.createOscillator();
        const osc2 = sharedSfxAudioCtx.createOscillator();
        const gain = sharedSfxAudioCtx.createGain();
        osc1.type = "triangle";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(510 * pitchMult, now);
        osc1.frequency.exponentialRampToValueAtTime(910 * pitchMult, now + 0.11);
        osc1.frequency.exponentialRampToValueAtTime(660 * pitchMult, now + 0.25);
        osc1.frequency.exponentialRampToValueAtTime(440 * pitchMult, now + 0.38);
        osc2.frequency.setValueAtTime(1020 * pitchMult, now);
        osc2.frequency.exponentialRampToValueAtTime(1780 * pitchMult, now + 0.11);
        osc2.frequency.exponentialRampToValueAtTime(880 * pitchMult, now + 0.38);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.085, now + 0.055);
        gain.gain.exponentialRampToValueAtTime(0.055, now + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(sharedSfxAudioCtx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.41);
        osc2.stop(now + 0.41);
      } else if (kind === "meow_chorus") {
        playSanctuarySfx("meow", 1.0);
        setTimeout(() => playSanctuarySfx("meow", 1.18), 140);
        setTimeout(() => playSanctuarySfx("meow", 0.92), 280);
      } else if (kind === "sparkle") {
        const osc = sharedSfxAudioCtx.createOscillator();
        const gain = sharedSfxAudioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(1046, now + 0.15);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.055, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(sharedSfxAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.19);
      } else {
        // Warm audible purr-chirp (210-285 Hz so all phone & PC speakers play it clearly!)
        const osc = sharedSfxAudioCtx.createOscillator();
        const gain = sharedSfxAudioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(205, now);
        osc.frequency.linearRampToValueAtTime(280, now + 0.15);
        osc.frequency.linearRampToValueAtTime(190, now + 0.32);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.065, now + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
        osc.connect(gain);
        gain.connect(sharedSfxAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (_) {}
  }

  function initSnowmanAndSnowwomanCouple() {
    const canvas = document.getElementById("snowmanPlayCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const joyBadge = document.getElementById("snowmanJoyBadge");
    const noteEl = document.getElementById("snowmanWhisperNote");
    const movieBtn = document.getElementById("snowmanMovieBtn");
    const rebuildBtn = document.getElementById("snowmanRebuildBtn");
    const noseBtn = document.getElementById("snowmanNoseToggleBtn");
    const kissBtn = document.getElementById("snowmanKissBtn");
    const hugBtn = document.getElementById("snowmanHugBtn");
    const danceBtn = document.getElementById("snowmanDanceBtn");
    const roseBtn = document.getElementById("snowmanRoseBtn");
    const tossBtn = document.getElementById("snowmanTossBtn");
    const sceneDotBtns = [...document.querySelectorAll("#snowmanCinemaBar .scene-dot-btn")];

    const W = 840;
    const H = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let hatStyle = "royal";
    let scarfColor = "#e11d68";
    let heartNose = false;
    let joyPct = 96;
    let buildStage = 3;

    // Cinematic Visual Love Story Movie State (7 Visual Acts from First Day to Today — ZERO narrative text written on canvas!)
    const SCENE_DURATION_MS = 5200;
    const STORY_SCENES = [
      { id: 0, stamp: "16.10.2025", skyMode: "first_chat" },
      { id: 1, stamp: "25.10.2025", skyMode: "acceptance" },
      { id: 2, stamp: "24.02.2026", skyMode: "first_meet" },
      { id: 3, stamp: "04.2026", skyMode: "lanterns" },
      { id: 4, stamp: "03.07.2026", skyMode: "official_blue" },
      { id: 5, stamp: "SWEET DAYS", skyMode: "cozy_treats" },
      { id: 6, stamp: "TODAY • ∞", skyMode: "aurora_finale" }
    ];

    let moviePlaying = true;
    let movieSceneIdx = 0;
    let sceneStartTs = performance.now();

    // Interactive Mode State
    let actionState = "dance"; // "dance" | "kiss" | "cuddle" | "rose" | "iloveyou" | "stroll"
    let actionEndTs = performance.now() + 4200;
    let curSep = 155;
    let targetSep = 48;
    let stageCenterX = W / 2;
    let speechLeft = "Dancing in Finland's snow with you! ⛄❤️";
    let speechRight = "I love you forever, Arunava! 🥰❄️";

    const stars = Array.from({ length: 58 }, (_, i) => ({
      x: (i * 79 + 23) % W,
      y: 22 + ((i * 43) % 165),
      r: 0.8 + (i % 3) * 0.65,
      twinkle: i * 0.7
    }));
    const flakes = Array.from({ length: 68 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.4 + Math.random() * 2.8,
      vy: 0.55 + Math.random() * 1.1,
      vx: (Math.random() - 0.5) * 0.45
    }));
    const snowHearts = [];
    const snowballs = [];

    function syncSceneDotsUI() {
      sceneDotBtns.forEach((btn, idx) => {
        btn.classList.toggle("active", moviePlaying && idx === movieSceneIdx);
      });
      if (movieBtn) {
        movieBtn.textContent = moviePlaying ? "⏸ Story Movie Playing" : "🎬 Play Our Story Movie";
        hydrate3DEmojis(movieBtn);
      }
    }

    function startStoryMovie(fromScene = 0) {
      buildStage = 3;
      moviePlaying = true;
      movieSceneIdx = (fromScene + STORY_SCENES.length) % STORY_SCENES.length;
      sceneStartTs = performance.now();
      if (movieSceneIdx === 0) curSep = 185;
      syncSceneDotsUI();
      playSanctuarySfx("sparkle");
    }

    function emitSnowHearts(cx, cy, count = 9, includeKiss = false) {
      const syms = includeKiss ? ["💋", "❤️", "💖", "💕", "💘"] : ["❤️", "💖", "💕", "❄️", "✨"];
      for (let i = 0; i < count; i++) {
        snowHearts.push({
          x: cx + (Math.random() - 0.5) * 72,
          y: cy + (Math.random() - 0.5) * 28,
          vx: (Math.random() - 0.5) * 1.35,
          vy: -1.1 - Math.random() * 1.15,
          sym: syms[i % syms.length],
          size: 19 + (i % 3) * 4,
          life: 1.2
        });
      }
      if (snowHearts.length > 56) snowHearts.splice(0, snowHearts.length - 56);
    }

    function updateSnowJoy(boost = 2, note = "") {
      joyPct = Math.min(100, joyPct + boost);
      if (joyBadge) {
        joyBadge.textContent = `Snow Love: ${joyPct}% ⛄❤️`;
        hydrate3DEmojis(joyBadge);
      }
      if (note && noteEl) {
        noteEl.textContent = note;
        hydrate3DEmojis(noteEl);
      }
    }

    function triggerSnowCoupleAction(mode, playSfx = true) {
      moviePlaying = false;
      syncSceneDotsUI();
      buildStage = 3;
      actionState = mode;
      actionEndTs = performance.now() + (mode === "stroll" ? 3200 : 4200);
      if (mode === "kiss") {
        targetSep = 28;
        speechLeft = "Mwah! 💋 I love you, Sayanti! ❤️";
        speechRight = "Mwah! 💋 I love you too, Arunava! 🥰💖";
        emitSnowHearts(stageCenterX, 182, 14, true);
        if (playSfx) playSanctuarySfx("kiss", 1.0);
        updateSnowJoy(4, "💋 Mwah! Snowman Arunava & Snowwoman Sayanti shared a sweet romantic kiss and whispered “I love you” under the Lapland snow! ❤️❄️");
      } else if (mode === "cuddle") {
        targetSep = 31;
        speechLeft = "Holding my Queen warm & close! 🤗🤍";
        speechRight = "Safest place is in your arms! 💕⛄";
        emitSnowHearts(stageCenterX, 190, 11, false);
        if (playSfx) playSanctuarySfx("purr");
        updateSnowJoy(3, "🤗 Snowman Arunava & Snowwoman Sayanti are cuddling cheek-to-cheek — even -10°C snow feels warm together! 🤍❤️");
      } else if (mode === "dance") {
        targetSep = 48;
        speechLeft = "May I have this snowy waltz? 💃🎶";
        speechRight = "Dancing hand-in-hand forever! 🥰❄️";
        emitSnowHearts(stageCenterX, 188, 9, false);
        if (playSfx) playSanctuarySfx("sparkle");
        updateSnowJoy(3, "💃🎶 Dancing & twirling together under Finland's emerald Northern Lights! 🇫🇮⛄❤️");
      } else if (mode === "rose") {
        targetSep = 38;
        speechLeft = "A winter rose for my Queen! 🌹❤️";
        speechRight = "Aww! I love you so much! 🌹💋";
        emitSnowHearts(stageCenterX, 186, 12, true);
        if (playSfx) playSanctuarySfx("kiss", 1.06);
        updateSnowJoy(4, "🌹💋 Snowman Arunava gifted a crimson winter rose with a gentle kiss to Snowwoman Sayanti! ❤️");
      } else if (mode === "stroll") {
        targetSep = 115;
        speechLeft = "Walking through the snow to you! ⛄🐾";
        speechRight = "Coming to meet my Arunava! ❄️💓";
      } else {
        targetSep = 34;
        speechLeft = "You lit up my whole life! ✨❤️";
        speechRight = "Forever & always yours! 💍💖";
        emitSnowHearts(stageCenterX, 186, 10, false);
      }
    }

    movieBtn?.addEventListener("click", () => {
      if (moviePlaying) {
        triggerSnowCoupleAction("dance", true);
      } else {
        startStoryMovie(0);
      }
    });

    sceneDotBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.smscene || 0);
        startStoryMovie(idx);
      });
    });

    kissBtn?.addEventListener("click", () => triggerSnowCoupleAction("kiss", true));
    hugBtn?.addEventListener("click", () => triggerSnowCoupleAction("cuddle", true));
    danceBtn?.addEventListener("click", () => triggerSnowCoupleAction("dance", true));
    roseBtn?.addEventListener("click", () => triggerSnowCoupleAction("rose", true));

    tossBtn?.addEventListener("click", () => {
      const tx = stageCenterX + (Math.random() - 0.5) * 140;
      const ty = 225 + (Math.random() - 0.5) * 38;
      snowballs.push({ x: 80, y: H - 34, tx, ty, progress: 0 });
      playSanctuarySfx("sparkle");
      updateSnowJoy(2, "❄️ Playful snowball tossed! Watch Snowman Arunava & Snowwoman Sayanti catch it with love hearts! 😄❤️");
    });

    rebuildBtn?.addEventListener("click", () => {
      moviePlaying = false;
      syncSceneDotsUI();
      buildStage = 1;
      playSanctuarySfx("sparkle");
      updateSnowJoy(2, "⛄ Rolling fresh powdery Lapland snowballs...");
      setTimeout(() => { buildStage = 2; }, 420);
      setTimeout(() => {
        buildStage = 3;
        triggerSnowCoupleAction("kiss", true);
      }, 900);
    });

    noseBtn?.addEventListener("click", () => {
      heartNose = !heartNose;
      noseBtn.textContent = heartNose ? "❤️ Heart Nose" : "🥕 Carrot Nose";
      hydrate3DEmojis(noseBtn);
      emitSnowHearts(stageCenterX, 195, 7, false);
    });

    document.querySelectorAll("#snowmanHatTabs .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#snowmanHatTabs .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        hatStyle = btn.dataset.smhat || "royal";
        emitSnowHearts(stageCenterX, 180, 7, false);
      });
    });

    document.querySelectorAll("#snowmanScarfTabs [data-smscarf]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#snowmanScarfTabs [data-smscarf]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        scarfColor = btn.dataset.smscarf || "#e11d68";
        emitSnowHearts(stageCenterX, 200, 7, false);
      });
    });

    canvas.addEventListener("pointerdown", (e) => {
      const r = canvas.getBoundingClientRect();
      const px = ((e.clientX - r.left) / (r.width || W)) * W;
      const py = ((e.clientY - r.top) / (r.height || H)) * H;
      if (Math.abs(px - stageCenterX) < 165 && py > 110 && py < 365) {
        const nextAct = actionState === "kiss" ? "cuddle" : (actionState === "cuddle" ? "dance" : "kiss");
        triggerSnowCoupleAction(nextAct, true);
      } else {
        snowballs.push({ x: stageCenterX, y: H - 24, tx: px, ty: py, progress: 0 });
        playSanctuarySfx("sparkle");
      }
    });

    function drawVolumetricSnowSphere(cx, cy, rad, isWoman) {
      ctx.fillStyle = isWoman ? "rgba(219, 39, 119, 0.14)" : "rgba(15, 23, 42, 0.16)";
      ctx.beginPath();
      ctx.ellipse(cx + 2, cy + rad * 0.86, rad * 0.88, rad * 0.24, 0, 0, Math.PI * 2);
      ctx.fill();

      const g = ctx.createRadialGradient(
        cx - rad * 0.34,
        cy - rad * 0.36,
        rad * 0.08,
        cx + rad * 0.12,
        cy + rad * 0.14,
        rad * 1.06
      );
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.46, isWoman ? "#fff9fc" : "#f8fafc");
      g.addColorStop(0.78, isWoman ? "#fce7f3" : "#e2e8f0");
      g.addColorStop(0.94, isWoman ? "#f9a8d4" : "#94a3b8");
      g.addColorStop(1, isWoman ? "#f472b6" : "#64748b");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, rad - 1, -0.85 * Math.PI, -0.15 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
      ctx.beginPath();
      ctx.ellipse(cx - rad * 0.36, cy - rad * 0.38, rad * 0.22, rad * 0.12, -0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSnowPartner(x, baseY, isWoman, leanAngle, happyClosedEyes, t, customScarf = null, customHat = null, showNameTag = true) {
      ctx.save();
      ctx.translate(x, baseY);
      ctx.rotate(leanAngle);

      const useScarf = customScarf || (isWoman && scarfColor === "#e11d68" ? "#ec4899" : scarfColor);
      const useHat = customHat || hatStyle;

      const shGrad = ctx.createRadialGradient(0, 8, 4, 0, 8, 54);
      shGrad.addColorStop(0, "rgba(15, 23, 42, 0.28)");
      shGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
      ctx.fillStyle = shGrad;
      ctx.beginPath();
      ctx.ellipse(0, 8, 54, 13, 0, 0, Math.PI * 2);
      ctx.fill();

      // Base sphere
      drawVolumetricSnowSphere(0, -32, 41, isWoman);
      if (isWoman) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
        for (let sx = -32; sx <= 32; sx += 13) {
          ctx.beginPath();
          ctx.arc(sx, -4, 6.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (buildStage < 2) { ctx.restore(); return; }

      // Torso sphere
      drawVolumetricSnowSphere(0, -89, 30.5, isWoman);

      [-101, -87, -73].forEach((by) => {
        if (isWoman) {
          draw3DSpriteOrEmoji(ctx, "💖", 0, by, 11);
        } else {
          const bg = ctx.createRadialGradient(-1.5, by - 1.5, 0.5, 0, by, 4.2);
          bg.addColorStop(0, "#94a3b8");
          bg.addColorStop(0.5, "#1e293b");
          bg.addColorStop(1, "#020617");
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.arc(0, by, 4.1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Birch arms + plump winter mittens
      const wave = Math.sin(t * 4.2 + (isWoman ? 1.2 : 0)) * 11;
      const drawArmWithMitten = (sx, sy, ex, ey) => {
        ctx.strokeStyle = "#5c2d0c";
        ctx.lineWidth = 4.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo((sx + ex) / 2, Math.min(sy, ey) - 6, ex, ey);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(ex - (ex > sx ? 2 : -2), ey, 5.2, 0, Math.PI * 2);
        ctx.fill();

        const mg = ctx.createRadialGradient(ex - 2, ey - 2, 1, ex, ey, 7.5);
        mg.addColorStop(0, adjustHexColor(useScarf, 25));
        mg.addColorStop(1, adjustHexColor(useScarf, -18));
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(ex, ey, 6.8, 0, Math.PI * 2);
        ctx.fill();
      };

      const innerReach = Math.min(48, Math.max(26, curSep - 2));
      if (!isWoman) {
        drawArmWithMitten(-26, -92, -58, -112 + wave);
        drawArmWithMitten(25, -90, innerReach, -82);
      } else {
        drawArmWithMitten(-25, -90, -innerReach, -82);
        drawArmWithMitten(26, -92, 58, -112 - wave);
      }

      if (buildStage < 3) { ctx.restore(); return; }

      // Head sphere
      drawVolumetricSnowSphere(0, -137, 24, isWoman);

      // Ribbed Knit Scarf
      const scGrad = ctx.createLinearGradient(-22, -119, 22, -105);
      scGrad.addColorStop(0, adjustHexColor(useScarf, 20));
      scGrad.addColorStop(0.5, useScarf);
      scGrad.addColorStop(1, adjustHexColor(useScarf, -20));
      ctx.fillStyle = scGrad;
      ctx.beginPath();
      ctx.roundRect(-21.5, -117, 43, 11.5, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.38)";
      ctx.lineWidth = 1.3;
      for (let rx = -15; rx <= 15; rx += 6) {
        ctx.beginPath();
        ctx.moveTo(rx, -116);
        ctx.lineTo(rx, -106.5);
        ctx.stroke();
      }

      const tailX = isWoman ? -13 : 7;
      const tailSway = Math.sin(t * 3.2 + (isWoman ? 1 : 0)) * 3;
      ctx.fillStyle = scGrad;
      ctx.beginPath();
      ctx.roundRect(tailX + tailSway * 0.4, -111, 10.5, 27, 4.5);
      ctx.fill();
      draw3DSpriteOrEmoji(ctx, "❤️", tailX + 5.2 + tailSway * 0.4, -97, 9);

      // Face
      const faceDir = isWoman ? -1 : 1;
      const ex1 = -6.5 + faceDir * 2.5;
      const ex2 = 6.5 + faceDir * 2.5;
      const ey = -141;

      [ex1 - 6.5, ex2 + 6.5].forEach((bx) => {
        const bg = ctx.createRadialGradient(bx, ey + 7.5, 0.5, bx, ey + 7.5, 6.2);
        bg.addColorStop(0, "rgba(244, 63, 122, 0.65)");
        bg.addColorStop(1, "rgba(244, 63, 122, 0)");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(bx, ey + 7.5, 6.2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (happyClosedEyes) {
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        [ex1, ex2].forEach((ex) => {
          ctx.beginPath();
          ctx.arc(ex, ey + 1, 4.1, Math.PI * 1.1, -0.1 * Math.PI);
          ctx.stroke();
        });
      } else {
        [ex1, ex2].forEach((ex) => {
          const eg = ctx.createRadialGradient(ex - 1, ey - 1, 0.5, ex, ey, 4.1);
          eg.addColorStop(0, isWoman ? "#38bdf8" : "#475569");
          eg.addColorStop(0.55, "#0f172a");
          eg.addColorStop(1, "#020617");
          ctx.fillStyle = eg;
          ctx.beginPath();
          ctx.arc(ex, ey, 3.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath(); ctx.arc(ex - 1.2, ey - 1.3, 1.35, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ex + 1.1, ey + 1.1, 0.65, 0, Math.PI * 2); ctx.fill();
        });
      }

      if (isWoman) {
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ex1 - 3, ey - 2); ctx.lineTo(ex1 - 6.5, ey - 5);
        ctx.moveTo(ex2 + 3, ey - 2); ctx.lineTo(ex2 + 6.5, ey - 5);
        ctx.stroke();
      }

      if (heartNose) {
        draw3DSpriteOrEmoji(ctx, "❤️", faceDir * 4.5, -133, 13);
      } else {
        const cg = ctx.createLinearGradient(0, -137, 0, -130);
        cg.addColorStop(0, "#fdba74");
        cg.addColorStop(0.5, "#f97316");
        cg.addColorStop(1, "#c2410c");
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.moveTo(faceDir * 2, -136.5);
        ctx.lineTo(faceDir * 17, -133.5);
        ctx.lineTo(faceDir * 2, -130.5);
        ctx.closePath();
        ctx.fill();
      }

      if (curSep < 34 && happyClosedEyes) {
        ctx.fillStyle = "#e11d68";
        ctx.beginPath();
        ctx.arc(faceDir * 5.5, -127, 2.8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = isWoman ? "#be185d" : "#1e293b";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(faceDir * 2.5, -129, 6.2, 0.16 * Math.PI, 0.84 * Math.PI);
        ctx.stroke();
      }

      if (useHat === "royal") {
        if (!isWoman) {
          const hg = ctx.createLinearGradient(-16, -184, 16, -156);
          hg.addColorStop(0, "#475569");
          hg.addColorStop(0.4, "#1e293b");
          hg.addColorStop(1, "#0f172a");
          ctx.fillStyle = hg;
          ctx.beginPath(); ctx.roundRect(-14.5, -184, 29, 25, 4); ctx.fill();
          ctx.fillStyle = "#e11d68";
          ctx.fillRect(-14.5, -165, 29, 5);
          ctx.fillStyle = "#facc15";
          ctx.fillRect(-3.5, -165.5, 7, 6);
          ctx.fillStyle = "#0f172a";
          ctx.beginPath(); ctx.ellipse(0, -158, 22, 4.5, 0, 0, Math.PI * 2); ctx.fill();
        } else {
          draw3DSpriteOrEmoji(ctx, "👑", 0, -166, 28);
          draw3DSpriteOrEmoji(ctx, "🌸", 14, -153, 15);
        }
      } else if (useHat === "crowns") {
        draw3DSpriteOrEmoji(ctx, "👑", 0, -166, 28);
      } else if (useHat === "blossom") {
        if (!isWoman) {
          draw3DSpriteOrEmoji(ctx, "🤴", 0, -166, 26);
        } else {
          draw3DSpriteOrEmoji(ctx, "🌸", -10, -160, 17);
          draw3DSpriteOrEmoji(ctx, "👑", 0, -167, 25);
          draw3DSpriteOrEmoji(ctx, "🌸", 10, -160, 17);
        }
      } else {
        if (!isWoman) {
          const bg = ctx.createRadialGradient(-4, -168, 2, 0, -164, 20);
          bg.addColorStop(0, "#fb7185");
          bg.addColorStop(1, "#be123c");
          ctx.fillStyle = bg;
          ctx.beginPath(); ctx.arc(0, -156, 18, Math.PI, 0); ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath(); ctx.roundRect(-19, -160, 38, 6.5, 3.5); ctx.fill();
          ctx.beginPath(); ctx.arc(0, -176, 5.5, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.strokeStyle = "#f43f7a";
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(0, -140, 23, Math.PI * 1.05, -0.05 * Math.PI); ctx.stroke();
          ctx.fillStyle = "#fbcfe8";
          ctx.beginPath(); ctx.arc(-22, -138, 6.5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(22, -138, 6.5, 0, Math.PI * 2); ctx.fill();
          draw3DSpriteOrEmoji(ctx, "🎀", 0, -163, 24);
        }
      }

      if (showNameTag) {
        ctx.save();
        ctx.rotate(-leanAngle); // Keep name pill crisp & level even when leaning in for a kiss!
        ctx.font = "700 11.5px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const lbl = isWoman ? "Sayanti 👑" : "Arunava ❤️";
        const lw = ctx.measureText(lbl).width + 18;
        const spreadX = curSep < 56 ? (isWoman ? 22 : -22) : 0;
        ctx.fillStyle = isWoman ? "rgba(255, 240, 246, 0.96)" : "rgba(240, 249, 255, 0.96)";
        ctx.strokeStyle = isWoman ? "#f43f7a" : "#38bdf8";
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(spreadX - lw / 2, 13, lw, 20, 10); ctx.fill(); ctx.stroke();
        ctx.fillStyle = isWoman ? "#be185d" : "#0369a1";
        ctx.fillText(lbl, spreadX, 23);
        ctx.restore();
      }

      ctx.restore();
    }

    function drawLaplandStageEnvironment(t, skyMode = "aurora_finale") {
      // Dynamic mood sky per story scene!
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      if (skyMode === "first_meet") {
        // Warm golden-mustard spring sunlight for 24 Feb 2026 First Meet!
        sky.addColorStop(0, "#1d4ed8");
        sky.addColorStop(0.42, "#60a5fa");
        sky.addColorStop(0.74, "#fde68a");
        sky.addColorStop(1, "#fffbeb");
      } else if (skyMode === "lanterns") {
        sky.addColorStop(0, "#1e1b4b");
        sky.addColorStop(0.5, "#4c1d95");
        sky.addColorStop(0.82, "#fbbf24");
        sky.addColorStop(1, "#fef3c7");
      } else if (skyMode === "official_blue") {
        sky.addColorStop(0, "#0c1e3e");
        sky.addColorStop(0.5, "#1d4ed8");
        sky.addColorStop(0.82, "#93c5fd");
        sky.addColorStop(1, "#eff6ff");
      } else {
        sky.addColorStop(0, "#051026");
        sky.addColorStop(0.38, "#0d254c");
        sky.addColorStop(0.68, "#1e4b7a");
        sky.addColorStop(0.84, "#bae6fd");
        sky.addColorStop(1, "#ffffff");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      if (skyMode === "first_meet") {
        // Warm Golden Sun + Sunbeams for 24 Feb First Meet
        const sx = W / 2, sy = 88;
        const sunG = ctx.createRadialGradient(sx, sy, 8, sx, sy, 95);
        sunG.addColorStop(0, "rgba(254, 240, 138, 0.98)");
        sunG.addColorStop(0.4, "rgba(251, 191, 36, 0.42)");
        sunG.addColorStop(1, "rgba(251, 191, 36, 0)");
        ctx.fillStyle = sunG;
        ctx.beginPath(); ctx.arc(sx, sy, 95, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fef9c3";
        ctx.beginPath(); ctx.arc(sx, sy, 26, 0, Math.PI * 2); ctx.fill();
      } else {
        stars.forEach((s) => {
          const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.8 + s.twinkle));
          ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        });

        const mx = 720, my = 62;
        const mHalo = ctx.createRadialGradient(mx, my, 8, mx, my, 52);
        mHalo.addColorStop(0, "rgba(254, 249, 195, 0.95)");
        mHalo.addColorStop(0.35, "rgba(253, 224, 71, 0.32)");
        mHalo.addColorStop(1, "rgba(253, 224, 71, 0)");
        ctx.fillStyle = mHalo;
        ctx.beginPath(); ctx.arc(mx, my, 52, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fef9c3";
        ctx.beginPath(); ctx.arc(mx, my, 17, 0, Math.PI * 2); ctx.fill();
      }

      // Silky Aurora Curtains (prominent in Lapland Finale & Interactive Play)
      if (skyMode === "aurora_finale" || !moviePlaying) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        [
          { yBase: 68, amp: 18, col1: "rgba(16, 185, 129, 0)", col2: "rgba(52, 211, 153, 0.28)", col3: "rgba(56, 189, 248, 0.12)", speed: 1.3 },
          { yBase: 90, amp: 14, col1: "rgba(244, 63, 122, 0)", col2: "rgba(244, 63, 122, 0.24)", col3: "rgba(167, 139, 250, 0.14)", speed: -1.1 }
        ].forEach((band) => {
          for (let x = 20; x < W - 20; x += 6) {
            const waveY = band.yBase + Math.sin(x * 0.012 + t * band.speed) * band.amp + Math.cos(x * 0.025 - t) * 6;
            const h = 76 + Math.sin(x * 0.018 + t) * 18;
            const ag = ctx.createLinearGradient(x, waveY + h, x, waveY);
            ag.addColorStop(0, band.col1);
            ag.addColorStop(0.45, band.col2);
            ag.addColorStop(1, band.col3);
            ctx.fillStyle = ag;
            ctx.fillRect(x - 5, waveY, 11, h);
          }
        });
        ctx.restore();
      }

      // Distant Snow-Capped Mountains
      const drawMountain = (peakX, peakY, baseW, darkCol, lightCol) => {
        ctx.fillStyle = darkCol;
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(peakX - baseW / 2, 305);
        ctx.lineTo(peakX + baseW / 2, 305);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = lightCol;
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(peakX + baseW * 0.05, 305);
        ctx.lineTo(peakX + baseW / 2, 305);
        ctx.closePath();
        ctx.fill();
      };
      drawMountain(175, 168, 320, "#1e3a5f", "#335c85");
      drawMountain(665, 162, 330, "#1e3a5f", "#3b6998");
      drawMountain(420, 182, 300, "#172e4d", "#294d73");

      // Midground Snow Hills
      const hillGrad = ctx.createLinearGradient(0, 265, 0, 345);
      hillGrad.addColorStop(0, skyMode === "first_meet" ? "#fef3c7" : "#e0f2fe");
      hillGrad.addColorStop(1, skyMode === "first_meet" ? "#fde68a" : "#bae6fd");
      ctx.fillStyle = hillGrad;
      ctx.beginPath();
      ctx.ellipse(215, 315, 285, 52, 0, 0, Math.PI * 2);
      ctx.ellipse(635, 315, 285, 54, 0, 0, Math.PI * 2);
      ctx.fill();

      // Left Rovaniemi Glass Igloo Dome
      const igX = 118, igY = 296, igR = 44;
      const spill = ctx.createRadialGradient(igX, igY + 4, 4, igX, igY + 8, 66);
      spill.addColorStop(0, "rgba(251, 191, 36, 0.48)");
      spill.addColorStop(1, "rgba(251, 191, 36, 0)");
      ctx.fillStyle = spill;
      ctx.beginPath(); ctx.ellipse(igX, igY + 8, 66, 17, 0, 0, Math.PI * 2); ctx.fill();

      const igGrad = ctx.createRadialGradient(igX - 10, igY - 14, 4, igX, igY, igR);
      igGrad.addColorStop(0, "#fef08a");
      igGrad.addColorStop(0.55, "#f59e0b");
      igGrad.addColorStop(1, "#78350f");
      ctx.fillStyle = igGrad;
      ctx.beginPath(); ctx.arc(igX, igY, igR, Math.PI, 0); ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.82)";
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(igX, igY, igR, Math.PI, 0); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(igX, igY, igR * 0.5, igR, 0, Math.PI, 0); ctx.stroke();

      // Right Cozy Family Timber Chalet with Glowing Windows & Chimney Smoke
      const cbX = W - 122, cbY = 296;
      ctx.fillStyle = "#7c2d12";
      ctx.beginPath(); ctx.roundRect(cbX - 36, cbY - 36, 72, 36, 4); ctx.fill();
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(cbX - 24, cbY - 24, 17, 15);
      ctx.fillRect(cbX + 7, cbY - 24, 17, 15);
      ctx.fillStyle = "#f8fafc";
      ctx.strokeStyle = "#bae6fd";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cbX - 46, cbY - 34);
      ctx.lineTo(cbX, cbY - 66);
      ctx.lineTo(cbX + 46, cbY - 34);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Layered Spruce Pines
      const drawPine = (px, py, sc) => {
        for (let tier = 0; tier < 3; tier++) {
          const ty = py - tier * 21 * sc;
          const tw = (29 - tier * 5) * sc;
          const th = 31 * sc;
          ctx.fillStyle = tier % 2 === 0 ? "#14532d" : "#166534";
          ctx.beginPath();
          ctx.moveTo(px, ty - th);
          ctx.lineTo(px - tw, ty);
          ctx.lineTo(px + tw, ty);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#f0f9ff";
          ctx.beginPath();
          ctx.moveTo(px, ty - th);
          ctx.lineTo(px - tw * 0.58, ty - th * 0.42);
          ctx.quadraticCurveTo(px, ty - th * 0.25, px + tw * 0.58, ty - th * 0.42);
          ctx.closePath();
          ctx.fill();
        }
      };
      drawPine(52, 308, 1.05);
      drawPine(184, 304, 0.86);
      drawPine(W - 52, 308, 1.05);
      drawPine(W - 188, 304, 0.86);

      // Foreground Snow Stage
      const stageGrad = ctx.createLinearGradient(0, 300, 0, H);
      stageGrad.addColorStop(0, "#ffffff");
      stageGrad.addColorStop(0.55, "#f0f9ff");
      stageGrad.addColorStop(1, "#dbeafe");
      ctx.fillStyle = stageGrad;
      ctx.beginPath();
      ctx.ellipse(W / 2, 362, W * 0.64, 72, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(0, 320, W, H - 320);

      // Fairy-Light Garland Archway
      const postL = 218, postR = W - 218, postTop = 122, postBot = 326;
      [postL, postR].forEach((lx) => {
        ctx.fillStyle = "#5c2d0c";
        ctx.fillRect(lx - 3.5, postTop, 7, postBot - postTop);
        const lg = ctx.createRadialGradient(lx, postTop, 2, lx, postTop, 22);
        lg.addColorStop(0, "rgba(254, 240, 138, 0.95)");
        lg.addColorStop(1, "rgba(254, 240, 138, 0)");
        ctx.fillStyle = lg;
        ctx.beginPath(); ctx.arc(lx, postTop, 22, 0, Math.PI * 2); ctx.fill();
      });
      ctx.strokeStyle = "rgba(255, 255, 255, 0.48)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(postL, postTop);
      ctx.quadraticCurveTo(W / 2, postTop + 36, postR, postTop);
      ctx.stroke();

      for (let i = 1; i < 11; i++) {
        const u = i / 11;
        const bx = postL + (postR - postL) * u;
        const by = (1 - u) * (1 - u) * postTop + 2 * (1 - u) * u * (postTop + 36) + u * u * postTop;
        const pulse = 0.65 + 0.35 * Math.sin(t * 4 + i);
        ctx.fillStyle = i % 2 === 0 ? `rgba(254, 240, 138, ${pulse})` : `rgba(251, 113, 133, ${pulse})`;
        ctx.beginPath();
        ctx.arc(bx, by + 3, 3.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Purely Visual Storytelling Props & Effects for the 7 Cinematic Story Scenes (NO written story sentences!)
    function renderVisualStorySceneProps(sceneId, prog, t, leftX, rightX, baseY) {
      if (sceneId === 0) {
        // ACT I (16.10.2025 — First Chat): Glowing golden phone cards in mittens + flying glowing chat envelopes & hearts arcing across the sky!
        [leftX + 36, rightX - 36].forEach((px) => {
          const glow = ctx.createRadialGradient(px, baseY - 90, 2, px, baseY - 90, 24);
          glow.addColorStop(0, "rgba(254, 240, 138, 0.95)");
          glow.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(px, baseY - 90, 24, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#fef9c3";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.roundRect(px - 6, baseY - 99, 12, 18, 3); ctx.fill(); ctx.stroke();
        });

        // 3 flying glowing message arcs between Arunava & Sayanti
        for (let m = 0; m < 3; m++) {
          const mp = (prog * 2.4 + m * 0.33) % 1;
          const dir = m % 2 === 0;
          const sx = dir ? leftX + 36 : rightX - 36;
          const ex = dir ? rightX - 36 : leftX + 36;
          const mx = sx + (ex - sx) * mp;
          const my = (baseY - 92) - Math.sin(mp * Math.PI) * 86;

          ctx.strokeStyle = "rgba(253, 224, 71, 0.35)";
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(leftX + 36, baseY - 92);
          ctx.quadraticCurveTo(W / 2, baseY - 178, rightX - 36, baseY - 92);
          ctx.stroke();
          ctx.setLineDash([]);

          draw3DSpriteOrEmoji(ctx, mp > 0.5 ? "❤️" : "✨", mx, my, 20);
        }
      } else if (sceneId === 1) {
        // ACT II (25.10.2025 — Acceptance): Starry Heart Constellation in the sky + Golden Ring & Twin Soul Ribbon!
        ctx.save();
        ctx.strokeStyle = "rgba(253, 224, 71, 0.65)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.25) {
          const hx = W / 2 + 16 * Math.pow(Math.sin(a), 3) * 2.4;
          const hy = 86 - (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * 2.1;
          if (a === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
          ctx.fillStyle = "#fef08a";
          ctx.fillRect(hx - 1.5, hy - 1.5, 3, 3);
        }
        ctx.stroke();
        ctx.restore();

        // Glowing golden promise ring floating between their joined hands
        const ringY = baseY - 96 + Math.sin(t * 4) * 4;
        const rg = ctx.createRadialGradient(W / 2, ringY, 2, W / 2, ringY, 34);
        rg.addColorStop(0, "rgba(253, 224, 71, 0.85)");
        rg.addColorStop(1, "rgba(244, 63, 122, 0)");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(W / 2, ringY, 34, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.arc(W / 2, ringY + 4, 10, 0, Math.PI * 2); ctx.stroke();
        draw3DSpriteOrEmoji(ctx, "💖", W / 2, ringY - 8, 18);
      } else if (sceneId === 2) {
        // ACT III (24.02.2026 — First Meet): Blooming golden-mustard flowers along the snow & drifting golden petals!
        for (let fx = 165; fx <= W - 165; fx += 38) {
          const grow = Math.min(1, 0.65 + prog * 0.8);
          const stemH = 22 * grow;
          const fy = baseY + 8;
          ctx.strokeStyle = "#16a34a";
          ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy - stemH); ctx.stroke();
          ctx.fillStyle = "#facc15";
          for (let p = 0; p < 5; p++) {
            const pa = (p * Math.PI * 2) / 5 + t;
            ctx.beginPath();
            ctx.arc(fx + Math.cos(pa) * 5.2, fy - stemH + Math.sin(pa) * 5.2, 3.8 * grow, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = "#ea580c";
          ctx.beginPath(); ctx.arc(fx, fy - stemH, 2.6 * grow, 0, Math.PI * 2); ctx.fill();
        }
      } else if (sceneId === 3) {
        // ACT IV (07 & 19 Apr 2026 — Both Families' Blessings): Floating golden sky lanterns rising from both family homes & uniting overhead!
        for (let l = 0; l < 12; l++) {
          const lp = (prog * 1.15 + (l * 0.08)) % 1;
          const fromLeft = l % 2 === 0;
          const startX = fromLeft ? 120 : W - 122;
          const lx = startX + (W / 2 - startX) * lp + Math.sin(t * 2 + l) * 14;
          const ly = 285 - lp * 225;
          const lg = ctx.createRadialGradient(lx, ly, 2, lx, ly, 18);
          lg.addColorStop(0, "rgba(254, 240, 138, 0.95)");
          lg.addColorStop(0.5, "rgba(251, 146, 60, 0.5)");
          lg.addColorStop(1, "rgba(251, 146, 60, 0)");
          ctx.fillStyle = lg;
          ctx.beginPath(); ctx.arc(lx, ly, 18, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#fde047";
          ctx.beginPath(); ctx.roundRect(lx - 5, ly - 7, 10, 13, 3); ctx.fill();
        }
      } else if (sceneId === 4) {
        // ACT V (03.07.2026 — Official Meeting in Matching Blues): Glowing celebration sparkles & camera portrait frame!
        const flashAlpha = Math.max(0, Math.sin(prog * Math.PI * 4) * 0.22);
        if (flashAlpha > 0.02) {
          ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
          ctx.fillRect(0, 0, W, H);
        }
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.78)";
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 6]);
        ctx.beginPath();
        ctx.roundRect(W / 2 - 125, 132, 250, 218, 18);
        ctx.stroke();
        ctx.restore();
        draw3DSpriteOrEmoji(ctx, "👑", W / 2, 128, 26);
      } else if (sceneId === 5) {
        // ACT VI (Sweet Cravings & Playful Kitten): Cozy snow picnic table with MOMOs, Ice Cream, KitKat + hopping white kitten!
        const tblX = W / 2 - 125, tblY = baseY - 18;
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#bae6fd";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(tblX - 34, tblY, 68, 24, 8); ctx.fill(); ctx.stroke();
        draw3DSpriteOrEmoji(ctx, "🥟", tblX - 18, tblY - 8, 20);
        draw3DSpriteOrEmoji(ctx, "🍨", tblX + 2, tblY - 10, 20);
        draw3DSpriteOrEmoji(ctx, "🍫", tblX + 21, tblY - 8, 19);

        // Cute playful chibi snow-kitten hopping beside Snowwoman Sayanti!
        const kx = rightX + 68 + Math.sin(t * 3.2) * 12;
        const ky = baseY + 2 - Math.abs(Math.sin(t * 5.5)) * 10;
        ctx.strokeStyle = "#f472b6";
        ctx.lineWidth = 3.2;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(kx + 11, ky + 2); ctx.quadraticCurveTo(kx + 22, ky - 8, kx + 18, ky - 16); ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#f472b6";
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.ellipse(kx, ky, 14, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(kx - 12, ky - 15); ctx.lineTo(kx - 14, ky - 26); ctx.lineTo(kx - 5, ky - 18); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(kx + 1, ky - 18); ctx.lineTo(kx + 9, ky - 26); ctx.lineTo(kx + 8, ky - 15); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(kx - 2, ky - 10, 10.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#0f172a";
        ctx.beginPath(); ctx.arc(kx - 6, ky - 11, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(kx + 2, ky - 11, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fb7185";
        ctx.beginPath(); ctx.arc(kx - 2, ky - 8, 1.6, 0, Math.PI * 2); ctx.fill();
        draw3DSpriteOrEmoji(ctx, "❤️", kx - 2, ky - 31, 14);
      }
    }

    function renderSnowmanLoop(now) {
      requestAnimationFrame(renderSnowmanLoop);
      const favSec = document.getElementById("view-favorites");
      if (!favSec || !favSec.classList.contains("active")) return;

      const curMs = now || performance.now();
      const t = curMs * 0.001;
      ctx.clearRect(0, 0, W, H);

      let activeSkyMode = "aurora_finale";
      let sceneProg = 0;
      let overrideScarfAru = null;
      let overrideScarfSay = null;
      let overrideHat = null;
      let bounceL = 0, bounceR = 0, leanL = 0.04, leanR = -0.04, closedEyes = false;

      if (moviePlaying) {
        const elapsed = curMs - sceneStartTs;
        if (elapsed >= SCENE_DURATION_MS) {
          movieSceneIdx = (movieSceneIdx + 1) % STORY_SCENES.length;
          sceneStartTs = curMs;
          syncSceneDotsUI();
          if (movieSceneIdx === 6) {
            emitSnowHearts(W / 2, 185, 14, true);
          }
        }
        sceneProg = Math.min(1, (curMs - sceneStartTs) / SCENE_DURATION_MS);
        const sc = STORY_SCENES[movieSceneIdx];
        activeSkyMode = sc.skyMode;

        // Visual choreography per scene!
        if (movieSceneIdx === 0) {
          // Scene I: Apart on opposite snowy hills exchanging glowing first messages
          targetSep = 195;
          stageCenterX = W / 2;
          bounceL = -Math.abs(Math.sin(t * 4.5)) * 7;
          bounceR = -Math.abs(Math.cos(t * 4.5)) * 7;
        } else if (movieSceneIdx === 1) {
          // Scene II: Stepping closer for Acceptance under the starry heart constellation
          targetSep = 72;
          stageCenterX = W / 2;
          leanL = 0.08;
          leanR = -0.08;
          bounceR = -Math.abs(Math.sin(t * 4.2)) * 8;
        } else if (movieSceneIdx === 2) {
          // Scene III: 24 Feb First Meet — walking down golden blossom path to hold hands!
          targetSep = 165 - sceneProg * 125;
          stageCenterX = W / 2;
          overrideScarfAru = "#f8fafc"; // Crisp white!
          overrideScarfSay = "#eab308"; // Golden mustard floral!
          overrideHat = "blossom";
          bounceL = sceneProg < 0.75 ? -Math.abs(Math.sin(t * 5.5)) * 6 : 0;
          bounceR = sceneProg < 0.75 ? -Math.abs(Math.cos(t * 5.5)) * 6 : 0;
          if (sceneProg > 0.78) closedEyes = true;
        } else if (movieSceneIdx === 3) {
          // Scene IV: April Family Lanterns — standing hand-in-hand watching golden lanterns rise
          targetSep = 40;
          stageCenterX = W / 2;
          leanL = 0.06;
          leanR = -0.06;
        } else if (movieSceneIdx === 4) {
          // Scene V: 03 July Official Meeting — Matching Shades of Royal Blue!
          targetSep = 36;
          stageCenterX = W / 2;
          overrideScarfAru = "#0284c7";
          overrideScarfSay = "#38bdf8";
          overrideHat = "crowns";
          leanL = 0.07;
          leanR = -0.07;
        } else if (movieSceneIdx === 5) {
          // Scene VI: Cozy Cravings, Rose Gift & Snow Kitten
          targetSep = 35;
          stageCenterX = W / 2 + 12;
          leanL = 0.09;
          leanR = -0.08;
          bounceR = -Math.abs(Math.sin(t * 4)) * 6;
        } else {
          // Scene VII: Today & Forever — Lapland Aurora Waltz -> Romantic Kiss!
          if (sceneProg < 0.55) {
            targetSep = 46;
            stageCenterX = W / 2 + Math.sin(t * 2.4) * 34;
            bounceL = -Math.abs(Math.sin(t * 4)) * 11;
            bounceR = -Math.abs(Math.cos(t * 4)) * 11;
            leanL = Math.sin(t * 4) * 0.08;
            leanR = Math.sin(t * 4) * 0.08;
          } else {
            targetSep = 27;
            stageCenterX = W / 2;
            leanL = 0.14;
            leanR = -0.14;
            closedEyes = true;
          }
        }
      } else {
        // Interactive Play Mode!
        if (curMs >= actionEndTs) {
          const seq = ["dance", "kiss", "cuddle", "stroll", "kiss", "iloveyou", "rose"];
          const next = seq[(seq.indexOf(actionState) + 1) % seq.length];
          triggerSnowCoupleAction(next, false);
        }
        if (actionState === "stroll" && actionEndTs - curMs < 1500) {
          targetSep = 32;
        }
        stageCenterX = W / 2 + (actionState === "dance" ? Math.sin(t * 2.2) * 32 : 0);

        if (actionState === "kiss") {
          leanL = 0.14; leanR = -0.14; closedEyes = true;
        } else if (actionState === "cuddle") {
          leanL = 0.09 + Math.sin(t * 2.4) * 0.03;
          leanR = -0.09 + Math.sin(t * 2.4) * 0.03;
          closedEyes = true;
        } else if (actionState === "dance") {
          bounceL = -Math.abs(Math.sin(t * 3.8)) * 12;
          bounceR = -Math.abs(Math.cos(t * 3.8)) * 12;
          leanL = Math.sin(t * 3.8) * 0.08;
          leanR = Math.sin(t * 3.8) * 0.08;
        } else if (actionState === "rose") {
          leanL = 0.08; leanR = -0.06;
          bounceR = -Math.abs(Math.sin(t * 4.5)) * 8;
        } else if (actionState === "stroll") {
          bounceL = -Math.abs(Math.sin(t * 5.2)) * 7;
          bounceR = -Math.abs(Math.cos(t * 5.2)) * 7;
        }
      }

      curSep += (targetSep - curSep) * 0.085;

      drawLaplandStageEnvironment(t, activeSkyMode);

      if (Math.random() < 0.075) {
        emitSnowHearts(stageCenterX, 195, 1, (!moviePlaying && actionState === "kiss") || (moviePlaying && movieSceneIdx === 6 && sceneProg > 0.55));
      }

      const leftX = stageCenterX - curSep;
      const rightX = stageCenterX + curSep;
      const baseY = 342;

      // Glowing Couple Warmth Aura
      if (curSep < 95) {
        const aura = ctx.createRadialGradient(stageCenterX, baseY - 82, 12, stageCenterX, baseY - 82, 135);
        aura.addColorStop(0, "rgba(244, 63, 122, 0.28)");
        aura.addColorStop(0.6, "rgba(56, 189, 248, 0.12)");
        aura.addColorStop(1, "rgba(244, 63, 122, 0)");
        ctx.fillStyle = aura;
        ctx.beginPath(); ctx.arc(stageCenterX, baseY - 82, 135, 0, Math.PI * 2); ctx.fill();
      }

      if (moviePlaying) {
        renderVisualStorySceneProps(movieSceneIdx, sceneProg, t, leftX, rightX, baseY);
      }

      drawSnowPartner(leftX, baseY + bounceL, false, leanL, closedEyes, t, overrideScarfAru, overrideHat, !moviePlaying);
      drawSnowPartner(rightX, baseY + bounceR, true, leanR, closedEyes, t, overrideScarfSay, overrideHat, !moviePlaying);

      // Center Visual Emblems & Clean Wrapped Speech Callouts (ONLY in Interactive Play Mode — ZERO written story text in Movie Mode!)
      if (buildStage === 3) {
        if (moviePlaying) {
          if (movieSceneIdx === 5) {
            draw3DSpriteOrEmoji(ctx, "🌹", stageCenterX, baseY - 96 + Math.sin(t * 5) * 3, 25);
          } else if (movieSceneIdx === 6 && sceneProg > 0.55) {
            draw3DSpriteOrEmoji(ctx, "💋", stageCenterX, baseY - 142 + Math.sin(t * 6) * 3, 27);
          } else if (curSep < 65) {
            draw3DSpriteOrEmoji(ctx, "❤️", stageCenterX, baseY - 92 + Math.sin(t * 4) * 3, 23);
          }
        } else {
          if (actionState === "kiss") {
            draw3DSpriteOrEmoji(ctx, "💋", stageCenterX, baseY - 142 + Math.sin(t * 6) * 3, 27);
          } else if (actionState === "rose") {
            draw3DSpriteOrEmoji(ctx, "🌹", stageCenterX, baseY - 96 + Math.sin(t * 5) * 3, 26);
          } else {
            draw3DSpriteOrEmoji(ctx, "❤️", stageCenterX, baseY - 92 + Math.sin(t * 4) * 3, 24);
          }
          if (actionState === "dance") {
            draw3DSpriteOrEmoji(ctx, "🎶", stageCenterX + Math.sin(t * 3.8) * 28, baseY - 196, 22);
          }

          // Clean, wrapped, zero-collision speech callouts!
          drawPairSpeechCallouts(
            ctx,
            W,
            H,
            { x: leftX, y: baseY - 172 + bounceL, text: speechLeft, color: "#0284c7" },
            { x: rightX, y: baseY - 172 + bounceR, text: speechRight, color: "#e11d68" }
          );
        }
      }

      // Flying Snowballs
      for (let i = snowballs.length - 1; i >= 0; i--) {
        const sb = snowballs[i];
        sb.progress += 0.045;
        const p = sb.progress;
        const curX = sb.x + (sb.tx - sb.x) * p;
        const curY = sb.y + (sb.ty - sb.y) * p - Math.sin(p * Math.PI) * 95;
        drawVolumetricSnowSphere(curX, curY, 9.5, false);
        if (p >= 1) {
          emitSnowHearts(sb.tx, sb.ty, 8, false);
          snowballs.splice(i, 1);
        }
      }

      // Rising Hearts
      for (let i = snowHearts.length - 1; i >= 0; i--) {
        const h = snowHearts[i];
        h.x += h.vx;
        h.y += h.vy;
        h.life -= 0.017;
        if (h.life <= 0) { snowHearts.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, h.life));
        draw3DSpriteOrEmoji(ctx, h.sym, h.x, h.y, h.size || 20);
        ctx.restore();
      }

      // Falling Snowflakes
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      flakes.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;
        if (f.y > H) { f.y = -5; f.x = Math.random() * W; }
        if (f.x < 0) f.x = W;
        if (f.x > W) f.x = 0;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      });

      // Sleek Cinema Widescreen Letterbox Framing & 7-Chapter Visual Progress Bar (ZERO words written on canvas during Story Movie!)
      if (moviePlaying) {
        ctx.fillStyle = "rgba(5, 12, 28, 0.82)";
        ctx.fillRect(0, 0, W, 22);
        ctx.fillRect(0, H - 24, W, 24);

        const barX = 48;
        const barW = W - 96;
        const barY = H - 12;
        const totalProg = (movieSceneIdx + sceneProg) / STORY_SCENES.length;

        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.beginPath();
        ctx.roundRect(barX, barY - 2, barW, 4, 2);
        ctx.fill();

        const pg = ctx.createLinearGradient(barX, 0, barX + barW, 0);
        pg.addColorStop(0, "#38bdf8");
        pg.addColorStop(0.5, "#f43f7a");
        pg.addColorStop(1, "#facc15");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.roundRect(barX, barY - 2, barW * totalProg, 4, 2);
        ctx.fill();

        for (let s = 0; s < STORY_SCENES.length; s++) {
          const gx = barX + (barW * (s + 0.5)) / STORY_SCENES.length;
          const reached = s <= movieSceneIdx;
          const active = s === movieSceneIdx;
          ctx.fillStyle = active ? "#facc15" : reached ? "#f43f7a" : "rgba(255, 255, 255, 0.35)";
          ctx.beginPath();
          ctx.arc(gx, barY, active ? 4.8 : 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    syncSceneDotsUI();
    requestAnimationFrame(renderSnowmanLoop);
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
        if (tab.id === "jumpToCatHavenFromArcadeBtn") {
          switchView("cathaven");
          return;
        }
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

      // Nordic Twilight Winter Sky + Distant Snow Mountains & Lantern Cottages
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#0f294a");
      sky.addColorStop(0.48, "#1e4b7a");
      sky.addColorStop(0.82, "#bae6fd");
      sky.addColorStop(1, "#f0f9ff");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Soft Aurora Shimmer Ribbon across the top
      const aurG = ctx.createLinearGradient(0, 18, 0, 105);
      aurG.addColorStop(0, "rgba(52, 211, 153, 0)");
      aurG.addColorStop(0.5, "rgba(52, 211, 153, 0.22)");
      aurG.addColorStop(1, "rgba(244, 63, 122, 0)");
      ctx.fillStyle = aurG;
      ctx.fillRect(0, 18, W, 90);

      // Distant Mountain Peaks & Pine Silhouettes
      ctx.fillStyle = "rgba(15, 23, 42, 0.28)";
      ctx.beginPath();
      ctx.moveTo(0, H - 45);
      ctx.lineTo(130, H - 135);
      ctx.lineTo(275, H - 55);
      ctx.lineTo(440, H - 145);
      ctx.lineTo(610, H - 60);
      ctx.lineTo(760, H - 125);
      ctx.lineTo(W, H - 45);
      ctx.closePath();
      ctx.fill();

      // Ambient falling snow
      ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
      for (const f of bgFlakes) {
        f.y += f.vy * k;
        if (f.y > H) { f.y = -4; f.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sculpted Snowy Ground Bank
      const groundG = ctx.createLinearGradient(0, H - 46, 0, H);
      groundG.addColorStop(0, "#ffffff");
      groundG.addColorStop(1, "#dbeafe");
      ctx.fillStyle = groundG;
      ctx.beginPath();
      ctx.ellipse(W * 0.26, H + 8, 275, 44, 0, 0, Math.PI * 2);
      ctx.ellipse(W * 0.74, H + 8, 285, 46, 0, 0, Math.PI * 2);
      ctx.fill();

      // Smooth basket interpolation
      basketX += (targetBasketX - basketX) * (1 - Math.pow(0.72, k));
      if (magnetFrames > 0) magnetFrames = Math.max(0, magnetFrames - k);

      if (magnetFrames > 0 && stateMode === "playing") {
        ctx.strokeStyle = "rgba(250, 204, 21, 0.65)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(basketX, H - 30, 68 + Math.sin(magnetFrames * 0.2) * 5, Math.PI, 0);
        ctx.stroke();
      }

      // Plush Velvet & Gold-Trimmed Love Basket
      const bx = basketX - 58;
      const by = H - 46;
      const bw = 116;
      const bh = 30;
      ctx.fillStyle = "rgba(15, 23, 42, 0.22)";
      ctx.beginPath(); ctx.ellipse(basketX, H - 12, 54, 7, 0, 0, Math.PI * 2); ctx.fill();

      const bGrad = ctx.createLinearGradient(bx, by, bx, by + bh);
      bGrad.addColorStop(0, "#fb7185");
      bGrad.addColorStop(0.5, "#e11d68");
      bGrad.addColorStop(1, "#881337");
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 15);
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#fde68a";
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "700 12px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(streak >= 3 ? `🔥 ${streak}x STREAK` : "❤️ LOVE BASKET", basketX, by + bh / 2);

      if (stateMode === "ready" || stateMode === "gameover") {
        const fs = Math.min(1.85, Math.max(1, 540 / (canvas.clientWidth || W)));
        const compact = fs > 1.3;
        const cardW = Math.min(W - 40, 440 * (compact ? 1.4 : 1));
        const cardH = 124 * (compact ? 1.65 : 1);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.beginPath();
        ctx.roundRect(W / 2 - cardW / 2, H / 2 - cardH / 2 - 8, cardW, cardH, 20);
        ctx.fill();
        ctx.strokeStyle = "rgba(225, 29, 104, 0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        const gap = 28 * (compact ? fs * 0.85 : 1);
        ctx.fillStyle = "#181826";
        ctx.font = `700 ${Math.round(21 * fs)}px 'Cormorant Garamond', serif`;
        ctx.fillText(
          stateMode === "gameover" ? `Score: ${score} pts` : "🥟 Treat Rush",
          W / 2,
          H / 2 - gap - 8
        );
        ctx.fillStyle = "#475069";
        ctx.font = `500 ${Math.round(13 * fs)}px 'Inter', sans-serif`;
        ctx.fillText(compact ? "Catch treats • Dodge 🧊 ice" : "Catch MOMOs, Ice Cream, KitKats & Stars • Dodge Ice!", W / 2, H / 2 - 8);
        ctx.fillStyle = "#e11d68";
        ctx.font = `700 ${Math.round(13.5 * fs)}px 'Inter', sans-serif`;
        ctx.fillText(compact ? "▶ Tap to play" : "▶ Tap Here or 'Start Rush' to Play", W / 2, H / 2 + gap - 8);

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

      // Floating score popups with crisp halo
      pops = pops.filter((p) => {
        p.y -= 1.1 * k;
        p.life -= 0.032 * k;
        if (p.life <= 0) return false;
        drawCrispFloatingText(ctx, p.txt, p.x, p.y, p.col, p.life, 13.5);
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
      grad.addColorStop(0, "rgba(224, 242, 254, 0.96)");
      grad.addColorStop(0.5, "rgba(255, 241, 246, 0.96)");
      grad.addColorStop(1, "rgba(186, 230, 253, 0.96)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Delicate frosted ice crystal sparkles across the pane
      ctx.strokeStyle = "rgba(255, 255, 255, 0.78)";
      ctx.lineWidth = 1.6;
      [
        [68, 58, 22], [canvas.width - 68, 58, 22],
        [68, canvas.height - 58, 22], [canvas.width - 68, canvas.height - 58, 22],
        [canvas.width / 2, 54, 16], [canvas.width / 2, canvas.height - 54, 16]
      ].forEach(([sx, sy, sr]) => {
        for (let b = 0; b < 6; b++) {
          const ang = (b * Math.PI) / 3;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + Math.cos(ang) * sr, sy + Math.sin(ang) * sr);
          ctx.stroke();
        }
      });

      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.roundRect(canvas.width / 2 - 175, canvas.height / 2 - 24, 350, 48, 24);
      ctx.fill();
      ctx.fillStyle = "#1e293b";
      ctx.font = "600 19px 'Cormorant Garamond', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("❄️ Wipe the winter frost to unveil", canvas.width / 2, canvas.height / 2);
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

  // Item #4A: Rebuilt Physics Carnival Date Wheel (Preset Decks + Custom Slices + Power Lever + Flick-Spin + Checklist!)
  function initGame4DateWheel() {
    const canvas = document.getElementById("dateWheelCanvas");
    const ctx = canvas.getContext("2d");
    const pointerEl = document.getElementById("wheelPointerClapper");
    const resText = document.getElementById("wheelResultText");
    const spinsBadge = document.getElementById("wheelSpinsBadge");
    const powerSlider = document.getElementById("wheelPowerSlider");
    const powerLbl = document.getElementById("wheelPowerLabel");
    const addInput = document.getElementById("customWheelSliceInput");
    const addBtn = document.getElementById("addWheelSliceBtn");
    const sendChatBtn = document.getElementById("sendWheelToChatBtn");
    const checklistCard = document.getElementById("wheelChecklistBox");

    const WHEEL_DECKS = {
      classic: [
        { label: "🥟 MOMO Feast", full: "Piping-hot MOMO platter + spicy chutney & undivided evening talks! 🥟❤️", color: "#ffe4ef" },
        { label: "🍨 Ice Cream", full: "Late-evening frosty Ice Cream walk hand-in-hand under fairy lights! 🍨✨", color: "#e0f2fe" },
        { label: "🇫🇮 Igloo Plan", full: "Cozy night picking our Rovaniemi Glass Igloo & sleigh itinerary! 🇫🇮🌌", color: "#ede9fe" },
        { label: "🍫 KitKat Film", full: "Blanket movie marathon + unlimited crispy KitKat bars! 🍫🎬", color: "#fce7f3" },
        { label: "🌶️ Music Drive", full: "Sunset drive with Kurkure, Chips & our 10 romantic melodies! 🌶️🎶", color: "#dbeafe" },
        { label: "🕯️ Cafe Table", full: "Candlelight corner table for two + endless laughter & photos! 🕯️💑", color: "#fef3c7" },
        { label: "🌙 Starry Walk", full: "Quiet moonlit stroll holding hands & sharing warm cocoa! 🌙☕", color: "#dcfce7" },
        { label: "👑 Queen's Wish", full: "Royal Jackpot: Any date wish you name is 100% granted by Arunava! 👑❤️", color: "#fde68a" }
      ],
      foodie: [
        { label: "🥟 Steam MOMO", full: "Double basket of steaming hot MOMOs with fiery red chutney! 🥟🔥", color: "#ffe4e6" },
        { label: "🍨 3-Scoop Tub", full: "Triple-scoop velvety Ice Cream date even in chilly weather! 🍨❄️", color: "#e0f2fe" },
        { label: "🍫 KitKat Box", full: "Giant KitKat treasure box — Arunava gives you both halves! 🍫💖", color: "#fce7f3" },
        { label: "🌶️ Kurkure Mix", full: "Chatpata Kurkure chaat bowl + late-night comedy movie! 🌶️🎬", color: "#ffedd5" },
        { label: "🥔 Golden Chips", full: "Crunchy Chips & frothy cafe coffee picnic together! 🥔☕", color: "#fef9c3" },
        { label: "🍽️ All-5 Feast", full: "Grand Royal Platter: MOMO + Ice Cream + KitKat + Kurkure + Chips! 👑🍽️", color: "#ede9fe" }
      ],
      dream: [
        { label: "🛖 Glass Igloo", full: "Waking up under snowy pine trees inside a Lapland Glass Igloo! 🛖❄️", color: "#e0f2fe" },
        { label: "🌌 Aurora Sky", full: "Midnight Northern Lights watch wrapped in matching wool scarves! 🌌🇫🇮", color: "#ede9fe" },
        { label: "🦌 Sleigh Ride", full: "Snowy reindeer & husky trail ride across Rovaniemi! 🦌❄️", color: "#dbeafe" },
        { label: "🏡 Ocean Villa", full: "Sunset evening on the terrace of our dream oceanfront home! 🏡🌊", color: "#ffe4ef" },
        { label: "👑 Palace Waltz", full: "Dressing up royally for a chandelier ballroom evening together! 👑✨", color: "#fef3c7" },
        { label: "📸 Photo Shoot", full: "Recreating our 24 Feb First Meet smiles at golden hour! 📸🌹", color: "#fce7f3" }
      ]
    };

    let activeSlices = [...WHEEL_DECKS.classic];
    let angleRad = 0;
    let angVel = 0;
    let spinning = false;
    let spinCount = 0;
    let lastChosenDate = "";
    let lastPegIdx = -1;

    function drawWheel() {
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2, r = W / 2 - 18;
      const arc = (Math.PI * 2) / activeSlices.length;
      ctx.clearRect(0, 0, W, H);

      // Outer Royal Rose-Gold Bezel with 24 Pearl Marquee Lights!
      const rimG = ctx.createLinearGradient(0, 0, W, H);
      rimG.addColorStop(0, "#fb7185");
      rimG.addColorStop(0.5, "#e11d68");
      rimG.addColorStop(1, "#7c3aed");
      ctx.fillStyle = rimG;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 13, 0, Math.PI * 2);
      ctx.fill();

      for (let b = 0; b < 24; b++) {
        const ba = (b * Math.PI * 2) / 24;
        const lx = cx + Math.cos(ba) * (r + 7);
        const ly = cy + Math.sin(ba) * (r + 7);
        ctx.fillStyle = b % 2 === 0 ? "#fef9c3" : "#ffffff";
        ctx.beginPath();
        ctx.arc(lx, ly, 2.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angleRad);

      activeSlices.forEach((s, i) => {
        const startA = i * arc - Math.PI / 2;
        const endA = (i + 1) * arc - Math.PI / 2;
        const sg = ctx.createRadialGradient(0, 0, 22, 0, 0, r);
        sg.addColorStop(0, "#ffffff");
        sg.addColorStop(1, s.color);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, r, startA, endA);
        ctx.closePath();
        ctx.fillStyle = sg;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Rim peg jewel
        const pegX = Math.cos(startA) * (r - 5);
        const pegY = Math.sin(startA) * (r - 5);
        ctx.beginPath();
        ctx.arc(pegX, pegY, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = "#e11d68";
        ctx.fill();

        // Crisp Slice Label
        ctx.save();
        ctx.rotate(startA + arc / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#181826";
        ctx.font = "700 12px 'Inter', sans-serif";
        ctx.fillText(s.label, r - 15, 0);
        ctx.restore();
      });

      // Faceted Ruby-Gold Center Medallion
      const hubG = ctx.createRadialGradient(-5, -5, 2, 0, 0, 27);
      hubG.addColorStop(0, "#ffffff");
      hubG.addColorStop(0.7, "#fff1f6");
      hubG.addColorStop(1, "#fbcfe8");
      ctx.beginPath();
      ctx.arc(0, 0, 27, 0, Math.PI * 2);
      ctx.fillStyle = hubG;
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#e11d68";
      ctx.stroke();
      draw3DSpriteOrEmoji(ctx, "❤️", 0, 0, 22);

      ctx.restore();
    }
    drawWheel();

    function stepWheelPhysics() {
      if (!spinning) return;
      angleRad += angVel;
      angVel *= 0.984;

      const arc = (Math.PI * 2) / activeSlices.length;
      const norm = ((Math.PI * 2) - (angleRad % (Math.PI * 2))) % (Math.PI * 2);
      const pegIdx = Math.floor(norm / arc);
      if (pegIdx !== lastPegIdx) {
        lastPegIdx = pegIdx;
        if (pointerEl) {
          pointerEl.classList.add("ticking");
          setTimeout(() => pointerEl.classList.remove("ticking"), 65);
        }
      }

      drawWheel();

      if (angVel > 0.0022) {
        requestAnimationFrame(stepWheelPhysics);
      } else {
        spinning = false;
        angVel = 0;
        const winIdx = Math.floor(norm / arc) % activeSlices.length;
        const winner = activeSlices[winIdx];
        lastChosenDate = winner.full;
        spinCount++;
        if (spinsBadge) {
          spinsBadge.textContent = `Spins: ${spinCount} 🎡`;
          hydrate3DEmojis(spinsBadge);
        }
        resText.textContent = enforceNameLock(`✨ Destiny Landed On: ${winner.full}`);
        hydrate3DEmojis(resText);
        if (sendChatBtn) sendChatBtn.hidden = false;
        document.querySelectorAll(".wheel-prep-cb").forEach((cb) => { cb.checked = false; });
        updatePrepChecklistHeader();
        addArcadeXp(15, `🎡 Won ${winner.label}`);
        spawnCelebrationBurst(20);
      }
    }

    function launchSpin(customBoost = null) {
      if (spinning) return;
      const pwr = customBoost || (Number(powerSlider?.value || 65) / 100);
      angVel = 0.24 + pwr * 0.34 + Math.random() * 0.08;
      spinning = true;
      requestAnimationFrame(stepWheelPhysics);
    }

    powerSlider?.addEventListener("input", () => {
      const v = Number(powerSlider.value);
      const mood = v < 45 ? "Gentle Breeze" : v < 80 ? "Romantic Swirl" : "Turbo Destiny";
      if (powerLbl) powerLbl.textContent = `${mood} (${v}%)`;
    });

    document.getElementById("spinWheelBtn").addEventListener("click", () => launchSpin());
    canvas.addEventListener("pointerdown", () => launchSpin());

    document.querySelectorAll("#wheelPresetTabs .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (spinning) return;
        document.querySelectorAll("#wheelPresetTabs .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeSlices = [...(WHEEL_DECKS[btn.dataset.wdeck] || WHEEL_DECKS.classic)];
        angleRad = 0;
        drawWheel();
      });
    });

    addBtn?.addEventListener("click", () => {
      const val = (addInput?.value || "").trim();
      if (!val || spinning) return;
      const palette = ["#ffe4ef", "#e0f2fe", "#ede9fe", "#fef3c7", "#dcfce7"];
      activeSlices.push({
        label: `✨ ${val.slice(0, 13)}`,
        full: `Custom Wish Date: ${val} — 100% promised by Arunava! ❤️✨`,
        color: palette[activeSlices.length % palette.length]
      });
      if (activeSlices.length > 10) activeSlices.shift();
      addInput.value = "";
      drawWheel();
      showToast("Added your custom date slice to the wheel! 🎡❤️");
    });

    function updatePrepChecklistHeader() {
      const cbs = [...document.querySelectorAll(".wheel-prep-cb")];
      const done = cbs.filter((c) => c.checked).length;
      const tag = checklistCard?.querySelector(".mini-frost-tag");
      if (tag) {
        tag.textContent = done === 3 ? "📋 Date Checklist: 3/3 Ready 🎉" : `📋 Date Checklist (${done}/3 Ready)`;
      }
      if (done === 3) {
        addArcadeXp(10, "📋 Date Checklist 100%");
        spawnCelebrationBurst(14);
      }
    }
    document.querySelectorAll(".wheel-prep-cb").forEach((cb) => cb.addEventListener("change", updatePrepChecklistHeader));

    sendChatBtn?.addEventListener("click", () => {
      if (lastChosenDate) {
        submitUserQuestion(`Our Date Wheel picked: "${lastChosenDate}" — let's plan it together!`);
      }
    });
  }

  // Item #4B: Rebuilt Enchanted 3D Miniature World Snow Globe (4 Scenes + Music-Box Key + Touch Hearts + Wish Capsule!)
  function initGame5SnowGlobe() {
    const canvas = document.getElementById("snowGlobeCanvas");
    const ctx = canvas.getContext("2d");
    const fortuneEl = document.getElementById("globeFortuneText");
    const goldBtn = document.getElementById("globeGoldModeBtn");
    const windSl = document.getElementById("globeWindSlider");
    const windPct = document.getElementById("globeWindPct");
    const wishInput = document.getElementById("globeWishInput");
    const dropWishBtn = document.getElementById("dropGlobeWishBtn");
    const plaqueEl = document.getElementById("globePedestalPlaque");

    let flurryMode = 0; // 0 = Arctic Snow, 1 = Rose Stardust, 2 = Aurora Gems
    let sceneIdx = 0;   // 0 = Lapland Igloo, 1 = First Meet Garden, 2 = Cozy MOMO Cafe, 3 = Starlit Palace
    let windGlow = 0.4;
    let boost = 1;
    let swirlX = 0;
    let floatingHearts = [];

    const fortunes = [
      "🔮 Thousands of peaceful winter mornings and warm cups of cocoa await both of you side-by-side! ❄️❤️",
      "🔮 Beneath Finland's emerald Northern Lights, every wish whispered together shines for eternity! 🇫🇮🌌",
      "🔮 Endless laughter, family harmony, and unconditional love surround every decade ahead! ✨💍",
      "🔮 Every steaming plate of MOMOs and every evening walk will only deepen your bond! 🥟💖"
    ];
    let fIdx = 0;

    const pts = Array.from({ length: 95 }, () => ({
      x: 20 + Math.random() * 300,
      y: 20 + Math.random() * 300,
      r: 1.6 + Math.random() * 3.4,
      vx: -0.45 + Math.random() * 0.9,
      vy: 0.45 + Math.random() * 1.15
    }));

    document.querySelectorAll("#globeSceneTabs .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#globeSceneTabs .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        sceneIdx = Number(btn.dataset.gscene || 0);
        const titles = [
          "❄️ Rovaniemi Glass Igloo • Arunava & His Queen",
          "🌼 24 Feb 2026 First Meet • Eternal Blossoms",
          "🥟 Cozy Lantern MOMO Cafe • Table For Two",
          "👑 Starlit Royal Palace • Forever Devotion"
        ];
        if (plaqueEl) {
          plaqueEl.textContent = enforceNameLock(titles[sceneIdx]);
          hydrate3DEmojis(plaqueEl);
        }
        boost = Math.max(boost, 3.2);
      });
    });

    windSl?.addEventListener("input", () => {
      const v = Number(windSl.value);
      windGlow = v / 100;
      if (windPct) {
        windPct.textContent = v >= 98 ? "Glow: 100% 🎶✨" : `Glow: ${v}% ✨`;
        hydrate3DEmojis(windPct);
      }
      if (v >= 98 && floatingHearts.length < 12) {
        floatingHearts.push({ x: 170, y: 245, vy: 1.3, life: 1, sym: "🎶" });
        addArcadeXp(10, "🗝️ Wound Snow Globe 100%");
      }
    });

    goldBtn?.addEventListener("click", () => {
      flurryMode = (flurryMode + 1) % 3;
      const labels = ["✨ Flurry: Arctic Snow", "🌹 Flurry: Rose Stardust", "🌌 Flurry: Aurora Gems"];
      goldBtn.textContent = labels[flurryMode];
      hydrate3DEmojis(goldBtn);
    });

    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      swirlX = ((e.clientX - r.left) / (r.width || 340) - 0.5) * 3.6;
      boost = Math.max(boost, 2.5);
    });

    canvas.addEventListener("pointerdown", (e) => {
      const r = canvas.getBoundingClientRect();
      const px = ((e.clientX - r.left) / (r.width || 340)) * 340;
      const py = ((e.clientY - r.top) / (r.height || 340)) * 340;
      for (let i = 0; i < 3; i++) {
        floatingHearts.push({
          x: px + (Math.random() - 0.5) * 24,
          y: py,
          vy: 0.9 + Math.random() * 0.7,
          life: 1,
          sym: i === 0 ? "❤️" : "✨"
        });
      }
      boost = Math.max(boost, 4.2);
    });

    dropWishBtn?.addEventListener("click", () => {
      const w = (wishInput?.value || "").trim() || "Eternal happiness & snowy Finland together";
      if (wishInput) wishInput.value = "";
      for (let i = 0; i < 6; i++) {
        floatingHearts.push({ x: 110 + Math.random() * 120, y: 250, vy: 1.1 + Math.random() * 0.6, life: 1, sym: i % 2 === 0 ? "💫" : "❤️" });
      }
      boost = 5.4;
      fortuneEl.textContent = enforceNameLock(`💫 Wish Sealed Inside Crystal Dome: "${w}" — Arunava holds this promise with you! ❤️❄️`);
      addArcadeXp(12, "💫 Sealed Globe Wish");
      hydrate3DEmojis(fortuneEl);
      spawnCelebrationBurst(18);
    });

    function drawDiorama(W, H, now) {
      const t = now * 0.002;
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      if (sceneIdx === 1) {
        sky.addColorStop(0, "#60a5fa"); sky.addColorStop(0.6, "#fef08a"); sky.addColorStop(1, "#fde68a");
      } else {
        sky.addColorStop(0, "#07132c"); sky.addColorStop(0.58, "#1e3a5f"); sky.addColorStop(1, "#3b1d5e");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      if (windGlow > 0.08 && sceneIdx !== 1) {
        for (let x = 26; x < W - 26; x += 14) {
          const ay = 74 + Math.sin(x * 0.03 + t) * 16;
          const ah = 38 + windGlow * 68;
          const ag = ctx.createLinearGradient(x, ay + ah, x, ay);
          ag.addColorStop(0, "rgba(16,185,129,0)");
          ag.addColorStop(0.5, `rgba(52,211,153,${0.14 + windGlow * 0.36})`);
          ag.addColorStop(1, `rgba(244,63,122,${0.1 + windGlow * 0.28})`);
          ctx.fillStyle = ag;
          ctx.fillRect(x - 7, ay, 14, ah);
        }
      }

      // Sculpted ground mound inside crystal sphere
      const gnd = ctx.createLinearGradient(0, H - 86, 0, H);
      gnd.addColorStop(0, sceneIdx === 1 ? "#fef9c3" : "#ffffff");
      gnd.addColorStop(1, sceneIdx === 1 ? "#fde047" : "#dbeafe");
      ctx.fillStyle = gnd;
      ctx.beginPath();
      ctx.ellipse(W / 2, H - 26, 162, 58, 0, Math.PI, 0, true);
      ctx.fill();
      ctx.fillRect(0, H - 72, W, 80);

      if (sceneIdx === 0) {
        const drawTree = (tx, ty, s) => {
          ctx.fillStyle = "#14532d";
          ctx.beginPath(); ctx.moveTo(tx, ty - 46 * s); ctx.lineTo(tx - 19 * s, ty); ctx.lineTo(tx + 19 * s, ty); ctx.fill();
          ctx.fillStyle = "#f0f9ff";
          ctx.beginPath(); ctx.moveTo(tx, ty - 46 * s); ctx.lineTo(tx - 10 * s, ty - 24 * s); ctx.lineTo(tx + 10 * s, ty - 24 * s); ctx.fill();
        };
        drawTree(74, H - 66, 1.12);
        drawTree(266, H - 66, 1.15);

        const igG = ctx.createRadialGradient(W / 2, H - 82, 6, W / 2, H - 64, 48);
        igG.addColorStop(0, `rgba(254, 249, 195, ${0.7 + windGlow * 0.3})`);
        igG.addColorStop(1, `rgba(245, 158, 11, ${0.55 + windGlow * 0.4})`);
        ctx.fillStyle = igG;
        ctx.beginPath(); ctx.arc(W / 2, H - 64, 46, Math.PI, 0); ctx.fill();
        ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.arc(W / 2, H - 64, 46, Math.PI, 0); ctx.stroke();
      } else if (sceneIdx === 1) {
        ctx.fillStyle = `rgba(250, 204, 21, ${0.7 + windGlow * 0.3})`;
        ctx.beginPath(); ctx.arc(W / 2, 82, 30, 0, Math.PI * 2); ctx.fill();
        for (let bx = 52; bx <= 288; bx += 24) {
          ctx.fillStyle = "#eab308";
          ctx.beginPath(); ctx.arc(bx, H - 68 + Math.sin(bx) * 5, 7.5, 0, Math.PI * 2); ctx.fill();
        }
      } else if (sceneIdx === 2) {
        ctx.fillStyle = "#9f1239";
        ctx.beginPath(); ctx.roundRect(W / 2 - 50, H - 120, 100, 56, 6); ctx.fill();
        ctx.fillStyle = "#f43f5e";
        ctx.beginPath(); ctx.moveTo(W / 2 - 60, H - 118); ctx.lineTo(W / 2, H - 154); ctx.lineTo(W / 2 + 60, H - 118); ctx.fill();
        ctx.fillStyle = `rgba(254, 240, 138, ${0.55 + windGlow * 0.45})`;
        ctx.fillRect(W / 2 - 34, H - 104, 24, 22);
        ctx.fillRect(W / 2 + 10, H - 104, 24, 22);
      } else {
        ctx.fillStyle = "#fbcfe8";
        ctx.fillRect(W / 2 - 46, H - 122, 92, 58);
        ctx.fillRect(W / 2 - 16, H - 162, 32, 98);
        ctx.fillStyle = "#f43f5e";
        ctx.beginPath(); ctx.moveTo(W / 2 - 22, H - 162); ctx.lineTo(W / 2, H - 196); ctx.lineTo(W / 2 + 22, H - 162); ctx.fill();
      }

      // Miniature Couple Holding Hands in the Center of the Crystal World!
      const cy = H - 62;
      ctx.fillStyle = "#1e293b";
      ctx.beginPath(); ctx.arc(W / 2 - 9, cy - 22, 5.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(W / 2 - 14, cy - 16, 10, 18, 4); ctx.fill();
      ctx.fillStyle = "#e11d68";
      ctx.beginPath(); ctx.arc(W / 2 + 9, cy - 20, 5.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(W / 2 + 9, cy - 15);
      ctx.lineTo(W / 2 + 2, cy + 2);
      ctx.lineTo(W / 2 + 17, cy + 2);
      ctx.closePath();
      ctx.fill();

      draw3DSpriteOrEmoji(ctx, "❤️", W / 2, cy - 36 + Math.sin(t * 2.5) * 3, 22);

      // Ornate Rose-Gold Inner Pedestal Rim at Bottom of Sphere
      const baseG = ctx.createLinearGradient(0, H - 34, 0, H);
      baseG.addColorStop(0, "#f43f7a");
      baseG.addColorStop(0.5, "#881337");
      baseG.addColorStop(1, "#4c0519");
      ctx.fillStyle = baseG;
      ctx.fillRect(0, H - 32, W, 34);
      ctx.strokeStyle = "#fde68a";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(20, H - 32); ctx.lineTo(W - 20, H - 32); ctx.stroke();
    }

    function drawGlobeLoop(now) {
      requestAnimationFrame(drawGlobeLoop);
      if (!isOnScreen(canvas)) return;
      const W = canvas.width, H = canvas.height;
      ctx.save();
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, W / 2 - 2, 0, Math.PI * 2);
      ctx.clip();

      drawDiorama(W, H, now || performance.now());

      // Snow / Stardust / Aurora Gems particles
      pts.forEach((p, idx) => {
        p.x += (p.vx + swirlX * 0.45) * boost;
        p.y += p.vy * boost;
        if (p.y > H - 18) { p.y = 12; p.x = 24 + Math.random() * (W - 48); }
        if (p.x > W - 12) p.x = 14;
        if (p.x < 12) p.x = W - 14;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (flurryMode === 1) {
          ctx.fillStyle = idx % 2 === 0 ? "rgba(244,63,122,0.88)" : "rgba(250,204,21,0.92)";
        } else if (flurryMode === 2) {
          ctx.fillStyle = idx % 2 === 0 ? "rgba(52,211,153,0.9)" : "rgba(167,139,250,0.9)";
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.92)";
        }
        ctx.fill();
      });

      // Rising interactive tap hearts & music notes
      floatingHearts = floatingHearts.filter((h) => {
        h.y -= h.vy;
        h.life -= 0.016;
        if (h.life <= 0) return false;
        ctx.globalAlpha = Math.max(0, h.life);
        ctx.font = "18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(h.sym, h.x, h.y);
        ctx.globalAlpha = 1;
        return true;
      });

      // Glass highlight crescent
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, W / 2 - 18, Math.PI * 1.12, Math.PI * 1.48);
      ctx.stroke();

      ctx.restore();
      if (boost > 1) boost = Math.max(1, boost * 0.985);
      swirlX *= 0.96;
    }
    requestAnimationFrame(drawGlobeLoop);

    const shake = () => {
      boost = 5.8;
      fortuneEl.textContent = enforceNameLock(fortunes[fIdx++ % fortunes.length]);
      addArcadeXp(10, "🔮 Shook Snow Globe");
      hydrate3DEmojis(fortuneEl);
      spawnCelebrationBurst(16);
    };
    document.getElementById("shakeGlobeBtn").addEventListener("click", shake);
  }

  // Item #5: EXPANDED 60-Question Non-Repeating Story & "What She Likes to Eat" Trivia + Category Tabs + 50/50 Lifeline!
  function initGame6StoryQuiz() {
    const body = document.getElementById("quizBody");
    const badge = document.getElementById("quizProgressBadge");
    const streakBadge = document.getElementById("quizStreakBadge");
    const hintBtn = document.getElementById("quizHintBtn");
    const shuffleBtn = document.getElementById("shuffleQuizBtn");

    const QUESTION_POOL_60 = [
      // --- CATEGORY: FOOD — WHAT SHE LOVES TO EAT (24 Rich Questions!) ---
      { cat: "food", q: "Which piping-hot steamed dumpling sits at #1 on what she loves to eat?", correct: "Steaming Hot MOMO 🥟", wrong: ["Sushi Rolls", "Tacos", "Garlic Bread"], note: "Piping-hot MOMOs are her undisputed #1 evening craving! 🥟❤️" },
      { cat: "food", q: "What fiery side accompaniment makes her plate of hot MOMOs 10x better?", correct: "Spicy Red Chutney 🌶️", wrong: ["Maple Syrup", "Plain Butter", "Peanut Jam"], note: "Steaming MOMOs + fiery red chutney = pure instant happiness! 😋" },
      { cat: "food", q: "Which frosty sweet dessert does she adore eating even in chilly winter weather?", correct: "Creamy Ice Cream 🍨", wrong: ["Fruit Cake", "Oatmeal", "Lemon Tart"], note: "No winter chill can ever stop an Ice Cream craving! 🍨❄️" },
      { cat: "food", q: "Which crispy chocolate-covered wafer bar is her go-to sweet break?", correct: "Crispy KitKat 🍫", wrong: ["Licorice Stick", "Mint Gum", "Raisin Bar"], note: "Snap a KitKat in two — and Arunava hands both halves straight to her! 🍫❤️" },
      { cat: "food", q: "When Arunava snaps a KitKat bar in half, how many halves does she get?", correct: "Both Halves (100% Hers!) 🥰", wrong: ["Zero Halves", "Only the Wrapper", "Quarter Piece"], note: "Husband rule #1: both KitKat halves belong to her! 🍫💖" },
      { cat: "food", q: "Which bold, tangy, crunchy snack makes every movie night and road trip livelier?", correct: "Chatpata Kurkure 🌶️", wrong: ["Plain Rice Cakes", "Celery Sticks", "Boiled Corn"], note: "Chatpata Kurkure brings unbeatable crunch to every hangout! 🌶️" },
      { cat: "food", q: "Which light, golden, crispy snack completes her famous Top-5 Favorite Treats?", correct: "Golden Crispy Chips 🥔", wrong: ["Dry Pretzels", "Bran Biscuits", "Pita Bread"], note: "MOMO, Ice Cream, KitKat, Kurkure & Crispy Chips complete the royal 5! 🥔✨" },
      { cat: "food", q: "Which of these is NOT one of her 5 canonical favorite foods & snacks?", correct: "Bitter Gourd Soup 🥣", wrong: ["Steaming MOMO 🥟", "Crispy KitKat 🍫", "Kurkure 🌶️"], note: "Her true top 5 are MOMO, Ice Cream, KitKat, Kurkure, and Chips! ❤️" },
      { cat: "food", q: "If she feels hungry after a long tiring day, what savory street-style treat wins first?", correct: "A Hot Plate of MOMOs 🥟", wrong: ["Cold Salad", "Dry Toast", "Plain Cereal"], note: "Hot MOMOs melt away every bit of a long day's tiredness! 🥟🤍" },
      { cat: "food", q: "What sweet + crunchy combo makes her ideal cozy blanket movie marathon?", correct: "KitKat 🍫 & Kurkure 🌶️", wrong: ["Broccoli & Water", "Raw Oats", "Salted Carrots"], note: "Sweet chocolate wafer + spicy masala crunch = perfection! 🎬❤️" },
      { cat: "food", q: "What is Arunava's official peace-offering whenever she shows a tiny cute pout?", correct: "Unlimited MOMOs & KitKats 🥟🍫", wrong: ["A Boring Lecture", "Silent Treatment", "Homework"], note: "Surrender immediately with MOMOs and KitKats until she smiles! 😄❤️" },
      { cat: "food", q: "Which two crunchy packet snacks are always welcome on our sunset music drives?", correct: "Kurkure & Crispy Chips 🌶️🥔", wrong: ["Soup & Broth", "Cabbage Leaves", "Dry Flour"], note: "Crunchy Kurkure & Chips + favorite melodies = best drive ever! 🎶" },
      { cat: "food", q: "After finishing spicy MOMOs on an evening walk, what sweet treat comes next?", correct: "Velvety Ice Cream 🍨", wrong: ["Bitter Coffee Beans", "Raw Lemon", "Plain Ice"], note: "Spicy MOMOs followed by frosty Ice Cream is the ultimate date combo! 🥟🍨" },
      { cat: "food", q: "How many superstar treats make up her core Favorite Cravings list in Love GPT?", correct: "5 Iconic Treats ✨", wrong: ["1 Single Treat", "22 Vegetables", "Zero Treats"], note: "1. MOMO, 2. Ice Cream, 3. KitKat, 4. Kurkure, 5. Chips! ❤️" },
      { cat: "food", q: "Which warm drink pairs best with her KitKat stash inside a snowy Finland glass igloo?", correct: "Steaming Hot Cocoa ☕🍫", wrong: ["Salty Brine", "Vinegar", "Cold Tap Water"], note: "Hot cocoa + crispy KitKats under the Northern Lights! 🇫🇮❄️" },
      { cat: "food", q: "Which favorite snack brings fiery 'chatpata' masala flavor to late-evening chats?", correct: "Kurkure 🌶️🔥", wrong: ["Vanilla Wafer", "Plain Milk", "White Bread"], note: "Kurkure's tangy masala spice is unmatched! 🌶️" },
      { cat: "food", q: "What texture makes both KitKat and Chips irresistible on her snack tray?", correct: "Light, Crispy Crunch ✨", wrong: ["Soggy Mush", "Chewy Rubber", "Chalky Powder"], note: "That crisp snap and golden crunch win every single time! 🍫🥔" },
      { cat: "food", q: "In Treat Rush: Combo Catcher, what do you dodge while catching MOMOs & Ice Cream?", correct: "Freezing Ice Cubes 🧊", wrong: ["KitKat Bars", "Golden Stars", "Red Hearts"], note: "Catch all her favorite treats and dodge the icy blocks! 🎮" },
      { cat: "food", q: "What score in Treat Rush wins a real-life MOMO & Ice Cream date from Arunava?", correct: "20+ Points 🏆🥟", wrong: ["10,000 Points", "Negative 5", "Impossible Score"], note: "20+ points officially unlocks a real MOMO & Ice Cream treat! ❤️" },
      { cat: "food", q: "Which treat on her favorites list comes wrapped in iconic red foil with chocolate wafers?", correct: "KitKat 🍫", wrong: ["MOMO", "Potato Chips", "Kurkure"], note: "Crispy wafer fingers coated in smooth chocolate! 🍫" },

      // --- CATEGORY: OUR STORY & SACRED DATES (20 Questions!) ---
      { cat: "story", q: "On what exact date did our unforgettable First Chat take place?", correct: "16 October 2025 💬", wrong: ["01 November 2025", "14 February 2026", "10 October 2025"], note: "16 October 2025 — where one simple hello changed everything! 💬❤️" },
      { cat: "story", q: "Which cherished date marks our wholehearted Acceptance milestone?", correct: "25 October 2025 💍", wrong: ["12 December 2025", "05 March 2026", "19 April 2026"], note: "25 October 2025 sealed two hearts onto one forever path! 💍" },
      { cat: "story", q: "How many magical days passed between our First Chat (16 Oct) and Acceptance (25 Oct)?", correct: "9 Magical Days ✨", wrong: ["30 Days", "2 Days", "60 Days"], note: "Just 9 days from hello to knowing it was forever! ✨❤️" },
      { cat: "story", q: "On what unforgettable date did we have our First Meet in person?", correct: "24 February 2026 🌹", wrong: ["03 July 2026", "15 January 2026", "28 March 2026"], note: "24 February 2026 — when messages stepped into sunlit reality! 🌹💑" },
      { cat: "story", q: "When did parents have their very first conversation from her family's side?", correct: "07 April 2026 🌸", wrong: ["25 May 2026", "01 June 2026", "19 April 2026"], note: "07 April 2026 opened a joyful bridge between both loving homes! 🌸" },
      { cat: "story", q: "On what date did parents speak warmly from Arunava's family side?", correct: "19 April 2026 🏡", wrong: ["02 May 2026", "10 April 2026", "03 July 2026"], note: "19 April 2026 — just 12 days after the first parents' talk! 🏡❤️" },
      { cat: "story", q: "Which joyful date marks our First Official Meeting blessed by both families?", correct: "03 July 2026 👑", wrong: ["18 August 2026", "24 June 2026", "15 July 2026"], note: "03 July 2026 — smiling side-by-side surrounded by family blessings! 👑" },
      { cat: "story", q: "What colors were we wearing during our First Meet photo on 24 February 2026?", correct: "Mustard Floral & Crisp White 🌼🤍", wrong: ["Neon Green & Orange", "All Black Suits", "Purple Raincoats"], note: "Golden-mustard florals beside Arunava's crisp white shirt! 📸" },
      { cat: "story", q: "What matching color palette did we wear at our First Official Meeting (03 July 2026)?", correct: "Matching Shades of Blue 💙", wrong: ["Bright Yellow", "Camouflage", "Silver Metallic"], note: "Matching blues and grateful smiles on 03 July 2026! 💙❤️" },
      { cat: "story", q: "How many sacred chapters are chronicled in our core Love Story Timeline?", correct: "6 Sacred Chapters 🕰️", wrong: ["2 Chapters", "15 Chapters", "1 Chapter"], note: "From 16 Oct 2025 to 03 Jul 2026 — plus Chapter #7 ahead! 🕰️" },
      { cat: "story", q: "How many days separated the two parents' conversations in April 2026 (07 Apr to 19 Apr)?", correct: "12 Days 🌸🏡", wrong: ["100 Days", "1 Day", "45 Days"], note: "07 April 2026 to 19 April 2026 — twelve harmonious days! ✨" },
      { cat: "story", q: "In which month and year did our love story begin with a message?", correct: "October 2025 🍂❤️", wrong: ["January 2024", "June 2027", "March 2023"], note: "October 2025 holds both our First Chat and Acceptance! ❤️" },
      { cat: "story", q: "How many real & illustrated couple photos of both of us together live in the gallery?", correct: "18 Couple Photos 💑", wrong: ["2 Photos", "4 Photos", "90 Photos"], note: "18 cherished frames of both of us side-by-side! 💑✨" },
      { cat: "story", q: "How many total photos and romantic videos are preserved inside Memories & Videos?", correct: "130 Memories (120 Pics + 10 Reels) 🎬", wrong: ["15 Items", "30 Items", "5 Items"], note: "120 photographs + 10 single-play romantic video reels! 📸" },

      // --- CATEGORY: FINLAND DREAMS, SANCTUARY & ARUNAVA'S HEART (20 Questions!) ---
      { cat: "dreams", q: "Which snowy Nordic wonderland sits at #1 as our Dream Destination together?", correct: "Snowy Finland 🇫🇮❄️", wrong: ["Sahara Desert", "Brazil Rainforest", "Hawaii"], note: "Waking up in snowy Finnish Lapland together! 🇫🇮❤️" },
      { cat: "dreams", q: "Which magical town in Finnish Lapland is famous for our dream heated glass igloo?", correct: "Rovaniemi 🛖🌌", wrong: ["Lisbon", "Cairo", "Sydney"], note: "Rovaniemi in Lapland — right beneath the Arctic Circle! ❄️" },
      { cat: "dreams", q: "What breathtaking sky phenomenon do we dream of watching hand-in-hand in Finland?", correct: "Aurora Borealis (Northern Lights) 🌌", wrong: ["Sandstorm", "Solar Eclipse Only", "Monsoon Clouds"], note: "Emerald and rose ribbons of the Northern Lights! 🌌✨" },
      { cat: "dreams", q: "What is the capital city of our dream country Finland?", correct: "Helsinki 🇫🇮", wrong: ["Oslo", "Stockholm", "Copenhagen"], note: "Helsinki is Finland's capital, while Rovaniemi is Lapland's heart! 🇫🇮" },
      { cat: "dreams", q: "Who built this Love & Snow sanctuary and speaks through Love GPT?", correct: "Arunava ❤️❄️", wrong: ["A Random Company", "FrostBot 3000", "Stranger"], note: "Crafted from Arunava's heart exclusively for his beloved Queen! ❤️" },
      { cat: "dreams", q: "How many unique handcrafted page openings are inside our Heirloom Love Scrapbook?", correct: "50 Unique Page Openings 📖", wrong: ["5 Pages", "12 Pages", "20 Pages"], note: "Every page from 1 to 50 has its own tactile craft opening! 📖" },
      { cat: "dreams", q: "How many unique paper-origami sculptures unfold to 100% inside our Explosion Box?", correct: "50 Unique Origami Openings 🎁", wrong: ["10 Total", "8 Total", "15 Total"], note: "5 concentric nested boxes × 10 unique origami folds each = 50! 🌸" },
      { cat: "dreams", q: "Which heart-touching Hindi song by Mithoon & Sunil Kamath is Sayanti's #1 favorite song?", correct: "Kinna Sona 🎶❤️", wrong: ["Heavy Metal Noise", "Techno Instrumental", "Unknown Track"], note: "Kinna Sona by Mithoon & Sunil Kamath is Sayanti's #1 treasured favorite song! 🎶❤️" },
      { cat: "dreams", q: "How many velvet petals of promises bloom on Arunava's Rose of Vows?", correct: "12 Velvet Petals 🌹", wrong: ["3 Petals", "50 Petals", "2 Petals"], note: "12 personal vows transforming into an Eternal 24K Golden Rose! 🌹" },
      { cat: "dreams", q: "Who is the one and only eternal Queen of Arunava's heart?", correct: "His Beloved Wife 👑❤️", wrong: ["Nobody", "A Celebrity", "An AI"], note: "Today, tomorrow, and in every lifetime ahead! 👑❤️" },
      { cat: "dreams", q: "Which 7 deeper qualities make her breathtakingly beautiful to Arunava?", correct: "Smile, Kindness, Care, Personality, Heart, Charm & Innocence 🌸", wrong: ["Only Expensive Jewelry", "Strict Rules", "Loudness"], note: "True inner & outer grace that lights up Arunava's whole world! ✨" },
      { cat: "dreams", q: "Which adorable furry animals does Sayanti love — and wants lots and lots of?", correct: "Cuddly Cats & Kittens 🐱🐾", wrong: ["Alligators", "Snakes", "Sharks"], note: "Sayanti loves cats and whole baskets of purring kittens! 🐱❤️" },
      { cat: "dreams", q: "What is Sayanti Shaw's cherished Date of Birth (DOB)?", correct: "21.06.2006 (21 June 2006) 🎂", wrong: ["01.01.2001", "15.08.2004", "30.11.2008"], note: "Born on 21.06.2006 — the day the sweetest soul arrived! 🎂✨" },
      { cat: "dreams", q: "What is the name of Sayanti's respected father?", correct: "Mritrunjay Shaw 🙏", wrong: ["Rajesh Verma", "Amit Roy", "Suresh Sen"], note: "Respected Mritrunjay Shaw — honoured with deep gratitude! 🙏❤️" },
      { cat: "dreams", q: "Why does Sayanti dream of becoming truly successful someday?", correct: "So she can help everyone around her 🌟", wrong: ["To ignore people", "Just to buy yachts", "No reason"], note: "Her kind, high-value heart wants success so she can lift up and help everyone! 🌟👑" },
      { cat: "dreams", q: "How many times does a loaded song or video play automatically before waiting for your click?", correct: "Once Only (Single-Play) ✨", wrong: ["Infinite Loop", "5 Times", "Never Plays"], note: "Loads smoothly, plays once, and waits respectfully for your replay click! 🎵" }
    ];

    let selectedCat = "all";
    let askedPromptsHistory = new Set();
    let activeEight = [];
    let qIdx = 0;
    let score = 0;
    let streak = 0;
    let hintsLeft = 2;

    function shuffleArr(arr) {
      const c = [...arr];
      for (let i = c.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [c[i], c[j]] = [c[j], c[i]];
      }
      return c;
    }

    function startRandomQuizRound() {
      const catPool = selectedCat === "all"
        ? QUESTION_POOL_60
        : QUESTION_POOL_60.filter((item) => item.cat === selectedCat);

      let unseen = catPool.filter((item) => !askedPromptsHistory.has(item.q));
      if (unseen.length < 8) {
        catPool.forEach((item) => askedPromptsHistory.delete(item.q));
        unseen = [...catPool];
      }

      const chosen = shuffleArr(unseen).slice(0, 8);
      chosen.forEach((item) => askedPromptsHistory.add(item.q));

      activeEight = chosen.map((item) => {
        const opts = shuffleArr([item.correct, ...item.wrong]);
        return {
          q: item.q,
          opts,
          ans: opts.indexOf(item.correct),
          note: item.note
        };
      });

      qIdx = 0;
      score = 0;
      streak = 0;
      hintsLeft = 2;
      updateQuizTopBar();
      renderQ();
    }

    function updateQuizTopBar() {
      if (streakBadge) {
        streakBadge.textContent = `Streak: ${streak} 🔥`;
        hydrate3DEmojis(streakBadge);
      }
      if (hintBtn) {
        hintBtn.textContent = `💡 50/50 Hint (${hintsLeft})`;
        hintBtn.disabled = hintsLeft <= 0 || qIdx >= activeEight.length;
        hintBtn.style.opacity = hintBtn.disabled ? "0.45" : "1";
        hydrate3DEmojis(hintBtn);
      }
    }

    function renderQ() {
      updateQuizTopBar();
      if (qIdx >= activeEight.length) {
        badge.textContent = `Score: ${score} / 8 (${Math.round((score / 8) * 100)}%) ❤️`;
        if (score > state.bestQuizScore) {
          state.bestQuizScore = score;
          const bEl = document.getElementById("arcadeBestQuiz");
          if (bEl) bEl.textContent = `${state.bestQuizScore} / 8`;
        }
        addArcadeXp(score * 6, `💘 Trivia ${score}/8`);
        hydrate3DEmojis(badge);
        body.innerHTML = `
          <div class="act-reward-note">🏆 Soulmate &amp; Cravings Trivia Score: <strong>${score} / 8 (${Math.round((score / 8) * 100)}%)</strong>! Every round picks 8 fresh, non-repeating questions from our ${QUESTION_POOL_60.length}-question vault! 🥟❄️❤️</div>
          <button type="button" class="primary-pill-btn" id="restartQuizBtn" style="margin:0 auto;">🔀 Play Next Non-Repeating 8 Questions</button>
        `;
        hydrate3DEmojis(body);
        document.getElementById("restartQuizBtn").addEventListener("click", startRandomQuizRound);
        spawnCelebrationBurst(24);
        return;
      }

      const cur = activeEight[qIdx];
      badge.textContent = `Question ${qIdx + 1} / 8`;
      body.innerHTML = `
        <div class="quiz-question">${enforceNameLock(cur.q)}</div>
        <div class="quiz-options">
          ${cur.opts.map((o, i) => `<button type="button" class="quiz-opt-btn" data-i="${i}">${enforceNameLock(o)}</button>`).join("")}
        </div>
        <div id="quizLiveNote" class="quiz-explain-note" hidden></div>
      `;
      hydrate3DEmojis(body);

      let answered = false;
      body.querySelectorAll(".quiz-opt-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (answered || btn.classList.contains("eliminated")) return;
          answered = true;
          body.querySelectorAll(".quiz-opt-btn").forEach((b) => { b.disabled = true; });
          const picked = Number(btn.dataset.i);
          if (picked === cur.ans) {
            btn.classList.add("correct");
            score++;
            streak++;
          } else {
            btn.classList.add("wrong");
            streak = 0;
            body.querySelector(`[data-i="${cur.ans}"]`)?.classList.add("correct");
          }
          updateQuizTopBar();
          const noteBox = document.getElementById("quizLiveNote");
          if (noteBox && cur.note) {
            noteBox.hidden = false;
            noteBox.textContent = enforceNameLock(cur.note);
            hydrate3DEmojis(noteBox);
          }
          setTimeout(() => { qIdx++; renderQ(); }, 1050);
        });
      });
    }

    hintBtn?.addEventListener("click", () => {
      if (hintsLeft <= 0 || qIdx >= activeEight.length) return;
      const cur = activeEight[qIdx];
      const wrongBtns = [...body.querySelectorAll(".quiz-opt-btn")].filter(
        (b) => Number(b.dataset.i) !== cur.ans && !b.classList.contains("eliminated") && !b.disabled
      );
      if (wrongBtns.length < 2) return;
      hintsLeft--;
      shuffleArr(wrongBtns).slice(0, 2).forEach((b) => b.classList.add("eliminated"));
      updateQuizTopBar();
    });

    document.querySelectorAll("#quizCategoryTabs .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#quizCategoryTabs .filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        selectedCat = pill.dataset.qcat || "all";
        startRandomQuizRound();
      });
    });

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
      const t = (now || performance.now()) * 0.0018;
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#040b1c");
      sky.addColorStop(0.55, "#0d2247");
      sky.addColorStop(0.82, "#153a66");
      sky.addColorStop(1, "#0f243f");
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
          g.addColorStop(0.28, `hsla(${n.hue},95%,66%,0.28)`);
          g.addColorStop(1, `hsla(${(n.hue + 40) % 360},90%,60%,0)`);
          ctx.fillStyle = g;
          ctx.fillRect(baseX - 11, topY, 22, n.height);
        }
      }

      shootingStars = shootingStars.filter((st) => {
        st.x += st.vx; st.y += st.vy; st.life -= 0.022;
        if (st.life <= 0) return false;
        ctx.strokeStyle = `rgba(255,250,220,${st.life})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(st.x, st.y); ctx.lineTo(st.x - st.vx * 8, st.y - st.vy * 8); ctx.stroke();
        return true;
      });

      ctx.globalCompositeOperation = "source-over";

      // Distant Lapland Mountain Range
      ctx.fillStyle = "#122a4d";
      ctx.beginPath();
      ctx.moveTo(0, H - 54);
      ctx.lineTo(145, H - 122);
      ctx.lineTo(295, H - 62);
      ctx.lineTo(445, H - 116);
      ctx.lineTo(615, H - 58);
      ctx.lineTo(W, H - 108);
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();

      // Snowy Lake Shore Hills
      const snowG = ctx.createLinearGradient(0, H - 72, 0, H);
      snowG.addColorStop(0, "#e0f2fe");
      snowG.addColorStop(1, "#bae6fd");
      ctx.fillStyle = snowG;
      ctx.beginPath();
      ctx.ellipse(190, H + 12, 315, 68, 0, 0, Math.PI * 2);
      ctx.ellipse(585, H + 15, 325, 72, 0, 0, Math.PI * 2);
      ctx.fill();

      // Layered Spruce Pines flanking the Igloo
      [58, 118, W - 118, W - 58].forEach((px, idx) => {
        const sc = idx % 2 === 0 ? 0.95 : 0.76;
        const py = H - 36;
        for (let tr = 0; tr < 3; tr++) {
          const ty = py - tr * 16 * sc;
          const tw = (22 - tr * 4) * sc;
          ctx.fillStyle = "#0f3d2e";
          ctx.beginPath();
          ctx.moveTo(px, ty - 24 * sc);
          ctx.lineTo(px - tw, ty);
          ctx.lineTo(px + tw, ty);
          ctx.closePath();
          ctx.fill();
        }
      });

      // Warm Amber Snow Glow + Rovaniemi Glass Igloo Dome
      const igGlow = ctx.createRadialGradient(W / 2, H - 28, 4, W / 2, H - 24, 58);
      igGlow.addColorStop(0, "rgba(253, 224, 71, 0.55)");
      igGlow.addColorStop(1, "rgba(253, 224, 71, 0)");
      ctx.fillStyle = igGlow;
      ctx.beginPath(); ctx.ellipse(W / 2, H - 22, 58, 16, 0, 0, Math.PI * 2); ctx.fill();

      const domeG = ctx.createRadialGradient(W / 2 - 8, H - 42, 3, W / 2, H - 28, 34);
      domeG.addColorStop(0, "#fef9c3");
      domeG.addColorStop(0.6, "#f59e0b");
      domeG.addColorStop(1, "#78350f");
      ctx.fillStyle = domeG;
      ctx.beginPath(); ctx.arc(W / 2, H - 28, 32, Math.PI, 0); ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(W / 2, H - 28, 32, Math.PI, 0); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(W / 2, H - 28, 15, 32, 0, Math.PI, 0); ctx.stroke();
    }
    requestAnimationFrame(renderSky);
  }

  // Item #4C: Rebuilt 12-Petal Botanical Rose of Vows + Dew/Sun Nurture + Crystal Keepsake Jar + 24K Golden Rose!
  function initGame8RoseVows() {
    const stage = document.getElementById("roseStage");
    const confEl = document.getElementById("roseConfessionText");
    const badge = document.getElementById("rosePetalCountBadge");
    const radBadge = document.getElementById("roseRadianceBadge");
    const dewBtn = document.getElementById("roseDewBtn");
    const sunBtn = document.getElementById("roseSunBtn");
    const jarBar = document.getElementById("roseJarPetalsBar");
    const scrollList = document.getElementById("roseVowsScrollList");
    const sendVowBtn = document.getElementById("sendRoseVowChatBtn");

    const vows = [
      "🌹 Vow 1: To always protect the peaceful glow behind your smile.",
      "🌹 Vow 2: To listen with gentle patience even to unspoken feelings.",
      "🌹 Vow 3: To celebrate every tiny win of yours like a grand festival.",
      "🌹 Vow 4: To keep steaming MOMOs, Ice Cream & KitKats stocked forever.",
      "🌹 Vow 5: To honour and stand beside both our families with gratitude.",
      "🌹 Vow 6: To hold your hand warmly under Finland's Northern Lights.",
      "🌹 Vow 7: To surrender first with a hug whenever a cute pout appears.",
      "🌹 Vow 8: To cherish 16 Oct, 25 Oct, 24 Feb & 03 Jul every year.",
      "🌹 Vow 9: To never let a single evening feel lonely or unappreciated.",
      "🌹 Vow 10: To admire your kindness and grace as deeply at 80 as today.",
      "🌹 Vow 11: To build a calm, laughter-filled home side-by-side.",
      "🌹 Vow 12 (Golden Finale): To choose you again and again in every lifetime — Forever Yours, Arunava ❤️"
    ];

    let radiance = 50;
    let hasDewSparkle = false;
    let selectedVowText = "";

    function updateRadianceUI() {
      if (radBadge) {
        radBadge.textContent = `Dew Glow: ${radiance}% ✨`;
        hydrate3DEmojis(radBadge);
      }
      stage.style.filter = `brightness(${0.96 + (radiance / 100) * 0.14}) saturate(${0.95 + (radiance / 100) * 0.2})`;
    }

    dewBtn?.addEventListener("click", () => {
      hasDewSparkle = true;
      radiance = Math.min(100, radiance + 25);
      stage.querySelectorAll(".rose-petal-btn").forEach((p) => p.classList.add("dew-sparkle"));
      updateRadianceUI();
      addArcadeXp(6, "💧 Misted Rose Dew");
      showToast("💧 Morning dew droplets sparkling across all rose petals!");
    });

    sunBtn?.addEventListener("click", () => {
      radiance = Math.min(100, radiance + 25);
      updateRadianceUI();
      addArcadeXp(6, "☀️ Warmed Rose");
      spawnCelebrationBurst(10);
      showToast(`☀️ Rose Radiance boosted to ${radiance}%!`);
    });

    sendVowBtn?.addEventListener("click", () => {
      if (selectedVowText) {
        submitUserQuestion(`I plucked "${selectedVowText}" from our Rose of Vows — tell me more about this promise!`);
      }
    });

    function bloom() {
      stage.innerHTML = `
        <svg class="rose-stem-svg" viewBox="0 0 100 130" aria-hidden="true">
          <path d="M50 128 Q46 78 50 22" stroke="#15803d" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M49 86 C22 82 18 62 38 66 C46 68 49 78 49 86 Z" fill="#22c55e"/>
          <path d="M51 70 C78 64 82 44 62 48 C54 50 51 62 51 70 Z" fill="#16a34a"/>
        </svg>
        <div id="roseCenterHeart" class="rose-center-core">${emoji3DTag("❤️")}</div>
      `;
      if (jarBar) jarBar.innerHTML = `<span class="muted-note" style="font-size:0.74rem;">🫙 Empty Jar — pluck petals to fill!</span>`;
      if (scrollList) scrollList.innerHTML = `<p class="muted-note" style="text-align:center;padding:18px 8px;">Pluck any velvet petal on the left to drop it into your keepsake jar and read Arunava's vows here... ✨</p>`;
      if (sendVowBtn) sendVowBtn.hidden = true;

      let plucked = 0;
      selectedVowText = "";
      badge.textContent = "Vows: 0 / 12 (0%) 🌹";
      hydrate3DEmojis(badge);
      updateRadianceUI();

      for (let i = 0; i < 12; i++) {
        const isInner = i >= 6;
        const angle = isInner ? ((i - 6) * 60 + 30) : (i * 60);
        const offsetY = isInner ? -32 : -44;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `rose-petal-btn ${isInner ? "inner-ring" : "outer-ring"} ${hasDewSparkle ? "dew-sparkle" : ""}`;
        btn.textContent = String(i + 1);
        btn.style.transform = `translateY(${offsetY}px) rotate(${angle}deg)`;

        btn.addEventListener("click", () => {
          if (btn.classList.contains("plucked")) return;
          btn.classList.add("plucked");
          const vowTxt = enforceNameLock(vows[plucked]);
          selectedVowText = vowTxt;
          plucked++;

          const pct = Math.round((plucked / 12) * 100);
          badge.textContent = `Vows: ${plucked} / 12 (${pct}%) 🌹`;
          confEl.textContent = vowTxt;
          hydrate3DEmojis(badge);
          hydrate3DEmojis(confEl);

          if (plucked === 1) {
            if (jarBar) jarBar.innerHTML = "";
            if (scrollList) scrollList.innerHTML = "";
          }

          if (jarBar) {
            const chip = document.createElement("span");
            chip.className = "jar-petal-chip";
            chip.textContent = `🌹 #${plucked}`;
            hydrate3DEmojis(chip);
            jarBar.appendChild(chip);
          }

          if (scrollList) {
            const entry = document.createElement("div");
            entry.className = "vow-scroll-entry selected";
            scrollList.querySelectorAll(".vow-scroll-entry").forEach((el) => el.classList.remove("selected"));
            entry.textContent = vowTxt;
            entry.addEventListener("click", () => {
              scrollList.querySelectorAll(".vow-scroll-entry").forEach((el) => el.classList.remove("selected"));
              entry.classList.add("selected");
              selectedVowText = vowTxt;
              confEl.textContent = vowTxt;
              hydrate3DEmojis(confEl);
            });
            hydrate3DEmojis(entry);
            scrollList.prepend(entry);
          }

          if (sendVowBtn) sendVowBtn.hidden = false;
          addArcadeXp(6, `🌹 Vow ${plucked}/12`);

          if (plucked === 12) {
            const core = document.getElementById("roseCenterHeart");
            if (core) {
              core.classList.add("golden-eternal");
              core.innerHTML = emoji3DTag("👑");
            }
            confEl.textContent = enforceNameLock("👑 100% Complete — Eternal 24K Golden Rose Unlocked! All 12 Vows Sealed Forever in Your Keepsake Jar! ❤️✨");
            hydrate3DEmojis(confEl);
            spawnCelebrationBurst(28);
          }
        });
        stage.appendChild(btn);
      }
    }

    document.getElementById("bloomRoseBtn").addEventListener("click", bloom);
    bloom();
  }

  // Item #4D: Rebuilt VIP Date Pass Minting Workshop (3D Flip Pass + Wax Seal Embosser 0->100% + Perforated Stub + Wallet!)
  function renderMintedTicket() {
    const card = document.getElementById("mintedTicketCard");
    if (!card) return;
    const treat = document.getElementById("treatDropdown")?.dataset.value || "Steaming Hot MOMOs 🥟";
    const setting = document.getElementById("settingDropdown")?.dataset.value || "Cozy Winter Evening ❄️";
    const vibe = document.getElementById("vibeDropdown")?.dataset.value || "Romantic Songs & Cuddles 🎵";
    const customWish = (document.getElementById("ticketWishInput")?.value || "").trim();
    const holder = state.nameRevealed ? SECRET_FULL : "Arunava's Beloved Queen";
    const serial = `LOVE-2026-${String(104 + state.mintedWalletPasses.length * 7).padStart(4, "0")}`;

    card.innerHTML = `
      <div class="vip-pass-face vip-pass-front">
        <div class="vip-pass-main">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
            <span class="mini-frost-tag">❄️🎟️ FIRST-CLASS VIP COUPLE BOARDING PASS</span>
            <span class="vip-wax-stamp-badge ${state.ticketWaxStamped ? "stamped" : ""}">
              ${state.ticketWaxStamped ? "💮 ROYAL GOLD SEALED (100%)" : "⏳ Unstamped — Emboss Seal Below"}
            </span>
          </div>
          <div>
            <h4 style="font-family:var(--font-serif);font-size:1.42rem;line-height:1.25;margin:4px 0;">${treat} + ${setting}</h4>
            <p style="font-size:0.82rem;color:var(--ink-body);">Mood &amp; Vibe: <strong>${vibe}</strong></p>
            ${customWish ? `<p style="font-family:var(--font-hand);font-size:1.12rem;color:var(--rose-primary);margin-top:3px;">“${enforceNameLock(customWish)}”</p>` : ""}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.78rem;color:var(--ink-soft);flex-wrap:wrap;gap:6px;">
            <span>VIP Holder: <strong style="color:var(--ink-deep);">${enforceNameLock(holder)}</strong></span>
            <span>Host: <strong style="color:var(--rose-primary);">Arunava ❤️</strong></span>
          </div>
        </div>

        <div class="vip-pass-stub ${state.ticketStubDetached ? "detached" : ""}">
          <span style="font-family:var(--font-mono);font-size:0.68rem;font-weight:700;color:var(--rose-primary);">#${serial}</span>
          <div style="font-size:0.74rem;font-weight:700;color:var(--ink-deep);">SEAT ∞ • ROW 01<br/><small style="color:var(--ink-soft);">NO EXPIRY</small></div>
          <div class="vip-barcode" aria-hidden="true"></div>
          <small style="font-size:0.65rem;color:var(--ink-soft);">${state.ticketStubDetached ? "✂️ Stub Detached ✓" : "✂️ Keepsake Stub"}</small>
        </div>
      </div>

      <div class="vip-pass-face vip-pass-back">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="mini-frost-tag">📜 OFFICIAL HUSBAND GUARANTEE (BACK OF PASS)</span>
          <span class="score-pill">100% Valid Forever 💍</span>
        </div>
        <div style="font-size:0.84rem;line-height:1.62;color:var(--ink-body);text-align:left;margin:8px 0;">
          • Entitles <strong>${enforceNameLock(holder)}</strong> to immediate redemption of <strong>${treat}</strong> during a <strong>${setting}</strong>.<br/>
          • Includes unlimited warm hugs, undivided attention, extra KitKat halves, and zero expiry date across every season!
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px dashed var(--border-rose);padding-top:8px;">
          <span style="font-family:var(--font-hand);font-size:1.3rem;color:var(--rose-primary);">Signed: Arunava ❤️❄️</span>
          <span style="font-size:0.73rem;color:var(--ink-soft);">Tap “🔄 Flip Pass” to turn over</span>
        </div>
      </div>
    `;
    hydrate3DEmojis(card);
  }

  function initGame9DateTicket() {
    const card = document.getElementById("mintedTicketCard");
    const embossBtn = document.getElementById("mintTicketBtn");
    const embossLbl = document.getElementById("waxEmbossPctLbl");
    const stubSlider = document.getElementById("tearStubSlider");
    const stubPctLbl = document.getElementById("stubZipPctLbl");
    const flipBtn = document.getElementById("flipTicketBtn");
    const wishInput = document.getElementById("ticketWishInput");
    const randomWishBtn = document.getElementById("randomTicketWishBtn");
    const walletStrip = document.getElementById("ticketWalletStrip");
    const walletBadge = document.getElementById("mintedWalletCountBadge");

    const sweetWishes = [
      "Save both halves of the KitKat & the warmest hug for me!",
      "Phones on silent — just our favorite songs & endless laughter!",
      "Take a brand-new side-by-side couple Polaroid together!",
      "Extra fiery red chutney + frosty ice cream on the walk home!"
    ];
    let wCursor = 0;

    randomWishBtn?.addEventListener("click", () => {
      if (wishInput) {
        wishInput.value = sweetWishes[wCursor++ % sweetWishes.length];
        renderMintedTicket();
      }
    });
    wishInput?.addEventListener("input", renderMintedTicket);

    flipBtn?.addEventListener("click", () => {
      card?.classList.toggle("is-flipped");
    });
    card?.addEventListener("dblclick", () => card.classList.toggle("is-flipped"));

    let embossPct = 0;
    let embossTimer = null;

    const addPassToWallet = () => {
      const treat = document.getElementById("treatDropdown")?.dataset.value || "Steaming Hot MOMOs 🥟";
      const setting = document.getElementById("settingDropdown")?.dataset.value || "Cozy Winter Evening ❄️";
      state.mintedWalletPasses.unshift(`${treat} • ${setting}`);
      if (state.mintedWalletPasses.length > 5) state.mintedWalletPasses.pop();
      if (walletBadge) {
        walletBadge.textContent = `Wallet: ${state.mintedWalletPasses.length} Passes 🎟️`;
        hydrate3DEmojis(walletBadge);
      }
      if (walletStrip) {
        walletStrip.hidden = false;
        walletStrip.innerHTML = state.mintedWalletPasses
          .map((p, idx) => `<span class="wallet-mini-pass">💮 Pass #${state.mintedWalletPasses.length - idx}: ${p}</span>`)
          .join("");
        hydrate3DEmojis(walletStrip);
      }
    };

    const stepEmboss = (delta) => {
      embossPct = Math.min(100, embossPct + delta);
      if (embossLbl) embossLbl.textContent = embossPct >= 100 ? "Royal Gold Seal Embossed (100% ✓)" : `Embossing Gold Seal... (${embossPct}%)`;
      if (embossPct >= 100) {
        clearInterval(embossTimer);
        state.ticketWaxStamped = true;
        renderMintedTicket();
        addPassToWallet();
        addArcadeXp(18, "💮 VIP Pass Embossed 100%");
        spawnCelebrationBurst(22);
        showToast("💮 100% Royal Gold Wax Seal Embossed & Saved to Your VIP Wallet! ❤️");
        setTimeout(() => { embossPct = 0; }, 600);
      }
    };

    const startEmboss = (e) => {
      if (e.cancelable) e.preventDefault();
      state.ticketWaxStamped = false;
      stepEmboss(35);
      clearInterval(embossTimer);
      embossTimer = setInterval(() => stepEmboss(22), 95);
    };
    const stopEmboss = () => clearInterval(embossTimer);

    embossBtn.addEventListener("mousedown", startEmboss);
    embossBtn.addEventListener("touchstart", startEmboss, { passive: false });
    window.addEventListener("mouseup", stopEmboss);
    window.addEventListener("touchend", stopEmboss);
    embossBtn.addEventListener("click", () => stepEmboss(50));

    stubSlider?.addEventListener("input", () => {
      const v = Number(stubSlider.value);
      if (stubPctLbl) stubPctLbl.textContent = v >= 95 ? "100% Detached ✓" : `${v}%`;
      if (v >= 95 && !state.ticketStubDetached) {
        stubSlider.value = "100";
        state.ticketStubDetached = true;
        renderMintedTicket();
        addArcadeXp(8, "✂️ VIP Stub Detached");
        spawnCelebrationBurst(12);
        showToast("✂️ Perforated VIP Keepsake Stub Detached cleanly!");
      } else if (v < 20 && state.ticketStubDetached) {
        state.ticketStubDetached = false;
        renderMintedTicket();
      }
    });

    document.getElementById("redeemTicketChatBtn")?.addEventListener("click", () => {
      const treat = document.getElementById("treatDropdown")?.dataset.value || "Steaming Hot MOMOs 🥟";
      const setting = document.getElementById("settingDropdown")?.dataset.value || "Cozy Winter Evening ❄️";
      const vibe = document.getElementById("vibeDropdown")?.dataset.value || "Romantic Songs & Cuddles 🎵";
      submitUserQuestion(`I am redeeming my Gold-Sealed VIP Date Pass for ${treat} during a ${setting} with ${vibe}!`);
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

  // ==================== 18. INTERACTIVE CAT SANCTUARY + ARUNAVA & SAYANTI SOULMATE CATS + MEOW & KISS AUDIO ====================
  let triggerCatHavenWelcomeGreeting = null;

  function initCatHavenSanctuary() {
    const canvas = document.getElementById("catHavenCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const welcomeBanner = document.getElementById("catWelcomeBanner");
    const countStat = document.getElementById("catCountStat");
    const purrStat = document.getElementById("catPurrMeterStat");
    const cuddlesStat = document.getElementById("catCuddlesStat");
    const questStatBadge = document.getElementById("catQuestStatBadge");
    const coupleKissBtn = document.getElementById("catCoupleKissBtn");
    const meowChorusBtn = document.getElementById("catMeowChorusBtn");
    const soundBtn = document.getElementById("catSoundToggleBtn");
    const fillBowlsBtn = document.getElementById("catFillBowlsBtn");
    const partyBtn = document.getElementById("catTreatPartyBtn");
    const adoptBtn = document.getElementById("adoptNewCatBtn");
    const sanctuaryToolbar = document.getElementById("catSanctuaryToolbar");
    const miniGameBar = document.getElementById("catMiniGameBar");
    const miniTitleBadge = document.getElementById("catMiniTitleBadge");
    const miniScoreBadge = document.getElementById("catMiniScoreBadge");
    const miniTimerBadge = document.getElementById("catMiniTimerBadge");
    const miniLeftBtn = document.getElementById("catMiniLeftBtn");
    const miniRightBtn = document.getElementById("catMiniRightBtn");
    const miniStartBtn = document.getElementById("catMiniStartBtn");
    const inspName = document.getElementById("catInspName");
    const inspMood = document.getElementById("catInspMood");
    const renameInput = document.getElementById("catRenameInput");
    const renameBtn = document.getElementById("catRenameBtn");
    const chatCatsBtn = document.getElementById("tellArunavaCatsBtn");

    const W = 840;
    const H = 450;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let activeMode = "sanctuary"; // "sanctuary" | "catch" | "pounce"
    let activeTool = "pet";
    let soundEnabled = true;
    let cuddlesGiven = 0;
    let purrHappiness = 95;
    let selectedCatIdx = 0;
    let petCountForQuest = 0;
    const completedQuests = new Set();
    let questAllCelebrated = false;

    const foodStation = { x: 145, y: 392 };
    const napBed = { x: 695, y: 386, rx: 82, ry: 34 };
    const catTreePerches = [
      { x: 96, y: 112 },
      { x: 112, y: 186 }
    ];

    const pointer = { x: W / 2, y: H / 2, inside: false, down: false };
    const callRipples = [];
    const spaBubbles = [];
    const coupleHearts = []; // Dedicated rising love hearts whenever Arunava & Sayanti meet, kiss, cuddle, or say I love you!

    // Soulmate Couple Cats Roam-and-Meet State Machine (Cats #0 = Arunava, #1 = Sayanti)
    // Phases: "reunion" (cuddle/kiss/dance/rose/iloveyou together) -> "roaming" (exploring playroom apart) -> "seeking" (running together to meet!)
    const coupleState = {
      phase: "reunion", // "reunion" | "roaming" | "seeking"
      act: "kiss",      // "kiss" | "cuddle" | "iloveyou" | "rose" | "dance"
      timer: 185,
      meetX: W / 2,
      meetY: 306,
      aruRoamX: 215,
      aruRoamY: 255,
      sayRoamX: 625,
      sayRoamY: 295,
      arunavaSpeech: "Mwah! 💋 I love you, Sayanti! ❤️",
      sayantiSpeech: "I love you too, Arunava! 🥰💖"
    };

    const catchGame = { running: true, score: 0, combo: 0, lives: 3, heroX: W / 2, targetX: W / 2, items: [], spawnTick: 0 };
    const pounceBoxes = [
      { x: 185, y: 235 }, { x: 420, y: 235 }, { x: 655, y: 235 },
      { x: 185, y: 368 }, { x: 420, y: 368 }, { x: 655, y: 368 }
    ].map((pos, idx) => ({ ...pos, idx, active: false, catIdx: idx, timer: 0, maxTimer: 70, booped: false, holdItem: "🐟" }));
    const pounceGame = { running: true, score: 0, combo: 0, timeLeft: 35, lastSecTs: performance.now(), spawnCooldown: 20 };

    function playGentleCatSound(kind = "meow", pitch = 1) {
      if (!soundEnabled) return;
      playSanctuarySfx(kind, pitch);
    }

    function spawnCoupleHearts(cx, cy, count = 8, withLips = false) {
      const syms = withLips ? ["💋", "❤️", "💖", "💕", "💘"] : ["❤️", "💖", "💕", "🥰", "✨"];
      for (let i = 0; i < count; i++) {
        coupleHearts.push({
          x: cx + (Math.random() - 0.5) * 54,
          y: cy - 16 + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -0.95 - Math.random() * 1.0,
          sym: syms[i % syms.length],
          life: 1.25
        });
      }
      if (coupleHearts.length > 55) coupleHearts.splice(0, coupleHearts.length - 55);
    }

    // Cats #0 & #1: Dedicated Soulmate Couple Cats "Arunava" & "Sayanti"!
    const SOULMATE_COUPLE_PRESETS = [
      {
        name: "Arunava",
        breed: "Devoted Prince Kitty",
        coat: "#f8fafc",
        stripe: "#334155",
        ear: "#fb7185",
        patch: "#ffffff",
        collar: "#0284c7",
        hat: "🤴",
        isSoulmate: true,
        role: "arunava"
      },
      {
        name: "Sayanti",
        breed: "Beloved Cat Queen Kitty",
        coat: "#fff0f6",
        stripe: "#f9a8d4",
        ear: "#ec4899",
        patch: "#ffffff",
        collar: "#e11d68",
        hat: "👑",
        isSoulmate: true,
        role: "sayanti"
      }
    ];

    const CAT_PRESETS = [
      { name: "Mochi", breed: "Fluffy Snow Persian", coat: "#ffffff", stripe: "#e2e8f0", ear: "#fda4af", patch: "#f8fafc", collar: "#f43f5e", hat: "🎀" },
      { name: "Mittens", breed: "Ginger Marmalade Tabby", coat: "#fdba74", stripe: "#ea580c", ear: "#fb7185", patch: "#ffedd5", collar: "#0ea5e9", hat: "" },
      { name: "Luna", breed: "Velvet Tuxedo Kitty", coat: "#334155", stripe: "#1e293b", ear: "#f472b6", patch: "#ffffff", collar: "#e11d68", hat: "🎀" },
      { name: "Sakura", breed: "Blush Cream Ragdoll", coat: "#fce7f3", stripe: "#f9a8d4", ear: "#ec4899", patch: "#ffffff", collar: "#8b5cf6", hat: "🌸" },
      { name: "Biscuit", breed: "Honey Caramel Calico", coat: "#fde68a", stripe: "#d97706", ear: "#f97316", patch: "#ffffff", collar: "#ec4899", hat: "" },
      { name: "Oreo", breed: "Cookies & Cream Kitty", coat: "#475569", stripe: "#1e293b", ear: "#fda4af", patch: "#ffffff", collar: "#38bdf8", hat: "" },
      { name: "Snowbell", breed: "Arctic Pearl Kitten", coat: "#f0f9ff", stripe: "#bae6fd", ear: "#fb7185", patch: "#ffffff", collar: "#a855f7", hat: "🎀" },
      { name: "Simba", breed: "Golden Sunbeam Tabby", coat: "#fcd34d", stripe: "#d97706", ear: "#ea580c", patch: "#fef9c3", collar: "#e11d68", hat: "" },
      { name: "Coco", breed: "Cinnamon Scottish Fold", coat: "#d6d3d1", stripe: "#a8a29e", ear: "#f472b6", patch: "#ffffff", collar: "#f43f5e", hat: "" },
      { name: "Muffin", breed: "Strawberry Milk Kitty", coat: "#fbcfe8", stripe: "#f472b6", ear: "#be185d", patch: "#fff1f2", collar: "#0284c7", hat: "👑" },
      { name: "Pippin", breed: "Playful Peach Munchkin", coat: "#fed7aa", stripe: "#fb923c", ear: "#f43f5e", patch: "#ffffff", collar: "#10b981", hat: "" },
      { name: "Daisy", breed: "Buttercup Purrball", coat: "#fef08a", stripe: "#eab308", ear: "#fb7185", patch: "#ffffff", collar: "#ec4899", hat: "🌸" },
      { name: "Pudding", breed: "Creamy Vanilla Loaf", coat: "#fef3c7", stripe: "#f59e0b", ear: "#f472b6", patch: "#ffffff", collar: "#6366f1", hat: "" },
      { name: "Neko", breed: "Lucky Charm Calico", coat: "#fffbeb", stripe: "#f97316", ear: "#ef4444", patch: "#fde68a", collar: "#dc2626", hat: "🎀" },
      { name: "Bella", breed: "Silver Mist Princess", coat: "#e2e8f0", stripe: "#94a3b8", ear: "#f472b6", patch: "#ffffff", collar: "#e11d68", hat: "👑" },
      { name: "Whiskers", breed: "Cozy Charcoal Mouser", coat: "#64748b", stripe: "#334155", ear: "#fda4af", patch: "#f1f5f9", collar: "#f59e0b", hat: "" },
      { name: "Peach", breed: "Soft Coral Kitten", coat: "#fecdd3", stripe: "#fb7185", ear: "#e11d68", patch: "#ffffff", collar: "#8b5cf6", hat: "🌸" },
      { name: "Starlight", breed: "Lapland Snow Kitten", coat: "#e0e7ff", stripe: "#a5b4fc", ear: "#ec4899", patch: "#ffffff", collar: "#0ea5e9", hat: "👑" },
      { name: "Marshmallow", breed: "Cloud-Soft Chonk", coat: "#ffffff", stripe: "#fbcfe8", ear: "#f472b6", patch: "#fce7f3", collar: "#f43f5e", hat: "🎀" },
      { name: "Cinnamon", breed: "Warm Spice Tabby", coat: "#fdba74", stripe: "#c2410c", ear: "#ea580c", patch: "#fff7ed", collar: "#ec4899", hat: "" }
    ];

    const cats = [];
    const yarnBalls = [
      { x: 255, y: 335, vx: 1.4, vy: -0.7, color: "#f43f7a", r: 13 },
      { x: 585, y: 280, vx: -1.2, vy: 0.9, color: "#8b5cf6", r: 13 }
    ];
    const treats = [];
    const floaters = [];
    const windowFlakes = Array.from({ length: 18 }, () => ({
      x: W / 2 - 105 + Math.random() * 210,
      y: 26 + Math.random() * 108,
      r: 1.5 + Math.random() * 2
    }));

    function markCatQuest(qKey) {
      if (!completedQuests.has(qKey)) {
        completedQuests.add(qKey);
        document.querySelector(`#catQuestStrip [data-cquest="${qKey}"]`)?.classList.add("done");
        addArcadeXp(12, `🐱 Cat Care: ${qKey}`);
        syncCatStatsUI();
        if (completedQuests.size === 5 && !questAllCelebrated) {
          questAllCelebrated = true;
          spawnCelebrationBurst(26);
          showToast("👑 100% Daily Cat Queen Care Complete! Arunava, Sayanti & every kitten adore you! 🐱💖");
        }
      }
    }

    // Spawn Arunava (#0) & Sayanti (#1) Soulmate Couple Cats first!
    SOULMATE_COUPLE_PRESETS.forEach((sp, idx) => {
      cats.push({
        ...sp,
        x: W / 2 + (idx === 0 ? -24 : 24),
        y: 306,
        vx: 0,
        vy: 0,
        targetX: null,
        targetY: null,
        perched: false,
        napping: false,
        scale: 1.02,
        facing: idx === 0 ? 1 : -1,
        purrTimer: 160,
        groomSparkle: 40,
        jumpY: 0,
        jumpVy: 0,
        walkCycle: 0,
        tailPhase: idx * Math.PI,
        blinkTimer: 100,
        lovePct: 100,
        moodText: idx === 0
          ? "Cuddling & kissing my beloved Queen Sayanti kitty forever! 💋❤️"
          : "Purring in Arunava kitty's warm cuddle with endless love! 🥰💖"
      });
    });

    function spawnCatFromPreset(idx) {
      const p = CAT_PRESETS[idx % CAT_PRESETS.length];
      const onPerch = idx < 2 ? catTreePerches[idx] : null;
      const ringSpots = [
        { x: 225, y: 235 },
        { x: 615, y: 235 },
        { x: 195, y: 332 },
        { x: 630, y: 325 },
        { x: 315, y: 210 },
        { x: 525, y: 210 }
      ];
      const floorSpot = ringSpots[(idx - 2 + ringSpots.length) % ringSpots.length];
      const kitty = {
        ...p,
        isSoulmate: false,
        x: onPerch ? onPerch.x : floorSpot.x,
        y: onPerch ? onPerch.y : floorSpot.y,
        vx: 0,
        vy: 0,
        targetX: null,
        targetY: null,
        perched: Boolean(onPerch),
        napping: idx === 5,
        scale: 0.9 + (idx % 3) * 0.06,
        facing: idx % 2 === 0 ? 1 : -1,
        purrTimer: 35,
        groomSparkle: 0,
        jumpY: 0,
        jumpVy: 0,
        walkCycle: Math.random() * Math.PI * 2,
        tailPhase: Math.random() * Math.PI * 2,
        blinkTimer: 60 + Math.floor(Math.random() * 140),
        lovePct: 84 + (idx % 4) * 4,
        moodText: "Meowing happily & waiting for Sayanti's gentle cuddles! 💕🐾"
      };
      if (idx === 5) {
        kitty.x = napBed.x - 16;
        kitty.y = napBed.y - 6;
        kitty.moodText = "Curled up cozy on the velvet nap cushion dreaming of Sayanti! 💤💕";
      }
      cats.push(kitty);
    }

    for (let i = 0; i < 8; i++) spawnCatFromPreset(i);

    function triggerSoulmateCoupleRomance(mode = "kiss", withSound = true) {
      const aru = cats[0];
      const say = cats[1];
      if (!aru || !say) return;
      aru.perched = false; say.perched = false;
      aru.napping = false; say.napping = false;
      aru.purrTimer = 180; say.purrTimer = 180;

      coupleState.phase = "reunion";
      coupleState.act = mode;
      coupleState.phaseEndTs = performance.now() + 2100;

      // Meet right between their current positions (clamped to the cozy center playroom floor)
      const midX = Math.max(230, Math.min(W - 230, (aru.x + say.x) / 2 || W / 2));
      const midY = Math.max(235, Math.min(350, (aru.y + say.y) / 2 || 306));
      coupleState.meetX = midX;
      coupleState.meetY = midY;

      if (mode === "kiss") {
        aru.jumpVy = -3.8;
        say.jumpVy = -3.8;
        coupleState.arunavaSpeech = "Mwah! 💋 I love you, Sayanti! ❤️";
        coupleState.sayantiSpeech = "Mwah! 💋 I love you too, Arunava! 🥰💖";
        aru.moodText = "Just met & kissed my sweet Queen Sayanti kitty — Mwah! 💋❤️";
        say.moodText = "Blushing & kissing my devoted Arunava kitty! 💋💖";
        spawnCoupleHearts(midX, midY - 14, 14, true);
        if (withSound) playGentleCatSound("kiss", 1.0);
        cuddlesGiven += 2;
        purrHappiness = 100;
        markCatQuest("crown");
      } else if (mode === "cuddle") {
        coupleState.arunavaSpeech = "Cuddling you close, my soft Queen! 🤗🤍";
        coupleState.sayantiSpeech = "Purrrr~ Warmest home is beside you! 💕🐾";
        aru.moodText = "Snuggled cheek-to-cheek protecting Sayanti's gentle heart! 🤍❤️";
        say.moodText = "Purring peacefully wrapped in Arunava's cuddle! 🥰💕";
        spawnCoupleHearts(midX, midY - 12, 10, false);
        if (withSound) playGentleCatSound("purr");
        cuddlesGiven++;
      } else if (mode === "iloveyou") {
        coupleState.arunavaSpeech = "You light up my whole life! I love you! ✨❤️";
        coupleState.sayantiSpeech = "I love you forever & ever, Arunava! 💍💖";
        spawnCoupleHearts(midX, midY - 12, 11, false);
        if (withSound) playGentleCatSound("meow", 1.08);
      } else if (mode === "rose") {
        aru.jumpVy = -4.5;
        coupleState.arunavaSpeech = "A red rose & forehead kiss for my Queen! 🌹💋";
        coupleState.sayantiSpeech = "Meow~! Best husband kitty ever! 🌹🥰";
        spawnCoupleHearts(midX, midY - 14, 12, true);
        if (withSound) playGentleCatSound("kiss", 1.08);
        cuddlesGiven += 2;
      } else if (mode === "dance") {
        aru.jumpVy = -4.2;
        say.jumpVy = -4.2;
        coupleState.arunavaSpeech = "Dancing paws-in-paws with my love! 🐾🎶";
        coupleState.sayantiSpeech = "Hehe, twirling together forever! 💃❤️";
        spawnCoupleHearts(midX, midY - 12, 10, false);
        if (withSound) playGentleCatSound("meow", 1.12);
      }
      syncCatStatsUI();
    }

    function startSoulmateRoamingApart() {
      const aru = cats[0];
      const say = cats[1];
      if (!aru || !say) return;
      coupleState.phase = "roaming";
      coupleState.phaseEndTs = performance.now() + 3400; // Roam apart for 3.4s, then seek & reunite!
      // Pick distinct scenic spots on opposite sides of the playroom so they genuinely roam apart and explore!
      const leftSpots = [
        { x: 185, y: 245 },
        { x: 240, y: 345 },
        { x: 295, y: 225 },
        { x: 195, y: 295 }
      ];
      const rightSpots = [
        { x: 645, y: 250 },
        { x: 590, y: 345 },
        { x: 540, y: 225 },
        { x: 655, y: 310 }
      ];
      const lPick = leftSpots[Math.floor(Math.random() * leftSpots.length)];
      const rPick = rightSpots[Math.floor(Math.random() * rightSpots.length)];
      coupleState.aruRoamX = lPick.x;
      coupleState.aruRoamY = lPick.y;
      coupleState.sayRoamX = rPick.x;
      coupleState.sayRoamY = rPick.y;
      coupleState.arunavaSpeech = "Exploring the playroom... thinking of Sayanti! 🐾💭";
      coupleState.sayantiSpeech = "Strolling around... where is my Arunava kitty? 🐱💕";
      aru.moodText = "Roaming the sunny playroom & looking for Queen Sayanti! 🐾❤️";
      say.moodText = "Exploring the sanctuary before meeting Arunava kitty again! 🐱💖";
      syncCatStatsUI();
    }

    // Item #4: Welcome Greeting whenever user opens the Cat Game tab!
    triggerCatHavenWelcomeGreeting = () => {
      if (welcomeBanner) {
        welcomeBanner.hidden = false;
        welcomeBanner.innerHTML = `<span>🐾 <strong>Meow~! Welcome home, Queen Sayanti!</strong> <strong>Arunava &amp; Sayanti</strong> couple cats and all ${cats.length - 2} kittens ran up to greet you with purrs, cuddles &amp; kisses! 💋❤️🐱</span>`;
        hydrate3DEmojis(welcomeBanner);
        welcomeBanner.classList.remove("greeting-pop");
        void welcomeBanner.offsetWidth;
        welcomeBanner.classList.add("greeting-pop");
      }

      const greetings = [
        "Meow~! Welcome Sayanti! 🐱❤️",
        "Hi Queen Sayanti! Purrrr~ 🐾💖",
        "We missed you so much! 🥰🐾",
        "Yay! Cuddle time with Sayanti! 💕"
      ];
      cats.forEach((c, idx) => {
        c.napping = false;
        c.purrTimer = 145;
        if (!c.perched && c.jumpY === 0) {
          c.jumpVy = -4.5 - (idx % 3) * 0.8;
        }
        if (idx >= 2 && idx <= 5) {
          floaters.push({
            x: c.x,
            y: c.y - 36,
            txt: greetings[(idx - 2) % greetings.length],
            life: 1.45,
            col: "#e11d68"
          });
        }
      });

      // Play audible kitten Meow Greeting Chorus + trigger Arunava & Sayanti Welcome Kiss & Hearts!
      playGentleCatSound("meow_chorus");
      setTimeout(() => {
        if (document.getElementById("view-cathaven")?.classList.contains("active")) {
          triggerSoulmateCoupleRomance("kiss", true);
        }
      }, 420);
      syncCatStatsUI();
    };

    function syncCatStatsUI() {
      if (countStat) {
        countStat.textContent = `${cats.length} Cats 🐾`;
        hydrate3DEmojis(countStat);
      }
      if (purrStat) {
        purrStat.textContent = `${Math.min(100, Math.round(purrHappiness))}% In Love 💖`;
        hydrate3DEmojis(purrStat);
      }
      if (cuddlesStat) {
        cuddlesStat.textContent = `${cuddlesGiven} Given 💋`;
        hydrate3DEmojis(cuddlesStat);
      }
      if (questStatBadge) {
        const qPct = Math.round((completedQuests.size / 5) * 100);
        questStatBadge.textContent = `${completedQuests.size} / 5 (${qPct}%) ✨`;
        hydrate3DEmojis(questStatBadge);
      }
      const sel = cats[selectedCatIdx] || cats[0];
      if (sel && inspName && inspMood) {
        inspName.textContent = `${sel.name} • ${sel.breed} ${sel.hat || ""} (Love: ${Math.min(100, sel.lovePct)}%)`;
        inspMood.textContent = sel.moodText;
        hydrate3DEmojis(inspName);
        hydrate3DEmojis(inspMood);
      }
    }
    syncCatStatsUI();

    function syncMiniGameHUD() {
      if (activeMode === "catch") {
        if (miniTitleBadge) miniTitleBadge.textContent = `🎯 Hero Kitty: ${(cats[selectedCatIdx] || cats[1] || cats[0]).name}`;
        if (miniScoreBadge) miniScoreBadge.textContent = `Score: ${catchGame.score} • Combo: ${catchGame.combo}x 🔥`;
        if (miniTimerBadge) miniTimerBadge.textContent = catchGame.lives > 0 ? "❤️".repeat(catchGame.lives) : "Tap ▶ Restart";
        if (miniLeftBtn) miniLeftBtn.hidden = false;
        if (miniRightBtn) miniRightBtn.hidden = false;
      } else if (activeMode === "pounce") {
        if (miniTitleBadge) miniTitleBadge.textContent = "🐾 Peek-a-Boo Box Pounce";
        if (miniScoreBadge) miniScoreBadge.textContent = `Boops: ${pounceGame.score} • Streak: ${pounceGame.combo}x 🐾`;
        if (miniTimerBadge) miniTimerBadge.textContent = pounceGame.running ? `⏱️ ${Math.ceil(pounceGame.timeLeft)}s` : "🏁 Round Complete!";
        if (miniLeftBtn) miniLeftBtn.hidden = true;
        if (miniRightBtn) miniRightBtn.hidden = true;
      }
    }

    function startCatchMiniGame() {
      catchGame.running = true;
      catchGame.score = 0;
      catchGame.combo = 0;
      catchGame.lives = 3;
      catchGame.items = [];
      catchGame.heroX = W / 2;
      catchGame.targetX = W / 2;
      syncMiniGameHUD();
    }

    function startPounceMiniGame() {
      pounceGame.running = true;
      pounceGame.score = 0;
      pounceGame.combo = 0;
      pounceGame.timeLeft = 35;
      pounceGame.lastSecTs = performance.now();
      pounceBoxes.forEach((b) => { b.active = false; b.timer = 0; });
      syncMiniGameHUD();
    }

    document.querySelectorAll("#catModeSwitchBar .cat-mode-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll("#catModeSwitchBar .cat-mode-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeMode = tab.dataset.catmode || "sanctuary";
        if (sanctuaryToolbar) sanctuaryToolbar.hidden = activeMode !== "sanctuary";
        if (miniGameBar) miniGameBar.hidden = activeMode === "sanctuary";
        if (activeMode === "catch") {
          startCatchMiniGame();
          if (inspMood) inspMood.textContent = "Move your cursor/finger (or tap ◀/▶) to help your Hero Kitty catch falling Salmon, Milk & Yarn! 🎯🐟";
        } else if (activeMode === "pounce") {
          startPounceMiniGame();
          if (inspMood) inspMood.textContent = "Tap each cute kitten popping out of the 6 cozy gift boxes to boop & hear them meow! 🐾🎁";
        } else {
          syncCatStatsUI();
        }
      });
    });

    miniStartBtn?.addEventListener("click", () => {
      if (activeMode === "catch") startCatchMiniGame();
      else if (activeMode === "pounce") startPounceMiniGame();
    });
    miniLeftBtn?.addEventListener("click", () => {
      if (!catchGame.running) startCatchMiniGame();
      catchGame.targetX = Math.max(55, catchGame.targetX - 85);
    });
    miniRightBtn?.addEventListener("click", () => {
      if (!catchGame.running) startCatchMiniGame();
      catchGame.targetX = Math.min(W - 55, catchGame.targetX + 85);
    });

    document.querySelectorAll("#catToolTabs .filter-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#catToolTabs .filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeTool = btn.dataset.cattool || "pet";
        if (activeTool === "laser" || activeTool === "yarn" || activeTool === "wand") markCatQuest("play");
      });
    });

    // Dedicated "Arunava & Sayanti Kiss 💋" button!
    const coupleSeq = ["kiss", "cuddle", "rose", "iloveyou", "dance"];
    let coupleBtnCursor = 0;
    coupleKissBtn?.addEventListener("click", () => {
      if (activeMode !== "sanctuary") {
        document.querySelector('#catModeSwitchBar [data-catmode="sanctuary"]')?.click();
      }
      const mode = coupleBtnCursor % 2 === 0 ? "kiss" : coupleSeq[coupleBtnCursor % coupleSeq.length];
      coupleBtnCursor++;
      selectedCatIdx = 1;
      triggerSoulmateCoupleRomance(mode, true);
      showToast("💑 Arunava & Sayanti kitties shared a romantic kiss & cuddle: “I love you forever!” 💋❤️");
    });

    // Dedicated "🐱 Meow!" button!
    meowChorusBtn?.addEventListener("click", () => {
      playGentleCatSound("meow_chorus");
      cats.forEach((c, idx) => {
        c.purrTimer = 110;
        if (!c.perched && c.jumpY === 0 && idx % 2 === 0) c.jumpVy = -4.2;
      });
      const sample = [cats[2], cats[3], cats[4], cats[6]].filter(Boolean);
      const meowWords = ["Meow~! 🐱❤️", "Miaow! Love you! 💕", "Mew mew~! 🐾", "Purrrr-meow! 🥰"];
      sample.forEach((c, i) => {
        floaters.push({ x: c.x, y: c.y - 34, txt: meowWords[i % meowWords.length], life: 1.25, col: "#e11d68" });
      });
      cuddlesGiven++;
      petCountForQuest++;
      if (petCountForQuest >= 2) markCatQuest("pet");
      syncCatStatsUI();
    });

    soundBtn?.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundBtn.setAttribute("aria-pressed", String(soundEnabled));
      soundBtn.textContent = soundEnabled ? "🔊 Sound: On" : "🔇 Sound: Off";
    });

    const refillFoodStation = () => {
      for (let i = 0; i < 3; i++) {
        treats.push({
          x: foodStation.x - 24 + i * 26,
          y: foodStation.y - 16,
          icon: i % 2 === 0 ? "🐟" : "🥛"
        });
      }
      cats.slice(2, 5).forEach((c, idx) => {
        c.perched = false;
        c.napping = false;
        c.targetX = foodStation.x - 30 + idx * 30;
        c.targetY = foodStation.y - 22;
      });
      cuddlesGiven += 3;
      purrHappiness = Math.min(100, purrHappiness + 5);
      markCatQuest("feed");
      playGentleCatSound("meow", 1.05);
      floaters.push({ x: foodStation.x, y: foodStation.y - 36, txt: "Meow! Fresh Salmon & Milk! 🐟🥛", life: 1.3, col: "#0284c7" });
      syncCatStatsUI();
    };
    fillBowlsBtn?.addEventListener("click", refillFoodStation);

    adoptBtn?.addEventListener("click", () => {
      if (cats.length >= 22) {
        showToast("🐱 All 22 adorable cats (Arunava, Sayanti + 20 kittens) are cuddling in the Sanctuary! ❤️");
        return;
      }
      spawnCatFromPreset(cats.length - 2);
      selectedCatIdx = cats.length - 1;
      const newest = cats[selectedCatIdx];
      newest.perched = false;
      newest.napping = false;
      newest.x = W / 2 + (Math.random() - 0.5) * 180;
      newest.y = 265;
      newest.purrTimer = 120;
      newest.jumpVy = -6;
      floaters.push({ x: newest.x, y: newest.y - 32, txt: `Meow~! Hi Sayanti! 🐾`, life: 1.3, col: "#e11d68" });
      playGentleCatSound("meow", 1.15);
      purrHappiness = Math.min(100, purrHappiness + 4);
      syncCatStatsUI();
      spawnCelebrationBurst(14);
      showToast(`🐱 Adopted ${newest.name} (${newest.breed}) into Sayanti's Cat Sanctuary!`);
    });

    partyBtn?.addEventListener("click", () => {
      if (activeMode !== "sanctuary") {
        document.querySelector('#catModeSwitchBar [data-catmode="sanctuary"]')?.click();
      }
      refillFoodStation();
      triggerSoulmateCoupleRomance("kiss", true);
      for (let i = 0; i < 5; i++) {
        treats.push({
          x: 160 + Math.random() * (W - 320),
          y: 205 + Math.random() * 175,
          icon: i % 2 === 0 ? "🐟" : "🥛"
        });
      }
      yarnBalls.push({
        x: W / 2,
        y: 250,
        vx: (Math.random() - 0.5) * 6,
        vy: -3,
        color: ["#f43f7a", "#0ea5e9", "#eab308", "#10b981"][yarnBalls.length % 4],
        r: 13
      });
      if (yarnBalls.length > 6) yarnBalls.shift();
      markCatQuest("play");
      purrHappiness = 100;
      syncCatStatsUI();
      spawnCelebrationBurst(20);
      showToast("🎉 Grand Kitty Treat, Meow & Kiss Party! 🐟🧶💋");
    });

    renameBtn?.addEventListener("click", () => {
      const val = (renameInput?.value || "").trim();
      if (!val || !cats[selectedCatIdx]) return;
      if (cats[selectedCatIdx].isSoulmate) {
        showToast("💑 Arunava & Sayanti soulmate cats keep their sacred names forever! ❤️");
        return;
      }
      cats[selectedCatIdx].name = val;
      cats[selectedCatIdx].purrTimer = 100;
      playGentleCatSound("meow", 1.1);
      floaters.push({ x: cats[selectedCatIdx].x, y: cats[selectedCatIdx].y - 30, txt: `Meow! I'm ${val}! ❤️`, life: 1.2, col: "#e11d68" });
      renameInput.value = "";
      syncCatStatsUI();
      showToast(`✏️ Named your kitty "${val}"! 🐱❤️`);
    });

    chatCatsBtn?.addEventListener("click", () => {
      submitUserQuestion(`I just watched Arunava & Sayanti couple cats kiss and cuddle along with ${cats.length - 2} cute kittens in my Cat Sanctuary!`);
    });

    const getCanvasCoords = (e) => {
      const r = canvas.getBoundingClientRect();
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
      return {
        x: Math.max(24, Math.min(W - 24, ((clientX - r.left) / (r.width || W)) * W)),
        y: Math.max(24, Math.min(H - 20, ((clientY - r.top) / (r.height || H)) * H))
      };
    };

    const findCatAt = (x, y) => {
      for (let i = cats.length - 1; i >= 0; i--) {
        const c = cats[i];
        if (Math.hypot(c.x - x, (c.y + c.jumpY) - y) < 42) return i;
      }
      return -1;
    };

    const petCat = (idx, playAudio = true) => {
      const c = cats[idx];
      if (!c) return;
      selectedCatIdx = idx;
      if (c.isSoulmate) {
        const nextCoupleAct = coupleState.act === "kiss" ? "cuddle" : "kiss";
        triggerSoulmateCoupleRomance(nextCoupleAct, playAudio);
        petCountForQuest++;
        if (petCountForQuest >= 2) markCatQuest("pet");
        return;
      }
      c.napping = false;
      c.purrTimer = 135;
      if (!c.perched && c.jumpY === 0) c.jumpVy = -4.2;
      c.lovePct = Math.min(100, c.lovePct + 4);
      c.moodText = `Purring warmly under Sayanti's gentle cuddles! 💕🐾`;
      cuddlesGiven++;
      purrHappiness = Math.min(100, purrHappiness + 3);
      petCountForQuest++;
      if (petCountForQuest >= 2) markCatQuest("pet");
      if (playAudio) playGentleCatSound("meow", 1.05);
      floaters.push({ x: c.x, y: c.y - 34, txt: "Meow~! Love you! 💕", life: 1.15, col: "#e11d68" });
      syncCatStatsUI();
    };

    const brushCat = (idx, playAudio = true) => {
      const c = cats[idx];
      if (!c) return;
      selectedCatIdx = idx;
      c.napping = false;
      c.purrTimer = 140;
      c.groomSparkle = 95;
      c.lovePct = Math.min(100, c.lovePct + 5);
      c.moodText = `Groomed & sparkling silky-soft after Sayanti's spa brush! ✨🐾`;
      for (let b = 0; b < 4; b++) {
        spaBubbles.push({
          x: c.x + (Math.random() - 0.5) * 32,
          y: c.y - 12 - Math.random() * 14,
          r: 3 + Math.random() * 4,
          life: 1
        });
      }
      cuddlesGiven++;
      purrHappiness = Math.min(100, purrHappiness + 4);
      markCatQuest("brush");
      if (playAudio) playGentleCatSound("purr");
      if (c.isSoulmate) spawnCoupleHearts(c.x, c.y - 14, 6, false);
      floaters.push({ x: c.x, y: c.y - 34, txt: "✨ Meow~ So Fluffy!", life: 1.1, col: "#8b5cf6" });
      syncCatStatsUI();
    };

    canvas.addEventListener("pointermove", (e) => {
      const pt = getCanvasCoords(e);
      pointer.x = pt.x;
      pointer.y = pt.y;
      pointer.inside = true;

      if (activeMode === "catch") {
        catchGame.targetX = Math.max(52, Math.min(W - 52, pt.x));
        return;
      }
      if (activeMode !== "sanctuary") return;

      if (activeTool === "laser") {
        markCatQuest("play");
      } else if (activeTool === "pet" && pointer.down) {
        const hit = findCatAt(pt.x, pt.y);
        if (hit >= 0) petCat(hit, false);
      } else if (activeTool === "brush" && pointer.down) {
        const hit = findCatAt(pt.x, pt.y);
        if (hit >= 0) brushCat(hit, false);
      } else if (activeTool === "wand") {
        markCatQuest("play");
        cats.forEach((c) => {
          if (!c.isSoulmate && Math.hypot(c.x - pt.x, c.y - pt.y) < 95 && c.jumpY === 0) {
            c.napping = false;
            c.perched = false;
            c.jumpVy = -5.8 - Math.random() * 1.6;
            c.purrTimer = 70;
          }
        });
      }
    });

    canvas.addEventListener("pointerleave", () => { pointer.inside = false; pointer.down = false; });
    window.addEventListener("pointerup", () => { pointer.down = false; });

    canvas.addEventListener("pointerdown", (e) => {
      const pt = getCanvasCoords(e);
      pointer.x = pt.x;
      pointer.y = pt.y;
      pointer.inside = true;
      pointer.down = true;

      if (activeMode === "catch") {
        if (!catchGame.running) startCatchMiniGame();
        catchGame.targetX = Math.max(52, Math.min(W - 52, pt.x));
        return;
      }

      if (activeMode === "pounce") {
        if (!pounceGame.running) {
          startPounceMiniGame();
          return;
        }
        for (const box of pounceBoxes) {
          if (box.active && !box.booped && Math.hypot(pt.x - box.x, pt.y - (box.y - 24)) < 68) {
            box.booped = true;
            box.timer = 14;
            pounceGame.combo++;
            const pts = pounceGame.combo >= 5 ? 3 : pounceGame.combo >= 3 ? 2 : 1;
            pounceGame.score += pts;
            cuddlesGiven += pts;
            playGentleCatSound("meow", 1.08);
            floaters.push({ x: box.x, y: box.y - 58, txt: `Meow! +${pts} 🐾❤️`, life: 1.05, col: "#e11d68" });
            syncMiniGameHUD();
            syncCatStatsUI();
            return;
          }
        }
        return;
      }

      if (Math.hypot(pt.x - foodStation.x, pt.y - foodStation.y) < 58) {
        refillFoodStation();
        return;
      }
      if (Math.hypot(pt.x - napBed.x, pt.y - napBed.y) < 68 && activeTool === "pet") {
        const c = cats.find((k) => !k.isSoulmate) || cats[2];
        if (c) {
          c.perched = false;
          c.targetX = napBed.x + (Math.random() - 0.5) * 28;
          c.targetY = napBed.y - 8;
          c.napping = true;
          c.purrTimer = 130;
          c.moodText = `Tucked snugly into the plush velvet bed by Sayanti! Zzz 💕`;
          playGentleCatSound("purr");
          floaters.push({ x: napBed.x, y: napBed.y - 34, txt: "Cozy Nap Time! 💤💖", life: 1.2, col: "#8b5cf6" });
          syncCatStatsUI();
        }
        return;
      }

      const hit = findCatAt(pt.x, pt.y);
      if (activeTool === "pet") {
        if (hit >= 0) {
          petCat(hit, true);
        } else {
          callRipples.push({ x: pt.x, y: pt.y, r: 8, alpha: 0.9 });
          playGentleCatSound("meow", 1.04);
          const targetY = Math.max(185, Math.min(H - 48, pt.y));
          const sorted = cats
            .map((c, idx) => ({ c, idx, d: Math.hypot(c.x - pt.x, c.y - targetY) }))
            .filter((item) => !item.c.isSoulmate)
            .sort((a, b) => a.d - b.d)
            .slice(0, 2);
          sorted.forEach(({ c, idx }, k) => {
            if (k === 0) selectedCatIdx = idx;
            c.perched = false;
            c.napping = false;
            c.targetX = Math.max(55, Math.min(W - 55, pt.x + (k === 0 ? -18 : 22)));
            c.targetY = targetY;
            c.purrTimer = 95;
            c.jumpVy = -3.5;
            c.moodText = `Meow~! Running happily over to Sayanti's hand! 🐾💕`;
          });
          floaters.push({ x: pt.x, y: pt.y - 14, txt: "Meow~! Coming Sayanti! 🐾", life: 1.05, col: "#e11d68" });
          cuddlesGiven++;
          petCountForQuest++;
          if (petCountForQuest >= 2) markCatQuest("pet");
          syncCatStatsUI();
        }
      } else if (activeTool === "brush") {
        if (hit >= 0) {
          brushCat(hit, true);
        } else {
          const nearestIdx = cats.reduce((best, c, idx) => (Math.hypot(c.x - pt.x, c.y - pt.y) < Math.hypot(cats[best].x - pt.x, cats[best].y - pt.y) ? idx : best), 2);
          cats[nearestIdx].perched = false;
          cats[nearestIdx].napping = false;
          cats[nearestIdx].targetX = pt.x;
          cats[nearestIdx].targetY = Math.max(185, pt.y);
          brushCat(nearestIdx, true);
        }
      } else if (activeTool === "crown") {
        const targetIdx = hit >= 0 ? hit : selectedCatIdx;
        const c = cats[targetIdx];
        if (c) {
          selectedCatIdx = targetIdx;
          const hats = ["👑", "🎀", "🌸", "🧣", "🕶️", "🎩", "🤴"];
          const curIdx = hats.indexOf(c.hat || "");
          c.hat = hats[(curIdx + 1) % hats.length];
          c.purrTimer = 100;
          c.jumpVy = -4.2;
          c.moodText = `Meow~! Showing off ${c.hat} proudly for Queen Sayanti! 🥰`;
          markCatQuest("crown");
          playGentleCatSound("meow", 1.1);
          if (c.isSoulmate) spawnCoupleHearts(c.x, c.y - 14, 7, false);
          floaters.push({ x: c.x, y: c.y - 34, txt: `Meow! ${c.hat}`, life: 1.15, col: "#9333ea" });
          syncCatStatsUI();
        }
      } else if (activeTool === "yarn") {
        yarnBalls.push({
          x: pt.x,
          y: Math.max(180, pt.y),
          vx: (Math.random() - 0.5) * 6.5 || 2.8,
          vy: (Math.random() - 0.5) * 4.5 || -2.2,
          color: ["#f43f7a", "#8b5cf6", "#0ea5e9", "#f59e0b", "#10b981"][yarnBalls.length % 5],
          r: 13
        });
        if (yarnBalls.length > 6) yarnBalls.shift();
        markCatQuest("play");
        cuddlesGiven++;
        playGentleCatSound("meow", 1.06);
        syncCatStatsUI();
      } else if (activeTool === "treat") {
        treats.push({ x: pt.x, y: Math.max(180, pt.y), icon: treats.length % 2 === 0 ? "🐟" : "🥛" });
        if (treats.length > 12) treats.shift();
        markCatQuest("feed");
        playGentleCatSound("meow", 1.02);
      } else if (activeTool === "wand" || activeTool === "laser") {
        markCatQuest("play");
        if (hit >= 0) {
          cats[hit].jumpVy = -6.8;
          petCat(hit, true);
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      if (activeMode !== "catch") return;
      const sec = document.getElementById("view-cathaven");
      if (!sec || !sec.classList.contains("active")) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        catchGame.targetX = Math.max(52, catchGame.targetX - 48);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        catchGame.targetX = Math.min(W - 52, catchGame.targetX + 48);
      }
    });

    function drawCatPlayroomBackdrop() {
      // 1. 3D Two-Tone Luxury Pastel Wall with Wainscoting & Crown Molding
      const wall = ctx.createLinearGradient(0, 0, 0, 174);
      wall.addColorStop(0, "#fff5f9");
      wall.addColorStop(0.7, "#fce7f3");
      wall.addColorStop(1, "#fbcfe8");
      ctx.fillStyle = wall;
      ctx.fillRect(0, 0, W, 174);

      // Subtle vertical wallpaper stripes
      ctx.fillStyle = "rgba(255, 255, 255, 0.42)";
      for (let wx = 20; wx < W; wx += 44) {
        ctx.fillRect(wx, 0, 16, 162);
      }
      // 3D Baseboard Molding
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 162, W, 12);
      ctx.strokeStyle = "#f9a8d4";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 162); ctx.lineTo(W, 162);
      ctx.moveTo(0, 174); ctx.lineTo(W, 174);
      ctx.stroke();

      // 2. 3D Perspective Honey-Oak Hardwood Plank Floor
      const floor = ctx.createLinearGradient(0, 174, 0, H);
      floor.addColorStop(0, "#fef3c7");
      floor.addColorStop(0.5, "#fde68a");
      floor.addColorStop(1, "#fcd34d");
      ctx.fillStyle = floor;
      ctx.fillRect(0, 174, W, H - 174);

      // Perspective plank lines
      ctx.strokeStyle = "rgba(180, 83, 9, 0.14)";
      ctx.lineWidth = 1.2;
      for (let py = 198; py < H; py += 28) {
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
      }
      for (let px = -80; px <= W + 80; px += 95) {
        ctx.beginPath();
        ctx.moveTo(W / 2 + (px - W / 2) * 0.65, 174);
        ctx.lineTo(px, H);
        ctx.stroke();
      }

      // Volumetric Diagonal Sunbeam Rays from the Lapland Bay Window onto the Floor!
      const sunbeam = ctx.createLinearGradient(W / 2, 140, W / 2 + 60, 390);
      sunbeam.addColorStop(0, "rgba(255, 255, 255, 0.34)");
      sunbeam.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = sunbeam;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 115, 146);
      ctx.lineTo(W / 2 + 115, 146);
      ctx.lineTo(W / 2 + 230, 390);
      ctx.lineTo(W / 2 - 175, 390);
      ctx.closePath();
      ctx.fill();

      // 3. Center 3D Arched Snowy Lapland Bay Window with Velvet Window Seat
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(W / 2 - 122, 14, 244, 130, 18);
      ctx.clip();
      const winSky = ctx.createLinearGradient(0, 14, 0, 144);
      winSky.addColorStop(0, "#0f294a");
      winSky.addColorStop(0.45, "#0284c7");
      winSky.addColorStop(1, "#bae6fd");
      ctx.fillStyle = winSky;
      ctx.fillRect(W / 2 - 122, 14, 244, 130);

      // Tiny pine silhouettes & snow hills outside window
      ctx.fillStyle = "#14532d";
      [W / 2 - 88, W / 2 - 62, W / 2 + 72, W / 2 + 95].forEach((tx, idx) => {
        const th = idx % 2 === 0 ? 34 : 26;
        ctx.beginPath(); ctx.moveTo(tx, 128 - th); ctx.lineTo(tx - 13, 128); ctx.lineTo(tx + 13, 128); ctx.fill();
      });
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.ellipse(W / 2 - 50, 138, 86, 20, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(W / 2 + 54, 140, 82, 18, 0, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      windowFlakes.forEach((wf) => {
        wf.y += 0.45;
        if (wf.y > 138) wf.y = 20;
        ctx.beginPath(); ctx.arc(wf.x, wf.y, wf.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.restore();

      // 3D Window Frame + Plush Padded Window Sill Cushion
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.roundRect(W / 2 - 122, 14, 244, 130, 18); ctx.stroke();
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(W / 2, 14); ctx.lineTo(W / 2, 144);
      ctx.moveTo(W / 2 - 122, 79); ctx.lineTo(W / 2 + 122, 79);
      ctx.stroke();
      ctx.fillStyle = "#f472b6";
      ctx.beginPath(); ctx.roundRect(W / 2 - 130, 141, 260, 11, 6); ctx.fill();

      // 4. Left: 3D Multi-Tier Luxury Plush Cat Condo Tower + Dangling Pom-Pom
      // Base platform shadow
      ctx.fillStyle = "rgba(15, 23, 42, 0.14)";
      ctx.beginPath(); ctx.ellipse(104, 244, 66, 12, 0, 0, Math.PI * 2); ctx.fill();
      // Cylindrical 3D Sisal Scratching Posts
      const drawSisalPost = (px, py, pw, ph) => {
        const pg = ctx.createLinearGradient(px, py, px + pw, py);
        pg.addColorStop(0, "#fcd34d");
        pg.addColorStop(0.5, "#d97706");
        pg.addColorStop(1, "#92400e");
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.roundRect(px, py, pw, ph, 4); ctx.fill();
        ctx.strokeStyle = "rgba(254, 243, 199, 0.45)";
        ctx.lineWidth = 1.2;
        for (let sy = py + 5; sy < py + ph - 3; sy += 6) {
          ctx.beginPath(); ctx.moveTo(px + 1, sy); ctx.lineTo(px + pw - 1, sy + 2); ctx.stroke();
        }
      };
      drawSisalPost(86, 118, 18, 112);
      drawSisalPost(110, 184, 16, 48);

      // 3D Cozy Cat Condo Cube Den
      const denG = ctx.createLinearGradient(54, 196, 108, 232);
      denG.addColorStop(0, "#fdf2f8");
      denG.addColorStop(1, "#fbcfe8");
      ctx.fillStyle = denG;
      ctx.strokeStyle = "#f472b6";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(56, 194, 48, 36, 8); ctx.fill(); ctx.stroke();
      // Cute cat-ear arched doorway inside condo den
      ctx.fillStyle = "#831843";
      ctx.beginPath(); ctx.arc(80, 230, 13, Math.PI, 0); ctx.fill();

      // 3D Velvet Perch Platforms
      const drawPerch = (px, py, pw, ph) => {
        const plG = ctx.createLinearGradient(px, py, px, py + ph);
        plG.addColorStop(0, "#fff1f6");
        plG.addColorStop(0.5, "#fbcfe8");
        plG.addColorStop(1, "#f472b6");
        ctx.fillStyle = plG;
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(px, py, pw, ph, 8); ctx.fill(); ctx.stroke();
      };
      drawPerch(52, 110, 88, 16);
      drawPerch(70, 184, 88, 16);
      drawPerch(44, 228, 120, 17);

      // Hanging Pom-Pom Toy on elastic string
      ctx.strokeStyle = "#be185d";
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(134, 126); ctx.lineTo(134, 152); ctx.stroke();
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath(); ctx.arc(134, 156, 6.5, 0, Math.PI * 2); ctx.fill();

      // 5. Right Wall: 3D Framed Sanctuary Plaque with Golden Crown Accent
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.beginPath(); ctx.roundRect(W - 203, 44, 152, 80, 14); ctx.fill();
      const frameG = ctx.createLinearGradient(W - 206, 38, W - 54, 118);
      frameG.addColorStop(0, "#ffffff");
      frameG.addColorStop(1, "#fff1f6");
      ctx.fillStyle = frameG;
      ctx.strokeStyle = "#f472b6";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(W - 206, 38, 152, 80, 14); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#be185d";
      ctx.font = "700 12.5px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🐱 Arunava ❤️ Sayanti", W - 130, 68);
      ctx.fillStyle = "#475569";
      ctx.font = "600 11px 'Inter', sans-serif";
      ctx.fillText("Purr & Love Sanctuary", W - 130, 89);
      ctx.fillStyle = "#0284c7";
      ctx.font = "700 9.5px 'Inter', sans-serif";
      ctx.fillText("✨ Roam • Meet • Cuddle • Kiss ✨", W - 130, 106);

      // 6. Center 3D Tufted Plush Pastel Heart Rug
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.beginPath(); ctx.ellipse(W / 2, 316, 250, 86, 0, 0, Math.PI * 2); ctx.fill();
      const rugG = ctx.createRadialGradient(W / 2 - 40, 290, 20, W / 2, 312, 248);
      rugG.addColorStop(0, "#ffffff");
      rugG.addColorStop(0.65, "#fff0f6");
      rugG.addColorStop(1, "#fbcfe8");
      ctx.fillStyle = rugG;
      ctx.strokeStyle = "#f472b6";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.ellipse(W / 2, 312, 246, 83, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Inner quilted stitch border
      ctx.save();
      ctx.strokeStyle = "rgba(225, 29, 104, 0.28)";
      ctx.lineWidth = 1.6;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.ellipse(W / 2, 312, 232, 73, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (activeMode === "sanctuary") {
        // 7. Bottom-Left: 3D Ceramic Salmon & Warm Milk Bowls on Oak Feeding Tray
        ctx.fillStyle = "rgba(15, 23, 42, 0.14)";
        ctx.beginPath(); ctx.roundRect(foodStation.x - 66, foodStation.y - 13, 132, 36, 13); ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.roundRect(foodStation.x - 64, foodStation.y - 16, 128, 34, 12); ctx.fill(); ctx.stroke();

        // 3D Salmon Bowl
        ctx.fillStyle = "#e11d68";
        ctx.beginPath(); ctx.ellipse(foodStation.x - 27, foodStation.y + 2, 23, 11, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fda4af";
        ctx.beginPath(); ctx.ellipse(foodStation.x - 27, foodStation.y - 1, 21, 9, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fb923c";
        ctx.beginPath(); ctx.ellipse(foodStation.x - 27, foodStation.y - 2, 16, 6, 0, 0, Math.PI * 2); ctx.fill();

        // 3D Warm Milk Bowl
        ctx.fillStyle = "#0284c7";
        ctx.beginPath(); ctx.ellipse(foodStation.x + 27, foodStation.y + 2, 23, 11, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#7dd3fc";
        ctx.beginPath(); ctx.ellipse(foodStation.x + 27, foodStation.y - 1, 21, 9, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.ellipse(foodStation.x + 27, foodStation.y - 2, 16.5, 6.2, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#0369a1";
        ctx.font = "700 10.5px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🥣 Tap to Fill Bowls", foodStation.x, foodStation.y + 29);

        // 8. Bottom-Right: 3D Bolstered Royal Velvet Kitty Nap Cushion
        ctx.fillStyle = "rgba(15, 23, 42, 0.16)";
        ctx.beginPath(); ctx.ellipse(napBed.x, napBed.y + 5, napBed.rx + 4, napBed.ry + 2, 0, 0, Math.PI * 2); ctx.fill();
        const bedG = ctx.createRadialGradient(napBed.x - 18, napBed.y - 12, 8, napBed.x, napBed.y, napBed.rx);
        bedG.addColorStop(0, "#f5f3ff");
        bedG.addColorStop(0.55, "#ddd6fe");
        bedG.addColorStop(1, "#a78bfa");
        ctx.fillStyle = bedG;
        ctx.strokeStyle = "#7c3aed";
        ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.ellipse(napBed.x, napBed.y, napBed.rx, napBed.ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

        const innerBedG = ctx.createRadialGradient(napBed.x - 10, napBed.y - 4, 4, napBed.x, napBed.y + 2, napBed.rx - 15);
        innerBedG.addColorStop(0, "#ffffff");
        innerBedG.addColorStop(1, "#ede9fe");
        ctx.fillStyle = innerBedG;
        ctx.beginPath(); ctx.ellipse(napBed.x, napBed.y + 2, napBed.rx - 15, napBed.ry - 9, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#5b21b6";
        ctx.font = "700 10.5px 'Inter', sans-serif";
        ctx.fillText("🛏️ Velvet Kitty Nap Bed", napBed.x, napBed.y + 45);

        // Cozy Glowing Brass Corner Lamp & Warm Steam Wisps on Fresh Bowls
        const lampX = W - 46, lampY = 232;
        const lampGlow = ctx.createRadialGradient(lampX, lampY - 58, 4, lampX, lampY - 58, 72);
        lampGlow.addColorStop(0, "rgba(254, 240, 138, 0.55)");
        lampGlow.addColorStop(1, "rgba(254, 240, 138, 0)");
        ctx.fillStyle = lampGlow;
        ctx.beginPath(); ctx.arc(lampX, lampY - 58, 72, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#b45309"; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(lampX, lampY); ctx.lineTo(lampX, lampY - 54); ctx.stroke();
        ctx.fillStyle = "#d97706";
        ctx.beginPath(); ctx.ellipse(lampX, lampY + 2, 16, 5, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fef3c7"; ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(lampX - 18, lampY - 46);
        ctx.lineTo(lampX - 11, lampY - 68);
        ctx.lineTo(lampX + 11, lampY - 68);
        ctx.lineTo(lampX + 18, lampY - 46);
        ctx.closePath(); ctx.fill(); ctx.stroke();
      }
    }

    // TRUE 3D VOLUMETRIC PIXAR/CHIBI CAT RENDERER
    function drawCuteCat(c, isSelected, overrideX = null, overrideY = null, suppressNamePill = false) {
      const cx = overrideX !== null ? overrideX : c.x;
      const cy = overrideY !== null ? overrideY : (c.y + c.jumpY);
      const isMoving = Math.hypot(c.vx || 0, c.vy || 0) > 0.2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(c.scale || 1, c.scale || 1);

      const coatBase = c.coat || "#ffffff";
      const coatHighlight = adjustHexColor(coatBase, 24);
      const coatShadow = coatBase === "#ffffff" || coatBase === "#f8fafc"
        ? "#cbd5e1"
        : coatBase === "#fff0f6"
        ? "#f9a8d4"
        : adjustHexColor(coatBase, -22);
      const darkCoat = coatBase === "#334155" || coatBase === "#475569" || coatBase === "#64748b";

      // 1. 3D Soft Cast Ground Shadow
      const shG = ctx.createRadialGradient(0, 24 - (c.jumpY || 0) * 0.45, 3, 0, 24 - (c.jumpY || 0) * 0.45, 30);
      shG.addColorStop(0, "rgba(15, 23, 42, 0.25)");
      shG.addColorStop(1, "rgba(15, 23, 42, 0)");
      ctx.fillStyle = shG;
      ctx.beginPath();
      ctx.ellipse(0, 24 - (c.jumpY || 0) * 0.45, 29, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glowing 3D selection / soulmate floor ring
      if ((isSelected || c.isSoulmate) && activeMode === "sanctuary") {
        ctx.strokeStyle = c.isSoulmate ? "rgba(225, 29, 104, 0.72)" : "rgba(14, 165, 233, 0.65)";
        ctx.lineWidth = 2.2;
        ctx.setLineDash(c.isSoulmate ? [] : [4, 3]);
        ctx.beginPath();
        ctx.ellipse(0, 23, 32, 11, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. 3D Volumetric Swishing Tail
      const wag = Math.sin(c.tailPhase) * (c.purrTimer > 0 ? 12 : 7.5);
      ctx.strokeStyle = coatShadow;
      ctx.lineWidth = 8.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-15 * c.facing, 9);
      ctx.quadraticCurveTo(-33 * c.facing, -5 + wag, -27 * c.facing, -20 + wag * 0.6);
      ctx.stroke();

      ctx.strokeStyle = coatBase;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-15 * c.facing, 9);
      ctx.quadraticCurveTo(-32 * c.facing, -5 + wag, -27 * c.facing, -20 + wag * 0.6);
      ctx.stroke();

      // 3. 3D Chubby Torso with Spherical Subsurface Fur Gradient
      const bodyG = ctx.createRadialGradient(-6 * c.facing, -2, 3, 0, 7, 25);
      bodyG.addColorStop(0, coatHighlight);
      bodyG.addColorStop(0.6, coatBase);
      bodyG.addColorStop(1, coatShadow);
      ctx.fillStyle = bodyG;
      ctx.strokeStyle = c.isSoulmate ? "rgba(190, 24, 93, 0.52)" : "rgba(51, 65, 85, 0.42)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.ellipse(0, 7.5, 23.5, 16.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cute tabby back stripes
      ctx.fillStyle = c.stripe || coatShadow;
      ctx.beginPath(); ctx.ellipse(-5 * c.facing, -4.5, 3.2, 6.5, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-11.5 * c.facing, -2.5, 2.8, 5.4, 0.2, 0, Math.PI * 2); ctx.fill();

      // Soft 3D Cream Belly Patch
      const bellyG = ctx.createRadialGradient(3 * c.facing, 9, 2, 4 * c.facing, 11, 13);
      bellyG.addColorStop(0, "#ffffff");
      bellyG.addColorStop(1, c.patch || "#f8fafc");
      ctx.fillStyle = bellyG;
      ctx.beginPath();
      ctx.ellipse(4 * c.facing, 10.5, 12.5, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4. Four 3D Sculpted Bobbing Paws with Pink Toe-Bean Hints
      const pawBob = isMoving ? Math.sin(c.walkCycle) * 3.8 : 0;
      [
        [-13, 19.5 + pawBob],
        [-4.5, 21.5 - pawBob],
        [6.5, 21.5 + pawBob],
        [14, 19.5 - pawBob]
      ].forEach(([px, py]) => {
        const pg = ctx.createRadialGradient(px - 1, py - 1.5, 0.8, px, py, 5.6);
        pg.addColorStop(0, "#ffffff");
        pg.addColorStop(1, "#cbd5e1");
        ctx.fillStyle = pg;
        ctx.strokeStyle = "rgba(51, 65, 85, 0.42)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(px, py, 5.2, 3.9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Tiny pink toe-bean dot
        ctx.fillStyle = "rgba(244, 63, 122, 0.45)";
        ctx.beginPath();
        ctx.arc(px + 0.8 * c.facing, py + 0.8, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. 3D Satin Collar + Metallic Golden Heart/Bell Charm
      ctx.strokeStyle = c.collar || "#e11d68";
      ctx.lineWidth = 3.6;
      ctx.beginPath();
      ctx.arc(5 * c.facing, -2, 11.8, 0.18, Math.PI - 0.18);
      ctx.stroke();
      const bellG = ctx.createRadialGradient(6 * c.facing, 7.5, 0.5, 7 * c.facing, 8.5, 4.2);
      bellG.addColorStop(0, "#fef08a");
      bellG.addColorStop(0.6, "#eab308");
      bellG.addColorStop(1, "#a16207");
      ctx.fillStyle = bellG;
      ctx.beginPath();
      ctx.arc(7 * c.facing, 8.5, 3.8, 0, Math.PI * 2);
      ctx.fill();

      // 6. 3D Volumetric Kitty Head & Sculpted Ears
      const hx = 6.5 * c.facing;
      const hy = -11.5;

      // Outer 3D Ears
      ctx.fillStyle = bodyG;
      ctx.strokeStyle = c.isSoulmate ? "rgba(190, 24, 93, 0.55)" : "rgba(51, 65, 85, 0.45)";
      ctx.lineWidth = 1.5;
      [
        [hx - 15, hy - 5, hx - 19.5, hy - 25, hx - 4, hy - 14.5],
        [hx + 4, hy - 14.5, hx + 19.5, hy - 25, hx + 15, hy - 5]
      ].forEach(([x1, y1, x2, y2, x3, y3]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(x2, y2 - 2, x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Inner 3D Pink Ear Concha Gradient
      const earG = ctx.createLinearGradient(hx, hy - 23, hx, hy - 7);
      earG.addColorStop(0, "#fda4af");
      earG.addColorStop(1, c.ear || "#fb7185");
      ctx.fillStyle = earG;
      ctx.beginPath();
      ctx.moveTo(hx - 12.5, hy - 7); ctx.lineTo(hx - 15.8, hy - 19.8); ctx.lineTo(hx - 6, hy - 12.8); ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(hx + 6, hy - 12.8); ctx.lineTo(hx + 15.8, hy - 19.8); ctx.lineTo(hx + 12.5, hy - 7); ctx.closePath(); ctx.fill();

      // Plump 3D Spherical Head with Cheek Puff
      const headG = ctx.createRadialGradient(hx - 5 * c.facing, hy - 6, 2, hx, hy, 18.5);
      headG.addColorStop(0, coatHighlight);
      headG.addColorStop(0.62, coatBase);
      headG.addColorStop(1, coatShadow);
      ctx.fillStyle = headG;
      ctx.beginPath();
      ctx.ellipse(hx, hy, 17.5, 15.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Forehead tabby "M" crown mark
      ctx.strokeStyle = c.stripe || coatShadow;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(hx - 4.5, hy - 11.5); ctx.lineTo(hx - 1.5, hy - 8.5); ctx.lineTo(hx, hy - 11); ctx.lineTo(hx + 1.5, hy - 8.5); ctx.lineTo(hx + 4.5, hy - 11.5);
      ctx.stroke();

      // Delicate Curved Whiskers
      ctx.strokeStyle = darkCoat ? "rgba(248, 250, 252, 0.55)" : "rgba(71, 85, 105, 0.48)";
      ctx.lineWidth = 1.15;
      [-2, 1.2, 4.2].forEach((wy, wi) => {
        ctx.beginPath(); ctx.moveTo(hx - 12, hy + wy); ctx.lineTo(hx - 23, hy + wy + (wi - 1) * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(hx + 12, hy + wy); ctx.lineTo(hx + 23, hy + wy + (wi - 1) * 2); ctx.stroke();
      });

      // Glowing 3D Blush Cheeks
      [hx - 10.5, hx + 10.5].forEach((bx) => {
        const bg = ctx.createRadialGradient(bx, hy + 3, 0.5, bx, hy + 3, 4.8);
        bg.addColorStop(0, "rgba(244, 63, 122, 0.6)");
        bg.addColorStop(1, "rgba(244, 63, 122, 0)");
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.arc(bx, hy + 3, 4.8, 0, Math.PI * 2); ctx.fill();
      });

      // 7. 3D Glossy Anime / Pixar Kitty Eyes
      if (c.napping) {
        ctx.strokeStyle = darkCoat ? "#fef08a" : "#1e293b";
        ctx.lineWidth = 2.1;
        ctx.beginPath(); ctx.arc(hx - 6, hy - 1, 3.6, 0, Math.PI); ctx.stroke();
        ctx.beginPath(); ctx.arc(hx + 6, hy - 1, 3.6, 0, Math.PI); ctx.stroke();
      } else if (c.purrTimer > 0 || c.blinkTimer < 6) {
        ctx.strokeStyle = darkCoat ? "#fef08a" : "#1e293b";
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.arc(hx - 6, hy - 0.5, 3.8, Math.PI, 0); ctx.stroke();
        ctx.beginPath(); ctx.arc(hx + 6, hy - 0.5, 3.8, Math.PI, 0); ctx.stroke();
      } else {
        [hx - 6, hx + 6].forEach((ex) => {
          const irisCol = c.role === "sayanti" ? "#ec4899" : c.role === "arunava" ? "#0284c7" : (darkCoat ? "#eab308" : "#334155");
          const eg = ctx.createRadialGradient(ex - 0.8, hy - 2.5, 0.4, ex, hy - 1.8, 3.9);
          eg.addColorStop(0, irisCol);
          eg.addColorStop(0.55, "#0f172a");
          eg.addColorStop(1, "#020617");
          ctx.fillStyle = eg;
          ctx.beginPath(); ctx.arc(ex, hy - 1.8, 3.7, 0, Math.PI * 2); ctx.fill();

          // Big top-left starlight catchlight + bottom-right dewdrop catchlight
          ctx.fillStyle = "#ffffff";
          ctx.beginPath(); ctx.arc(ex - 1.2, hy - 3, 1.35, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ex + 1.1, hy - 0.7, 0.7, 0, Math.PI * 2); ctx.fill();
        });
      }

      // Lush Curled Queen Eyelashes for Sayanti Cat!
      if (c.role === "sayanti") {
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(hx - 8.8, hy - 3.5); ctx.lineTo(hx - 11.8, hy - 6.5);
        ctx.moveTo(hx + 8.8, hy - 3.5); ctx.lineTo(hx + 11.8, hy - 6.5);
        ctx.stroke();
      }

      // 8. 3D Sculpted Muzzle Pads ("ω"), Pink Heart Nose & Cute Tongue Blep
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.arc(hx - 2.4, hy + 2.8, 2.8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(hx + 2.4, hy + 2.8, 2.8, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.moveTo(hx, hy + 2.6);
      ctx.lineTo(hx - 2.3, hy + 0.4);
      ctx.lineTo(hx + 2.3, hy + 0.4);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = darkCoat ? "#334155" : "#475569";
      ctx.lineWidth = 1.45;
      ctx.beginPath();
      ctx.arc(hx - 2.3, hy + 3.2, 2.3, 0, Math.PI);
      ctx.arc(hx + 2.3, hy + 3.2, 2.3, 0, Math.PI);
      ctx.stroke();

      if (c.purrTimer > 0 && !c.napping) {
        ctx.fillStyle = "#fb7185";
        ctx.beginPath();
        ctx.arc(hx, hy + 5.2, 1.6, 0, Math.PI);
        ctx.fill();
      }

      // 9. 3D Glossy Hat / Crown Sprite
      if (c.hat) {
        draw3DSpriteOrEmoji(ctx, c.hat, hx, hy - 21, 19);
      }
      if (c.groomSparkle > 0) {
        draw3DSpriteOrEmoji(ctx, "✨", hx + 17, hy - 16, 14);
      }
      if (c.napping && activeMode === "sanctuary") {
        ctx.font = "700 11px 'Inter', sans-serif";
        ctx.fillStyle = "#7c3aed";
        ctx.fillText("Zzz 💕", hx + 15, hy - 22);
      }

      // 10. Frosted Name Pill below paws (suppressed when united couple badge is shown)
      if (!suppressNamePill) {
        ctx.font = "700 10.5px 'Inter', sans-serif";
        ctx.textAlign = "center";
        const displayLbl = c.role === "arunava" ? "Arunava 🤴❤️" : c.role === "sayanti" ? "Sayanti 👑💖" : c.name;
        const nw = Math.max(44, ctx.measureText(displayLbl).width + 14);
        ctx.fillStyle = c.isSoulmate ? "rgba(255, 240, 246, 0.96)" : "rgba(255, 255, 255, 0.93)";
        ctx.beginPath();
        ctx.roundRect(-nw / 2, 25.5, nw, 16.5, 8.5);
        ctx.fill();
        ctx.strokeStyle = c.isSoulmate ? "#e11d68" : "rgba(148, 163, 184, 0.45)";
        ctx.lineWidth = c.isSoulmate ? 1.5 : 1;
        ctx.stroke();
        ctx.fillStyle = c.isSoulmate ? "#be185d" : "#0f172a";
        ctx.textBaseline = "middle";
        ctx.fillText(displayLbl, 0, 33.8);
      }

      ctx.restore();
    }

    // Autonomous Roam -> Seek -> Meet & Reunion Engine for Arunava & Sayanti Couple Cats!
    function updateAndDrawSoulmateCouple(now) {
      const aru = cats[0];
      const say = cats[1];
      if (!aru || !say) return;
      const curMs = now || performance.now();
      const t = curMs * 0.001;

      // If chasing laser, let them chase freely
      if (activeTool === "laser" && pointer.inside) return;

      if (coupleState.phase === "reunion") {
        // Phase 1: Romantic Reunion together (Kiss, Cuddle, Dance, Rose, "I love you")
        const cx = coupleState.meetX;
        const cy = coupleState.meetY;
        let targetGap = 23;
        if (coupleState.act === "kiss") targetGap = 17;
        else if (coupleState.act === "cuddle") targetGap = 15.5;
        else if (coupleState.act === "dance") targetGap = 28 + Math.sin(t * 4.2) * 6;

        const swayY = coupleState.act === "dance" ? Math.sin(t * 4.4) * 8 : Math.sin(t * 2.2) * 2;
        aru.vx += ((cx - targetGap) - aru.x) * 0.095;
        aru.vy += ((cy + swayY) - aru.y) * 0.095;
        say.vx += ((cx + targetGap) - say.x) * 0.095;
        say.vy += ((cy - swayY) - say.y) * 0.095;
        aru.facing = 1;
        say.facing = -1;

        const dist = Math.hypot(aru.x - say.x, aru.y - say.y);
        if (dist < 68 && Math.random() < 0.09) {
          spawnCoupleHearts((aru.x + say.x) / 2, (aru.y + say.y) / 2 - 16, 1, coupleState.act === "kiss");
        }

        // After finishing their romantic reunion moment, set off to ROAM around the playroom!
        if (curMs >= (coupleState.phaseEndTs || 0)) {
          startSoulmateRoamingApart();
        }
      } else if (coupleState.phase === "roaming") {
        // Phase 2: Roaming freely & independently around different parts of the playroom!
        const aruDx = coupleState.aruRoamX - aru.x;
        const aruDy = coupleState.aruRoamY - aru.y;
        const aruDist = Math.hypot(aruDx, aruDy);
        if (aruDist > 14) {
          aru.vx += (aruDx / aruDist) * 0.34;
          aru.vy += (aruDy / aruDist) * 0.3;
          aru.facing = aruDx >= 0 ? 1 : -1;
        } else if (Math.random() < 0.04) {
          coupleState.aruRoamX = 140 + Math.random() * 195;
          coupleState.aruRoamY = 215 + Math.random() * 140;
        }

        const sayDx = coupleState.sayRoamX - say.x;
        const sayDy = coupleState.sayRoamY - say.y;
        const sayDist = Math.hypot(sayDx, sayDy);
        if (sayDist > 14) {
          say.vx += (sayDx / sayDist) * 0.34;
          say.vy += (sayDy / sayDist) * 0.3;
          say.facing = sayDx >= 0 ? 1 : -1;
        } else if (Math.random() < 0.04) {
          coupleState.sayRoamX = W - 335 + Math.random() * 195;
          coupleState.sayRoamY = 215 + Math.random() * 140;
        }

        // When roam timer finishes -> transition to "seeking" (running back together to meet!)
        if (curMs >= (coupleState.phaseEndTs || 0)) {
          coupleState.phase = "seeking";
          coupleState.phaseEndTs = curMs + 2800;
          coupleState.meetX = W / 2 + (Math.random() - 0.5) * 140;
          coupleState.meetY = 275 + (Math.random() - 0.5) * 55;
          coupleState.arunavaSpeech = "Running to meet my Queen Sayanti! Meow~! 🐾💓";
          coupleState.sayantiSpeech = "Coming to my Arunava kitty! Meow~! 💕🐾";
          aru.moodText = "Running across the playroom to meet Queen Sayanti! 🐾💓";
          say.moodText = "Trotting happily to meet Arunava kitty in the middle! 💕🐾";
          syncCatStatsUI();
          playGentleCatSound("meow", 1.06);
        }
      } else if (coupleState.phase === "seeking") {
        // Phase 3: Running toward each other from across the room to MEET!
        const txAru = coupleState.meetX - 18;
        const tyAru = coupleState.meetY;
        const txSay = coupleState.meetX + 18;
        const tySay = coupleState.meetY;

        const dAru = Math.hypot(txAru - aru.x, tyAru - aru.y) || 1;
        const dSay = Math.hypot(txSay - say.x, tySay - say.y) || 1;
        aru.vx += ((txAru - aru.x) / dAru) * 0.46;
        aru.vy += ((tyAru - aru.y) / dAru) * 0.42;
        say.vx += ((txSay - say.x) / dSay) * 0.46;
        say.vy += ((tySay - say.y) / dSay) * 0.42;
        aru.facing = txAru >= aru.x ? 1 : -1;
        say.facing = txSay >= say.x ? 1 : -1;

        const pairDist = Math.hypot(aru.x - say.x, aru.y - say.y);
        // The moment they meet -> burst of Love Hearts + trigger next romantic Reunion act (kiss/cuddle/iloveyou/rose/dance)!
        if (pairDist < 56 || curMs >= (coupleState.phaseEndTs || 0)) {
          const order = ["kiss", "cuddle", "iloveyou", "rose", "dance"];
          const nextAct = order[(order.indexOf(coupleState.act) + 1) % order.length];
          spawnCoupleHearts((aru.x + say.x) / 2, (aru.y + say.y) / 2 - 14, 12, true);
          triggerSoulmateCoupleRomance(nextAct, nextAct === "kiss" || nextAct === "rose");
        }
      }
    }

    function renderSanctuaryMode(now) {
      for (let i = callRipples.length - 1; i >= 0; i--) {
        const rp = callRipples[i];
        rp.r += 1.6;
        rp.alpha -= 0.028;
        if (rp.alpha <= 0) { callRipples.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(225, 29, 104, ${rp.alpha})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
      }

      yarnBalls.forEach((yb) => {
        yb.x += yb.vx;
        yb.y += yb.vy;
        yb.vx *= 0.988;
        yb.vy *= 0.988;
        if (yb.x < 36 || yb.x > W - 36) yb.vx *= -0.86;
        if (yb.y < 180 || yb.y > H - 26) yb.vy *= -0.86;
        yb.x = Math.max(36, Math.min(W - 36, yb.x));
        yb.y = Math.max(180, Math.min(H - 26, yb.y));

        ctx.fillStyle = yb.color;
        ctx.beginPath(); ctx.arc(yb.x, yb.y, yb.r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(yb.x, yb.y, yb.r * 0.65, 0.3, 2.5); ctx.stroke();
      });

      treats.forEach((tr) => {
        ctx.font = "21px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(tr.icon, tr.x, tr.y);
      });

      updateAndDrawSoulmateCouple(now);

      cats.forEach((c) => {
        c.tailPhase += c.purrTimer > 0 ? 0.22 : 0.09;
        if (c.purrTimer > 0) c.purrTimer--;
        if (c.groomSparkle > 0) c.groomSparkle--;
        c.blinkTimer = (c.blinkTimer - 1 + 180) % 180;

        if (c.jumpY < 0 || c.jumpVy !== 0) {
          c.jumpY += c.jumpVy;
          c.jumpVy += 0.44;
          if (c.jumpY >= 0) { c.jumpY = 0; c.jumpVy = 0; }
        }

        if (activeTool === "laser" && pointer.inside) {
          c.perched = false;
          c.napping = false;
          const dx = pointer.x - c.x;
          const dy = Math.max(182, pointer.y) - c.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist > 18) {
            c.vx += (dx / dist) * 0.42;
            c.vy += (dy / dist) * 0.36;
          } else if (c.jumpY === 0 && Math.random() < 0.1) {
            c.jumpVy = -4.6;
          }
        } else if (!c.isSoulmate) {
          if (treats.length > 0 && !c.perched) {
            const nearest = treats[0];
            const dx = nearest.x - c.x;
            const dy = nearest.y - c.y;
            const dist = Math.hypot(dx, dy) || 1;
            c.napping = false;
            c.vx += (dx / dist) * 0.28;
            c.vy += (dy / dist) * 0.24;
            if (dist < 26) {
              const eaten = treats.shift();
              c.purrTimer = 130;
              c.lovePct = Math.min(100, c.lovePct + 5);
              c.moodText = `Meow~! Just enjoyed tasty ${eaten.icon} from Sayanti! 💕`;
              cuddlesGiven++;
              purrHappiness = Math.min(100, purrHappiness + 4);
              markCatQuest("feed");
              playGentleCatSound("meow", 1.06);
              floaters.push({ x: c.x, y: c.y - 30, txt: `Meow! Nom ${eaten.icon}❤️`, life: 1.1, col: "#0284c7" });
              syncCatStatsUI();
            }
          } else if (c.targetX !== null && c.targetY !== null) {
            const dx = c.targetX - c.x;
            const dy = c.targetY - c.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 10) {
              c.vx += (dx / dist) * 0.36;
              c.vy += (dy / dist) * 0.32;
            } else {
              c.targetX = null;
              c.targetY = null;
              c.vx *= 0.4;
              c.vy *= 0.4;
            }
          } else if (!c.perched && !c.napping) {
            if (yarnBalls.length > 0 && Math.random() < 0.05) {
              const yb = yarnBalls[0];
              if (Math.hypot(yb.x - c.x, yb.y - c.y) < 125) {
                c.vx += (yb.x - c.x) * 0.016;
                c.vy += (yb.y - c.y) * 0.016;
              }
            } else if (Math.random() < 0.022) {
              c.vx += (Math.random() - 0.5) * 1.15;
              c.vy += (Math.random() - 0.5) * 0.95;
            }
          }
        }

        yarnBalls.forEach((yb) => {
          const dx = yb.x - c.x;
          const dy = yb.y - c.y;
          const d = Math.hypot(dx, dy);
          if (d < 32 && d > 0.1) {
            yb.vx = (dx / d) * 3.8;
            yb.vy = (dy / d) * 3.0;
          }
        });

        // Polite personal-space halo so playful kittens don't stand directly on top of Arunava & Sayanti during cuddles/kisses!
        if (!c.isSoulmate && !c.perched && !c.napping && cats[0] && cats[1]) {
          const cmx = (cats[0].x + cats[1].x) / 2;
          const cmy = (cats[0].y + cats[1].y) / 2;
          const cPairD = Math.hypot(cats[0].x - cats[1].x, cats[0].y - cats[1].y);
          if (cPairD < 95) {
            const dxC = c.x - cmx;
            const dyC = c.y - cmy;
            const dC = Math.hypot(dxC, dyC) || 1;
            if (dC < 92) {
              c.vx += (dxC / dC) * 0.45;
              c.vy += (dyC / dC) * 0.35;
            }
          }
        }

        c.vx *= c.isSoulmate ? 0.78 : 0.91;
        c.vy *= c.isSoulmate ? 0.78 : 0.91;
        if (!c.perched) {
          c.x = Math.max(48, Math.min(W - 48, c.x + c.vx));
          c.y = Math.max(185, Math.min(H - 48, c.y + c.vy));
        }
        if (Math.hypot(c.vx, c.vy) > 0.2) {
          c.walkCycle += 0.34;
          if (!c.isSoulmate && Math.abs(c.vx) > 0.14) c.facing = c.vx > 0 ? 1 : -1;
        }
      });

      // Soft Couple Glow Halo beneath Arunava & Sayanti when meeting
      const aru = cats[0], say = cats[1];
      const pairDist = aru && say ? Math.hypot(aru.x - say.x, aru.y - say.y) : 999;
      const uniteCouplePill = Boolean(aru && say && pairDist < 90);
      if (aru && say && pairDist < 92) {
        const mx = (aru.x + say.x) / 2;
        const my = (aru.y + say.y) / 2;
        const glow = ctx.createRadialGradient(mx, my, 8, mx, my, 74);
        glow.addColorStop(0, "rgba(244, 63, 122, 0.3)");
        glow.addColorStop(1, "rgba(244, 63, 122, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(mx, my, 74, 0, Math.PI * 2); ctx.fill();
      }

      const drawOrder = cats.map((c, idx) => ({ c, idx })).sort((a, b) => a.c.y - b.c.y);
      drawOrder.forEach(({ c, idx }) => drawCuteCat(c, idx === selectedCatIdx, null, null, uniteCouplePill && Boolean(c.isSoulmate)));

      // Unified Royal Couple Name Pill when Arunava & Sayanti are snuggled/kissing together — ZERO overlap!
      if (uniteCouplePill) {
        ctx.save();
        const cmx = (aru.x + say.x) / 2;
        const cmy = Math.max(aru.y + aru.jumpY, say.y + say.jumpY) + 34;
        ctx.font = "700 10.8px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const cLbl = "Arunava 🤴 ❤️ Sayanti 👑";
        const cw = ctx.measureText(cLbl).width + 18;
        ctx.fillStyle = "rgba(255, 240, 246, 0.97)";
        ctx.strokeStyle = "#e11d68";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.roundRect(cmx - cw / 2, cmy - 9, cw, 18, 9);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#be185d";
        ctx.fillText(cLbl, cmx, cmy);
        ctx.restore();
      }

      // Draw Clean Wrapped Anti-Collision Speech Bubbles & Kiss/Rose/Heart Emblem for Arunava & Sayanti!
      if (aru && say) {
        if (pairDist < 88) {
          const mx = (aru.x + say.x) / 2;
          const my = Math.min(aru.y + aru.jumpY, say.y + say.jumpY) - 30;
          const embSym = coupleState.act === "kiss" ? "💋" : coupleState.act === "rose" ? "🌹" : "❤️";
          draw3DSpriteOrEmoji(ctx, embSym, mx, my, 24);
          drawPairSpeechCallouts(
            ctx,
            W,
            H,
            { x: aru.x, y: aru.y + aru.jumpY - 34, text: coupleState.arunavaSpeech, color: "#0284c7" },
            { x: say.x, y: say.y + say.jumpY - 34, text: coupleState.sayantiSpeech, color: "#e11d68" }
          );
        } else if (coupleState.phase === "seeking" || coupleState.phase === "roaming") {
          drawPairSpeechCallouts(
            ctx,
            W,
            H,
            { x: aru.x, y: aru.y + aru.jumpY - 34, text: coupleState.arunavaSpeech, color: "#0284c7" },
            { x: say.x, y: say.y + say.jumpY - 34, text: coupleState.sayantiSpeech, color: "#e11d68" }
          );
        }
      }

      // Rising 3D Glossy Couple Love Hearts
      for (let i = coupleHearts.length - 1; i >= 0; i--) {
        const ch = coupleHearts[i];
        ch.x += ch.vx;
        ch.y += ch.vy;
        ch.life -= 0.017;
        if (ch.life <= 0) { coupleHearts.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, ch.life));
        draw3DSpriteOrEmoji(ctx, ch.sym, ch.x, ch.y, 19);
        ctx.restore();
      }

      for (let i = spaBubbles.length - 1; i >= 0; i--) {
        const b = spaBubbles[i];
        b.y -= 0.7;
        b.life -= 0.025;
        if (b.life <= 0) { spaBubbles.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(56, 189, 248, ${b.life})`;
        ctx.fillStyle = `rgba(224, 242, 254, ${b.life * 0.55})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }

      if (pointer.inside && activeTool === "laser") {
        ctx.strokeStyle = "rgba(239, 68, 68, 0.24)";
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(W - 24, 18); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
        ctx.beginPath(); ctx.arc(pointer.x, pointer.y, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ef4444";
        ctx.beginPath(); ctx.arc(pointer.x, pointer.y, 5.5, 0, Math.PI * 2); ctx.fill();
      } else if (pointer.inside && activeTool === "wand") {
        ctx.strokeStyle = "#9333ea";
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(pointer.x + 30, pointer.y - 36); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        ctx.font = "21px sans-serif";
        ctx.fillText("🪶", pointer.x - 10, pointer.y + 8);
      } else if (pointer.inside && activeTool === "brush") {
        ctx.font = "20px sans-serif";
        ctx.fillText("🪮", pointer.x - 8, pointer.y + 6);
      }
    }

    function renderCatchMiniGameMode() {
      const hero = cats[selectedCatIdx] || cats[1] || cats[0];
      const prevX = catchGame.heroX;
      catchGame.heroX += (catchGame.targetX - catchGame.heroX) * 0.24;
      hero.vx = catchGame.heroX - prevX;
      hero.vy = 0;
      if (Math.abs(hero.vx) > 0.2) {
        hero.facing = hero.vx > 0 ? 1 : -1;
        hero.walkCycle += 0.45;
      }
      hero.tailPhase += 0.2;

      if (catchGame.running) {
        catchGame.spawnTick++;
        if (catchGame.spawnTick >= 30) {
          catchGame.spawnTick = 0;
          const bad = Math.random() < 0.18;
          const pool = [
            { icon: "🐟", pts: 2, bg: "#fff1f2" },
            { icon: "🥛", pts: 2, bg: "#f0f9ff" },
            { icon: "🧶", pts: 3, bg: "#f5f3ff" },
            { icon: "💖", pts: 4, bg: "#fdf2f8" }
          ];
          const pick = bad ? { icon: "💦", pts: 0, bg: "#e0f2fe", bad: true } : pool[Math.floor(Math.random() * pool.length)];
          catchGame.items.push({
            x: 60 + Math.random() * (W - 120),
            y: -20,
            vy: 2.6 + Math.min(3, catchGame.score * 0.04) + Math.random() * 1.2,
            ...pick
          });
        }

        for (let i = catchGame.items.length - 1; i >= 0; i--) {
          const it = catchGame.items[i];
          it.y += it.vy;
          ctx.fillStyle = it.bg;
          ctx.strokeStyle = it.bad ? "#0284c7" : "#f43f7a";
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(it.x, it.y, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.font = "20px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(it.icon, it.x, it.y + 7);

          if (it.y >= H - 82 && it.y <= H - 24 && Math.abs(it.x - catchGame.heroX) < 52) {
            catchGame.items.splice(i, 1);
            if (it.bad) {
              catchGame.lives--;
              catchGame.combo = 0;
              floaters.push({ x: catchGame.heroX, y: H - 85, txt: "Splash! -1 ❤️", life: 1, col: "#dc2626" });
              if (catchGame.lives <= 0) catchGame.running = false;
            } else {
              catchGame.combo++;
              const mult = catchGame.combo >= 5 ? 2 : 1;
              const gained = it.pts * mult;
              catchGame.score += gained;
              cuddlesGiven += gained;
              hero.purrTimer = 55;
              playGentleCatSound("meow", 1.12);
              floaters.push({ x: catchGame.heroX, y: H - 88, txt: `Meow! +${gained} ${it.icon}`, life: 1, col: "#e11d68" });
            }
            syncMiniGameHUD();
            syncCatStatsUI();
          } else if (it.y > H + 24) {
            if (!it.bad) catchGame.combo = 0;
            catchGame.items.splice(i, 1);
            syncMiniGameHUD();
          }
        }
      }

      drawCuteCat({ ...hero, scale: 1.15, napping: false, jumpY: 0 }, false, catchGame.heroX, H - 58);

      if (!catchGame.running) {
        ctx.fillStyle = "rgba(255,255,255,0.94)";
        ctx.strokeStyle = "#f43f7a";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(W / 2 - 190, H / 2 - 58, 380, 116, 18); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#181826";
        ctx.font = "700 20px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText(`Kitty Catch Score: ${catchGame.score} pts! 🐱🏆`, W / 2, H / 2 - 16);
        ctx.fillStyle = "#e11d68";
        ctx.font = "700 13px 'Inter', sans-serif";
        ctx.fillText("Tap Anywhere Here or '▶ Start New Round' to Play Again!", W / 2, H / 2 + 22);
      }
    }

    function renderPounceMiniGameMode(now) {
      if (pounceGame.running) {
        const dt = (now - pounceGame.lastSecTs) / 1000;
        pounceGame.lastSecTs = now;
        pounceGame.timeLeft = Math.max(0, pounceGame.timeLeft - dt);
        if (pounceGame.timeLeft <= 0) {
          pounceGame.running = false;
          spawnCelebrationBurst(18);
        }
        pounceGame.spawnCooldown--;
        if (pounceGame.spawnCooldown <= 0) {
          const closed = pounceBoxes.filter((b) => !b.active);
          if (closed.length > 0) {
            const pick = closed[Math.floor(Math.random() * closed.length)];
            pick.active = true;
            pick.booped = false;
            pick.catIdx = Math.floor(Math.random() * cats.length);
            pick.holdItem = ["🐟", "🧶", "💖", "🥛"][Math.floor(Math.random() * 4)];
            pick.maxTimer = 68;
            pick.timer = 68;
          }
          pounceGame.spawnCooldown = 26;
        }
        syncMiniGameHUD();
      }

      pounceBoxes.forEach((box) => {
        if (box.active) {
          box.timer--;
          if (box.timer <= 0) {
            if (!box.booped && pounceGame.running) pounceGame.combo = 0;
            box.active = false;
          }
        }

        ctx.fillStyle = "#fbcfe8";
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(box.x - 54, box.y - 18, 108, 52, 12); ctx.fill(); ctx.stroke();

        if (box.active) {
          const popCat = cats[box.catIdx % cats.length] || cats[0];
          const lift = box.booped ? -34 : -26;
          drawCuteCat({ ...popCat, scale: 0.92, purrTimer: box.booped ? 80 : 0, napping: false, jumpY: 0 }, false, box.x, box.y + lift);
          ctx.font = "18px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(box.holdItem, box.x + 28, box.y - 26);
        }

        ctx.fillStyle = "#fff1f6";
        ctx.strokeStyle = "#f472b6";
        ctx.beginPath(); ctx.roundRect(box.x - 56, box.y + 4, 112, 34, 10); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#f43f5e";
        ctx.fillRect(box.x - 7, box.y + 4, 14, 34);
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🎀", box.x, box.y + 18);
      });

      if (!pounceGame.running) {
        ctx.fillStyle = "rgba(255,255,255,0.94)";
        ctx.strokeStyle = "#f43f7a";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(W / 2 - 195, H / 2 - 58, 390, 116, 18); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#181826";
        ctx.font = "700 20px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText(`Peek-a-Boo Boops: ${pounceGame.score} Kittens Cuddled! 🐾💖`, W / 2, H / 2 - 16);
        ctx.fillStyle = "#e11d68";
        ctx.font = "700 13px 'Inter', sans-serif";
        ctx.fillText("Tap Anywhere Here or '▶ Start New Round' to Play Again!", W / 2, H / 2 + 22);
      }
    }

    function renderCatHavenLoop(now) {
      requestAnimationFrame(renderCatHavenLoop);
      const catViewSec = document.getElementById("view-cathaven");
      if (!catViewSec || !catViewSec.classList.contains("active")) {
        pounceGame.lastSecTs = now || performance.now();
        return;
      }

      ctx.clearRect(0, 0, W, H);
      drawCatPlayroomBackdrop();

      if (activeMode === "catch") {
        renderCatchMiniGameMode();
      } else if (activeMode === "pounce") {
        renderPounceMiniGameMode(now || performance.now());
      } else {
        renderSanctuaryMode(now || performance.now());
      }

      for (let i = floaters.length - 1; i >= 0; i--) {
        const f = floaters[i];
        f.y -= 0.85;
        f.life -= 0.021;
        if (f.life <= 0) { floaters.splice(i, 1); continue; }
        drawCrispFloatingText(ctx, f.txt, f.x, f.y, f.col, f.life, 13);
      }
    }

    requestAnimationFrame(renderCatHavenLoop);
  }

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
            const changed = state.personality !== val;
            state.personality = val;
            const meta = SOUL_TONE_META[val] || SOUL_TONE_META.romantic;
            showToast(`Voice shifted to ${meta.badge} ✨`);
            // Immediately show a live in-character Tone-Shift Whisper bubble in Chat so the user sees & feels the voice change!
            if (changed && !state.isTypingReply && document.getElementById("view-chat")?.classList.contains("active")) {
              const row = document.createElement("div");
              row.className = "msg-row ai";
              row.innerHTML = `
                <div class="msg-avatar" aria-hidden="true">${emoji3DTag(opt.dataset.icon || "❄️")}</div>
                <div class="msg-col">
                  <span class="msg-sender-tag">${getActiveSenderLabel()}</span>
                  <div class="msg-bubble"><div class="ai-text">${formatRichHTML(meta.switchWhisper)}</div></div>
                </div>
              `;
              messagesContainer.appendChild(row);
              appendFollowupChipsUnderMessage(row.querySelector(".msg-col"), "");
              pinChatBottom();
            }
          } else if (dd.id === "treatDropdown" || dd.id === "settingDropdown" || dd.id === "vibeDropdown") {
            state.ticketWaxStamped = false;
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

    // Stop Snowy Finland Theme ("Plays Once When Opened") immediately if user switches away from Snow & Loved Things tab!
    if (viewName !== "favorites") {
      ["finlandSnowmanAudioHost", "herFavSongTabAudioHost"].forEach((hostId) => {
        const host = document.getElementById(hostId);
        const tabAudio = host?.querySelector("audio");
        if (tabAudio) {
          tabAudio.dataset.cancelledByTabSwitch = "1";
          try {
            tabAudio.pause();
            tabAudio.currentTime = 0;
          } catch (_) {}
          const orb = host.querySelector(".audio-play-orb");
          const st = host.querySelector(".audio-status-line");
          const fill = host.querySelector(".audio-progress-fill");
          const shimmer = host.querySelector(".audio-loading-shimmer-bar");
          if (orb) orb.textContent = "▶";
          if (fill) fill.style.width = "0%";
          if (shimmer) shimmer.hidden = true;
          if (st) {
            st.classList.remove("is-loading");
            st.textContent = "✨ Stopped on tab switch • Tap ▶ to listen once";
            hydrate3DEmojis(st);
          }
        }
      });
    }

    // When Snow & Loved Things tab opens, auto-play Sia - Snowman ONE TIME ONLY!
    if (viewName === "favorites" && !state.finlandTabAutoPlayedOnce && FINLAND_SONG_SNOWMAN) {
      state.finlandTabAutoPlayedOnce = true;
      state.playedSongIds.add(FINLAND_SONG_SNOWMAN.id);
      state.lastPlayedAudioId = FINLAND_SONG_SNOWMAN.id;
      const snowmanHost = document.getElementById("finlandSnowmanAudioHost");
      if (snowmanHost) {
        let unlocked = null;
        try {
          unlocked = document.createElement("audio");
          unlocked.preload = "auto";
          unlocked.playsInline = true;
          unlocked.loop = false;
        } catch (_) {}
        snowmanHost.innerHTML = "";
        snowmanHost.appendChild(buildRomanticAudioCard(FINLAND_SONG_SNOWMAN, true, unlocked));
      }
    }

    // When user opens Purr & Cat Haven tab, all cats & Arunava + Sayanti couple cats greet her!
    if (viewName === "cathaven" && typeof triggerCatHavenWelcomeGreeting === "function") {
      triggerCatHavenWelcomeGreeting();
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
  initCatHavenSanctuary();
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
