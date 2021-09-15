import SidebarNutritionist from 'components/SidebarNutritionist';
import React from 'react';

const DashboardNutritionistAppointments = () => {
  return (
    <div className="dashboard-nutritionist">
      <div className="dashboard-nutritionist-left">
        <SidebarNutritionist />
      </div>
      <div className="dashboard-nutritionist-right">
        <h1>Create appointment</h1>
      </div>
    </div>
  );
};

export default DashboardNutritionistAppointments;