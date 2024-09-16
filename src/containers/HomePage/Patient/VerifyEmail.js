import React, { Component } from 'react';
import { connect } from "react-redux";
// import { LANGUAGES } from '../../../utils';
// import { FormattedMessage } from 'react-intl';
import {postPatientVerifyBookingServiceFromReact} from '../../../services/userService'
import HomeHeader from '../../HomePage/HomeHeader'

class VerifyEmail extends Component {
    constructor(props){
        super(props);
        this.state ={
           statusVerify: false,
           errCode: 0
        }
    }
    async componentDidMount(){
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
           let token = urlParams.get('token');
           let doctorId = urlParams.get('doctorId');
           let res = await postPatientVerifyBookingServiceFromReact({
                token: token,
                doctorId: doctorId
           })
           if(res && res.errCode===0){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode 
                })
           }else{
            this.setState({
                statusVerify: true,
                errCode: res && res.errCode? res.errCode : -1,
            })
           }
        }
    }
  
    async componentDidUpdate(prevProps, prevState, snapshot){
  
    }

    render() {
        let {statusVerify, errCode} = this.state
        // console.log("verify email errCode", errCode)
       
        return (
            <React.Fragment>
                <div className="doctor-extra-info-container">
                    <div className="content-up">
                        <HomeHeader/>
                    </div>
                    {statusVerify === false? 
                        <div className="content-down">
                            <p className="text-center title">Loading data...</p>
                        </div>
                        :
                        <div className="content-down">
                            {+errCode === 0 ? 
                            <p className="text-center title">Thong tin dat lich thanh cong</p> :
                            <p className="text-center title">Thong tin dat lich that bai</p> }
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
