import Order from "../models/Order";
import Purchase from "../models/Purchase";

export const getDashboard = async (req, res) => {
  try {
    const months = req.body;
    let data = [];
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
        ordersPerMonth.map((order) => {
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
        purchasesPerMonth.map((purchase) => {
          monthPurchased = monthPurchased + purchase.total;
        });

        data.push({
          startDate: date.startDate,
          endDate: date.endDate,
          totalMonthSold: monthSold,
          quantityMonthSold: ordersPerMonth.length,
          totalMonthPurchased: monthPurchased,
          quantityMonthPurchased: purchasesPerMonth.length,
        });
      })
    );

    data.map((object) => {
      totalSoldSale = totalSoldSale + object.totalMonthSold;
      totalQuantitySales = totalQuantitySales + object.quantityMonthSold;
      totalPurchased = totalPurchased + object.totalMonthPurchased;
      quantityTotalPurchased =
        quantityTotalPurchased + object.quantityMonthPurchased;
    });
    const obtainDates = months.map((month) => month.startDate);

    const newArray = [];
    obtainDates.map((date) => {
      data.map((dataObtain) => {
        if (date === dataObtain.startDate) {
          newArray.push(dataObtain);
        }
      });
    });

    res.status(200).json({
      status: 200,
      data: newArray,
      totalSoldSale: totalSoldSale,
      totalQuantitySales: totalQuantitySales,
      totalPurchased: totalPurchased,
      quantityTotalPurchased: quantityTotalPurchased,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error en la consulta, verifique información enviada",
      data: req.body,
    });
  }
};
