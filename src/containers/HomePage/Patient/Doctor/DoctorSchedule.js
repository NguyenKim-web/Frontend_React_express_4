import React, { Component } from 'react';
import { connect } from "react-redux";
// import HomeHeader from '../../HomeHeader'
import './DoctorSchedule.scss'
// import {getDetailOfDoctorServiceFromReact} from '../../../../services/userService'
import { LANGUAGES } from '../../../../utils';
import moment from 'moment'
import localization from 'moment/locale/vi'
import {getScheduleDoctorServiceFromReact} from '../../../../services/userService'
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
    constructor(props){
        super(props);
        this.state ={
            allDays:[],
            allAvailableTime:[]
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays, 
        }) 
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase()+ string.slice(1);
    }
    getArrDays= (language)=>{
        let allDays =[];
        for(let i=0; i<7; i++){
            let object = {};
            if(language === LANGUAGES.VI){
                if(i ===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today
                }else{
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }else if(language === LANGUAGES.EN){
                if(i ===0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today
                }else{
                    let labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
                
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
    //  console.log('arr date: ', arrDate)   
        return allDays
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
      if(this.props.language !== prevProps.language) {
        let allDays =this.getArrDays(this.props.language);
        this.setState({
          allDays: allDays
      })
      }
      if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
        let allDays =this.getArrDays(this.props.language);
        let res = await getScheduleDoctorServiceFromReact(this.props.doctorIdFromParent, allDays[0].value)
        this.setState({
          allAvailableTime: res.data? res.data: []
      })
      }
    }
    handleOnchangeSelect=async(event)=>{
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent!==-1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorServiceFromReact(doctorId, date)
            // console.log('res: ', res)
            let allTime = [];
            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data? res.data: []
                })
            }
        }
        // console.log('event: ', event.target.value)
    }
    render() {
        let {allDays} = this.state;
        let {allAvailableTime} = this.state;
        let {language} = this.props
        // let nameVi='', nameEn='';
        // if(detailOfDoctor && detailOfDoctor.positionData ) {
        //     nameVi = `${detailOfDoctor.positionData.valueVi}, ${detailOfDoctor.lastName}  ${detailOfDoctor.firstName}`;
        //     nameEn = `${detailOfDoctor.positionData.valueEn}, ${detailOfDoctor.firstName} ${detailOfDoctor.lastName}`;
        // }
        return (
            <React.Fragment>
                <div className="doctor-schedule-container">
                    <div className="doctor-schedule-container">
                        <select className="mb-2"
                        onChange ={(event)=>this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length> 0 && allDays.map((item, index) =>{
                                return(
                                    <option key ={index} value={item.value}>{item.label}</option>
                                )

                            })}
                        </select>
                    </div>
                    <div className="doctor-schedule-detail">
                        <div className="text-calendar">
                            <span><i className="fas fa-calendar-alt"></i> <FormattedMessage id="patient.detail-doctor.schedule"/></span>
                        </div>
                        <div className="detail-calendar">
                            {allAvailableTime && allAvailableTime.length>0 ?
                            <>
                            allAvailableTime.map((item, index)=>{
                                let timeDisplay = language === LANGUAGES.VI? item.timeTypeData.valueVi: item.timeTypeData.valueEn ;
                                return(
                                    <button key={index} className="btn btn-info px-3 my-2">{timeDisplay}</button>
                                )
                            })
                            <div className="px-3" >
                                <span><FormattedMessage id="patient.detail-doctor.select"/></span> <i className="far fa-hand-point-up"></i>
                                <span><FormattedMessage id="patient.detail-doctor.appointment"/></span>
                            </div>

                            </>
                            : <div className="text-center mt-5"><FormattedMessage id="patient.detail-doctor.available"/></div>
                            }
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language : state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
