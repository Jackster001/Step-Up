import React, { Component } from 'react';
import {connect} from 'react-redux';
import JobBoardView from '../Components/Views/JobBoardView';
import JobListView from '../Components/Views/JobListView';
import {Button, Grid, withStyles} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { a11yProps, DefaultSideWidth } from '../Utils/helper';
import TabPanel from '../Components/Navigation/TabPanel';
import {getProfile, addJob, setEditModalData, disableUserProfileLoading} from '../Action/profileAction';
import ApplyJobModal from '../Components/Modals/ApplyJobModal'
import EditModal from '../Components/Modals/EditModal/EditModal.js';

const useStyles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${DefaultSideWidth}px)`,
    marginLeft: DefaultSideWidth,
    backgroundColor: '#125182',
    padding: '10px'
  },
  toolbar: {
    minHeight: '30px'
  },
  content: {
    flexGrow: 1,
    minWidth: `calc(100% - ${DefaultSideWidth-DefaultSideWidth/2+80}px)`,
    marginLeft: DefaultSideWidth/2+100,
    marginTop: '20px'
  },
})

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      index:0,
      openModal: false,
      openEditModal: false,
      editIndex:0
    }
  }

  componentDidMount(){
    this.props.getProfile(this.props.profile.id);
  }

  componentDidUpdate(){
    if(this.props.loadingProfile){
      this.props.disableUserProfileLoading()
      this.setState({jobsApplied: this.props.profile.jobsApplied})
      this.closeModal();
      this.closeEditModal()
    }
  }

  closeModal(){
    this.setState({openModal:false})
  }

  onSubmit(v){
    this.props.addJob(this.props.profile.id,v);
  }

  handleEditModal(i){
    this.props.setEditModalData(this.props.profile.id, this.props.profile.jobsApplied[i]);
    this.setState({...this.state, editIndex:i})
  }

  openEditModal(){
    this.setState({...this.state, openEditModal: true})
  }

  closeEditModal(){
    this.setState({openEditModal:false, editIndex:0})
  }
  openRemoveModal(){
    this.setState({openRemoveModal: true})
  }
  closeRemoveModal(){
    this.setState({openRemoveModal: false})
  }
  onSubmit(v){
    this.props.addJob(this.props.profile.id,v);
  }
  onSubmitEdit(v,i){
    this.props.updateJob(this.props.profile.id,v,i)
  }

  onChangeIndex(e,v){
    if(v === 0){
      this.props.getProfile(this.props.profile.id);
    }
    this.setState({...this.state, index: v}) ;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Grid container>
            <Grid item xs={10}>
              <Tabs value={this.state.index} onChange={(e,v)=> this.onChangeIndex(e,v)} aria-label="simple tabs example">
                <Tab label="List View" {...a11yProps(0)} />
                <Tab label="Board View" {...a11yProps(1)} />
              </Tabs>            
            </Grid>
          <Grid item xs={2}>
          <Button variant={'contained'} color={'primary'} style={{float: 'right', marginTop: '5px', marginRight: '5px'}} onClick={()=> this.setState({openModal:true})}>Add Job</Button></Grid>
          </Grid>
        </AppBar>
        <ApplyJobModal openModal={this.state.openModal} close={()=>this.closeModal()} onSubmit={(v)=> this.onSubmit(v)} closeModal={() => this.closeModal()}/>
        <EditModal editIndex={this.state.editIndex} openModal={this.state.openEditModal} handleEditModal={(i)=>this.handleEditModal(i)} openEditModal={()=> this.openEditModal()} closeModal={()=>this.closeEditModal()}/>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <TabPanel value={this.state.index} index={0}>
            <JobListView handleEditModal={(i)=>this.handleEditModal(i)} closeModal={() => this.closeModal()}/>
          </TabPanel>
          <TabPanel value={this.state.index} index={1}>
            <JobBoardView/>
          </TabPanel>
        </main>
    </div>
    );
  }
}

const mapStateToProps =(state) =>({
  profile: state.userState.profile,
  loadingProfile: state.userState.loadingProfile
})

export default connect(mapStateToProps,{getProfile, addJob, setEditModalData, disableUserProfileLoading})(withStyles(useStyles)(Dashboard));