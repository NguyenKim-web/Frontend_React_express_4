import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
// import Select from 'react-select';

import * as actions from '../../../store/actions'
import {LANGUAGES} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import  moment from 'moment'
import {toast} from 'react-toastify'
// import _ from 'lodash'
// import {saveBulkDoctorServiceFromReact} from '../../../services/userService'
import './ManagePatient.scss'
import { getAllPatientForDoctorServiceFromReact, sendRemedyServiceFromReact } from '../../../services/userService';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay'

class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state={
            dataPatient:[],
            currentDate: moment(new Date()).startOf('day').valueOf(),
            isOpenRemedyModal:false,
            dataModal:{},
            isShowLoading:false
        }
    }
    // handleOnchangeDatePicker =(date)=>{
    //     this.setState({
    //         currentDate: date[0]
    //     })
    // }
    async componentDidMount(){
        this.getDataPatient();
    }

    getDataPatient = async ()=>{
        let {user} = this.props;
        let {currentDate} = this.state;
        let formattedDate = new Date(currentDate).getTime() ;  
        
        let res = await getAllPatientForDoctorServiceFromReact({
            doctorId: user.id,
            date: formattedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
       
    }
    handleOnchangeDatePicker=(date)=>{
        this.setState({
            currentDate: date[0]
        }, async()=>{
          await  this.getDataPatient();
        })
    }
    handleBtnConfirm=(item)=>{
        // console.log('check thong tin item: (ManagePatient) ', item)
        let data={
            doctorId: item.doctorId,
            patientId : item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }  
    // handleBtnRemedy=(item)=>{
    //     this.setState({
    //         isOpenRemedyModal: true,
    //         dataModal: data
    //     })
    // }
    closeRemedyModal=()=>{
        this.setState({
            isOpenRemedyModal: false,
            dataModal:{}
        })
    }
    sendRemedy =async(dataFromModal)=>{
        let{dataModal} =this.state;
        // console.log('dataModal', dataModal)
        // console.log('dataFromModal', dataFromModal)
        this.setState({
            isShowLoading: true
        })
        let res = await sendRemedyServiceFromReact({
            email: dataFromModal.email,
            imageB64: dataFromModal.imgB64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
           //or ...dataFromModal
        })
        if(res && res.errCode ===0){
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy is succeed')
            this.closeRemedyModal();
            await  this.getDataPatient();
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('Sorry! Send remedy is failed')
        }
    }
    render() {
        let {dataPatient, isOpenRemedyModal, dataModal} =this.state
        // console.log('dataPatient: state (ManagePatient)', this.state)
        let {language} =this.props;
        return (
           
            <>
                <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text="Loading..."
                >
                    <div className="container">
                        <div className="m-s-title text-center title">
                            <FormattedMessage id="manage-patient.title"/>
                        </div>
                        <div className="container-body">
                            <div className="row">
                                <div className="form-group col-6">
                                    <label><FormattedMessage id="manage-patient.select-date"/></label>
                                    <DatePicker
                                            className="form-control"
                                            onChange = {this.handleOnchangeDatePicker}
                                            value ={this.state.currentDate}
                                            // minDate={ yesterday}
                                    />
                                </div>
                               
                            </div>
                            <div className="col-12 table">
                            <table id="customers" className="mb-5 ">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Time</th>
                                        <th>Full Name</th>
                                        <th>Address</th>
                                        <th>Sex</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length>0 ?
                                    dataPatient.map((item, index)=>{
                                        let time = language === LANGUAGES.VI ? item.timeData.valueVi :item.timeData.valueEn
                                        let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi :item.patientData.genderData.valueEn
                                        return (
                                        <tr key ={index}>
                                            <td>{index+1} </td>
                                            <td>{time}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{gender} </td>
                                            <td>
                                                <button 
                                                onClick={()=>this.handleBtnConfirm(item)}
                                                >Xac nhan</button>  
                                            </td>
                                        </tr>
                                        )
                                    })
                                    :<tr>
                                        No data
                                    </tr>
                                }
                                </tbody>
                            </table>
                            </div>
                            {/* <button className="btn btn-primary px-3"
                                onClick={()=>this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-patient.save"/></button>  */}
                        </div>
                        <RemedyModal
                            isOpenModalBookingFromParen= {isOpenRemedyModal}
                            dataModal= {dataModal}
                            closeRemedyModal={this.closeRemedyModal}
                            sendRemedy={this.sendRemedy}
                        />
                    </div>
                </LoadingOverlay>
            </>
    );
    }
}

const mapStateToProps = state => {
    return {
      
        language: state.app.language,
        user: state.user.userInfo
    };
};



const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=>dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleRedux: ()=>dispatch(actions.fetchAllSchedule()),
        // saveInfoDoctorRedux: (data)=>dispatch(actions.saveInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
