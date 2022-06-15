import { Router } from "express";
const router = Router();

import * as documentsCtrl from "../controllers/documents.controller";
import { authJwt } from "../middlewares";

router.post(
  "/consult",
  [authJwt.verifyToken, authJwt.isUser],
  documentsCtrl.getDocuments
);

router.get(
  "/:documentId",
  [authJwt.verifyToken, authJwt.isUser],
  documentsCtrl.getDocumentById
);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  documentsCtrl.createDocument
);

router.put(
  "/:documentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  documentsCtrl.updateDocumentById
);

export default router;
