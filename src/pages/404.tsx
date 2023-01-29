import Layout from '@/components/layout/Layout'
import ArrowLink from '@/components/links/ArrowLink'
import Seo from '@/components/Seo'

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main className='flex flex-1 justify-center'>
        <div className='layout flex flex-col items-center justify-center text-center'>
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
          <ArrowLink className='mt-4 md:text-lg' href='/'>
            Back to Home
          </ArrowLink>
        </div>
      </main>
    </Layout>
  )
}
