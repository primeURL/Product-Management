const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Please enter Product Name'],
      },
      category: {
        type: String,
      },
      price : {
        type : String,
      },
      isDisplayed : {
        type : Boolean,
        default : false
      }
    },
    {
      timestamps: true,
    }
  );

const Product = mongoose.model("product", productSchema);

module.exports = Product
