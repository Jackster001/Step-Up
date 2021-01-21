import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';

class ContactCard extends Component{
    constructor(props){
        super(props)
        this.state={
            link:"#"
        }
    }
    componentDidMount(){
        // let link="#";
        // if(this.props.contactInfo.linkedin.length>0 && this.props.contactInfo.linkedin.indexOf(".com") > -1) link = this.props.contactInfo.linkedin;
        // else if(this.props.contactInfo.twitter.length>0 && this.props.contactInfo.twitter.indexOf(".com") > -1) link = this.props.contactInfo.twitter;
        // else if(this.props.contactInfo.github.length>0 && this.props.contactInfo.github.indexOf(".com") > -1) link = this.props.contactInfo.github;
        // if(link.length>4 && link.indexOf("http://") == -1) link = "http://"+link;
        // this.setState({link})
        console.log(this.props.contactInfo.contactEmail && this.props.contactInfo.contactEmail.length>0 ? "mailto: "+this.props.contactInfo.contactEmail: "#")
        this.setState({link:(this.props.contactInfo.contactEmail && this.props.contactInfo.contactEmail.length>0 ? "mailto: "+this.props.contactInfo.contactEmail: "#")})
    }
    render(){
        return (
            <div className="contactCardContainer">
                <div className="contactCardContainerTop"><FaEdit className="editIcon" size={25} onClick={()=> this.props.openEdit()}/></div>
                <center>
                    <div className="ContactCircle">
                        <h2>{this.props.contactInfo.firstName.charAt(0)}{this.props.contactInfo.lastName.charAt(0)}</h2>
                    </div>
                </center>
                <center>
                    <div className="contactCardInfoContainer">
                        <h3>{this.props.contactInfo.firstName} {this.props.contactInfo.lastName}</h3><br/>
                        <a href={this.state.link}>Contact Link</a>
                    </div>
                </center>
            </div>
        );
    }
}

export default ContactCard;