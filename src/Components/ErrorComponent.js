import React, { Component } from 'react';
import { connect } from 'react-redux';
import {disableErrorsLoading} from '../Action/errorAction';
class ErrorComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            error: {
                errorMessage: null,
                errorType: null,
                errorShow: false
            }
        }
    }
    componentDidUpdate(){
        if(this.props.errorLoading){
            this.props.disableErrorsLoading()
            this.setState({...this.state, error: this.props.error})
        }
    }
    render(){
        return(
            <div>
                {this.state.error.errorShow === true && this.state.error.location === this.props.location? 
                    <center>
                        <span className="errorText">{this.props.error.errorMessage}</span>
                    </center>
                :
                    <></>
                }
            </div>
        )
    }
}

const mapStateToProps =(state) =>({
    error: state.errorState.error,
    errorLoading: state.errorState.errorLoading
})

export default connect(mapStateToProps, {disableErrorsLoading})(ErrorComponent);