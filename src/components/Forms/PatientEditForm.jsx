import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updatePatientFetch } from 'services/apiManager';


const PatientEditForm = ({patientData,nutritionists}) => {
  const {first_name, last_name, email} = patientData

  const [fname, setFname] = useState(first_name);
  const [nutritionistId, setNutritionistId] = useState();
  const [lname, setLname] = useState(last_name);
  const [mail, setMail] = useState(email);
  const [pword, setPword] = useState();
  const [pwordConfirmation, setPwordConfirmation] = useState();
  const dispatch = useDispatch();
  const history = useHistory()

  const updateDataPatient = (e) => {
    e.preventDefault()
    if (pwdCorrect()) {
      const data = {
        patient: {
          first_name: fname,
          nutritionist_id: nutritionistId,
          last_name: lname,
          email: mail,
          password: pword,
          password_confirmation: pwordConfirmation
        },
      };
      dispatch(updatePatientFetch(data))
      setTimeout(() => {
        history.push("/patient-profile");
      },300)  
    } else {
      alert("Les mots de passe doivent être identique")
    }
  }

  const pwdCorrect = () => {
    if (pword === pwordConfirmation) {
      return true
    } else {
      return false
    }
  }


  return (
    <>
    <form className="col-md-5 border-right" onSubmit={updateDataPatient}>
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Réglage du profil</h4>
          </div>
          <select onChange={(e) => setNutritionistId(e.target.value)}class="form-select" aria-label="Default select example">
            <option selected>Selectionnez votre nutritionniste</option>
            {
              nutritionists.map((nutritionist) => {
                return nutritionist.last_name &&
                  (
                    <option value={nutritionist.id}>M. {nutritionist.last_name} {nutritionist.first_name && nutritionist.first_name}</option>
                  )
              })
            }
          </select>
          <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Nom</label>
                <input type="text" className="form-input-display" placeholder={lname} value={lname} onChange={(e) => setLname(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="labels">Prénom</label>
                <input type="text" className="form-input-display" placeholder={fname} value={fname} onChange={(e) => setFname(e.target.value)} />
              </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Email</label>
              <input type="text" className="form-input-display" placeholder={mail} value={mail} onChange={(e) => setMail(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label className="labels">Mot de passe (seulement pour modifier votre mot de passe)</label>
              <input type="password" className="form-input-display" placeholder="" value={pword} onChange={(e) => setPword(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label className="labels">Confirmation de mot de passe</label>
              <input type="password" className="form-input-display" placeholder="" value={pwordConfirmation} onChange={(e) => setPwordConfirmation(e.target.value)} />
            </div>            
          </div>
          <div className="mt-5 text-center">
          <input type="submit" value="Sauvegarder" className="btn success-button text-center patient-edit-profile-button w-100 mt-4" />
          </div>
        </div>
    </form>
    </>
  )
}

export default PatientEditForm;