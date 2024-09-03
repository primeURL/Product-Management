const mongoose = require('mongoose')

const connectDB = (uri) => {
    mongoose
      .connect(uri, {
        dbName: "Product_Management",
      })
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));
  };

  module.exports = connectDB
