import React, { Component } from 'react';
import { connect } from "react-redux";
// import HomeHeader from '../../HomeHeader'
import './DoctorExtraInfo.scss'
// import {getDetailOfDoctorServiceFromReact} from '../../../../services/userService'
import { LANGUAGES } from '../../../../utils';
// import moment from 'moment'
// import localization from 'moment/locale/vi'
import {getExtraInfoDoctorByIdServiceFromReact} from '../../../../services/userService'
import { FormattedMessage } from 'react-intl';
import Numberformat from 'react-number-format'

class DoctorExtraInfo extends Component {
    constructor(props){
        super(props);
        this.state ={
           isShowDetailInfo: false,
           extraInfo:{}
        }
    }
    async componentDidMount(){

        // let {language} = this.props;
        if(this.props.doctorIdFromParent) {
        let data = await getExtraInfoDoctorByIdServiceFromReact(this.props.doctorIdFromParent)
        // console.log('check data (doctor extra): ', data)
        if(data && data.errCode === 0){
            this.setState({
              extraInfo: data.data? data.data: {}
          })
        }}
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
      if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
        let data = await getExtraInfoDoctorByIdServiceFromReact(this.props.doctorIdFromParent)
        // console.log('check data (doctor extra): ', data)
        if(data && data.errCode === 0){
            this.setState({
              extraInfo: data.data? data.data: {}
          })
        }
      }
    }
    showHideInfo =(status)=>{
        this.setState({
            isShowDetailInfo: status
        })

    }
    // handleOnchangeSelect=async(event)=>{
    //     if(this.props.doctorIdFromParent && this.props.doctorIdFromParent!==-1){
    //         let doctorId = this.props.doctorIdFromParent;
    //         let date = event.target.value;
    //         let res = await getScheduleDoctorServiceFromReact(doctorId, date)
    //         // console.log('res: ', res)
    //         let allTime = [];
    //         if(res && res.errCode === 0){
    //             this.setState({
    //                 allAvailableTime: res.data? res.data: []
    //             })
    //         }
    //     }
    //     // console.log('event: ', event.target.value)
    // }
    render() {
        let{isShowDetailInfo, extraInfo} = this.state;
        let {language} = this.props;
        console.log('status check state extra info: ', this.state)

       
        return (
            <React.Fragment>
                <div className="doctor-extra-info-container">
                    <div className="content-up">
                        <div className="content-up-title"><FormattedMessage id="patient.extra-info.address-examination"/></div>
                        <div className="content-up-clinic-name">{extraInfo && extraInfo.clinicName ? extraInfo.clinicName : ''}</div>
                        <div className="content-up-address"> {extraInfo && extraInfo.clinicAddress ? extraInfo.clinicAddress : ''}</div>
                    </div>
                    <div className="content-down">
                        {isShowDetailInfo === false &&
                            <div>
                                <span className="content-down-title"><FormattedMessage id="patient.extra-info.cost"/></span> 
                                <span className="content-down-cost">
                                    {extraInfo && extraInfo.priceData && language === LANGUAGES.VI && 
                                        <Numberformat
                                            value={extraInfo.priceData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    } 
                                    {extraInfo && extraInfo.priceData && language === LANGUAGES.EN && 
                                        <Numberformat
                                            value={extraInfo.priceData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    } 
                                </span>
                                <span onClick = {()=>this.showHideInfo(true)} className="content-down-switch"> <FormattedMessage id="patient.extra-info.detail"/></span>
                            </div>
                        } 
                        {isShowDetailInfo === true &&
                            <>
                                <div className="content-down-title"><FormattedMessage id="patient.extra-info.cost"/></div>
                                <div className="content-down-desc1  p-2"  >
                                    <div className="content-down-top ">
                                        <p><FormattedMessage id="patient.extra-info.cost"/> </p>
                                        <p>
                                            {extraInfo && extraInfo.priceData && language === LANGUAGES.VI && 
                                                <Numberformat
                                                value={extraInfo.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'} 
                                                />
                                            } 
                                            {extraInfo && extraInfo.priceData && language === LANGUAGES.EN && 
                                                <Numberformat
                                                    value={extraInfo.priceData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                            } 
                                        </p>
                                    </div>
                                    <div className="content-down-desc1-sub" >{extraInfo && extraInfo.note ? extraInfo.note : ''}</div>
                        
                                </div>
                                <div className="content-down-desc2  p-2"><FormattedMessage id="patient.extra-info.payment-info"/> 
                                    {extraInfo && extraInfo.paymentData && language=== LANGUAGES.VI ? extraInfo.paymentData.valueVi : extraInfo.paymentData.valueEn}
                                </div>
                                <div onClick = {()=>this.showHideInfo(false)} className="content-down-switch"><FormattedMessage id="patient.extra-info.hide-content"/></div>
                            </>
                        } 
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
