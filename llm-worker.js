/* ==========================================================================
   ❄️❤️ Arunava • Love GPT — Featherlight Off-Thread Neural Worker (GitHub Pages Ready)
   - Lazy-loaded ONLY on demand (zero background download or CPU/GPU spike on page open)
   - Runs strictly on single-thread CPU WASM off the main UI thread (zero GPU compositor contention)
   ========================================================================== */

const filterOrtNoise = (origFn) => (...args) => {
  const first = typeof args[0] === "string" ? args[0] : "";
  if (
    first.includes("VerifyEachNodeIsAssignedToAnEp") ||
    first.includes("session_state.cc") ||
    first.includes("Unable to add response to browser cache") ||
    first.includes("Unable to determine content-length") ||
    first.includes("CleanUnusedInitializersAndNodeArgs")
  ) {
    return;
  }
  origFn.apply(console, args);
};
console.warn = filterOrtNoise(console.warn);
console.error = filterOrtNoise(console.error);

let generator = null;
let activeModelId = null;
let loadingPromise = null;

async function ensureModel() {
  if (generator) return generator;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      self.postMessage({ type: "status", state: "loading" });
      const tf = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3");
      const { pipeline, env } = tf;
      env.allowLocalModels = false;

      if (env.backends?.onnx) {
        env.backends.onnx.logLevel = "fatal";
        if (env.backends.onnx.wasm) {
          env.backends.onnx.wasm.simd = true;
          // Keep strictly single-threaded inside the Worker so main UI thread stays 100% silky 60fps
          env.backends.onnx.wasm.numThreads = 1;
        }
      }

      const sessionOpts = { logSeverityLevel: 4, logVerbosityLevel: 0 };
      const modelId = "HuggingFaceTB/SmolLM2-135M-Instruct";

      generator = await pipeline("text-generation", modelId, {
        dtype: "q4",
        device: "wasm",
        session_options: sessionOpts,
        progress_callback: (info) => {
          if (info && typeof info.progress === "number") {
            self.postMessage({ type: "progress", pct: Math.round(info.progress) });
          }
        }
      });
      activeModelId = `${modelId} (wasm)`;
      self.postMessage({ type: "status", state: "ready", model: activeModelId });
      return generator;
    } catch (_) {
      generator = null;
      loadingPromise = null;
      self.postMessage({ type: "status", state: "failed" });
      return null;
    }
  })();

  return loadingPromise;
}

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
      .catch(() => {
        self.postMessage({ type: "done", id, text: null });
      });
  }
});

async function runGeneration(id, messages, maxTokens) {
  try {
    if (!generator) {
      ensureModel();
      self.postMessage({ type: "done", id, text: null });
      return;
    }

    const tokenCap = Math.min(maxTokens || 48, 56);
    const out = await generator(messages, {
      max_new_tokens: tokenCap,
      do_sample: false,
      repetition_penalty: 1.14
    });

    let fullText = "";
    const gen = out?.[0]?.generated_text;
    if (Array.isArray(gen)) {
      fullText = gen[gen.length - 1]?.content || "";
    } else if (typeof gen === "string") {
      fullText = gen;
    }
    const finalOut = (fullText || "").trim();
    self.postMessage({ type: "done", id, text: finalOut || null });
  } catch (_) {
    self.postMessage({ type: "done", id, text: null });
  }
}
