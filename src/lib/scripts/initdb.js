const { MongoClient } = require("mongodb");
const sha256 = require("crypto-js/sha256");

const client = new MongoClient("mongodb://localhost:27017");

const UserCollection = client.db("FrontierUnited").collection("User");

const init = async () => {
  await UserCollection.updateOne(
    { username: "system" },
    {
      $set: {
        password: JSON.stringify(
          sha256(JSON.stringify(sha256("Fu601").words)).words
        ),
        groups: [
          "review",
          "ap",
          "ar",
          "setting",
          "profit",
          "AUD",
          "USD",
          "JPY",
          "OTHER",
        ],
        region: "AU",
      },
    },
    { upsert: true }
  );
  await UserCollection.updateOne(
    { username: "jpsystem" },
    {
      $set: {
        password: JSON.stringify(
          sha256(JSON.stringify(sha256("Fujp3508").words)).words
        ),
        groups: [
          "review",
          "ap",
          "ar",
          "setting",
          "profit",
          "AUD",
          "USD",
          "JPY",
          "OTHER",
        ],
        region: "JP",
      },
    },
    { upsert: true }
  );

  console.log("ok");
  process.exit(1);
};

init();
