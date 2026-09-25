const Employee = require("../models/Employee");

// GET /employee?_page=1&_per_page=5  — All employees with pagination
const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._per_page) || 5;
    const skip = (page - 1) * limit;

    const total = await Employee.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const employees = await Employee.find().skip(skip).limit(limit);

    res.json({
      data: employees,
      pages: totalPages,
      items: total,
      next: page < totalPages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌", error: err.message });
  }
};

// GET /employee/:id — Single employee
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found ❌" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error ❌", error: err.message });
  }
};

// POST /employee — Create employee
const createEmployee = async (req, res) => {
  const { firstname, lastname, email, age, designation, doj } = req.body;

  try {
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Employee email already exists ❌" });
    }

    const employee = await Employee.create({
      firstname,
      lastname,
      email,
      age,
      designation,
      doj,
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Create failed ❌", error: err.message });
  }
};

// PUT /employee/:id — Update employee
const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found ❌" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed ❌", error: err.message });
  }
};

// DELETE /employee/:id — Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found ❌" });
    }

    res.json({ message: "Employee deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed ❌", error: err.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
