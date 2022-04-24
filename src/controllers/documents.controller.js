import Document from "../models/Document"

export const getDocuments = async(req, res) => {
    const documents = await Document.find();
    res.json(documents)
}

export const createDocument = async (req, res) => {
    try {
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
    
        res.status(201).json({status: 201, savedDocument});
    } catch (error) {
        res.status(400).json({message: 'No se creó el documento'});
    }  
}

export const getDocumentById = async (req, res) => {
    const document = await Document.findById(req.params.documentId);
    res.status(200).json(document)
}

export const updateDocumentById = async (req, res) => {
    try {
        const updateDocument = await Document.findByIdAndUpdate(req.params.documentId, req.body, {
            new: true
        })
        res.status(200).json({status: 200, updateDocument})
    } catch (error) {
        res.status(400).json({message: 'No se actualizó el documento'});
    }
}