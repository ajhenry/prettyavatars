import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

interface TermsProps {}

const Terms: React.FC<TermsProps> = () => {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main className='h-full'>Full</main>
    </Layout>
  )
}

export default Terms
