import { Company, CompanyContact } from "@/interfaces/customerDefinition";
import { CompanyField } from "./CompanyField";
import { SelectField } from "../Input/SelectField";
import { useMemo } from "react";
import { FixedField } from "../Input/FixedField";
import { SmallIconButton } from "../Button/SmallIconButton";
import { TbTriangle } from "react-icons/tb";
import { AiOutlineWarning } from "react-icons/ai";
import { useState } from "react";
import { TextArea } from "../Input/TextArea";
import { CgNotes } from "react-icons/cg";
import { TextField } from "../Input/TextField";
import { SlideButton } from "../Button/SlideButton";
import { useDialog } from "@/lib/hooks/useDialog";
import usePost from "@/lib/hooks/usePost";

const Dialog = (props: {
  contact: CompanyContact;
  id: string;
  onComplete: (contacts: CompanyContact[]) => void;
  onClose: () => void;
}) => {
  const { contact, id, onComplete, onClose } = props;
  const [preferName, setPreferName] = useState(contact.preferName);
  const saveContact = usePost<
    { contact: CompanyContact; id: string },
    { contacts: CompanyContact[] }
  >({
    url: "/company/saveContact",
    onComplete: (data) => {
      if (data && data.contacts) {
        onComplete(data.contacts);
        onClose();
      }
    },
  });
  return (
    <div className="w-96 p-4 bg-white rounded-md shadow-md flex flex-col gap-2">
      <p className="py-1 px-2 bg-slate-200 rounded-md">Address Info</p>
      <FixedField title={"Line 1"} value={contact?.line1 ?? ""} />
      <FixedField title={"Line 2"} value={contact?.line2 ?? ""} />
      <FixedField title={"Line 3"} value={contact?.line3 ?? ""} />
      <FixedField title={"Line 4"} value={contact?.line4 ?? ""} />
      <p className="py-1 px-2 bg-slate-200 rounded-md">Save New Address As</p>
      <TextField
        title={"Display Name"}
        value={preferName}
        onChangeF={(e) => {
          setPreferName(e.target.value);
        }}
      />
      <div className="flex items-center justify-end">
        <SlideButton
          text="Save"
          loading={saveContact.loading}
          onClickF={() => {
            saveContact.reload({
              contact: {
                ...contact,
                preferName,
              },
              id,
            });
          }}
        />
      </div>
    </div>
  );
};

export const CompanyCard = (props: {
  onChangeF: (company: Company | null) => void;
  value: Company | null;
  disableEdit?: boolean;
}) => {
  const { onChangeF, value, disableEdit } = props;
  const [showNote, setShowNote] = useState(false);
  const [openDialog, closeDialog] = useDialog();

  let contact = useMemo(() => {
    return value?.contacts[value.selectedContact ?? 0] ?? null;
  }, [value]);

  if (!value || !contact)
    return (
      <div className="flex flex-col gap-2 items-stretch justify-start">
        <CompanyField
          disableEdit={disableEdit}
          title={`${value ? value.name : "Search Code"}`}
          value={value}
          onChangeF={(newValue) => {
            onChangeF(newValue);
          }}
        />
        <FixedField title={"Selected Contacts"} value={""} />
        <div className="p-2 bg-white rounded-md h-[216px]">
          <FixedField title={"Line 1"} value={contact?.line1 ?? null} />
          <FixedField title={"Line 2"} value={contact?.line2 ?? null} />
          <FixedField title={"Line 3"} value={contact?.line3 ?? null} />
          <FixedField title={"Line 4"} value={contact?.line4 ?? null} />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-stretch justify-start">
      <div className="flex items-end justify-between gap-2">
        <CompanyField
          disableEdit={disableEdit}
          title={`${value ? `Company Name: ${value.name}` : "Search Code"}`}
          value={value}
          onChangeF={(newValue) => {
            onChangeF(newValue);
          }}
        />

        <SmallIconButton
          disabled={disableEdit}
          hoverAttr="hover:bg-slate-300"
          text="View note"
          icon={<CgNotes />}
          onClickF={() => {
            setShowNote(!showNote);
          }}
        />
      </div>
      {contact ? (
        <div className="flex items-end justify-start gap-2">
          <SelectField
            disabled={disableEdit}
            title={`${"Select contact"}`}
            notAllowNull={true}
            value={contact.preferName}
            onChangeF={(newValue) => {
              let index = value!.contacts.findIndex(
                (contact) => contact.preferName === newValue
              );

              if (index !== -1) {
                onChangeF({
                  ...value,
                  selectedContact: index,
                });
              }
            }}
            options={value.contacts.map((contact) => contact.preferName)}
          />
          <div className="flex items-end justify-end">
            <SlideButton
              text="Save"
              onClickF={() => {
                openDialog(
                  <Dialog
                    contact={contact!}
                    id={value.id}
                    onComplete={(newContacts) => {
                      console.log({
                        ...value,
                        contacts: newContacts,
                      });
                      onChangeF({
                        ...value,
                        contacts: newContacts,
                      });
                    }}
                    onClose={() => {
                      closeDialog();
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      ) : (
        <FixedField title={"Selected Contacts"} value={""} />
      )}

      {showNote ? (
        <div className=" p-1 bg-white rounded-md h-[216px] overflow-hidden">
          <TextArea
            disableEdit={disableEdit}
            rows={3}
            title={"Charge Standard"}
            value={value.chargeStandard}
            onChangeF={() => {}}
          />
          <TextArea
            disableEdit={disableEdit}
            rows={3}
            title={"Note"}
            value={value.note}
            onChangeF={() => {}}
          />
        </div>
      ) : (
        <div className=" bg-white rounded-md h-[216px] flex flex-col gap-2">
          <TextField
            disableEdit={disableEdit}
            title={"Line 1"}
            value={contact?.line1 ?? ""}
            onChangeF={(e) => {
              onChangeF({
                ...value,
                contacts: [
                  ...value.contacts.slice(0, value.selectedContact ?? 0),
                  {
                    ...contact!,
                    line1: e.target.value,
                  },
                  ...value.contacts.slice((value.selectedContact ?? 0) + 1),
                ],
              });
            }}
          />
          <TextField
            disableEdit={disableEdit}
            title={"Line 2"}
            value={contact?.line2 ?? ""}
            onChangeF={(e) => {
              onChangeF({
                ...value,
                contacts: [
                  ...value.contacts.slice(0, value.selectedContact ?? 0),
                  {
                    ...contact!,
                    line2: e.target.value,
                  },
                  ...value.contacts.slice((value.selectedContact ?? 0) + 1),
                ],
              });
            }}
          />
          <TextField
            disableEdit={disableEdit}
            title={"Line 3"}
            value={contact?.line3 ?? ""}
            onChangeF={(e) => {
              onChangeF({
                ...value,
                contacts: [
                  ...value.contacts.slice(0, value.selectedContact ?? 0),
                  {
                    ...contact!,
                    line3: e.target.value,
                  },
                  ...value.contacts.slice((value.selectedContact ?? 0) + 1),
                ],
              });
            }}
          />
          <TextField
            disableEdit={disableEdit}
            title={"Line 4"}
            value={contact?.line4 ?? ""}
            onChangeF={(e) => {
              onChangeF({
                ...value,
                contacts: [
                  ...value.contacts.slice(0, value.selectedContact ?? 0),
                  {
                    ...contact!,
                    line4: e.target.value,
                  },
                  ...value.contacts.slice((value.selectedContact ?? 0) + 1),
                ],
              });
            }}
          />{" "}
        </div>
      )}
    </div>
  );
};
