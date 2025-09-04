import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        webp: { quality: 80 },
      }),
    ],
    resolve: {
      alias: {
        '@src': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@api': resolve(__dirname, 'src/api'),
        '@assets': resolve(__dirname, 'src/assets'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@styles/utils/variables" as *;
            @use "@styles/utils/mixins" as *;
            @use "@styles/utils/components" as *;
          `,
        },
      },
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction
          ? '[hash:base64:6]'
          : '[name]__[local]',
      },
    },
    build: {
      minify: 'terser',
      cssMinify: true,
    },
    server: {
      port: 3000,
      open: true,
      hmr: true,
    },
    envPrefix: 'VITE_',
  };
});
