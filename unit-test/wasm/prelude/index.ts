
declare var runTestSuite: (callback: () => Promise<void>) => void;

Object.assign(global, {
  runTestSuite(callback: () => Promise<void>) {
    callback().catch(e => console.error('Unhandled exception running WebAssembly test suite:', e));
  },
  // See: https://github.com/emscripten-core/emscripten/issues/16742
  Browser: { handledByPreloadPlugin: () => false },
});
