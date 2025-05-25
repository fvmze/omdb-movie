import Document, {
  type DocumentContext,
  type DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

type Nonce = string | undefined

interface Props extends DocumentInitialProps {
  nonce?: Nonce
}

const extractNonce = (header: string | string[] | number | undefined): string | undefined => {
  if (typeof header === 'number') return String(header)
  if (Array.isArray(header)) return header[0]
  return typeof header === 'string' ? header : undefined
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initialProps = await Document.getInitialProps(ctx)
    const nonce = extractNonce(ctx.res?.getHeader('X-Nonce'))

    return {
      ...initialProps,
      nonce,
    }
  }

  render() {
    const { nonce } = this.props

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript {...(nonce ? { nonce } : {})} />
        </body>
      </Html>
    )
  }
}
