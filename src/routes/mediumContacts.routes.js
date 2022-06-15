import {Router} from 'express'
const router = Router()

import * as mediumContactsCtrl from '../controllers/mediumContacts.controller';
import { authJwt} from '../middlewares';

router.post('/consult', [authJwt.verifyToken, authJwt.isUser], mediumContactsCtrl.getContacts)

router.get('/:contactId', [authJwt.verifyToken, authJwt.isUser], mediumContactsCtrl.getContactById)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], mediumContactsCtrl.createContact)

router.put('/:contactId', [authJwt.verifyToken, authJwt.isAdmin], mediumContactsCtrl.updateContactById)

export default router;