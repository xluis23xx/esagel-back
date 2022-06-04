import { Router } from 'express'
const router = Router()

import * as clientsCtrl from '../controllers/clients.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], clientsCtrl.createClient)

router.get('/', [authJwt.verifyToken, authJwt.isUser], clientsCtrl.getClients)

router.get('/:clientId', [authJwt.verifyToken, authJwt.isUser], clientsCtrl.getClientById)

router.put('/:clientId',[authJwt.verifyToken, authJwt.isAdmin], clientsCtrl.updateClientById)

router.delete('/:clientId', [authJwt.verifyToken, authJwt.isAdmin], clientsCtrl.deleteClientById)

export default router;