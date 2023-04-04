import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import { User } from "@/interfaces/userDefinitions";
import { getCookie } from "cookies-next";
import { verifyToken } from "@/lib/db";

// interface PageProps {
//   user: User;
// }

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   req,
//   res,
// }) => {
//   let token = getCookie("token", { req, res });
//   let user = await verifyToken(token?.toString());

//   if (!user)
//     return {
//       redirect: {
//         destination: "/signIn",
//         permanent: false,
//       },
//     };

//   return {
//     props: {
//       user: { ...user, _id: user._id.toString() },
//     },
//   };
// };

export default function Home() {
  return <div>Hi</div>;
}
