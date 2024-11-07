import { QueryClient } from '@tanstack/react-query'
import {
  Link,
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from 'react'
import appCss from '../styles/app.css?url'
import { cn } from '~/lib/utils'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    meta: () => [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: () => [{ rel: 'stylesheet', href: appCss }],
    component: RootComponent,
  },
)

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <RootLayout>{children}</RootLayout>
        <ReactQueryDevtools initialIsOpen={false} />
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseClasses = 'pb-1 font-medium px-3 py-2 transition-colors rounded-md'
  const activeProps = {
    className: cn(baseClasses, 'bg-slate-700'),
  } as const
  const inactiveProps = {
    className: cn(baseClasses, 'hover:bg-slate-800'),
  } as const
  const linkProps = { inactiveProps, activeProps } as const
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto py-4 flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold">Convex with TanStack Start</h1>
          </Link>
          <nav>
            <ul className="flex gap-4 xl:flex-row flex-col xl:gap-1">
              <li>
                <Link to="/react-query" {...linkProps}>
                  React Query hooks
                </Link>
              </li>
              <li>
                <Link to="/ssr" {...linkProps}>
                  SSR and Live Queries
                </Link>
              </li>
              <li>
                <Link to="/gcTime" {...linkProps}>
                  Staying subscribed
                </Link>
              </li>
              <li>
                <Link
                  to="/loaders"
                  search={{ cacheBust: 'initial' }}
                  {...linkProps}
                >
                  Loaders
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-12 prose-xl prose-slate prose-headings:font-bold prose-ol:pl-0 prose-li:pl-0 prose-a:underline prose-a:underline-offset-3 prose-p:leading-snug transition-colors hover:prose-a:text-white">
        {children}
      </main>
    </div>
  )
}
