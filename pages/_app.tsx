import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google";

const appSans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${appSans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
