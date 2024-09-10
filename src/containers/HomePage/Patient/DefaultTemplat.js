import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';

import { FormattedMessage } from 'react-intl';

class DefaultClass extends Component {
    constructor(props){
        super(props);
        this.state ={
           
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        // let allDays = this.getArrDays(language);
        this.setState({
            
        }) 
    }
  
    async componentDidUpdate(prevProps, prevState, snapshot){
  
    }

    render() {
        // let{isShowDetailInfo, extraInfo} = this.state;
        // let {language} = this.props;
        // console.log('status check: ', this.state)

       
        return (
            <React.Fragment>
                <div className="doctor-extra-info-container">
                    <div className="content-up">
       
                    </div>
                    <div className="content-down">
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language : state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
