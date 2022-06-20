import Order from "../models/Order";
import OrderDetail from "../models/OrderDetail";
import Document from "../models/Document";
import Client from "../models/Client";
import User from "../models/User";
import Course from "../models/Course";
import Sale from "../models/Sale";
import Center from "../models/Center";

export const createOrder = async (req, res) => {
  try {
    let collectionLines = [];
    let serie = "";
    const {
      percentIva,
      subtotal,
      amountInIva,
      total,
      status,
      center,
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

    const foundCenters = await Center.find({ branchName: { $in: center } });
    if (!foundCenters.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Centro no encontrado" });

    const document = await Document.findById(foundDocuments[0]._id);
    const initialSequential = document.sequential + 1;
    const lengthSecuential = initialSequential.toString();
    const serial = lengthSecuential.length;
    const resultLength = document.length - serial;
    for (let index = 0; index < resultLength; index++) {
      serie = serie + "0";
    }
    serie = document.code + "-" + serie + lengthSecuential;
    document.sequential = initialSequential;
    await document.save();

    await Promise.all(
      orderLines.map(async (element) => {
        try {
          const foundCourses = await Course.find({
            _id: { $in: element._id },
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
          res
            .status(400)
            .json({ status: 400, message: "No se creó el detalle del pedido" });
        }
      })
    );

    const newOrder = new Order({
      orderNumber: serie,
      percentIva,
      subtotal,
      amountInIva,
      total,
      status: status ? status : 1,
      seller: foundSellers[0],
      client: foundClients[0],
      documentType: foundDocuments[0],
      center: foundCenters[0],
      documentNumber,
      orderLines: collectionLines,
    });

    await newOrder.save();

    res.status(201).json({
      status: 201,
      doc: newOrder,
      message: "Se ha generado el pedido: " + newOrder.orderNumber,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

export const getOrders = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { startDate, endDate, status } = req.body;
  const convertStart = new Date(startDate);
  const convertEnd = new Date(endDate);

  if (!(convertStart < convertEnd))
    return res.status(400).json({
      status: 400,
      message: "La fecha inicial debe ser menor a la fecha final",
    });

  const options = {
    limit,
    page: page,
    sort: { createdAt: "desc" },
    populate: ["seller", "client", "documentType", "orderLines"],
  };

  const orders = await Order.paginate(
    {
      createdAt: { $gte: startDate, $lte: endDate },
      status: typeof status === "number" ? status : [0, 1, 2],
    },
    options
  );
  res.status(200).json({ status: 200, ...orders });
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.orderId)
    .populate({
      path: "seller",
      path: "center",
      populate: [
        {
          path: "employee",
        },
      ],
    })
    .populate("client")
    .populate("documentType")
    .populate({
      path: "orderLines",
      populate: [
        {
          path: "course",
        },
      ],
    });
  res.status(200).json({ status: 200, doc: order });
};

export const updateOrderById = async (req, res) => {
  try {
    let updatedOrder = null;
    let sequentialSale = 0;
    let codeSaleNumber = "";
    if (req.body?.isCancel) {
      updatedOrder = await Order.findById(req.params.orderId);
      if (updatedOrder.status === 1) {
        updatedOrder.status = 0;
        const savedUpdatedOrder = await updatedOrder.save();

        res.status(200).json({
          status: 200,
          doc: savedUpdatedOrder,
          message: "Pedido cancelado",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "Estado de pedido no aceptado",
        });
      }
    } else if (req.body?.isConfirm) {
      updatedOrder = await Order.findById(req.params.orderId)
        .populate({
          path: "seller",
          populate: [
            {
              path: "employee",
            },
          ],
        })
        .populate("client");
      if (updatedOrder.status === 1) {
        const orderLines = updatedOrder.orderLines;
        orderLines.map(async (element) => {
          const lineDetail = await OrderDetail.findById(element);
          const course = await Course.findById(lineDetail.course);
          if (course.vacanciesNumber < 1)
            return res.status(400).json({
              status: 400,
              message: "No hay vacantes para el curso: " + course.name,
            });
          course.vacanciesNumber = course.vacanciesNumber - lineDetail.quantity;
          await course.save();
        });
        updatedOrder.status = 2;
        await updatedOrder.save();

        const salesFound = await Sale.find();
        if (salesFound.length < 1) {
          sequentialSale = 1;
        } else {
          sequentialSale = salesFound.length + 1;
        }
        codeSaleNumber = "V" + "-" + sequentialSale.toString();

        const newSale = new Sale({
          saleNumber: codeSaleNumber,
          status: 1,
          order: req.params.orderId,
          seller: updatedOrder.seller,
          client: updatedOrder.client,
          percentIva: updatedOrder.percentIva,
          subtotal: updatedOrder.subtotal,
          amountInIva: updatedOrder.amountInIva,
          total: updatedOrder.total,
        });

        const savedSale = await newSale.save();

        res.status(200).json({
          status: 200,
          doc: savedSale,
          message: "Se generó la venta con éxito",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "Estado de pedido no aceptado",
        });
      }
    }
  } catch (error) {
    if (req.body?.isConfirm) {
      res
        .status(400)
        .json({ status: 400, message: "No se generó la venta con éxito" });
    } else if (req.body?.isCancel) {
      res
        .status(400)
        .json({ status: 400, message: "No se canceló el pedido con éxito" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "No se actualizó el pedido" });
    }
  }
};
