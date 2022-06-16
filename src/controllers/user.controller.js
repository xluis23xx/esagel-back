import User from "../models/User";
import Role from "../models/Role";
import Employee from "../models/Employee";
import { generatorPassword } from "../utils/randomGenerator";

export const getUsers = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    projection: { password: 0 },
    sort:{ username: "asc" },
    populate: [
      {
        path: "roles",
      },
      {
        path: "employee",
        populate: [
          {
            path: "documentType",
          },
          {
            path: "position",
          },
        ],
      },
    ],
  };
  const users = await User.paginate(
    {
      $or: [{ username: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );

  res.status(200).json({ status: 200, ...users });
};

export const createUser = async (req, res) => {
  try {
    const { username, password, status, roles, employee, image } = req.body;
    const foundEmployee = await Employee.findById(employee)
      .populate("documentType")
      .populate("position");
    if (!foundEmployee) {
      return res
        .status(400)
        .json({ status: 400, message: "Empleado no encontrado" });
    }

    const verifyPassword = password ? password : generatorPassword(8);
    const newUser = new User({
      username,
      password: await User.encryptPassword(verifyPassword),
      status,
      employee: foundEmployee,
      image,
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    await newUser.save();

    res.status(201).json({ status: 201, message: verifyPassword });
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

  res.status(200).json({ status: 200, doc: user });
};

export const updateUserById = async (req, res) => {
  // if (!req.body.password)
  //   return res
  //     .status(400)
  //     .json({ status: 400, message: "Contraseña no encontrada" });

  // req.body.password = await User.encryptPassword(req.body.password);
  const { roles } = req.body;

  try {
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      req.body.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      req.body.roles = [role._id];
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, doc: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el usuario" });
  }
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  await User.findOneAndDelete(userId);
  res.status(204).json();
};

export const generateNewUserPassword = async (req, res) => {
  try {
    const { _id } = req.body;
    const foundUser = await User.findById( _id);
    if (!foundUser) 
      return res
        .status(400)
        .json({ status: 400, message: "Usuario no encontrado" });
        
    const newPassword = generatorPassword(8);
    foundUser.password = await User.encryptPassword(newPassword);
    await foundUser.save();
    res.status(201).json({ status: 201, message: newPassword });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se creó la nueva contraseña" });
  }
};
