import React, { Component } from 'react';
import { connect } from "react-redux";

import {CommonUtils} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { createNewClinicServiceFromReact } from '../../../services/userService';
import {  toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props){
        super(props);
        this.state ={
           name:'',
           address:'',
           imageBase64:'',
           descHTML:'',
           descMarkdown:''
        }
    }
    async componentDidMount(){
        // let {language} = this.props;
        // let allDays = this.getArrDays(language);
        this.setState({
            
        }) 
    }
  
    async componentDidUpdate(prevProps, prevState, snapshot){
  
    }
    handleEditorChange=({ html, text })=> {
        this.setState({
            descMarkdown: text,
            descHTML: html,
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
                imageBase64 : base64
            })
        }
    }
    handleOnchangeInput=(event, id)=>{
        let stateCopy = {...this.state};
        stateCopy[id] =event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleSaveClinic = async() =>{
        let res = await createNewClinicServiceFromReact(this.state)
        if(res && res.errCode === 0){
            toast.success("Add new Clinic is succeed")
            this.setState({
                name:'',
                imageBase64:'',
                address:'',
                descHTML:'',
                descMarkdown:''
            })
        }else{
            toast.error("Add new Clinic is failed")

        }
    }   

    render() {
        // let{isShowDetailInfo, extraInfo} = this.state;
        // let {language} = this.props;
        // console.log('status check: ', this.state)

       
        return (
            <React.Fragment>
                <div className="manage-clinic-container">
                <div className="container">
                    <div className="content-top my-3">
                        <p className="text-center title"><FormattedMessage id="admin.manage-clinic.title"/></p>
                        
                    </div>
                    <div className="all-clinic">
                        <div className="row my-3">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="admin.manage-clinic.clinic_name"/></label>
                                <input className="form-control" type="text"
                                    value={this.state.name}
                                    onChange = {(event)=>this.handleOnchangeInput(event, 'name')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="admin.manage-clinic.clinic_image"/></label>
                                <input className="form-control" type ="file"
                                    onChange ={(event)=>this.handleOnchangeImage(event)}

                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="admin.manage-clinic.clinic_address"/></label>
                                <input className="form-control" type="text"
                                    value={this.state.address}
                                    onChange = {(event)=>this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            {/* <div className="col-6 form-group">
                                <label><FormattedMessage id="admin.manage-clinic.clinic_image"/></label>
                                <input className="form-control" type ="file"
                                    onChange ={(event)=>this.handleOnchangeImage(event)}

                                />
                            </div> */}
                        </div>
                        <MdEditor style={{ height: '300px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.descMarkdown}/>
                        <div>
                            <button
                                className="btn my-3 px-2"
                                style={{border:"1px solid black"}}
                                onClick ={()=>this.handleSaveClinic()}
                            ><FormattedMessage id="admin.manage-clinic.save"/></button>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
