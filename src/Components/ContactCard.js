import React, { Component } from 'react';

class ContactCard extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        return (
            <div className="contactCardContainer">
                <div className="contactCardContainerTop"></div>
                <center>
                    <div className="ContactCircle">
                        <h2>{this.props.contactInfo.firstName.charAt(0)}{this.props.contactInfo.lastName.charAt(0)}</h2>
                    </div>
                </center>
                <center>
                    <div className="contactCardInfoContainer">
                        <h3>{this.props.contactInfo.firstName} {this.props.contactInfo.lastName}</h3><br/>
                        <a href={this.props.contactInfo.linkedin? 
                            this.props.contactInfo.linkedin: 
                            this.props.contactInfo.twitter?
                            this.props.contactInfo.twitter:
                            this.props.contactInfo.github?
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