/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { redis } from '@/lib/redis'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleAuthProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET!,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: UpstashRedisAdapter(redis),
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
    verifyRequest: '/login', // (used for check email message)
  },
}

export default NextAuth(authOptions)
