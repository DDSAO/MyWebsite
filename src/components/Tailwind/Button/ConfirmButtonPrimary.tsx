import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const ConfirmButtonPrimary = (props: {
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

  if (loading)
    return (
      <div
        className={`rounded-md border bg-slate-300  h-8 px-2 flex items-center justify-center`}
      >
        <AiOutlineLoading className="animate-spin text-slate-500" />
      </div>
    );

  if (disabled)
    return (
      <div
        className={`rounded-md border border-slate-300 bg-slate-50 h-8 px-2 flex items-center justify-center`}
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
      className={`relative h-8`}
    >
      <div
        className={`cursor-pointer rounded-md leading-8 border bg-blue-50 border-blue-300 hover:border-blue-500 hover:bg-blue-100 block absolute w-40 h-8 px-2 ${
          open
            ? "animate-[flip-front-down_0.5s_ease-in-out_forwards]"
            : "animate-[flip-front-up_0.5s_ease-in-out_forwards]"
        }`}
      >
        <p
          className={`text-center overflow-hidden whitespace-nowrap text-blue-500`}
        >
          {front}
        </p>
      </div>
      <div
        className={`cursor-pointer rounded-md leading-8 border bg-green-500 hover:bg-green-600 border-green-800  block absolute w-40 h-8 px-2 ${
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
