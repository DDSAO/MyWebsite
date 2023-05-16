// interface PageProps {
//   user: User;
// }

import { CandleVideo } from "@/components/app/home/CandleVideo";

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
  return (
    <div>
      <div className=" relative w-screen h-screen bg-black">
        <CandleVideo />
      </div>
    </div>
  );
}
