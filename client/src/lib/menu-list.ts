import { Bug, LayoutGrid, PanelsTopLeft, User } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: unknown;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname === '/dashboard',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '',
          label: 'Projects',
          active: pathname.includes('/projects'),
          icon: PanelsTopLeft,
          submenus: [
            {
              href: '/dashboard/projects',
              label: 'All projects',
              active: pathname === '/dashboard/projects',
            },
            {
              href: '/dashboard/projects/new',
              label: 'New Project',
              active: pathname === '/dashboard/projects/new',
            },
          ],
        },
        {
          href: '/dashboard/projects',
          label: 'Issues',
          active: pathname.includes('/issues'),
          icon: Bug,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/dashboard/account',
          label: 'Account',
          active: pathname.includes('/account'),
          icon: User,
          submenus: [],
        },
      ],
    },
  ];
}
