import Course from "../models/Course";
import Order from "../models/Order";
import OrderDetail from "../models/OrderDetail";
import Sale from "../models/Sale";

export const getSales = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  //   const { filter } = req.body;

  const options = {
    limit,
    page: page,
    populate: [
      "client",
      {
        path: "seller",
        populate: "employee",
      },
    ],
  };

  const sales = await Sale.paginate(
    {
      // $or: [{ documentNumber: filter }],
    },
    options
  );
  res.status(200).json(sales);
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.saleId)
      .populate({
        path: "order",
        populate: [
          {
            path: "orderLines",
            populate: "course",
          },
          {
            path: "documentType",
          },
        ],
      })
      .populate("client")
      .populate({
        path: "seller",
        populate: [
          {
            path: "employee",
          },
        ],
      });
    res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({ message: "Venta no encontrada" });
  }
};

export const updateSaleById = async (req, res) => {
  try {
    let updatedSale = null;
    if (req.body?.isCancel) {
      updatedSale = await Sale.findById(req.params.saleId).populate("order");
      if (updatedSale.status === 1) {
        const order = await Order.findById(updatedSale.order._id);
        const orderLines = order.orderLines;
        orderLines.map(async (element) => {
          const lineDetail = await OrderDetail.findById(element);
          const course = await Course.findById(lineDetail.course);
          course.vacanciesNumber = course.vacanciesNumber + 1;
          await course.save();
        });
        updatedSale.status = 0;
        await updatedSale.save();
        res
          .status(200)
          .json({ status: 200, updatedSale, message: "Venta anulada" });
      } else {
        res.status(400).json({
          status: 400,
          message: "Estado de venta no aceptado",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se anuló la venta" });
  }
};