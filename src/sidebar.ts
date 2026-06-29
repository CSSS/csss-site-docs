import { sidebarConfig, type SidebarItem } from './sidebar.config';
import { slugToHref } from './utils';

const LINKED_GROUP_SEPARATOR = ' > ';
const linkedSidebarGroupHrefs = new Map<string, string>();

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
