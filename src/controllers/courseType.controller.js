import CourseType from "../models/CourseType";
import { generateUTCToLimaDate } from "../utils/formats";

export const getCourseTypes = async (req, res) => {
  const limit = parseInt(req.query.limit || 100);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;
  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
  };
  // const coursesTypes = await CourseType.find().sort({ name: "asc" });
  const coursesTypes = await CourseType.paginate(
    {
      $or: [{ name: { $regex: ".*" + filter + ".*", $options: "i" } }],
      status: typeof status === "number" ? status : [0, 1],
    },
    options
  );
  res.status(200).json({ status: 200, ...coursesTypes });
};

export const createCourseType = async (req, res) => {
  try {
    const { code, name, description, status } = req.body;

    const newCourseType = new CourseType({
      code,
      name,
      description,
      status,
      createdAt: generateUTCToLimaDate(),
      updatedAt: generateUTCToLimaDate()
    });

    const savedCourseType = await newCourseType.save();

    res.status(201).json({ status: 201, doc: savedCourseType });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó el tipo de curso" });
  }
};

export const getCourseTypeById = async (req, res) => {
  const courseType = await CourseType.findById(req.params.courseTypeId);
  res.status(200).json({ status: 200, doc: courseType });
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
    res.status(200).json({ status: 200, doc: updateCourseType });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el tipo de curso" });
  }
};
