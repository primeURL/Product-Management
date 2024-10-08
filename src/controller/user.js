const User = require('../models/User')
const bcrypt = require('bcrypt');
const ErrorHandler = require('../features/utility-class')

const signUpAdmin = async(req,res,next) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return next(new ErrorHandler('Please add all Fileds',400))
        }
        let admin = await User.find({role : 'admin'});
		if(admin.length){
             return next(new ErrorHandler('Admin has already created. Only One Admin Allowed.',409))
        }
        const hashPassword = await bcrypt.hash(req.body.password,10);
		admin = await new User({ ...req.body, password: hashPassword, role : 'admin' }).save();

        return res.status(200).json({ message: 'Admin Created Successfully' , admin})
    } catch (error) {
        next(error)
    }
}

const signUpUser = async(req,res,next) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return next(new ErrorHandler('Please add all Fileds',400))
        }
        if(req.body.role === 'admin'){
            return next(new ErrorHandler('User can not have admin role',409))
        }
        const hashPassword = await bcrypt.hash(req.body.password,10);
		user = await new User({ ...req.body, password: hashPassword }).save();

        return res.status(200).json({ message: 'User Created Successfully' ,user})
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
        return res.status(200).json({ message: 'User SignedIn Successfully', user})

    } catch (error) {
        next(error)
    }
}

const updateUser = async(req,res,next) => {
    try {
        const {userId} = req.params
        const {name,email,password,role} = req.body
        const user = await User.findById(userId)

        if(!user){
            return next(new ErrorHandler('Invalid User Id',400))
        }
        if(name) user.name = name
        if(email) user.email = email
        if(role) user.role = role
        if(password){
		    const hashPassword = await bcrypt.hash(password,10);
            user.password = hashPassword
        }
        await user.save()
        return res.status(200).json({message : 'User Updated Successfully By Admin'})
		
    } catch (error) {
        next(error)
    }
}

const deleteUser = async(req,res,next) => {
    try {
        const {userId} = req.params
        const user = await User.findById(userId)
        if(!user){
            return next(new ErrorHandler('Invalid User Id',400))
        }
        await user.deleteOne()
        return res.status(200).json({
            message : 'User Deleted Successfully By Admin'
        })
    } catch (error) {
        return next(error)
    }
}

// This is test route
const getAllUser = async(req,res,next) =>{
    try {
        const user = await User.find({});
		return res.status(200).json({user })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signUpUser, signInUser, signUpAdmin, updateUser, deleteUser,getAllUser
}