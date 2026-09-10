import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Generate mockups of Apple and Android for mobile app screenshots" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="App Mockup Studio" />
        <meta property="og:description" content="Generate mockups of Apple and Android for mobile app screenshots" />
        <meta property="og:image" content="/app.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="App Mockup Studio" />
        <meta name="twitter:description" content="Generate mockups of Apple and Android for mobile app screenshots" />
        <meta name="twitter:image" content="/app.png" />
        <link rel="icon" type="image/jpeg" href="/app.png" />
        <link rel="shortcut icon" type="image/jpeg" href="/app.png" />
        <link rel="apple-touch-icon" href="/app.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
