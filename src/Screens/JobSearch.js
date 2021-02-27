import React, { Component } from 'react';
import {Button, Grid, withStyles} from '@material-ui/core';
import { a11yProps, DefaultSideWidth } from '../Utils/helper';

const useStyles = (theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: `calc(100% - ${DefaultSideWidth-DefaultSideWidth/2}px)`,
      marginLeft: DefaultSideWidth/2+60,
      marginTop: '20px'
    },
  })


class JobSearch extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <h1>Job Search Page Under Construction</h1>
            </div>
        )
    }
}

export default (withStyles(useStyles)(JobSearch));