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

const NavBar = () => {
  const [expand, setExpand] = useState(false);

  return <div></div>;
};

export const PageWithNav = (props: { children?: any; user: User }) => {
  let { user, children } = props;
  const router = useRouter();
  // console.log(router.pathname.split("/").join(" "));
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
            {router.pathname.split("/").join(" ").toUpperCase()}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 px-2">
          <div className="w-64">
            <SlideButton
              startIcon={<AiOutlinePlusCircle />}
              text="New Consol"
              onClickF={() => {}}
            />
          </div>
          <p>Hi, {user.username}</p>
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
              router.push("/admin/consol/list/");
            }}
            className="cursor-pointer select-text duration-300 h-24 group hover:bg-light flex flex-col items-center justify-center gap-2"
          >
            <div className="group-hover:text-black text-white">
              <RiShip2Line size="24px" />
            </div>
            <p className="group-hover:text-black text-white">Consol</p>
          </div>

          <div
            onClick={() => {
              router.push("/admin/accounting/list/");
            }}
            className="cursor-pointer select-text duration-300 h-24 group hover:bg-light flex flex-col items-center justify-center gap-2"
          >
            <div className="group-hover:text-black text-white">
              <RiBookletLine size="24px" />
            </div>
            <p className="group-hover:text-black text-white">Accounting</p>
          </div>

          <div
            onClick={() => {
              router.push("/admin/setting/");
            }}
            className="cursor-pointer select-text duration-300 h-24 group hover:bg-light flex flex-col items-center justify-center gap-2"
          >
            <div className="group-hover:text-black text-white">
              <AiOutlineSetting size="24px" />
            </div>
            <p className="group-hover:text-black text-white">Setting</p>
          </div>
        </div>
      </div>
      <div className="absolute left-[160px] w-[calc(100%-176px)] py-2">
        {children}
      </div>
    </div>
  );
};
