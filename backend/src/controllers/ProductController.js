const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, author,date, pub } = req.body;

    if (!name || !image || !type || !price || !countInStock || !author || !date || !pub) {
      return res.status(200).json({
        status: "Err",
        message: "The input is required",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "Err",
        message: "The product id is required",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "Err",
        message: "The product id is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
// const getAllProduct = async (req, res) => {
//   try {
//     const products = await ProductService.getAllProduct();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
const getAllProduct = async (req, res) => {
  try {
    const { page, pageSize, sort, filter } = req.query; // Thêm 'sort' và 'filter' vào request query
    const products = await ProductService.getAllProduct(parseInt(page), parseInt(pageSize), sort, filter); // Thêm 'sort' và 'filter' vào tham số truyền vào hàm
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "Err",
        message: "The productId is required",
      });
    }
    const response = await ProductService.getdetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getDetailsProduct,
  getAllType,
};
