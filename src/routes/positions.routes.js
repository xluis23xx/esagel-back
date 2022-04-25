import {Router} from 'express'
const router = Router()

import * as positionsCtrl from '../controllers/positions.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], positionsCtrl.getPositions)

// router.get('/:documentId', [authJwt.verifyToken], documentsCtrl.getDocumentById)

router.post('/', [authJwt.verifyToken], positionsCtrl.createPosition)

// router.put('/:documentId', [authJwt.verifyToken], documentsCtrl.updateDocumentById)

export default router;