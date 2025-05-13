import adapter from 'svelte-adapter-ghpages';

const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
	  precompress: false,
	  strict: true
    }),
    paths: {
      base: dev ? '' : "/swecc-resume-review",
    },
	prerender: {
		entries: ['*']
	}
  }
};
