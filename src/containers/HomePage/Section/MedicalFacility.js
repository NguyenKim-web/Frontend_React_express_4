import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import hospital from '../../../assets/images/hospital.jpg'
import { getAllClinicsServiceFromReact } from '../../../services/userService';
import {withRouter} from 'react-router'

class MedicalFacility extends Component {
    constructor(props){
        super(props);
        this.state ={
            dataClinic:[]
        }
    }
    async componentDidMount(){
        let res = await getAllClinicsServiceFromReact();
        // console.log('check data specialty(res)', res)
        if(res && res.errCode === 0){
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic(item){
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${item.id}`)

        }
    }
    render() {
        let {dataClinic} =this.state
        return (
            <div className="section-content-common medical-facility-content  py-5">
                <div className="container">
                    <div className="section-content-common-body medical-facility-body">
                        <div className="section-content-common-top medical-facility-top">
                        <h3><FormattedMessage id="homepage.facility"/></h3>
                        <button><FormattedMessage id="homepage.read-more"/></button>
                        </div>
                        <Slider {...this.props.settings}>
                        {dataClinic && dataClinic.length>0 &&
                            dataClinic.map((item, index)=>{
                                return(
                                    <div className="item-customize-border" key={index} onClick={()=>this.handleViewDetailClinic(item)} >
                                        <div className="item-customize">
                                            <div className="img-customize each-img" style={{backgroundImage: `url(${item.image})`}}></div>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                        </Slider>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
