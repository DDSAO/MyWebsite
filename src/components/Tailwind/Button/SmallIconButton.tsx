import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const SmallIconButton = (props: {
  icon: any;
  onClickF?: (e: any) => void;
  text?: string;
  hoverAttr?: string;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
}) => {
  const { icon, onClickF, text, hoverAttr, loading, disabled, color } = props;
  const textRef = useRef(null);
  const [isHovering, setHovering] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(true);
  const [isShowing, setShowing] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isHovering) {
      setIsDestroyed(false);
      interval = setInterval(() => {
        setShowing(true);
      }, 300);
    } else {
      setShowing(false);
      interval = setInterval(() => {
        setIsDestroyed(true);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isHovering]);

  if (disabled)
    return (
      <div className={`relative cursor-not-allowed w-6 h-6 `}>
        <div
          className={`absolute top-0 left-0 p-1 w-6 h-6 text-[16px] rounded-2xl text-slate-400`}
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        >
          {icon}
        </div>
        {text ? (
          <p
            ref={textRef}
            className={`absolute  ${isShowing ? "opacity-100" : "opacity-0 "} ${
              isDestroyed ? "hidden" : ""
            } transition-opacity duration-300 text-xs rounded-md py-1 px-2 bg-gray-400 text-slate-100 top-7 ${
              textRef.current
                ? // `left-[${
                  //     Math.round((textRef.current as any).offsetWidth / 2) - 32
                  //   }px]`
                  "left-[50%]"
                : ""
            } -translate-x-1/2 z-20 whitespace-nowrap`}
          >
            {text}
          </p>
        ) : null}
      </div>
    );

  return (
    <div className={`relative cursor-pointer w-6 h-6 `}>
      <div
        onClick={(e) => {
          if (!loading && onClickF) onClickF(e);
        }}
        className={`absolute top-0 left-0 p-1 w-6 h-6 text-[16px] rounded-2xl ${
          hoverAttr ? hoverAttr : ""
        } ${loading ? "text-slate-600" : color}`}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin " />
        ) : (
          icon
        )}
      </div>
      {text ? (
        <p
          ref={textRef}
          className={`absolute  ${isShowing ? "opacity-100" : "opacity-0 "} ${
            isDestroyed ? "hidden" : ""
          } transition-opacity duration-300 text-xs rounded-md py-1 px-2 bg-gray-600 text-white top-7 ${
            textRef.current
              ? // `left-[${
                //     Math.round((textRef.current as any).offsetWidth / 2) - 32
                //   }px]`
                "left-[50%]"
              : ""
          } -translate-x-1/2 z-20 whitespace-nowrap`}
        >
          {loading ? "LOADING" : text}
        </p>
      ) : null}
    </div>
  );
};
