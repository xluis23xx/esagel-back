import Purchase from "../models/Purchase";
import Provider from "../models/Provider";
import User from "../models/User";

export const createPurchase = async (req, res) => {
  let sequentialPurchase = 0;
  let codePurchaseNumber = "";
  const {
    name,
    reason,
    price,
    quantity,
    total,
    status,
    buyer,
    provider,
  } = req.body;

  const purchasesFound = await Purchase.find();
  if (purchasesFound.length < 1) {
    sequentialPurchase = 1;
  } else {
    sequentialPurchase = purchasesFound.length + 1;
  }
  codePurchaseNumber = 'C' + '-' + sequentialPurchase.toString();

  const newPurchase = new Purchase({
    purchaseNumber: codePurchaseNumber,
    name,
    reason,
    price,
    quantity,
    total,
    status: status ? status : 1,
  });

  const foundBuyers = await User.find({ _id: { $in: buyer } });

  if (!foundBuyers.length > 0)
    return res
      .status(400)
      .json({ status: 400, message: "Comprador no encontrado" });

  newPurchase.buyer = foundBuyers[0];

  const foundProviders = await Provider.find({ _id: { $in: provider } });

  if (!foundProviders.length > 0)
    return res
      .status(400)
      .json({ status: 400, message: "Proveedor no encontrado" });

  newPurchase.provider = foundProviders[0];

  const savedPurchase = await newPurchase.save();

  res.status(201).json({ status: 201, doc: savedPurchase });
};

export const getPurchases = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { startDate, endDate, status } = req.body;
  const convertStart = new Date(startDate);
  const convertEnd = new Date(endDate);
  //   const { filter } = req.body;
  if (!(convertStart < convertEnd))
    return res.status(400).json({
      status: 400,
      message: "La fecha inicial debe ser menor a la fecha final",
    });

  const options = {
    limit,
    page: page,
    sort: { createdAt: "desc" },
    populate: ["provider", "buyer"],
  };

  const purchases = await Purchase.paginate(
    {
      createdAt: { $gte: startDate, $lte: endDate },
      status: typeof status === "number" ? status : [0, 1],
      // $or: [{ documentNumber: filter }],
    },
    options
  );
  res.status(200).json({ status: 200, ...purchases });
};

export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.purchaseId)
      .populate("provider")
      .populate({
        path: "buyer",
        populate: [
          {
            path: "employee",
          },
        ],
      });
    res.status(200).json({ status: 200, doc: purchase });
  } catch (error) {
    res.status(400).json({ message: "Compra no encontrada" });
  }
};

export const updatePurchaseById = async (req, res) => {
  try {
    let updatedPurchase = null;
    if (req.body?.isCancel) {
      req.body.status = 0;
      updatedPurchase = await Purchase.findByIdAndUpdate(
        req.params.purchaseId,
        req.body,
        {
          new: true,
        }
      )
        .populate("buyer")
        .populate("provider");
    } else {
      const foundBuyers = await User.find({ _id: { $in: req.body.buyer } });

      if (!foundBuyers.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Comprador no encontrado" });

      req.body.buyer = foundBuyers[0]._id;

      const foundProviders = await Provider.find({
        _id: { $in: req.body.provider },
      });

      if (!foundProviders.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Proveedor no encontrado" });

      req.body.provider = foundProviders[0]._id;

      updatedPurchase = await Purchase.findByIdAndUpdate(
        req.params.purchaseId,
        req.body,
        {
          new: true,
        }
      )
        .populate("buyer")
        .populate("provider");
    }

    res.status(200).json({ status: 200, doc: updatedPurchase });
  } catch (error) {
    if (req.body?.isDelete) {
      res.status(400).json({ status: 400, message: "No se anuló la compra" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "No se actualizó la compra" });
    }
  }
};
