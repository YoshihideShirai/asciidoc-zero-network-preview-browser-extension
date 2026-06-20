import { copyFileSync, cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const file of ['manifest.json', 'viewer.html', 'viewer.css', 'options.html', 'options.css', 'network-guards.js', 'mathjax-config.js']) {
  copyFileSync(path.join(root, 'public', file), path.join(dist, file));
}

cpSync(path.join(root, 'media'), path.join(dist, 'media'), { recursive: true });

await build({
  entryPoints: {
    background: path.join(root, 'src/background.ts'),
    'content-script': path.join(root, 'src/content-script.ts'),
    viewer: path.join(root, 'src/viewer.ts'),
    options: path.join(root, 'src/options.ts'),
  },
  bundle: true,
  format: 'esm',
  target: 'chrome120',
  outdir: dist,
  sourcemap: true,
  legalComments: 'linked',
  define: {
    'process.env.NODE_ENV': '"production"',
    global: 'globalThis',
  },
});
