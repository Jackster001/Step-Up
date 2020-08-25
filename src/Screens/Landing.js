import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Startbox, Jobboard} from '../Components'; 

class Landing extends Component {
    componentDidMount() {
        if (this.props.isAuthenticated) {
          this.props.history.push('/home');
        }
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
          this.props.history.push('/home');
        }
    }
    render() {
        return (
        <div>
            <Startbox />
            <br/><br/><br/>
            {/* <Jobboard/> */}
        </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated
})

export default connect(mapStateToProps)(Landing);