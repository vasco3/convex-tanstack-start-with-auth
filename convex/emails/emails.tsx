import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
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
      <Preview>{'Fentexhaus Inicia sesión'}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Text className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Inicia sesión en{' '}
              <strong className="text-black  tracking-wider ">
                fentexhaus.mx
              </strong>
            </Text>

            <Section className="my-8">
              <Text className="text-black text-lg font-medium p-0 my-0 mx-0">
                Da click en el botón para iniciar sesión en{' '}
              </Text>

              <Link
                className="mt-4 bg-black rounded-md text-white text-[12px] font-semibold no-underline text-center px-5 py-3 my-6 mx-0"
                href={url}
              >
                Iniciar sesión
              </Link>
            </Section>
            <Section className="my-8">
              <Text className="text-black text-lg font-medium p-0 my-0 mx-0">
                O copia y pega el siguiente enlace en tu navegador:
              </Text>
              <Text className="text-black text-sm leading-4">{url}</Text>
            </Section>
            <Text className="text-black text-sm leading-4">Atentamente,</Text>
            <Text className="text-black font-bold text-base tracking-widest leading-3 my-0 ">
              FENTEXHAUS
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
