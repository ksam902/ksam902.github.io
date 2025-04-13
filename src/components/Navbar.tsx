'use client';

import { Activity, Component, HomeIcon, Mail, Package, ScrollText, SunMoon } from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/src/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
    id: 'hero',
  },
  {
    title: 'About',
    icon: <ScrollText className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
    id: 'about',
  },
  {
    title: 'Tech Stack',
    icon: <Component className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
    id: 'tech-stack',
  },
  {
    title: 'Projects',
    icon: <Package className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
    id: 'projects',
  },
  {
    title: 'Activity',
    icon: <Activity className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
    id: 'activity',
  },
  {
    title: 'Email',
    icon: <Mail className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
    id: 'email',
  },
  {
    title: 'Theme',
    icon: <SunMoon className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
    id: 'theme',
  },
];

export default function Navbar() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-2 z-50 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3">
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800"
            onClick={() => handleScroll(item.id)}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
