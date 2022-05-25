import Order from "../models/Order";
import OrderDetail from "../models/OrderDetail";
import Document from "../models/Document";
import Client from "../models/Client";
import User from "../models/User";
import Course from "../models/Course";
// import Course from "../models/Sale";

export const createOrder = async (req, res) => {
  const { isConfirm, isCancel } = req.body;
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

    await Promise.all(
      orderLines.map(async (element) => {
        try {
          const foundCourses = await Course.find({
            _id: { $in: element._id}
          });

          if (!foundCourses.length > 0)
            return res
              .status(400)
              .json({ status: 400, message: "Curso no encontrado" });

          const newOrderLine = new OrderDetail({
            name: element.name,
            quantity: element.quantity,
            discount: element.discount,
            price: element.price,
            amount: element.amount,
            course: foundCourses[0],
          });

          await newOrderLine.save().then((savedOrderLine) => {
            collectionLines.push(newOrderLine);
          });
        } catch (error) {
          console.log(error)
          res
            .status(400)
            .json({ status: 400, message: "No se creó el detalle del pedido" });
        }
      })
    );

    const newOrder = new Order({
      orderNumber,
      percentIva,
      subtotal,
      amountInIva,
      total,
      status: status ? status : 1,
      seller: foundSellers[0],
      client: foundClients[0],
      documentType: foundDocuments[0],
      documentNumber,
      orderLines: collectionLines,
    });

    const savedOrder = await newOrder.save();

    // if (isConfirm) {
    //   const newSale = new Sale({
    //     status: 1,
    //     newOrder._id
    //   });
    // }
    res.status(201).json({ status: 201, savedOrder });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

export const getOrders = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSise || 1);
  const options = {
    limit,
    page: page,
    populate: ["seller", "client", "documentType", "orderLines"],
  };

  const orders = await Order.paginate({}, options);
  res.status(200).json(orders);
};

// export const updateOrderById = async (req, res) => {
//   try {
//     let updatedOrder = null;
//     if (req.body?.isDelete) {
//       updatedOrder = await Order.findByIdAndUpdate(
//         req.params.orderId,
//         req.body,
//         {
//           new: true,
//         }
//       )
//         .populate("documentType")
//         .populate("position");
//     } else {
//       const foundPositions = await Position.find({
//         name: { $in: req.body.position },
//       });

//       if (!foundPositions.length > 0)
//         return res
//           .status(400)
//           .json({ status: 400, message: "Cargo no encontrado" });

//       req.body.position = foundPositions[0]._id;
//       updatedEmployee = await Employee.findByIdAndUpdate(
//         req.params.employeeId,
//         req.body,
//         {
//           new: true,
//         }
//       )
//         .populate("documentType")
//         .populate("position");
//     }

//     res.status(200).json({ status: 200, updatedEmployee });
//   } catch (error) {
//     if (req.body?.isDelete) {
//       res
//         .status(400)
//         .json({ status: 400, message: "No se eliminó el empleado" });
//     } else {
//       res
//         .status(400)
//         .json({ status: 400, message: "No se actualizó el empleado" });
//     }
//   }
// };
