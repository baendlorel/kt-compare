import { execSync } from 'node:child_process';

function main() {
  const frameworks = ['ktjs', 'vue'];
  for (const fw of frameworks) {
    execSync(`vite build ${fw} --config ${fw}/vite.config.ts`, { stdio: 'inherit' });
  }
}
main();
