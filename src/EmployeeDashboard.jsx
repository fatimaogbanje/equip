import React from 'react';

const EmployeeDashboard = ({ viewAssignedEquipment, requestMaintenance, employeeId }) => {
  const assignedEquipment = viewAssignedEquipment(employeeId);

  const handleRequestMaintenance = (equipmentId) => {
    const description = prompt('Enter maintenance description:');
    if (description) {
      requestMaintenance(equipmentId, description);
    }
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <h3>Assigned Equipment</h3>
      <ul>
        {assignedEquipment.map(eq => (
          <li key={eq.id}>
            {eq.name} - {eq.description} - {eq.category} - {eq.serialNumber} - {eq.purchaseDate} - {eq.status}
            <button onClick={() => handleRequestMaintenance(eq.id)}>Request Maintenance</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
