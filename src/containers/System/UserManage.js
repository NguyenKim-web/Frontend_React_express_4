import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import {getAllUsersAPI, createNewUserFromUserService, 
    deleteUserService, editUserService
} from '../../services/userService';
import ModalAddUser from './ModalAddUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from "../../utils/emitter"

class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit:{},
        }

    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async ()=>{
        let response = await getAllUsersAPI('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser=()=>{
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal =()=>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    } 
    toggleEditUserModal=()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser=async(data)=>{
        try {
            let response = await createNewUserFromUserService(data);
            if(response && response.errCode!==0){
                alert(response.errMessage)
            }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser =async(user)=>{
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){
                this.getAllUsersFromReact()
            }else{
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleEditUser = (user)=>{
        this.setState({
            isOpenModalEditUser: true,
             userEdit: user
        })
    }
    handleSaveUser=async(user)=>{
        try {
            let res = await editUserService(user);
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
            }else{
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        let users = this.state.arrUsers;
        return (
            <div className="container">
                <ModalAddUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUserParent = {this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                <ModalEditUser
                 isOpen = {this.state.isOpenModalEditUser}
                 toggleEditUserFromParent = {this.toggleEditUserModal}
                 currentUserParent = {this.state.userEdit}
                 editUserParent = {this.handleSaveUser}
                />}
                <div className="text-center title">Manage users</div>
                <button className="btn btn-primary px-3 my-4 ms-0"
                    onClick = {()=>this.handleAddNewUser()}
                >+ Add new user</button>
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Role ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                       <tbody>
                            {users && users.map((item, index)=>{
                                return(
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.roleId}</td>
                                        <td>
                                            <button onClick={()=>{this.handleEditUser(item)}}><i className="fas fa-user-edit"> </i></button>
                                            <button onClick={()=>{this.handleDeleteUser(item)}}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                   
                                )
                            })}
                       </tbody>

                </table>
                
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
