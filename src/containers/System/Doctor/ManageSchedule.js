import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';

import * as actions from '../../../store/actions'
import {CRUD_ACTION, LANGUAGES, dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import  moment from 'moment'
import {toast} from 'react-toastify'
import _ from 'lodash'
import {saveBulkDoctorServiceFromReact} from '../../../services/userService'
import './ManageSchedule.scss'

class ManageSchedule extends Component {
    constructor(props){
        super(props);
       
        this.state={
            listDoctors:[],
            selectedDoctor:{},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleRedux()
      }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
          let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
          this.setState({
              listDoctors: dataSelect
          })
        }
      
        if(prevProps.allScheduleTimes !== this.props.allScheduleTimes){
          let data = this.props.allScheduleTimes;
            if(data && data.length> 0){
        //     data.map((item)=>{
            //         item.isSelected = false;
            //         return item
            //     })
            data = data.map(item=>({...item, isSelected: false}))
              console.log('data: ', data)
          }
          this.setState({
              rangeTime: data
          })
        }

    }
    buildDataInputSelect = (inPutData)=>{
        let result = [];
        let {language}= this.props;
        if( inPutData && inPutData.length > 0){
            inPutData.map((item, index)=>{
                let object={};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI? labelVi: labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result
    }
    handleChangeSelect =async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    }
    handleOnchangeDatePicker =(date)=>{
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime=(time)=>{
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length>0){
            rangeTime = rangeTime.map((item)=>{
                if(item.id ===time.id) item.isSelected =!item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule=async()=>{
        let {rangeTime , selectedDoctor, currentDate} = this.state;
        let result = [];

        if(!currentDate){
            toast.error("Invalid date");
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid selectedDoctor")
            return;
        }
       
        let formattedDate = new Date(currentDate).getTime();
        if(rangeTime && rangeTime.length>0){
            let selectedTime = rangeTime.filter(item => item.isSelected=== true)
            if(selectedTime && selectedTime.length>0){
                selectedTime.map((item,index) =>{
                    let object = {};
                    object.doctorId= selectedDoctor.value;
                    object.date= formattedDate;
                    object.timeType= item.keyMap;
                    result.push(object);
                })
            }else{
                toast.error("Invalid selectedTime");
                return;
            }
        }
        let res = await saveBulkDoctorServiceFromReact({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        });
        if(res && res.errCode === 0){
            toast.success("Make schedule is succeed");
        }else{
            toast.error("Make schedule is failed ");
            console.log("error: ", res)
        }
    }
    render() {
        let {rangeTime} = this.state;
        // console.log('range time: ', this.state)
        let {language} =this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        
        return (
           
            <div className="schedule-container">
                    <div className="content">
                        <div className="m-s-title text-center title">
                            <FormattedMessage id="manage-schedule.title"/>
                        </div>
                        <div className="container-body">
                            <div className="row">
                                <div className="form-group col-6">
                                    <label><FormattedMessage id="manage-schedule.select-doctor"/></label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listDoctors}
                                    />
                                   
                                </div>
                                <div className="form-group col-6">
                                    <label><FormattedMessage id="manage-schedule.select-date"/></label>
                                    <DatePicker
                                        className="form-control"
                                        onChange = {this.handleOnchangeDatePicker}
                                        value ={this.state.currentDate}
                                        minDate={ yesterday}
                                    />
                                   
                                </div>
                            </div>
                            <div className="col-12 pick-hour">
                                {rangeTime && rangeTime.length>0 &&
                                rangeTime.map((item, index)=>{
                                    return (
                                        <button className={item.isSelected === true? "btn btn-success" : "btn" } 
                                            key={index}
                                            onClick ={()=>this.handleClickBtnTime(item)}
                                        >
                                            {language ===LANGUAGES.VI? item.valueVi:item.valueEn}
                                        </button>
                                    )
                                })} 
                            </div>
                            <button className="btn btn-primary px-3"
                                onClick={()=>this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-schedule.save"/></button> 
                        </div>
                    </div>
            </div>
    );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTimes: state.admin.allTimes
    };
};



const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=>dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleRedux: ()=>dispatch(actions.fetchAllSchedule()),
        // saveInfoDoctorRedux: (data)=>dispatch(actions.saveInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
