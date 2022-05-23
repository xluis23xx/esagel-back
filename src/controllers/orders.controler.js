import Order from "../models/Order";
import OrderDetail from "../models/OrderDetail";
import Document from "../models/Document";
import Client from "../models/Client";
import User from "../models/User";
import Course from "../models/Course";

export const createOrder = async (req, res) => {
  try {
    let collectionLines = [];
    const {
      orderNumber,
      percentIva,
      subtotal,
      amountInIva,
      total,
      status,
      seller,
      client,
      documentType,
      documentNumber,
      orderLines,
    } = req.body;

    const foundSellers = await User.find({ _id: { $in: seller } });
    if (!foundSellers.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Vendedor no encontrado" });

    const foundClients = await Client.find({ _id: { $in: client } });
    if (!foundClients.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Cliente no encontrado" });

    const foundDocuments = await Document.find({ name: { $in: documentType } });
    if (!foundDocuments.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Tipo documento no encontrado" });

    // console.log(" orderLines", orderLines[0].course)
    // const foundCourse = await Course.findOne({ code: { $in: "PER" } });
    // console.log("foundCourse",foundCourse);
    // orderLines.map((element)=>{
    //     console.log("elementMap",element);
    //     const foundCourse = await Course.findOne({ code: { $in: element.course } });
    // })
    // orderLines.forEach((element) => {
    //     console.log("element",element);
    //     // const item = await findCourse(element);
    //     console.log("item",item.name);
    //     // const foundCourse = await Course.findOne({ code: { $in: element.course } });
    //     // console.log("element",foundCourse);
    // //   try {
    //     //   console.log("element",element.course);
    //     // const foundCourses = Course.find({ code: { $in: "PER" } });
    //     // console.log("foundCourses",foundCourses.name);

    //     // if (!foundCourses.length > 0)
    //     //   return res
    //     //     .status(400)
    //     //     .json({ status: 400, message: "Curso no encontrado" });
        
    //     // console.log("foundCourses",foundCourses);

    //     // const newOrderLine = new OrderDetail({
    //     //   name: element.name,
    //     //   quantity: element.quantity,
    //     //   discount: element.discount,
    //     //   price: element.price,
    //     //   amount: element.amount,
    //     //   course: foundCourses[0],
    //     // });

    //     // const savedOrderLine = newOrderLine.save();
    //     // collectionLines.push(savedOrderLine);
    // //   } catch (error) {
    // //     res
    // //       .status(400)
    // //       .json({ status: 400, message: "Error al crear la línea del pedido" });
    // //   }
    // });

    // console.log("collectionLines", collectionLines);
    // const newOrder = new Order({
    //   orderNumber,
    //   percentIva,
    //   subtotal,
    //   amountInIva,
    //   total,
    //   status: status ? status : 1,
    //   seller: foundSellers[0],
    //   client: foundClients[0],
    //   documentType: foundDocuments[0],
    //   documentNumber,
    //   orderLines: collectionLines,
    // });

    // const savedOrder = await newOrder.save();

    // res.status(201).json({ status: 201, savedOrder });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se creó el pedido" });
  }
};
  