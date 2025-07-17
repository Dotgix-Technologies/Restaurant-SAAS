import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx');
    const themes = import.meta.glob('./Themes/**/Pages/**/*.tsx');

    // Try matching from Pages
    if (pages[`./Pages/${name}.tsx`]) {
        return pages[`./Pages/${name}.tsx`]();
    }

    // Try matching from Themes
    for (const path in themes) {
        if (path.endsWith(`/${name}.tsx`)) {
            return themes[path]();
        }
    }

    throw new Error(`Unknown page: ${name}`);
},
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
