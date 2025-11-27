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
    async authorized({ auth, request }) {
      const { pathname } = request.nextUrl

      // Allow access to root path (welcome screen)
      if (pathname === '/') return true

      // Allow API routes
      if (pathname.startsWith('/api')) return true

      // Check if user is authenticated (for real mode)
      if (auth) return true

      // Check for demo mode cookie
      const appMode = request.cookies.get('app-mode')?.value
      if (appMode === 'demo') return true

      // Deny access - will redirect to '/'
      return false
    },
  },
  pages: {
    signIn: '/', // Redirect to welcome modal
  },
  debug: process.env.NODE_ENV === 'development',
})
