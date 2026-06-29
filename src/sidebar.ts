import { APPOINTED_REPS, ELECTED_REPS, EXECUTIVES, makeSidebarItems } from './constants';

type SidebarItem = Record<string, unknown> & {
  label?: string;
  slug?: string;
  items?: SidebarItem[];
};

const LINKED_GROUP_SEPARATOR = ' > ';
const linkedSidebarGroupHrefs = new Map<string, string>();

const sidebarConfig = [
  makeSidebarItems('Executives', EXECUTIVES),
  makeSidebarItems('Elected Reps', ELECTED_REPS),
  makeSidebarItems('Appointed Reps', APPOINTED_REPS),
  {
    label: 'Events',
    items: [
      {
        label: 'Frosh Week',
        items: [
          {
            label: 'Grant',
            slug: 'events/frosh-week/frosh',
            items: [{ autogenerate: { directory: 'executives' } }]
          }
        ]
      }
    ]
  },
  {
    label: 'Contributing',
    items: [{ autogenerate: { directory: 'guides' } }]
  }
] satisfies SidebarItem[];

function slugToHref(slug: string) {
  return `/${slug.replace(/^\/+|\/+$/g, '')}/`;
}

function groupKey(path: string[]) {
  return path.join(LINKED_GROUP_SEPARATOR);
}

function normalizeSidebarItems(items: SidebarItem[], parentPath: string[] = []): SidebarItem[] {
  return items.map(({ slug, items: nestedItems, ...item }) => {
    if (!nestedItems) return typeof slug === 'string' ? { ...item, slug } : item;

    const label = item.label;
    const path = typeof label === 'string' ? [...parentPath, label] : parentPath;

    if (slug && typeof slug === 'string') {
      linkedSidebarGroupHrefs.set(groupKey(path), slugToHref(slug));
    }

    return {
      ...item,
      items: normalizeSidebarItems(nestedItems, path)
    };
  });
}

export const sidebar = normalizeSidebarItems(sidebarConfig);

export function getLinkedSidebarGroupHref(path: string[]) {
  return linkedSidebarGroupHrefs.get(groupKey(path));
}
