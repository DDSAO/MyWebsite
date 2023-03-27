const fs = require("fs");
const db = require("../db/db");
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

const go = async () => {
  let arr = JSON.parse(fs.readFileSync("./PortCode.json", "utf8"));

  arr = arr
    .filter((value, index, self) => {
      if (index % 10000 === 0) console.log(index);
      return (
        index ===
        self.findIndex(
          (t) => t.Country === value.Country && t.Location === value.Location
        )
      );
    })
    .map((obj) => ({
      code: obj.Country + obj.Location,
      name: obj.Name,
    }));
  return await client
    .db("FrontierUnited")
    .collection("PortCode")
    .insertMany(arr);
};

go().then((r) => console.log(r));
