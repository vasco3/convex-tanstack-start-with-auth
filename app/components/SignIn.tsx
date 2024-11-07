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
      <div className="flex flex-col items-start gap-2">
        <p className="text-slate-300 mb-4">
          Sign in with your email to explore the examples and see how Convex
          works with TanStack Start.
        </p>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          className="px-4 py-2 w-96 shadow-sm placeholder:text-stone-400 border-0 focus:ring-blue-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-tight ring-1 ring-inset ring-stone-300 rounded-md dark:bg-stone-700"
          name="email"
          placeholder="Email"
          type="text"
          disabled={status === 'loading'}
        />
        <button
          className=" mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-md active:shadow-none text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send sign-in link'}
        </button>
      </div>
    </form>
  )
}
