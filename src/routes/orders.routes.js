import { Router } from "express";
const router = Router();

import * as orderCtrl from "../controllers/orders.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken, authJwt.isUser], orderCtrl.createOrder);

router.post("/consult", [authJwt.verifyToken, authJwt.isUser], orderCtrl.getOrders);

router.get(
  "/:orderId",
  [authJwt.verifyToken, authJwt.isUser],
  orderCtrl.getOrderById
);

router.put(
  "/:orderId",
  [authJwt.verifyToken, authJwt.isUser],
  orderCtrl.updateOrderById
);

export default router;
