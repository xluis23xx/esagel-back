import { Router } from 'express'
const router = Router()

import * as dashboardCtrl from '../controllers/dashboard.controller'
import { authJwt } from '../middlewares';

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], dashboardCtrl.getDashboard)

export default router;