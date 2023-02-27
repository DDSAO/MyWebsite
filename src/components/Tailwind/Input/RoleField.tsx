import {
  BuybackPriceSource,
  BuybackSwapItemRow,
} from "@/interfaces/buybackDefinition";
import { Department, EMPTY_ROLE, Role } from "@/interfaces/userDefinition";
import usePost from "@/lib/hooks/usePost";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";

import { TiTimes } from "react-icons/ti";
import { atom, useRecoilState, useRecoilValue } from "recoil";

import { SmallIconButton } from "../Button/SmallIconButton";

export const BuybackItemsAtom = atom<BuybackSwapItemRow[]>({
  key: "global.BuybackItemsAtom",
  default: [],
});

export const RoleField = (props: {
  title?: string;
  value: Role | null;
  onChangeF: (value: Role | null) => void;
}) => {
  const { title, value, onChangeF } = props;

  const [open, setOpen] = useState(false);
  const theRef = useRef(null);
  const optionsRef = useRef(null);
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");

  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const regionOptions = useMemo(() => {
    return Array.from(
      new Set(
        [...allDepartments]
          .sort((a, b) => (b.region ?? "SYD").localeCompare(a.region ?? "SYD"))
          .map((row) => row.region)
      )
    );
  }, [allDepartments]);

  const departmentOptions = useMemo(() => {
    return Array.from(
      new Set(
        [...allDepartments]
          .filter((department) => department.region === selectedRegion)
          .map((row) => row.name)
      )
    );
  }, [allDepartments, selectedRegion]);

  useEffect(() => {
    if (
      !value ||
      (!value.departmentId &&
        !value.department &&
        !value.departmentRegion &&
        !value.position)
    ) {
      setInputValue("");
    }
  }, [value]);

  const positionOptions = useMemo(() => {
    return (
      [...allDepartments].find(
        (department) =>
          department.region === selectedRegion &&
          department.name === selectedDepartment
      )?.positions ?? []
    );
  }, [allDepartments, selectedRegion, selectedDepartment]);

  const getAllDepartments = usePost<number, { departments: Department[] }>({
    url: "/user/management/getAllDepartments",
    onComplete: (data) => {
      if (data && data.departments) {
        setAllDepartments(data.departments);
      }
    },
  });

  useEffect(() => {
    const handleClick = (event: any) => {
      if (theRef.current && !(theRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);

    getAllDepartments.reload(1);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedRegion(value.departmentRegion);
      setSelectedDepartment(value.department);
    } else {
      setSelectedRegion(null);
      setSelectedDepartment(null);
    }
  }, [value]);

  return (
    <div ref={theRef} className={`relative w-full`}>
      <div
        onClick={(e) => {
          if (inputRef && inputRef.current) (inputRef.current as any).focus();
        }}
        className="flex flex-col"
      >
        {title ? <p className="text-sm text-left">{title}</p> : null}

        <div
          className={`bg-white flex items-center justify-flex rounded-md h-8 w-full duration-300 ring-1 hover:ring-2  ${
            open ? "ring-slate-500 ring-2" : "ring-slate-300"
          } `}
        >
          <input
            disabled={getAllDepartments.loading}
            ref={inputRef}
            value={inputValue}
            onFocus={() => {
              setOpen(true);
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="absolute w-[calc(100%-2.5em)] text-left left-2 border-trans(theRef.current as any) outline-none focus:border-trans(theRef.current as any) focus:ring-0 whitespace-nowrap overflow-hidden"
          />

          <div className="absolute right-2 text-red-400">
            <SmallIconButton
              icon={<TiTimes />}
              hoverAttr="hover:bg-red-200"
              onClickF={(e) => {
                e.stopPropagation();
                onChangeF(null);
                setSelectedRegion("");
                setSelectedDepartment("");
                setInputValue("");
              }}
            />
          </div>
        </div>
      </div>
      <div
        ref={optionsRef}
        className={`z-20 absolute float-right w-fit border rounded-md shadow-lg bg-slate-50 mt-1 ${
          !open ? "hidden" : ""
        } flex items-start justify-start right-0`}
      >
        <ul className="rounded-md h-96 overflow-auto">
          <li className={`sticky top-0 w-full cursor-pointer p-1 bg-white`}>
            <p className="w-32 text-sm text-left mt-1 px-2 bg-slate-700 text-white rounded-md ">
              Regions
            </p>
          </li>
          {regionOptions.map((region, i) => {
            let containingSearch =
              allDepartments.filter(
                (department) =>
                  department.region === region &&
                  inputValue !== "" &&
                  (department.name ?? "").match(
                    new RegExp(inputValue.replace(/[^a-zA-Z0-9 ]/g, ""), "i")
                  )
              ).length > 0;

            return (
              <li
                onClick={() => {
                  setSelectedRegion(region);
                }}
                key={i}
                className={`w-32 cursor-pointer text-md text-left m-1 p-2 rounded-md hover:bg-slate-300 ${
                  containingSearch ? "bg-slate-100" : ""
                } ${
                  selectedRegion === region ? "bg-slate-700" : ""
                } duration-300`}
              >
                <p
                  className={` ${
                    selectedRegion === region
                      ? "text-white hover:text-black"
                      : inputValue === ""
                      ? ""
                      : containingSearch
                      ? "font-bold"
                      : "text-slate-300"
                  } `}
                >
                  {region}
                </p>
              </li>
            );
          })}
        </ul>
        <ul className="rounded-md h-96 overflow-auto">
          <li className={`sticky top-0 w-full cursor-pointer p-1 bg-white`}>
            <p className="w-48 text-sm text-left mt-1 px-2 bg-slate-700 text-white rounded-md ">
              Departments
            </p>
          </li>
          {departmentOptions.map((department, i) => {
            return (
              <li
                onClick={() => {
                  setSelectedDepartment(department);
                }}
                key={i}
                className={`w-48 cursor-pointer text-md text-left m-1 p-2 rounded-md hover:bg-slate-300  ${
                  selectedDepartment === department ? "bg-slate-700" : ""
                } duration-300`}
              >
                <p
                  className={` ${
                    selectedDepartment === department
                      ? "text-white hover:text-black"
                      : ""
                  } `}
                >
                  {department}
                </p>
              </li>
            );
          })}
        </ul>
        <ul className="rounded-md  h-96 overflow-auto">
          <li className={`sticky top-0 w-full cursor-pointer p-1 bg-white`}>
            <p className="w-48 text-sm text-left mt-1 px-2 bg-slate-700 text-white rounded-md">
              Positions
            </p>
          </li>
          {positionOptions.map((position, i) => {
            return (
              <li
                onClick={() => {
                  let matchedDepartment = allDepartments.find(
                    (department) =>
                      department.region === selectedRegion &&
                      department.name === selectedDepartment
                  );
                  if (matchedDepartment) {
                    onChangeF({
                      ...EMPTY_ROLE,
                      departmentId: matchedDepartment.id!,
                      department: matchedDepartment.name ?? "",
                      departmentRegion: matchedDepartment.region ?? "",
                      position,
                    });
                    setOpen(false);
                    setInputValue(
                      `${selectedDepartment}-[${selectedRegion}]: ${position}`
                    );
                  }
                }}
                key={i}
                className={`w-48 cursor-pointer text-md text-left m-1 p-2 rounded-md hover:bg-slate-300duration-300 hover:bg-slate-300 `}
              >
                <p className={``}>{position}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
