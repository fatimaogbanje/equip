import React, { useState } from 'react';
import './App.css';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

function App() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // For simplicity, manage login here
  
  // Admin functions
  const addEquipment = (equipment) => {
    setEquipmentList([...equipmentList, { ...equipment, id: Date.now(), usage: [], status: 'Available' }]);
  };

  const updateEquipment = (updatedEquipment) => {
    setEquipmentList(equipmentList.map(e => e.id === updatedEquipment.id ? updatedEquipment : e));
  };

  const deleteEquipment = (equipmentId) => {
    setEquipmentList(equipmentList.filter(e => e.id !== equipmentId));
  };

  const assignEquipment = (equipmentId, employeeId, assignmentDate) => {
    setEquipmentList(equipmentList.map(e => e.id === equipmentId ? { ...e, assignee: employeeId, assignmentDate, status: 'Assigned' } : e));
  };

  const trackEquipmentUsage = () => {
    // This could be more complex with actual usage tracking
    return equipmentList.map(equipment => ({
      ...equipment,
      usage: equipment.usage.length // Example usage data
    }));
  };

  const scheduleMaintenance = (equipmentId, maintenanceDate, description) => {
    setEquipmentList(equipmentList.map(e => e.id === equipmentId ? { ...e, maintenanceDate, maintenanceDescription: description, status: 'Scheduled Maintenance' } : e));
  };

  const generateReport = (reportType, dateRange) => {
    // Report generation logic based on type and date range
    console.log("Generating report:", reportType, dateRange);
    switch (reportType) {
      case 'inventory':
        return equipmentList;
      case 'usage':
        return trackEquipmentUsage();
      case 'maintenance':
        return maintenanceRequests.filter(request => {
          const requestDate = new Date(request.date);
          return requestDate >= dateRange.startDate && requestDate <= dateRange.endDate;
        });
      default:
        return [];
    }
  };

  // Employee functions
  const viewAssignedEquipment = (employeeId) => {
    return equipmentList.filter(e => e.assignee === employeeId);
  };

  const requestMaintenance = (equipmentId, description) => {
    const maintenanceRequest = { equipmentId, description, date: new Date() };
    setMaintenanceRequests([...maintenanceRequests, maintenanceRequest]);
    setEquipmentList(equipmentList.map(e => e.id === equipmentId ? { ...e, status: 'Maintenance Requested' } : e));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> DEFAULTER <br />Equipment Management System</h1>
      </header>
      {currentUser ? (
        currentUser.role === 'admin' ? (
          <AdminDashboard 
            equipmentList={equipmentList} 
            addEquipment={addEquipment}
            updateEquipment={updateEquipment}
            deleteEquipment={deleteEquipment}
            assignEquipment={assignEquipment}
            trackEquipmentUsage={trackEquipmentUsage}
            scheduleMaintenance={scheduleMaintenance}
            generateReport={generateReport}
          />
        ) : (
          <EmployeeDashboard 
            equipmentList={equipmentList} 
            viewAssignedEquipment={viewAssignedEquipment}
            requestMaintenance={requestMaintenance}
            employeeId={currentUser.id}
          />
        )
      ) : (
        // Simple login for demo purposes
        <div>
          <button onClick={() => setCurrentUser({ id: 1, role: 'admin' })}>Login as Admin</button>
          <button onClick={() => setCurrentUser({ id: 2, role: 'employee' })}>Login as Employee</button>
        </div>
      )}
    </div>
  );
}

export default App;
