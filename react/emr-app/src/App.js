import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import PatientDetail from './components/PatientDetail';
import CreatePatient from './components/CreatePatient';
import Register from './components/signup';
import Login from './components/login';
import HealthFacilitiesChart from './components/HealthFacilitiesChart';  // Import the chart component

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Root path redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login page (without Navbar) */}
        <Route path="/login" element={<Login />} />
        
        {/* Signup page (without Navbar) */}
        <Route path="/signup" element={<Register />} />
        
        {/* Authenticated routes (with Navbar) */}
        <Route path="*" element={
          <>
            <Navbar />
            <div style={{ padding: '20px' }}>
              <Routes>
                <Route path="/Homepage" element={<Homepage />} />
                <Route path="/patient/:id" element={<PatientDetail />} />
                <Route path="/create-patient" element={<CreatePatient />} />
                <Route path="/health-facilities-chart" element={<HealthFacilitiesChart />} /> {/* New route for chart */}
                {/* Redirect any unknown paths to /patients */}
                <Route path="*" element={<Navigate to="/patients" replace />} />
              </Routes>
            </div>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
