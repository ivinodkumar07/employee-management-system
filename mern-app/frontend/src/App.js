import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Snackbar, Alert, InputAdornment, Stack
} from '@mui/material';
import { Edit, Delete, Search, Download } from '@mui/icons-material';

const api = 'http://localhost:5000/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchEmployees = () => {
    axios.get(api)
      .then(res => setEmployees(res.data))
      .catch(() => setSnackbar({ open: true, message: 'Failed to fetch employees', severity: 'error' }));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpen = (employee = null) => {
    if (employee) {
      setEditMode(true);
      setCurrentId(employee._id);
      setForm({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        salary: employee.salary
      });
    } else {
      setEditMode(false);
      setCurrentId(null);
      setForm({ name: '', position: '', department: '', salary: '' });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios.put(`${api}/${currentId}`, { ...form, salary: Number(form.salary) })
        .then(() => {
          fetchEmployees();
          handleClose();
          setSnackbar({ open: true, message: 'Employee updated!', severity: 'success' });
        })
        .catch(() => setSnackbar({ open: true, message: 'Update failed', severity: 'error' }));
    } else {
      axios.post(api, { ...form, salary: Number(form.salary) })
        .then(() => {
          fetchEmployees();
          handleClose();
          setSnackbar({ open: true, message: 'Employee added!', severity: 'success' });
        })
        .catch(() => setSnackbar({ open: true, message: 'Add failed', severity: 'error' }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`${api}/${id}`)
        .then(() => {
          fetchEmployees();
          setSnackbar({ open: true, message: 'Employee deleted!', severity: 'success' });
        })
        .catch(() => setSnackbar({ open: true, message: 'Delete failed', severity: 'error' }));
    }
  };

  // Filter employees by name or department
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  // Download PDF function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Employee List', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Name', 'Position', 'Department', 'Salary']],
      body: filteredEmployees.map(emp => [
        emp.name, emp.position, emp.department, emp.salary
      ]),
    });
    doc.save('employees.pdf');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 3, background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Employee Management System
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            placeholder="Search by name or department"
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="success"
            startIcon={<Download />}
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Add Employee
          </Button>
        </Stack>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead sx={{ background: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Position</TableCell>
                <TableCell sx={{ color: '#fff' }}>Department</TableCell>
                <TableCell sx={{ color: '#fff' }}>Salary</TableCell>
                <TableCell align="right" sx={{ color: '#fff' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map(emp => (
                <TableRow key={emp._id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>${emp.salary}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpen(emp)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(emp._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No employees found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Position"
              name="position"
              value={form.position}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Salary"
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default App;
