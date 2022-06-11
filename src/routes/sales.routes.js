import { Router } from "express";

const router = Router()

import * as saleCtrl from '../controllers/sales.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isUser], saleCtrl.getSales)

router.get('/:saleId', [authJwt.verifyToken, authJwt.isUser], saleCtrl.getSaleById)

router.put('/:saleId', [authJwt.verifyToken, authJwt.isAdmin], saleCtrl.updateSaleById)

export default router;