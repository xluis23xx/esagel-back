import StatusProspect from "../models/StatusProspect";

export const getStatusProspects = async (req, res) => {
  const statusProspects = await StatusProspect.find().sort({ name: "asc" });;
  res.status(200).json({ status: 200, statusProspects });
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
  res.status(200).json({ status: 200, statusProspect });
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
