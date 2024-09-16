import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
// import { FormattedMessage } from 'react-intl';
// import{ LANGUAGES} from '../../utils';
import {changeLanguageApp }from '../../store/actions'



class HomeFooter extends Component {

    changeLanguage=(language)=>{
        // alert(language);
        //fire redux event: action
        // this.props.dispatch(changeLanguageApp(language)); //dung dispatch
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        // console.log('day la: ', this.props)
        // let language = this.props.language;

        return (
         <React.Fragment>
              <div className="home-footer-container">
                  <div className= "container">
                    <div className= "home-footer-content">
                        
                    <p>&copy;2024 copy right is here</p>
                    </div>
                  </div>
              </div>
           
         </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
