import {Router} from 'express'
const router = Router()

import * as centersCtrl from '../controllers/centers.controller';
import { authJwt} from '../middlewares';

router.post('/consult', [authJwt.verifyToken, authJwt.isUser], centersCtrl.getCenters)

router.get('/:centerId', [authJwt.verifyToken, authJwt.isUser], centersCtrl.getCenterById)

router.post('/', [authJwt.verifyToken, authJwt.isModerator], centersCtrl.createCenter)

router.put('/:centerId', [authJwt.verifyToken, authJwt.isModerator], centersCtrl.updateCenterById)

export default router;