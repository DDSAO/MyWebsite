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

  return <PageWithNav user={user}>home</PageWithNav>;
}
