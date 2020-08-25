import React, {useState, useEffect} from 'react';

const EditJobModal =({openModal, close, onSubmit, jobProps})=>{

    const [jobPosting, setJobPosting] = useState({
        Title: jobProps.Title,
        Company: jobProps.Company,
        Description: jobProps.Description,
        Link: jobProps.Link,
        JobStatus: jobProps.JobStatus,
    })

    const submit =(e)=>{
        e.preventDefault();
        let posting=jobPosting;
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
                <h3 className="backButton" onClick={()=>close()}>&#8592; Back</h3>
                <center><h2>{jobProps.Company}</h2></center>
                <form class="formContainer" onSubmit={(e)=>submit(e)}>
                    <div className="editInputRow">
                        <div className="editInputContainer">
                            <label for="Company">Company Name</label>
                            <input className="formTextInput" onChange={(e)=> setValue(e)} value={jobPosting.Company} type="text" id="Company" name="Company" placeholder={jobProps.Company}/>
                        </div>
                        <div className="editInputContainer">
                            <label for="Title">Job Title</label>
                            <input className="formTextInput" onChange={(e)=> setValue(e)} value={jobPosting.Title} type="text" id="Title" name="Title" placeholder={jobProps.Title}/>
                        </div>
                    </div>
                    <div className="editInputRow">
                        <div className="editInputContainer">
                            <label for="Link">Job Link/URL</label>
                            <input className="formTextInput" onChange={(e)=> setValue(e)} value={jobPosting.Link} type="text" id="Link" name="Link" placeholder={jobProps.Link}/>
                        </div>
                        <div className="editInputContainer">
                        <label for="JobStatus">Job Status</label>
                            <select className="formTextInput" id="JobStatus" value={jobPosting.JobStatus} name="JobStatus" onChange={(e)=> setValue(e)}>
                            <option name="JobStatus" value="Applied" onChange={(e)=> setValue(e)}>Applied</option>
                            <option name="JobStatus" value="Interview" onChange={(e)=> setValue(e)}>Interview</option>
                            <option name="JobStatus" value="Rejected" onChange={(e)=> setValue(e)}>Rejected</option>
                            <option name="JobStatus" value="Offer" >Offer</option>
                        </select>
                        </div>
                    </div>
                    <label for="Link">Job Link/URL</label>
                    <textarea className="formTextArea" onChange={(e)=> setValue(e)} value={jobPosting.Description} type="text" id="Description" name="Description" placeholder="Description"/>
                
                    <center><input className="formButton" type="submit" value="Submit"/></center><br/><br/>
                </form>
            </div>
        </div>
    );

}
export default EditJobModal;