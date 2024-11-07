import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface SignInEmailProps {
  url: string
}

export const SignInEmail = ({ url }: SignInEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{'Sign in to Convex with TanStack Start'}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Text className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Sign in to{' '}
              <strong className="text-black  tracking-wider ">
                Convex with TanStack Start
              </strong>
            </Text>

            <Section className="my-8">
              <Text className="text-black text-lg font-medium p-0 my-0 mx-0">
                Click the button to sign in to{' '}
              </Text>

              <Link
                className="mt-4 bg-black rounded-md text-white text-[12px] font-semibold no-underline text-center px-5 py-3 my-6 mx-0"
                href={url}
              >
                Sign in
              </Link>
            </Section>
            <Section className="my-8">
              <Text className="text-black text-lg font-medium p-0 my-0 mx-0">
                Or copy and paste this link in your browser:
              </Text>
              <Text className="text-black text-sm leading-4">{url}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
