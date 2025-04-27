import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, Paper, Box, CircularProgress, List, ListItem, ListItemText,
  TextField, Button, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

const BASE_URL = "http://localhost:8080/fhir";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [encounters, setEncounters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: { given: [''], family: '' },
    gender: '',
    birthDate: '',
    address: { line: [''], city: '', state: '', country: '' }
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const [patientResponse, encountersResponse] = await Promise.all([
          axios.get(`${BASE_URL}/Patient/${id}`),
          axios.get(`${BASE_URL}/Encounter?patient=${id}`)
        ]);
        
        setPatient(patientResponse.data);
        setEditedData({
          name: patientResponse.data.name?.[0] || { given: [''], family: '' },
          gender: patientResponse.data.gender || '',
          birthDate: patientResponse.data.birthDate || '',
          address: patientResponse.data.address?.[0] || { line: [''], city: '', state: '', country: '' }
        });
        setEncounters(encountersResponse.data.entry || []);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/Patient/${patient.id}`, {
        ...patient,
        name: [editedData.name],
        gender: editedData.gender,
        birthDate: editedData.birthDate,
        address: [editedData.address]
      });
      setIsEditing(false);
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Failed to update patient');
    }
  };

  if (loading) return <CircularProgress />;
  if (!patient) return <Typography>Patient not found</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Patient Details
        {!isEditing && (
          <Button 
            variant="contained" 
            sx={{ ml: 2 }}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </Typography>
      
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
        
        {isEditing ? (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First Name"
              value={editedData.name.given[0]}
              onChange={(e) => setEditedData({
                ...editedData,
                name: { ...editedData.name, given: [e.target.value] }
              })}
            />
            <TextField
              label="Last Name"
              value={editedData.name.family}
              onChange={(e) => setEditedData({
                ...editedData,
                name: { ...editedData.name, family: e.target.value }
              })}
            />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={editedData.gender}
                label="Gender"
                onChange={(e) => setEditedData({ ...editedData, gender: e.target.value })}
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
              value={editedData.birthDate}
              onChange={(e) => setEditedData({ ...editedData, birthDate: e.target.value })}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography>Name: {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}</Typography>
            <Typography>Gender: {patient.gender || 'Not specified'}</Typography>
            <Typography>Birth Date: {patient.birthDate || 'Unknown'}</Typography>
            {patient.address?.[0] && (
              <Typography>
                Address: {patient.address[0].line?.join(', ')}, {patient.address[0].city}, {patient.address[0].state}, {patient.address[0].country}
              </Typography>
            )}
          </>
        )}
      </Paper>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>Encounters</Typography>
        {encounters.length > 0 ? (
          <List>
            {encounters.map((encounter, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Type: ${encounter.resource.type?.[0]?.text || 'Unknown'}`}
                  secondary={`Date: ${encounter.resource.period?.start || 'Unknown'} - Status: ${encounter.resource.status}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No encounters found</Typography>
        )}
        <Button 
          variant="outlined" 
          sx={{ mt: 2 }}
          onClick={() => navigate(`/patient/${id}/add-encounter`)}
        >
          Add Encounter
        </Button>
      </Paper>
    </Box>
  );
};

export default PatientDetail;