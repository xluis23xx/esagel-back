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
            new Document({name: 'DNI'}).save(),
            new Document({name: 'RUC'}).save(),
            new Document({name: 'CIP'}).save(),
            new Document({name: 'Carnet Extranjeria'}).save(),
            new Document({name: 'Pasaporte'}).save(),
            new Document({name: 'CPP'}).save(),
        ])

        console.log(values);
    } catch (error) {
        console.log(values);
    }
} 