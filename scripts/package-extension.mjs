import { createWriteStream, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { ZipArchive } from 'archiver';
import packageJson from '../package.json' with { type: 'json' };

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const packages = path.join(root, 'packages');
const artifactName = `${packageJson.name}-${packageJson.version}.zip`;
const artifactPath = path.join(packages, artifactName);

rmSync(packages, { recursive: true, force: true });
mkdirSync(packages, { recursive: true });

await new Promise((resolve, reject) => {
  const output = createWriteStream(artifactPath);
  const archive = new ZipArchive({
    zlib: { level: 9 },
  });

  output.on('close', resolve);
  output.on('error', reject);
  archive.on('warning', (error) => {
    if (error.code === 'ENOENT') {
      console.warn(error.message);
      return;
    }
    reject(error);
  });
  archive.on('error', reject);

  archive.pipe(output);
  archive.directory(dist, false);
  archive.finalize();
});

console.log(`Packaged ${path.relative(root, artifactPath)}`);
