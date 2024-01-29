import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import test from "dotenv";
import { Person } from "../types/person";
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

    const peopleCollection = db.collection("people");
    const people = await peopleCollection.find({});
    const parsedPeople = await people.toArray();

    return parsedPeople;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const addPersonToMongoDb = async (person: Person) => {
  const uri = process.env.MONGO_DB_URI;
  if (uri === undefined) {
    return;
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

    const peopleCollection = db.collection("people");
    await peopleCollection.insertOne(person);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

// GET people list
router.get("/people", async (req, res) => {
  const run = async () => {
    const people = await getPeopleFromMongoDb();
    res.json(people);
  };
  return await run().catch(console.dir);
});

router.post("/person", async (req, res) => {
  if (req.body) {
    await addPersonToMongoDb(req.body);
  }
  console.log("added person");
  res.status(200).json();
});

export default router;
