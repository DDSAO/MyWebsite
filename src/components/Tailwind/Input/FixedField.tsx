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
      } justify-start ${error ? "ring-2 ring-offset-4 ring-red-400" : ""} `}
    >
      <p className="text-xs font-bold text-left">
        {title} <span className="invisible">1</span>
      </p>
      {subValue !== undefined && (
        <p className="text-xs  text-left">
          {subValue} <span className="invisible">1</span>
        </p>
      )}
      {value !== undefined && (
        <p className={`text-md  text-left `}>
          {value} <span className="invisible">1</span>
        </p>
      )}

      {anyValue !== undefined && (
        <div className="w-full flex items-center justify-start">
          {anyValue} <span className="invisible">1</span>
        </div>
      )}
    </div>
  );
};
