import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import ProfileDoctor from '../Doctor/ProfileDoctor'
// import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../../HomePage/HomeHeader'
// import {withRouter} from 'react-router'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import {getDetailSpecialtyByIdServiceFromReact, getAllCodeFromUserService} from '../../../../services/userService'
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props){
        super(props);
        this.state ={
           arrDoctorId:[],
           dataDetailSpecialty: {},
           listProvince: [],
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
           
            let res =   await getDetailSpecialtyByIdServiceFromReact({
                id: id,
                location: "ALL"
            });
            let resProvince = await getAllCodeFromUserService("PROVINCE")
            if(res && res.errCode === 0 && resProvince && resProvince.errCode ===0){
                let data = res.data;
                let arrDoctorIdIn =[]
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorSpecialty;
                    console.log('arr', arr)
                    if(arr && arr.length>0){
                        arr.map(item=>{
                            arrDoctorIdIn.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if(dataProvince && dataProvince.length >0){
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVi: "Toàn quốc"
                    })

                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorIdIn,
                    listProvince: dataProvince ? dataProvince: []
                })
            }

        }
    }
  
    async componentDidUpdate(prevProps, prevState, snapshot){
  
    }
   
    handleOnchangeSelect =async (event)=>{
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res =   await getDetailSpecialtyByIdServiceFromReact({
                id: id,
                location: location
            });
    
            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorIdIn =[]
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorSpecialty;
                    console.log('arr', arr)
                    if(arr && arr.length>0){
                        arr.map(item=>{
                            arrDoctorIdIn.push(item.doctorId)
                        })
                    }
                }
                
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorIdIn,
                })
            }

        }
    }
    render() {
        let{arrDoctorId , dataDetailSpecialty, listProvince} = this.state;
        let {language} = this.props;
        // console.log('check state (detail Specialty)', this.state)
        return (
            <React.Fragment>
                <div className="specialty-info-container">
                <div className="container">
                    <div className="header">
                        <HomeHeader/>
                    </div>
                    <div className="specialty-desc">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <p dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}></p>
                        }
                    </div>
                    <div className="doctor-info">
                        <div className="search-doctor">
                            <select onChange ={(event)=>this.handleOnchangeSelect(event)} >
                            {listProvince && listProvince.length>0 &&
                                listProvince.map((item, index)=>{
                                    <option key ={index} value ={item.keyMap}>
                                        {language === LANGUAGES.VI? item.valueVi : item.valueEn}
                                    </option>
                                })

                            }
                            </select>
                        </div>
                        {arrDoctorId && arrDoctorId.length>0 && 
                            arrDoctorId.map((item, index)=>{
                        return(
                            <div className="each-doctor-info" key ={index}>
                                <div className="doctor-info-desc">
                                   <ProfileDoctor
                                    doctorId={item}
                                    isShowDescDoctor={true}
                                    isShowLinkDetail={true}
                                    isShowPrice={false}
                                   />
                                </div>
                                <div className="doctor-info-schedule">
                                    <DoctorSchedule
                                    // detailOfDoctor = {detailOfDoctor}
                                        doctorIdFromParent={item}
                                    // key = {index}
                                    />
                                     <DoctorExtraInfo
                                        doctorIdFromParent={item}/>
                                </div>
                            </div>
                            )})
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
        language : state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
