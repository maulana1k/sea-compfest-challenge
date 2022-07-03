import { Schema, model, models } from "mongoose";
const StudentSchema = new Schema({
  student_id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
// let Student;
// try {
let Student = models.students || model("students", StudentSchema);
// } catch (error) {
//   Student = model("Students", StudentSchema);
// }
export default Student;
