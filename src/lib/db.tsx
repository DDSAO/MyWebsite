import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017");

// export const verifyToken = async (
//   token?: string | null
// ): Promise<User | null> => {
//   if (!token) return null;
//   let [username, password] = token.split(":");
//   if (username && password) {
//     let user = await UserCollection.findOne({ username });
//     if (user && user.password === password) return user;
//     return null;
//   }
//   return null;
// };
