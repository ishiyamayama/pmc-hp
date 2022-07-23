import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Noto+Serif+JP&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <script></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
