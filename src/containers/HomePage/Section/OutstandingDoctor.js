import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils'
import {withRouter} from 'react-router'


class OutstandingDoctor extends Component {

    constructor(props){
        super(props)
        this.state={
            arrDoctors:[]
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount(){
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor(doctor){
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
       let allDoctors = this.state.arrDoctors;
       let {language} = this.props;
        // console.log( 'this.props (OutstandingDoctor): ',this.props.topDoctorsRedux)
        // console.log( 'this.state (OutstandingDoctor): ',this.state)
        return (
            <div className="section-content-common outstanding-doctor-content py-5">
                <div className="container">
                    <div className="section-content-common-body outstanding-doctor-body">
                        <div className="section-content-common-top outstanding-doctor-top">
                            <h3><FormattedMessage id="homepage.outstanding-doctor"/></h3>
                            <button><FormattedMessage id="homepage.read-more"/></button>
                        </div>
                        <Slider {...this.props.settings}>
                        {allDoctors && allDoctors.length > 0 &&  allDoctors.map((item, index)=>{
                            let imageBase64='';
                            if(item.image){ imageBase64 = new Buffer(item.image, 'base64').toString('binary');}
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName}  ${item.firstName}`;
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                            console.log("nameVi: ", nameVi);
                            console.log("LANGUAGES.VI: ", LANGUAGES.VI);
                            return(
                                <div className="item-customize-border" key={index} onClick={()=>this.handleViewDetailDoctor(item)}>
                                    <div className="item-customize doctor-item">
                                        <div className="img-customize doctor-img "
                                        style={{backgroundImage: `url(${imageBase64})`}}
                                        >
                                        {/* <img className="doctor" src={imageBase64}/> */}
                                        </div>
                                        <p className='text-center'>{language === LANGUAGES.VI ? nameVi: nameEn}</p>
                                        <p className='text-center'>Cơ xương khớp</p>
                                        
                                    </div>
                                </div>    
                            )
                        })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
       isLoggedIn: state.user.isLoggedIn,
       topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: ()=>dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
