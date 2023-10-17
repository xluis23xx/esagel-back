import {Router} from 'express'
const router = Router()

import * as ubigeoCtrl from '../controllers/ubigeo.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken, authJwt.isUser], ubigeoCtrl.getUbigeo)

export default router;