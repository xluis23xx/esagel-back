import Role from "../models/Role";
import Document from "../models/Document";
import Setting from "../models/Setting";
import Ubigeo from "../models/Ubigeo";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user", priority: 3 }).save(),
      new Role({ name: "moderator", priority: 1 }).save(),
      new Role({ name: "admin", priority: 2 }).save(),
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
      new Document({ name: "DNI", operation: "persona", status: 1, code: 'DNI', sequential: null, length: null }).save(),
      new Document({ name: "RUC", operation: "persona", status: 1, code: 'RUC', sequential: null, length: null }).save(),
      new Document({ name: "CIP", operation: "persona", status: 1, code: 'CIP', sequential: null, length: null }).save(),
      new Document({
        name: "Carnet Extranjeria",
        operation: "persona",
        status: 1,
        code: 'Carnet Extranjeria', 
        sequential: null, 
        length: null
      }).save(),
      new Document({
        name: "Pasaporte",
        operation: "persona",
        status: 1,
        code: 'Pasaporte', 
        sequential: null, 
        length: null
      }).save(),
      new Document({ 
        name: "CPP", 
        operation: "persona", 
        status: 1,
        code: 'CPP', 
        sequential: null, 
        length: null
      }).save(),
      new Document({
        name: "Boleta",
        operation: "comprobante",
        status: 1,
        code: 'B001', 
        sequential: 0, 
        length: 8
      }).save(),
      new Document({
        name: "Factura",
        operation: "comprobante",
        status: 1,
        code: 'F001', 
        sequential: 0, 
        length: 8
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
        manual:'https://firebasestorage.googleapis.com/v0/b/restaurant-app-6a09d.appspot.com/o/manual%2FSOLICITUD%20VISA.pdf?alt=media&token=e20e5a50-5ecc-4036-8b9b-a5e05ad10aa8'
      }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

export const createUbigeos = async () => {
  try {
    const count = await Ubigeo.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Ubigeo({ code: "010109", name: "AMAZONAS" }).save(),
      new Ubigeo({ code: "020108", name: "ANCASH" }).save(),
      new Ubigeo({ code: "030106", name: "APURIMAC" }).save(),
      new Ubigeo({ code: "040106", name: "AREQUIPA" }).save(),
      new Ubigeo({ code: "050105", name: "AYACUCHO" }).save(),
      new Ubigeo({ code: "060109", name: "CAJAMARCA" }).save(),
      new Ubigeo({ code: "080207", name: "CUSCO" }).save(),
      new Ubigeo({ code: "90106", name: "HUANCAVELICA" }).save(),
      new Ubigeo({ code: "100105", name: "HUANUCO" }).save(),
      new Ubigeo({ code: "110107", name: "ICA" }).save(),
      new Ubigeo({ code: "120126", name: "JUNIN" }).save(),
      new Ubigeo({ code: "130203", name: "LA LIBERTAD" }).save(),
      new Ubigeo({ code: "140119", name: "LAMBAYEQUE" }).save(),
      new Ubigeo({ code: "150403", name: "LIMA" }).save(),
      new Ubigeo({ code: "160206", name: "LORETO" }).save(),
      new Ubigeo({ code: "170102", name: "MADRE DE DIOS" }).save(),
      new Ubigeo({ code: "180201", name: "MOQUEGUA" }).save(),
      new Ubigeo({ code: "190102", name: "PASCO" }).save(),
      new Ubigeo({ code: "200301", name: "PIURA" }).save(),
      new Ubigeo({ code: "210303", name: "PUNO" }).save(),
      new Ubigeo({ code: "220102", name: "SAN MARTIN" }).save(),
      new Ubigeo({ code: "230201", name: "TACNA" }).save(),
      new Ubigeo({ code: "240203", name: "TUMBES" }).save(),
      new Ubigeo({ code: "250104", name: "UCAYALI" }).save()
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
