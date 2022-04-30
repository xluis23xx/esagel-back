import {Router} from 'express'
const router = Router()

import * as statusProspectsCtrl from '../controllers/statusProspects.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], statusProspectsCtrl.getStatusProspects)

router.get('/:statusProspectId', [authJwt.verifyToken], statusProspectsCtrl.getStatusProspectById)

router.post('/', [authJwt.verifyToken], statusProspectsCtrl.createStatusProspect)

router.put('/:statusProspectId', [authJwt.verifyToken], statusProspectsCtrl.updateStatusProspectById)

export default router;