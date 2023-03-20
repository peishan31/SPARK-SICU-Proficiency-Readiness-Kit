import { Button } from "@mui/material";
import React, { useState } from "react";
import "./Modal.css";

export default function Modal({setModalBool, modalContent}) {

    return (
    <>
        {/* <div className="modal"> */}
            <div className="overlay" onClick={()=>setModalBool(false)}></div>
            <div className="modal-content">
                <p className="modalText">
                    {modalContent}
                </p>
                <Button sx={{ 
                        color: "white",
                        backgroundColor: "#41ADA4",
                        ':hover': {
                            bgcolor: '#41ADA4'
                        }
                    }} fullWidth onClick={()=>setModalBool(false)}>
                    CLOSE
                </Button>
            </div> 
        {/* </div> */}
    </>
    );
}