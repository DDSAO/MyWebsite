import { AiOutlineLoading, AiOutlineStop } from "react-icons/ai";

export const WarningButtonWithIcon = (props: {
  onClickF: () => void;
  text?: string;
  startIcon?: any;
  endIcon?: any;
  loading?: boolean;
  disabled?: boolean;
}) => {
  const { onClickF, text, startIcon, endIcon, loading, disabled } = props;
  if (loading)
    return (
      <div
        className={`rounded-md border bg-slate-300  h-8 flex items-center justify-center`}
      >
        <AiOutlineLoading className="animate-spin text-slate-500" />
      </div>
    );
  if (disabled)
    return (
      <div
        className={`rounded-md border bg-slate-300  h-8 flex items-center justify-center`}
      >
        {startIcon ? (
          <div className="w-8 h-8 flex justify-center items-center text-lg text-slate-500">
            <AiOutlineStop />
          </div>
        ) : (
          <div className="w-4 h-8 flex justify-center items-center text-lg"></div>
        )}
        <p
          className={`cursor-pointer overflow-hidden text-center whitespace-nowrap text-slate-500`}
        >
          {text}
        </p>
        {endIcon ? (
          <div className="w-8 h-8 flex justify-center items-center text-lg text-slate-500">
            <AiOutlineStop />
          </div>
        ) : (
          <div className="w-4 h-8 flex justify-center items-center text-lg"></div>
        )}
      </div>
    );

  return (
    <div
      onClick={() => {
        onClickF();
      }}
      className={`flex flex-start h-8`}
    >
      <div
        className={`flex flex-start items-center h-8 cursor-pointer rounded-md leading-8 border border-yellow-300 hover:border-yellow-500 hover:bg-yellow-50 hover:animate-[slide-bg-right-yellow_1s_ease-in_forwards] overflow-hidden `}
      >
        {startIcon ? (
          <div className="w-8 h-8 flex justify-center items-center text-lg">
            {startIcon}
          </div>
        ) : (
          <div className="w-4 h-8 flex justify-center items-center text-lg"></div>
        )}
        <p
          className={`cursor-pointer overflow-hidden text-center whitespace-nowrap text-yellow-500`}
        >
          {text}
        </p>
        {endIcon ? (
          <div className="w-8 h-8 flex justify-center items-center text-lg">
            {endIcon}
          </div>
        ) : (
          <div className="w-4 h-8 flex justify-center items-center text-lg"></div>
        )}
      </div>
    </div>
  );
};
