import { APPOINTED_REPS, ELECTED_REPS, EXECUTIVES, makeSidebarItems } from './constants';

export type SidebarItem = Record<string, unknown> & {
  label?: string;
  slug?: string;
  items?: SidebarItem[];
};

export const sidebarConfig = [
  makeSidebarItems('Executives', EXECUTIVES),
  makeSidebarItems('Elected Reps', ELECTED_REPS),
  makeSidebarItems('Appointed Reps', APPOINTED_REPS),
  {
    label: 'Events',
    items: [{ autogenerate: { directory: 'events' } }]
  },
  {
    label: 'Contributing',
    items: [{ autogenerate: { directory: 'guides' } }]
  }
] satisfies SidebarItem[];
