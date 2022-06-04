import { Router } from "express";

const router = Router();

import * as profileCtrl from "../controllers/profile.controller";
import { authJwt } from "../middlewares";

router.get(
  "/:userId",
  [authJwt.verifyToken, authJwt.isUser],
  profileCtrl.getProfileById
);

router.put(
  "/:employeeId",
  [authJwt.verifyToken, authJwt.isUser],
  profileCtrl.updateProfileById
);

router.put(
  "/password/:userId",
  [authJwt.verifyToken, authJwt.isUser],
  profileCtrl.updatePasswordProfileById
);

export default router;
