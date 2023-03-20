import React, { useEffect, useState } from 'react'
import "./Login.css"
import FlareIcon from '@mui/icons-material/Flare';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import axios from 'axios';
import { useActions, useAppState } from '../../overmind';



function Login() {

    const userActions = useActions().user;
    const API_URL = import.meta.env.VITE_API_URL;
    
    function handleCallbackResponse(response) {
        const data = {
            token: response.credential
        }
        
        axios.post(API_URL + `/user/login`, data,
        {
            withCredentials: true
        })
        .then(res => {
            userActions.updateUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
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
        </div>
    )
}


export default Login

