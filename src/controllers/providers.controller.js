import Provider from "../models/Provider";
import Document from "../models/Document";
import { generateUTCToLimaDate } from "../utils/formats";

export const createProvider = async (req, res) => {
  const {
    businessName,
    contactName,
    phoneNumber,
    status,
    documentNumber,
    description,
    documentType,
  } = req.body;

  const newProvider = new Provider({
    businessName,
    contactName,
    phoneNumber,
    status,
    documentNumber,
    description,
    createdAt: generateUTCToLimaDate(),
    updatedAt: generateUTCToLimaDate()
  });

  const foundDocuments = await Document.find({ name: { $in: documentType } });

  if (!foundDocuments.length > 0)
    return res
      .status(400)
      .json({ status: 400, message: "Documento no encontrado" });

  newProvider.documentType = foundDocuments[0];

  const savedProvider = await newProvider.save();

  res.status(201).json({ status: 201, doc: savedProvider });
};

export const getProviders = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;

  const options = {
    limit,
    page: page,
    sort: { businessName: "asc" },
    populate: ["documentType", "position"],
  };

  const providers = await Provider.paginate(
    {
      $or: [
        { documentNumber: { $regex: ".*" + filter + ".*", $options: "i" } },
        { businessName: { $regex: ".*" + filter + ".*", $options: "i" } },
        { contactName: { $regex: ".*" + filter + ".*", $options: "i" } },
      ],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...providers });
  // const providers = await Provider.find().populate("documentType");
  // res.json(providers);
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.providerId).populate(
      "documentType"
    );
    res.status(200).json({ status: 200, doc: provider });
  } catch (error) {
    res.status(400).json({ message: "Proveedor no encontrado" });
  }
};

export const updateProviderById = async (req, res) => {
  try {
    const updatedProvider = await Provider.findByIdAndUpdate(
      req.params.providerId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, doc: updatedProvider });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el proveedor" });
  }
};

// export const deleteProviderById = async (req, res) => {
//     const {providerId} = req.params;
//     await Provider.findOneAndDelete(providerId)
//     res.status(204).json()
// }
