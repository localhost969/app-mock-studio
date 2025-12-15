import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>APP Mockup Studio</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="APP Mockup Studio - Create beautiful device mockups for your app easily" />
        <meta name="keywords" content="mockup, device frame, iPhone, Pixel, screenshots" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="APP Mockup Studio" />
        <meta property="og:description" content="Create beautiful device mockups for your app easily" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://app-mockup-studio.vercel.app" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
