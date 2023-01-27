import UnderlineLink from '@/components/links/UnderlineLink'
import UnstyledLink from '../links/UnstyledLink'

export const Footer = () => {
  return (
    <div className='my-8 justify-center'>
      <footer className='max-auto layout flex justify-between'>
        <span>
          Made with ❤️ by
          <UnderlineLink
            href='https://github.com/ajhenry/prettyavatars'
            className='ml-1'
          >
            @ajhenry
          </UnderlineLink>
        </span>
        <ul className='flex flex-row space-x-4'>
          <li>Privacy Policy</li>
          <li>
            <UnstyledLink href='/terms'>Terms of Service</UnstyledLink>
          </li>
        </ul>
      </footer>
    </div>
  )
}
