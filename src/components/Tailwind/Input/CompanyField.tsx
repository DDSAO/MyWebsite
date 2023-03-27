import { Company } from "@/interfaces/customerDefinition";
import usePost from "@/lib/hooks/usePost";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsQuestion } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  MdArrowDropDownCircle,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { TiTimes } from "react-icons/ti";

export const CompanyField = (props: {
  onChangeF: (priceSource: Company | null) => void;
  value: Company | null;
  title?: string;
  disableEdit?: boolean;
}) => {
  const { title, value, onChangeF, disableEdit } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Company[]>([]);
  const [inputValue, setInputValue] = useState("");
  const theRef = useRef(null);

  const searchOptionsQuery = usePost<
    { searchKey: string },
    { options: Company[] }
  >({
    url: "/company/search",
    onComplete: (data) => {
      if (data && data.options) {
        setOptions(data.options);
      }
    },
  });

  const searchF = useMemo(
    () =>
      debounce((value) => {
        searchOptionsQuery.reload({
          searchKey: value,
        });
      }, 500),
    []
  );

  useEffect(() => {
    if (open) searchF(inputValue);
  }, [open]);

  useEffect(() => {
    if (value && value.id) {
      setInputValue(`${value.id}`);
    } else {
      setInputValue("");
    }
  }, [value]);

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
    <div ref={theRef} className="relative min-w-[80px] w-full">
      <div
        onClick={() => {
          if (!disableEdit) setOpen(!open);
        }}
        className="flex flex-col"
      >
        {title ? (
          <p className="text-left text-xs text-slate-500">{title}</p>
        ) : null}

        <div
          className={`bg-white flex items-center justify-flex rounded-md ring-1 h-7 w-full hover:ring-2 overflow-hidden ${
            open ? "ring-slate-500" : "ring-slate-300"
          }`}
        >
          {open ? (
            <div className="absolute left-0 w-full h-7">
              <input
                autoFocus
                className="absolute text-left left-2 ml-1 h-7 overflow-hidden w-[calc(100%-2.5em)] border-none outline-none focus:ring-0"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  searchF(e.target.value);
                }}
              />
            </div>
          ) : (
            <div className="absolute left-0 w-full h-7">
              <p className="absolute text-left left-3 leading-7 whitespace-nowrap overflow-hidden w-[calc(100%-4em)] border-none outline-none focus:ring-0">
                {value && value.id ? value.id : "NOT SELECTED"}
              </p>
            </div>
          )}

          {!searchOptionsQuery.loading ? (
            open ? (
              <MdOutlineKeyboardArrowUp
                className="absolute right-2 mr-1 text-slate-400 hover:bg-slate-300"
                size="1.25em"
              />
            ) : value && value.id ? (
              <TiTimes
                onClick={(e) => {
                  e.stopPropagation();
                  setInputValue("");
                  onChangeF(null);
                }}
                className="absolute rounded-2xl right-2 mr-1 text-red-400 hover:bg-red-200"
                size="1.25em"
              />
            ) : null
          ) : (
            <AiOutlineLoading
              className="absolute right-2 mr-1 text-blue-400 animate-spin"
              size="1em"
            />
          )}
        </div>
      </div>

      <div
        className={`z-20 absolute float-right w-full border rounded-md shadow-lg bg-slate-50 mt-1 ${
          !open ? "hidden" : ""
        }`}
      >
        {searchOptionsQuery.loading ? (
          <ul className="rounded-md ">
            <li
              className={`text-md text-center m-1 p-2 rounded-md italic animate-pulse bg-slate-300`}
            >
              LOADING
            </li>
          </ul>
        ) : null}

        {!searchOptionsQuery.loading && options.length === 0 ? (
          <ul className="rounded-md ">
            <li className={`text-md text-center m-1 p-2 rounded-md italic`}>
              NO RESULT FOUND
            </li>
          </ul>
        ) : null}

        {!searchOptionsQuery.loading ? (
          <ul className="rounded-md ">
            {options.map((option, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    onChangeF(option);
                    setInputValue(option.id ? option.id : "");
                    setOpen(false);
                  }}
                  className={`flex flex-col items-start justify-start text-md text-left m-1 p-2 rounded-md hover:bg-slate-300 ${
                    value && option.id === value.id ? "bg-slate-200" : ""
                  } overflow-hidden`}
                >
                  <b className="text-xs whitespace-nowrap">{option.id} </b>
                  <p className="text-sm whitespace-nowrap">
                    {option.name ? option.name : ""}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
