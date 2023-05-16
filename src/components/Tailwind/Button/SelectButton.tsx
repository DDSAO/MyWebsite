import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export type ButtonSelection = {
  title: string;
  onClickF: () => void;
  icon?: any;
  disabled?: boolean;
};

export const SelectButton = (props: {
  title?: string;
  options?: (ButtonSelection | null)[];
  loading?: boolean;
  expandDirection?: "bottomLeft" | "bottomRight" | undefined;
}) => {
  const { options, loading, title, expandDirection } = props;
  const [open, setOpen] = useState(false);
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
        className={`relative rounded-md border bg-slate-50 border-slate-300 h-8 flex items-center justify-center `}
      >
        <p className="px-7 invisible">{title}</p>
        <AiOutlineLoading className="absolute left-[calc(50%-0.5em)] animate-spin text-slate-500" />
      </div>
    );

  return (
    <div ref={theRef} className="relative select-none">
      <p className="h-0 px-7 invisible">{title}</p>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex flex-col overflow-hidden"
      >
        <div
          className={`cursor-pointer group rounded-md border bg-white border-blue-300 hover:border-blue-500 h-8 flex items-center justify-start ${
            open ? "bg-blue-50" : ""
          }`}
        >
          <p className="ml-4 text-blue-500 whitespace-nowrap max-w-md">
            {title}
          </p>
          <MdOutlineKeyboardArrowUp
            className={`absolute right-2 group-hover:animate-ping ${
              open ? "opacity-1" : "opacity-0"
            } duration-100 text-blue-500`}
          />
          <MdOutlineKeyboardArrowUp
            className={`absolute right-2 ${
              open ? "opacity-1" : "opacity-0"
            } text-blue-500`}
          />
          <GiHamburgerMenu
            className={`absolute right-2 ${
              open ? "opacity-0" : "opacity-1"
            } text-blue-500`}
          />
          <GiHamburgerMenu
            className={`absolute right-2 group-hover:animate-ping ${
              open ? "opacity-0" : "opacity-1"
            } duration-100 text-blue-500`}
          />
        </div>
      </div>
      {options && options.length > 0 ? (
        <div
          className={`z-20 absolute ${
            !expandDirection || expandDirection === "bottomRight"
              ? ""
              : expandDirection === "bottomLeft"
              ? "right-0"
              : ""
          } border rounded-md shadow-lg bg-slate-50 mt-1 ${
            !open ? "hidden" : ""
          }`}
        >
          <ul className="rounded-md">
            {options
              .filter((option): option is ButtonSelection => option !== null)
              .map((option, i) => {
                if (option.disabled) {
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        if (!option.disabled) {
                          option.onClickF();
                          setOpen(false);
                        }
                      }}
                      className={`relative cursor-not-allowed text-md text-left m-1 p-2 rounded-md flex items-center `}
                    >
                      <p
                        className={`invisible ${
                          option.icon ? "px-6" : "px-4"
                        } h-8 w-fit block whitespace-nowrap`}
                      >
                        {option.title}
                      </p>
                      <div className="absolute left-0 top-2 w-8 h-8 flex items-center justify-center text-slate-400">
                        {option.icon ? (
                          option.icon
                        ) : (
                          <MdOutlineKeyboardArrowRight />
                        )}
                      </div>

                      <p
                        className={`absolute left-8 block whitespace-nowrap text-slate-400`}
                      >
                        {option.title}
                      </p>
                    </li>
                  );
                }
                return (
                  <li
                    key={i}
                    onClick={() => {
                      if (!option.disabled) {
                        option.onClickF();
                        setOpen(false);
                      }
                    }}
                    className={`relative cursor-pointer text-md text-left m-1 p-2 rounded-md flex items-center hover:bg-blue-200 duration-300 `}
                  >
                    <p
                      className={`invisible ${
                        option.icon ? "px-6" : "px-4"
                      } h-8 w-fit block whitespace-nowrap`}
                    >
                      {option.title}
                    </p>
                    <div className="absolute left-0 top-2 w-8 h-8 flex items-center justify-center">
                      {option.icon ? (
                        option.icon
                      ) : (
                        <MdOutlineKeyboardArrowRight />
                      )}
                    </div>

                    <p className={`absolute left-8 block whitespace-nowrap`}>
                      {option.title}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
