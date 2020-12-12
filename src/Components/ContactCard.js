import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';

class ContactCard extends Component{
    constructor(props){
        super(props)
        this.state={
        }
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
                        <a href={(this.props.contactInfo.linkedin.indexOf("http://")>-1 || this.props.contactInfo.linkedin.indexOf("https://")>-1) && this.props.contactInfo.linkedin.length>8? 
                            this.props.contactInfo.linkedin: 
                            (this.props.contactInfo.twitter.indexOf("http://")>-1 || this.props.contactInfo.twitter.indexOf("https://")>-1) && this.props.contactInfo.twitter.length>8?
                            this.props.contactInfo.twitter:
                            (this.props.contactInfo.github.indexOf("http://")>-1 || this.props.contactInfo.github.indexOf("https://")>-1) && this.props.contactInfo.github.length>7?
                            this.props.contactInfo.github:
                            "#"
                        }>Contact Link</a>
                    </div>
                </center>
            </div>
        );
    }
}

export default ContactCard;