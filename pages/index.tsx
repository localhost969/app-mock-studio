import Head from "next/head";
import { ScreenMockupStudio } from "@/components/ScreenMockupStudio";

export default function Home() {
  return (
    <>
      <Head>
        <title>App Mockup Studio</title>
        <meta name="description" content="Generate mockups of Apple and Android for mobile app screenshots" />
        <link rel="icon" type="image/jpeg" href="/logo.jpg" />
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <main>
          <ScreenMockupStudio />
        </main>
      </div>
    </>
  );
}
