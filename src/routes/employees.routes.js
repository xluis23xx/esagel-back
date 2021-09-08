import { Router } from 'express'
const router = Router()

import * as employeeCtrl from '../controllers/employees.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.createEmployee)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.getEmployees)

router.get('/:employeeId', [authJwt.verifyToken], employeeCtrl.getEmployeeById)

router.put('/:employeeId', [authJwt.verifyToken], employeeCtrl.updateEmployeeById)

router.delete('/:employeeId', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.deleteEmployeeById)

export default router;