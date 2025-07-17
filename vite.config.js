import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

const themeName = process.env.THEME;
const isThemeBuild = process.env.MODE === 'theme' || !!themeName;

export default defineConfig({
    build: {
        outDir: isThemeBuild && themeName
            ? path.resolve(__dirname, `public/themes/${themeName}/build`)
            : path.resolve(__dirname, 'public/build'),
        emptyOutDir: true,
    },
    plugins: [
        laravel({
            input: isThemeBuild
                ? `resources/js/Themes/${themeName}/Pages/Index.tsx`
                : 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
});
