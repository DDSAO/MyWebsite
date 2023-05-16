import { getNow, exportCsv } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineFileExcel } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { ButtonWithIcon } from "../Button/ButtonWithIcon";
import { ButtonSelection, SelectButton } from "../Button/SelectButton";
import { SelectField } from "../Input/SelectField";
import { TextField } from "../Input/TextField";

export const BasicTable = (props: {
  headers: string[];
  rows: any;
  widths?: string[];
  alignments?: string[];
  onSelectChange?: (i: number | null) => void;
  requireClearSelect?: number;
  remainSelectedOnLeave?: boolean;
  doubleClickF?: (i: number) => void;
  loading?: boolean;
  totalNum: number;
  buttons?: any;
  onPageChangeF?: (pageNo: number, pageNum: number) => void;
}) => {
  const {
    headers,
    rows,
    widths,
    alignments,
    onSelectChange,
    requireClearSelect,
    remainSelectedOnLeave,
    buttons,
    loading,
    totalNum,
    onPageChangeF,
  } = props;
  const [selected, setSelected] = useState<number | null>(null);

  const [pageNo, setPageNo] = useState(1);
  const [pageNum, setPageNum] = useState(20);

  const theRef = useRef(null);

  useEffect(() => {
    if (requireClearSelect) {
      setSelected(null);
      if (onSelectChange) onSelectChange(null);
    }
  }, [requireClearSelect]);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (theRef.current && !(theRef.current as any).contains(event.target)) {
        if (!remainSelectedOnLeave) {
          setSelected(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClick);
    setTimeout(() => {}, 100);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [remainSelectedOnLeave]);

  useEffect(() => {
    if (rows.length === 0 && pageNo !== 1 && !loading) {
      setPageNo(1);
    }
  }, [rows]);

  useEffect(() => {
    if (onPageChangeF) onPageChangeF(pageNo, pageNum);
  }, [pageNo, pageNum]);

  return (
    <div
      className={`${
        loading ? "opacity-50 pointer-events-none" : ""
      } w-full flex flex-col items-center justify-center rounded-md`}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-start">{buttons}</div>

        <div className="flex justify-center items-center">
          {theRef &&
          theRef.current &&
          (theRef.current as any).offsetWidth < 900 ? (
            <SelectButton
              title={`Page: ${pageNo}`}
              options={
                Array.from(
                  {
                    length: Math.ceil(totalNum / pageNum),
                  },
                  (_, i) => i + 1
                )
                  .map((i, index) => {
                    let totalPage = totalNum / pageNum;
                    let lastPage = Math.ceil(totalNum / pageNum);
                    if (
                      totalPage <= 7 ||
                      (totalPage > 7 &&
                        (i === 1 ||
                          (i <= 4 && pageNo < 4) ||
                          (i >= lastPage - 4 && pageNo > lastPage - 4) ||
                          i === lastPage ||
                          Math.abs(i - pageNo) <= 1))
                    ) {
                      return {
                        onClickF: () => {
                          setPageNo(i);
                        },
                        title: `Go to Page ${i}`,
                      };
                    }

                    if (
                      totalPage > 7 &&
                      ((Math.abs(i - pageNo) <= 2 &&
                        Math.abs(i - pageNo) > 1) ||
                        (i === 2 && pageNo > lastPage - 3) ||
                        (i === lastPage - 1 && pageNo < 3))
                    ) {
                      return {
                        onClickF: () => {
                          setPageNo(i);
                        },
                        title: `...`,
                        disabled: true,
                      };
                    }
                  })
                  .filter((option) => option) as ButtonSelection[]
              }
              expandDirection="bottomLeft"
            />
          ) : (
            <nav
              className=" inline-flex rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                onClick={() => {
                  if (pageNo > 1) setPageNo(pageNo - 1);
                }}
                className="w-8 h-8  cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <MdOutlineKeyboardArrowLeft />
              </a>
              {Array.from(
                {
                  length: Math.ceil(totalNum / pageNum),
                },
                (_, i) => i + 1
              ).map((i, index) => {
                let totalPage = totalNum / pageNum;
                let lastPage = Math.ceil(totalNum / pageNum);
                if (
                  totalPage <= 7 ||
                  (totalPage > 7 &&
                    (i === 1 ||
                      (i <= 4 && pageNo < 4) ||
                      (i >= lastPage - 4 && pageNo > lastPage - 4) ||
                      i === lastPage ||
                      Math.abs(i - pageNo) <= 1))
                ) {
                  return (
                    <a
                      key={i}
                      onClick={() => {
                        setPageNo(i);
                      }}
                      className={`w-8 h-8 cursor-pointer   inline-flex items-center justify-center rounded-md mx-1 border ${
                        pageNo === i
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white"
                      } hover:bg-slate-50  text-sm font-medium focus:z-20`}
                    >
                      {i}
                    </a>
                  );
                }

                if (
                  totalPage > 7 &&
                  ((Math.abs(i - pageNo) <= 2 && Math.abs(i - pageNo) > 1) ||
                    (i === 2 && pageNo > lastPage - 3) ||
                    (i === lastPage - 1 && pageNo < 3))
                ) {
                  return (
                    <a
                      key={i}
                      onClick={() => {
                        // setPageNo(i);
                      }}
                      className={`w-8 h-8 cursor-pointer   inline-flex items-center justify-center rounded-md mx-1 border ${
                        pageNo === i
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white"
                      } hover:bg-slate-50 px-4 py-2 text-sm font-medium focus:z-20`}
                    >
                      ...
                    </a>
                  );
                }
              })}

              <a
                onClick={() => {
                  if (pageNo < Math.ceil(totalNum / pageNum))
                    setPageNo(pageNo + 1);
                }}
                className="w-8 h-8 cursor-pointer  inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <MdOutlineKeyboardArrowRight />
              </a>
            </nav>
          )}
        </div>

        <div className="flex justify-end items-center">
          {theRef &&
          theRef.current &&
          (theRef.current as any).offsetWidth < 900 ? (
            <SelectButton
              title={`${pageNum} rows / Page`}
              options={[
                {
                  title: `Total Rows: ${totalNum}`,
                  onClickF: () => {},
                  disabled: true,
                },
                {
                  title: `Show 20 rows per page`,
                  onClickF: () => {
                    setPageNum(20);
                  },
                },
                {
                  title: `Show 50 rows per page`,
                  onClickF: () => {
                    setPageNum(50);
                  },
                },
                {
                  title: `Show 100 rows per page`,
                  onClickF: () => {
                    setPageNum(100);
                  },
                },
              ]}
              expandDirection="bottomLeft"
            />
          ) : (
            <>
              <p className="text-md">Total Rows: {totalNum}</p>
              <p className="px-2">|</p>
              <div className="w-20">
                <SelectField
                  value={String(pageNum)}
                  onChangeF={(value) => {
                    if (value) setPageNum(parseInt(value));
                  }}
                  options={["20", "50", "100"]}
                  notAllowNull={true}
                />
              </div>
              <p className="text-md pl-2">rows / page</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full  overflow-x-auto ">
        <table ref={theRef} className="w-full mt-2 ">
          <thead className="border">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className={`${widths && widths[i] ? widths[i] : ""} ${
                    alignments && alignments[i] ? alignments[i] : ""
                  } p-2 text-sm bg-dark`}
                >
                  <p className="text-white font-light"> {header}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};
