const PublisherService = require("../services/PublisherService");

const createPublisher = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(200).json({
        status: "Err",
        message: "The input is required",
      });
    }
    const response = await PublisherService.createPublisher(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updatePublisher = async (req, res) => {
  try {
    const PublisherId = req.params.id;
    const data = req.body;
    if (!PublisherId) {
      return res.status(200).json({
        status: "Err",
        message: "The Publisher id is required",
      });
    }
    const response = await PublisherService.updatePublisher(PublisherId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deletePublisher = async (req, res) => {
  try {
    const PublisherId = req.params.id;
    if (!PublisherId) {
      return res.status(200).json({
        status: "Err",
        message: "The Publisher id is required",
      });
    }
    const response = await PublisherService.deletePublisher(PublisherId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllPublisher = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await PublisherService.getAllPublisher(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};



module.exports = {
  createPublisher,
  updatePublisher,
  deletePublisher,
  getAllPublisher,
};