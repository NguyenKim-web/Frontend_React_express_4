import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginFromService } from '../../services/userService'

// import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isShowPassword: false,
            errMessage:''
        }
    }


    componentDidMount() {
     
    }
    handleOnChangeInputUsername=(event)=>{
        this.setState({
            username: event.target.value,
        })
    }
    handleOnChangeInputPassword=(event)=>{
        this.setState({
            password: event.target.value,
        })
    }
    handleLogin=async()=>{
        this.setState({
            errMessage:''
        })
        try {
            let data = await handleLoginFromService(this.state.username, this.state.password);
            if(data && data.errCode !==0){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode ===0){
                this.props.userLoginSuccess(data.user)
                // console.log("Dang nhap thanh cong(from Login.js react)")
            }
            
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })

                }
            }
        }
    }
    handleShowEye=()=>{
        this.setState({isShowPassword : !this.state.isShowPassword})
    }
    handleKyeDown=(event)=>{
        if(event.key ==='Enter'){
            this.handleLogin()
        }
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login" >Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" className="form-control" 
                            placeholder="Enter your username"
                            // value={this.state.username}
                            onChange = {(event)=> this.handleOnChangeInputUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                           <div className="custom-input-password"> 
                                <input className="form-control"
                                type={this.state.isShowPassword?'text':'password'}
                                placeholder="Enter your password"
                                onChange = {(event)=> this.handleOnChangeInputPassword(event)}
                                onKeyDown ={(event)=>this.handleKyeDown(event)}
                                />
                                <span 
                                    onClick={()=>{this.handleShowEye()}}
                                >  
                                <i className={this.state.isShowPassword?"far fa-eye-slash":"far fa-eye"}></i>
                                </span>
                           </div>
                        </div> 
                        <div className = 'col-12' style = {{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                        <button className="login-btn" 
                            onClick={()=>this.handleLogin()}
                        >Login</button>
                        </div>
                        <div className="col-12" >
                            <span>Forgot your password</span>
                            
                        </div>
                        <div className="col-12 text-center">
                            <span>Or login with</span>
                            
                        </div>
                        <div className="col-12 text-other-login">
                            <i className="fab fa-google-plus-g"></i>
                            <i className="fab fa-facebook-f"></i>
                            
                        </div>

                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
