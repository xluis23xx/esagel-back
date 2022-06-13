import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

let refreshToken = "";

export const signUp = async (req, res) => {
  const { username, password, roles } = req.body;

  const newUser = new User({
    username,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, //24 horas
  });

  res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  const userFound = await User.findOne({
    username: req.body.username,
  }).populate("roles");

  if (!userFound)
    return res
      .status(400)
      .json({ status: 400, message: "Usuario no encontrado" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ status: 400, message: "Contraseña Inválida" });

  if (!userFound.status)
    return res
      .status(401)
      .json({ status: 400, message: "Usuario deshabilitado" });

  const user = await User.findOne(
    { username: userFound.username },
    { password: 0 }
  )
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

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  refreshToken = jwt.sign({ id: userFound._id }, config.REFRESH_SECRET, {
    expiresIn: 86400, //24 horas
  });

  res.json({ status: 200, user, token, refreshToken });
};

export const renewToken = async (req, res) => {
  const recycleToken = req.headers["x-access-token"];

  if (!recycleToken) {
    res.status(401).json({
      errors: [
        {
          message: "Token no encontrado",
        },
      ],
    });
  }

  if (!refreshToken) {
    res.status(403).json({
      errors: [
        {
          message: "Renovación de token inválido",
        },
      ],
    });
  }

  try {
    const user = jwt.verify(recycleToken, config.REFRESH_SECRET);
    const { id } = user;
    const accessToken = jwt.sign({ id: id }, config.SECRET, {
      expiresIn: 86400,
    });

    refreshToken = jwt.sign({ id: id }, config.REFRESH_SECRET, {
      expiresIn: 86400, //24 horas
    });

    res.json({ status: 200, accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ status: 400, message: "Token inválido" });
  }
};
