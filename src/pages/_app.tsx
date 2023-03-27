import "@/styles/globals.css";
import gsap from "gsap";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { RecoilRoot } from "recoil";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  gsap.config({ nullTargetWarn: false });

  return (
    <RecoilRoot>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}
