const User = require('../models/user')
const bcrypt = require("bcrypt");
const ErrorHandler = require('../features/utility-class')

const signUpUser = async(req,res,next) => {
    try {
        let user = await User.findOn({ email: req.body.email });
		if (user){
            //check stauts code
             return next(new ErrorHandler('User with given email already Exist!',401))
        }

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

        res.status(200).json({ message: 'User Created Successfully' })
    } catch (error) {
        next(error)
    }
}

const signInUser = () => {

}



module.exports = {
    signUpUser, signInUser
}