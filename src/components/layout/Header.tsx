import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDarkMode from 'use-dark-mode';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/docs', label: 'API Reference' },
  { href: '/account', label: 'Account' },
];

const Header = () => {
  const { value, toggle } = useDarkMode();

  return (
    <header className='top-0 z-50 -mb-14'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <nav className='flex flex-row items-center space-x-4'>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <button onClick={() => toggle()} className='w-12'>
            <FontAwesomeIcon icon={value ? faSun : faMoon} size='lg' />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
