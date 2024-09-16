import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import  './TableManageUser.scss';
import * as actions from '../../../store/actions'
import {LANGUAGES, CRUD_ACTION} from '../../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import {getDetailOfDoctorServiceFromReact} from '../../../services/userService'
// import Specialty from '../../HomePage/Section/Specialty';



// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class TableManageDoctors extends Component {

    constructor(props){
        super(props);
        this.state={
            //save markdown
            contentMarkdown: '',
            contentHtml:'',
            selectedOption: '',
            description:'',
            listDoctors:[],
            hasOldData: false,
            //save doctor information
            listPrices:[],
            listPayMethods:[],
            listProvinces:[],
            listClinics:[],
            listSpecialties:[],

            selectedPrice:'',
            selectedPayMethod:'',
            selectedProvince:'',
            selectedClinic:'',
            selectedSpecialty:'',


            clinicName:'',
            clinicAddress:'',
            note:'',
            specialtyId:'',
            clinicId:''

        }
    }
    componentDidMount(){
      this.props.fetchAllDoctorsRedux();
      this.props.fetchRequiredDoctorInfoRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      if(prevProps.allDoctors !== this.props.allDoctors){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
        this.setState({
            listDoctors: dataSelect
        })
      }
    //   if(prevProps.language !== this.props.language){
    //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
    //     this.setState({
    //         listDoctors: dataSelect
    //     })
    //   }
     
      if(prevProps.allDoctorInfos !== this.props.allDoctorInfos){
        let{resPrice, resPayment, resProvince, resSpecialties, resClinics} =this.props.allDoctorInfos;
        let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
        let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
        let dataSelectSpecialty = this.buildDataInputSelect(resSpecialties, 'SPECIALTY');
        let dataSelectClinic = this.buildDataInputSelect(resClinics, 'CLINIC');
        
        this.setState({
            listPrices: dataSelectPrice,
            listPayMethods: dataSelectPayment,
            listProvinces: dataSelectProvince,
            listSpecialties: dataSelectSpecialty,
        })
      }
      if(prevProps.language !== this.props.language){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
        let{resPrice, resPayment, resProvince, resClinics} =this.props.allDoctorInfos;

        console.log('this.props (form TableManageDoctor)', this.props)

        let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
        let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
        let dataSelectClinic = this.buildDataInputSelect(resClinics, 'CLINIC');

        this.setState({
            listDoctors: dataSelect,
            listPrices: dataSelectPrice,
            listPayMethods: dataSelectPayment,
            listProvinces: dataSelectProvince,
            listClinics: dataSelectClinic,
        })
      }
    }

    buildDataInputSelect = (inPutData, type)=>{
        let result = [];
        let {language}= this.props;
        if( inPutData && inPutData.length > 0){
            if(type === 'USERS'){
                inPutData.map((item, index)=>{
                    let object={};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI? labelVi: labelEn;
                    object.value = item.id;
                    result.push(object);
                    
                })
            }
            if(type==='PRICE'){
                inPutData.map((item, index)=>{
                    let object={};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI? labelVi: labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type ==='PAYMENT' || type ==='PROVINCE'  ){
                inPutData.map((item, index)=>{
                    let object={};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI? labelVi: labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type ==='SPECIALTY' ){
                inPutData.map((item, index)=>{
                    let object={};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type ==='CLINIC' ){
                inPutData.map((item, index)=>{
                    let object={};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }   
        return result;
    }
    // Finish!
    handleEditorChange=({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHtml: html,
        })
    }

    handleSaveContentMarkdown() {
        let {hasOldData} = this.state
        // console.log('this.state luu: ', this.state)
        this.props.saveInfoDoctorRedux({
            contentHTML : this.state.contentHtml,
            contentMD: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData===true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            
            selectedPrice: this.state.selectedPrice.value,
            selectedPayMethod: this.state.selectedPayMethod.value,
            selectedProvince: this.state.selectedProvince.value,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value

        })
    }
    handleChangeSelect =async (selectedOption) => {
        this.setState({ selectedOption });
        console.log('setState: selectedOption(TableManageDoctor) ', selectedOption)
        let {listPrices, listPayMethods, listProvinces, listSpecialties, listClinics} = this.state;
        console.log('this.state (TableManageDoctor) ', this.state)
        let res = await getDetailOfDoctorServiceFromReact(selectedOption.value);
        console.log('res (TableManageDoctor) :', res)

        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown
            let clinicAddress ='', clinicName ='', note='', paymentId='', priceId='', provinceId='', clinicId='',
            selectedPayMethod='', selectedPrice='',selectedProvince='', selectedSpecialty='', selectedClinic='',specialtyId='';
            if(res.data.DoctorInfo){
                clinicAddress = res.data.DoctorInfo.clinicAddress;
                clinicName = res.data.DoctorInfo.clinicName;
                note = res.data.DoctorInfo.note;
                
                paymentId = res.data.DoctorInfo.paymentId;
                priceId = res.data.DoctorInfo.priceId;
                provinceId = res.data.DoctorInfo.provinceId;
                specialtyId = res.data.DoctorInfo.specialtyId;
                clinicId = res.data.DoctorInfo.clinicId;

                selectedPayMethod = listPayMethods.find(item=>{
                    return item && item.value === paymentId;
                })
                selectedPrice = listPrices.find(item=>{
                    return item && item.value === priceId;
                })
                selectedProvince = listProvinces.find(item=>{
                    return item && item.value === provinceId;
                }) 
                selectedSpecialty = listSpecialties.find(item=>{
                    return item && item.value === specialtyId;
                })
                selectedClinic = listClinics.find(item=>{
                    return item && item.value === clinicId;
                })
            }
            // console.log('res.data: ', res.data )
            this.setState({
                contentHtml : markdown.contentHTML,
                contentMarkdown: markdown.contentMD,
                description: markdown.description,
                hasOldData: true,
                clinicAddress : clinicAddress,
                clinicName : clinicName,
                note : note,
                selectedPayMethod: selectedPayMethod,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            })
            // console.log('this.state',this.state )
        }else{
            this.setState({
                contentHTML : '',
                contentMD: '',
                description: '',
                hasOldData:false,
                clinicAddress : '',
                clinicName : '',
                note : '',
                selectedPayMethod: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
            })
        }
    } 
    
    handleChangeSelectDoctorInfo =async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = {...this.state}
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDesc=(event, id)=>{
        let stateCopy = {...this.state}
        stateCopy[id]= event.target.value
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let {hasOldData} = this.state;
   
        // console.log('this.state: ', this.state);
        return (
            <div className="container manage-doctor">
                <p className="text-center title"> <FormattedMessage id ="admin.manage-doctor.title"/></p>
                <div className='more-info col-12 d-flex justify-content-between my-3'>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.choose-doctor"/></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            // className='form-control' 
                        />
                    </div>
                    <div className="content-right form-group col-md-6">
                        <label><FormattedMessage id ="admin.manage-doctor.info"/></label>
                        <textarea className='form-control' rows="4"
                        onChange={(event)=>this.handleOnchangeDesc(event, 'description')}
                        value = {this.state.description}
                        > 
                                
                        </textarea>
                    </div>
                </div>
                <div className='price-paymethod-province col-12 d-flex justify-content-between my-3'>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.choose-price"/></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrices}
                            name="selectedPrice"
                            // className='form-control' 
                            
                        />
                    </div>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.choose-paymethod"/></label>
                        <Select
                            value={this.state.selectedPayMethod}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayMethods}
                            name="selectedPayMethod"
                            // className='form-control' 
                        />
                    </div>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.choose-province"/></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvinces}
                            name="selectedProvince"
                            // className='form-control' 
                        />
                    </div>
                    
                </div>
                <div className='clinic-info col-12 d-flex justify-content-between my-3'>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.clinic-name"/></label>
                        <input className="form-control"
                          onChange={(event)=>this.handleOnchangeDesc(event, 'clinicName')}
                          value={this.state.clinicName}
                         ></input>
                           
                    </div>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.clinic-address"/></label>
                        <input className="form-control"
                         onChange={(event)=>this.handleOnchangeDesc(event, 'clinicAddress')}
                         value={this.state.clinicAddress}
                         ></input>
                    </div>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.note"/></label>
                        <input className="form-control"
                         onChange={(event)=>this.handleOnchangeDesc(event, 'note')}
                         value={this.state.note}
                         ></input>
                    </div>
                    
                </div>
                <div className='specialty-clinic col-12 d-flex justify-content-between my-3'>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.choose-specialty"/></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialties}
                            name="selectedSpecialty"
                            // className='form-control' 
                        />
                           

                    </div>
                    <div className="content-left form-group col-md-4">
                        <label> <FormattedMessage id ="admin.manage-doctor.choose-clinic"/></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinics}
                            name="selectedClinic"
                            // className='form-control' 
                        />
                   
                    </div>
                </div>


                <div className='manage-doctor-bottom'>
                    <MdEditor style={{ height: '300px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                    value={this.state.contentMarkdown}/>
                </div>
                <button className={hasOldData===true ? 'save-content my-5 px-2 btn' : 'create-content my-5 px-2 btn'}
                style={{border:'1px solid black'}}
                onClick={()=>this.handleSaveContentMarkdown()}
                >
                    {hasOldData===true ? <span><FormattedMessage id ="admin.manage-doctor.save"/></span>:<span><FormattedMessage id ="admin.manage-doctor.create"/></span>}</button>
            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allDoctorInfos: state.admin.allDoctorInfos,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: ()=>dispatch(actions.fetchAllDoctors()),
        saveInfoDoctorRedux: (data)=>dispatch(actions.saveInfoDoctor(data)),
        fetchRequiredDoctorInfoRedux:()=>dispatch(actions.fetchRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageDoctors);
