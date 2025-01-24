import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
			      fallback: '404.html'
		    }),
		    files: {
          routes: 'src/routes' // Change 'src/pages' to your custom routes folder
        },
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/d3' : '',
        }
    }
};

export default config;