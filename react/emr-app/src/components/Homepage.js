import React from 'react';
import { 
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import {
  Person,
  CalendarToday,
  Assignment,
  LocalHospital,
  Notifications,
  ArrowForward
} from '@mui/icons-material';

const Homepage = () => {
  // Sample data
  const todayAppointments = [
    { id: 1, patient: 'John Doe', time: '09:30 AM', type: 'Follow-up' },
    { id: 2, patient: 'Sarah Johnson', time: '11:15 AM', type: 'Consultation' },
    { id: 3, patient: 'Michael Chen', time: '02:00 PM', type: 'Physical Exam' }
  ];

  const quickActions = [
    { icon: <Person />, text: 'New Patient', color: 'primary' },
    { icon: <CalendarToday />, text: 'Schedule', color: 'secondary' },
    { icon: <Assignment />, text: 'Reports', color: 'success' },
    { icon: <LocalHospital />, text: 'Admit Patient', color: 'warning' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Clinical Dashboard
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<Notifications />}
            sx={{ mr: 2 }}
          >
            Alerts
          </Button>
          <Button variant="outlined">
            Today: {new Date().toLocaleDateString()}
          </Button>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outlined"
              startIcon={action.icon}
              color={action.color}
              sx={{ flex: 1, py: 2 }}
            >
              {action.text}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Today's Appointments */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Today's Appointments
          </Typography>
          <Button endIcon={<ArrowForward />}>View All</Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {todayAppointments.map(appointment => (
            <ListItem key={appointment.id} sx={{ py: 2 }}>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <Person />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={appointment.patient}
                secondary={`${appointment.time} • ${appointment.type}`}
              />
              <Button variant="text" size="small">Details</Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Stats Overview */}
      <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Patients Today
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            12
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Pending Tests
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            5
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Available Beds
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            3/24
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Homepage;