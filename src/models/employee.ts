class Employee {
    id: number;
    name: string;
    position: string;
    department: string;

    constructor(id: number, name: string, position: string, department: string) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.department = department;
    }
}

export default Employee;