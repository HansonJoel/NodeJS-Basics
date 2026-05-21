const Hotel = require("../models/hotel");

// Controller function to get all hotels
const ApiFeatures = require("../utilities/features");
const AppError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");

const getAll = catchAsync(async (req, res, next) => {
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
});

// Controller function to create a new hotel
const create = catchAsync(async (req, res, next) => {
  const newHotel = await Hotel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      hotel: newHotel,
    },
  });
});

// Controller function to get a hotel by ID
const getByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const hotel = await Hotel.findById(id); // Hotel.findById(id);

  if (!hotel) {
    return next(new AppError("Hotel not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      hotel: hotel,
    },
  });
});

// Controller function to update a hotel by ID
const update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const updatedHotel = await Hotel.findByIdAndUpdate({ _id: id }, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedHotel) {
    return next(new AppError("The Hotel with the given ID is not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      hotel: updatedHotel,
    },
  });
});

// Controller function to delete a hotel by ID
const deleteHotel = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedHotel = await Hotel.findByIdAndDelete(id);

  if (!deletedHotel) {
    return next(new AppError("The Hotel with the given ID is not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      message: `Hotel with id ${id} has been deleted successfully`,
    },
  });
});

// To get all the featured hotels
const getFeaturedHotels = catchAsync(async (req, res, next) => {
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
});

// Get the hotels by city
const getHotelByCity = catchAsync(async (req, res, next) => {
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
});

// Get hotels by type
const getHotelByType = catchAsync(async (req, res, next) => {
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
});

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
