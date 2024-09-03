

const errorMiddleWare = (err,req,res,next) => {
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500

    if(err.name === "CastError") err.message = "Invalid Id"
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  module.exports = errorMiddleWare