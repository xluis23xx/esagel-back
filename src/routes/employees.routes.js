import { Router } from 'express'
const router = Router()

import * as employeeCtrl from '../controllers/employees.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.createEmployee)

router.post('/consult', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.getEmployees)

router.get('/:employeeId', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.getEmployeeById)

router.put('/:employeeId', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.updateEmployeeById)

router.delete('/:employeeId', [authJwt.verifyToken, authJwt.isAdmin], employeeCtrl.deleteEmployeeById)

export default router;