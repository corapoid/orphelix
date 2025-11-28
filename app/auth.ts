import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: '/', // Redirect to welcome modal
  },
  debug: process.env.NODE_ENV === 'development',
})
