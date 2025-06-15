# Employee Management System

This is a MERN (MongoDB, Express, React, Node.js) application designed for managing employee records. It allows users to create, read, update, and delete employee information efficiently.

## Project Structure

```
mern-app
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── index.js
│   │   ├── models
│   │   │   └── index.js
│   │   ├── routes
│   │   │   └── index.js
│   │   └── config
│   │       └── db.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   └── index.js
│   │   ├── pages
│   │   │   └── Home.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database connection in `backend/src/config/db.js`.

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm start
   ```

## API Endpoints

- **GET /api/employees**: Retrieve all employees
- **POST /api/employees**: Create a new employee
- **PUT /api/employees/:id**: Update an existing employee
- **DELETE /api/employees/:id**: Delete an employee

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features.

## License

This project is licensed under the MIT License.