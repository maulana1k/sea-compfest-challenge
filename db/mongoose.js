import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
let dbConnection = null;

export async function mongooseConnect() {
  if (!MONGO_URI) {
    console.log("mongo uri not defined");
    return;
  }
  await mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      dbConnection = db;
      console.log("db connected");
    })
    .catch((err) => console.log("db err", err));
  return dbConnection;
}

export async function getDb() {
  if (!dbConnection) {
    return await mongooseConnect();
  }
  return dbConnection;
}
