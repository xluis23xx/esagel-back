import { Router } from 'express'
const router = Router()

import * as orderCtrl from '../controllers/orders.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isUser], orderCtrl.createOrder)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], orderCtrl.getOrders)

router.get('/:orderId', [authJwt.verifyToken], orderCtrl.getOrderById)

router.put('/:orderId', [authJwt.verifyToken], orderCtrl.updateOrderById)

export default router;