import { TextField } from "@/components/Tailwind/Input/TextField";
import { PageWithNav } from "@/components/Tailwind/Layouts/PageWithNav";
import { EMPTY_CONSOL_FILTERS } from "@/interfaces/consolDefinitions";
import { User } from "@/interfaces/userDefinitions";
import { verifyToken } from "@/lib/db";
import { getCookie } from "cookies-next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { atom, useRecoilState } from "recoil";
import { useState } from "react";
import { Company } from "@/interfaces/customerDefinition";
import { CompanyField } from "@/components/Tailwind/Input/CompanyField";
import { DateField } from "@/components/Tailwind/Input/DateField";
import { toTimestamp } from "@/lib/utils";
import { SlideButton } from "@/components/Tailwind/Button/SlideButton";
import { TiTick } from "react-icons/ti";

interface PageProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
  res,
}) => {
  let token = getCookie("token", { req, res });
  let user = await verifyToken(token?.toString());

  if (!user)
    return {
      redirect: {
        destination: "/user/signIn",
        permanent: false,
      },
    };

  return {
    props: {
      user: { ...user, _id: user._id.toString() },
    },
  };
};

export const FiltersAtom = atom({
  key: "/consol/list/FiltersAtom",
  default: EMPTY_CONSOL_FILTERS,
});

export default function Page({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [filters, setFilters] = useRecoilState(FiltersAtom);

  const [consignor, setConsignor] = useState<Company | null>(null);
  const [consignee, setConsignee] = useState<Company | null>(null);
  const [importAgent, setImportAgent] = useState<Company | null>(null);
  const [exportAgent, setExportAgent] = useState<Company | null>(null);

  return (
    <PageWithNav user={user}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="rounded-lg shadow-lg grid grid-cols-3 border gap-4 p-4">
          <p className="lg:col-span-3 text-md">Filters - General Info</p>
          <TextField
            title={"Consol #"}
            value={filters.consolId}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                consolId: e.target.value,
              });
            }}
          />
          <CompanyField
            title="Consignor"
            value={consignor}
            onChangeF={(value) => {
              if (value) {
                setConsignor(value);
                setFilters({
                  ...filters,
                  consignorId: value.id,
                });
              } else {
                setConsignor(null);
                setFilters({
                  ...filters,
                  consignorId: null,
                });
              }
            }}
          />
          <CompanyField
            title="Consignee"
            value={consignee}
            onChangeF={(value) => {
              if (value) {
                setConsignee(value);
                setFilters({
                  ...filters,
                  consigneeId: value.id,
                });
              } else {
                setConsignee(null);
                setFilters({
                  ...filters,
                  consigneeId: null,
                });
              }
            }}
          />
          <TextField
            title={"MBL/MAWB"}
            value={filters.mbl}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                mbl: e.target.value,
              });
            }}
          />
          <TextField
            title={"Shipment #"}
            value={filters.shipmentId}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                shipmentId: e.target.value,
              });
            }}
          />
          <TextField
            title={"Container #"}
            value={filters.containerId}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                containerId: e.target.value,
              });
            }}
          />
          <TextField
            title={"Vessel/Flight"}
            value={filters.vessel}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                vessel: e.target.value,
              });
            }}
          />
          <TextField
            title={"Operator"}
            value={filters.operator}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                operator: e.target.value,
              });
            }}
          />
          <TextField
            title={"Sales"}
            value={filters.sales}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                sales: e.target.value,
              });
            }}
          />
        </div>
        <div className="rounded-lg shadow-lg grid grid-cols-3 border gap-4 p-4">
          <p className="lg:col-span-3 text-md">Filters - Location & Date</p>
          <TextField
            title={"HBL"}
            value={filters.hbl}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                hbl: e.target.value,
              });
            }}
          />
          <DateField
            title="ETA"
            value={filters.eta ?? null}
            onChangeF={(value) => {
              if (value) {
                setFilters({
                  ...filters,
                  eta: toTimestamp(value.setHours(0, 0, 0)),
                });
              } else {
                setFilters({
                  ...filters,
                  eta: null,
                });
              }
            }}
          />
          <DateField
            title="ETD"
            value={filters.etd ?? null}
            onChangeF={(value) => {
              if (value) {
                setFilters({
                  ...filters,
                  etd: toTimestamp(value.setHours(23, 59, 59)),
                });
              } else {
                setFilters({
                  ...filters,
                  etd: null,
                });
              }
            }}
          />
          <TextField
            title={"Port of Loading (POL)"}
            value={filters.load}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                load: e.target.value,
              });
            }}
          />
          <DateField
            title="Created From"
            value={filters.createdAtFrom ?? null}
            onChangeF={(value) => {
              if (value) {
                setFilters({
                  ...filters,
                  createdAtFrom: toTimestamp(value.setHours(0, 0, 0)),
                });
              } else {
                setFilters({
                  ...filters,
                  createdAtFrom: null,
                });
              }
            }}
          />
          <DateField
            title="Created To"
            value={filters.createdAtTo ?? null}
            onChangeF={(value) => {
              if (value) {
                setFilters({
                  ...filters,
                  createdAtTo: toTimestamp(value.setHours(23, 59, 59)),
                });
              } else {
                setFilters({
                  ...filters,
                  createdAtTo: null,
                });
              }
            }}
          />
          <TextField
            title={"Port of Discharge (POD)"}
            value={filters.discharge}
            onChangeF={(e) => {
              setFilters({
                ...filters,
                shipmentId: e.target.value,
              });
            }}
          />
          <DateField
            title="Deal Date From"
            value={filters.dealDateFrom ?? null}
            onChangeF={(value) => {
              if (value) {
                setFilters({
                  ...filters,
                  dealDateFrom: toTimestamp(value.setHours(0, 0, 0)),
                });
              } else {
                setFilters({
                  ...filters,
                  dealDateFrom: null,
                });
              }
            }}
          />
          <DateField
            title="Deal Date To"
            value={filters.dealDateTo ?? null}
            onChangeF={(value) => {
              if (value) {
                setFilters({
                  ...filters,
                  dealDateTo: toTimestamp(value.setHours(23, 59, 59)),
                });
              } else {
                setFilters({
                  ...filters,
                  dealDateTo: null,
                });
              }
            }}
          />
        </div>
        <div className="rounded-lg shadow-lg grid grid-cols-3 border gap-4 p-4">
          <p className="lg:col-span-3 text-md">Filters - Status</p>
          {["open", "submitted", "reviewed"].map((key, i) => {
            return (
              <div key={i} className="justify-self-center self-center">
                <SlideButton
                  selected={filters.status === key}
                  startIcon={filters.status === key ? <TiTick /> : null}
                  text={key.toUpperCase()}
                  onClickF={() => {
                    if (filters.status === key) {
                      setFilters({
                        ...filters,
                        status: null,
                      });
                    } else {
                      setFilters({
                        ...filters,
                        status: key,
                      });
                    }
                  }}
                />
              </div>
            );
          })}

          <CompanyField
            title="Import Agent"
            value={importAgent}
            onChangeF={(value) => {
              if (value) {
                setImportAgent(value);
                setFilters({
                  ...filters,
                  importAgentId: value.id,
                });
              } else {
                setImportAgent(null);
                setFilters({
                  ...filters,
                  importAgentId: null,
                });
              }
            }}
          />
          <CompanyField
            title="Export Agent"
            value={exportAgent}
            onChangeF={(value) => {
              if (value) {
                setExportAgent(value);
                setFilters({
                  ...filters,
                  exportAgentId: value.id,
                });
              } else {
                setExportAgent(null);
                setFilters({
                  ...filters,
                  exportAgentId: null,
                });
              }
            }}
          />
          <div className="justify-self-center self-end">
            <SlideButton
              selected={filters.onlyToday === true}
              text={"Only Show Today"}
              onClickF={() => {
                setFilters({
                  ...filters,
                  onlyToday: !filters.onlyToday,
                });
              }}
            />
          </div>
          <div className="col-span-3 flex items-center justify-end gap-2">
            <SlideButton
              color="yellow"
              selected={true}
              text="Clear"
              onClickF={() => {
                setFilters(EMPTY_CONSOL_FILTERS);
              }}
            />
            <SlideButton
              color="green"
              selected={true}
              text="Search"
              onClickF={() => {}}
            />
          </div>
        </div>
      </div>
    </PageWithNav>
  );
}
