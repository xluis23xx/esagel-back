import {Router} from 'express'
const router = Router()

import * as coursesCtrl from '../controllers/courses.controller';
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isUser], coursesCtrl.createCourse)

router.post('/consult',[authJwt.verifyToken, authJwt.isUser], coursesCtrl.getCourses)

router.get('/:courseId', [authJwt.verifyToken, authJwt.isUser], coursesCtrl.getCourseById)

router.put('/:courseId', [authJwt.verifyToken, authJwt.isUser], coursesCtrl.updateCourseById)

router.delete('/:courseId', [authJwt.verifyToken, authJwt.isUser], coursesCtrl.deleteCourseById)

export default router;