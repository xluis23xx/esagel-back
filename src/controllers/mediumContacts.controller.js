import Contact from "../models/MediumContact";
import { generateUTCToLimaDate } from "../utils/formats";

export const getContacts = async (req, res) => {
  const limit = parseInt(req.query.limit || 100);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
  };
  // const contacts = await Contact.find().sort({ name: "asc" });
  const contacts = await Contact.paginate(
    {
      $or: [{ name: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...contacts });
};

export const createContact = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const newContact = new Contact({
      name,
      description,
      status,
      createdAt: generateUTCToLimaDate(),
      updatedAt: generateUTCToLimaDate()
    });

    const savedContact = await newContact.save();

    res.status(201).json({ status: 201, doc: savedContact });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó la forma de contacto" });
  }
};

export const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.contactId);
  res.status(200).json({ status: 200, doc: contact });
};

export const updateContactById = async (req, res) => {
  try {
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, doc: updateContact });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó la forma de contacto" });
  }
};
