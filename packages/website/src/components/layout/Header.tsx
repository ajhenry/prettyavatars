import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDarkMode } from 'next-dark-mode'

import UnstyledLink from '@/components/links/UnstyledLink'

const links: { href: string; label: string }[] = []

const Header = () => {
  const {
    darkModeActive: isDarkMode,
    switchToLightMode,
    switchToDarkMode,
  } = useDarkMode()

  return (
    <header className='top-0 z-10 w-full'>
      <div className='layout flex h-14 items-center justify-end'>
        <nav className='flex flex-1 flex-row items-center justify-between space-x-4 sm:flex-initial'>
          <ul className='flex items-center space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              isDarkMode ? switchToLightMode() : switchToDarkMode()
            }
            className='w-12'
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size='lg' />
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
