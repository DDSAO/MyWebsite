import "@/styles/globals.css";
import gsap from "gsap";
import type { AppProps } from "next/app";
import { Inter, Josefin_Sans } from "next/font/google";
import { RecoilRoot } from "recoil";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  gsap.config({ nullTargetWarn: false });

  return (
    <RecoilRoot>
      <main className={`${josefin.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}
