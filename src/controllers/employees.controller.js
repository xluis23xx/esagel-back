import Employee from "../models/Employee";
import Document from "../models/Document";
import Position from "../models/Position";
import { generateUTCToLimaDate } from "../utils/formats";

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      lastname,
      secondLastname,
      phoneNumber,
      personalEmail,
      corporateEmail,
      address,
      birthdate,
      image,
      position,
      documentNumber,
      documentType,
      status,
    } = req.body;
  
    const newEmployee = new Employee({
      name,
      lastname,
      secondLastname,
      phoneNumber,
      personalEmail,
      corporateEmail,
      address,
      birthdate,
      image,
      position,
      documentNumber,
      documentType,
      status: status ? status : 1,
      createdAt: generateUTCToLimaDate(),
      updatedAt: generateUTCToLimaDate()
    });
  
    const foundDocuments = await Document.find({ name: { $in: documentType } });
  
    if (!foundDocuments.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Tipo documento no encontrado" });
  
    newEmployee.documentType = foundDocuments[0];
  
    const foundPositions = await Position.find({ name: { $in: position } });
  
    if (!foundPositions.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Cargo no encontrado" });
  
    newEmployee.position = foundPositions[0];
  
    const savedEmployee = await newEmployee.save();
  
    res.status(201).json({ status: 201, doc: savedEmployee });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  } 
};

export const getEmployees = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc", lastname: "asc", secondLastname: "asc" },
    populate: ["documentType", "position"],
  };

  const employees = await Employee.paginate(
    {
      $or: [
        { name: { $regex: ".*" + filter + ".*", $options: "i" } },
        { lastname: { $regex: ".*" + filter + ".*", $options: "i" } },
        { secondLastname: { $regex: ".*" + filter + ".*", $options: "i" } },
        { documentNumber: { $regex: ".*" + filter + ".*", $options: "i" } },
      ],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...employees });
};

export const getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.employeeId)
    .populate("documentType")
    .populate("position");
  res.status(200).json({ status: 200, doc: employee });
};

export const updateEmployeeById = async (req, res) => {
  try {
    let updatedEmployee = null;
    if (req.body?.isDelete) {
      updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.employeeId,
        req.body,
        {
          new: true,
        }
      )
        .populate("documentType")
        .populate("position");
    } else {

      const foundDocuments = await Document.find({
        name: { $in: req.body.documentType },
      });

      if (!foundDocuments.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Tipo documento no encontrado" });

      req.body.documentType = foundDocuments[0];

      const foundPositions = await Position.find({
        name: { $in: req.body.position },
      });

      if (!foundPositions.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Cargo no encontrado" });

      req.body.position = foundPositions[0]._id;
      updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.employeeId,
        req.body,
        {
          new: true,
        }
      )
        .populate("documentType")
        .populate("position");
    }

    res.status(200).json({ status: 200, doc: updatedEmployee });
  } catch (error) {
    if (req.body?.isDelete) {
      res
        .status(400)
        .json({ status: 400, message: "No se eliminó el empleado" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "No se actualizó el empleado" });
    }
  }
};

export const deleteEmployeeById = async (req, res) => {
  const { employeeId } = req.params;
  await Employee.findOneAndDelete(employeeId);
  res.status(204).json();
};
