import { Router } from "express";
const router = Router();

import * as goalsCtrl from "../controllers/goals.controller";
import { authJwt } from "../middlewares";

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  goalsCtrl.createGoal
);

export default router;
