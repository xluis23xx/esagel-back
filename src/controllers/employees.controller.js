import Employee from "../models/Employee"
import Document from "../models/Document"
import Position from "../models/Position"

export const createEmployee = async (req, res) => {
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
        status
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
        status: status ? status : 1
    })

    const foundDocuments = await Document.find({name: {$in: documentType}})

    if (!foundDocuments.length>0) return res.status(400).json({message: "Tipo documento no encontrado"})

    newEmployee.documentType = foundDocuments[0];

    const foundPositions = await Position.find({name: {$in: position}})

    if (!foundPositions.length>0) return res.status(400).json({message: "Cargo no encontrado"})

    newEmployee.position = foundPositions[0];

    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee)
}

export const getEmployees = async (req, res) => {
    const employees = await Employee.find().populate('document');
    res.json(employees)
}

export const getEmployeeById = async (req, res) => {
    const employee = await Employee.findById(req.params.employeeId).populate('document');
    res.status(200).json(employee)
}

export const updateEmployeeById = async (req, res) => {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.employeeId, req.body, {
        new: true
    })
    res.status(200).json(updatedEmployee)
}

export const deleteEmployeeById = async (req, res) => {
    const {employeeId} = req.params;
    await Employee.findOneAndDelete(employeeId)
    res.status(204).json()
}