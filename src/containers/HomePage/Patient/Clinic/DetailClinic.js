import React, { Component } from 'react';
import { connect } from "react-redux";
// import { LANGUAGES } from '../../../../utils';
import ProfileDoctor from '../Doctor/ProfileDoctor'
// import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../../HomePage/HomeHeader'
// import {withRouter} from 'react-router'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import {getDetailClinicByIdServiceFromReact} from '../../../../services/userService'
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props){
        super(props);
        this.state ={
           arrDoctorId:[],
           dataDetailClinic: {},
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
           
            let res =   await getDetailClinicByIdServiceFromReact({
                id: id,
            });
            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorIdIn =[]
                if(data && !_.isEmpty(data)){
                    let arr = data.doctorClinic;
                    console.log('arr', arr)
                    if(arr && arr.length>0){
                        arr.map(item=>{
                            arrDoctorIdIn.push(item.doctorId)
                        })
                    }
                }
             
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorIdIn, 
                })
            }

        }
    }
  
    async componentDidUpdate(prevProps, prevState, snapshot){
  
    }
   
    // handleOnchangeSelect =async (event)=>{
    //     if(this.props.match && this.props.match.params && this.props.match.params.id){
    //         let id = this.props.match.params.id;
    //         let location = event.target.value;

    //         let res =   await getDetailClinicByIdServiceFromReact({
    //             id: id,
    //             location: location
    //         });
    
    //         if(res && res.errCode === 0 ){
    //             let data = res.data;
    //             let arrDoctorIdIn =[]
    //             if(data && !_.isEmpty(data)){
    //                 let arr = data.doctorClinic;
    //                 console.log('arr', arr)
    //                 if(arr && arr.length>0){
    //                     arr.map(item=>{
    //                         arrDoctorIdIn.push(item.doctorId)
    //                     })
    //                 }
    //             }
                
    //             this.setState({
    //                 dataDetailClinic: res.data,
    //                 arrDoctorId: arrDoctorIdIn,
    //             })
    //         }

    //     }
    //     }
    // }

    render() {
        let{arrDoctorId , dataDetailClinic} = this.state;
        let {language} = this.props;
        // console.log('check state (detail Clinic)', this.state)
        return (
            <React.Fragment>
                <div className="clinic-info-container">
                <div className="container">
                    <div className="header">
                        <HomeHeader/>
                    </div>
                    <div className="clinic-desc">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <div>
                                <p>{dataDetailClinic.name}</p>
                                <p dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}></p>
                            </div>
                        }
                    </div>
                    <div className="doctor-info">
                      
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
