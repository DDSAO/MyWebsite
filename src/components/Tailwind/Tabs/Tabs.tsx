import gsap, { Elastic } from "gsap";
import { useRef, useEffect, useState } from "react";

export type TabType = {
  icon: any;
  text: any;
  number?: number;
  disabled?: boolean;
};

const Tab = (props: {
  selected: boolean;
  icon: any;
  text: string;
  number?: number;
  disabled?: boolean;
}) => {
  const { selected, icon, text, number, disabled } = props;
  const tabRef = useRef(null);
  const borderRef = useRef(null);
  const expandTimeline = useRef(null);

  useEffect(() => {
    expandTimeline.current = gsap
      .timeline({ paused: true })
      .fromTo(tabRef.current, { scale: 1 }, { scale: 1.2, duration: 0.2 })
      .fromTo(
        borderRef.current,
        { width: 0 },
        { width: (tabRef.current as any).offsetWidth * 0.8, duration: 0.2 },
        "-=0.2"
      ) as any;

    return () => {
      (expandTimeline.current as any).kill();
    };
  }, []);

  useEffect(() => {
    if (!disabled) {
      if (selected) {
        (expandTimeline.current as any).restart();
      } else {
        (expandTimeline.current as any).reverse();
      }
    }
  }, [selected]);

  return (
    <div
      ref={tabRef}
      className={`${
        disabled
          ? "opacity-80 cursor-not-allowed bg-slate-200 text-slate-400"
          : "cursor-pointer hover:bg-slate-50 bg-white shadow-md"
      } relative flex items-center justify-center p-2 border rounded-md`}
    >
      <div
        className={`mr-1 ${
          disabled ? "text-slate-600" : `${selected ? "" : "text-slate-400"}`
        }`}
      >
        {icon}
      </div>
      <div className="relative">
        <p className={`text-xs ${selected ? "" : "text-slate-400"}`}>{text}</p>
      </div>

      <div
        ref={borderRef}
        className="absolute h-0.5 bottom-1 bg-slate-500"
      ></div>
      {!!number && (
        <p
          className={`absolute -top-1 -right-1 bg-blue-500 rounded-full text-white text-sm text-center w-6  `}
        >
          {number}
        </p>
      )}
    </div>
  );
};

export const Tabs = (props: {
  tabs: TabType[];
  selected: number;
  onSelectedChange: (i: number) => void;
  align?: "left" | "center" | "right";
}) => {
  const { tabs, selected, onSelectedChange, align } = props;
  return (
    <div
      className={`relative flex items-center ${
        align === "left"
          ? "justify-start"
          : align === "right"
          ? "justify-end"
          : "justify-center"
      }`}
    >
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => {
            if (!tab.disabled) onSelectedChange(i);
          }}
          className={` mx-2`}
        >
          <Tab
            selected={selected === i}
            icon={tab.icon}
            text={tab.text}
            disabled={tab.disabled}
            number={tab.number}
          />
        </div>
      ))}
    </div>
  );
};
