import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

export const TextArea = (props: {
  title?: any;
  onChangeF: (e: any) => void;
  value: any;
  disableEdit?: boolean;
  start?: any;
  end?: any;
  onEnterF?: (e: any) => void;
  inputType?: string;
  onDeleteF?: (e: any) => void;
  rows?: number;
}) => {
  let {
    title,
    onChangeF,
    onDeleteF,
    value,
    disableEdit,
    start,
    end,
    onEnterF,
    inputType,
    rows,
  } = props;

  const [inputValue, setInputValue] = useState(value ? value : "");

  const updateF = useMemo(
    () =>
      debounce((e) => {
        onChangeF(e);
      }, 300),
    [onChangeF]
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="flex flex-col justify-start items-start w-full">
      {title ? (
        <div className="flex flex-start">
          <p className="text-left text-xs text-slate-500  whitespace-nowrap">
            {title}
          </p>
        </div>
      ) : null}

      <textarea
        disabled={disableEdit}
        rows={rows ? rows : 1}
        className={`${disableEdit ? "text-slate-500" : ""} ${
          inputValue !== value
            ? "ring-offset-0 ring-2 ring-green-400 border-transparent"
            : "ring-offset-0 ring-1 ring-slate-300 "
        } p-1 hover:ring-2 focus:outline-none duration-200 transition-shadow rounded-md w-full `}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === "enter" && onEnterF) {
            onEnterF(e);
          }
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
          updateF(e);
        }}
        value={inputValue ? inputValue : ""}
      ></textarea>
    </div>
  );
};
