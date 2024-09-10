import actionTypes from './actionTypes';
import { getAllCodeFromUserService, createNewUserFromUserService, 
    deleteUserService, getAllUsersAPI,
    editUserService, getTopDoctorHomeServiceFromReact,
    getAllDoctorsServiceFromReact,saveInfoDoctorsServiceFromReact,
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async(dispatch, getState)=>{
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeFromUserService("GENDER");
            if(res && res.errCode === 0){
                // console.log('getState la: ', getState)
                dispatch(fetchGenderSucceed(res.data));
            }else{
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', error)
            
        }
    }
}

export const fetchGenderSucceed = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCEED,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})
//position
export const fetchPositionStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async(dispatch, getState)=>{
        try {
            let res = await getAllCodeFromUserService("POSITION");
            if(res && res.errCode === 0){
                // console.log('getState la: ', getState)
                dispatch(fetchPositionSucceed(res.data));
            }else{
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', error)
            
        }
    }
}

export const fetchPositionSucceed = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCEED,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})
//role
export const fetchRoleStart = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async(dispatch, getState)=>{
        try {
            let res = await getAllCodeFromUserService("ROLE");
            if(res && res.errCode === 0){
                // console.log('getState la: ', getState)
                dispatch(fetchRoleSucceed(res.data));
            }else{
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', error)
            
        }
    }
}
export const fetchRoleSucceed = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCEED,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUser = (data) => {
    return async(dispatch, getState)=>{
        try {
            let res = await createNewUserFromUserService(data);
            console.log('check data of createNewUserFromUserService(data) from adminAction: ', res)
            if(res && res.errCode === 0){
                toast.success("Create a new user succeed");
                dispatch(saveUserSucceed());
                dispatch(fetchAllUserStart());
            }else{
                dispatch(saveUserFailed())
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log('saveUserStart error', error)
            
        }
    }
}
export const saveUserSucceed=()=>({
    type: actionTypes.CREATE_USER_SUCCEED,
})
export const saveUserFailed=()=>({
    type: actionTypes.CREATE_USER_FAILED,
})

//get all users
export const fetchAllUserStart = () => {
    return async(dispatch, getState)=>{
        try {
            let res = await getAllUsersAPI("ALL");
            
            if(res && res.errCode === 0){
                // console.log('getState la: ', getState)
                toast.success("Fetch all users succeed!");
                dispatch(fetchAllUsersSucceed(res.users.reverse()));
            }else{
                toast.error("Fetch all users error!");
                dispatch(fetchAllUsersFailed())
            }
        } catch (error) {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error', error)
            
        }
    }
}
export const fetchAllUsersSucceed=(data)=>({
    type: actionTypes.FETCH_ALL_USERS_SUCCEED,
    users: data
})
export const fetchAllUsersFailed=()=>({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
  
})

export const deleteUser = (userId) => {
    return async(dispatch, getState)=>{
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success("Delete a user succeed");
                dispatch(deleteUserSucceed());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Delete a user error!");
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            toast.error("Delete a user error!");
            dispatch(deleteUserFailed());
            console.log('deleteUser error', error)
            
        }
    }
}
export const deleteUserSucceed=()=>({
    type: actionTypes.DELETE_USER_SUCCEED,
})
export const deleteUserFailed=()=>({
    type: actionTypes.DELETE_USER_FAILED,
})
//edit
export const editUser = (data) => {
    return async(dispatch, getState)=>{
        try {
            let res = await editUserService(data);
           
            if(res && res.errCode === 0){
                toast.success("Update a user succeed");
                dispatch(editUserSucceed());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Update a user error!");
                dispatch(editUserFailed())
            }
        } catch (error) {
            toast.error("Update a user error!");
            dispatch(editUserFailed());
            console.log('EditUser error: ', error)
            
        }
    }
}
export const editUserSucceed=()=>({
    type: actionTypes.EDIT_USER_SUCCEED,
})
export const editUserFailed=()=>({
    type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = ()=>{
    return async(dispatch, getState)=>{
        try {
            let res = await getTopDoctorHomeServiceFromReact('')
            // console.log('res in react la 3 ban ghi (from adminAction): ', res)
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCEED,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
           
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}
export const fetchAllDoctors = ()=>{
    return async(dispatch, getState)=>{
        try {
            let res = await getAllDoctorsServiceFromReact()
            // console.log('res in react la 3 ban ghi (from adminAction): ', res)
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCEED,
                    dataDrs: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
           
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}
export const saveInfoDoctor = (data)=>{
    return async(dispatch, getState)=>{
        try {
            let res = await saveInfoDoctorsServiceFromReact(data)
            // console.log('res in react la 3 ban ghi (from adminAction): ', res)
            if(res && res.errCode === 0){
                toast.success("Save info doctor succeed!");
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCEED,
                })
            }else{
                toast.error("Save info doctor failed!");
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_FAILED
                })
            }
           
        } catch (e) {
            console.log('SAVE_INFO_DOCTOR_FAILED: ', e);
            toast.error("Save info doctor failed!");
            dispatch({
                type: actionTypes.SAVE_INFO_DOCTOR_FAILED
            })
        }
    }
}
export const fetchAllSchedule = ()=>{
    return async(dispatch, getState)=>{
        try {
            let res = await getAllCodeFromUserService('TIME')
            console.log('res in react la 3 ban ghi (from adminAction): ', res)
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_SUCCEED,
                    dataTimes: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_FAILED
                })
            }
           
        } catch (e) {
            console.log('FETCH_ALL_CODE_SCHEDULE_HOURS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_FAILED
            })
        }
    }
}

export const fetchRequiredDoctorInfo = () => {
    // type: actionTypes.FETCH_GENDER_START,
    return async(dispatch, getState)=>{
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START
            })
            let resPrice = await getAllCodeFromUserService("PRICE");
            let resPayment = await getAllCodeFromUserService("PAYMENT");
            let resProvince = await getAllCodeFromUserService("Province");
            if(resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 ){
                // console.log('getState la: ', getState)
                let data={
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch(fetchRequiredDoctorInfoSucceed(data));
            }else{
                dispatch(fetchRequiredDoctorInfoFailed())
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInfoFailed());
            console.log('fetchRequiredDoctorInfo error', error)
            
        }
    }
}

export const fetchRequiredDoctorInfoSucceed = (doctorInfo) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCEED,
    data: doctorInfo
})

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
})
