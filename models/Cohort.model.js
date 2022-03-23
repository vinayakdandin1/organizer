const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const cohortSchema = new Schema(
  {
    name: String,
    startDate: Date,
    students: {
        type: [mongoose.Types.ObjectId]
    }
  }
);

const Cohort = model("Cohort", cohortSchema);

module.exports = Cohort;