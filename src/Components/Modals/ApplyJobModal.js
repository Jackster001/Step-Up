import React, {useState, useEffect} from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
const ApplyJobModal =({openModal, close, onSubmit})=>{

    const [jobPosting, setJobPosting] = useState({
        Title:"",
        Company:"",
        Description: "",
        Link: "",
        JobStatus: "Applied",
        DateCreated: new Date(), 
        removed:false
    })

    useEffect(()=>{
        let currentDate = jobPosting.DateCreated,
            month = '' + (currentDate.getMonth() + 1),
            day = '' + currentDate.getDate(),
            year = currentDate.getFullYear();
        currentDate = currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
        setJobPosting({...jobPosting, DateCreated: year + "-" + month + "-" + day})
    },[])

    const submit =(e)=>{
        e.preventDefault();
        let posting=jobPosting;
        let myDate=posting.DateCreated;
        myDate=myDate.split("-");
        let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        posting.DateCreated = newDate
        let currentDate = new Date(),
        month = '' + (currentDate.getMonth() + 1),
        day = '' + currentDate.getDate(),
        year = currentDate.getFullYear();
        currentDate = currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
        setJobPosting({
            ...jobPosting,
            Title:"",
            Company:"",
            Description: "",
            Link: "",
            JobStatus: "Applied",
            DateCreated: year + "-" + month + "-" + day
        })
        onSubmit(posting)
    }   

    const setValue = (event) => {
        const { value, name } = event.target;
        setJobPosting({
            ...jobPosting,
            [name]: value
        });
    }

    return (
        <div className={openModal ? "ModalContainer": "ClosedModal"}>
            <div className="modal">
                <div className="backButtonContainer">
                    <div className="backButton"><FaRegTimesCircle size="35" color="#470eb3" onClick={()=>close()}/></div>
                </div>
                {/* <h3 className="backButton" onClick={()=>close()}>&#8592; Back</h3> */}
                <center><h2>Add a Job</h2></center>
                <form class="formContainer" onSubmit={(e)=>submit(e)}>
                    <label for="Company">Company Name</label>
                    <input className="formTextInput" onChange={(e)=> setValue(e)} value={jobPosting.Company} type="text" id="Company" name="Company" placeholder="Company Name"/>

                    <label for="Title">Job Title</label>
                    <input className="formTextInput" onChange={(e)=> setValue(e)} value={jobPosting.Title} type="text" id="Title" name="Title" placeholder="Job Title"/>

                    <label for="Link">Job Link/URL</label>
                    <input className="formTextInput" onChange={(e)=> setValue(e)} value={jobPosting.Link} type="text" id="Link" name="Link" placeholder="Job Link"/>
                    
                    <label for="DateCreated">Date Created</label>
                    <input type="date" id="start" name="DateCreated" className="formTextInput" value={jobPosting.DateCreated} onChange={(e)=> setValue(e)}></input>

                    <label for="JobStatus">Job Status</label>
                        <select className="formTextInput" id="JobStatus" value={jobPosting.JobStatus} name="JobStatus" onChange={(e)=> setValue(e)}>
                        <option name="JobStatus" value="Applied" onChange={(e)=> setValue(e)}>Applied</option>
                        <option name="JobStatus" value="Interview" onChange={(e)=> setValue(e)}>Interview</option>
                        <option name="JobStatus" value="Rejected" onChange={(e)=> setValue(e)}>Rejected</option>
                        <option name="JobStatus" value="Offer" >Offer</option>
                    </select>
                
                    <center><input className="formButton" type="submit" value="Submit"/></center><br/><br/>
                </form>
            </div>
        </div>
    );

}
export default ApplyJobModal;