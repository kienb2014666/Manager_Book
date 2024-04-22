const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock , author, date, pub} = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "Err",
          message: "The name product is already",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        author,
        date,
        pub
      });
      if (newProduct) {
        resolve({
          status: "True",
          message: "Create product success",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Updated product success",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};


const getAllProduct = async (limit, page, sort, filter) => {
  try {
    let query = {};
    if (filter) {
      const [label, value] = filter;
      query[label] = { $regex: value, $options: 'i' }; // Use case-insensitive regex
    }

    const totalProduct = await Product.countDocuments(query);
    
    let sortQuery = { createdAt: -1, updatedAt: -1 }; // Default sorting
    
    if (sort) {
      const [sortDir, sortField] = sort;
      sortQuery = { [sortField]: sortDir === 'asc' ? 1 : -1, ...sortQuery };
    }

    const allProduct = await Product.find(query)
      .limit(limit)
      .skip(page * limit)
      .sort(sortQuery);

    return {
      status: "OK",
      message: "Success",
      data: allProduct,
      total: totalProduct,
      pageCurrent: Number(page + 1),
      totalPage: Math.ceil(totalProduct / limit),
    };
  } catch (e) {
    throw e;
  }
};

const getdetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not defined in db",
        });
      }
      resolve({
        status: "OK",
        message: "Get details product success",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getdetailsProduct,
  getAllType,
};
