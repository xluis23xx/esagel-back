import {Router} from 'express'
const router = Router()

import * as topicsCtrl from '../controllers/topics.controller';
import { authJwt} from '../middlewares';

router.post('/consult', [authJwt.verifyToken, authJwt.isUser], topicsCtrl.getTopics)

router.get('/:topicId', [authJwt.verifyToken, authJwt.isUser], topicsCtrl.getTopicById)

router.post('/', [authJwt.verifyToken, authJwt.isUser], topicsCtrl.createTopic)

router.put('/:topicId', [authJwt.verifyToken, authJwt.isUser], topicsCtrl.updateTopicById)

export default router;