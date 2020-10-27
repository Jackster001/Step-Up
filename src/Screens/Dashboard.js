import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Appliedboard} from '../Components';
import {disableUserProfileLoading} from '../Action/authAction';
import {openingEditModalFunction} from '../Action/profileAction';


class Dashboard extends Component {

  

  // componentDidUpdate(){
  //   if(this.props.loadingProfile){
  //     this.props.disableUserProfileLoading()
  //     this.setState({...this.state, profile: this.props.profile})
  //     console.log(this.props.profile)
  //   }
  //   if(this.props.openingEditModal){
  //     this.props.openingEditModalFunction()
  //     this.setState({
  //         Title: this.props.editModalData.Title,
  //         Company: this.props.editModalData.Company,
  //         Description: this.props.editModalData.Description,
  //         Link: this.props.editModalData.Link,
  //         JobStatus: this.props.editModalData.JobStatus,
  //         DateCreated: this.props.editModalData.DateCreated
  //     })
  //   }
  // }

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
  profile: state.userState.profile,
  openingEditModal: state.userState.openingEditModal,
})

export default connect(mapStateToProps, {disableUserProfileLoading, openingEditModalFunction})(Dashboard);