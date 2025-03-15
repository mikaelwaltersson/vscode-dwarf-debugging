import { spawn } from 'child_process';
import { readdirSync } from 'fs';
import { describe, it } from 'node:test';
import { basename, extname } from 'path';

const testSuiteModules =
  readdirSync(`${__dirname}/wasm`)
    .filter(file => extname(file) === '.ts')
    .map(file => basename(file, '.ts'));

describe('WebAssemblyTests', () => {
  for (const testSuite of testSuiteModules) {
    it(testSuite, () => {
      const cwd = `${__dirname}/../wasm/symbols-backend.build/stage-2`;
      const modulePath = `${__dirname}/wasm/${testSuite}`;
      return new Promise<void>((resolve, reject) =>
        spawn(process.execPath, ['--import', 'tsx', modulePath], { stdio: 'inherit', cwd })
          .on('error', reject)
          .on('exit', (code, signal) => {
            if (signal) {
              reject(new Error(`Test suite ${testSuite} exited because of signal ${signal}.`));
            }
            else if (code !== 0) {
              reject(new Error(`Test suite ${testSuite} exited with code ${code}.`));
            }
            else {
              resolve();
            }
          })
      );
    });
  }
});