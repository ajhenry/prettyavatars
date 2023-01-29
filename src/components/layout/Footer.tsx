import UnderlineLink from '@/components/links/UnderlineLink'
import UnstyledLink from '../links/UnstyledLink'

export const Footer = () => {
  return (
    <div className='my-8 justify-center'>
      <footer className='layout sm:items-initial flex flex-col items-center justify-center sm:flex-row sm:justify-between '>
        <span>
          Made with ❤️ by
          <UnderlineLink
            href='https://github.com/ajhenry/prettyavatars'
            className='ml-1'
          >
            @ajhenry
          </UnderlineLink>
        </span>
        <ul className='mt-4 flex flex-row space-x-4 sm:mt-0'>
          <li>
            <UnstyledLink href='/privacy'>Privacy Policy</UnstyledLink>
          </li>
          <li>
            <UnstyledLink href='/terms'>Terms of Service</UnstyledLink>
          </li>
        </ul>
      </footer>
    </div>
  )
}
