import {Router} from 'express'
const router = Router()

import * as mediumContactsCtrl from '../controllers/mediumContacts.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], mediumContactsCtrl.getContacts)

router.get('/:contactId', [authJwt.verifyToken], mediumContactsCtrl.getContactById)

router.post('/', [authJwt.verifyToken], mediumContactsCtrl.createContact)

router.put('/:contactId', [authJwt.verifyToken], mediumContactsCtrl.updateContactById)

export default router;