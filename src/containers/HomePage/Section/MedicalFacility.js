import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hospital from '../../../assets/images/hospital.jpg'


class MedicalFacility extends Component {
    render() {
        
        return (
            <div className="section-content-common medical-facility-content  py-5">
                <div className="container">
                    <div className="section-content-common-body medical-facility-body">
                        <div className="section-content-common-top medical-facility-top">
                            <h3>Cơ sở y tế nổi bật</h3>
                            <button>Xem thêm</button>
                        </div>
                        <Slider {...this.props.settings}>
                            <div className="item-customize-border">
                                <div className="item-customize">
                                    <div className="img-customize"><img src={hospital}/></div>
                                    <p>Bệnh viện đa khoa 1</p>
                                </div>
                            </div>
                            <div className="item-customize-border">
                                <div className="item-customize">
                                    <div className="img-customize"><img src={hospital}/></div>
                                    <p>Bệnh viện đa khoa 2</p>
                                </div>
                            </div>
                            <div className="item-customize-border">
                                <div className="item-customize">
                                    <div className="img-customize"><img src={hospital}/></div>
                                    <p>Bệnh viện đa khoa 3</p>
                                </div>
                            </div>
                            <div className="item-customize-border">
                                <div className="item-customize">
                                    <div className="img-customize"><img src={hospital}/></div>
                                    <p>Bệnh viện đa khoa 4</p>
                                </div>
                            </div>
                            <div className="item-customize-border">
                                <div className="item-customize">
                                    <div className="img-customize"><img src={hospital}/></div>
                                    <p>Bệnh viện đa khoa 5</p>
                                </div>
                            </div>
                            <div className="item-customize-border">
                                <div className="item-customize">
                                    <div className="img-customize"><img src={hospital}/></div>
                                    <p>Bệnh viện đa khoa 6</p>
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
