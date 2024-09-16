import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import {emitter} from "../../utils/emitter";
import _ from 'lodash'

class ModalEditUser extends Component {

   constructor(props){
    super(props);
    this.state ={
        id:'',
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        address:'',
        phoneNumber:'',
        gender:'',
        roleId:''
    }
    
   }


    componentDidMount() {
        let user = this.props.currentUserParent;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,

            })
        }

        console.log('didmount (ModalEditUser): ', this.props.currentUserParent)
    }

    toggle(){
            this.props.toggleEditUserFromParent()
    }

    handleOnChangeInput=(event, id)=>{
        let copyState = {...this.state};
        copyState[id]= event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput=()=>{
        let isValid = true;
        let arrInput=['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
        for(let i=0; i< arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser=()=>{
        let isValid = this.checkValidateInput();
        if(isValid === true){
            //call api edit user
            this.props.editUserParent(this.state)
        }
    }
    render() {
        return (
            <div className="container">
                <Modal isOpen={this.props.isOpen} 
                toggle={()=>this.toggle()} 
                size = 'lg' centered
                >
                    <ModalHeader toggle={()=>this.toggle} >Edit a user</ModalHeader>
                    <ModalBody>
                        <div className="content">
                            <div className="row">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Email</label>
                                            <input type="email" className="form-control" 
                                            id="inputEmail4" placeholder="Email" name="email"
                                            onChange={(event)=>this.handleOnChangeInput(event, 'email')}
                                            value = {this.state.email} disabled
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Password</label>
                                            <input type="password" className="form-control" 
                                            id="inputPassword4" placeholder="Password" name="password"
                                            onChange={(event)=>this.handleOnChangeInput(event, 'password')}
                                            value = {this.state.password} disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputFirstname">First Name</label>
                                        <input type="text" className="form-control" 
                                        id="inputFirstname" placeholder="First name" name="firstName"
                                        onChange={(event)=>this.handleOnChangeInput(event, 'firstName')}
                                        value = {this.state.firstName}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputLastname">Last Name</label>
                                        <input type="text" className="form-control" id="inputLastname" 
                                        placeholder="Last name" name="lastName"
                                        onChange={(event)=>this.handleOnChangeInput(event, 'lastName')}
                                        value = {this.state.lastName}
                                        />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputAddress">Address</label>
                                    <input type="text" className="form-control" id="inputAddress" 
                                    placeholder="1234 Main St" name="address"
                                    onChange={(event)=>this.handleOnChangeInput(event, 'address')}
                                    value = {this.state.address}
                                    />
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPhonenumbe">Phone number</label>
                                        <input type="text" className="form-control" id="inputPhonenumber" 
                                        name="phoneNumber"
                                        onChange={(event)=>this.handleOnChangeInput(event, 'phoneNumber')}
                                        value = {this.state.phoneNumber}
                                        />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputGender">Giới tính</label>
                                        <select id="inputGender" className="form-control" name="gender">
                                        <option >Choose...</option>
                                        <option value={"M"}>Male</option>
                                        <option value={"F"}>Female</option>
                                        <option value={"O"}>Other</option>
                                        
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputRole">Role</label>
                                        <select id="inputRole" className="form-control" name="roleId">
                                            <option >Choose...</option>
                                            <option value={"R1"}>Admin</option>
                                            <option value={"R2"}>Doctor</option>
                                            <option value={"R3"}>Patient</option>
                                        </select>
                                    </div>
                                    </div>
                            </div>
                        </div>
                     </ModalBody>
                    <ModalFooter>
                        <Button className="px-2" color="primary" onClick={()=>this.toggle()}
                            onClick = {()=>this.handleSaveUser()}
                        >SAVE</Button>{' '}
                        <Button className="px-2" color="secondary" onClick={()=>this.toggle()}
                            
                        >Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


