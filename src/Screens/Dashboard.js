import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Appliedboard} from '../Components';
import {disableUserProfileLoading} from '../Action/authAction';

class Dashboard extends Component {

  

  componentDidUpdate(){
    if(this.props.loadingProfile){
      this.props.disableUserProfileLoading()
      this.setState({...this.state, profile: this.props.profile})
      console.log(this.props.profile)
    }
  }

  render() {
    return (
      <div>
        <Appliedboard/>
      </div>
    );
  }
}
const mapStateToProps =(state) =>({
  loadingProfile: state.userState.loadingProfile,
  profile: state.userState.profile
})

export default connect(mapStateToProps, {disableUserProfileLoading})(Dashboard);