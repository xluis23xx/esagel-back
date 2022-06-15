import Document from "../models/Document";

export const getDocuments = async (req, res) => {
  const limit = parseInt(req.query.limit || 100);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
  };
  const documents = await Document.paginate(
    {
      $or: [{ name: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  // const documents = await Document.find().sort({ name: "asc" });;
  res.status(200).json({ status: 200, ...documents });
};

export const createDocument = async (req, res) => {
  try {
    const { name, operation, status, code, length } = req.body;

    const newDocument = new Document({
      name,
      operation,
      status,
      code: code ? code : "",
      sequential: 0,
      length: length ? length : 0,
    });

    const savedDocument = await newDocument.save();

    res.status(201).json({ status: 201, savedDocument });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se creó el documento" });
  }
};

export const getDocumentById = async (req, res) => {
  const document = await Document.findById(req.params.documentId);
  res.status(200).json({ status: 200, doc: document });
};

export const updateDocumentById = async (req, res) => {
  try {
    const updateDocument = await Document.findByIdAndUpdate(
      req.params.documentId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, updateDocument });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el documento" });
  }
};
