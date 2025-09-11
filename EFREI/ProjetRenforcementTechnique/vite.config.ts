import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@game': '/src/game',
      '@games': '/src/game/games',
      '@config': '/src/config',
      '@shared': '/src/shared',
      '@styles': '/src/styles',
      '@utils': '/src/game/utils',
      '@types': '/src/game/types',
      '@core': '/src/game/core',
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        game: './game.html',
      }
    }
  }
});
