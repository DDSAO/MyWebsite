export const FixedField = (props: {
  title?: string | number | null;
  value?: string | number | null;
  subValue?: string | number | null;
  anyValue?: any;
  align?: string;
  error?: boolean;
}) => {
  const { title, value, anyValue, subValue, align, error } = props;
  return (
    <div
      className={`flex flex-col ${
        align === "left" || !align ? "items-start" : ""
      } ${align === "right" ? "items-end" : ""} ${
        align === "center" ? "items-center" : ""
      } justify-start ${error ? "ring-2 ring-offset-4 ring-red-400" : ""}`}
    >
      <p className="text-left text-xs text-slate-500 whitespace-nowrap">
        {title} {!title && <span className="invisible">1</span>}
      </p>
      {subValue !== undefined && (
        <p className="text-xs  text-left">
          {subValue} {!subValue && <span className="invisible">1</span>}
        </p>
      )}
      {value !== undefined && (
        <p
          className={`text-md w-full  text-left leading-8 border-b border-slate-300`}
        >
          {value} {!value && <span className="invisible">1</span>}
        </p>
      )}

      {anyValue !== undefined && (
        <div className="w-full flex items-center justify-start">
          {anyValue} {!anyValue && <span className="invisible">1</span>}
        </div>
      )}
    </div>
  );
};
