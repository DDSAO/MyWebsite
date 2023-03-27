const timestampToStr = (ts: number) => {
  let date = new Date(ts * 1000);
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const DateField = (props: {
  title?: any;
  onChangeF: (e: Date) => void;
  value: number | null;
  disableEdit?: boolean;
}) => {
  const { title, onChangeF, value, disableEdit } = props;
  return (
    <div className="flex flex-col justify-center items-start w-full">
      {title ? (
        <p className="text-left text-xs text-slate-500">{title}</p>
      ) : null}
      <input
        className={`${
          value ? "" : "text-slate-500"
        } h-7 ring-offset-0 ring-1 ring-slate-300 p-1 hover:ring-2 focus:outline-none duration-200 transition-shadow rounded-md w-full `}
        type="date"
        value={value ? timestampToStr(value) : ""}
        onChange={(e) => {
          onChangeF(new Date(e.target.value));
        }}
      />
    </div>
  );
};
