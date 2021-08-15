import User from '../models/User'

export const getUsers = async(req, res) => {
    const users = await User.find();
    res.json(users)
}

// export const createUser = async(req, res) => {

//     const { } = req.body;

    

// }