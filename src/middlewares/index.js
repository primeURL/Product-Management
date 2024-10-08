
const User = require('../models/User')
const ErrorHandler = require('../features/utility-class')

const adminOnly = async(req,res,next) => {
    try {
        const {adminId} = req.query
        const user = await User.findById(adminId)
        if(user.role === 'admin'){
            next()
        }else{
            return next(new ErrorHandler('Only Admin Can Access this Route',401))
        }
    } catch (error) {
        return next(error)
    }

}

const errorMiddleWare = (err,req,res,next) => {
    console.log(err.message)
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500

    // Custom Validation for Mongo Errors
    if(err.message.includes('duplicate key')){
        err.message = 'User with given email already Exist'
        err.statusCode = 409
    }
    return res.status(err.statusCode).json({
      message: err.message
    });
}

const missingRouteMiddleWare = (req,res,next) => {
    res.status(404).json({ message: 'Route not found'});
}

module.exports = {adminOnly,errorMiddleWare,missingRouteMiddleWare}