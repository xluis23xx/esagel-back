import { Router } from "express";
const router = Router();

import * as statusProspectsCtrl from "../controllers/statusProspects.controller";
import { authJwt } from "../middlewares";

router.post(
  "/consult",
  [authJwt.verifyToken, authJwt.isUser],
  statusProspectsCtrl.getStatusProspects
);

router.get(
  "/:statusProspectId",
  [authJwt.verifyToken, authJwt.isUser],
  statusProspectsCtrl.getStatusProspectById
);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  statusProspectsCtrl.createStatusProspect
);

router.put(
  "/:statusProspectId",
  [authJwt.verifyToken, authJwt.isAdmin],
  statusProspectsCtrl.updateStatusProspectById
);

export default router;
