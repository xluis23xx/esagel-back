import Role from "../models/Role";
import Document from "../models/Document";
import Setting from "../models/Setting";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createDocuments = async () => {
  try {
    const count = await Document.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Document({ name: "DNI", operation: "persona", status: 1 }).save(),
      new Document({ name: "RUC", operation: "persona", status: 1 }).save(),
      new Document({ name: "CIP", operation: "persona", status: 1 }).save(),
      new Document({
        name: "Carnet Extranjeria",
        operation: "persona",
        status: 1,
      }).save(),
      new Document({
        name: "Pasaporte",
        operation: "persona",
        status: 1,
      }).save(),
      new Document({ name: "CPP", operation: "persona", status: 1 }).save(),
      new Document({
        name: "Boleta",
        operation: "comprobante",
        status: 1,
      }).save(),
      new Document({
        name: "Factura",
        operation: "comprobante",
        status: 1,
      }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

export const createSetting = async () => {
  try {
    const count = await Setting.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Setting({
        companyName: "ESAGEL",
        description: "Esagel Trujillo",
        businessName: "ESAGEL S.A.C",
        ruc: "12345678911",
        url: "https://www.facebook.com/groups/grupoesagel",
        logo: "https://firebasestorage.googleapis.com/v0/b/restaurant-app-6a09d.appspot.com/o/saegel%2Fesagel.png?alt=media&token=04d99e71-7eea-4876-8a44-6d1a4dc4f330",
        tax: 0.18,
      }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
