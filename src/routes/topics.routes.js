import {Router} from 'express'
const router = Router()

import * as topicsCtrl from '../controllers/topics.controller';
import { authJwt} from '../middlewares';

router.get('/', [authJwt.verifyToken], topicsCtrl.getTopics)

router.get('/:topicId', [authJwt.verifyToken], topicsCtrl.getTopicById)

router.post('/', [authJwt.verifyToken], topicsCtrl.createTopic)

router.put('/:topicId', [authJwt.verifyToken], topicsCtrl.updateTopicById)

export default router;