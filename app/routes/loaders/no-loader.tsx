import { createFileRoute } from '@tanstack/react-router'
import Chat from '~/components/Chat'

export const Route = createFileRoute('/loaders/no-loader')({
  component: Messages,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      cacheBust: typeof search.cacheBust === 'string' ? search.cacheBust : '',
    }
  },
})

function Messages() {
  const { cacheBust } = Route.useSearch()
  return (
    <div>
      <Chat
        channel="nyc"
        gcTime={10000}
        useSuspense={false}
        cacheBust={cacheBust}
      />
    </div>
  )
}
