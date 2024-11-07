import { useAuthActions } from '@convex-dev/auth/react'
import { useState } from 'react'

export function SignIn() {
  const { signIn } = useAuthActions()
  const [status, setStatus] = useState<'init' | 'loading' | 'sent'>('init')

  return status === 'sent' ? (
    <div className="text-center">
      <p className="text-lg font-medium text-green-600">Link sent!</p>
      <p className="mt-2 text-sm text-gray-600">
        Please check your email to continue with the sign-in process.
      </p>
    </div>
  ) : (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        setStatus('loading')
        try {
          const formData = new FormData(event.currentTarget)
          await signIn('resend', formData)
          setStatus('sent')
        } catch (error) {
          setStatus('init')
        }
      }}
    >
      <input
        className="input-input"
        name="email"
        placeholder="Email"
        type="text"
        disabled={status === 'loading'}
      />
      <button
        className="button-blue mt-2"
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' : 'Send sign-in link'}
      </button>
    </form>
  )
}
