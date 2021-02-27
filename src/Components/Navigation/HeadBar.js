import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import {a11yProps} from '../../Utils/helper';

function HeadBar(props) {
    const { index, ...other } = props;
    const width = `calc(100% - ${240}px")`;
  
    return (
        <AppBar position="fixed" style={{marginLeft: '240px'}}>
            <Tabs value={index} onChange={(v)=> props.setIndex(v)} aria-label="simple tabs example">
            <Tab label="List View" {...a11yProps(0)} />
            <Tab label="Board View" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
    );
}

export default HeadBar