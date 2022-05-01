import User from "../models/User";
import Role from "../models/Role";
// import Employee from '../models/Employee'

export const getUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 })
    .populate("roles")
    .populate({
      path: "employee",
      populate: [
        {
          path: "documentType",
        },
        {
          path: "position",
        },
      ],
    });

  res.json(users);
};

export const createUser = async (req, res) => {
  try {
    const { username, password, status, roles, employee, image } = req.body;

    const newUser = new User({
      username,
      password: await User.encryptPassword(password),
      status,
      employee,
      image,
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      console.log("Retornar respuesta error");
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    res.status(201).json({ status: 201, message: password });
  } catch (error) {
    res.status(400).json({ status: 400, message: "Usuario no creado" });
  }
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId, { password: 0 })
    .populate("roles")
    .populate({
      path: "employee",
      populate: [
        {
          path: "documentType",
        },
        {
          path: "position",
        },
      ],
    });
  res.status(200).json(user);
};

export const updateUserById = async (req, res) => {
  if (!req.body.password)
    return res
      .status(400)
      .json({ status: 400, message: "Contraseña no encontrada" });

  req.body.password = await User.encryptPassword(req.body.password);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({ status: 200, updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el usuario" });
  }
};

export const deleteUserById = async (req, res) => {
  console.log("req.params", req.params);
  const { userId } = req.params;
  await User.findOneAndDelete(userId);
  res.status(204).json();
};
