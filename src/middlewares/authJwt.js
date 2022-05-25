import jwt from "jsonwebtoken"
import config from '../config'
import Role from "../models/Role";
import User from "../models/User";

export const verifyToken = async (req,res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({message: "Se requiere token"})

        const decoded = jwt.verify(token,config.SECRET)
        //propiedad nueva
        req.userId = decoded.id

        const user = await User.findById(req.userId, {password: 0})
        if (!user) return res.status(404).json({message: "Usuario no encontrado"})

        next()
    } catch (error) {
       return res.status(401).json({message: "No autorizado"})
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: user.roles})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return; 
        }
    }
    
    return res.status(403).json({message: "Rol de moderador requerido"})
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: user.roles})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" || roles[i].name === "moderator") {
            next();
            return; 
        }
    }
    
    return res.status(403).json({message: "Rol de administrador requerido"})
}

export const isUser = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: user.roles})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user" || roles[i].name === "admin" || roles[i].name === "moderator") {
            next();
            return; 
        }
    }
    
    return res.status(403).json({message: "Rol de usuario requerido"})
}