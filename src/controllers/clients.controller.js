import Client from "../models/Client";
import Leadsource from "../models/LeadSource";
import StatusProspect from "../models/StatusProspect";
import Contact from "../models/MediumContact";
import Document from "../models/Document";

export const createClient = async (req, res) => {
  try {
    const {
      name,
      lastname,
      secondLastname,
      email,
      phoneNumber,
      address,
      documentNumber,
      birthdate,
      documentType,
      department,
      leadSource,
      prospectStatus,
      contactForm,
      profession,
      business,
      status,
    } = req.body;

    const newClient = new Client({
      name,
      lastname,
      secondLastname,
      email,
      phoneNumber,
      address,
      documentNumber,
      birthdate,
      documentType,
      department,
      leadSource,
      prospectStatus,
      contactForm,
      profession,
      business,
      status: status ? status : 1,
    });

    const foundDocuments = await Document.find({ name: { $in: documentType } });

    if (!foundDocuments.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Tipo documento no encontrado" });

    newClient.documentType = foundDocuments[0];

    const foundLeadSources = await Leadsource.find({
      name: { $in: leadSource },
    });

    if (!foundLeadSources.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Origen de prospecto no encontrado" });

    newClient.leadSource = foundLeadSources[0];

    const foundStatusProspects = await StatusProspect.find({
      name: { $in: prospectStatus },
    });

    if (!foundStatusProspects.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Estado de prospecto no encontrado" });

    newClient.prospectStatus = foundStatusProspects[0];

    const foundMediumContacts = await Contact.find({
      name: { $in: contactForm },
    });

    if (!foundMediumContacts.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Forma de contacto no encontrado" });

    newClient.contactForm = foundMediumContacts[0];

    const savedClient = await newClient.save();

    res.status(201).json({ status: 201, savedClient });
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: "No se registró el cliente" });
  }
};

export const getClients = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSise || 1);
  const { filter } = req.body;
  const options = {
    limit,
    page: page,
    projection: { password: 0 },
    options: {
      populate: [
        {
          path: "documentType",
        },
        {
          path: "leadSource",
        },
        {
          path: "prospectStatus",
        },
        {
          path: "contactForm",
        },
      ],
    },
  };
  const clients = await clients.paginate(
    {
      $or: [
        { name: filter },
        { lastname: filter },
        { secondLastname: filter },
        { documentNumber: filter },
      ],
    },
    options
  );
  // const clients = await Client.find()
  //   .populate("documentType")
  //   .populate("leadSource")
  //   .populate("prospectStatus")
  //   .populate("contactForm");
  res.status(200).json(clients);
};

export const getClientById = async (req, res) => {
  const client = await Client.findById(req.params.clientId)
    .populate("documentType")
    .populate("leadSource")
    .populate("prospectStatus")
    .populate("contactForm");
  res.status(200).json(client);
};

export const updateClientById = async (req, res) => {
  try {
    let updatedClient = null;
    if (req.body?.isDelete) {
      updatedClient = await Client.findByIdAndUpdate(
        req.params.clientId,
        req.body,
        {
          new: true,
        }
      )
        .populate("documentType")
        .populate("leadSource")
        .populate("prospectStatus")
        .populate("contactForm");
    } else {
      const foundLeadSources = await Leadsource.find({
        name: { $in: req.body.leadSource },
      });

      if (!foundLeadSources.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Origen de prospecto no encontrado" });

      req.body.leadSource = foundLeadSources[0]._id;

      const foundStatusProspects = await StatusProspect.find({
        name: { $in: req.body.prospectStatus },
      });

      if (!foundStatusProspects.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Estado de prospecto no encontrado" });

      req.body.prospectStatus = foundStatusProspects[0]._id;

      const foundMediumContacts = await Contact.find({
        name: { $in: req.body.contactForm },
      });

      if (!foundMediumContacts.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Estado de prospecto no encontrado" });

      req.body.contactForm = foundMediumContacts[0]._id;

      updatedClient = await Client.findByIdAndUpdate(
        req.params.clientId,
        req.body,
        {
          new: true,
        }
      )
        .populate("documentType")
        .populate("leadSource")
        .populate("prospectStatus")
        .populate("contactForm");
    }

    res.status(200).json({ status: 200, updatedClient });
  } catch (error) {
    if (req.body?.isDelete) {
      res
        .status(400)
        .json({ status: 400, message: "No se eliminó el cliente" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "No se actualizó el cliente" });
    }
  }
};

export const deleteClientById = async (req, res) => {
  const { clientId } = req.params;
  await Client.findOneAndDelete(clientId);
  res.status(204).json();
};
