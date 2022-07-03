import Student from "../../../models/Student";
import { getDb } from "../../../db/mongoose";
import Item from "../../../models/Item";
export default async (req, res) => {
  if (req.method != "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  try {
    const { id, password } = req.body;
    const student = await Student.findOne({ student_id: id });
    // console.log("std", student);
    if (!student) {
      res.status(400).json({ message: "Student not registered!" });
    } else {
      if (student.password !== password) {
        res.status(403).json({ message: "password incorrect!" });
        return;
      }
      res.status(200).json({ student });
    }
  } catch (error) {
    console.log(error);
  }
};
