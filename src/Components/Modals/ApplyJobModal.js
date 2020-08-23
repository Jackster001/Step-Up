import React, {useState, useEffect} from 'react';
const ApplyJobModal =({openModal, close, onSubmit})=>{

    const [jobPosting, setJobPosting] = useState({
        Title:"",
        Company:"",
        Description: "",
        Link: "",
        JobsStatus: "Applied"
    })

    const submit =(e)=>{
        e.preventDefault();
        let posting=jobPosting;
        setJobPosting({
            Title:"",
            Company:"",
            Description: "",
            Link: "",
            JobsStatus: "Applied"
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
                <h3 className="backButton" onClick={()=>close()}>&#8592; Back</h3>
                <center><h2>Add a Job</h2></center>
                <form class="formContainer" onSubmit={(e)=>submit(e)}>
                    <label for="Company">Company Name</label>
                    <input className="formTextInput" onChange={(e)=> setValue(e)} type="text" id="Company" name="Company" placeholder="Company Name"/>

                    <label for="Title">Job Title</label>
                    <input className="formTextInput" onChange={(e)=> setValue(e)} type="text" id="Title" name="Title" placeholder="Job Title"/>

                    <label for="Link">Job Link/URL</label>
                    <input className="formTextInput" onChange={(e)=> setValue(e)} type="text" id="Link" name="Link" placeholder="Job Link"/>

                    <label for="JobStatus">Job Status</label>
                        <select className="formTextInput" id="JobStatus" name="JobStatus" onChange={(e)=> setValue(e)}>
                        <option name="JobStatus" value="Applied" onChange={(e)=> setValue(e)}>Applied</option>
                        <option name="JobStatus" value="Interview" onChange={(e)=> setValue(e)}>Interview</option>
                        <option name="JobStatus" value="Rejected" onChange={(e)=> setValue(e)}>Rejected</option>
                        <option name="JobStatus" value="Offer" >Offer</option>
                    </select>
                
                    <center><input className="formButton" type="submit" value="Submit"/></center>
                </form>
            </div>
        </div>
    );

}
export default ApplyJobModal;