import React, { Component} from 'react';
import { connect } from "react-redux";
import {  CommonUtils } from '../../../utils';
// import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './RemedyModal.scss';
// import _ from 'lodash';
// import {  toast } from 'react-toastify';
// import moment from 'moment'

class RemedyModal extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:'',
            imgB64:'',
         
        }
    }
    async componentDidMount(){
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
        
    }
   
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnchangeEmail=(event)=>{
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangeImage=async (event)=>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            // let objectURL = URL.createObjectURL(file);
            this.setState({
                // previewImgUrl: objectURL,
                imgB64 : base64
            })
        }
    }
    handleSendRemedy=()=>{
        this.props.sendRemedy(this.state)
    }
    render() {
        let{isOpenModalBookingFromParen, closeRemedyModal, dataModal, sendRemedy} = this.props;
        // console.log('this.state: (remedyModal)', this.state)
        return (
            <Modal isOpen={isOpenModalBookingFromParen}  className={"booking-modal"} size="lg" centered>
                <ModalHeader toggle = {closeRemedyModal}>Gui hoa don kham benh thanh cong</ModalHeader>
                <ModalBody>
                    <div className = "row">
                        <div className = "col-6 form-group">
                            <label>Email benh nhan</label>
                            <input className = "form-control" type="email" value={this.state.email}
                                onChange ={(event)=>this.handleOnchangeEmail(event)}
                            ></input>
                        </div> 
                        <div className = "col-6 form-group">
                            <label>Chon file</label>
                            <input className = "form-control" type="file" 
                                onChange ={(event)=>this.handleOnchangeImage(event)}
                            ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color= "primary" onClick ={this.handleSendRemedy()}>Gui</Button>
                    <Button color= "secondary" onClick ={closeRemedyModal}>Huy</Button>
                </ModalFooter>
            </Modal> 
        );
    }
}

const mapStateToProps = state => {
    return {
        language : state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
