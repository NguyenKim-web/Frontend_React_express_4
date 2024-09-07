import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors:[],
    allDoctors:[],
    allTimes:[],
    allDoctorInfos:[],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender= true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCEED:
            state.genders= action.data;
            state.isLoadingGender= false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
           
            state.isLoadingGender= false;
            state.genders= [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCEED:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
            
        case actionTypes.FETCH_ROLE_SUCCEED:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCEED:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            } 
        case actionTypes.FETCH_TOP_DOCTORS_SUCCEED:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCEED:
            state.allDoctors = action.dataDrs;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_SUCCEED:
            state.allTimes = action.dataTimes;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_FAILED:
            state.allTimes = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCEED:
            state.allDoctorInfos = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allDoctorInfos = [];
            return {
                ...state,
            }
            
        default:
            return state;
    }
}

export default adminReducer;