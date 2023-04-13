import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import "./Modal.css";

export default function Modal({setModalBool, modalText}) {
    function toTwemoji(string) {
        return twemoji.parse(string)
    };

    return (
    <>
        {/* <div className="modal"> */}
            <div className="overlay" onClick={()=>setModalBool(false)}></div>
            <div className="modal-content">

                { 
                    modalText == "" ? 
                    <div
                    style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}
                    >
                        <CircularProgress color='info' size={40} thickness={4} />
                    </div> :
                    <>
                        <p className="modalText">
                            <span dangerouslySetInnerHTML={{__html: toTwemoji(modalText)}}></span>
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
                    </> 
                }
            </div> 
        {/* </div> */}
    </>
    );
}