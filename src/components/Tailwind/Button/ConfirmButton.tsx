import { useEffect, useRef, useState, useMemo } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const ConfirmButton = (props: {
  loading?: boolean;
  front?: string;
  back?: string;
  disabled?: boolean;
  variant?: string;
  onClickF?: () => void;
}) => {
  const { loading, front, back, disabled, onClickF, variant } = props;

  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState(false);
  const theRef = useRef(null);

  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (theRef.current && !(theRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [theRef]);

  useEffect(() => {
    setLock(true);
    let release = setTimeout(() => {
      setLock(false);
    }, 500);
    return () => {
      clearTimeout(release);
      setLock(false);
    };
  }, [open]);

  let { frontBg, frontText, backBg, backText } = useMemo(() => {
    switch (variant) {
      case "primary":
        return {
          frontBg:
            "bg-blue-50 border-blue-300 hover:border-blue-500 hover:bg-blue-100",
          frontText: "text-blue-500",
          backBg: "bg-green-500 hover:bg-green-600 border-green-800",
          backText: "text-white",
        };
      case "warning":
        return {
          frontBg:
            "border-yellow-400 hover:border-yellow-600 hover:bg-yellow-50",
          frontText: "text-yellow-500",
          backBg: "bg-red-500 hover:bg-red-600 border-red-800",
          backText: "text-white",
        };

      default:
        return {
          frontBg:
            "bg-blue-50 border-blue-300 hover:border-blue-500 hover:bg-blue-100",
          frontText: "text-blue-500",
          backBg: "bg-green-500 hover:bg-green-600 border-green-800",
          backText: "text-white",
        };
    }
  }, [variant]);

  // if (loading)
  //   return (
  //     <div
  //       className={`rounded-md border bg-slate-300  h-8  flex items-center justify-center`}
  //       style={{
  //         width:
  //           (frontRef.current as any)?.clientWidth >
  //           (backRef.current as any)?.clientWidth
  //             ? (frontRef.current as any)?.clientWidth
  //             : (backRef.current as any)?.clientWidth,
  //       }}
  //     >
  //       <AiOutlineLoading className="animate-spin text-slate-500" />
  //     </div>
  //   );

  // if (disabled)
  //   return (
  //     <div
  //       className={`rounded-md border border-slate-300 bg-slate-50 h-8  flex items-center justify-center`}
  //       style={{
  //         width:
  //           (frontRef.current as any)?.clientWidth >
  //           (backRef.current as any)?.clientWidth
  //             ? (frontRef.current as any)?.clientWidth
  //             : (backRef.current as any)?.clientWidth,
  //       }}
  //     >
  //       <p
  //         className={`text-center overflow-hidden whitespace-nowrap text-slate-500 px-4`}
  //       >
  //         {front}
  //       </p>
  //     </div>
  //   );

  return (
    <div
      ref={theRef}
      onClick={() => {
        if (!lock && !disabled && !loading) {
          if (!open) {
            setOpen(true);
          } else {
            if (onClickF) onClickF();
            setOpen(false);
          }
        }
      }}
      className={`relative h-8`}
      style={{
        width:
          (frontRef.current as any)?.clientWidth >
          (backRef.current as any)?.clientWidth
            ? (frontRef.current as any)?.clientWidth
            : (backRef.current as any)?.clientWidth,
      }}
    >
      {loading && (
        <div
          className={`rounded-md border bg-slate-300 border-slate-400 h-8  flex items-center justify-center`}
          style={{
            width:
              (frontRef.current as any)?.clientWidth >
              (backRef.current as any)?.clientWidth
                ? (frontRef.current as any)?.clientWidth
                : (backRef.current as any)?.clientWidth,
          }}
        >
          <AiOutlineLoading className="animate-spin text-slate-500" />
        </div>
      )}

      <div
        className={`cursor-pointer rounded-md leading-8 border block absolute ${
          loading ? "invisible top-0" : ""
        } h-8 ${disabled ? "border-slate-400 bg-slate-300" : frontBg}  ${
          disabled
            ? ""
            : open
            ? "animate-[flip-front-down_0.5s_ease-in-out_forwards]"
            : "animate-[flip-front-up_0.5s_ease-in-out_forwards]"
        }`}
        style={{
          width:
            (frontRef.current as any)?.clientWidth >
            (backRef.current as any)?.clientWidth
              ? (frontRef.current as any)?.clientWidth
              : (backRef.current as any)?.clientWidth,
        }}
      >
        <p
          className={`text-center overflow-hidden whitespace-nowrap ${
            disabled ? "text-slate-500" : frontText
          } px-4`}
        >
          {front}
        </p>
        <p
          ref={frontRef}
          className={`absolute opacity-0 text-center overflow-hidden whitespace-nowrap px-4`}
        >
          {front}
        </p>
      </div>
      <div
        className={`cursor-pointer rounded-md leading-8 border ${
          disabled ? "border-slate-400 bg-slate-300 invisible" : backBg
        }   block absolute   ${loading ? "invisible  top-0" : ""} h-8  ${
          disabled
            ? ""
            : open
            ? "animate-[flip-back-down_0.5s_ease-in-out_forwards]"
            : "animate-[flip-back-up_0.5s_ease-in-out_forwards]"
        }`}
        style={{
          width:
            (frontRef.current as any)?.clientWidth >
            (backRef.current as any)?.clientWidth
              ? (frontRef.current as any)?.clientWidth
              : (backRef.current as any)?.clientWidth,
        }}
      >
        <p
          className={`text-center overflow-hidden whitespace-nowrap ${
            disabled ? "text-slate-500" : backText
          }  px-4`}
        >
          {back}
        </p>
        <p
          ref={backRef}
          className={`absolute opacity-0 text-center overflow-hidden whitespace-nowrap  px-4`}
        >
          {back}
        </p>
      </div>
    </div>
  );
};
