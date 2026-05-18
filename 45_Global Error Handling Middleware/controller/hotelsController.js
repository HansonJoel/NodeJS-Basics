const Hotel = require("../models/hotel");

// Controller function to get all hotels
const ApiFeatures = require("../utilities/features");

const getAll = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Hotel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const hotels = await features.query;

    res.status(200).json({
      status: "success",
      count: hotels.length,
      data: {
        hotels,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to create a new hotel
const create = async (req, res, next) => {
  try {
    // const hotel = new Hotel(req.body);
    // const newHotel = await hotel.save();
    const newHotel = await Hotel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        hotel: newHotel,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to get a hotel by ID
const getByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id); // Hotel.findById(id);
    res.status(204).json({
      status: "success",
      data: {
        hotel: hotel,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to update a hotel by ID
const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        hotel: updatedHotel,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a hotel by ID
const deleteHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: {
        message: `Hotel with id ${id} has been deleted successfully`,
      },
    });
  } catch (error) {
    next(error);
  }
};

// To get all the featured hotels
const getFeaturedHotels = async (req, res, next) => {
  try {
    const featuredHotels = await Hotel.aggregate([
      { $match: { featured: true } },
      { $sort: { ratings: -1 } },
      { $limit: 4 },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        featured: featuredHotels,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get the hotels by city
const getHotelByCity = async (req, res, next) => {
  try {
    const hotelsByCity = await Hotel.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          cheapestPrice: { $min: "$cheapestPrice" },
        },
      },
      { $addFields: { type: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        hotels: hotelsByCity,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get hotels by type
const getHotelByType = async (req, res, next) => {
  try {
    const hotelsByType = await Hotel.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      { $addFields: { type: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        hotels: hotelsByType,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  getByID,
  update,
  deleteHotel,
  getFeaturedHotels,
  getHotelByCity,
  getHotelByType,
};
