import React, { useState } from 'react';

const AdminDashboard = ({ equipmentList, addEquipment, updateEquipment, deleteEquipment, assignEquipment, trackEquipmentUsage, scheduleMaintenance, generateReport }) => {
  const [newEquipment, setNewEquipment] = useState({
    name: '', description: '', category: '', serialNumber: '', purchaseDate: '', status: 'Available'
  });

  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment({ ...newEquipment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEquipment(newEquipment);
    setNewEquipment({
      name: '', description: '', category: '', serialNumber: '', purchaseDate: '', status: 'Available'
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateEquipment(selectedEquipment);
    setSelectedEquipment(null);
  };

  const handleDelete = (id) => {
    deleteEquipment(id);
  };

  const handleAssign = (e) => {
    e.preventDefault();
    const equipmentId = e.target.equipmentId.value;
    const employeeId = e.target.employeeId.value;
    const assignmentDate = e.target.assignmentDate.value;
    assignEquipment(equipmentId, employeeId, assignmentDate);
  };

  const handleScheduleMaintenance = (e) => {
    e.preventDefault();
    const equipmentId = e.target.equipmentId.value;
    const maintenanceDate = e.target.maintenanceDate.value;
    const description = e.target.description.value;
    scheduleMaintenance(equipmentId, maintenanceDate, description);
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    const reportType = e.target.reportType.value;
    const dateRange = {
      startDate: new Date(e.target.startDate.value),
      endDate: new Date(e.target.endDate.value),
    };
    const report = generateReport(reportType, dateRange);
    console.log("Generated Report:", report);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={newEquipment.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="description" value={newEquipment.description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="category" value={newEquipment.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="serialNumber" value={newEquipment.serialNumber} onChange={handleChange} placeholder="Serial Number" required />
        <input type="date" name="purchaseDate" value={newEquipment.purchaseDate} onChange={handleChange} required />
        <input type="text" name="status" value={newEquipment.status} onChange={handleChange} placeholder="Status" required />
        <button type="submit">Add Equipment</button>
      </form>

      {selectedEquipment && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" value={selectedEquipment.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="description" value={selectedEquipment.description} onChange={handleChange} placeholder="Description" required />
          <input type="text" name="category" value={selectedEquipment.category} onChange={handleChange} placeholder="Category" required />
          <input type="text" name="serialNumber" value={selectedEquipment.serialNumber} onChange={handleChange} placeholder="Serial Number" required />
          <input type="date" name="purchaseDate" value={selectedEquipment.purchaseDate} onChange={handleChange} required />
          <input type="text" name="status" value={selectedEquipment.status} onChange={handleChange} placeholder="Status" required />
          <button type="submit">Update Equipment</button>
        </form>
      )}

      <h3>Equipment List</h3>
      <ul>
        {equipmentList.map(eq => (
          <li key={eq.id}>
            {eq.name} - {eq.description} - {eq.category} - {eq.serialNumber} - {eq.purchaseDate} - {eq.status}
            <button onClick={() => setSelectedEquipment(eq)}>Edit</button>
            <button onClick={() => handleDelete(eq.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Assign Equipment</h3>
      <form onSubmit={handleAssign}>
        <select name="equipmentId">
          {equipmentList.filter(eq => eq.status === 'Available').map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <input type="text" name="employeeId" placeholder="Employee ID" required />
        <input type="date" name="assignmentDate" required />
        <button type="submit">Assign</button>
      </form>

      <h3>Schedule Maintenance</h3>
      <form onSubmit={handleScheduleMaintenance}>
        <select name="equipmentId">
          {equipmentList.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <input type="date" name="maintenanceDate" required />
        <input type="text" name="description" placeholder="Maintenance Description" required />
        <button type="submit">Schedule</button>
      </form>

      <h3>Generate Report</h3>
      <form onSubmit={handleGenerateReport}>
        <select name="reportType">
          <option value="inventory">Inventory</option>
          <option value="usage">Usage</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <input type="date" name="startDate" />
        <input type="date" name="endDate" />
        <button type="submit">Generate Report</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
