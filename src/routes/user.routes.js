import {Router} from 'express'
const router = Router()

import * as userCtrl from '../controllers/user.controller';
import { authJwt, verifySignUp } from '../middlewares'

router.get('/', [
    authJwt.verifyToken, 
    authJwt.isAdmin
], userCtrl.getUsers)

router.post('/', [
    authJwt.verifyToken, 
    authJwt.isAdmin,
    verifySignUp.checkDuplicateUsernameOrEmail, 
    verifySignUp.checkRolesExisted
], userCtrl.createUser)

router.get('/:userId', [
    authJwt.verifyToken
], userCtrl.getUserById)

router.put('/:userId', [
    authJwt.verifyToken
], userCtrl.updateUserById)

router.delete('/:userId', [
    authJwt.verifyToken,
    authJwt.isAdmin
], userCtrl.deleteUserById)

export default router;