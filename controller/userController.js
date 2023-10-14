const { StatusCodes } = require('http-status-codes')
const User = require('../model/userModel')


// get all
const getAllUser = async (req,res) => {
    try {
        let users = await User.find({})

        res.status(StatusCodes.OK).json({ length: users.length, users })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
    }
}


// get single
const getSingleUser = async (req,res) => {
    try {
        let id = req.params.id

        let extUser = await User.findById({_id: id })
            if(!extUser) 
               return res.status(StatusCodes.NOT_FOUND).json({ msg: `Requested id not found` })
             
            res.status(StatusCodes.OK).json({ user: extUser })
    } catch (err) {
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
    }
}


// post
const createUser = async (req,res) => {
    try {
        const { email, mobile } = req.body
 
        let extEmail = await User.findOne({ email })
            if(extEmail)
                return res.status(StatusCodes.CONFLICT).json({ msg: `${email} id already exists. `})
      
        let extMobile = await User.findOne({ mobile })
            if(extMobile)
            return res.status(StatusCodes.CONFLICT).json({ msg: `${mobile} number already exists. `})

        let newUser = await User.create(req.body)

        res.status(StatusCodes.OK).json({ msg: "New User created successfully", user: newUser })    
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
    }
}


// put / patch
const updateUser = async (req,res) => {
    try {
        let id = req.params.id

        let extUser = await User.findOne({ _id: id })
        if(!extUser)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `user id not found`})

            const { email, mobile } = req.body
 
            let extEmail = await User.findOne({ email })
                if(extEmail)
                    return res.status(StatusCodes.CONFLICT).json({ msg: `${email} id already exists. `})
          
            let extMobile = await User.findOne({ mobile })
                if(extMobile)
                return res.status(StatusCodes.CONFLICT).json({ msg: `${mobile} number already exists. `})

            await User.findByIdAndUpdate({ _id: id}, req.body)

        res.status(StatusCodes.OK).json({ msg: "User updated Successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
    }
}


// delete 
const deleteUser = async (req,res) => {
    try {
        let id = req.params.id

        let extUser = await User.findById({ _id: id })
            if(!extUser)
                return res.status(StatusCodes.NOT_FOUND).json({ msg:`Requested id not found`})
        
        await User.findByIdAndDelete({ _id: id})

        res.status(StatusCodes.OK).json({ msg: "User deleted Successfully "})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
    }
}

module.exports = {  getAllUser, getSingleUser, createUser, updateUser, deleteUser }