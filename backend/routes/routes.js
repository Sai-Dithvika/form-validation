import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  deleteAllEmployee,
} from '../controller/controller.js';

const router = express.Router();


router.delete('/all', deleteAllEmployee);


router.delete('/:id', deleteEmployee);
router.post('/', createEmployee);  
router.get('/', getAllEmployees); 
router.get('/:id', getEmployeeById); 
router.put('/:id', updateEmployee);  

export default router;
