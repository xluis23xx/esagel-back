import StatusProspect from "../models/StatusProspect";

export const getStatusProspects = async (req, res) => {
  const limit = parseInt(req.query.limit || 100);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
  };
  // const statusProspects = await StatusProspect.find().sort({ name: "asc" });
  const statusProspects = await StatusProspect.paginate(
    {
      $or: [{ name: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...statusProspects });
};

export const createStatusProspect = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const newStatusProspect = new StatusProspect({
      name,
      description,
      status,
    });

    const savedStatusProspect = await newStatusProspect.save();

    res.status(201).json({ status: 201, savedStatusProspect });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó el estado de prospecto" });
  }
};

export const getStatusProspectById = async (req, res) => {
  const statusProspect = await StatusProspect.findById(
    req.params.statusProspectId
  );
  res.status(200).json({ status: 200, doc: statusProspect });
};

export const updateStatusProspectById = async (req, res) => {
  try {
    const updateStatusProspect = await StatusProspect.findByIdAndUpdate(
      req.params.statusProspectId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, updateStatusProspect });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el estado de prospecto" });
  }
};
