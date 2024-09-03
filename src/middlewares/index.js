
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


module.exports = {adminOnly}