import Order from "../models/Order";
import Purchase from "../models/Purchase";

export const getDashboard = async (req, res) => {
  const { firstMonth = null, secondMonth = null, thirdMonth = null } = req.body;
  const { startFirstMonth = null, endFirstMonth = null } = firstMonth || {};
  const { startSecondMonth = null, endSecondMonth = null } = secondMonth || {};
  const { startThirdMonth = null, endThirdMonth = null } = thirdMonth || {};

  const convertStartFirstMonth = new Date(startFirstMonth);
  const convertEndFirstMonth = new Date(endFirstMonth);

  const convertStartSecondMonth = new Date(startSecondMonth);
  const convertEndSecondMonth = new Date(endSecondMonth);

  const convertStartThirdMonth = new Date(startThirdMonth);
  const convertEndThirdMonth = new Date(endThirdMonth);

  ////////////*-Sales-*////////////
  let totalFirstMonthSold = 0.0;
  let totalSecondMonthSold = 0.0;
  let totalThirdMonthSold = 0.0;
  let totalAmountSold = 0.0;
  let amountsSoldMonths = [];
  let quantitiesSoldMonths = [];
  let totalQuantitiesSoldMonths = 0;

  const ordersFirstMonth = await Order.find({
    createdAt: { $gte: convertStartFirstMonth, $lte: convertEndFirstMonth },
    status: 2,
  });
  ordersFirstMonth.forEach((element) => {
    totalFirstMonthSold = totalFirstMonthSold + element.total;
  });
  amountsSoldMonths.push(totalFirstMonthSold);
  quantitiesSoldMonths.push(ordersFirstMonth.length);

  const ordersSecondMonth = await Order.find({
    createdAt: { $gte: convertStartSecondMonth, $lte: convertEndSecondMonth },
    status: 2,
  });
  ordersSecondMonth.forEach((element) => {
    totalSecondMonthSold = totalSecondMonthSold + element.total;
  });
  amountsSoldMonths.push(totalSecondMonthSold);
  quantitiesSoldMonths.push(ordersSecondMonth.length);

  const ordersThirdMonth = await Order.find({
    createdAt: { $gte: convertStartThirdMonth, $lte: convertEndThirdMonth },
    status: 2,
  });
  ordersThirdMonth.forEach((element) => {
    totalThirdMonthSold = totalThirdMonthSold + element.total;
  });
  amountsSoldMonths.push(totalThirdMonthSold);
  quantitiesSoldMonths.push(ordersThirdMonth.length);

  totalAmountSold = totalFirstMonthSold + totalSecondMonthSold + totalThirdMonthSold;

  totalQuantitiesSoldMonths =
    ordersFirstMonth.length +
    ordersSecondMonth.length +
    ordersThirdMonth.length;

  ////////////*-Purchases-*////////////
  let purchaseTotalFirstMonth = 0.0;
  let purchaseTotalSecondMonth = 0.0;
  let purchaseTotalThirdMonth = 0.0;
  let purchaseTotalAmountPurchased = 0.0;
  let amountsPurchasedMonths = [];
  let quantitiesPurchasedMonths = [];
  let totalQuantitiesPurchasedMonths = 0;

  const purchasesFirstMonth = await Purchase.find({
    createdAt: { $gte: convertStartFirstMonth, $lte: convertEndFirstMonth },
    status: 1,
  });
  purchasesFirstMonth.forEach((element) => {
    purchaseTotalFirstMonth = purchaseTotalFirstMonth + element.total;
  });
  amountsPurchasedMonths.push(purchaseTotalFirstMonth);
  quantitiesPurchasedMonths.push(purchasesFirstMonth.length);

  const purchasesSecondMonth = await Purchase.find({
    createdAt: { $gte: convertStartSecondMonth, $lte: convertEndSecondMonth },
    status: 1,
  });
  purchasesSecondMonth.forEach((element) => {
    purchaseTotalSecondMonth = purchaseTotalSecondMonth + element.total;
  });
  amountsPurchasedMonths.push(purchaseTotalSecondMonth);
  quantitiesPurchasedMonths.push(purchasesSecondMonth.length);

  const purchasesThirdMonth = await Purchase.find({
    createdAt: { $gte: convertStartThirdMonth, $lte: convertEndThirdMonth },
    status: 1,
  });
  purchasesThirdMonth.forEach((element) => {
    purchaseTotalThirdMonth = purchaseTotalThirdMonth + element.total;
  });
  amountsPurchasedMonths.push(purchaseTotalThirdMonth);
  quantitiesPurchasedMonths.push(purchasesThirdMonth.length);

  purchaseTotalAmountPurchased =
    purchaseTotalFirstMonth +
    purchaseTotalSecondMonth +
    purchaseTotalThirdMonth;

  totalQuantitiesPurchasedMonths =
    purchasesFirstMonth.length +
    purchasesSecondMonth.length +
    purchasesThirdMonth.length;

  res.status(200).json({
    sales: {
      quantitiesTotal: totalQuantitiesSoldMonths,
      quantitiesSold: quantitiesSoldMonths,
      amountTotal: totalAmountSold,
      amountsSold: amountsSoldMonths,
    },
    purchases: {
      quantitiesTotal: totalQuantitiesPurchasedMonths,
      quantitiesPurchased: quantitiesPurchasedMonths,
      amountTotal: purchaseTotalAmountPurchased,
      amountsPurchased: amountsPurchasedMonths,
    },
  });
};
