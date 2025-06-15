class EmployeeController {
    private employees: { id: number; name: string; position: string; department: string }[] = [];
    private currentId: number = 1;

    createEmployee(name: string, position: string, department: string) {
        const newEmployee = { id: this.currentId++, name, position, department };
        this.employees.push(newEmployee);
        return newEmployee;
    }

    getEmployee(id: number) {
        return this.employees.find(employee => employee.id === id);
    }

    updateEmployee(id: number, name?: string, position?: string, department?: string) {
        const employee = this.getEmployee(id);
        if (employee) {
            if (name) employee.name = name;
            if (position) employee.position = position;
            if (department) employee.department = department;
            return employee;
        }
        return null;
    }

    deleteEmployee(id: number) {
        const index = this.employees.findIndex(employee => employee.id === id);
        if (index !== -1) {
            return this.employees.splice(index, 1)[0];
        }
        return null;
    }
}

export default EmployeeController;