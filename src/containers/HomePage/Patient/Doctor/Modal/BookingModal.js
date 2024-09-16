import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../../utils';
import { FormattedMessage } from 'react-intl';
import {  Modal, } from 'reactstrap';
import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../../components/Input/DatePicker'
import * as actions from '../../../../../store/actions'
import Select from 'react-select'
import {postPatientBookingServiceFromReact} from '../../../../../services/userService'
import {  toast } from 'react-toastify';
import moment from 'moment'

class BookingModal extends Component {
    constructor(props){
        super(props);
        this.state ={
            fullName:'',
            phoneNumber:'',
            email: '',
            address:'',
            reason:'',
            birthday:'',
            selectedGender:'',
            doctorId:'',
            timeType:'',
            
            genders: '',
        }
    }
    async componentDidMount(){
        this.props.fetchGender();
        
    }
    buildDataGender=(data)=>{
        let result = [];
        let language = this.props.language;
        if(data && data.length>0){
            data.map(item=>{
                let object ={};
                object.label = language ===LANGUAGES.VI ?item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        
        if(this.props.genderRedux !== prevProps.genderRedux){
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        if(this.props.dataScheduleTimesModalFromParent !== prevProps.dataScheduleTimesModalFromParent){
            if(this.props.dataScheduleTimesModalFromParent && !_.isEmpty(this.props.dataScheduleTimesModalFromParent)){
               let  doctorId= this.props.dataScheduleTimesModalFromParent.doctorId;
               this.setState({
                doctorId: doctorId,
                timeType: this.props.dataScheduleTimesModalFromParent.timeType
               })
               }
        }
  
    }
    handleOnChangeInput=(event, id)=>{
        let valueInput = event.target.value;
        let stateCopy = {...this.state}
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })

    }

    handleOnchangeDatePicker =(date)=>{
        this.setState({
            birthday: date[0]
        })
    }
    handleOnChangeInputGender=(selectedOption)=>{
        this.setState({
            selectedGender: selectedOption
        })
    }
    buildTimeBooking =(dataTime)=>{
        let {language }= this.props;

        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (`${time} - ${date} `)
        }
        return '';
    }
    buildDoctorName =(dataTime)=>{
        let {language }= this.props;

        if(dataTime && !_.isEmpty(dataTime)){
            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return '';
    }

    handleConfirmBooking = async()=>{
        // console.log('check data (form): ', this.state)
       
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimesModalFromParent)
        let doctorName = this.buildDoctorName(this.props.dataScheduleTimesModalFromParent)
        
        let res = await postPatientBookingServiceFromReact({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email ,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleTimesModalFromParent.date,
            birthday: date ,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        // console.log('check booking info *(res) : ', res)

        if(res && res.errCode=== 0){
            toast.success("Booking a appointment is succeed")
            // this.props.closeBookingModalFromParent();
        }else{
            toast.error("Booking a appointment is failed")

        }
        

    }
    render() {
        let{isOpenModalBookingFromParen, closeBookingModalFromParent, dataScheduleTimesModalFromParent} = this.props;
       let doctorId ='';
       if(dataScheduleTimesModalFromParent && !_.isEmpty(dataScheduleTimesModalFromParent)){
        doctorId= dataScheduleTimesModalFromParent.doctorId
       }
    //    console.log("check dataScheduleTimesModalFromParent (bookingModal): ", dataScheduleTimesModalFromParent)
       

       
        return (
            
                <div className="booking-modal-container">
          
                    <Modal isOpen={isOpenModalBookingFromParen}  className={"booking-modal"} size="lg" centered
                    >
                        <div  className="d-flex justify-content-between" >
                            <p className="title"><FormattedMessage id ="patient.booking-modal.title"/></p>
                            <button color="secondary" className="px-3"
                             onClick={closeBookingModalFromParent}
                            >
                                x
                            </button>
                        </div>
                        <div>
                            {/* {JSON.stringify(dataScheduleTimesModalFromParent)} */}
                            <div className="doctor-info">
                            <ProfileDoctor
                                doctorId= {doctorId}
                                isShowDescDoctor={false}
                                dataTime={dataScheduleTimesModalFromParent}
                                isShowLinkDetail={false}
                                    isShowPrice={true}
                                // detailOfDoctor = {detailOfDoctor}
                            />
                            </div>
                            <div className="appointment-info">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="inputFullName" className="form-label"><FormattedMessage id ="patient.booking-modal.fullName"/></label>
                                        <input type="text" className="form-control" id="inputFullName" placeholder="Nguyen Van A"
                                            value={this.state.fullName}
                                            onChange={(event)=>this.handleOnChangeInput(event, 'fullName')}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPhoneNumber" className="form-label"><FormattedMessage id ="patient.booking-modal.phone"/></label>
                                        <input type="text" className="form-control" id="inputPhoneNumber"
                                            value={this.state.phoneNumber}
                                            onChange={(event)=>this.handleOnChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label"><FormattedMessage id ="patient.booking-modal.email"/></label>
                                        <input type="email" className="form-control" id="inputEmail4"
                                        value={this.state.email}
                                        onChange={(event)=>this.handleOnChangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputAddress" className="form-label"><FormattedMessage id ="patient.booking-modal.address"/></label>
                                        <input type="text" className="form-control" id="inputAddress"
                                        value={this.state.address}
                                        onChange={(event)=>this.handleOnChangeInput(event, 'address')}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputReason" className="form-label"><FormattedMessage id ="patient.booking-modal.reason"/></label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="headache..."
                                        value={this.state.reason}
                                        onChange={(event)=>this.handleOnChangeInput(event, 'reason')}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputBirthday" className="form-label"><FormattedMessage id ="patient.booking-modal.birthday"/></label>
                                        <DatePicker
                                            className="form-control"
                                            onChange = {this.handleOnchangeDatePicker}
                                            value ={this.state.currentDate}
                                            // minDate={ yesterday}
                                        />
                                        {/* <input type="text" className="form-control" id="inputBirthday"
                                        value={this.state.birthday}
                                        onChange={(event)=>this.handleOnChangeInput(event, 'birthday')}
                                        /> */}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputGender" className="form-label"><FormattedMessage id ="patient.booking-modal.gender"/></label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleOnChangeInputGender}
                                            options={this.state.genders}
                                        />
                                        
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="p-3">
                            <button color="blue" className="px-1"
                            onClick={()=>this.handleConfirmBooking() }
                            >
                                <FormattedMessage id ="patient.booking-modal.confirm"/>
                            </button>{' '}
                            <button color="secondary" className="px-1"
                            onClick={closeBookingModalFromParent}
                            >
                                <FormattedMessage id ="patient.booking-modal.cancel"/>
                            </button>
                        </div>
                    </Modal>
                </div>
          
        );
    }
}

const mapStateToProps = state => {
    return {
        language : state.app.language,
        genderRedux: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () =>dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
