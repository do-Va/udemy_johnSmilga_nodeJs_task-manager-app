const Task = require('../models/task');

const getAllTasks = async (req, res) => {
  try {
    // Veritabanındaki task koleksiyonu içerisindeki tüm belgeleri bulur.
    const tasks = await Task.find({});

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    // Task koleksiyonun içerisinde paramsdan gelen id ile aynı id'ye sahip elemanı bul.
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    // Silinecek elemanı bulur ve sildikten sonra o elemanı geri döner.
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
};
