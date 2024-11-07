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
            from: 'Fentexhaus <fentexhaus+automatico@sesiones.fentexhaus.mx>',
            to,
            subject: 'Iniciar sesión en Fentexhaus.mx',
            react: SignInEmail({ url }),
            text: `Iniciar sesión en fentexhaus.mx: ${url}`,
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
