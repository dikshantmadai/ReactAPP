import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, Button, Select, MenuItem, InputLabel, 
  FormControl, Paper, Typography, Box 
} from '@mui/material';

const BASE_URL = "http://localhost:8080/fhir";

export default function CreatePatient() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: [{ given: [''], family: '' }],
    gender: '',
    birthDate: '',
    address: [{ line: [''], city: '', state: '', country: '' }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/Patient`, {
        resourceType: 'Patient',
        ...patient
      });
      alert(`Patient created with ID: ${response.data.id}`);
      navigate(`/patient/${response.data.id}`);
    } catch (error) {
      console.error('Error creating patient:', error);
      alert('Failed to create patient');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Create New Patient</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="First Name"
          required
          value={patient.name[0].given[0]}
          onChange={(e) => setPatient({
            ...patient,
            name: [{ ...patient.name[0], given: [e.target.value] }]
          })}
        />
        <TextField
          label="Last Name"
          required
          value={patient.name[0].family}
          onChange={(e) => setPatient({
            ...patient,
            name: [{ ...patient.name[0], family: e.target.value }]
          })}
        />
        <FormControl fullWidth required>
          <InputLabel>Gender</InputLabel>
          <Select
            value={patient.gender}
            label="Gender"
            onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Birth Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={patient.birthDate}
          onChange={(e) => setPatient({ ...patient, birthDate: e.target.value })}
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Address</Typography>
        <TextField
          label="Street Address"
          value={patient.address[0].line[0]}
          onChange={(e) => setPatient({
            ...patient,
            address: [{ ...patient.address[0], line: [e.target.value] }]
          })}
        />
        <TextField
          label="City"
          value={patient.address[0].city}
          onChange={(e) => setPatient({
            ...patient,
            address: [{ ...patient.address[0], city: e.target.value }]
          })}
        />
        <TextField
          label="State/Province"
          value={patient.address[0].state}
          onChange={(e) => setPatient({
            ...patient,
            address: [{ ...patient.address[0], state: e.target.value }]
          })}
        />
        <TextField
          label="Country"
          value={patient.address[0].country}
          onChange={(e) => setPatient({
            ...patient,
            address: [{ ...patient.address[0], country: e.target.value }]
          })}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
          <Button type="submit" variant="contained">Create Patient</Button>
        </Box>
      </Box>
    </Paper>
  );
}