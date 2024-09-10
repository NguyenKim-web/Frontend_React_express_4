import axios from '../axios';
import * as queryString from 'query-string';


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
    postPatientBookingServiceFromReact

};