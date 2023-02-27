import { debounce } from "lodash";
import { useEffect, useMemo, useState, useRef } from "react";
import { BsLock } from "react-icons/bs";
import { SmallIconButton } from "../Button/SmallIconButton";
import { AiOutlineLock } from "react-icons/ai";

export const TextField = (props: {
  title?: any;
  onChangeF: (e: any) => void;
  value: any;
  disableEdit?: boolean;
  start?: any;
  end?: any;

  onEnterF?: (e: any) => void;
  inputType?: string;
  min?: number;
  noDebounce?: boolean;
  autoSelect?: boolean;
  bg?: string;
  textColor?: string;

  focusInput?: number | null;
}) => {
  let {
    title,
    onChangeF,
    value,
    disableEdit,
    start,
    end,
    onEnterF,
    inputType,
    min,
    noDebounce,
    autoSelect,
    bg,
    textColor,
    focusInput,
  } = props;

  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  const updateF = useMemo(() => {
    if (noDebounce) {
      return (e: any) => {
        onChangeF(e);
      };
    } else {
      return debounce((e) => {
        onChangeF(e);
      }, 300);
    }
  }, [onChangeF, noDebounce]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if ((inputRef.current as any) !== null) {
      if (focusInput) {
        (inputRef.current as any).focus();
      } else {
        (inputRef.current as any).blur();
      }
    }
  }, [focusInput]);

  return (
    <div
      className={`flex flex-col justify-center items-start w-full ${
        bg ?? "bg-transparent"
      }`}
    >
      {title ? <p className="text-left text-sm">{title}</p> : null}
      <div className="relative w-full">
        <input
          ref={inputRef}
          min={min ?? undefined}
          onFocus={(e) => {
            if (autoSelect) e.target.select();
          }}
          disabled={disableEdit}
          className={` ${
            inputValue !== value
              ? "ring-offset-0 ring-2 ring-green-400 border-transparent"
              : "ring-offset-0 ring-1 ring-slate-300 "
          } p-1 ${
            !disableEdit
              ? ` ${bg ?? "bg-transparent"} hover:ring-2`
              : "bg-slate-100"
          } focus:outline-none duration-200 transition-shadow rounded-md w-full ${
            textColor ?? "text-black"
          }`}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === "enter" && onEnterF && !disableEdit) {
              onEnterF(e);
            }
          }}
          type={inputType}
          value={
            inputValue === null || inputValue === undefined ? "" : inputValue
          }
          onChange={(e) => {
            if (!disableEdit) {
              setInputValue(e.target.value);
              updateF(e);
            }
          }}
        />

        {disableEdit && (
          <div className="absolute right-0 top-1 text-slate-400">
            <SmallIconButton icon={<AiOutlineLock />} />
          </div>
        )}
      </div>
    </div>
  );
};
