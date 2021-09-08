import Provider from "../models/Provider"
import Document from "../models/Document"

export const createProvider = async (req, res) => {
    console.log("req.body", req.body)
    const {
        name,
        movil,
        number_doc,
        document
    } = req.body;

    const newProvider = new Provider({
        name,
        movil,
        number_doc
    })

    const foundDocuments = await Document.find({name: {$in: document}})

    console.log("document",foundDocuments)

    if (!foundDocuments.length>0) return res.status(400).json({message: "Document not found"})

    newProvider.document = foundDocuments.map(document => document._id)

    const savedProvider = await newProvider.save();

    res.status(201).json(savedProvider)
}

export const getProviders = async (req, res) => {
    const providers = await Provider.find().populate('document');
    res.json(providers)
}

export const getProviderById = async (req, res) => {
    const provider = await Provider.findById(req.params.providerId).populate('document');
    res.status(200).json(provider)
}

export const updateProviderById = async (req, res) => {
    const updatedprovider = await Provider.findByIdAndUpdate(req.params.providerId, req.body, {
        new: true
    })
    res.status(200).json(updatedprovider)
}

export const deleteProviderById = async (req, res) => {
    const {providerId} = req.params;
    await Provider.findOneAndDelete(providerId)
    res.status(204).json()
}