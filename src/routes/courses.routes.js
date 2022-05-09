import {Router} from 'express'
const router = Router()

import * as coursesCtrl from '../controllers/courses.controller';
import { authJwt } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], coursesCtrl.createCourse)

router.get('/', coursesCtrl.getCourses)

router.get('/:courseId', coursesCtrl.getCourseById)

router.put('/:courseId', [authJwt.verifyToken, authJwt.isAdmin], coursesCtrl.updateCourseById)

router.delete('/:courseId', [authJwt.verifyToken, authJwt.isAdmin], coursesCtrl.deleteCourseById)

export default router;