const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const studentSchema = new Schema(
  {
    name: String,
    flag: String 
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;