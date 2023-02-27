import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${josefin.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
