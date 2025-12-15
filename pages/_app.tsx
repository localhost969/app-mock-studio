import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const appSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-app-sans",
  display: "swap",
});

const appMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-app-mono",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${appSans.variable} ${appMono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
