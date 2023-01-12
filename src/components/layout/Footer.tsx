import UnderlineLink from '@/components/links/UnderlineLink';

export const Footer = () => {
  return (
    <div className='justify-center'>
      <footer className='max-auto layout justify-between'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
          Theodorus Clarence
        </UnderlineLink>
      </footer>
    </div>
  );
};
