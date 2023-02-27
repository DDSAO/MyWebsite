import { AiOutlineLoading, AiOutlineStop } from "react-icons/ai";
import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import gsap, { Elastic, Power4 } from "gsap";

export const SlideButton = (props: {
  onClickF: () => void;
  text?: string;
  // startIcon?: any;
  // endIcon?: any;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  selected?: boolean;
  width?: number;
}) => {
  const { onClickF, text, loading, disabled, color, selected, width } = props;

  const upperRef = useRef(null);
  const lowerRef = useRef(null);

  let { textColor, selectedTextColor, borderColor, selectedColor } =
    useMemo(() => {
      switch (color) {
        case "blue":
          return {
            textColor: "text-blue-500",
            selectedTextColor: "text-white",
            borderColor:
              "border-blue-300 hover:border-blue-500 hover:bg-blue-50",
            selectedColor:
              "border-blue-500 hover:border-blue-700 bg-blue-500 hover:bg-blue-700",
          };
        case "white":
          return {
            textColor: "text-white",
            borderColor: "border-slate-50 hover:border-white ",
          };
        case "yellow":
          return {
            textColor: "text-yellow-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-yellow-300 hover:border-yellow-500 hover:bg-yellow-50",
            selectedColor:
              "border-yellow-500 hover:border-yellow-500 bg-yellow-500 hover:bg-yellow-700",
          };
        case "green":
          return {
            textColor: "text-green-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-green-500 hover:border-green-700 hover:bg-green-50",
            selectedColor:
              "border-green-500 hover:border-green-700 bg-green-500 hover:bg-green-700",
          };
        default:
          return {
            textColor: "text-blue-500",
            selectedTextColor: "text-white",
            borderColor:
              "border-blue-300 hover:border-blue-500 hover:bg-blue-50",
            selectedColor:
              "border-blue-500 hover:border-blue-500 bg-blue-500 hover:bg-blue-700",
          };
      }
    }, [color]);

  const hoverTimeline = useRef(null);

  // const hoverTimeline = useMemo(() => {
  //   return gsap.timeline({ paused: true });
  // }, []);

  useEffect(() => {
    hoverTimeline.current = gsap
      .timeline({ paused: true })
      .fromTo(
        upperRef.current,
        { y: 0 },
        { y: 30, duration: 0.5, ease: Power4.easeInOut }
      )
      .fromTo(
        lowerRef.current,
        { y: 0 },
        { y: 32, duration: 0.5, ease: Power4.easeInOut },
        "-=0.5"
      ) as any;
    return () => {
      (hoverTimeline.current as any).kill();
    };
  }, []);

  return (
    <div
      onClick={() => {
        !loading && !disabled && onClickF();
      }}
      onMouseEnter={() => {
        if (hoverTimeline.current && !loading && !disabled) {
          // if (selected) {
          //   (hoverTimeline.current as any).reverse();
          // } else {
          //   (hoverTimeline.current as any).play();
          // }
          (hoverTimeline.current as any).play();
        }
      }}
      onMouseLeave={() => {
        if (hoverTimeline.current && !loading && !disabled)
          // if (selected) {
          //   (hoverTimeline.current as any).play();
          // } else {
          //   (hoverTimeline.current as any).reverse();
          // }
          (hoverTimeline.current as any).reverse();
      }}
      className={`flex h-8 ${loading ? "animate-pulse" : ""}`}
    >
      <div
        style={{
          width: width ? width : (lowerRef.current as any)?.clientWidth,
        }}
        className={`relative flex flex-col flex-start items-center h-8 cursor-pointer rounded-md leading-7 border ${
          loading || disabled
            ? "bg-slate-200"
            : selected
            ? selectedColor
            : borderColor
        }  overflow-hidden `}
      >
        {loading && (
          <div className={` h-8 flex justify-center items-center mx-auto`}>
            <AiOutlineLoading className="animate-spin text-slate-500" />
          </div>
        )}
        <p
          ref={upperRef}
          className={`${
            loading ? "opacity-0" : ""
          } top-[-100%] leading-8 h-8 absolute cursor-pointer overflow-hidden text-center whitespace-nowrap ${
            loading || disabled
              ? "text-slate-400"
              : selected
              ? selectedTextColor
              : textColor
          }  px-4`}
        >
          {text}
        </p>
        <p
          ref={lowerRef}
          className={`${
            loading ? "opacity-0" : ""
          } absolute leading-8 h-8 cursor-pointer overflow-hidden text-center whitespace-nowrap ${
            loading || disabled
              ? "text-slate-400"
              : selected
              ? selectedTextColor
              : textColor
          }  px-4`}
        >
          {text}
        </p>

        <p
          className={`relative h-0 cursor-pointer overflow-hidden text-center whitespace-nowrap text-slate-500 px-4`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
