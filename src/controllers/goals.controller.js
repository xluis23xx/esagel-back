import Order from "../models/Order";
import Goal from "../models/Goal";
import User from "../models/User";
import { generateUTCToLimaDate } from "../utils/formats";

export const createGoal = async (req, res) => {
  const { seller, startDate, endDate, estimatedQuantity, status } = req.body;

  const foundSellers = await User.find({ _id: { $in: seller } });

  if (!foundSellers.length > 0)
    return res
      .status(400)
      .json({ status: 400, message: "Vendedor no encontrado" });

  const orderRangeFounds = await Order.find({
    createdAt: { $gte: startDate, $lte: endDate },
    seller: seller,
    status: 2,
  });

  // if (!orderRangeFounds.length > 0)
  //   return res
  //     .status(400)
  //     .json({ status: 400, message: "Pedidos no encontrados" });

  let amountSold = 0.0;

  orderRangeFounds.map(async (element) => {
    amountSold = amountSold + element.total;
  });

  const newGoal = new Goal({
    seller,
    startDate,
    endDate,
    estimatedQuantity,
    quantitySold: amountSold,
    status: status ? status : 1,
    createdAt: generateUTCToLimaDate(),
    updatedAt: generateUTCToLimaDate()
  });

  const savedGoal = await newGoal.save();

  res.status(201).json({ status: 201, doc: savedGoal });
};

export const getGoals = async (req, res) => {
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
    populate: [
      {
        path: "seller",
        populate: "employee",
      },
    ],
  };

  const goals = await Goal.paginate(
    {
      startDate: { $gte: convertStart },
      endDate: { $lte: convertEnd },
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  await Promise.all(
    goals.docs.map(async (goal, index) => {
      let amountSold = 0.0;
      const orderRangeFounds = await Order.find({
        createdAt: { $gte: goal.startDate, $lte: goal.endDate },
        seller: goal.seller._id,
        status: 2,
      });
      orderRangeFounds.map(async (order) => {
        amountSold = amountSold + order.total;
      });
      goals.docs[index].quantitySold = amountSold;
    })
  );

  res.status(200).json({ status: 200, ...goals });
};

export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId).populate({
      path: "seller",
      populate: [
        {
          path: "employee",
        },
      ],
    });
    res.status(200).json({ status: 200, doc: goal });
  } catch (error) {
    res.status(400).json({ message: "Meta no encontrada no encontrada" });
  }
};

export const updateGoalById = async (req, res) => {
  try {
    if (req.body?.isCancel) {
      const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.goalId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ status: 200, doc: updatedGoal });
    } else {
      const { seller, startDate, endDate } = req.body;

      const foundSellers = await User.find({ _id: { $in: seller } });

      if (!foundSellers.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Vendedor no encontrado" });

      const orderRangeFounds = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate },
        seller: seller,
        status: 2,
      });

      // if (!orderRangeFounds.length > 0)
      //   return res
      //     .status(400)
      //     .json({ status: 400, message: "Pedidos no encontrados" });

      let amountSold = 0.0;

      orderRangeFounds.map(async (element) => {
        amountSold = amountSold + element.total;
      });

      req.body.quantitySold = amountSold;

      const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.goalId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ status: 200, doc: updatedGoal });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se actualizó la meta" });
  }
};
