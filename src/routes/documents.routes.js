import {Router} from 'express'
const router = Router()

import * as documentsCtrl from '../controllers/documents.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], documentsCtrl.getDocuments)

router.get('/:documentId', [authJwt.verifyToken], documentsCtrl.getDocumentById)

router.post('/', [authJwt.verifyToken], documentsCtrl.createDocument)

router.put('/:documentId', [authJwt.verifyToken], documentsCtrl.updateDocumentById)

export default router;