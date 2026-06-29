// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/sidebar.ts';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'CSSS Docs',
      logo: {
        src: './src/assets/csss-logo.svg'
      },
      components: {
        Sidebar: './src/components/starlight/Sidebar.astro'
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/CSSS/csss-site-docs'
        }
      ],
      sidebar
    })
  ]
});
