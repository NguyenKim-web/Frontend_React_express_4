import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader'
import './ProfileDoctor.scss'
import {getDetailOfDoctorServiceFromReact, getProfileDoctorByIdServiceFromReact} from '../../../../services/userService'
import { LANGUAGES } from '../../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import BookingModal from './Modal/BookingModal';
import DetailInfoOfDoctor from './DetailInfoOfDoctor';
import _ from 'lodash'
import Numberformat from 'react-number-format'
import moment from 'moment'
import { FormattedMessage } from 'react-intl';


class ProfileDoctor extends Component {
    constructor(props){
        super(props);
        this.state ={
            profileDoctor: {},
            // currentDoctorId:-1,
        }
    }
    async componentDidMount(){
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            profileDoctor: data
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
      if(this.props.language !== prevProps.language){

      }
      if(this.props.doctorId !== prevProps.doctorId){
        // this.getInfoDoctor(this.props.doctorId)
      }
    }
    getInfoDoctor=async(id)=>{
        let result= {};
        if(id){
            let res = await getProfileDoctorByIdServiceFromReact(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        console.log('result: ', result)
        return result;

    }
    renderTimeBooking =(dataTime)=>{
        let {language }= this.props;

        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')


            return (
                <>
                <div>{time} - {date}</div>
                <div><FormattedMessage id ="patient.profile.free"/></div>
                </>
            )
        }
        return <></>
    }
    render() {
        let {profileDoctor} = this.state;
        // console.log('data profile(ProfileDoctor): ', profileDoctor)
        let {language, doctorId, isShowDescDoctor, dataTime} = this.props
        // console.log('this.props from(ProfileDoctor): ', this.props)

        let nameVi='', nameEn='';
        if(profileDoctor && profileDoctor.positionData ) {
            nameVi = `${profileDoctor.positionData.valueVi}, ${profileDoctor.lastName}  ${profileDoctor.firstName}`;
            nameEn = `${profileDoctor.positionData.valueEn}, ${profileDoctor.firstName} ${profileDoctor.lastName}`;
        }
        return (
            <React.Fragment>
                <div className="doctor-profile-container">
                    <div className="container">
                        <div className="intro-doctor">
                            <div className="intro-doctor-left" 
                                style={{backgroundImage: `url(${profileDoctor.image ? profileDoctor.image:''})`} } >
                            </div>
                            <div className="intro-doctor-right">
                                <div className="up">
                                    {language === LANGUAGES.VI? nameVi: nameEn}
                                </div>
                                <div className="down">
                                    {isShowDescDoctor === true ?
                                   <>
                                        {profileDoctor && profileDoctor.Markdown && profileDoctor.Markdown.description &&
                                            <p>
                                                {profileDoctor.Markdown.description}
                                            </p>
                                        }
                                   </>
                                   : 
                                   <>
                                   {this.renderTimeBooking(dataTime)}
                                   </>
                                   }
                                </div>
                            </div>
                        </div>
                        <div><FormattedMessage id ="patient.profile.cost"/>
                        {profileDoctor && profileDoctor.DoctorInfo && language === LANGUAGES.VI && 
                                    <Numberformat
                                    value={profileDoctor.DoctorInfo.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                    
                                />
                                } 
                            {profileDoctor && profileDoctor.DoctorInfo && language === LANGUAGES.EN && 
                                    <Numberformat
                                        value={profileDoctor.DoctorInfo.priceData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                        
                                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
