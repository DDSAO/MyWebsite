import { Consol } from "@/interfaces/consolDefinitions";
import { Company } from "@/interfaces/customerDefinition";
import { PortCode } from "@/interfaces/portCodeDefinition";
import { Tariff } from "@/interfaces/tariffDefinitions";
import { User } from "@/interfaces/userDefinitions";
import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017");

export const ConsolCollection = client
  .db("FrontierUnited")
  .collection<Consol>("Consol");

export const UserCollection = client
  .db("FrontierUnited")
  .collection<User>("User");
export const CompanyCollection = client
  .db("FrontierUnited")
  .collection<Company>("Company");
export const PortCodeCollection = client
  .db("FrontierUnited")
  .collection<PortCode>("PortCode");
export const TariffCollection = client
  .db("FrontierUnited")
  .collection<Tariff>("Tariff");

export const IndexCollection = client
  .db("FrontierUnited")
  .collection("IndexCollection");

export const verifyToken = async (
  token?: string | null
): Promise<User | null> => {
  if (!token) return null;
  let [username, password] = token.split(":");
  if (username && password) {
    let user = await UserCollection.findOne({ username });
    if (user && user.password === password) return user;
    return null;
  }
  return null;
};
