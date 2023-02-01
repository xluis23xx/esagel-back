import Position from "../models/Position";
import { generateUTCToLimaDate } from "../utils/formats";

export const getPositions = async (req, res) => {
  const limit = parseInt(req.query.limit || 100);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
  };
  // const positions = await Position.find().sort({ name: "asc" });
  const positions = await Position.paginate(
    {
      $or: [{ name: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...positions });
};

export const createPosition = async (req, res) => {
  try {
    const { name, status } = req.body;

    const newPosition = new Position({
      name,
      status,
      createdAt: generateUTCToLimaDate(),
      updatedAt: generateUTCToLimaDate()
    });

    const savedPosition = await newPosition.save();

    res.status(201).json({ status: 201, doc: savedPosition });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se creó el cargo" });
  }
};

// export const getPositionById = async (req, res) => {
//     const document = await Document.findById(req.params.documentId);
//     res.status(200).json(document)
// }

// export const updateDocumentById = async (req, res) => {
//     const updateDocument = await Document.findByIdAndUpdate(req.params.documentId, req.body, {
//         new: true
//     })
//     res.status(200).json(updateDocument)
// }
