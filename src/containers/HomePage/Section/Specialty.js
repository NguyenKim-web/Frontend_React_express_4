import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import co_xuong_khop from '../../../assets/images/co-xuong-khop.jpg'
import { getAllSpecialtiesServiceFromReact } from '../../../services/userService';
import {withRouter} from 'react-router'


class Specialty extends Component {
    constructor(props){
        super(props);
        this.state ={
            dataSpecialty:[]
        }
    }
    async componentDidMount(){
        let res = await getAllSpecialtiesServiceFromReact();
        console.log('check data specialty(res)', res)
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    handleViewDetailSpecialty(item){
        if(this.props.history){
            this.props.history.push(`/detail-specialty/${item.id}`)

        }
    }
    render() {
       let {dataSpecialty} = this.state
    //    console.log('check data specialty', dataSpecialty)
        return (
            <div className="section-content-common specialty-content py-5">
                <div className="container">
                    <div className="section-content-common-body specialty-body">
                        <div className="section-content-common-top specialty-top">
                            <h3><FormattedMessage id ="homepage.specialty"/></h3>
                            <button><FormattedMessage id ="homepage.read-more"/></button>
                        </div>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length>0 &&
                            dataSpecialty.map((item, index)=>{
                                return(
                                    <div className="item-customize-border">
                                        <div className="item-customize " key = {index} onClick={()=>this.handleViewDetailSpecialty(item)} >
                                            <div className="img-customize each-img" style={{backgroundImage: `url(${item.image})`}}>
                                            
                                            </div>

                                            <div>{item.name}</div>
                                        </div>
                                    </div>
                                )
                                })
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
