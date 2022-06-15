import { Router } from "express";
const router = Router();

import * as courseTypesCtrl from "../controllers/courseType.controller";
import { authJwt } from "../middlewares";

router.post(
  "/consult",
  [authJwt.verifyToken, authJwt.isUser],
  courseTypesCtrl.getCourseTypes
);

router.get(
  "/:courseTypeId",
  [authJwt.verifyToken, authJwt.isUser],
  courseTypesCtrl.getCourseTypeById
);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  courseTypesCtrl.createCourseType
);

router.put(
  "/:courseTypeId",
  [authJwt.verifyToken, authJwt.isAdmin],
  courseTypesCtrl.updateCourseTypeById
);

export default router;
