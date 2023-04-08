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
  const shrinkTimeline = useRef(null);
  const { open, children, visible, id } = props;
  const [shouldClose, setShouldClose] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  // const tick = useTick(1);

  useEffect(() => {
    console.log((heightRef.current as any).offsetHeight);
    expandTimeline.current = gsap
      .timeline({ paused: true })
      .fromTo(
        theRef.current,
        {
          height: 0,
        },
        {
          height: (heightRef.current as any).offsetHeight,
          duration: 0.3,
        }
      )
      .add(() => {
        if (visible) setIsVisible(true);
      }) as any;
    shrinkTimeline.current = gsap
      .timeline({ paused: true })
      .add(() => {
        if (visible) setIsVisible(false);
      })
      .fromTo(
        theRef.current,
        { height: (heightRef.current as any).offsetHeight },
        {
          height: 0,
          duration: 0.3,
        }
      ) as any;
    if (!open) {
      setShouldClose(true);
      (shrinkTimeline.current as any).seek(0.5);
    } else {
      setShouldClose(false);
    }
    // setFirstOpen(true);
    return () => {
      (expandTimeline.current as any).kill();
      (shrinkTimeline.current as any).kill();
    };
  }, [id]);

  useEffect(() => {
    if (open) {
      (expandTimeline.current as any).restart();
    } else {
      if (shouldClose) {
        setShouldClose(false);
      } else {
        (shrinkTimeline.current as any).restart();
      }
    }
  }, [open]);

  return (
    <div
      ref={theRef}
      className={`relative ${
        isVisible ? "overflow-visible" : "overflow-hidden"
      }  h-0`}
    >
      {children}
      <div
        ref={heightRef}
        style={{
          width: (theRef.current as any)
            ? (theRef.current as any).offsetWidth
            : undefined,
        }}
        className="pointer-event-none absolute left-0 top-0 -z-50 opacity-0"
      >
        {children}
      </div>
    </div>
  );
};
