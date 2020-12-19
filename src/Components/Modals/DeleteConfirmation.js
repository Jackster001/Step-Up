import React from 'react';

const DeleteConfirmation = (props) =>{
    return(
        <>
        {
            props.showModal ?
                <div className="deleteConfirmationModal">
                    <div className="deleteConfirmationContainer">
                        <div className="deleteConfirmationContainerInner">
                            <center>
                                <h2><b>Delete Contact</b></h2>
                                <p>Do you want to delete this contact?</p>
                            </center>
                            <div className="deleteButtonContainer">
                                <button className="deleteContactCancelButton"  onClick={()=> props.onClickCancel()}>Cancel</button>
                                <button className="deleteContactButton" onClick={()=> props.onClickRemove()}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <></>
        }
        </>
    )
}

export default DeleteConfirmation;