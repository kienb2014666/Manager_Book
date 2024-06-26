const userRouter = require("./UserRouter");
const productRouter = require("./ProductRouter");
const orderRouter = require("./OrderRouter");
const pubRouter = require("./PublisherRouter")

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/pub", pubRouter);
};

module.exports = routes;
