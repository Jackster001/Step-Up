import React, { Component } from 'react';
import { connect } from 'react-redux';
class StatusBar extends Component{
    constructor(props){
        super(props)
        this.state={
            status:this.props.status
        }
    }
    componentDidMount(){
        this.setState({status: this.props.status})
    }
    render(){
        return (
            <div className="statusBarContainer">
                <ol className="ProgressBar">
                    <li className="ProgressBar-step">
                        <svg className={this.props.status > 0 ? "ProgressBar-icon is-current" : "ProgressBar-icon"} ></svg>
                        <span className="ProgressBar-stepLabel">Applied</span>
                    </li>
                    <li className="ProgressBar-step" >
                        <svg className={this.props.status > 1 ? "ProgressBar-icon is-current" : "ProgressBar-icon"} ></svg>
                        <span className="ProgressBar-stepLabel">Interview</span>
                    </li>
                    <li className="ProgressBar-step">
                        <svg className={this.props.status > 2 ? "ProgressBar-icon is-current" : "ProgressBar-icon"} ></svg>
                        <span className="ProgressBar-stepLabel">Rejected</span>
                    </li>
                    <li className="ProgressBar-step">
                        <svg className={this.props.status > 3 ? "ProgressBar-icon is-current" : "ProgressBar-icon"} ></svg>
                        <span className="ProgressBar-stepLabel">Offer</span>
                    </li>
                </ol>
            </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
})

export default connect(mapStateToProps)(StatusBar);