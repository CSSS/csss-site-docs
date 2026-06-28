// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'CSSS Docs',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/CSSS/csss-site-docs'
        }
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [{ label: 'Contributing Documentation', slug: 'guides/docs-guide' }]
        },
        {
          label: 'Event Guides',
          items: [{ autogenerate: { directory: 'reference' } }]
        }
      ]
    })
  ]
});
