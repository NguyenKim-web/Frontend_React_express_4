import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import co_xuong_khop from '../../../assets/images/co-xuong-khop.jpg'


class About extends Component {
    render() {
       
        return (
            <div className="section-content-common about-content  py-5">
                <div className="container">
                    <div className="section-content-common-body about-body">
                        <div className="section-content-common-top about-top">
                            <h3>Truyền thông nói về chúng tôi</h3>
                            <button>Xem thêm</button>
                        </div>
                        <div className="about-item">
                            <div className="item-video">
                               
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/xk4_1vDrzzo" 
                                title="Java Full Course for free ☕" frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen></iframe>
                               
                            </div>
                            <div className="item-media">
                                <div className="item-customize">
                                    <p>Share your referral link to earn credit for you and your friend when they sign up to premium.</p>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
