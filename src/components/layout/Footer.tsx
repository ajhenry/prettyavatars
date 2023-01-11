import UnderlineLink from '@/components/links/UnderlineLink';

export const Footer = () => {
  return (
    <div className='flex justify-center'>
      <footer className='layout absolute bottom-2 justify-between text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
          Theodorus Clarence
        </UnderlineLink>
      </footer>
    </div>
  );
};
