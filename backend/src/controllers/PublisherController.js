const { create } = require("../models/PublisherModel");
const Publisher = require("../services/PublisherService");

const createPub = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(200).json({
        status: "Err",
        message: "The input is required",
      });
    }
    const response = await Publisher.createPub(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updatePub = async (req, res) => {
  try {
    const pubId = req.params.id;
    const data = req.body;
    if (!pubId) {
      return res.status(200).json({
        status: "Err",
        message: "The product id is required",
      });
    }
    const response = await Publisher.updatePub(pubId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deletePub = async (req, res) => {
  try {
    const pubId = req.params.id;
    if (!pubId) {
      return res.status(200).json({
        status: "Err",
        message: "The product id is required",
      });
    }
    const response = await Publisher.deletePub(pubId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


const getAllPub = async (req, res) => {
  try {
    const pubs = await Publisher.getAllPub();
    res.json(pubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getDetailsPub = async (req, res) => {
    try {
      const pubId = req.params.id;
      if (!pubId) {
        return res.status(200).json({
          status: "Err",
          message: "The productId is required",
        });
      }
      const response = await Publisher.getdetailsPub(pubId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

module.exports = {
  createPub,
  updatePub,
  deletePub,
  getAllPub,
  getDetailsPub
};
