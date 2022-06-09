import { Router } from "express";
const router = Router();

import * as goalsCtrl from "../controllers/goals.controller";
import { authJwt } from "../middlewares";

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  goalsCtrl.createGoal
);

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], goalsCtrl.getGoals);

router.get('/:goalId', [authJwt.verifyToken, authJwt.isAdmin], goalsCtrl.getGoalById)

router.put('/:goalId', [authJwt.verifyToken, authJwt.isAdmin], goalsCtrl.updateGoalById)

export default router;
