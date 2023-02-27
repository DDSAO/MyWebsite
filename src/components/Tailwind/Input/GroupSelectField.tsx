import { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export type GroupSelectFieldOption = {
  type: "parent" | "children";
  text: string;
};

export const GroupSelectField = (props: {
  title?: string;
  value: string[] | string | null;
  onChangeF: (value: string | null) => void;
  options: GroupSelectFieldOption[];
  notAllowNull?: boolean;
  multiple?: boolean;
  limitHeight?: boolean;
}) => {
  const {
    title,
    value,
    onChangeF,
    options,
    multiple,
    notAllowNull,
    limitHeight,
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
    <div ref={theRef} className={`relative`}>
      {options.map((option, i) => (
        <p key={i} className="h-0 invisible px-6">
          {option.text}
        </p>
      ))}
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex flex-col overflow-hidden"
      >
        {title ? <p className="text-sm text-left">{title}</p> : null}

        <div
          className={`bg-white flex items-center justify-flex rounded-md border h-8 w-full hover:border-2 overflow-hidden ${
            open ? "border-slate-500 border-2" : "border-slate-300"
          }`}
        >
          <p className="absolute text-left left-2 ml-1 whitespace-nowrap overflow-hidden w-[calc(100%-2.5em)]">
            {value !== null
              ? typeof value === "string"
                ? value
                : value.join(",")
              : ""}
          </p>
          {open ? (
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
        className={`z-50 absolute float-right w-full border rounded-md shadow-lg bg-slate-50 mt-1 ${
          !open ? "hidden" : ""
        } ${limitHeight ? "max-h-80 overflow-auto" : ""}`}
      >
        <ul className="rounded-md ">
          {!multiple && !notAllowNull ? (
            <li
              onClick={() => {
                onChangeF(null);
                setOpen(false);
              }}
              className={`text-md text-left m-1 p-2 rounded-md hover:bg-slate-300 `}
            >
              None
            </li>
          ) : null}

          {options.map((option, i) => {
            if (option.type === "parent") {
              return (
                <li
                  key={i}
                  className={`cursor-pointer text-sm text-left m-1 px-2 rounded-sm bg-slate-700 text-white`}
                >
                  <p className="cursor-pointer ">{option.text}</p>
                </li>
              );
            } else {
              return (
                <li
                  key={i}
                  onClick={() => {
                    if (!multiple) {
                      onChangeF(option.text);
                      setOpen(false);
                    } else {
                      if (Array.isArray(value) && value.includes(option.text)) {
                        onChangeF(
                          value.filter((v) => v !== option.text).join(",")
                        );
                      } else {
                        onChangeF(
                          value !== null
                            ? typeof value === "string"
                              ? value !== ""
                                ? `${value},${option.text}`
                                : option.text
                              : value.length > 0
                              ? `${value
                                  .filter((v) => v !== option.text)
                                  .join(",")},${option.text}`
                              : option.text
                            : null
                        );
                      }
                    }
                  }}
                  className={`text-md text-left m-1 p-2 rounded-md hover:bg-slate-300 ${
                    multiple &&
                    Array.isArray(value) &&
                    value.includes(option.text)
                      ? "bg-slate-200"
                      : ""
                  } duration-200 transition`}
                >
                  <p className="cursor-pointer ">{option.text}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
