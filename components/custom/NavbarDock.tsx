import {
  Cog,
  House,
  Mail,
  Route,
  UsersRound,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/shadcn-io/dock';
import Link from 'next/link';
const data = [
  {
    title: 'Dashboard',
    icon: (
      <House  className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/dashboard',
  },
  {
    title: 'Audiences',
    icon: (
      <UsersRound  className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/audiences',
  },
  {
    title: 'Mails',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/mails',
  },
  {
    title: 'Workflows',
    icon: (
      <Route className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/workflows',
  },
  {
    title: 'Settings',
    icon: (
      <Cog className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/settings',
  },
];

const NavbarDock = () => {
  return (
    <div className='fixed bottom-6 left-1/2 max-w-full -translate-x-1/2 bg-transparent'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => {

          return <Link href={item.href} key={idx}>
          <DockItem
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
          >
            <DockLabel className={`text-sm font-medium text-foreground`}>{item.title}</DockLabel>
            
            <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        })}
      </Dock>
    </div>
  )
}

export default NavbarDock