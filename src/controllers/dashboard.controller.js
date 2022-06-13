import Order from "../models/Order";
import OrderDetail from "../models/OrderDetail";
import Document from "../models/Document";
import Client from "../models/Client";
import User from "../models/User";
import Course from "../models/Course";
import Sale from "../models/Sale";

export const getDashboard = async (req, res) => {
    const currentDate = new Date(
        
    );
    const currentYear = currentDate.getFullYear();
    const firstMonth = currentDate.getMonth() - 1;
    const secondMonth = currentDate.getMonth();
    const thirdMonth = currentDate.getMonth() + 1;
    console.log("currentDate",currentDate);
    console.log("currentYear",currentYear);
    console.log("firstMonth",firstMonth);
    console.log("secondMonth",secondMonth);
    console.log("thirdMonth",thirdMonth);
    const cadena = currentDate.toISOString();
    console.log("cadena",cadena);
    // const firstDate = 

    // const fisrtInitialDate = 
//   const orders = await Order.paginate(
//     {
//       createdAt: { $gte: startDate, $lte: endDate },
//       status: typeof status === "number" ? status : [0, 1, 2],
//     },
//     options
//   );
  res.status(200).json(currentDate);
};
