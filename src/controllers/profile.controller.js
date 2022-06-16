import Employee from "../models/Employee";
import User from "../models/User";

export const updateProfileById = async (req, res) => {
  try {
    let updatedProfile = null;
    if (req.body.isDelete) {
      updatedProfile = await User.findByIdAndUpdate(
        req.params.employeeId,
        req.body,
        {
          new: true,
        }
      );
    } else {
      updatedProfile = await Employee.findByIdAndUpdate(
        req.params.employeeId,
        req.body,
        {
          new: true,
        }
      );
    }
    res.status(200).json({
      status: 200,
      doc: updatedProfile,
      message: "Perfil actualizado con éxito",
    });
  } catch (error) {
    if (req.body.isDelete) {
      res
        .status(400)
        .json({ status: 400, message: "No se pudo deshabilitar su cuenta" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "No se actualizó el perfil" });
    }
  }
};

export const getProfileById = async (req, res) => {
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

export const updatePasswordProfileById = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const userFound = await User.findOne({
    _id: { $in: req.params.userId },
  });

  if (!userFound)
    return res
      .status(400)
      .json({ status: 400, message: "Usuario no encontrado" });
  const matchPassword = await User.comparePassword(
    oldPassword,
    userFound.password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ status: 400, message: "Contraseña antigua inválida" });

  userFound.password = await User.encryptPassword(newPassword);
  await userFound.save();
  res
    .status(200)
    .json({ status: 200, message: "Contraseña actualizada con éxito" });
};
