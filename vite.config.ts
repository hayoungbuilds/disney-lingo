import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                content: resolve(__dirname, 'src/content/index.ts'),
                popup: resolve(__dirname, 'src/popup.tsx'),
            },
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                { src: 'public/manifest.json', dest: '.' },
                { src: 'public/popup.html', dest: '.' },
            ],
        }),
    ],
});
