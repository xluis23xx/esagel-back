import Course from "../models/Course";
import CourseType from "../models/CourseType";

export const createCourse = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      modality,
      price,
      image,
      vacanciesNumber,
      courseType,
      status,
      courseLines,
    } = req.body;

    const newCourse = new Course({
      code,
      name,
      description,
      modality,
      price,
      image,
      vacanciesNumber,
      status,
      courseLines,
    });

    const foundCourseTypes = await CourseType.find({
      name: { $in: courseType },
    });

    if (!foundCourseTypes.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Tipo de curso no encontrado" });

    newCourse.courseType = foundCourseTypes[0];

    if (!courseLines.length > 0)
      return res
        .status(400)
        .json({ status: 400, message: "Debe seleccionarse un tema" });

    newCourse.courseLines = courseLines.map((topic) => topic._id);

    const savedCourse = await newCourse.save();

    res.status(201).json({ status: 201, savedCourse });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const getCourses = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
    populate: [
      {
        path: "courseType",
      },
      {
        path: "courseLines",
      },
    ],
  };
  const courses = await Course.paginate(
    {
      $or: [
        { code: { $regex: ".*" + filter + ".*", $options: "i" } },
        { name: { $regex: ".*" + filter + ".*", $options: "i" } },
      ],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...courses });
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.courseId)
    .populate("courseType")
    .populate("courseLines");
  res.status(200).json({ status: 200, doc: course });
};

export const updateCourseById = async (req, res) => {
  try {
    let updatedCourse = null;
    if (req.body?.isDelete) {
      updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        req.body,
        {
          new: true,
        }
      ).populate("courseType");
    } else {
      const foundCourseTypes = await CourseType.find({
        name: { $in: req.body.courseType },
      });
      if (!foundCourseTypes.length > 0)
        return res
          .status(400)
          .json({ status: 400, message: "Tipo de curso no encontrado" });

      req.body.courseType = foundCourseTypes[0]._id;
      updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        req.body,
        {
          new: true,
        }
      ).populate("courseType");
    }
    res.status(200).json({ status: 200, updatedCourse });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se actualizó el curso" });
  }
};

export const deleteCourseById = async (req, res) => {
  const { courseId } = req.params;
  await Course.findByIdAndDelete(courseId);
  res.status(204).json();
};
