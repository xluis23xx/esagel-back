import Order from "../models/Order";
import Purchase from "../models/Purchase";

export const getDashboard = async (req, res) => {
  const { firstMonth = null, secondMonth = null, thirdMonth = null } = req.body;
  const { startDate: startFirstMonth = null, endDate: endFirstMonth = null } =
    firstMonth || {};
  const { startDate: startSecondMonth = null, endDate: endSecondMonth = null } =
    secondMonth || {};
  const { startDate: startThirdMonth = null, endDate: endThirdMonth = null } =
    thirdMonth || {};

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
  let quantitySalesFirstMonth = 0;
  let quantitySalesSecondMonth = 0;
  let quantitySalesThirdMonth = 0;
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

  totalAmountSold =
    totalFirstMonthSold + totalSecondMonthSold + totalThirdMonthSold;

  quantitySalesFirstMonth = ordersFirstMonth.length || 0;
  quantitySalesSecondMonth = ordersSecondMonth.length || 0;
  quantitySalesThirdMonth = ordersThirdMonth.length || 0;

  totalQuantitiesSoldMonths =
    ordersFirstMonth.length +
    ordersSecondMonth.length +
    ordersThirdMonth.length;

  ////////////*-Purchases-*////////////
  let totalFirstMonthPurchased = 0.0;
  let totalSecondMonthPurchased = 0.0;
  let totalThirdMonthPurchased = 0.0;
  let quantityPurchasesFirstMonth = 0;
  let quantityPurchasesSecondMonth = 0;
  let quantityPurchasesThirdMonth = 0;
  let purchaseTotalAmountPurchased = 0.0;
  let amountsPurchasedMonths = [];
  let quantitiesPurchasedMonths = [];
  let totalQuantitiesPurchasedMonths = 0;

  const purchasesFirstMonth = await Purchase.find({
    createdAt: { $gte: convertStartFirstMonth, $lte: convertEndFirstMonth },
    status: 1,
  });
  purchasesFirstMonth.forEach((element) => {
    totalFirstMonthPurchased = totalFirstMonthPurchased + element.total;
  });
  amountsPurchasedMonths.push(totalFirstMonthPurchased);
  quantitiesPurchasedMonths.push(purchasesFirstMonth.length);

  const purchasesSecondMonth = await Purchase.find({
    createdAt: { $gte: convertStartSecondMonth, $lte: convertEndSecondMonth },
    status: 1,
  });
  purchasesSecondMonth.forEach((element) => {
    totalSecondMonthPurchased = totalSecondMonthPurchased + element.total;
  });
  amountsPurchasedMonths.push(totalSecondMonthPurchased);
  quantitiesPurchasedMonths.push(purchasesSecondMonth.length);

  const purchasesThirdMonth = await Purchase.find({
    createdAt: { $gte: convertStartThirdMonth, $lte: convertEndThirdMonth },
    status: 1,
  });
  purchasesThirdMonth.forEach((element) => {
    totalThirdMonthPurchased = totalThirdMonthPurchased + element.total;
  });
  amountsPurchasedMonths.push(totalThirdMonthPurchased);
  quantitiesPurchasedMonths.push(purchasesThirdMonth.length);

  purchaseTotalAmountPurchased =
    totalFirstMonthPurchased +
    totalSecondMonthPurchased +
    totalThirdMonthPurchased;

  quantityPurchasesFirstMonth = purchasesFirstMonth.length || 0;
  quantityPurchasesSecondMonth = purchasesSecondMonth.length || 0;
  quantityPurchasesThirdMonth = purchasesThirdMonth.length || 0;

  totalQuantitiesPurchasedMonths =
    purchasesFirstMonth.length +
    purchasesSecondMonth.length +
    purchasesThirdMonth.length;

  res.status(200).json({
    status: 200,
    sales: {
      totalFirstMonth: totalFirstMonthSold,
      totalSecondMonth: totalSecondMonthSold,
      totalThirdMonth: totalThirdMonthSold,
      quantityFirstMonth: quantitySalesFirstMonth,
      quantitySecondMonth: quantitySalesSecondMonth,
      quantityThirdMonth: quantitySalesThirdMonth,
      quantitiesTotal: totalQuantitiesSoldMonths,
      quantitiesSold: quantitiesSoldMonths,
      amountTotal: totalAmountSold,
      amountsSold: amountsSoldMonths,
    },
    purchases: {
      totalFirstMonth: totalFirstMonthPurchased,
      totalSecondMonth: totalSecondMonthPurchased,
      totalThirdMonth: totalThirdMonthPurchased,
      quantityFirstMonth: quantityPurchasesFirstMonth,
      quantitySecondMonth: quantityPurchasesSecondMonth,
      quantityThirdMonth: quantityPurchasesThirdMonth,
      quantitiesTotal: totalQuantitiesPurchasedMonths,
      quantitiesPurchased: quantitiesPurchasedMonths,
      amountTotal: purchaseTotalAmountPurchased,
      amountsPurchased: amountsPurchasedMonths,
    },
  });
};
