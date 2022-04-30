import Position from "../models/Position"

export const getPositions = async(req, res) => {
    const positions = await Position.find();
    res.json(positions)
}

export const createPosition = async (req, res) => {
    try {
        const { 
            name,
            status
        } = req.body;
    
        const newPosition =  new Position({
            name,
            status
        })

        const savedPosition = await newPosition.save();

        res.status(201).json({status: 201, savedPosition});
    } catch (error) {
        res.status(400).json({status: 400, message: 'No se creó el cargo'});
    }
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