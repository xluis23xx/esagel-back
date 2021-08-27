import {Router} from 'express'
const router = Router()

import * as documentsCtrl from '../controllers/documents.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], documentsCtrl.getDocuments)

export default router;