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
          href: 'https://docs.sfucsss.org'
        }
      ],
      // @ts-ignore
      sidebar,
      pagination: false,
      lastUpdated: true,
      customCss: ['./src/styles/global.css']
    })
  ]
});
