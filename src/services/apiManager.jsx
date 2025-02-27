import Cookies from "js-cookie";
import { deleteAppointmentFailure, deleteAppointmentRequest, deleteAppointmentSuccess, fetchAppointmentsSuccess, fetchAppointmentsFailure } from "store/actions/appointmentActions";
import { createAppointmentFailure, createAppointmentSuccess, createAppointmentRequest, fetchAppointmentsRequest } from "store/actions/appointmentActions";
import { fetchNutritionistLoginFailure, fetchNutritionistLoginLogout, fetchNutritionistLoginRequest, fetchNutritionistLoginSuccess } from "store/actions/nutritionistActions";
import { fetchNutritionistRegisterFailure, fetchNutritionistRegisterRequest, fetchNutritionistRegisterSuccess, fetchNutritionistRegisterUnregister } from "store/actions/nutritionistActions";
import { fetchNutritionistDeleteFailure, fetchNutritionistDeleteRequest, fetchNutritionistDeleteSuccess } from "store/actions/nutritionistActions";
import { fetchNutritionistUpdateFailure, fetchNutritionistUpdateRequest, fetchNutritionistUpdateSuccess } from "store/actions/nutritionistActions";
import { fetchNutritionistsFailure, fetchNutritionistsRequest, fetchNutritionistsSuccess } from "store/actions/nutritionistActions";
import { fetchPatientUpdateFailure, fetchPatientUpdateRequest, fetchPatientUpdateSuccess } from "store/actions/patientActions";
import { fetchOnePatientsRequest } from "store/actions/patientActions";
import { fetchOnePatientsFailure } from "store/actions/patientActions";
import { fetchOnePatientsSuccess } from "store/actions/patientActions";
import { fetchPatientDeleteFailure, fetchPatientDeleteSuccess, fetchPatientDeleteRequest } from "store/actions/patientActions";
import { fetchPatientLoginFailure, fetchPatientLoginLogout, fetchPatientLoginRequest, fetchPatientLoginSuccess } from "store/actions/patientActions";
import { fetchPatientRegisterFailure, fetchPatientRegisterRequest, fetchPatientRegisterSuccess, fetchPatientRegisterUnregister } from "store/actions/patientActions";
import { fetchPatientsFailure, fetchPatientsRequest, fetchPatientsSuccess } from "store/actions/patientActions";



const baseUrl = "https://follownut-back.herokuapp.com";

// ------------------------------------------------------------------------------------------
// -------------------- BELOW ARE ALL THE NUTRITIONIST RELATED FUNCTIONS --------------------
// ------------------------------------------------------------------------------------------

// BELOW IS THE FUNCTION TO CREATE A NEW NUTRITIONIST
export const nutritionistRegisterFetch = (nutritionistData) => {
  return (dispatch) => {
    let token
    dispatch(fetchNutritionistRegisterRequest());
    fetch(baseUrl + "/api/nutritionist/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(nutritionistData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
          token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json()
      })
      .then((response ) => {
        if (response.errors || response.error) {
          console.log(response);
          dispatch(fetchNutritionistRegisterFailure(response));
        } else {
          Cookies.set("nutritionist_token_cookie", token);
          Cookies.set("nutritionist_id_cookie", response.data.id);
          dispatch(fetchNutritionistRegisterSuccess(response));
        }
      });
  };
};


// BELOW IS THE FUNCTION TO LOG IN A NUTRITIONIST
export const nutritionistLoginFetch = (nutritionistData) => {

  return (dispatch) => {
    let token;
    dispatch(fetchNutritionistLoginRequest());
    fetch(baseUrl + "/api/nutritionist/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nutritionistData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
        token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json();
      })
      .then((response) => {
        if (response.errors || response.error) {
          dispatch(fetchNutritionistLoginFailure(response.error));
        } else {
          Cookies.set("nutritionist_token_cookie", token);
          Cookies.set('nutritionist_id_cookie',response.data.id);
          dispatch(fetchNutritionistLoginSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO LOG IN A NUTRITIONIST WITH COOKIES
export const loginNutritionistWithCookie = async() =>{
  const token = Cookies.get('nutritionist_token_cookie');
  const id = Cookies.get('nutritionist_id_cookie');

  const cookiesConfig = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(baseUrl + `/api/v1/nutritionists/${id}`, cookiesConfig)
  const cookieData = await response.json();
  if (!cookieData.error) {
    return true;
  } else {
    return false;
  }
};


// BELOW IS THE FUNCTION TO LOG OUT A NUTRITIONIST
export const nutritionistLogout = () => {
  return (dispatch) => {
    dispatch(fetchNutritionistRegisterUnregister())
    dispatch(fetchNutritionistLoginLogout())
  }
};

// BELOW IS THE FUNCTION TO FETCH ALL NUTRITIONISTS
export const nutritionistsFetch = () => {
  return (dispatch) => {
    dispatch(fetchNutritionistsRequest());
    fetch(baseUrl + "/api/v1/nutritionists", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchNutritionistsFailure(response.errors));
        } else {
          dispatch(fetchNutritionistsSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO SEND A RESET PASSWORD EMAIL TO A NUTRITIONIST
export const nutritionistPasswordForgottenFetch = (nutritionistResetEmail) => {

  return () => {
    fetch(baseUrl + "/api/nutritionist/password/forgot", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(nutritionistResetEmail),
      });
  };
};

// BELOW IS THE FUNCTION TO RESET A PASSWORD VIA EMAIL LINK FOR A NUTRITIONIST
export const nutritionistResetPasswordFetch = (newNutritionistData) => {

  return () => {
    fetch(baseUrl + "/api/nutritionist/password/reset", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newNutritionistData),
    }).then((response) => console.log(response))
  };
};







// BELOW IS THE FUNCTION TO UPDATE A NUTRITIONIST
export const updateNutritionistFetch = (nutritionistData) => {
  return (dispatch) => {
    const id = Cookies.get('nutritionist_id_cookie');
    const token = Cookies.get('nutritionist_token_cookie');
    dispatch(fetchNutritionistUpdateRequest ());

    fetch(baseUrl + `/api/v1/nutritionists/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(nutritionistData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchNutritionistUpdateFailure (response.errors)); 
        } else {
          dispatch(fetchNutritionistUpdateSuccess(response));
        }
      });
  };
};


// BELOW IS THE FUNCTION TO DELETE A NUTRITIONIST
export const deleteNutritionistFetch = () => {
  return (dispatch) => {
    const id = Cookies.get('nutritionist_id_cookie');
    const token = Cookies.get('nutritionist_token_cookie');
    dispatch(fetchNutritionistDeleteRequest ());

    fetch(baseUrl + `/api/v1/nutritionists/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchNutritionistDeleteFailure (response.errors));
        } else {
          dispatch(fetchNutritionistDeleteSuccess());
        }
      });
  };
};












// ------------------------------------------------------------------------------------------
// -------------------- BELOW ARE ALL THE PATIENT RELATED FUNCTIONS --------------------
// ------------------------------------------------------------------------------------------


// BELOW IS THE FUNCTION TO CREATE A NEW PATIENT
export const patientRegisterFetch = (patientData) => {
  return (dispatch) => {
    let token
    dispatch(fetchPatientRegisterRequest());
    fetch(baseUrl + "/api/patient/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
          token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json()
      })
      .then((response ) => {
        if (response.errors || response.error) {
          dispatch(fetchPatientRegisterFailure(response));
        } else {
          Cookies.set("patient_token_cookie", token);
          Cookies.set("patient_id_cookie", response.data.id);
          dispatch(fetchPatientRegisterSuccess(response));
        }
      });
  };
};


// BELOW IS THE FUNCTION TO LOG IN A PATIENT
export const patientLoginFetch = (patientData) => {

  return (dispatch) => {
    let token;
    dispatch(fetchPatientLoginRequest());
    fetch(baseUrl + "/api/patient/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => {
        if (response.headers.get("authorization")) {
        token = response.headers.get("authorization").split("Bearer ")[1];
        }
        return response.json();
      })
      .then((response) => {
        if (response.errors || response.error) {
          dispatch(fetchPatientLoginFailure(response.error));
        } else {
          Cookies.set("patient_token_cookie", token);
          Cookies.set('patient_id_cookie',response.data.id);
          dispatch(fetchPatientLoginSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO LOG IN A PATIENT WITH COOKIES
export const loginPatientWithCookie = async() =>{
  const token = Cookies.get('patient_token_cookie');
  const id = Cookies.get('patient_id_cookie');

  const cookiesConfig = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(baseUrl + `/api/v1/patients/${id}`, cookiesConfig)
  const cookieData = await response.json();
  if (!cookieData.error) {
    return true;
  } else {
    return false;
  }
};


// BELOW IS THE FUNCTION TO LOG OUT A PATIENT
export const patientLogout = () => {
  return (dispatch) => {
    dispatch(fetchPatientRegisterUnregister())
    dispatch(fetchPatientLoginLogout())
  }
};

// BELOW IS THE FUNCTION TO FETCH ALL PATIENTS
export const patientsFetch = () => {
  return (dispatch) => {
    dispatch(fetchPatientsRequest());
    fetch(baseUrl + "/api/v1/patients", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchPatientsFailure(response.errors));
        } else {
          dispatch(fetchPatientsSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO FETCH ONE PATIENT
export const patientFetch = () => {
  return (dispatch) => {
    const id = Cookies.get("patient_id_cookie");
    const token = Cookies.get("patient_token_cookie");
    dispatch(fetchOnePatientsRequest());
    fetch(baseUrl + `/api/v1/patients/${id}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchOnePatientsFailure(response.errors));
        } else {
          dispatch(fetchOnePatientsSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO SEND A RESET PASSWORD EMAIL TO A PATIENT
export const patientPasswordForgottenFetch = (patientResetEmail) => {
  return () => {
    fetch(baseUrl + "/api/patient/password/forgot", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(patientResetEmail),
      });
  };
};

// BELOW IS THE FUNCTION TO RESET A PASSWORD VIA EMAIL LINK FOR A PATIENT
export const patientResetPasswordFetch = (newPatientData) => {
  return () => {
    fetch(baseUrl + "/api/patient/password/reset", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPatientData),
    })
  };
};


// BELOW IS THE FUNCTION TO UPDATE A PATIENT
export const updatePatientFetch = (patientData) => {
  return (dispatch) => {
    const id = Cookies.get('patient_id_cookie');
    const token = Cookies.get('patient_token_cookie');
    dispatch(fetchPatientUpdateRequest ());

    fetch(baseUrl + `/api/v1/patients/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchPatientUpdateFailure (response.errors));
        } else {
          dispatch(fetchPatientUpdateSuccess(response));
        }
      });
  };
};


// BELOW IS THE FUNCTION TO DELETE A PATIENT
export const deletePatientFetch = () => {
  return (dispatch) => {
    const id = Cookies.get('patient_id_cookie');
    const token = Cookies.get('patient_token_cookie');
    dispatch(fetchPatientDeleteRequest ());

    fetch(baseUrl + `/api/v1/patients/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchPatientDeleteFailure (response.errors));
        } else {
          dispatch(fetchPatientDeleteSuccess());
        }
      });
  };
};



// ------------------------------------------------------------------------------------------
// -------------------- BELOW ARE ALL THE APPOINTMENTS RELATED FUNCTIONS --------------------
// ------------------------------------------------------------------------------------------

// BELOW IS THE FUNCTION TO FETCH ALL APPOINTMENTS
export const appointmentsFetch = () => {
  return (dispatch) => {
    dispatch(fetchAppointmentsRequest());
    fetch(baseUrl + "/api/v1/appointments", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(fetchAppointmentsFailure(response.errors));
        } else {
          dispatch(fetchAppointmentsSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO DELETE ONE APPOINTMENT
export const deleteAppointmentFetch = (id) => {
  return (dispatch) => {
    const token = Cookies.get("nutritionist_token_cookie");
    dispatch(deleteAppointmentRequest());
    fetch(baseUrl + `/api/v1/appointments/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(deleteAppointmentFailure(response.errors));
        } else {
          dispatch(deleteAppointmentSuccess(response));
        }
      });
  };
};

// BELOW IS THE FUNCTION TO CREATE ONE APPOINTMENT
export const createAppointment = (data) => {
  return (dispatch) => {
    const token = Cookies.get("nutritionist_token_cookie");
    dispatch(createAppointmentRequest());
    fetch(baseUrl + `/api/v1/appointments`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body:JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          dispatch(createAppointmentFailure(response.errors));
        } else {
          dispatch(createAppointmentSuccess(response));
        }
      });
  };
};

