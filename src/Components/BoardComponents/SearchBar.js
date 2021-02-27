import { Button, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobListItem from './JobListItem';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = (theme) => ({
    fieldStyle:{
        width: '100%',
    },
    inputStyle:{
        padding: '12px 7px'
    },
    buttonStyle:{
        padding: '9px 14px'
    }
});


class SearchBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
       
    }


    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField className={classes.fieldStyle} InputProps={{ classes: { input: classes.inputStyle } }} variant="outlined" placeholder="Search for Jobs" value={this.props.value} onChange={(e)=>this.props.onChangeValue(e)}/>
                </Grid>
                <Grid item xs={9}>
                    <Button className={classes.buttonStyle} color="primary" variant="contained" onClick={() => this.props.onPressSearch()}>Search</Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps =(state) =>({
})

export default connect(mapStateToProps)(withStyles(useStyles)(SearchBar));