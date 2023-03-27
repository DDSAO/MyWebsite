// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client, CompanyCollection, verifyToken } from "@/lib/db";
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  let token = getCookie("token", { req, res });
  let user = await verifyToken(token ? token.toString() : null);
  if (!user) return res.status(200).json({ ok: 0, error: "Token expired" });

  let { searchKey } = req.body;

  await client.connect();

  //BUSINESS LOGICS
  let companies = await CompanyCollection.find({
    $or: [
      { id: new RegExp(searchKey, "i") },
      { name: new RegExp(searchKey, "i") },
    ],
  })
    .limit(10)
    .toArray();

  //if error
  //return res.status(200).json({ ok: 0, error: "RMA NOT FOUND" });

  let data = {
    ok: 1,
    data: {
      options: companies.map((company) => {
        return {
          ...company,
          _id: company._id.toString(),
        };
      }),
    },
  };

  return res.status(200).json(data);
}
