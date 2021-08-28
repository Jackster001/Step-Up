import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
 import Board from 'react-trello';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {setCard, finishSettingCard, setJobData} from '../../Action/jobBoardViewAction';
import {getProfile} from '../../Action/profileAction';
import { v4 as generateId } from 'uuid';

const useStyles = (theme) => ({
    boardStyle: {
        background: 'none'
    },
    categoryCard: {
        border: '1px solid #D1D1D1', 
        width: '100%', 
        padding: '15px 10px',
        backgroundColor: 'white'
    },
    jobNumber: {
        fontSize: '12px',
        marginLeft: '5px',
        color: "grey"
    },
    roleText:{
        fontSize: '12px',
        lineHeight: '0px'
    },
    companyName: {
        fontSize: '25px',
        lineHeight: '5px',
    },
    dateText: {
        marginTop: '14px',
        marginLeft: '4px',
        lineHeight: '0px'
    },
    inlineStyle: {
        display:'inline-flex'
    }
});

class JobBoardView extends Component {
    constructor(props) {
        super(props);
        const { classes } = this.props;
        this.state = {
            dataMap: {},
            statusTypes: ["Applied", "Interview", "Offer", "Rejected"],
            data: {
                lanes: [
                {
                    id: 'Applied',
                    title: (
                        <div className={classes.categoryCard} style={{borderTop: '5px solid #26C6DA'}}>Applied
                            <span className={classes.jobNumber}>(2) Jobs</span>
                            <AddIcon style={{float: 'right', cursor: 'pointer'}} onClick={()=>this.addJob()}/>
                        </div>
                    ),
                    cards: [],
                    cardStyle: { border: '1px solid #D1D1D1' },
                    draggable: true,
                    laneDraggable: true
                },
                {
                    id: 'Offer',
                    title: (
                        <div className={classes.categoryCard} style={{borderTop: '5px solid #846EF5'}}>Offer
                            <span className={classes.jobNumber}>(2) Jobs</span>
                            <AddIcon style={{float: 'right'}}/>
                        </div>
                    ),
                    cards: [
                    ],
                    cardStyle: {
                        border: '1px solid #D1D1D1'
                    },
                    draggable: true,
                    laneDraggable: true
                },
                {
                    id: 'Interview',
                    title: (
                        <div className={classes.categoryCard} style={{borderTop: '5px solid #42A5F5'}}>Interview
                            <span className={classes.jobNumber}>(2) Jobs</span>
                            <AddIcon style={{float: 'right'}}/>
                        </div>
                    ),
                    cards: [
                    ],
                    cardStyle: {
                        border: '1px solid #D1D1D1'
                    },
                    draggable: true,
                    laneDraggable: true
                },
                {
                    id: 'Rejected',
                    title: (
                        <div className={classes.categoryCard} style={{borderTop: '5px solid #EF5350'}}>Rejected
                            <span className={classes.jobNumber}>(2) Jobs</span>
                            <AddIcon style={{float: 'right'}}/>
                        </div>
                    ),
                    cards: [
                    ],
                    cardStyle: {
                        border: '1px solid #D1D1D1'
                    },
                    draggable: true,
                    laneDraggable: true
                }
            ]
            }
        }
    }

    componentDidMount(){
        this.props.setJobData(this.props.profile.id);
        // this.organizeJobs();
        // console.log(this.props.jobData)
        // this.props.getProfile(this.props.profile.id);
    }

    componentDidUpdate(){
        if(this.props.loadingProfile){
            this.props.disableUserProfileLoading();
            this.organizeJobs();
        }
        if(this.props.loadingData){
            this.props.finishSettingCard();
            this.organizeJobs();
            console.log("here")
        }
    }

    organizeJobs = () => {
        const { classes } = this.props;
        let allJobs = []
        let dataMap = {};
        let statusTypes = this.props.jobData.jobStatuses;

        for(let i=0; i<statusTypes.length; i++)
        {
            let count = this.props.jobData[statusTypes[i]].length;
            dataMap[statusTypes[i]] = {
                id: statusTypes[i],
                title: (
                    <div className={classes.categoryCard} style={{borderTop: '5px solid #26C6DA'}}>{statusTypes[i]}
                        <span className={classes.jobNumber}>({count}) Jobs</span>
                        {/* <AddIcon style={{float: 'right', cursor: 'pointer'}} onClick={()=>this.addJob()}/> */}
                        <AddIcon style={{float: 'right', cursor: 'pointer'}} />
                    </div>
                ),
                cards: [],
                cardStyle: { border: '1px solid #D1D1D1' },
                draggable: true,
                laneDraggable: true
            };
            allJobs.push(...this.props.jobData[statusTypes[i]]);
        }

        for(let i=0; i<allJobs.length; i++){
            let jobStatus = allJobs[i].JobStatus;
            let card = {
                laneId: jobStatus,
                id: allJobs[i].job_id,
                title: (
                    <div>
                        <p className={classes.roleText}>{allJobs[i].Title}</p>
                        <h1 className={classes.companyName}>{allJobs[i].Company}</h1>
                    </div>
                ), 
                description: (
                    <span className={classes.inlineStyle}><DateRangeIcon/> <p className={classes.dateText}>{allJobs[i].DateCreated}</p></span>
                ), 
                label: <MoreHorizIcon/>
            };
            dataMap[jobStatus].cards.push(card);
        }

        let lanes = [];
        for(let i = 0; i < statusTypes.length; i++){
            lanes.push({...dataMap[statusTypes[i]]});
        }
        let data = {lanes}

        this.setState({...this.state, data: {...data}, dataMap: {...dataMap}, statusTypes});
    }

    addJob = () => {
        this.props.openModal();
    }

    onCardMoved = (fromLaneId, toLaneId, cardId, index) => {
        // console.log(fromLaneId);
        // console.log(toLaneId);
        // console.log(cardId);
        // console.log(index);
        // let statusMap = this.state.statusMap;
        // console.log(this.state.statusMap);
    }

    onDrag = (cardId, laneId) => {
        // console.log(cardId);
        // console.log(laneId);
    }

    onDrop = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        let profile = JSON.parse(JSON.stringify(this.props.profile));
        let JobData = JSON.parse(JSON.stringify(this.props.jobData));
        let newDataMap = JSON.parse(JSON.stringify(this.state.dataMap));
        let sourceCards = newDataMap[sourceLaneId].cards;
        let index = 0;
        for(let i = 0; i< sourceCards.length; i++){
            if(sourceCards[i].id === cardDetails.id){
                index = i;
                break;
            }
        }

        let cardData = JobData[sourceLaneId].splice(index, 1);
        cardData[0].JobStatus = targetLaneId;
        JobData[targetLaneId].splice(position, 0, cardData[0]);
        profile.jobData = JobData
        
        this.props.setCard(profile);
    }

    onDataChange(d) {
        let lanes = d.lanes;
        let newDataMap = JSON.parse(JSON.stringify(this.state.dataMap));
        for(let i=0; i < lanes.length; i++){
            newDataMap[lanes[i].id] = lanes[i]
        }
        this.setState({...this.state, dataMap: newDataMap});
    }

    render(){
        const { classes } = this.props;
        return (
            <>
                <Board 
                    data={this.state.data} 
                    className={classes.boardStyle} 
                    style={{background: 'none'}}
                    laneStyle={{
                        background: 'none'
                    }}
                    onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => this.onCardMoved(fromLaneId, toLaneId, cardId, index)}
                    handleDragStart={(cardId, laneId) => this.onDrag(cardId, laneId)}
                    handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails) => this.onDrop(cardId, sourceLaneId, targetLaneId, position, cardDetails)}
                    onDataChange={(d)=> this.onDataChange(d)}
                />
            </>
        )
    }
}

const mapStateToProps =(state) =>({
    profile: state.userState.profile,
    loadingData: state.jobDataState.loadingData,
    jobData: state.jobDataState.jobData
})

export default connect(mapStateToProps, {setCard, getProfile, finishSettingCard, setJobData})(withStyles(useStyles)(JobBoardView));