import React, { useState } from 'react'
import "./Login.css"
import FlareIcon from '@mui/icons-material/Flare';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import axios from 'axios';

const StyledButton = styled(Button)(({
    backgroundColor: 'rgb(65,173,164)',
    color: 'white',
    fontWeight: '700',
    padding: '10px',
    '&:hover': {
        backgroundColor: 'rgba(245,177,97,1)',
    }
}));


function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("handleLogin()")
        const API_URL = `http://localhost:8080/user/login`
    
        axios.post(API_URL, {
            email: email,
            password: password
          })
          .then(res => {
            if (res.status == 200) {
                console.log(res.data)
                setToken(res.data['_id'])
                alert("Success!")
            }
            
          })
          .catch(err => {
            console.log(err)
            if (err.response.status == 400) {
                alert("Wrong credentials")
            }

            if (res.response.status == 500) {
                alert("Server error")
            }
          });
    }

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
                    <div className="loginForm">
                        <TextField required label="Email" sx={{width: '100%', marginBottom: '30px'}} value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <TextField required type="password" label="Password" sx={{width: '100%', marginBottom: '60px'}} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>

                    <StyledButton fullWidth onClick={handleLogin}>Login</StyledButton>
                </div>
                <div className="loginRight">
                    <img className="sideImage" src="../../../assets/login.png"/>
                </div>
            </div>
        </div>
    )
}


export default Login

