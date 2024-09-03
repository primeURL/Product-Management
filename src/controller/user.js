const User = require('../models/user')


const signUpUser = async(req,res,next) => {

    try {
        console.log(req.body)
        const user = await User.create(req.body)
        user.save()
        res.status(200).json({
            message : 'User Created Successfully'
        })
    } catch (error) {
        
    }

}

const signInUser = () => {

}



module.exports = {
    signUpUser, signInUser
}