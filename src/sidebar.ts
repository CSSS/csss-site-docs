import { sidebarConfig, type SidebarItem } from './sidebar.config';
import { slugToHref } from './utils';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const LINKED_GROUP_SEPARATOR = ' > ';
const linkedSidebarGroupHrefs = new Map<string, string>();
const sidebarOrderBySlug = new Map<string, number | undefined>();

function getSidebarOrder(slug: string) {
  if (sidebarOrderBySlug.has(slug)) return sidebarOrderBySlug.get(slug);

  const filePath = [
    join(process.cwd(), 'src/content/docs', `${slug}.mdx`),
    join(process.cwd(), 'src/content/docs', `${slug}.md`),
    join(process.cwd(), 'src/content/docs', slug, 'index.mdx'),
    join(process.cwd(), 'src/content/docs', slug, 'index.md')
  ].find(path => existsSync(path));

  if (!filePath) {
    sidebarOrderBySlug.set(slug, undefined);
    return undefined;
  }

  const frontmatter = readFileSync(filePath, 'utf-8').match(/^---\s*\n([\s\S]*?)\n---/)?.[1];
  const order = frontmatter?.match(/^sidebar:\s*$[\s\S]*?^\s+order:\s*(-?\d+(?:\.\d+)?)\s*$/m)?.[1];
  const parsedOrder = order === undefined ? undefined : Number(order);

  sidebarOrderBySlug.set(slug, parsedOrder);
  return parsedOrder;
}

function sortSidebarItems(items: SidebarItem[]) {
  const itemsWithOrder = items.map((item, index) => ({
    item,
    index,
    order: typeof item.slug === 'string' ? getSidebarOrder(item.slug) : undefined
  }));

  if (itemsWithOrder.every(({ order }) => order === undefined)) return items;

  return itemsWithOrder
    .sort(
      (a, b) => (a.order ?? Number.MAX_VALUE) - (b.order ?? Number.MAX_VALUE) || a.index - b.index
    )
    .map(({ item }) => item);
}

function groupKey(path: string[]) {
  return path.join(LINKED_GROUP_SEPARATOR);
}

function normalizeSidebarItems(items: SidebarItem[], parentPath: string[] = []): SidebarItem[] {
  return sortSidebarItems(items).map(({ slug, items: nestedItems, ...item }) => {
    if (!nestedItems) return typeof slug === 'string' ? { ...item, slug } : item;

    const label = item.label;
    const path = typeof label === 'string' ? [...parentPath, label] : parentPath;

    if (slug && typeof slug === 'string') {
      linkedSidebarGroupHrefs.set(groupKey(path), slugToHref(slug));
    }

    return {
      ...item,
      items: [
        ...(typeof slug === 'string' ? [{ slug }] : []),
        ...normalizeSidebarItems(nestedItems, path)
      ]
    };
  });
}

export const sidebar = normalizeSidebarItems(sidebarConfig);

export function getLinkedSidebarGroupHref(path: string[]) {
  return linkedSidebarGroupHrefs.get(groupKey(path));
}
