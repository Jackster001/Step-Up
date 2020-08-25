import React, {useState, useEffect} from 'react';
const RemoveModal =({Title, Company, close, openModal})=>{

    return (
        <div className={openModal ? "ModalContainer": "ClosedModal"}>
            <div className="modal">
                <center><h2>Job for {Company} has been removed</h2>
                <button className="closeButton" onClick={()=>close()}>Close</button></center>
            </div>

        </div>
    );

}
export default RemoveModal;