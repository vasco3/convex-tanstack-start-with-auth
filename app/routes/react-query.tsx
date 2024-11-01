import { Link, createFileRoute } from '@tanstack/react-router'
import CodeSample from '~/components/CodeSample'
import Chat from '~/components/Chat'
import { Button } from '~/components/ui/button'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ReloadIcon } from '@radix-ui/react-icons'

export const Route = createFileRoute('/react-query')({
  component: ReactQuery,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery({
      ...convexQuery(api.messages.isSimulatingTraffic, {}),
      gcTime: 2000,
    })
  },
})

export default function ReactQuery() {
  const sendTraffic = useConvexMutation(api.messages.simulateTraffic)
  const { data: simulationRunning } = useSuspenseQuery({
    ...convexQuery(api.messages.isSimulatingTraffic, {}),
    gcTime: 2000,
  })
  return (
    <>
      <h2>
        React Query hooks: <code>useQuery()</code> returns an object now
      </h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2  ">
        <div>
          <p className="mt-0">
            TanStack Start apps should use React Query (TanStack Query for
            React) hooks instead of the tranditional Convex hooks to take
            advantage of React Query's excellent Start integration. Convex
            queries are exposed through{' '}
            <a href="https://tkdodo.eu/blog/the-query-options-api">
              query options factories
            </a>{' '}
            like{' '}
            <a href="https://docs.convex.dev/client/tanstack-query#queries">
              <code>convexQuery()</code>
            </a>
            .
          </p>
          <p>
            Instead of React Query's standard interval and activity-based
            polling and manual invalidation, updates are streamed down WebSocket
            to{' '}
            <a href="https://docs.convex.dev/client/tanstack-query#differences-from-using-fetch-with-tanstack-query">
              update the Query Cache directly
            </a>{' '}
            for live, always-up-to-date results.
          </p>
          <p>
            Open this page in another tab or on your phone and send a message to
            see these updates pushed live.{' '}
            <Button variant="ghost" onClick={() => sendTraffic()}>
              Simulat{simulationRunning ? 'ing' : 'e'} chat traffic{' '}
              {simulationRunning ? (
                <ReloadIcon className="h-4 w-4 animate-spin inline" />
              ) : null}
            </Button>
          </p>
          <Chat useSuspense={true} />
          <p>
            Even if you're not familiar with React Query these hooks should feel
            familiar. Instead of returning the data directly, this{' '}
            <code>useQuery()</code> returns an object with a <code>.data</code>{' '}
            property along with other metadata. The hook accepts a single
            object, which you'll mostly populate with the return value of the{' '}
            <code>convexQuery()</code>
            hook. But it's generally used the same way as the Convex{' '}
            <code>useQuery()</code> hook.
          </p>
          <p>
            The same React Query hooks can be used for fetch endpoints and
            Convex actions for standard interval or activity-based polling while
            Convex queries benefit from the live update behavior.
          </p>
          <p>
            What do you get from this change? It's not just the often-asked-for{' '}
            <code>isLoading</code> and <code>error</code> properties or simple
            interop with other server endpoints or introspection from the
            TanStack Query devtools. And it's not just that React Router's
            integration with the TanStack Start provides{' '}
            <Link to="/ssr">
              server-side rendering and live updating queries
            </Link>{' '}
            in a single hook, although that's what we'll look at next.
          </p>
        </div>
        <div>
          <CodeSample
            code={`import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../convex/_generated/api";

const messagesQuery = convexQuery(
  api.messages.listMessages,
  { channel: "chatty" }
)

// inside a React component
const { data, isPending } = useQuery(messagesQuery);

// in an event handler, useEfect, or loader
queryClient.prefetchQuery(messagesQuery);

// adding more query options to convexQuery()
const { data } = useQuery({
  ...convexQuery(api.mesages.listMessages, {}),
  initialData: [],
  gcTime: 10000,
});`}
          />
        </div>
      </div>

      <h2>Learn More</h2>
      <p>
        <a href="https://tanstack.com/query/latest/docs/framework/react/overviewj">
          TanStack Query (AKA React Query) docs
        </a>
      </p>
      <p>
        The{' '}
        <a href="https://github.com/get-convex/convex-react-query">
          @convex-dev/react-query
        </a>{' '}
        library links the TanStack Query Client with the Convex client
      </p>
    </>
  )
}
