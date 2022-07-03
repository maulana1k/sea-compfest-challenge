import Student from "../../../models/Student";

export default async (req, res) => {
  if (req.method != "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  try {
    const { id, username, password } = req.body;
    const exist = await Student.findOne({ student_id: id });
    if (exist) {
      res.status(400).json({ message: "Student has been registered" });
      return;
    }
    const student = new Student({
      student_id: id,
      username,
      password,
    });
    const saved = await student.save();
    return res.status(200).json({ student: saved });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
