import Provider from "../models/Provider";
import Document from "../models/Document";

export const createProvider = async (req, res) => {
  const {
    businessName,
    contactName,
    phoneNumber,
    status,
    documentNumber,
    documentType,
  } = req.body;

  const newProvider = new Provider({
    businessName,
    contactName,
    phoneNumber,
    status,
    documentNumber,
  });

  const foundDocuments = await Document.find({ name: { $in: documentType } });

  if (!foundDocuments.length > 0)
    return res
      .status(400)
      .json({ status: 400, message: "Documento no encontrado" });

  newProvider.documentType = foundDocuments[0];

  const savedProvider = await newProvider.save();

  res.status(201).json({ status: 201, savedProvider });
};

export const getProviders = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { filter } = req.body;

  const options = {
    limit,
    page: page,
    populate: ["documentType", "position"],
  };

  const providers = await Provider.paginate(
    {
      $or: [
        { documentNumber: { $regex: '.*' + filter + '.*', $options: 'i' } },
        { businessName: { $regex: '.*' + filter + '.*', $options: 'i' } },
        { contactName: { $regex: '.*' + filter + '.*', $options: 'i' } }
      ],
    },
    options
  );
  res.status(200).json(providers);
  // const providers = await Provider.find().populate("documentType");
  // res.json(providers);
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.providerId).populate(
      "documentType"
    );
    res.status(200).json(provider);
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
    res.status(200).json({ status: 200, updatedProvider });
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
