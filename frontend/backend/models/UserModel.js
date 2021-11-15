const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img : {
      data: Buffer
    },
    name:{
      type : String,
    },
    dob:{
      type: String
    },
    religion: {
      type : String,
    },
    height: {
      type: String
    }

  },
  { timestamps: true }
)

module.exports = mongoose.model("users", userSchema);