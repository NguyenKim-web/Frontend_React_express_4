import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTION, CommonUtils} from '../../../utils';
import * as actions from '../../../store/actions'
import { createNewUser } from '../../../store/actions/adminActions';
import TableManageUser from './TableManageUser';
import './UserRedux.scss'

class UserRedux extends Component {
   constructor(props){
        super(props);
        this.state={
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgUrl:'',
            isOpen: false,// dung cho preview image function


            email: '',
            password: '',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            positionId:'',
            roleId:'',
            avatar:'',
            
            action:'',
            userEditId:'',
        }
   }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        //update gender
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length> 0 ? arrGenders[0].keyMap: ''
            })
        }
        //update gender
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                positionId: arrPositions && arrPositions.length> 0? arrPositions[0].keyMap: ''
            })
            // console.log('position la: ', this.state.positionArr)
        }
        //update gender
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                roleId: arrRoles && arrRoles.length> 0? arrRoles[0].keyMap: ''
            })
            // console.log('role la: ', this.state.roleArr)
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrPositions = this.props.positionRedux;
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            
            this.setState({
                email: '',
                password: '',
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender: arrGenders && arrGenders.length> 0? arrGenders[0].keyMap: '',
                positionId: arrPositions && arrPositions.length> 0? arrPositions[0].keyMap: '',
                roleId: arrRoles && arrRoles.length> 0? arrRoles[0].keyMap: '',
                avatar:'',
                action: CRUD_ACTION.CREATE,
                previewImgUrl:'',
                
            })
        }

    }
    handleOnchangeImage=async (event)=>{
        let data = event.target.files;
        // console.log('data image: ', data) 
        let file = data[0];
        console.log('data (handleOnchangeImage): ', data[0])
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            // console.log('base64: ', base64);
            let objectURL = URL.createObjectURL(file);
            // console.log('objectUrl la: ', objectURL)
            this.setState({
                previewImgUrl: objectURL,
                avatar : base64
            })
        }
    }
    handleSaveUser =()=>{
        // console.log('this.state(handleSaveUser): ', this.state)
        // alert("da click")
        let isValid = this.checkValidInput();
        if(isValid ===false){ return};
        let {action} = this.state;
        if(action === CRUD_ACTION.CREATE){
            //fire action redux
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                avatar: this.state.avatar,
            })
            // this.props.fetchUseRedux();
        }
        if(action === CRUD_ACTION.EDIT){
             //fire edit redux
            this.props.editUserRedux({
                id:this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                positionId: this.state.positionId,
                avatar: this.state.avatar,
            })
           
        }
        
    }
    checkValidInput= ()=>{
        let isValid = true;
        let arrCheck = ['email',  'password',  'firstName',
            'lastName', 'phoneNumber', 'address',  'gender',
            'positionId', 'roleId', 'avatar']
            for(let i= 0; i<arrCheck.length; i++){
                if(!this.state[arrCheck[i]]){
                    isValid = false;
                    alert('This input is required: '+ arrCheck[i] )
                    break;
                }
            }
            return isValid;
    }

    onChangeInput=(event, id)=>{
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        // console.log('copyState[id] (UserRedux)', copyState[id])
        this.setState({
            ...copyState
        },()=>{
            // console.log('this.state(onChangInput): ', this.state)
        })
    }
    handleEditUserFromParent =(user)=>{
        let imageBase64 ='';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        // console.log('check user from parent: ', user)
        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            positionId: user.positionId,
            roleId: user.roleId,
            avatar:'',
            previewImgUrl: imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId:user.id,
        })
    }
    render() {
        // console.log('check gender redux: ', this.props.genderRedux);
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        // console.log('check state component from UserRedux:', this.state)
        // console.log('check props component from UserRedux:', this.props)

        let{ email,  password,  firstName, lastName,  phoneNumber,
            address,  gender, positionId, roleId, avatar} = this.state;
        return (
            <div className="my-5">
                <h1 className="text-center title" >User redux</h1>
                <div className="user-redux-body my-5">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12 text-center title"><FormattedMessage id="manage-user.add"/></div>
                            <div className="text-center loading-text">{isGetGender === true? 'Loading': ''}</div>
                            <div className="form-input">
                            <div className="form-row email-password-name">
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputEmail4"><FormattedMessage id="manage-user.email"/></label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email"
                                    value={email} disabled={this.state.action ===CRUD_ACTION.EDIT? true: false}
                                    onChange= {(event)=>{this.onChangeInput(event, 'email')}}
                                    />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputPassword4"><FormattedMessage id="manage-user.password"/></label>
                                    <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                                    value={password} disabled={this.state.action ===CRUD_ACTION.EDIT? true: false}
                                    onChange= {(event)=>{this.onChangeInput(event, 'password')}}
                                    />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputFirstName"><FormattedMessage id="manage-user.firstname"/></label>
                                    <input type="text" className="form-control" id="inputFirstName" placeholder="FirstName"
                                    value={firstName}
                                    onChange= {(event)=>{this.onChangeInput(event, 'firstName')}}
                                    />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputLastName"><FormattedMessage id="manage-user.lastname"/></label>
                                    <input type="text" className="form-control" id="inputLastName" placeholder="LastName"
                                    value={lastName}
                                    onChange= {(event)=>{this.onChangeInput(event, 'lastName')}}
                                    />
                                </div>
                            </div>
                            <div className="form-row phone-address">
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputPhoneNumber"><FormattedMessage id="manage-user.phone"/></label>
                                    <input type="text" className="form-control" id="inputPhoneNumber" placeholder="090..."
                                     value={phoneNumber}
                                     onChange= {(event)=>{this.onChangeInput(event, 'phoneNumber')}}
                                    />
                                </div>
                                <div className="form-group col-md-9">
                                    <label htmlFor="inputAddress"><FormattedMessage id="manage-user.address"/></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
                                     value={address}
                                     onChange= {(event)=>{this.onChangeInput(event, 'address')}}
                                    />
                                </div>
                            </div>
                           
                            <div className="form-row image-position-role-gender">
                               
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputGender"><FormattedMessage id="manage-user.gender"/></label>
                                    <select id="inputGender" className="form-control"  
                                    value={gender}
                                    onChange= {(event)=>{this.onChangeInput(event, 'gender')}}>
                                       
                                        {genders && genders.length >0 &&genders.map((item, index)=>{
                                            return(
                                                <option key = {index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI? item.valueVi :item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputPosition"><FormattedMessage id="manage-user.position"/></label>
                                    <select id="inputPosition" className="form-control"
                                    //  value={position}
                                    value={positionId}
                                     onChange= {(event)=>{this.onChangeInput(event, 'positionId')}}
                                    >
                                        {positions && positions.length >0 &&positions.map((item, index)=>{
                                            // console.log('check item: ',item)
                                            return(
                                                <option key = {index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI? item.valueVi :item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputRoleId">Role ID</label>
                                    <select id="inputRoleId" className="form-control"
                                     value={roleId}
                                     onChange= {(event)=>{this.onChangeInput(event, 'roleId')}}
                                    >
                                        {roles && roles.length >0 &&roles.map((item, index)=>{
                                            // console.log('check item: ',item)
                                            return(
                                                <option key = {index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI? item.valueVi :item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputImage"><FormattedMessage id="manage-user.image"/></label>
                                    <div>
                                        <input type="file" id="inputImage" hidden
                                        onChange = {(event)=>this.handleOnchangeImage(event)}
                                        />
                                        <label htmlFor="inputImage">Tải ảnh<i className="fas fa-upload"></i></label>
                                        <div className="preview-image"
                                            style={{backgroundImage: `url(${this.state.previewImgUrl})`, 
                                            backgroundSize:'cover', height: '200px', width: '150px', 
                                            backgroundPosition: 'center', 
                                            backgroundRepeat:"no-repeat", border:'1px solid red'}}
                                         >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button   className={this.state.action===CRUD_ACTION.EDIT?"btn btn-warning px-3": "btn btn-primary px-3"}
                                    onClick = {()=>this.handleSaveUser()}
                                >
                                    {this.state.action===CRUD_ACTION.EDIT?
                                    <FormattedMessage id="manage-user.edit"/>:
                                    <FormattedMessage id="manage-user.save"/>}</button>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
                <TableManageUser
                handleEditUserFromParentToChild = {this.handleEditUserFromParent}
               action={this.state.action}
               />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:()=>dispatch(actions.fetchGenderStart()),
        getPositionStart:()=>dispatch(actions.fetchPositionStart()),
        getRoleStart:()=>dispatch(actions.fetchRoleStart()),
        createNewUser:(data)=>dispatch(actions.createNewUser(data)),
        fetchUserRedux:()=>dispatch(actions.fetchAllUserStart()),
        editUserRedux:(data)=>dispatch(actions.editUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux:(lang) => dispatch(actions.changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
