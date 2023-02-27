import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { atom } from "recoil";

export type TableWithCardTriggers = {
  triggerRefresh: boolean;
  triggerOpen: boolean;
  triggerClose: boolean;
};

export const DEFAULT_TABLE_WITH_CARDS_TRIGGERS: TableWithCardTriggers = {
  triggerRefresh: false,
  triggerOpen: false,
  triggerClose: false,
};

export const TriggersAtom = atom<TableWithCardTriggers>({
  key: "/Tailwind/Table/TriggersAtom",
  default: DEFAULT_TABLE_WITH_CARDS_TRIGGERS,
});

export const TableWithCard = (props: {
  table: any;
  card: any;
  triggerRefresh: boolean;
  onRefresh?: () => void;
  triggerOpen: boolean;
  onOpen?: () => void;
  triggerClose: boolean;
  onClose?: () => void;
  loading?: boolean;
}) => {
  const {
    table,
    card,
    triggerRefresh,
    onRefresh,
    triggerOpen,
    onOpen,
    triggerClose,
    onClose,
    loading,
  } = props;

  const tableRef = useRef(null);
  const cardRef = useRef(null);

  const refreshCardTimeline = useRef(null);

  const finallyCloseTableTimeline = useRef(null);

  const firstOpenTableTimeline = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      refreshCardTimeline.current = gsap
        .timeline({
          paused: true,
        })
        .from(cardRef.current, {
          x: "0%",
        })
        .to(cardRef.current, {
          x: "110%",
          duration: 0.25,
        })
        .add(() => {
          onRefresh && onRefresh();
        })
        .to(cardRef.current, {
          x: "0%",
          duration: 0.25,
        }) as any;

      finallyCloseTableTimeline.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            onClose && onClose();
          },
        })
        .fromTo(
          tableRef.current,
          { width: "60%" },
          { width: "100%", duration: 0.5 }
        )
        .fromTo(
          cardRef.current,
          { x: "0%" },
          { x: "110%", duration: 0.5 },
          "-=0.5"
        ) as any;

      firstOpenTableTimeline.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            onOpen && onOpen();
          },
        })
        .fromTo(
          tableRef.current,
          { width: "100%" },
          { width: "60%", duration: 0.5 }
        )
        .fromTo(
          cardRef.current,
          { x: "110%" },
          { x: "0%", duration: 0.5 },
          "-=0.5"
        ) as any;
    } else {
      refreshCardTimeline.current = gsap.timeline({
        paused: true,
      }) as any;
      // .from(cardRef.current, {
      //   x: "0%",
      // })
      // .to(cardRef.current, {
      //   x: "110%",
      //   duration: 0.25,
      // })
      // .add(() => {
      //   onRefresh && onRefresh();
      // })
      // .to(cardRef.current, {
      //   x: "0%",
      //   duration: 0.25,
      // }) as any;

      finallyCloseTableTimeline.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            onClose && onClose();
          },
        })
        .fromTo(
          tableRef.current,
          { width: "60%" },
          { width: "100%", duration: 0.5 }
        )
        .to(tableRef.current, { x: "0%", duration: 0.5 }, "-=0.5")
        .fromTo(
          cardRef.current,
          { x: "0%", width: "100%" },
          { x: "110%", width: "100%", duration: 0.5 },
          "-=0.5"
        ) as any;

      firstOpenTableTimeline.current = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            onOpen && onOpen();
          },
        })
        .fromTo(
          tableRef.current,
          { width: "100%" },
          { width: "60%", duration: 0.5 }
        )
        .to(tableRef.current, { x: "-110%", duration: 0.5 }, "-=0.5")
        .fromTo(
          cardRef.current,
          { x: "110%" },
          { x: "-60%", duration: 0.5 },
          "-=0.5"
        )
        .to(cardRef.current, { width: "100%", duration: 0.5 }, "-=0.5") as any;
    }

    return () => {
      (refreshCardTimeline.current as any).kill();
      (firstOpenTableTimeline.current as any).kill();
      (finallyCloseTableTimeline.current as any).kill();
    };
  }, []);

  useEffect(() => {
    if (triggerRefresh) {
      (refreshCardTimeline.current as any).restart();
    }
  }, [triggerRefresh]);

  useEffect(() => {
    if (triggerOpen) (firstOpenTableTimeline.current as any).restart();
  }, [triggerOpen]);

  useEffect(() => {
    if (triggerClose) (finallyCloseTableTimeline.current as any).restart();
  }, [triggerClose]);

  return (
    <>
      <div className="relative w-full my-4 flex items-start justify-start">
        <div
          ref={tableRef}
          className={`absolute top-0 left-0 w-full mr-2 bg-white rounded-md shadow-md ${
            loading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {table}
        </div>

        <div
          ref={cardRef}
          className={`absolute left-[60%] w-2/5 ml-2 translate-x-[110%] ${
            loading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {card}
        </div>
      </div>
      <div className="z-0 w-full my-4 flex items-start justify-start translate-x-[110%]">
        <div className="w-3/5">{table}</div>
        <div className="w-2/5">{card}</div>
      </div>
    </>
  );
};
