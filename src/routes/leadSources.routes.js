import {Router} from 'express'
const router = Router()

import * as leadSourcesCtrl from '../controllers/leadSources.controller';
import { authJwt} from '../middlewares';

router.post('/consult', [authJwt.verifyToken, authJwt.isUser], leadSourcesCtrl.getLeadSources)

router.get('/:leadSourceId', [authJwt.verifyToken, authJwt.isUser], leadSourcesCtrl.getLeadSourceById)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], leadSourcesCtrl.createLeadSource)

router.put('/:leadSourceId', [authJwt.verifyToken, authJwt.isAdmin], leadSourcesCtrl.updateLeadSourceById)

export default router;