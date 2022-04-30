import {Router} from 'express'
const router = Router()

import * as leadSourcesCtrl from '../controllers/leadSources.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], leadSourcesCtrl.getLeadSources)

router.get('/:leadSourceId', [authJwt.verifyToken], leadSourcesCtrl.getLeadSourceById)

router.post('/', [authJwt.verifyToken], leadSourcesCtrl.createLeadSource)

router.put('/:leadSourceId', [authJwt.verifyToken], leadSourcesCtrl.updateLeadSourceById)

export default router;