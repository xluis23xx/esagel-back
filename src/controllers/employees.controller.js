import Employee from "../models/Employee"
import Document from "../models/Document"

export const createEmployee = async (req, res) => {
    const { 
        name, 
        lastname,
        mother_lastname,
        movil,
        email_personal,
        address, 
        birthdate,
        image,
        position,
        number_doc,
        document
    } = req.body;

    const newEmployee = new Employee({
        name, 
        lastname,
        mother_lastname,
        movil,
        email_personal,
        address, 
        birthdate,
        image,
        position,
        number_doc
    })

    const foundDocuments = await Document.find({name: {$in: document}})

    if (!foundDocuments.length>0) return res.status(400).json({message: "Document not found"})

    newEmployee.document = foundDocuments.map(document => document._id)

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