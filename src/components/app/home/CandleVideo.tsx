import { useState, useRef, useEffect } from "react";

export const CandleVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) (videoRef.current as any).play();
  }, []);

  return (
    <div className="absolute bottom-0 right-0 w-96">
      <video
        loop
        muted
        autoPlay
        src={"/video/candle.mp4"}
        preload={"auto"}
        ref={videoRef}
        onLoad={() => {
          console.log("loaded");
        }}
      ></video>
    </div>
  );
};
