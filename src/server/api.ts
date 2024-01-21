import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import test from "dotenv";
test.config();

const router = express.Router();

const getPeopleFromMongoDb = async () => {
  const uri = process.env.MONGO_DB_URI;
  if (uri === undefined) {
    return [];
  }
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("ghostGuessers0");
    // Send a ping to confirm a successful connection
    await db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const people = db.collection("people");
    const query = { name: "Charlie Sheen" };
    const person = await people.findOne(query);
    console.log(person);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

// GET products list
router.get("/products", (req, res) => {
  console.log(`/api/products returned 0 product data`);

  async function run() {
    await getPeopleFromMongoDb();
  }
  run().catch(console.dir);

  res.status(200).json("cool");
});

export default router;
