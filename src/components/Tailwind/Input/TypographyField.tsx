export const TypographyField = (props: { title: string; value: string }) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <p className="text-sm">{props.title}</p>
      <div className="w-full">
        <p className="block text-md text-right border-b-2 min-h-[1em]">
          {props.value ? props.value : <div className="invisible">1</div>}
        </p>
      </div>
    </div>
  );
};
