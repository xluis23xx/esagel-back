import Position from "../models/Position"

export const getPositions = async(req, res) => {
    const positions = await Position.find();
    res.json(positions)
}

export const createPosition = async (req, res) => {
    const { 
        name,
        status
    } = req.body;

    const newPosition =  new Position({
        name,
        status
    })

    const savedPosition = await newPosition.save();

    res.status(201).json(savedPosition);
}

// export const getPositionById = async (req, res) => {
//     const document = await Document.findById(req.params.documentId);
//     res.status(200).json(document)
// }

// export const updateDocumentById = async (req, res) => {
//     const updateDocument = await Document.findByIdAndUpdate(req.params.documentId, req.body, {
//         new: true
//     })
//     res.status(200).json(updateDocument)
// }