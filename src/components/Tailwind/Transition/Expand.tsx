import gsap from "gsap";
import { useRef, useEffect } from "react";

export const Expand = (props: { open: boolean; children: any }) => {
  const theRef = useRef(null);
  const heightRef = useRef(null);
  const expandTimeline = useRef(null);
  const shrinkTimeline = useRef(null);
  const { open, children } = props;

  useEffect(() => {
    expandTimeline.current = gsap
      .timeline({ paused: true })
      .to(theRef.current, {
        height: (heightRef.current as any).offsetHeight,
        duration: 0.3,
      }) as any;

    shrinkTimeline.current = gsap
      .timeline({ paused: true })
      .to(theRef.current, {
        height: 0,
        duration: 0.3,
      }) as any;

    return () => {
      (expandTimeline.current as any).kill();
      (shrinkTimeline.current as any).kill();
    };
  }, [(heightRef.current as any)?.offsetHeight]);

  useEffect(() => {
    if (open) {
      (expandTimeline.current as any).restart();
    } else {
      (shrinkTimeline.current as any).restart();
    }
  }, [open]);

  return (
    <div ref={theRef} className="overflow-hidden h-0">
      {children}
      <div
        ref={heightRef}
        style={{
          width: (theRef.current as any)
            ? (theRef.current as any).offsetWidth
            : undefined,
        }}
        className="absolute -z-50 opacity-0"
      >
        {children}
      </div>
    </div>
  );
};
