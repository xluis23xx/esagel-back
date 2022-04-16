import Course from "../models/Course"

export const createCourse = async (req, res) => {

    const {name, category, price, imgURL} = req.body

    const newCourse = new Course({name, category, price, imgURL});

    const courseSaved = await newCourse.save()

    res.status(201).json(courseSaved)
}

export const getCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses)
}

export const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.status(200).json(course)
}

export const updateCourseById = async (req, res) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
        new: true
    })
    res.status(200).json(updatedCourse)
}

export const deleteCourseById = async (req, res) => {
    const {courseId} = req.params;
    await Course.findByIdAndDelete(courseId)
    res.status(204).json()
}