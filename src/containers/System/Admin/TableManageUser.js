import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import  './TableManageUser.scss';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}



class TableManageUsers extends Component {

    constructor(props){
        super(props);
        this.state={
            usersRedux:[]
        }
    }
    componentDidMount(){
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser =(user)=>{
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser=(user)=>{
        // console.log('user la: ',user)
        this.props.handleEditUserFromParentToChild(user)
    }
    render() {
        // console.log('usersRedux la: ',this.state.usersRedux)
        let arrUsers = this.state.usersRedux
        // console.log('arrUsers la: ',arrUsers)
        return (
            <div className="container">
                <table id="customers" className="mb-5 ">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.length>0 && 
                        arrUsers.map((item, index)=>{
                            return (
                            <tr key ={index}>
                                <td>{item.email} </td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName} </td>
                                <td>{item.address}</td>
                                <td>
                                    <button
                                    onClick={()=>this.handleEditUser(item)}
                                     ><i className="fas fa-user-edit"> </i></button>  
                                    <button 
                                    onClick={()=>this.handleDeleteUser(item)}
                                    ><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=>dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id)=>dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUsers);
