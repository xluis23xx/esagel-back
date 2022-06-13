import { Router } from 'express'
const router = Router()

import * as dashboardCtrl from '../controllers/dashboard.controller'
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], dashboardCtrl.getDashboard)

export default router;