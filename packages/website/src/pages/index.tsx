import { CopyButton } from '@/components/buttons/CopyButton'
import Layout from '@/components/layout/Layout'
import UnderlineLink from '@/components/links/UnderlineLink'

import Seo from '@/components/Seo'
import { trpc } from '@/utils/trpc'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

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

export default function HomePage() {
  const data = trpc.post.create.useMutation()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Seo />

      <main className='h-full'>
        <div className='layout flex flex-col items-center justify-center text-center'>
          <section className='flex min-h-screen flex-col items-center justify-center'>
            <div className='flex flex-col items-center'>
              <h1
                className={clsx(
                  'heading-1 w-120 text-center font-extrabold',
                  'text-8xl'
                )}
              >
                <span
                  className={clsx(
                    'bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-black text-transparent'
                  )}
                >
                  Pretty Avatars
                </span>
              </h1>
            </div>
            <p className='mt-8 text-xl sm:w-3/4'>
              A collection of pretty avatars for your next project. All avatars
              are SVG-based and are generated based on the name and color
              palette you provide.
            </p>
            <div className='mt-16 w-full max-w-xl px-2 sm:px-0'>
              <h2 className='text-left'>From the CDN</h2>
              <div className='mt-2'>
                <CopyButton value='https://prettyavatars.com/api/letter/120' />
              </div>
              <div className='mt-1 text-left text-sm'>
                Avatars served from the CDN are free for{' '}
                <span className='underline'>non-commercial</span> use and
                subject to the limits in the{' '}
                <UnderlineLink href='/terms'>Terms & Conditions</UnderlineLink>.
              </div>
            </div>
            <div className='mt-8 w-full max-w-xl px-2 sm:px-0'>
              <h2 className='text-left'>Install for React</h2>
              <div className='mt-2'>
                <CopyButton value='npm i prettyavatars' />
              </div>
            </div>
          </section>
          <Playground />
        </div>
      </main>
    </Layout>
  )
}
