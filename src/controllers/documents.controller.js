import Document from "../models/Document"

export const getDocuments = async(req, res) => {
    const documents = await Document.find();
    res.json(documents)
}