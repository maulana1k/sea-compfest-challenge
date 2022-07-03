// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDb } from "../../db/mongoose";
// import { getDB } from "../../db/mongodb";
export default async function (req, res) {
  const db = await getDb();
  console.log("db:", db.connection.host);
  res.status(200).json({ greet: "Welcome to apps" });
}
