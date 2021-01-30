import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword, resetOff } from '../Action/authAction';
import * as routes from '../Routes/routes';
import { Grid, Paper, withStyles, TextField, Container, Button, Divider } from '@material-ui/core';
import resetImage from '../Assets/Forgot Password.svg'

const useStyles = (theme) => ({
  inputStyle:{
    width: '400px',
    marginBottom: '10px'
  },
  containerStyle:{
    marginTop: '70px',
    marginBottom: "100px"
  },
  resetButton:{
    width: '400px'
  },
  titleText:{
    fontSize: "50px"
  },
  formStyle:{
    marginTop: '160px',
    marginLeft: '100px'
  }
})

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            reset: false
        }
    }

    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }

    onPressReset(e){
      e.preventDefault();
      this.props.resetPassword(this.state.email)
      this.setState({reset: true})
    }

    render() {
      const { classes } = this.props;
        return (
          <Grid container spacing={2} className={classes.containerStyle}>
            <Grid item xs={6}>
              <img src={resetImage} width={'100%'}/>
            </Grid>
              {this.state.reset === true ? 
                <Grid item xs={6}>
                  <center>
                    <h4 className="resetTexts">Your password reset request was emailed</h4>
                    <Link to={routes.LOGIN}><Button >Return to login</Button></Link>
                  </center>
                </Grid>
              :
              <Grid item xs={6}>
                <form className={classes.formStyle} onSubmit={(e)=>this.onSubmit(e)} autoComplete>
                  <h1 className={classes.titleText}>Renew Password</h1>
                  <div>
                    <TextField 
                      type="email"
                      name="email"
                      className={classes.inputStyle} 
                      label="Email" variant="outlined" 
                      onChange={this.handleInputChange}
                      // error={this.props.error.errorShow || this.state.email_error_text.length != 0}
                      helperText={this.state.email_error_text}
                      required
                    />
                  </div>
                  <div style={{width: '340px'}}><p>You will receive an email giving you instructions to reset your password</p></div>
                  <Button className={classes.resetButton} variant="contained" color="primary" onClick={(e)=>this.onPressReset(e)}>Send</Button>
                </form>
              </Grid>
              }
          </Grid>
        );
    }
}

const mapStateToProps =(state) =>({
  isAuthenticated: state.authState.isAuthenticated,
  loginError: state.authState.loginError,
  reset: state.authState.reset
})

export default connect(mapStateToProps, {resetPassword, resetOff})(withStyles(useStyles)(Reset));