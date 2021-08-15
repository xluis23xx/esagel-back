import {Router} from 'express'
const router = Router()

import * as userCtrl from '../controllers/user.controller';
import { authJwt, verifySignUp } from '../middlewares'

router.get('/', [
    authJwt.verifyToken, 
    authJwt.isAdmin,
], userCtrl.getUsers)

export default router;