import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { MdClear } from "react-icons/md";
import { TiTimes } from "react-icons/ti";
import { SmallIconButton } from "../Button/SmallIconButton";

export const JumboTextField = (props: {
  title?: any;
  onChangeF: (value: string | null) => void;
  value: any;
  disableEdit?: boolean;
  start?: any;
  end?: any;
  onEnterF?: (value: string | null) => void;
  inputType?: string;
  noDebounce?: boolean;
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
    noDebounce,
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const updateF = useMemo(() => {
    if (noDebounce) {
      return (value: string | null) => {
        onChangeF(value);
      };
    } else {
      return debounce((value: string | null) => {
        onChangeF(value);
      }, 300);
    }
  }, [onChangeF, noDebounce]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="flex flex-col justify-center items-start w-full ">
      {title ? <p className="text-left text-sm">{title}</p> : null}
      <div className="relative w-full">
        <input
          disabled={disableEdit}
          className={`text-center ${
            inputValue !== value
              ? "ring-offset-0 ring-2 ring-green-400 border-transparent"
              : "ring-offset-0 ring-1 ring-slate-300 "
          } p-1 ${
            !disableEdit ? "hover:ring-2" : "bg-slate-200"
          } focus:outline-none duration-200 transition-shadow rounded-md w-full h-24 leading-10 text-3xl`}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === "enter" && onEnterF) {
              onEnterF((e.target as any).value);
            }
          }}
          type={inputType}
          value={
            inputValue === null || inputValue === undefined ? "" : inputValue
          }
          onChange={(e) => {
            if (!disableEdit) {
              setInputValue(e.target.value);
              updateF(e.target.value);
            }
          }}
        />
        <div
          className="absolute right-4 top-[50%] -translate-y-[50%] rounded-full hover:bg-slate-200"
          onClick={() => {
            updateF(null);
          }}
        >
          <MdClear className="w-16 h-16 " />
        </div>
      </div>
    </div>
  );
};
