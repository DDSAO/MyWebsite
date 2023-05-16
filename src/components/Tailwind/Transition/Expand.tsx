import { useTick } from "@/lib/hooks/useTick";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

export const Expand = (props: {
  open: boolean;
  children: any;
  visible?: boolean;
  id?: number | string;
}) => {
  const theRef = useRef(null);
  const heightRef = useRef(null);
  const expandTimeline = useRef(null);
  const { open, children, visible, id } = props;
  const [shouldClose, setShouldClose] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  // const tick = useTick(1);

  useEffect(() => {
    expandTimeline.current = gsap.timeline({ paused: true }).fromTo(
      theRef.current,
      {
        height: 0,
      },
      {
        height: "auto",
        duration: 0.3,
      }
    ) as any;

    return () => {
      (expandTimeline.current as any).kill();
    };
  }, [id]);

  useEffect(() => {
    if (open) {
      (expandTimeline.current as any).restart();
      if (visible)
        setTimeout(() => {
          setIsVisible(true);
        }, 300);
    } else {
      if (visible) setIsVisible(false);
      (expandTimeline.current as any).reverse();
    }
  }, [open]);

  return (
    <div
      ref={theRef}
      className={`relative ${
        isVisible ? "overflow-visible" : "overflow-hidden"
      } `}
    >
      {children}
    </div>
  );
};
