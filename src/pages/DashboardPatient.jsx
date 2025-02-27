import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { appointmentsFetch } from 'services/apiManager';
import SidebarPatient from "components/SidebarPatient";
import PatientSituation from "components/PatientSituation";
import PatientCharts from "components/PatientCharts";
import PwaModal from 'components/PwaModal';
import { patientFetch } from 'services/apiManager';
import CalendlyBtn from 'components/CalendlyBtn';
import ProfileToCompleteModal from 'components/ProfileToCompleteModal';

const DashboardPatient = () => {
  const dispatch = useDispatch()
  const patient_id = parseInt(Cookies.get("patient_id_cookie"))
  const appointments = useSelector(state => state.appointments.appointments)
  const [filteredAppointments, setFilteredAppointments] = useState()
  const [lastAppointment,setLastAppointment] = useState()
  const currentPatient = useSelector(state => state.patient.currentPatient)

  useEffect(() => {
    dispatch(appointmentsFetch())
    dispatch(patientFetch())
  }, [])

  const filter = () => {
    setFilteredAppointments(
      appointments
        .filter((el) => el.patient_id === patient_id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };

  useEffect(() => {
    filteredAppointments && setLastAppointment(filteredAppointments[0])
  },[filteredAppointments])

  useEffect(() => {
    appointments && filter()
  }, [appointments])

  return (
    <div className="dashboard-page page-padding">
      {currentPatient.nutritionist ? (
        <CalendlyBtn slug={currentPatient.nutritionist.slug_calendly} />
      ) : (
        <ProfileToCompleteModal />
      )}
      {!window.matchMedia("(display-mode: standalone)").matches && <PwaModal />}
      <div className="dashboard-page-left">
        <SidebarPatient />
      </div>
      <div className="dashboard-page-right">
        <h1 className="mx-5 my-2 text-primary-color">
          Bienvenue sur votre dashboard{" "}
          {lastAppointment && lastAppointment.first_name}
        </h1>
        <div className="mx-5 my-4">
          {lastAppointment && (
            <PatientSituation appointment={lastAppointment} />
          )}
        </div>
        <div>
          {filteredAppointments && (
            <PatientCharts appointments={filteredAppointments} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPatient;