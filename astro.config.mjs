// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { APPOINTED_REPS, ELECTED_REPS, EXECUTIVES, makeSidebarItems } from './src/constants.ts';

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
        // {
        //   label: 'Guides',
        //   items: [{ label: 'Contributing Documentation', slug: 'guides/docs-guide' }]
        // },
        {
          slug: 'guides/docs-guide'
        },
        {
          label: 'Events',
          items: [{ autogenerate: { directory: 'events' } }]
        },
        makeSidebarItems('Executives', EXECUTIVES),
        makeSidebarItems('Elected Reps', ELECTED_REPS),
        makeSidebarItems('Appointed Reps', APPOINTED_REPS)
      ]
    })
  ]
});
