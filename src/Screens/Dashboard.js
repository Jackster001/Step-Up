import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Appliedboard} from '../Components';
import {disableUserProfileLoading} from '../Action/authAction';
import {openingEditModalFunction} from '../Action/profileAction';
import {withStyles, Box, Typography} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const drawerWidth = 240;

const useStyles = (theme) => ({
  // content: {
  //   flexGrow: 1,
  //   marginTop: '50px',
  // },
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  root2: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // backgroundColor: '#eeeeee',
    padding: theme.spacing(3),
    width: `calc(100% - ${drawerWidth-70}px)`,
    marginLeft: drawerWidth-35,
    marginTop: '0px'
  },
})

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state={
      index:0
    }
  }

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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.root2}>
        <AppBar position="fixed" className={classes.appBar}>
            <Tabs value={this.state.index} onChange={(e,v)=> this.setState({...this.state,index:v})} aria-label="simple tabs example">
            <Tab label="List View" {...a11yProps(0)} />
            <Tab label="Board View" {...a11yProps(1)} />
            </Tabs>
        </AppBar></div>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
          <TabPanel value={this.state.index} index={0}>
            <Appliedboard/> 
            {/* <Typography paragraph>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
            </Typography> */}
          </TabPanel>
          <TabPanel value={this.state.index} index={1}>
            {/* <Appliedboard/>  */}
            <Typography paragraph>
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
            </Typography>
          </TabPanel>
      </main>
    {/* <div><Appliedboard/></div> */}
    </div>
    );
  }
}
const mapStateToProps =(state) =>({
  loadingProfile: state.userState.loadingProfile,
  profile: state.userState.profile,
  openingEditModal: state.userState.openingEditModal,
})

export default connect(mapStateToProps, {disableUserProfileLoading, openingEditModalFunction})(withStyles(useStyles)(Dashboard));