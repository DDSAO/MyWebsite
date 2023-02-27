import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const ConfirmButtonDanger = (props: {
  loading?: boolean;
  front?: string;
  back?: string;
  disabled?: boolean;
  onClickF?: () => void;
}) => {
  const { loading, front, back, disabled, onClickF } = props;

  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState(false);

  const theRef = useRef(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (theRef.current && !(theRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [theRef]);

  if (loading)
    return (
      <div
        className={`rounded-md border bg-slate-300 w-40 h-8 px-2 flex items-center justify-center`}
      >
        <AiOutlineLoading className="animate-spin text-slate-500" />
      </div>
    );

  if (disabled)
    return (
      <div
        className={`rounded-md border border-slate-300 bg-slate-50 w-40 h-8 px-2 flex items-center justify-center`}
      >
        <p
          className={`text-center overflow-hidden whitespace-nowrap text-slate-500`}
        >
          {front}
        </p>
      </div>
    );

  return (
    <div
      ref={theRef}
      onClick={() => {
        if (!lock) {
          if (!open) {
            setOpen(true);
          } else {
            if (onClickF) onClickF();
            setOpen(false);
          }
        }
      }}
      className={`relative w-40 h-8`}
    >
      <div
        className={`cursor-pointer rounded-md leading-7 border border-yellow-400 hover:border-yellow-600 hover:bg-yellow-50 block absolute w-40 h-8 px-2 ${
          open
            ? "animate-[flip-front-down_0.5s_ease-in-out_forwards]"
            : "animate-[flip-front-up_0.5s_ease-in-out_forwards]"
        }`}
      >
        <p
          className={`text-center overflow-hidden whitespace-nowrap text-yellow-500`}
        >
          {front}
        </p>
      </div>
      <div
        className={`cursor-pointer rounded-md leading-7 border bg-red-500 hover:bg-red-600 border-red-800 block absolute w-40 h-8 px-2 ${
          open
            ? "animate-[flip-back-down_0.5s_ease-in-out_forwards]"
            : "animate-[flip-back-up_0.5s_ease-in-out_forwards]"
        }`}
      >
        <p
          className={`text-center overflow-hidden whitespace-nowrap text-white`}
        >
          {back}
        </p>
      </div>
    </div>
  );
};
