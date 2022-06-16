import LeadSource from "../models/LeadSource";

export const getLeadSources = async (req, res) => {
  const limit = parseInt(req.query.limit || 100);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
  };
  // const leadSources = await LeadSource.find().sort({ name: "asc" });
  const leadSources = await LeadSource.paginate(
    {
      $or: [{ name: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...leadSources });
};

export const createLeadSource = async (req, res) => {
  try {
    const { code, name, description, status } = req.body;

    const newLeadSource = new LeadSource({
      code,
      name,
      description,
      status,
    });

    const savedLeadSource = await newLeadSource.save();

    res.status(201).json({ status: 201, doc: savedLeadSource });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó el origen de prospecto" });
  }
};

export const getLeadSourceById = async (req, res) => {
  const leadSource = await LeadSource.findById(req.params.leadSourceId);
  res.status(200).json({ status: 200, doc: leadSource });
};

export const updateLeadSourceById = async (req, res) => {
  try {
    const updateLeadSource = await LeadSource.findByIdAndUpdate(
      req.params.leadSourceId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, doc: updateLeadSource });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el origen de prospecto" });
  }
};
