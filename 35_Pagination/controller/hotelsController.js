const Hotel = require("../models/hotel");

// Controller function to get all hotels
const getAll = async (req, res) => {
  try {
    console.log(req.query);

    // Copy query object
    const queryObj = { ...req.query };

    // Exclude special fields
    const excludedFields = ["sort", "page", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Convert query object to string
    let queryStr = JSON.stringify(queryObj);

    // Replace operators with MongoDB operators
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // Convert back to object
    const query = JSON.parse(queryStr);

    console.log(query);
    let queryResult = Hotel.find(query);

    // Sorting Logic
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryResult = queryResult.sort(sortBy);
    } else {
      queryResult = queryResult.sort("cheapestPrice");
    }

    // Pagination Logic
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    queryResult = queryResult.skip(skip).limit(limit);
    if (req.query.page) {
      const totalHotels = await Hotel.countDocuments(query);
      if (skip >= totalHotels) {
        return res.status(400).json({
          status: "fail",
          message: "Page not found",
        });
      }
    }

    const hotels = await queryResult;

    res.status(200).json({
      status: "success",
      count: hotels.length,
      data: {
        hotels: hotels,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Somthing went wrong",
    });
  }
};

// Controller function to create a new hotel
const create = async (req, res) => {
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
    res.status(400).json({
      status: "fail",
      message: "Somthing went wrong" + error.message,
    });
  }
};

// Controller function to get a hotel by ID
const getByID = async (req, res) => {
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
    res.status(400).json({
      status: "fail",
      message: "Somthing went wrong",
    });
  }
};

// Controller function to update a hotel by ID
const update = async (req, res) => {
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
    res.status(400).json({
      status: "fail",
      message: "Somthing went wrong",
    });
  }
};

// Controller function to delete a hotel by ID
const deleteHotel = async (req, res) => {
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
    res.status(400).json({
      status: "fail",
      message: "Somthing went wrong",
    });
  }
};

module.exports = {
  getAll,
  create,
  getByID,
  update,
  deleteHotel,
};
