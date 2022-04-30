import {Router} from 'express'
const router = Router()

import * as settingsCtrl from '../controllers/settings.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], settingsCtrl.getSettings)

router.get('/:settingId', [authJwt.verifyToken], settingsCtrl.getSettingById)

router.post('/', [authJwt.verifyToken], settingsCtrl.createSetting)

router.put('/:settingId', [authJwt.verifyToken], settingsCtrl.updateSettingById)

export default router;