import { useEffect, useRef, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export const SelectField = (props: {
  title?: string;
  value: string[] | string;
  onChangeF: (value: string | null) => void;
  options: string[];
  displayOption?: (option: string) => any;
  notAllowNull?: boolean;
  multiple?: boolean;
  disabled?: boolean;
}) => {
  const {
    title,
    value,
    onChangeF,
    options,
    multiple,
    notAllowNull,
    disabled,
    displayOption,
  } = props;
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

  return (
    <div ref={theRef} className={`relative w-full`}>
      {options.map((option, i) => (
        <p key={i} className="h-0 invisible px-6">
          {option}
        </p>
      ))}
      <div
        onClick={() => {
          if (!disabled) setOpen(!open);
        }}
        className="flex flex-col"
      >
        {title ? (
          <p className="text-left text-xs text-slate-500 whitespace-nowrap">
            {title}
          </p>
        ) : null}

        <div
          className={`bg-transparent flex items-center justify-flex rounded-md h-8 w-full overflow-hidden ${
            open
              ? "ring-offset-0 ring-2 ring-green-400 border-transparent"
              : "ring-offset-0 ring-1 ring-slate-300 hover:ring-2"
          }`}
        >
          <p
            className={`absolute text-left left-1 ml-1 whitespace-nowrap overflow-hidden w-[calc(100%-2.5em)] ${
              disabled ? "text-slate-500" : ""
            }`}
          >
            {value ? (typeof value === "string" ? value : value.join(",")) : ""}
          </p>
          {disabled && (
            <AiOutlineLock
              className="absolute right-2 mr-1 text-slate-400"
              size="1em"
            />
          )}
          {open && !disabled ? (
            <MdOutlineKeyboardArrowUp
              className="absolute right-2 mr-1 text-slate-400"
              size="1em"
            />
          ) : (
            <MdOutlineKeyboardArrowDown
              className="absolute right-2 mr-1 text-slate-400"
              size="1em"
            />
          )}
        </div>
      </div>
      <div
        className={`z-50 absolute w-full border rounded-md shadow-lg bg-slate-50 mt-1 ${
          !open ? "hidden" : ""
        }`}
      >
        <ul className="rounded-md ">
          {!multiple && !notAllowNull ? (
            <li
              onClick={() => {
                if (!disabled) {
                  onChangeF(null);
                  setOpen(false);
                }
              }}
              className={`cursor-pointer text-md text-left m-1 p-2 rounded-md hover:bg-slate-300 ${
                !value ? "bg-slate-200" : ""
              }`}
            >
              None
            </li>
          ) : null}

          {options.map((option, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  if (!disabled) {
                    if (!multiple) {
                      onChangeF(option);
                      setOpen(false);
                    } else {
                      if (Array.isArray(value) && value.includes(option)) {
                        onChangeF(value.filter((v) => v !== option).join(","));
                      } else {
                        onChangeF(
                          typeof value === "string"
                            ? value !== ""
                              ? `${value},${option}`
                              : option
                            : value.length > 0
                            ? `${value
                                .filter((v) => v !== option)
                                .join(",")},${option}`
                            : option
                        );
                      }
                    }
                  }
                }}
                className={`cursor-pointer text-md text-left m-1 p-2 rounded-md hover:bg-slate-300 ${
                  (multiple &&
                    Array.isArray(value) &&
                    value.includes(option)) ||
                  (typeof value === "string" && value === option)
                    ? "bg-slate-200"
                    : ""
                } duration-200 transition`}
              >
                {displayOption ? displayOption(option) : option}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
