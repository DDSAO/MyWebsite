import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";

export const Tick = (props: { show: boolean; sizeStr: string }) => {
  const { show, sizeStr } = props;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={
        show ? `relative ${sizeStr}` : "w-0.5 h-0.5 fixed top-0 opacity-0 -z-10"
      }
    >
      <TiTickOutline
        className={`absolute top-0 animate-ping ${
          show ? sizeStr : "w-0.5 h-0.5 "
        } ${loaded ? "hidden" : ""} text-green-500`}
      />
      <TiTickOutline
        className={`absolute top-0 ${show ? sizeStr : "w-0.5 h-0.5 "} ${
          loaded ? "hidden" : ""
        } text-green-500`}
      />
      <iframe
        onLoad={() => {
          setLoaded(true);
        }}
        className={`absolute top-0 ${sizeStr} pointer-events-none ${
          loaded ? "" : "opacity-0"
        }`}
        src="https://embed.lottiefiles.com/animation/57373"
      ></iframe>
    </div>
  );
};
