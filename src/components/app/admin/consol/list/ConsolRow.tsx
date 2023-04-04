import { Consol } from "@/interfaces/consolDefinitions";
import { timestampToDateStr } from "@/lib/utils";
import { SelectedConsolAtom } from "@/pages/admin/consol/list";
import { useRecoilState } from "recoil";

export const ConsolRow = (props: { consol: Consol }) => {
  const { consol } = props;

  const [selected, setSelected] = useRecoilState(SelectedConsolAtom);

  return (
    <tr
      onClick={() => {
        if (consol.consolId === selected) {
          setSelected(null);
        } else {
          setSelected(consol.consolId);
        }
      }}
      className={`
        ${
          consol.consolId === selected
            ? "bg-regular"
            : `${
                consol.status === "submitted"
                  ? "bg-orange-300"
                  : "even:bg-light"
              } ${consol.status === "reviewed" ? "opacity-50" : ""}`
        }
        first:border-t border-l border-r last:border-b  duration-75 rounded-md  text-sm
      `}
    >
      <td className="text-center p-2 font-light">{consol.consolId}</td>
      <td className="text-center p-2 font-light">{consol.transportMode}</td>
      <td className="text-center p-2 font-light">
        {consol.containerMode?.slice(0, 3)}
      </td>
      <td className="text-center p-2 font-light">{consol.MBL}</td>
      <td className="text-center p-2 font-light">
        {consol.routings.at(0) ? consol.routings.at(0)!.load : ""}
      </td>
      <td className="text-center p-2 font-light">
        {consol.routings.at(-1) ? consol.routings.at(-1)!.discharge : ""}
      </td>
      <td className="text-center p-2 font-light">{consol.importAgent?.id}</td>
      <td className="text-center p-2 font-light">{consol.exportAgent?.id}</td>
      <td className="text-center p-2 font-light">
        {timestampToDateStr(
          consol.routings.at(0) ? consol.routings.at(0)!.ETD : null
        )}
      </td>
      <td className="text-center p-2 font-light">
        {timestampToDateStr(
          consol.routings.at(-1) ? consol.routings.at(-1)!.ETA : null
        )}
      </td>
      <td className="text-center p-2 font-light">{consol.operator}</td>
      <td className="text-center p-2 font-light">{consol.sales}</td>
      <td className="text-center p-2 font-light">{consol.status}</td>
    </tr>
  );
};
