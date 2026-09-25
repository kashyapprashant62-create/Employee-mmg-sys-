const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// GET /employee?_page=1&_per_page=5
router.get("/", getAllEmployees);

// GET /employee/:id
router.get("/:id", getEmployeeById);

// POST /employee
router.post("/", createEmployee);

// PUT /employee/:id
router.put("/:id", updateEmployee);

// DELETE /employee/:id
router.delete("/:id", deleteEmployee);

module.exports = router;
