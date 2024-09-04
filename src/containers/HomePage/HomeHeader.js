import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import{ LANGUAGES} from '../../utils';
import {changeLanguageApp }from '../../store/actions'



class HomeHeader extends Component {

    changeLanguage=(language)=>{
        //fire redux event: action
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language;

        return (
         <React.Fragment>
              <div className= "container">
                <div className= "home-header-content">
                    <div className= "home-header-left">
                        <i className="fas fa-bars"></i>
                        <div className="logo"></div>
                    </div>
                    <div className= "home-header-center">
                        <div>
                            <p><b><FormattedMessage id ="home-header.speciality"/></b></p>
                            <p><FormattedMessage id ="home-header.search-doctor"/></p>
                        </div>
                        <div>
                            <p><b><FormattedMessage id ="home-header.facility"/></b></p>
                            <p><FormattedMessage id ="home-header.select-hospital"/></p>
                        </div>
                        <div>
                            <p><b><FormattedMessage id ="home-header.doctor"/></b></p>
                            <p><FormattedMessage id ="home-header.select-doctor"/></p>
                        </div>
                        <div>
                            <p><b><FormattedMessage id ="home-header.package"/></b></p>
                            <p><FormattedMessage id ="home-header.health-check-up"/></p>
                        </div>
                    </div>
                    <div className="home-header-right">
                        <i className="fas fa-question-circle"></i>
                        <p><b><FormattedMessage id ="home-header.support"/></b></p>
                        <p className={language === LANGUAGES.VI? "language-vi active" :"language-vi"}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></p>
                        <p className={language === LANGUAGES.EN? "language-en active" :"language-en"}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></p>
                    </div>
                </div>
              </div>
              {this.props.isShowBanner === true &&
            <div  className="home-header-banner">
                <div className="content-up">
                    <div className="title1"><FormattedMessage id ="banner.medical-platform"/></div>
                    <div className="title2"><FormattedMessage id ="banner.complete-health"/></div>
                    <div className="search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm"></input>
                    </div>
                    <div className="options-social">
                            <img className="image1" />
                            <img className="image2" />
                    </div>
                </div>
                <div className="content-down">
                    <div className="options-menu">
                        <div className="items">
                            <div className="item item1">
                                <div><i className="fas fa-hospital-alt"></i></div>
                                <p><FormattedMessage id ="banner.specialist-examination"/></p>
                            </div>
                            <div className="item item2">
                                <div><i className="fas fa-mobile-alt"></i></div>
                                <p><FormattedMessage id ="banner.remote-examination"/></p>
                            </div>
                            <div className="item item3">
                                <div><i className="fas fa-notes-medical"></i></div>
                                <p><FormattedMessage id ="banner.general-examination"/></p>
                            </div>
                            <div className="item item4">
                            <div><i className="fas fa-stethoscope"></i></div>
                                <p><FormattedMessage id ="banner.medical-test"/></p>
                            </div>
                            <div className="item item5">
                                <div><i className="fas fa-heart"></i></div>
                                <p><FormattedMessage id ="banner.mental-health"/></p>
                            </div>
                            <div className="item item6">
                            <div><i className="far fa-hospital"></i></div>
                                <p><FormattedMessage id ="banner.dental-check"/></p>
                            </div>
    
                        </div>
    
                    </div>
                </div>
    
            </div>
            }
         </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language)=>{
            dispatch(changeLanguageApp(language));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
