const Hotel = require("../models/hotel");

// Controller function to get all hotels
const getAll = async (req, res) => {
  try {
    const hotels = await Hotel.find();
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
