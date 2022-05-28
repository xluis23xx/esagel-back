import { Router } from "express";

const router = Router()

import * as saleCtrl from '../controllers/sales.controller'
import { authJwt } from '../middlewares';

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], saleCtrl.getSales)

router.get('/:saleId', [authJwt.verifyToken], saleCtrl.getSaleById)

router.put('/:saleId', [authJwt.verifyToken, authJwt.isAdmin], saleCtrl.updateSaleById)

export default router;