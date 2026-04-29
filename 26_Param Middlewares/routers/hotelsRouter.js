const express = require("express");
const hotelsController = require("../controller/hotelsController");

const hotelRouter = express.Router();

hotelRouter.param("id", hotelsController.checkHotelExist);

hotelRouter
  .route("/")
  .get(hotelsController.getAll)
  .post(hotelsController.create);

hotelRouter
  .route("/:id")
  .get(hotelsController.getByID)
  .patch(hotelsController.update)
  .delete(hotelsController.deleteHotel);

module.exports = hotelRouter;
