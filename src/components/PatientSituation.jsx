import React from 'react';

const PatientSituation = ({appointment}) => {
  return (
    <div className="patient-situation text-primary-color">
      <div className="patient-situation-header mx-3 p-2">
        <h2 className="my-1">Derniers relevés</h2>
        <small className="my-1">
          Découvrez ci-dessous les relevés pris par votre praticien lors de
          votre dernier rendez-vous
        </small>
      </div>
      <div className="details-container mx-3 p-3 col-lg-6 col-sm-12">
        <div className="data-columns row mx-3">
          <div className="left-details col-lg-6 col-sm-12">
            <table class="table patient-table">
              <thead>
                <tr>
                  <th scope="col">Mesure</th>
                  <th scope="col">Valeur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Taille</th>
                  <td>{appointment.height} m</td>
                </tr>
                <tr>
                  <th scope="row">Poids</th>
                  <td>{appointment.weight} kg</td>
                </tr>
                <tr>
                  <th scope="row">IMC</th>
                  <td>{appointment.BMI.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="right-details col-lg-6 col-sm-12">
            <table class="table patient-table">
              <thead>
                <tr>
                  <th scope="col">Mesure</th>
                  <th scope="col">Valeur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Masse musculaire</th>
                  <td>{appointment.muscle_mass} %</td>
                </tr>
                <tr>
                  <th scope="row">Masse graisseuse</th>
                  <td>{appointment.body_fat} %</td>
                </tr>
                <tr>
                  <th scope="row">Graisse viscérale</th>
                  <td>{appointment.visceral_fat} %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSituation;