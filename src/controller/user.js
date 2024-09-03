const User = require('../models/User')
const bcrypt = require("bcrypt");
const ErrorHandler = require('../features/utility-class')

const signUpUser = async(req,res,next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
		if (user){
            //check stauts code
             return next(new ErrorHandler('User with given email already Exist!',401))
        }

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

        return res.status(200).json({ message: 'User Created Successfully' })
    } catch (error) {
        next(error)
    }
}

const signInUser = async(req,res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
		if (!user){
            return next(new ErrorHandler('Invalid Email or Password',401))
        }

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword){
            return next(new ErrorHandler('Invalid Email or Password',401))
        }
        return res.status(200).json({ message: 'User SignedIn Successfully' })

    } catch (error) {
        next(error)
    }
}



module.exports = {
    signUpUser, signInUser
}