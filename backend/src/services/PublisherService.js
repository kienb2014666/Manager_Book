const Publisher = require("../models/PublisherModel");

const createPublisher = (newPublisher) => {
  return new Promise(async (resolve, reject) => {
    const { name,address } = newPublisher;
    try {
      const checkPublisher = await Publisher.findOne({
        name: name,
      });
      if (checkPublisher !== null) {
        resolve({
          status: "Err",
          message: "The name Publisher is already",
        });
      }
      const newPublisher = await Publisher.create({
        name,
        address
      });
      if (newPublisher) {
        resolve({
          status: "True",
          message: "Create Publisher success",
          data: newPublisher,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updatePublisher = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The publisher is not defined",
        });
      }

   const updatedPublisher = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Updated Publisher success",
        data: updatedPublisher,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deletePublisher = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPublisher = await Publisher.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The publisher is not defined",
        });
      }

      await Publisher.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Delete publisher success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllPublisher = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalPublisher = await Publisher.count();
      let allPublisher = [];
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Publisher.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalPublisher,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalPublisher / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allPublisherSort = await Publisher.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allPublisherSort,
          total: totalPublisher,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalPublisher / limit),
        });
      }
      if (!limit) {
        allPublisher = await Publisher.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allPublisher = await Publisher.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allPublisher,
        total: totalPublisher,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalPublisher / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  createPublisher,
  updatePublisher,
  deletePublisher,
  getAllPublisher
};