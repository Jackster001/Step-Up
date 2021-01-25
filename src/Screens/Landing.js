import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid, Paper, withStyles, TextField, Container, Button, Divider} from '@material-ui/core';
import jobImage from '../Assets/Job hunt-amico 1.svg';
import notesImage from '../Assets/Taking notes-rafiki 1.svg';
import socialMediaImage from '../Assets/Social media-bro 1.svg';
import professionalImage from '../Assets/Virus transmission-rafiki 1.svg';
import jobHuntImage from '../Assets/Job hunt-rafiki 1.svg';
import goalImage from '../Assets/Goal-rafiki 1.svg';
import Carousel from 'react-material-ui-carousel';
import chromeExtensionImage from '../Assets/image 3.png';
import contactImage from '../Assets/Active Support-bro 1.svg';
import demoImage from '../Assets/Features Overview-pana 1.svg';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '60px'
  },
  paper: {
    padding: "20px",
    textAlign: 'left',
    // backgroundColor: "#f5f5f5",
    minHeight: '500px'
  },
  inputField:{
    padding:'15px 15px',
    textAlign: 'center',
    width: '200px'
  },
  sendButton:{
    height: '48px',
    marginLeft: '10px'
  },
  title:{
    marginTop: '150px'
  },
  bottomStyle:{
    marginBottom: '150px'
  },
  topSpace:{
    marginTop: '20px'
  },
  leftSpace:{
    marginLeft: '20px'
  },
  listItem:{
    marginBottom: '30px',
    fontSize: '20px',
    fontWeight: 800,
  },
  stepHighlight:{
    color: 'purple',
    '&:hover':{
      cursor: 'pointer'
    }
  },
  normalStep:{
    color: 'black',
    '&:hover':{
      cursor: 'pointer'
    }
  },
  extensionTexts:{
    marginTop:'140px',
    marginLeft: '180px'
  },
  contactBoard:{
    width: '100%',
    display: 'flex',
    padding: '40px 20px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    backgroundImage: 'linear-gradient(-90deg, #470eb3, #5943fa)',
    boxShadow: '5px 10px 10px #888888',
    marginTop: '50px',
  },
  whiteText:{
    color: 'white'
  },
  activeIndicator:{
    color: 'purple'
  },
  dividerStyle:{
    backgroundColor: 'orange',
    width: '80px'
  },
  contactText:{
    width: '90%',
    marginTop: '75px'
  },
});

var items = [
  {text:"Organize your job search on a list or board view",image:notesImage},
  {text:"Organize all contact information from anyone you have spoken with",image:socialMediaImage},
  {text:"Find professional email for people inside the companies you applied for",image:professionalImage},
  {text:"Search for your next opportunity through the Step Up Careers job board",image:jobHuntImage},
  {text:"Set your own goal and view your progress as you go through the job search",image:goalImage}
]

function Item(props)
{
    return (
        <Paper style={{padding: '10px'}}>
          <img src={props.index === 0? notesImage
                    : props.index === 1? socialMediaImage
                    : props.index === 2? professionalImage
                    : props.index === 3? jobHuntImage
                    : goalImage} width={'100%'}/>
          <p style={{fontSize: '16px',fontWeight: 800,textAlign: 'center'}}>{props.text}</p>
        </Paper>
    )
}

class Landing extends Component {
  constructor(props){
      super(props)
      this.state={
        index:0
      }
  }
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
  handleIndexChange=(index)=>{
    this.setState({...this.state, index});
  }
  render() {
      const { classes } = this.props;
        return (
          <div className={classes.root}>
            <Grid container spacing={2} className={classes.bottomStyle}>
              <Grid item xs={7}>
                <div className={classes.paper}>
                  <h1 className={classes.title}>Track Your Jobs</h1>
                  <p>With Step Up Careers, you can start tracking your jobs and contacts in one centralized place.</p>
                  <div>
                    <TextField 
                      inputProps={{
                        className: classes.inputField
                      }} 
                      label="Email" 
                      variant="outlined" 
                    />
                    <Button variant="contained" color="primary" className={classes.sendButton}>Send</Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.paper}>
                  <img className="animateMovement" src={jobImage} width={'100%'}/>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className={classes.leftSpace}>
                  <h1>What can we help you with?</h1><br/>
                  <ol>
                    <li className={classes.listItem}><span className={this.state.index === 0 ? classes.stepHighlight: classes.normalStep} onClick={()=>this.handleIndexChange(0)}>Job Tracking</span></li>
                    <li className={classes.listItem}><span className={this.state.index === 1 ? classes.stepHighlight: classes.normalStep} onClick={()=>this.handleIndexChange(1)}>Contact Tracking</span></li>
                    <li className={classes.listItem}><span className={this.state.index === 2 ? classes.stepHighlight: classes.normalStep} onClick={()=>this.handleIndexChange(2)}>Networking</span></li>
                    <li className={classes.listItem}><span className={this.state.index === 3 ? classes.stepHighlight: classes.normalStep} onClick={()=>this.handleIndexChange(3)}>Job Discovery</span></li>
                    <li className={classes.listItem}><span className={this.state.index === 4 ? classes.stepHighlight: classes.normalStep} onClick={()=>this.handleIndexChange(4)}>Goal Settings</span></li>
                  </ol>
                </div>
              </Grid>
              <Grid item xs={4} className={classes.topSpace}>
                <Carousel 
                  autoPlay={false} 
                  index={this.state.index} 
                  navButtonsAlwaysInvisible
                  onChange={(i)=>this.handleIndexChange(i)}
                  activeIndicatorProps={
                    {className:"activeIndicator"},
                    {style:{color:'#5943fa'}}
                  }
                >
                    {
                        items.map( (item, i) => <Item index={this.state.index} item={item.image} text={item.text} /> )
                    }
                </Carousel>
              </Grid>
            </Grid><br/><br/><br/><br/><br/><br/>
            <Grid container spacing={2} className={classes.bottomStyle}>
              <Grid item xs={5}>
                <Paper style={{padding: '5px'}}>
                  <img src={chromeExtensionImage} width={'100%'}/>
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <div className={classes.extensionTexts}>
                  <h1>Checkout out our Chrome Extension</h1>
                  <p>Save your job and contacts from whatever website your on</p>
                  <Button variant="contained" color="primary" className={classes.learnButton}>Learn More</Button>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.bottomStyle}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Grid container className={classes.contactBoard}>
                  <Grid item xs={6}>
                    <div className={classes.contactText}>
                      <h1 className={classes.whiteText}>Got Questions</h1>
                      <Divider className={classes.dividerStyle} />
                      <p className={classes.whiteText}>Need more information or need help? We’re here to support you, feel free to select one of the options. </p>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                      <Paper>
                        <img src={contactImage} width={'100%'}/>
                        <center><Button variant="contained" color="primary" className={classes.contactButton}>Contact Us</Button></center><br/>
                      </Paper></Grid>
                      <Grid item xs={6}>
                      <Paper>
                        <img src={demoImage} width={'100%'}/>
                        <center><Button variant="contained" color="primary" className={classes.contactButton}>Watch Demo</Button></center><br/>
                      </Paper></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated
})

export default connect(mapStateToProps)(withStyles(useStyles)(Landing));