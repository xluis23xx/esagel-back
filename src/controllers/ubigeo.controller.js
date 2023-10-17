import Ubigeo from "../models/Ubigeo";

export const getUbigeo = async (req, res) => {

  const ubigeos = await Ubigeo.find();

  res.status(200).json({ status: 200, ...ubigeos });
};