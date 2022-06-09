import Order from "../models/Order";
import Goal from "../models/Goal";
import User from "../models/User";

export const createGoal = async (req, res) => {
  const { employee, startDate, endDate, estimatedQuantity } = req.body;
  // const isoDateStart = Date(startDate);
  // const isoDateEnd = Date(endDate);

  // console.log("isoDateStart",isoDateStart);
  // console.log("isoDateEnd",isoDateEnd);

  const foundSellers = await User.find({ _id: { $in: employee } });

  if (!foundSellers.length > 0)
    return res
      .status(400)
      .json({ status: 400, message: "Vendedor no encontrado" });

  const orderRangeFounds = await Order.find({
    createdAt: { $gte: startDate, $lte: endDate },
    seller: employee,
  });

  if (!orderRangeFounds.length > 0)
    return res
      .status(400)
      .json({ status: 400, message: "Pedidos no encontrados" });

  let amountSold = 0.0;
  
  orderRangeFounds.map(async (element) => {
    amountSold = amountSold + element.total
  })

  const newGoal = new Goal({
    employee,
    startDate,
    endDate,
    estimatedQuantity,
    quantitySold: amountSold,
  });

  const savedGoal = await newGoal.save();

  res.status(201).json({ status: 201, savedGoal });
};

// export const getProviders = async (req, res) => {
//   const limit = parseInt(req.query.limit || 10);
//   const page = parseInt(req.query.pageSize || 1);
//   const { filter } = req.body;

//   const options = {
//     limit,
//     page: page,
//     populate: ["documentType", "position"],
//   };

//   const providers = await Provider.paginate(
//     {
//       // $or: [{ documentNumber: filter }],
//     },
//     options
//   );
//   res.status(200).json(providers);
//   // const providers = await Provider.find().populate("documentType");
//   // res.json(providers);
// };

// export const getProviderById = async (req, res) => {
//   try {
//     const provider = await Provider.findById(req.params.providerId).populate(
//       "documentType"
//     );
//     res.status(200).json(provider);
//   } catch (error) {
//     res.status(400).json({ message: "Proveedor no encontrado" });
//   }
// };

// export const updateProviderById = async (req, res) => {
//   try {
//     const updatedProvider = await Provider.findByIdAndUpdate(
//       req.params.providerId,
//       req.body,
//       {
//         new: true,
//       }
//     );
//     res.status(200).json({ status: 200, updatedProvider });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ status: 400, message: "No se actualizó el proveedor" });
//   }
// };

// export const getGoals = async (req, res) => {
//   const {
//     employee,
//     startDate,
//     endDate,
//     estimatedQuantity,
//   } = req.body;

//   const orderRangeFounds = await Order.find({"createdAt" : {"$gte" : startDate, "$lte" : endDate}, seller: employee})

//   if (!orderRangeFounds.length > 0)
//     return res
//       .status(400)
//       .json({ status: 400, message: "Pedidos no encontrados" });

//   console.log("orderRangeFounds",orderRangeFounds);

//   res.status(201).json({ status: 201, savedProvider });
// };
