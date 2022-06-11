import Order from "../models/Order";
import Goal from "../models/Goal";
import User from "../models/User";

export const createGoal = async (req, res) => {
  const { seller, startDate, endDate, estimatedQuantity } = req.body;

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
  });

  const savedGoal = await newGoal.save();

  res.status(201).json({ status: 201, savedGoal });
};

export const getGoals = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { startDate, endDate } = req.body;
  const convertStart = new Date(startDate);
  const convertEnd = new Date(endDate);

  if (!(convertStart < convertEnd))
    return res
      .status(400)
      .json({
        status: 400,
        message: "La fecha inicial debe ser menor a la fecha final",
      });

  const options = {
    limit,
    page: page,
    populate: [
      {
        path: "seller",
        populate: "employee",
      },
    ],
  };

  const goals = await Goal.paginate(
    {
      createdAt: { $gte: startDate, $lte: endDate },
    },
    options
  );
  res.status(200).json(goals);
};

export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId).populate("seller");
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: "Meta no encontrada no encontrada" });
  }
};

export const updateGoalById = async (req, res) => {
  try {
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

    if (!orderRangeFounds.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Pedidos no encontrados" });

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
    res.status(200).json({ status: 200, updatedGoal });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se actualizó la meta" });
  }
};
