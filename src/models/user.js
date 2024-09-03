const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter Name"],
      },
      email: {
        type: String,
        unique: [true, "Email already Exist"],
        required: [true, "Please enter Email"],
        validate: validator.default.isEmail,
      },
      password : {
        type : String,
        required: [true, "Please enter Password"],
      },
      isAdmin : {
        type : Boolean,
        default : false
      }
    },
    {
      timestamps: true,
    }
  );

const User = mongoose.model("user", userSchema);

module.exports = User
