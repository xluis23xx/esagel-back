import { Router } from "express";
const router = Router();

import * as courseTypesCtrl from "../controllers/courseType.controller";
import { authJwt } from "../middlewares";

router.get("/", [authJwt.verifyToken], courseTypesCtrl.getCourseTypes);

router.get(
  "/:courseTypeId",
  [authJwt.verifyToken],
  courseTypesCtrl.getCourseTypeById
);

router.post("/", [authJwt.verifyToken], courseTypesCtrl.createCourseType);

router.put(
  "/:courseTypeId",
  [authJwt.verifyToken],
  courseTypesCtrl.updateCourseTypeById
);

export default router;
