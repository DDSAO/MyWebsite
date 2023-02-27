import { getNow } from "@/lib/utils";
import { IndexCollection } from "./db";

export const getSerialNumber = async (type: string) => {
  let latest = await IndexCollection.find({ type })
    .sort({ $natural: -1 })
    .limit(1)
    .next();
  let serialNumber = String((latest ? latest.id : 0) + 1).padStart(8, "0");
  await IndexCollection.insertOne({
    type,
    id: (latest ? latest.id : 0) + 1,
    createdAt: getNow(),
    serialNumber,
  });
  return serialNumber;
};

export const getSerialId = async (type: string) => {
  let latest = await IndexCollection.find({ type })
    .sort({ $natural: -1 })
    .limit(1)
    .next();
  let serialNumber = String((latest ? latest.id : 0) + 1).padStart(8, "0");
  await IndexCollection.insertOne({
    type,
    id: (latest ? latest.id : 0) + 1,
    createdAt: getNow(),
    serialNumber,
  });
  return (latest ? latest.id : 0) + 1;
};
