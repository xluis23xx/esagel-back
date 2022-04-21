import Role from '../models/Role'
import Document from '../models/Document'

export const createRoles = async() => {
    try {
        const count = await Role.estimatedDocumentCount()

        if (count>0) return;

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save()
        ])

        console.log(values);
    } catch (error) {
        console.error(values);
    }
}

export const createDocuments = async() => {
    try {
        const count = await Document.estimatedDocumentCount()

        if (count>0) return;

        const values = await Promise.all([
            new Document({name: 'DNI', operation: 'persona', status: 1 }).save(),
            new Document({name: 'RUC', operation: 'persona', status: 1}).save(),
            new Document({name: 'CIP', operation: 'persona', status: 1}).save(),
            new Document({name: 'Carnet Extranjeria', operation: 'persona', status: 1}).save(),
            new Document({name: 'Pasaporte', operation: 'persona', status: 1}).save(),
            new Document({name: 'CPP', operation: 'persona', status: 1}).save(),
            new Document({name: 'Boleta', operation: 'comprobante', status: 1}).save(),
            new Document({name: 'Factura', operation: 'comprobante', status: 1}).save(),
        ])

        console.log(values);
    } catch (error) {
        console.log(values);
    }
} 