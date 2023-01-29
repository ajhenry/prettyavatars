import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/Layout'
import clsx from 'clsx'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { ImGithub, ImGoogle } from 'react-icons/im'
import useDarkMode from 'use-dark-mode'
import { authOptions } from './api/auth/[...nextauth]'

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [githubIsLoading, setGithubIsLoading] = useState(false)
  const [googleIsLoading, setGoogleIsLoading] = useState(false)
  const { value: isDarkMode } = useDarkMode(true)
  const router = useRouter()
  const { error: _ } = router.query

  const handleGoogleSignIn = async () => {
    setGoogleIsLoading(true)
    await signIn('google')
    setGoogleIsLoading(false)
  }

  const handleGithubSignIn = async () => {
    setGithubIsLoading(true)
    await signIn('github')
    setGithubIsLoading(false)
  }

  return (
    <Layout>
      <main className='layout flex flex-1 flex-col items-center justify-center text-center'>
        <h1 className='text-5xl'>Login</h1>
        <div className='mt-8 w-80 space-y-2'>
          <Button
            className={clsx(
              'w-full justify-center py-2 font-bold',
              isDarkMode
                ? 'bg-dark-paper text-white'
                : 'bg-light-paper text-light-text'
            )}
            isLoading={githubIsLoading}
            onClick={handleGithubSignIn}
          >
            <ImGithub size={20} />
            <span className='ml-2'>GitHub</span>
          </Button>
          <Button
            className={clsx(
              'w-full justify-center py-2 font-bold',
              isDarkMode
                ? 'bg-dark-paper text-white'
                : 'bg-light-paper text-light-text'
            )}
            isLoading={googleIsLoading}
            onClick={handleGoogleSignIn}
          >
            <ImGoogle size={20} />
            <span className='ml-2'>Google</span>
          </Button>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Login
