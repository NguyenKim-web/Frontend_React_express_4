import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader'
import './DetailInfoOfDoctor.scss'
import {getDetailOfDoctorServiceFromReact} from '../../../../services/userService'
import { LANGUAGES } from '../../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import ProfileDoctor from './ProfileDoctor'


class DetailInfoOfDoctor extends Component {
    constructor(props){
        super(props);
        this.state ={
            detailOfDoctor: {},
            currentDoctorId:-1,
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res =   await getDetailOfDoctorServiceFromReact(id);
            if(res && res.errCode === 0){
                this.setState({
                    detailOfDoctor: res.data
                })
            }

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
    render() {
        let {detailOfDoctor} = this.state;
        console.log('doctor Id from (detailInfoOfDOctor.js): ', detailOfDoctor.id)
        let {language} = this.props
        let nameVi='', nameEn='';
        if(detailOfDoctor && detailOfDoctor.positionData ) {
            nameVi = `${detailOfDoctor.positionData.valueVi}, ${detailOfDoctor.lastName}  ${detailOfDoctor.firstName}`;
            nameEn = `${detailOfDoctor.positionData.valueEn}, ${detailOfDoctor.firstName} ${detailOfDoctor.lastName}`;
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner ={false}/>
                <div className="doctor-detail-container">
                
                    <div className="container">
                        <div className="intro-doctor">
                            {/* <ProfileDoctor 
                            // doctorId= {detailOfDoctor.id}
                            // doctorId= {this.state.currentDoctorId}
                            // detailOfDoctor = {detailOfDoctor}
                            />  */}
                            <div className="intro-doctor-left" 
                                style={{backgroundImage: `url(${this.state.detailOfDoctor.image?this.state.detailOfDoctor.image:''})`}}>
                            </div>
                            <div className="intro-doctor-right">
                                <div className="up">
                                {language === LANGUAGES.VI? nameVi: nameEn}
                                </div>
                                <div className="down">
                                    {detailOfDoctor && detailOfDoctor.Markdown && detailOfDoctor.Markdown.description &&
                                        <p>
                                        {detailOfDoctor.Markdown.description}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="schedule-doctor">
                            <div className="content-left">
                                <DoctorSchedule
                                detailOfDoctor = {detailOfDoctor}
                                doctorIdFromParent={this.state.currentDoctorId}/>
                            </div>
                            <div className="content-right">
                                <DoctorExtraInfo
                                doctorIdFromParent={this.state.currentDoctorId}/>
                            </div>
                        </div>
                        <div className="detail-info-doctor">
                        {detailOfDoctor && detailOfDoctor.Markdown && detailOfDoctor.Markdown.contentHTML &&
                                        <p dangerouslySetInnerHTML={{__html: detailOfDoctor.Markdown.contentHTML }}> 
                                        </p>
                                    }
                        </div>
                        <div className="comment-doctor">

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfoOfDoctor);
