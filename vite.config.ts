import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 62831,
    strictPort: true,
    hmr: {
      clientPort: 62831
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist/frontend',
    assetsDir: 'assets',
    sourcemap: true
  }
}); 