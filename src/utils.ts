export function normalizePathname(pathname: string) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function titleCaseKebabLabel(label: string) {
  return label
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function slugToHref(slug: string) {
  return `/${slug.replace(/^\/+|\/+$/g, '')}/`;
}
