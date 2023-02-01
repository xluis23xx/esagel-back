import Center from "../models/Center";
import { generateUTCToLimaDate } from "../utils/formats";

export const getCenters = async (req, res) => {
  const limit = parseInt(req.query.limit || 100);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { branchName: "asc" },
  };
  const centers = await Center.paginate(
    {
      $or: [{ branchName: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...centers });
};

export const createCenter = async (req, res) => {
  try {
    const { branchName, address, status } = req.body;

    const newCenter = new Center({
      branchName,
      address,
      status: status ? status : 1,
      createdAt: generateUTCToLimaDate(),
      updatedAt: generateUTCToLimaDate()
    });

    const savedCenter = await newCenter.save();

    res.status(201).json({ status: 201, doc: savedCenter });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó el centro distribuidor" });
  }
};

export const getCenterById = async (req, res) => {
  const center = await Center.findById(req.params.centerId);
  res.status(200).json({ status: 200, doc: center });
};

export const updateCenterById = async (req, res) => {
  try {
    const updateCenter = await Center.findByIdAndUpdate(
      req.params.centerId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, doc: updateCenter });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el centro distribuidor" });
  }
};
