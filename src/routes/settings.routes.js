import {Router} from 'express'
const router = Router()

import * as settingsCtrl from '../controllers/settings.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken, authJwt.isUser], settingsCtrl.getSettings)

router.put('/:settingId', [authJwt.verifyToken, authJwt.isModerator], settingsCtrl.updateSettingById)

export default router;