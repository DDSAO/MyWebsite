import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";

export const Loading = (props: { loading: boolean; sizeStr: string }) => {
  const { loading, sizeStr } = props;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={
        loading
          ? `relative ${sizeStr}`
          : "w-0.5 h-0.5 fixed top-0 opacity-0 -z-10"
      }
    >
      <BiLoader
        className={`absolute top-0 animate-spin ${
          loading ? sizeStr : "w-0.5 h-0.5 "
        } ${loaded ? "hidden" : ""}`}
      />
      <iframe
        onLoad={() => {
          setLoaded(true);
        }}
        className={`absolute top-0 ${sizeStr} pointer-events-none ${
          loaded ? "" : "opacity-0"
        }`}
        src="https://embed.lottiefiles.com/animation/99376"
      ></iframe>
    </div>
  );
};
