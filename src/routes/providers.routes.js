import { Router } from "express";

const router = Router()

import * as providerCtrl from '../controllers/providers.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], providerCtrl.createProvider)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], providerCtrl.getProviders)

router.get('/:providerId', [authJwt.verifyToken], providerCtrl.getProviderById)

router.put('/:providerId', [authJwt.verifyToken], providerCtrl.updateProviderById)

router.delete('/:providerId', [authJwt.verifyToken, authJwt.isAdmin], providerCtrl.deleteProviderById)

export default router;