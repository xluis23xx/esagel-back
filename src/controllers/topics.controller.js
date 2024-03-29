import Topic from "../models/Topic";
import { generateUTCToLimaDate } from "../utils/formats";

export const getTopics = async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const page = parseInt(req.query.pageSize || 1);
  const { filter, status } = req.body;

  const options = {
    limit,
    page: page,
    sort: { name: "asc" },
  };

  const topics = await Topic.paginate(
    {
      $or: [
        {
          name: { $regex: ".*" + filter + ".*", $options: "i" },
        },
      ],
      status: typeof status === "number" ? status : [0, 1]
    },
    options
  );
  // const topics = await Topic.find();
  res.status(200).json({ status: 200, ...topics });
};

export const createTopic = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const newTopic = new Topic({
      name,
      description,
      status,
      createdAt: generateUTCToLimaDate(),
      updatedAt: generateUTCToLimaDate()
    });

    const savedTopic = await newTopic.save();

    res.status(201).json({ status: 201, doc: savedTopic });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se creó el tema" });
  }
};

export const getTopicById = async (req, res) => {
  const topic = await Topic.findById(req.params.topicId);
  res.status(200).json({ status: 200, doc: topic });
};

export const updateTopicById = async (req, res) => {
  try {
    const updateTopic = await Topic.findByIdAndUpdate(
      req.params.topicId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ status: 200, doc: updateTopic });
  } catch (error) {
    res.status(400).json({ status: 400, message: "No se actualizó el tema" });
  }
};
