import React from 'react';
import { Link } from 'react-router-dom';

const SidebarNutritionist = () => {
  return (
    <div className="sidebar-nutritionist">
      <Link
        to="/nutritionist-dashboard"
        className="sidebar-nutritionist-link">
        <i class="fas fa-calendar-check"></i>
        Rendez-vous
      </Link>
      <Link
        to="/nutritionist-dashboard/patients"
        className="sidebar-nutritionist-link"
      >
        <i class="fas fa-users"></i>
        Patientèle
      </Link>
      <Link
        to="/nutritionist-dashboard/appointments"
        className="sidebar-nutritionist-link"
      >
        <i class="fas fa-plus-circle"></i>
        Créer un compte-rendu
      </Link>
    </div>
  );
};

export default SidebarNutritionist;