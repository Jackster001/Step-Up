import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobSearchView extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (<h1>Job Search Page Under Construction</h1>)
    }
    
}
export default connect()(JobSearchView);