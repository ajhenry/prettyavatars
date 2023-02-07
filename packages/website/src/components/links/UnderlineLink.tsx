import { useDarkMode } from 'next-dark-mode'
import * as React from 'react'

import clsxm from '@/lib/clsxm'

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink'

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    const { darkModeActive: isDarkMode } = useDarkMode()
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'animated-underline custom-link inline-flex items-center font-medium',
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'border-b border-dotted',
          isDarkMode
            ? 'border-light hover:border-light/0'
            : 'border-dark hover:border-black/0',
          className
        )}
      >
        {children}
      </UnstyledLink>
    )
  }
)

export default UnderlineLink
