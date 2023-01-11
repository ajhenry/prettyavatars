import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { CopyBlock, dracula } from 'react-code-blocks';

import useTheme from '@/hooks/useTheme';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { trpc } from '@/utils/trpc';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { isDarkMode } = useTheme();
  const data = trpc.post.create.useMutation();
  const { data: session } = useSession();
  console.log(session);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main className='h-full'>
        <section className={clsx('bg-white')}>
          <div className='layout flex flex-col items-center justify-center pt-36 text-center'>
            <div className=''>
              <h1 className='heading-1 mt-4 p-4 text-8xl font-extrabold'>
                <span className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'>
                  Pretty
                </span>{' '}
                Avatars
              </h1>
            </div>
            <p className='mt-8 w-3/4 text-xl text-gray-800'>
              A collection of pretty avatars for your next project. All avatars
              are SVG-based and are generated based on the name and color
              palette you provide.
            </p>
            <div className='mt-8 w-full max-w-xl px-2 sm:px-0'>
              <h2 className='text-left'>Install Locally</h2>

              <div className='mt-2'>
                <Tab.Group>
                  <Tab.List className='flex space-x-1 rounded bg-primary-700 p-1'>
                    {['npm', 'yarn', 'pnpm'].map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded py-2.5 text-sm font-medium leading-5',
                            'ring-white ring-offset-2 focus:outline-none',
                            selected ? 'bg-white shadow' : 'text-white'
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className='mt-2'>
                    {[
                      'npm install pretty-avatars',
                      'yarn add pretty-avatars',
                      'pnpm install pretty-avatars',
                    ].map((cmd, idx) => (
                      <Tab.Panel
                        key={idx}
                        className={clsx(
                          'ring-white ring-offset-blue-400 focus:outline-none'
                        )}
                      >
                        <CopyBlock
                          text={cmd}
                          language='bash'
                          theme={dracula}
                          showLineNumbers={false}
                          codeBlock
                        />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
            <div className='mt-16 w-full max-w-xl px-2 sm:px-0'>
              <h2 className='text-left'>From the CDN</h2>
              <div className='mt-2'>
                <CopyBlock
                  text='https://prettyavatars.com/api/marble?name=HarryStyles'
                  theme={dracula}
                  showLineNumbers={false}
                  codeBlock
                />
              </div>
              <div className='mt-1 text-left text-sm'>
                Avatars served from the CDN are free for{' '}
                <span className='underline'>non-commercial</span> use and
                subject to the limits in the{' '}
                <UnderlineLink href='/terms'>Terms & Conditions</UnderlineLink>.
              </div>
            </div>
            <div className='mt-16 flex flex-col justify-center'>
              <h2 className='text-5xl'>Playground</h2>
              <div className='mt-8 flex flex-row flex-wrap justify-center space-x-2'>
                {Array.from({ length: 80 }).map((_, i) => (
                  <div className='flex flex-col items-center' key={i}>
                    <div className='h-24 w-24 rounded-full bg-black' />
                    <input
                      value='Billy Bob'
                      className='mt-2 w-32 text-center'
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className='mt-2 text-sm text-gray-700'>
              <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                See the repository
              </ArrowLink>
            </p>

            <ButtonLink className='mt-6' href='/components' variant='light'>
              See all components
            </ButtonLink>

            <UnstyledLink
              href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
              className='mt-4'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              />
            </UnstyledLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
