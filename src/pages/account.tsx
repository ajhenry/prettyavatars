import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'

import Layout from '@/components/layout/Layout'
import type { GetServerSidePropsContext } from 'next'
import type { Session } from 'next-auth'

const Account: React.FC<{ session: Session }> = ({ session }) => {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  return (
    <Layout>
      <h1>Server Side Rendering</h1>
      <p>
        This page uses the <strong>getServerSession()</strong> method in{' '}
        <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getServerSession()</strong> in{' '}
        <strong>getServerSideProps()</strong> is the recommended approach if you
        need to support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require
        client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to
        render.
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session: session,
    },
  }
}

export default Account
