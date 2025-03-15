// This file is based on a file from revision cf3a5c70b97b388fff3490b62f1bdaaa6a26f8e1 
// of the Chrome DevTools C/C++ Debugging Extension, see the wasm/symbols-backend/LICENSE file.
//
// https://github.com/ChromeDevTools/devtools-frontend/blob/main/extensions/cxx_debugging/tests/SymbolsBackend_test.ts

import createModule, { type SymbolsBackendTestsModule } from '../../wasm/symbols-backend.build/stage-2/tests/SymbolsBackendTests';
import './prelude';

runTestSuite(
  async () => {
    await createModule({
      // @ts-expect-error
      preRun({ FS }: SymbolsBackendTestsModule) {
        FS.mkdir('tests');
        FS.mkdir('tests/inputs');
        FS.mkdir('cxx_debugging');
        FS.mkdir('cxx_debugging/tests');
        FS.mkdir('cxx_debugging/tests/inputs');
        ['hello.s.wasm',
          'windows_paths.s.wasm',
          'globals.s.wasm',
          'classstatic.s.wasm',
          'namespaces.s.wasm',
          'shadowing.s.wasm',
          'inline.s.wasm',
        ]
          .forEach(
            name => FS.createPreloadedFile(
              'cxx_debugging/tests/inputs', name, `tests/inputs/${name}`, true, false));
        ['split-dwarf.s.dwo',
          'split-dwarf.s.wasm',
        ].forEach(name => FS.createPreloadedFile('tests/inputs', name, `tests/inputs/${name}`, true, false));
      },
    });
  }
);

