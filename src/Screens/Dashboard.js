import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Appliedboard} from '../Components'

class Dashboard extends Component {

  render() {
    return (
      <div>
        <Appliedboard/>
      </div>
    );
  }
}
const mapStateToProps =(state) =>({
  
})

export default connect(mapStateToProps)(Dashboard);