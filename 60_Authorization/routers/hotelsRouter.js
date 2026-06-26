const express = require("express");
const hotelsController = require("../controller/hotelsController");
const authController = require("../controller/authController");

const hotelRouter = express.Router();

// get featured hotels
hotelRouter.route("/get-featured").get(hotelsController.getFeaturedHotels);

// get hotels by city
hotelRouter.route("/get-hotels-by-city").get(hotelsController.getHotelByCity);

// get hotels by type
hotelRouter.route("/get-hotels-by-type").get(hotelsController.getHotelByType);

hotelRouter
  .route("/")
  .get(hotelsController.getAll)
  .post(authController.isAuthenticated, hotelsController.create);

hotelRouter
  .route("/:id")
  .get(hotelsController.getByID)
  .patch(authController.isAuthenticated, hotelsController.update)
  .delete(authController.isAuthenticated, hotelsController.deleteHotel);

module.exports = hotelRouter;
