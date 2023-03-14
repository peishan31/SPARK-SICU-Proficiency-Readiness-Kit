import React, { useEffect, useState } from 'react'
import "./Login.css"
import FlareIcon from '@mui/icons-material/Flare';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import axios from 'axios';
import { useActions, useAppState } from '../../overmind';
import jwt_decode from "jwt-decode";




function Login({setUser}) {
    
    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential)
        var userObject = jwt_decode(response.credential);
        console.log(userObject); 

        setUser(userObject);
    }

    useEffect(()=>{
        const google = window.google;

        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_SSO_CLIENT_ID,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );

    }, []);


    return (
        <div className="login">
            <div className="loginCard">
                <div className="loginLeft">
                    <div className="loginBrand">
                        <FlareIcon className="loginBrandIcon" sx={{fontSize: '30px', marginRight: '5px', color: 'rgb(65,173,164)'}}/>
                        <Typography className="loginBrandText" fontWeight="bold" letterSpacing={-1} sx={{fontSize: '30px', color: 'rgb(65,173,164)'}}>
                            spark
                        </Typography>
                    </div>
                    
                    <div id="signInDiv"></div>

                </div>
                <div className="loginRight">
                    <img className="sideImage" src="../../../assets/login.png"/>
                </div>
            </div>
        </div>
    )
}


export default Login

