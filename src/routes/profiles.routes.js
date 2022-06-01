import { Router } from "express";

const router = Router()

import * as profileCtrl from '../controllers/profile.controller'
import { authJwt } from '../middlewares';

router.put('/:employeeId', [authJwt.verifyToken, authJwt.isAdmin], profileCtrl.updateProfileById)

router.put('/password/:userId', [authJwt.verifyToken, authJwt.isAdmin], profileCtrl.updatePasswordProfileById)

export default router;