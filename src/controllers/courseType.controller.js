import CourseType from "../models/CourseType";

export const getCourseTypes = async (req, res) => {
  const coursesTypes = await CourseType.find().sort({ name: "asc" });
  res.status(200).json({ status: 200, coursesTypes});
};

export const createCourseType = async (req, res) => {
  try {
    const { code, name, description, status } = req.body;

    const newCourseType = new CourseType({
      code,
      name,
      description,
      status,
    });

    const savedCourseType = await newCourseType.save();

    res.status(201).json({ status: 201, savedCourseType });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó el tipo de curso" });
  }
};

export const getCourseTypeById = async (req, res) => {
  const courseType = await CourseType.findById(req.params.courseTypeId);
  res.status(200).json({ status: 200, courseType });
};

export const updateCourseTypeById = async (req, res) => {
  try {
    const updateCourseType = await CourseType.findByIdAndUpdate(
      req.params.courseTypeId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, updateCourseType });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el tipo de curso" });
  }
};
