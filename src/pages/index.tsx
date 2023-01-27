import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { CopyBlock, dracula } from 'react-code-blocks'
import useDarkMode from 'use-dark-mode'

import Layout from '@/components/layout/Layout'
import UnderlineLink from '@/components/links/UnderlineLink'
// Need to do a dumbass dynamic import because of hydration errors
const Playground = dynamic(
  () =>
    import('@/components/Playground').then(
      (playground) => playground.Playground
    ),
  {
    loading: () => <p>Loading...</p>,
    ssr: true,
  }
)

import Seo from '@/components/Seo'

import { trpc } from '@/utils/trpc'

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
  const { value: isDarkMode } = useDarkMode(true)
  const data = trpc.post.create.useMutation()
  const { data: session } = useSession()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main className='h-full'>
        <div className='layout flex flex-col items-center justify-center text-center'>
          <section className='flex min-h-screen flex-col items-center justify-center'>
            <div className=''>
              <h1 className='heading-1 mt-4 p-4 text-8xl font-extrabold'>
                <span
                  className={clsx(
                    'bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-black text-transparent'
                  )}
                >
                  Pretty Avatars
                </span>
              </h1>
            </div>
            <p className='mt-8 w-3/4 text-xl'>
              A collection of pretty avatars for your next project. All avatars
              are SVG-based and are generated based on the name and color
              palette you provide.
            </p>
            <div className='mt-8 w-full max-w-xl px-2 sm:px-0'>
              <h2 className='text-left'>Install Locally</h2>

              <div className='mt-2'>
                <Tab.Group>
                  <Tab.List
                    className={clsx(
                      'flex space-x-1 rounded p-1',
                      isDarkMode
                        ? 'bg-dark-paper'
                        : 'bg-light-paper text-light-text'
                    )}
                  >
                    {['npm', 'yarn', 'pnpm'].map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          clsx(
                            'w-full rounded py-2.5 text-sm font-medium leading-5',
                            'ring-white ring-offset-2 focus:outline-none',
                            selected && 'bg-light-bg text-light-text shadow'
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
                  text='https://prettyavatars.com/api/marble/120/pretty-avatars'
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
          </section>
          <Playground />
        </div>
      </main>
    </Layout>
  )
}
