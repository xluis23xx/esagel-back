import { Router } from "express";

const router = Router()

import * as purchaseCtrl from '../controllers/purchases.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], purchaseCtrl.createPurchase)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], purchaseCtrl.getPurchases)

router.get('/:purchaseId', [authJwt.verifyToken, authJwt.isAdmin], purchaseCtrl.getPurchaseById)

router.put('/:purchaseId', [authJwt.verifyToken, authJwt.isAdmin], purchaseCtrl.updatePurchaseById)

export default router;