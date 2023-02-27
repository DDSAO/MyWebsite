import { useRef } from "react";

export const IconButton = (props: {
  icon: any;
  onClickF?: (e: any) => void;
  text?: string;
  hoverAttr?: string;
}) => {
  const { icon, onClickF, text, hoverAttr } = props;
  const textRef = useRef(null);

  return (
    <div
      className={`group relative cursor-pointer rounded-3xl w-8 h-8 ${
        hoverAttr ? hoverAttr : ""
      }`}
    >
      <div
        onClick={onClickF}
        className="absolute top-1 left-1 w-6 h-6 text-2xl"
      >
        {icon}
      </div>
      {text ? (
        <p
          ref={textRef}
          className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs rounded-md py-1 px-2 bg-gray-600 text-white top-9 ${
            textRef.current
              ? // `left-[${
                //     Math.round((textRef.current as any).offsetWidth / 2) - 32
                //   }px]`
                "left-[50%]"
              : ""
          } -translate-x-1/2 z-20 whitespace-nowrap`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
};
