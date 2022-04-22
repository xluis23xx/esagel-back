import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signUp = async (req, res) => {
    
    const { username, password, roles } = req.body;

    const newUser = new User({
        username,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    })

    res.status(200).json({token})
}

export const signIn = async (req, res) => {
    
    const userFound = await User.findOne({username: req.body.username}).populate("roles");

    if (!userFound) return res.status(400).json({message: "Usuario no encontrado"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({token: null, message: "Contraseña Inválida"})

    const user = await User.find({username: userFound.username}, { password: 0 }).populate("roles").populate(
        { 
            path: 'employee', 
            populate: [
                {
                    path: 'documentType'
                },
                {
                    path: 'position'
                } 
            ]
        }
    )

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({user, token})

}