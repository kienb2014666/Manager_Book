const Publisher = require("../models/PublisherModel");


const createPub = (newPublisher) => {
  return new Promise(async (resolve, reject) => {
    const { name, address } = newPublisher;
    try {
      const checkPub = await Publisher.findOne({
        name: name,
      });
      if (checkPub !== null) {
        resolve({
          status: "Err",
          message: "The name is already",
        });
      }
      const createdPub = await Publisher.create({
        name,
        address
      });
      if (createdPub) {
        resolve({
          status: "True",
          message: "create publisher success",
          data: createdPub,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updatePub = (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkPub = await Publisher.findOne({
          _id: id,
        });
        if (checkPub === null) {
          resolve({
            status: "OK",
            message: "The Pub is not defined",
          });
        }
  
        const updatedPub = await Publisher.findByIdAndUpdate(id, data, {
          new: true,
        });
  
        resolve({
          status: "OK",
          message: "Updated Pub success",
          data: updatedPub,
        });
      } catch (e) {
        reject(e);
      }
    });
  };
  
  const deletePub = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkPub = await Publisher.findOne({
          _id: id,
        });
        if (checkPub === null) {
          resolve({
            status: "OK",
            message: "The Pub is not defined",
          });
        }
  
        await Publisher.findByIdAndDelete(id);
  
        resolve({
          status: "OK",
          message: "Delete pub success",
        });
      } catch (e) {
        reject(e);
      }
    });
  };
  const getAllPub = async() => {
    return new Promise(async (resolve, reject) => {
    try {
      const pubs = await Publisher.find();
      resolve({
        status: "OK",
        message: "Success",
        data: pubs,
      });
    } catch (e) {
      reject(e);
    }
    });
  }
  const getdetailsPub = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pub = await Publisher.findOne({
          _id: id,
        });
        if (pub === null) {
          resolve({
            status: "OK",
            message: "The pub is not defined in db",
          });
        }
        resolve({
          status: "OK",
          message: "Get details pub success",
          data: pub,
        });
      } catch (e) {
        reject(e);
      }
    });
  };
module.exports = {
  createPub,
  updatePub,
  deletePub,
  getAllPub,
  getdetailsPub
};
