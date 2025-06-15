import { Router } from 'express';
import EmployeeController from '../controllers/employeeController';

const router = Router();
const employeeController = new EmployeeController();

export function setEmployeeRoutes(app) {
    app.use('/api/employees', router);
    
    router.post('/', employeeController.createEmployee.bind(employeeController));
    router.get('/:id', employeeController.getEmployee.bind(employeeController));
    router.put('/:id', employeeController.updateEmployee.bind(employeeController));
    router.delete('/:id', employeeController.deleteEmployee.bind(employeeController));
}