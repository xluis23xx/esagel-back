import Document from "../models/Document"

export const getDocuments = async(req, res) => {
    const documents = await Document.find();
    res.json(documents)
}

export const createDocument = async (req, res) => {
    const { 
        name,
        operation,
        state
    } = req.body;

    const newDocument =  new Document({
        name,
        operation,
        state
    })

    const savedDocument = await newDocument.save();

    res.status(201).json(savedDocument);
}

export const getDocumentById = async (req, res) => {
    const document = await Document.findById(req.params.documentId);
    res.status(200).json(document)
}

export const updateDocumentById = async (req, res) => {
    const updateDocument = await Document.findByIdAndUpdate(req.params.documentId, req.body, {
        new: true
    })
    res.status(200).json(updateDocument)
}