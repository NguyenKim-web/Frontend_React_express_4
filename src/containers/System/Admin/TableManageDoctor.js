import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import  './TableManageUser.scss';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class TableManageDoctors extends Component {

    constructor(props){
        super(props);
        this.state={
            contentMarkdown: '',
            contentHtml:'',
            selectedDoctor: '',
            description:'',
        }
    }
    componentDidMount(){
      this.props.dispatch(fetchAllDoctors());
    }
    componentDidUpdate(prevProps, prevState, snapshot){
       
    }
    // Finish!
    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHtml:html,
        })
    }

    handleSaveContentMarkdown() {
        alert('ok')
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
   
        return (
            
            <div className="container manage-doctor">
                <p className="text-center title">Tạo thêm thông tin Bác sĩ</p>
                <div className='more-info col-12 d-flex justify-content-between my-3'>
                    <div className="content-left form-group col-md-4">
                        <lable>Chon bac si</lable>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
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
                    onChange={()=>this.handleEditorChange} />
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
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=>dispatch(actions.fetchAllDoctors()),
        // deleteUserRedux: (id)=>dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageDoctors);
