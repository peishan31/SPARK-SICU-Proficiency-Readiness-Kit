import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import "./Modal.css";

export default function Modal({setModalBool, modalText}) {
    function toTwemoji(string) {
        return twemoji.parse(string)
    };

    function resetModalBoolAndRefresh() {
        setModalBool(false);
        window.location.reload();
    }

    return (
    <>
        {/* <div className="modal"> */}
            
            

                { 
                    modalText == "" ? 
                    <>
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <div
                        style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}
                        >
                            <CircularProgress color='info' size={40} thickness={4} />
                        </div> 
                    </div>
                    </>
                    :
                    <>
                        <div className="overlay" onClick={() => resetModalBoolAndRefresh()}></div>
                        <div className="modal-content">
                            <p className="modalText">
                                <span dangerouslySetInnerHTML={{__html: toTwemoji(modalText)}}></span>
                            </p>
                            <Button sx={{ 
                                    color: "white",
                                    backgroundColor: "#41ADA4",
                                    ':hover': {
                                        bgcolor: '#41ADA4'
                                    }
                            }} fullWidth onClick={() => resetModalBoolAndRefresh()}>
                                Close
                            </Button>
                        </div>
                    </> 
                }
        {/* </div> */}
    </>
    );
}