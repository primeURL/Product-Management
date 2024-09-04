const mongoose = require('mongoose')

const connectDB = async (uri) => {
    try {
      const result = await mongoose.connect(uri, {dbName: "Product_Management"})
      console.log(`DB Connected to MongoDB${result.connection.host}`)
    } catch (error) {
      console.log(error)
    }
};

  module.exports = connectDB
