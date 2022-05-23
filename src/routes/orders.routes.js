import { Router } from 'express'
const router = Router()

import * as orderCtrl from '../controllers/orders.controler'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], orderCtrl.createOrder)

// router.get('/', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.getEmployees)

// router.get('/:employeeId', [authJwt.verifyToken], employeeCtrl.getEmployeeById)

// router.put('/:employeeId', [authJwt.verifyToken], employeeCtrl.updateEmployeeById)

// router.delete('/:employeeId', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.deleteEmployeeById)

export default router;