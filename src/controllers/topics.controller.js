import Topic from "../models/Topic";

export const getTopics = async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
};

export const createTopic = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const newTopic = new Topic({
      name,
      description,
      status
    });

    const savedTopic = await newTopic.save();

    res.status(201).json({ status: 201, savedTopic });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se creó el tema" });
  }
};

export const getTopicById = async (req, res) => {
  const topic = await Topic.findById(req.params.topicId);
  res.status(200).json(topic);
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
    res.status(200).json({ status: 200, updateTopic });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "No se actualizó el tema" });
  }
};