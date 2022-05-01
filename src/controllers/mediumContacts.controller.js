import Contact from "../models/MediumContact";

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const createContact = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const newContact = new Contact({
      name,
      description,
      status,
    });

    const savedContact = await newContact.save();

    res.status(201).json({ status: 201, savedContact });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó la forma de contacto" });
  }
};

export const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.contactId);
  res.status(200).json(contact);
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
    res.status(200).json({ status: 200, updateContact });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó la forma de contacto" });
  }
};
