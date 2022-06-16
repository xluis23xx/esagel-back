import Order from "../models/Order";
import Purchase from "../models/Purchase";

export const getDashboard = async (req, res) => {
  try {
    const months = req.body;
    const data = [];
    let totalSoldSale = 0.0;
    let totalQuantitySales = 0.0;
    let totalPurchased = 0.0;
    let quantityTotalPurchased = 0.0;

    await Promise.all(
      months.map(async (date) => {
        let monthSold = 0.0;
        let monthPurchased = 0.0;
        //*-Sales-*//
        const ordersPerMonth = await Order.find({
          createdAt: {
            $gte: new Date(date.startDate),
            $lte: new Date(date.endDate),
          },
          status: 2,
        });
        ordersPerMonth.map(async (order) => {
          monthSold = monthSold + order.total;
        });
        //*-Purchases-*//
        const purchasesPerMonth = await Purchase.find({
          createdAt: {
            $gte: new Date(date.startDate),
            $lte: new Date(date.endDate),
          },
          status: 1,
        });
        purchasesPerMonth.map(async (purchase) => {
          monthPurchased = monthPurchased + purchase.total;
        });

        data.push({
          totalMonthSold: monthSold,
          quantityMonthSold: ordersPerMonth.length,
          totalMonthPurchased: monthPurchased,
          quantityMonthPurchased: purchasesPerMonth.length,
        });
      })
    );

    data.map(async (data) => {
      totalSoldSale = totalSoldSale + data.totalMonthSold;
      totalQuantitySales = totalQuantitySales + data.quantityMonthSold;
      totalPurchased = totalPurchased + data.totalMonthPurchased;
      quantityTotalPurchased =
        quantityTotalPurchased + data.quantityMonthPurchased;
    });

    res.status(200).json({
      status: 200,
      data: data,
      totalSoldSale: totalSoldSale,
      totalQuantitySales: totalQuantitySales,
      totalPurchased: totalPurchased,
      quantityTotalPurchased: quantityTotalPurchased,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: "Error en la consulta, verifique información enviada", data: req.body });
  }
};
