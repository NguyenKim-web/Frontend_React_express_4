import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import co_xuong_khop from '../../../assets/images/co-xuong-khop.jpg'


class Specialty extends Component {
    render() {
       
        return (
            <div className="section-content-common specialty-content py-5">
                <div className="container">
                    <div className="section-content-common-body specialty-body">
                        <div className="section-content-common-top specialty-top">
                            <h3>Chuyên khoa phổ biến</h3>
                            <button>Xem thêm</button>
                        </div>
                        <Slider {...this.props.settings}>
                        <div className="item-customize-border">
                            <div className="item-customize">
                                <div className="img-customize"><img src={co_xuong_khop}/></div>
                                <p>Cơ xương khớp</p>
                            </div>
                        </div>
                        <div className="item-customize-border">
                            <div className="item-customize">
                                <div className="img-customize"><img src={co_xuong_khop}/></div>
                                <p>Thần kinh</p>
                            </div>
                        </div>
                        <div className="item-customize-border">
                            <div className="item-customize">
                                <div className="img-customize"><img src={co_xuong_khop}/></div>
                                <p>Tim mạch</p>
                            </div>
                        </div>
                        <div className="item-customize-border">
                            <div className="item-customize">
                                <div className="img-customize"><img src={co_xuong_khop}/></div>
                                <p>Tiêu hóa</p>
                            </div>
                        </div>
                        <div className="item-customize-border">
                            <div className="item-customize">
                                <div className="img-customize"><img src={co_xuong_khop}/></div>
                                <p>Nội khoa</p>
                            </div>
                        </div>
                        <div className="item-customize-border">
                            <div className="item-customize">
                                <div className="img-customize"><img src={co_xuong_khop}/></div>
                                <p>Răng hàm mặt</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
