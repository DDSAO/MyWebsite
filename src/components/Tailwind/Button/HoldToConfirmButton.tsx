import gsap from "gsap";
import { useEffect, useRef, useState, useMemo } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const HoldToConfirmButton = (props: {
  loading?: boolean;
  front?: string;
  back?: string;
  disabled?: boolean;
  color?: string;
  onClickF?: () => void;
  startIcon?: any;
  endIcon?: any;
}) => {
  const {
    loading,
    front,
    back,
    disabled,
    onClickF,
    color,
    startIcon,
    endIcon,
  } = props;

  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState(true);
  const theRef = useRef(null);

  const frontRef = useRef(null);
  const backRef = useRef(null);
  const barRef = useRef(null);

  const confirmTimeline = useRef(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (theRef.current && !(theRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    if (!loading && !disabled) {
      confirmTimeline.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            setLock(false);
          },
        })
        .fromTo(
          barRef.current,
          {
            width: 0,
          },
          {
            width:
              (frontRef.current as any)?.clientWidth >
              (backRef.current as any)?.clientWidth
                ? (frontRef.current as any)?.clientWidth
                : (backRef.current as any)?.clientWidth - 16,
            duration: 1,
          }
        )
        .fromTo(
          frontRef.current,
          {
            opacity: 1,
            scale: 1,
          },
          {
            opacity: 0,
            scale: 0.9,

            duration: 0.3,
          },
          "-=0.3"
        )
        .fromTo(
          backRef.current,
          { y: "-100%" },
          {
            y: 0,
            duration: 0.3,
          },
          "-=0.3"
        ) as any;
    } else {
      confirmTimeline.current = gsap
        .timeline({
          paused: true,
        })
        .from(backRef.current, { y: "-100%" }) as any;
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      if (confirmTimeline.current) (confirmTimeline.current as any).kill();
    };
  }, [loading, disabled, front, back]);

  let { textColor, selectedTextColor, borderColor, selectedColor } =
    useMemo(() => {
      if (disabled)
        return {
          textColor: "text-slate-400",
          selectedTextColor: "text-white",
          borderColor: "bg-slate-200",
          selectedColor: "bg-slate-200",
        };

      switch (color) {
        case "blue":
          return {
            textColor: "text-blue-500",
            selectedTextColor: "text-white",
            borderColor:
              "border-blue-300 hover:border-blue-500 bg-white hover:bg-blue-50",
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
              "border-yellow-300 hover:border-yellow-500 bg-white hover:bg-yellow-50",
            selectedColor:
              "border-yellow-500 hover:border-yellow-500 bg-yellow-500 hover:bg-yellow-700",
          };
        case "green":
          return {
            textColor: "text-green-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-green-500 hover:border-green-700 bg-white hover:bg-green-50",
            selectedColor:
              "border-green-500 hover:border-green-700 bg-green-500 hover:bg-green-700",
          };
        case "pink":
          return {
            textColor: "text-pink-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-pink-300 hover:border-pink-500  bg-white hover:bg-pink-50",
            selectedColor:
              "border-pink-500 hover:border-pink-500 bg-pink-500 hover:bg-pink-700",
          };

        case "red":
          return {
            textColor: "text-red-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-red-300 hover:border-red-500 bg-white hover:bg-red-50",
            selectedColor:
              "border-red-500 hover:border-red-500 bg-red-500 hover:bg-red-700",
          };
        default:
          return {
            textColor: "text-blue-500",
            selectedTextColor: "text-white",
            borderColor:
              "border-blue-300 hover:border-blue-500 bg-white hover:bg-blue-50",
            selectedColor:
              "border-blue-500 hover:border-blue-500 bg-blue-500 hover:bg-blue-700",
          };
      }
    }, [color, disabled]);

  if (loading)
    return (
      <div
        className={`relative cursor-pointer h-8 border border-slate-400 rounded-md overflow-hidden bg-slate-200`}
      >
        <p
          ref={frontRef}
          className={`${textColor} select-none w-full px-4 text-center absolute top-0 leading-8 whitespace-nowrap opacity-0`}
        >
          {front}
        </p>
        {/* Drop down text  */}
        <p
          ref={backRef}
          className={`${textColor} select-none w-full px-4  text-center absolute top-0 leading-8 whitespace-nowrap opacity-0`}
        >
          {back}
        </p>
        {/* progress bar */}
        <div
          ref={barRef}
          className={`h-0.5 ${selectedColor} left-2 absolute bottom-0.5 opacity-0`}
        ></div>
        {/* place holder */}
        <div className={`h-0.5 ${selectedColor} w-full opacity-0 bottom-0.5 `}>
          <p className="px-4 whitespace-nowrap">{front}</p>
          <p className="px-4 whitespace-nowrap">{back}</p>
        </div>
        {loading && (
          <div className={` h-8 flex justify-center items-center w-full`}>
            <AiOutlineLoading className="animate-spin text-slate-500" />
          </div>
        )}
      </div>
    );

  return (
    <div
      onMouseEnter={() => {
        if (confirmTimeline.current) (confirmTimeline.current as any).play();
      }}
      onMouseLeave={() => {
        if (confirmTimeline.current) (confirmTimeline.current as any).reverse();
        setLock(true);
      }}
      onClick={() => {
        if (!lock && !disabled && onClickF) onClickF();
      }}
      className={`${
        disabled ? "pointer-events-none cursor-not-allowed" : ""
      } relative cursor-pointer select-none h-8 border ${borderColor} rounded-md overflow-hidden`}
    >
      {/* Default text  */}
      <p
        ref={frontRef}
        className={`${textColor} select-none w-full px-4 text-center absolute top-0 leading-8 whitespace-nowrap`}
      >
        {front}
      </p>
      {/* Drop down text  */}
      <p
        ref={backRef}
        className={`${textColor} select-none w-full px-4  text-center absolute leading-8 whitespace-nowrap top-0`}
      >
        {back}
      </p>
      {/* progress bar */}
      <div
        ref={barRef}
        className={`h-0.5 ${selectedColor} left-2 absolute bottom-0.5 `}
      ></div>
      {/* place holder */}
      <div className={`h-0.5 ${selectedColor} w-full opacity-0 bottom-0.5 `}>
        <p className="px-4 whitespace-nowrap">{front}</p>
        <p className="px-4 whitespace-nowrap">{back}</p>
      </div>
    </div>
  );
};
