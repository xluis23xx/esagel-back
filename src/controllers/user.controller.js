import User from '../models/User'
import Role from '../models/Role'
import Employee from '../models/Employee'

export const getUsers = async(req, res) => {
    const users = await User.find()
    // .populate('roles').populate(
    //     { 
    //         path: 'employee', 
    //         populate: {
    //             path: 'document'
    //         } 
    //     }
    // )
    res.json(users)
}

export const createUser = async(req, res) => {

    const { email, password, state, roles, employee } = req.body;

    const newUser = new User({
        email,
        password: await User.encryptPassword(password),
        state,
        employee
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    // const foundEmployee = await Employee.findOne({number_doc: employee})

    // console.log("foundEmployeeSDFDSFDSF",foundEmployee)

    // if (!foundEmployee) return res.status(400).json({message: "Employee not found"})

    // newUser.employee = foundEmployee._id

    const savedUser = await newUser.save();

    res.status(201).json(savedUser)
}

export const getUserById = async(req, res) => {
    const user = await User.findById(req.params.userId)
    // .populate('roles').populate(
    //     {
    //         path: 'employee',
    //         populate: {
    //             path: 'document'
    //         }
    //     }
    // )
    res.status(200).json(user)
}

export const updateUserById = async (req, res) => {
    
    if (!req.body.password) return res.status(400).json({message: "Password not entered"})
    
    req.body.password = await User.encryptPassword(req.body.password)

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })
    // .populate('roles').populate(
    //     {
    //         path: 'employee',
    //         populate: {
    //             path: 'document'
    //         }
    //     }
    // )
    res.status(200).json(updatedUser)
}

export const deleteUserById = async (req, res) => {
    console.log("req.params",req.params)
    const {userId} = req.params
    await User.findOneAndDelete(userId)
    res.status(204).json()
}