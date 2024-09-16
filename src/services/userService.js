import axios from '../axios';
// import * as queryString from 'query-string';


const handleLoginFromService = (emailInput, passwordInput)=>{
    return axios.post('/api/login', { email: emailInput, password: passwordInput});
}
const getAllUsersAPI =(inputId)=>{
    return axios.get(`/api/get-all-users?id=${inputId}` );
}
const createNewUserFromUserService = (data)=>{
    console.log('data from userService: ', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (id)=>{
    return axios.delete(`/api/delete-user`, {
        data:{
            id: id
        }
        })
}

const editUserService=(inputData)=>{
    return axios.put(`/api/edit-user`, inputData);
}

const getAllCodeFromUserService=(inputType)=>{
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeServiceFromReact =(limit)=>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
const getAllDoctorsServiceFromReact =()=>{
    return axios.get(`/api/get-all-doctors`);
}
const saveInfoDoctorsServiceFromReact =(data)=>{
    return axios.post('/api/save-info-doctors', data)
}
const getDetailOfDoctorServiceFromReact =(id)=>{
    return axios.get(`/api/get-detail-doctor?id=${id}`)
}
const saveBulkDoctorServiceFromReact =(data)=>{
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorServiceFromReact =(doctorId, date)=>{
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInfoDoctorByIdServiceFromReact =(doctorId)=>{
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorByIdServiceFromReact =(doctorId)=>{
    return axios.get(`/api/get-profile-doctor-by-id?id=${doctorId}`)
}
const postPatientBookingServiceFromReact =(data)=>{
    return axios.post(`/api/patient-booking-appointment`,data)
}

const postPatientVerifyBookingServiceFromReact =(data)=>{
    return axios.post(`/api/verify-booking-appointment`,data)
}

//specialty API
const createNewSpecialtyServiceFromReact =(data)=>{
    return axios.post(`/api/create-new-specialty`,data)
}
const getAllSpecialtiesServiceFromReact =()=>{
    return axios.get(`/api/get-all-specialties`);
}
const getDetailSpecialtyByIdServiceFromReact =(data)=>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

//clinic API
const createNewClinicServiceFromReact =(data)=>{
    return axios.post(`/api/create-new-clinic`,data)
}
const getAllClinicsServiceFromReact =()=>{
    return axios.get(`/api/get-all-clinics`);
}
const getDetailClinicByIdServiceFromReact =(data)=>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}
//get patient appointment for doctor
const getAllPatientForDoctorServiceFromReact =(data)=>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const sendRemedyServiceFromReact =(data)=>{
    return axios.post(`/api/send-remedy`, data)
}
export {handleLoginFromService, getAllUsersAPI, 
    createNewUserFromUserService, deleteUserService,
    editUserService, getAllCodeFromUserService,
    getTopDoctorHomeServiceFromReact,
    getAllDoctorsServiceFromReact,
    saveInfoDoctorsServiceFromReact,
    getDetailOfDoctorServiceFromReact,
    saveBulkDoctorServiceFromReact,
    getScheduleDoctorServiceFromReact,
    getExtraInfoDoctorByIdServiceFromReact,
    getProfileDoctorByIdServiceFromReact,
    postPatientBookingServiceFromReact,
    postPatientVerifyBookingServiceFromReact,

    createNewSpecialtyServiceFromReact,
    getAllSpecialtiesServiceFromReact,
    getDetailSpecialtyByIdServiceFromReact,
    
    createNewClinicServiceFromReact,
    getAllClinicsServiceFromReact,
    getDetailClinicByIdServiceFromReact,
    getAllPatientForDoctorServiceFromReact,
    sendRemedyServiceFromReact,

};