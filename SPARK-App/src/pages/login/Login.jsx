import React, { useEffect, useState } from 'react'
import "./Login.css"
import FlareIcon from '@mui/icons-material/Flare';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import axios from 'axios';
import { useActions, useAppState } from '../../overmind';
import jwt_decode from "jwt-decode";




function Login() {

    const userActions = useActions().user;
    
    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential)
        var userObject = jwt_decode(response.credential);
        console.log(userObject); 

        userActions.updateUser(userObject)
    }

    useEffect(()=>{
        const google = window.google;

        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_SSO_CLIENT_ID,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large", width: "250px"}
        );

        google.accounts.id.prompt();

    }, []);


    return (
        <div className="login">
            <div className="loginLeft">
                <div className="loginBrand">
                    <FlareIcon className="loginBrandIcon" sx={{fontSize: '70px', marginRight: '5px', color: 'white'}}/>
                    <Typography className="loginBrandText" fontWeight="bold" letterSpacing={-1} sx={{fontSize: '70px', color: 'white'}}>
                        spark
                    </Typography>
                </div>
                
                <div className="loginWrapperDiv">
                    <div id="signInDiv">button</div>
                </div>
                    
            </div>

                {/* <img className="sideImage" src="../../../assets/login.png"/> */}
        </div>
    )
}


export default Login

