const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter Name"],
      },
      email: {
        type: String,
        unique: [true, "Email already Exist"],
        required: [true, "Please enter Email"]
      },
      password : {
        type : String,
        required: [true, "Please enter Password"],
      },
      role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
      }
    },
    {
      timestamps: true,
    }
  );

const User = mongoose.model("user", userSchema);

module.exports = User
