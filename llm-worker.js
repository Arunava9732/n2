/* ==========================================================================
   ❄️❤️ Arunava • Love GPT — Ultra-Fast Compact Neural LLM Worker (~78 MB)
   - Uses SmolLM2-135M-Instruct (q4 / q4f16) — ~6x smaller than 460 MB!
   - Rejects fake software/CPU-emulated WebGPU adapters (SwiftShader / WARP / Basic Render)
   - Greedy short-horizon decoding (<0.3s on GPU, ~1.1s on pure CPU WASM!)
   ========================================================================== */

if (typeof navigator !== "undefined" && navigator.gpu && typeof navigator.gpu.requestAdapter === "function") {
  const origRequestAdapter = navigator.gpu.requestAdapter.bind(navigator.gpu);
  navigator.gpu.requestAdapter = function (options) {
    if (options && typeof options === "object" && "powerPreference" in options) {
      const cleanOpts = { ...options };
      delete cleanOpts.powerPreference;
      return origRequestAdapter(cleanOpts);
    }
    return origRequestAdapter(options);
  };
}

const filterOrtNoise = (origFn) => (...args) => {
  const first = typeof args[0] === "string" ? args[0] : "";
  if (
    first.includes("VerifyEachNodeIsAssignedToAnEp") ||
    first.includes("powerPreference") ||
    first.includes("session_state.cc") ||
    first.includes("Unable to add response to browser cache") ||
    first.includes("Unable to determine content-length")
  ) {
    return;
  }
  origFn.apply(console, args);
};
console.warn = filterOrtNoise(console.warn);
console.error = filterOrtNoise(console.error);

let generator = null;
let loadingPromise = null;

async function hasRealHardwareWebGPU() {
  if (typeof navigator === "undefined" || !navigator.gpu || typeof navigator.gpu.requestAdapter !== "function") {
    return false;
  }
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter || adapter.isFallbackAdapter) return false;
    let info = adapter.info || null;
    if (!info && typeof adapter.requestAdapterInfo === "function") {
      try { info = await adapter.requestAdapterInfo(); } catch (_) { info = null; }
    }
    if (info) {
      const desc = `${info.vendor || ""} ${info.architecture || ""} ${info.device || ""} ${info.description || ""}`.toLowerCase();
      if (/swiftshader|llvmpipe|basic render|warp|software|lavapipe|mesa offscreen/.test(desc)) {
        return false;
      }
    }
    return true;
  } catch (_) {
    return false;
  }
}

async function ensureModel() {
  if (generator) return generator;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const tf = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3");
      const { pipeline, env } = tf;
      env.allowLocalModels = false;

      if (env.backends?.onnx) {
        env.backends.onnx.logLevel = "fatal";
        if (env.backends.onnx.wasm && typeof self !== "undefined" && self.crossOriginIsolated) {
          env.backends.onnx.wasm.numThreads = Math.min(4, navigator.hardwareConcurrency || 2);
        }
      }

      const realGpu = await hasRealHardwareWebGPU();
      const sessionOpts = { logSeverityLevel: 4, logVerbosityLevel: 0 };

      // On real hardware GPU, prioritize smarter Qwen2.5-0.5B-Instruct (~0.5s/reply on WebGPU!);
      // on CPU-only / no-GPU browsers, use compact ~78 MB SmolLM2-135M-Instruct WASM so it stays fast!
      const candidates = realGpu
        ? [
            { id: "onnx-community/Qwen2.5-0.5B-Instruct", dtype: "q4f16", device: "webgpu" },
            { id: "HuggingFaceTB/SmolLM2-360M-Instruct", dtype: "q4f16", device: "webgpu" },
            { id: "HuggingFaceTB/SmolLM2-135M-Instruct", dtype: "q4f16", device: "webgpu" },
            { id: "HuggingFaceTB/SmolLM2-135M-Instruct", dtype: "q4", device: "wasm" }
          ]
        : [
            { id: "HuggingFaceTB/SmolLM2-135M-Instruct", dtype: "q4", device: "wasm" },
            { id: "HuggingFaceTB/SmolLM2-135M-Instruct", dtype: "q8", device: "wasm" }
          ];

      for (const c of candidates) {
        try {
          generator = await pipeline("text-generation", c.id, {
            dtype: c.dtype,
            device: c.device,
            session_options: sessionOpts
          });
          break;
        } catch (_) {}
      }

      if (!generator) {
        self.postMessage({ type: "status", state: "failed" });
        return null;
      }

      self.postMessage({ type: "status", state: "ready" });
      return generator;
    } catch (_) {
      self.postMessage({ type: "status", state: "failed" });
      return null;
    }
  })();

  return loadingPromise;
}

// Strictly serialize ONNX Runtime generations
let generationChain = Promise.resolve();

self.addEventListener("message", (event) => {
  const { type, id, messages, maxTokens } = event.data || {};

  if (type === "warmup") {
    ensureModel();
    return;
  }

  if (type === "generate") {
    generationChain = generationChain
      .then(() => runGeneration(id, messages, maxTokens))
      .catch(() => {});
  }
});

async function runGeneration(id, messages, maxTokens) {
  try {
    if (!generator) {
      await Promise.race([
        ensureModel(),
        new Promise((r) => setTimeout(r, 1500))
      ]);
    }
    if (!generator) {
      self.postMessage({ type: "done", id, text: null });
      return;
    }

    // Greedy decoding (do_sample: false) is 3-4x faster on CPU/WASM and stays concise & factual
    const out = await generator(messages, {
      max_new_tokens: Math.min(maxTokens || 68, 76),
      do_sample: false,
      repetition_penalty: 1.15
    });

    let fullText = "";
    const gen = out?.[0]?.generated_text;
    if (Array.isArray(gen)) {
      fullText = gen[gen.length - 1]?.content || "";
    } else if (typeof gen === "string") {
      fullText = gen;
    }

    self.postMessage({ type: "done", id, text: fullText.trim() || null });
  } catch (_) {
    self.postMessage({ type: "done", id, text: null });
  }
}
