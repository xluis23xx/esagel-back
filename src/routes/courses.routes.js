import {Router} from 'express'
const router = Router()

import * as coursesCtrl from '../controllers/courses.controller';
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isUser], coursesCtrl.createCourse)

router.get('/',[authJwt.verifyToken, authJwt.isUser], coursesCtrl.getCourses)

router.get('/:courseId', coursesCtrl.getCourseById)

router.put('/:courseId', [authJwt.verifyToken, authJwt.isUser], coursesCtrl.updateCourseById)

router.delete('/:courseId', [authJwt.verifyToken, authJwt.isUser], coursesCtrl.deleteCourseById)

export default router;