import { MongoClient } from "mongodb";
const MONGO_URI =
  "mongodb://maulana1k:mongoapp123@ac-vws6pgy-shard-00-00.e57se0p.mongodb.net:27017,ac-vws6pgy-shard-00-01.e57se0p.mongodb.net:27017,ac-vws6pgy-shard-00-02.e57se0p.mongodb.net:27017/?ssl=true&replicaSet=atlas-oc7qo8-shard-0&authSource=admin&retryWrites=true&w=majority";

let db = null;

export async function connectToDb() {
  try {
    if (!MONGO_URI) {
      throw new Error("Env mongodb uri not defined");
    }
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const dbClient = client.db("honestycanteen");
    db = dbClient;
    return db;
  } catch (error) {
    console.log("db err:", err);
    return db;
  }
}

export async function getDB() {
  if (!db) {
    return await connectToDb();
  }
  return db;
}
