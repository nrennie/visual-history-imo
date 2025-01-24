import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
			      fallback: '404.html'
		    }),
		    files: {
          routes: 'src/routes'
        },
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/visual-history-imo' : '',
        }
    }
};

export default config;