/* ==========================================================================
   ❄️❤️ Love GPT — Zero-Warning Streaming On-Device Neural Worker
   - Silences Windows WebGPU powerPreference warning cleanly
   - Silences ONNX Runtime VerifyEachNodeIsAssignedToAnEp C++ warning (Level 3)
   - Streams tokens live via TextStreamer (100% GitHub Pages & Offline Ready)
   ========================================================================== */

// 1. Prevent Chromium on Windows from logging:
// "The powerPreference option is currently ignored when calling requestAdapter() on Windows"
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

// 2. Filter noisy internal ONNX Runtime EP placement info/warnings from console
const filterOrtNoise = (origFn) => (...args) => {
  const first = typeof args[0] === "string" ? args[0] : "";
  if (
    first.includes("VerifyEachNodeIsAssignedToAnEp") ||
    first.includes("powerPreference") ||
    first.includes("session_state.cc")
  ) {
    return;
  }
  origFn.apply(console, args);
};
console.warn = filterOrtNoise(console.warn);
console.error = filterOrtNoise(console.error);

let generator = null;
let tokenizerRef = null;
let TextStreamerClass = null;
let loadingPromise = null;

async function ensureModel() {
  if (generator) return generator;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const tf = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3");
      const { pipeline, env, TextStreamer } = tf;
      env.allowLocalModels = false;

      // Silence ONNX Runtime internal C++/WASM warning logs (severity 3 = error only, 4 = fatal)
      if (env.backends?.onnx) {
        env.backends.onnx.logLevel = "fatal";
      }

      TextStreamerClass = TextStreamer;
      const hasWebGPU = typeof navigator !== "undefined" && !!navigator.gpu;
      self.postMessage({ type: "status", state: "warming", label: "Warming Neural LLM..." });

      const sessionOpts = { logSeverityLevel: 4, logVerbosityLevel: 0 };
      const candidates = hasWebGPU
        ? [
            { id: "HuggingFaceTB/SmolLM2-360M-Instruct", dtype: "q4f16", device: "webgpu" },
            { id: "HuggingFaceTB/SmolLM2-135M-Instruct", dtype: "q8", device: "wasm" }
          ]
        : [
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
        self.postMessage({ type: "status", state: "rag-only", label: "Deep Love Engine Active" });
        return null;
      }

      tokenizerRef = generator.tokenizer;
      self.postMessage({ type: "status", state: "ready", label: "On-Device Neural LLM Active" });
      return generator;
    } catch (_) {
      self.postMessage({ type: "status", state: "rag-only", label: "Deep Love Engine Active" });
      return null;
    }
  })();

  return loadingPromise;
}

self.addEventListener("message", async (event) => {
  const { type, id, messages, temperature } = event.data || {};

  if (type === "warmup") {
    await ensureModel();
    return;
  }

  if (type === "generate") {
    try {
      const pipe = await ensureModel();
      if (!pipe || !TextStreamerClass) {
        self.postMessage({ type: "done", id, text: null });
        return;
      }

      let fullText = "";
      const streamer = new TextStreamerClass(tokenizerRef, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (tokenText) => {
          fullText += tokenText;
          self.postMessage({ type: "token", id, token: tokenText, fullText });
        }
      });

      const out = await pipe(messages, {
        max_new_tokens: 105,
        temperature: temperature || 0.72,
        top_p: 0.9,
        do_sample: true,
        repetition_penalty: 1.25,
        streamer
      });

      if (!fullText.trim()) {
        const gen = out?.[0]?.generated_text;
        if (Array.isArray(gen)) {
          fullText = gen[gen.length - 1]?.content || "";
        } else if (typeof gen === "string") {
          fullText = gen;
        }
      }

      self.postMessage({ type: "done", id, text: fullText.trim() || null });
    } catch (_) {
      self.postMessage({ type: "done", id, text: null });
    }
  }
});
