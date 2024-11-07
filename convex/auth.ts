import { Resend } from 'resend'
import ResendProvider from '@auth/core/providers/resend'

import { convexAuth } from '@convex-dev/auth/server'
import { SignInEmail } from './emails/emails'

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    ResendProvider({
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: to, provider, url }) {
        if (provider.apiKey === undefined) {
          console.error('Set up `AUTH_RESEND_KEY` to send auth emails')
          return
        }

        try {
          const resend = new Resend(process.env.AUTH_RESEND_KEY!)

          const res = await resend.emails.send({
            from: process.env.EMAIL_FROM!, // 'Convex with TanStack Start <no-reply@gmail.com>',
            to,
            subject: 'Sign in to Convex with TanStack Start',
            react: SignInEmail({ url }),
            text: `Sign in to Convex with TanStack Start: ${url}`,
          })

          if (res.error)
            throw new Error('Resend error: ' + JSON.stringify(res.error))
        } catch (error) {
          console.error('Failed to send verification email:', error)
          throw error
        }
      },
    }),
  ],
})
