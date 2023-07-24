import Layout from '@/components/layout/Layout'

interface User {
  name: string
  email: string
  image: string
}

const Account: React.FC<{ user: User }> = (props) => {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.

  return (
    <Layout>
      <main className='layout'>
        <h1>Server Side Rendering</h1>
        <p>
          This page uses the <strong>getServerSession()</strong> method in{' '}
          <strong>getServerSideProps()</strong>.
        </p>
        <p>
          Using <strong>getServerSession()</strong> in{' '}
          <strong>getServerSideProps()</strong> is the recommended approach if
          you need to support Server Side Rendering with authentication.
        </p>
        <p>
          The advantage of Server Side Rendering is this page does not require
          client side JavaScript.
        </p>
        <p>
          The disadvantage of Server Side Rendering is that this page is slower
          to render.
        </p>
        <pre>{JSON.stringify(props.user, null, 2)}</pre>
      </main>
    </Layout>
  )
}

export default Account
