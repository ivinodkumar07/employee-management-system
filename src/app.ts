import express from 'express';
import { setEmployeeRoutes } from './routes/employeeRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setEmployeeRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});