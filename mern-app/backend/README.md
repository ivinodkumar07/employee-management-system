# Employee Management System - Backend

## Overview
This is the backend part of the Employee Management System built using the MERN stack (MongoDB, Express, React, Node.js). The backend is responsible for handling API requests, managing employee data, and connecting to the MongoDB database.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd mern-app/backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure the database**
   - Update the database connection settings in `src/config/db.js` to match your MongoDB setup.

4. **Start the server**
   ```
   npm start
   ```

## API Endpoints

- **GET /api/employees**: Retrieve a list of all employees.
- **POST /api/employees**: Create a new employee record.
- **GET /api/employees/:id**: Retrieve a specific employee by ID.
- **PUT /api/employees/:id**: Update an existing employee record.
- **DELETE /api/employees/:id**: Delete an employee record.

## Folder Structure
- `src/app.js`: Entry point of the application.
- `src/controllers/index.js`: Contains the logic for handling API requests.
- `src/models/index.js`: Defines the Mongoose model for employee data.
- `src/routes/index.js`: Sets up the API routes.
- `src/config/db.js`: Contains the database connection logic.

## License
This project is licensed under the MIT License.