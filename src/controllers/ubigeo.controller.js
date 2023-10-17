import Ubigeo from "../models/Ubigeo";

export const getUbigeo = async (req, res) => {
//   const limit = parseInt(req.query.limit || 100);
//   const page = parseInt(req.query.pageSize || 1);
//   const { filter, status } = req.body;
//   const options = {
//     limit,
//     page: page,
//     sort: { name: "asc" },
//   };
  const ubigeos = await Ubigeo.paginate();
  // const documents = await Document.find().sort({ name: "asc" });;
  res.status(200).json({ status: 200, ...ubigeos });
};