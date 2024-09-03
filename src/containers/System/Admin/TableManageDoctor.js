import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import  './TableManageUser.scss';
import * as actions from '../../../store/actions'
import {LANGUAGES} from '../../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';



// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class TableManageDoctors extends Component {

    constructor(props){
        super(props);
        this.state={
            contentMarkdown: '',
            contentHtml:'',
            selectedOption: '',
            description:'',
            listDoctors:[],
        }
    }
    componentDidMount(){
      this.props.fetchAllDoctorsRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
      if(prevProps.allDoctors !== this.props.allDoctors){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        this.setState({
            listDoctors: dataSelect
        })
      }
      if(prevProps.language !== this.props.language){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        this.setState({
            listDoctors: dataSelect
        })
      }
    }

    buildDataInputSelect = (inPutData)=>{
        let result = [];
        let {language}= this.props;
        if( inPutData && inPutData.length > 0){
            inPutData.map((item, index)=>{
                let object={};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI? labelVi: labelEn;
                object.value = item.id;
                result.push(object);

            })
        }
        return result
    }
    // Finish!
    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHtml: html,
        })
    }

    handleSaveContentMarkdown() {
        console.log('this.state luu: ', this.state)
        this.props.saveInfoDoctorRedux({
            contentHTML : this.state.contentHtml,
            contentMD: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption }
            // , () =>
        //   console.log(`Option selected:`, this.state.selectedDoctor)
        );
      }

      handleOnchangeDesc=(event)=>{
        this.setState({
            description: event.target.value
        })
      }
    render() {
   
        console.log('this.state: ', this.state);
        return (
            <div className="container manage-doctor">
                <p className="text-center title">Tạo thêm thông tin Bác sĩ</p>
                <div className='more-info col-12 d-flex justify-content-between my-3'>
                    <div className="content-left form-group col-md-4">
                        <label>Chon bac si</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            // className='form-control' 
                        />
                    </div>
                    <div className="content-right form-group col-md-6">
                        <lable>Thong tin gioi thieu</lable>
                        <textarea className='form-control' rows="4"
                        onChange={(event)=>this.handleOnchangeDesc(event)}
                        value = {this.state.description}
                        > 
                                
                        </textarea>
                    </div>
                </div>

                <div className='manage-doctor-bottom'>
                    <MdEditor style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} />
                </div>
                <button className='my-5 px-2 btn'
                style={{border:'1px solid black'}}
                onClick={()=>this.handleSaveContentMarkdown()}
                >Save</button>
            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=>dispatch(actions.fetchAllDoctors()),
        saveInfoDoctorRedux: (data)=>dispatch(actions.saveInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageDoctors);
