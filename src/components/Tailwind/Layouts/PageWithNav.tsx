import { User } from "@/interfaces/userDefinitions";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineSetting } from "react-icons/ai";
import { RiShip2Line, RiBookletLine } from "react-icons/ri";
import { SlideButton } from "../Button/SlideButton";
import { IoIosLogOut } from "react-icons/io";
import { deleteCookie } from "cookies-next";
import { atom, useRecoilState } from "recoil";
import { ConsolAtom } from "@/pages/admin/consol/view/[token]";
import { EMPTY_CONSOL } from "@/interfaces/consolDefinitions";

export const CurrentUserAtom = atom<User | null>({
  key: "/PageWithNav/CurrentUserAtom",
  default: null,
});

type DialogInfoType = {
  open: boolean;
  content: any;
  onClose?: (() => void) | null;
};
export const DialogInfoAtom = atom<DialogInfoType>({
  key: "/PageWithNav/DialogInfoAtom",
  default: {
    open: false,
    content: null,
    onClose: null,
  },
});

export const PageWithNav = (props: { children?: any }) => {
  let { children } = props;
  const router = useRouter();
  const [user, setUser] = useRecoilState(CurrentUserAtom);
  const [consol, setConsol] = useRecoilState(ConsolAtom);
  const [dialogInfo, setDialogInfo] = useRecoilState(DialogInfoAtom);

  return (
    <div className="">
      <div className="h-16 flex items-center justify-between px-2">
        <div className="flex items-center justify-start">
          <Image
            width={152}
            height={40}
            src={"/images/logo.png"}
            className="px-2"
            alt="logo"
          />
          <p className="text-xl">
            {router.asPath.split("/").slice(-2).join(" ").toUpperCase()}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 px-2">
          <div className="w-64">
            <SlideButton
              startIcon={<AiOutlinePlusCircle />}
              text="New Consol"
              onClickF={() => {
                setConsol(EMPTY_CONSOL);
                router.push("/admin/consol/view/new");
              }}
            />
          </div>
          {user && <p>Hi, {user.username}</p>}
          <SlideButton
            startIcon={<IoIosLogOut />}
            text="Log Out"
            onClickF={() => {
              deleteCookie("token");
              router.push(
                `/signIn?redirectTo=${encodeURIComponent(router.asPath)}`
              );
            }}
          />
        </div>
      </div>
      <div className="absolute h-[calc(100%-64px)] w-40 px-4 py-2">
        <div className="rounded-[32px] bg-regular h-full w-full py-[32px]">
          <div
            onClick={() => {
              router.push("/admin/consol/list");
            }}
            className={`${
              router.pathname === "/admin/consol/list" ? "bg-dark" : ""
            }  cursor-pointer select-text duration-300 h-24 group hover:bg-light flex flex-col items-center justify-center gap-2`}
          >
            <div className="group-hover:text-black text-white">
              <RiShip2Line size="24px" />
            </div>
            <p className="group-hover:text-black text-white">Consol</p>
          </div>

          <div
            onClick={() => {
              router.push("/admin/accounting/list");
            }}
            className={`${
              router.pathname === "/admin/accounting/list" ? "bg-dark" : ""
            }  cursor-pointer select-text duration-300 h-24 group hover:bg-light flex flex-col items-center justify-center gap-2`}
          >
            <div className="group-hover:text-black text-white">
              <RiBookletLine size="24px" />
            </div>
            <p className="group-hover:text-black text-white">Accounting</p>
          </div>

          <div
            onClick={() => {
              router.push("/admin/setting");
            }}
            className={`${
              router.pathname === "/admin/setting" ? "bg-dark" : ""
            }  cursor-pointer select-text duration-300 h-24 group hover:bg-light flex flex-col items-center justify-center gap-2`}
          >
            <div className="group-hover:text-black text-white">
              <AiOutlineSetting size="24px" />
            </div>
            <p className="group-hover:text-black text-white">Setting</p>
          </div>
        </div>
      </div>
      <div className="absolute left-[160px] w-[calc(100%-176px)] h-[calc(100%-64px)] py-2 overflow-scroll">
        {children}
      </div>
      {dialogInfo.open && (
        <div
          className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50`}
        >
          <div
            className="absolute w-screen h-screen backdrop-blur-sm"
            onClick={() => {
              if (dialogInfo.onClose) dialogInfo.onClose();
              setDialogInfo({
                open: false,
                content: null,
              });
            }}
          ></div>
          <div className="absolute flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {dialogInfo.content}
          </div>
        </div>
      )}
    </div>
  );
};
