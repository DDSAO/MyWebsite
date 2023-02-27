const { MongoClient } = require("mongodb");

const init = async () => {
  const client = new MongoClient("mongodb://localhost:27017");
};

init();
