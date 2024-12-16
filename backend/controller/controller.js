import { pool } from '../config/dbconfig.js';  
import * as employeeQueries from '../queries/query.js';

export const createEmployee = async (req, res) => {
  const { Name, Email, Phone_NO, Joining_Date, Role, Department } = req.body;

  if (!Name || !Email || !Phone_NO || !Joining_Date || !Role || !Department) {
    return res.status(400).json({ error: 'All fields are required: Name, Email, Phone_NO, Joining_Date, Role, Department' });
  }

  try {
    
    const emailCheckQuery = `SELECT * FROM "EmployeeDetails" WHERE "Email" = $1`;
    const emailCheckResult = await pool.query(emailCheckQuery, [Email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    
    const phoneCheckQuery = `SELECT * FROM "EmployeeDetails" WHERE "Phone_NO" = $1`;
    const phoneCheckResult = await pool.query(phoneCheckQuery, [Phone_NO]);

    if (phoneCheckResult.rows.length > 0) {
      return res.status(400).json({ error: 'Phone number is already in use.' });
    }

    
    const insertQuery = `
      INSERT INTO "EmployeeDetails"("Name", "Email", "Phone_NO", "Department", "Joining_Date", "Role")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    
    const values = [Name, Email, Phone_NO, Department, Joining_Date, Role];

    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('Error inserting employee:', err.message);
    res.status(500).json({ error: err.message });
  }
};


export const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(employeeQueries.getAllEmployees);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(employeeQueries.getEmployeeById, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_no, department, joining_date, role } = req.body;
  try {
    const result = await pool.query(employeeQueries.updateEmployee, [
      name,
      email,
      phone_no,
      department,
      joining_date,
      role,
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(employeeQueries.deleteEmployee, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllEmployee = async (req, res) => {
  try {
    const result = await pool.query(employeeQueries.deleteAllEmployee);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No employees found to delete' });
    }
    res.status(200).json({ message: 'All employees deleted successfully' });
  } catch (error) {
    console.error('Error deleting all employees:', error.message);
    res.status(500).json({ error: error.message });
  }
};

