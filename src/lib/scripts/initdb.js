const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

const UserCollection = client.db("IFindJob").collection("UserCollection");

const init = async () => {
  await UserCollection.updateOne(
    { id: 0 },
    {
      $set: {
        username: "test",
        password:
          "7b3d979ca8330a94fa7e9e1b466d8b99e0bcdea1ec90596c0dcc8d7ef6b4300c",
      },
    },
    { upsert: true }
  );
  console.log("ok");
  process.exit(1);
};

init();
