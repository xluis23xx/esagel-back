import Purchase from "../models/Purchase";
import Provider from "../models/Provider";
import User from "../models/User";

export const createPurchase = async (req, res) => {
  const {
    purchaseNumber,
    name,
    reason,
    price,
    quantity,
    total,
    status,
    buyer,
    provider,
  } = req.body;

  const newPurchase = new Purchase({
    purchaseNumber,
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

  res.status(201).json({ status: 201, savedPurchase });
};

export const getPurchases = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  //   const { filter } = req.body;

  const options = {
    limit,
    page: page,
    populate: ["provider", "buyer"],
  };

  const purchases = await Purchase.paginate(
    {
      // $or: [{ documentNumber: filter }],
    },
    options
  );
  res.status(200).json(purchases);
};

export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.purchaseId)
      .populate("provider")
      .populate("buyer");
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ message: "Compra no encontrada" });
  }
};

export const updatePurchaseById = async (req, res) => {
  try {
    let updatedPurchase = null;
    if (req.body?.isDelete) {
      updatedPurchase = await Purchase.findByIdAndUpdate(
        req.params.purchaseId,
        req.body,
        {
          new: true,
        }
      );
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
    }

    res.status(200).json({ status: 200, updatedPurchase });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se actualizó la compra" });
  }
};
