import { Router } from 'express'
const router = Router()

import * as customerCtrl from '../controllers/customers.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], customerCtrl.createClient)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], customerCtrl.getClients)

router.get('/:clientId', [authJwt.verifyToken], customerCtrl.getClientById)

router.put('/:clientId', [authJwt.verifyToken], customerCtrl.updateClientById)

router.delete('/:clientId', [authJwt.verifyToken, authJwt.isAdmin], customerCtrl.deleteClientById)

export default router;