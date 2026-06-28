export const GITHUB_REPO_URL = 'https://github.com/CSSS/csss-site-docs';

export const EXECUTIVES = [
  'President',
  'Vice-President',
  'Treasurer',
  'Director of Resources',
  'Director of Events',
  'Director of Educational Events',
  'Assistant Director of Events',
  'Director of Communications',
  'Secretary',
  'SFSS Council Representative',
  'Executives at Large',
  'First Year Representatives'
];

export const ELECTED_REPS = ['Elections Officer', 'Frosh Week Chair', 'Others'];

export const APPOINTED_REPS = ['System Administrator', 'Webmaster', 'Social Media Managers'];

export function kebabCase(value: string) {
  return value.toLowerCase().replaceAll(' ', '-');
}

export function makeSidebarItems(label: string, items: string[]) {
  const directory = kebabCase(label);

  return {
    label,
    collapsed: true,
    items: items.map(item => ({
      label: item,
      slug: `${directory}/${kebabCase(item)}`
    }))
  };
}
