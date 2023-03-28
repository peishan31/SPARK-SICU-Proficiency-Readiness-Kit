import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserTypeDropdown from '../../components/userTypeDropdown/UserTypeDropdown';
import "./UpdateAdmin.css"
import Modal from '../../components/modal/Modal';
import { useActions, useAppState } from '../../overmind';
import { useNavigate } from 'react-router-dom';


function UpdateAdmin() {

    const userState = useAppState().user
    const userActions = useActions().user;
    const navigate = useNavigate();

    const [ users, setUsers ] = useState([]);
    const [ toUpdate, setToUpdate ] = useState([]);
    const [ modalBool, setModalBool ] = useState(false);
    const [ modalText, setModalText ] = useState("");

    function handleSubmit() {
        setModalText("");
        
        console.log("handleSubmit")
        console.log(toUpdate)

        const API_URL = import.meta.env.VITE_API_URL + `/user/update`;
        
        try {
            axios.put(API_URL, toUpdate, {
                withCredentials: true
            })
            .then((response) => {
                console.log(response.status)
                setModalText("✅ Updated successfully!");
            }).catch((err) => {
                console.log(err.response.data)
                setModalText("❌ Something went wrong.");
            }
            )
        } catch (err) {
            console.log(err)
            setModalText("❌ Something went wrong.");
        }

        if ( userState.currentUser.googleId in toUpdate ) {
            let newStatus = toUpdate[userState.currentUser.googleId];

            let userObj = {...userState.currentUser};
            userObj.userType = newStatus;
            
            sessionStorage.setItem('user', JSON.stringify(userObj));
            userActions.updateUser(userObj)

            console.log("updated state")
        }
    }

    const handleUpdate = (user_id, e) => {
        console.log("handleUpdate")
        setToUpdate({
            ...toUpdate,
            [user_id]: e.target.value
            })

        console.log(toUpdate)
    }

    useEffect(() => {
        if ( userState.currentUser.userType != "senior" ) {
            navigate("/");
        }

        const API_URL = import.meta.env.VITE_API_URL + `/users`
        
        try {
            axios.get(API_URL)
            .then(function (response) {
                setUsers(response.data);
                console.log(users);
            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        if (modalText != "") {
            setModalBool(true)
        }
    }, [modalText])

    
    return (
        <Box p={4}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Manage Admins</h1>
            </div>

            <Box>
                <div className="users">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                    <TableCell>
                                        User Type
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                
                                {users.map((user) => (
                                    <TableRow key={user.googleId}>
                                        <TableCell>
                                            <span><img referrerPolicy="no-referrer" className="profilePicture" style={{marginRight: "20px"}} src={user.picture}></img></span>
                                            <span className="name">{user.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="email">{user.email}</span>
                                        </TableCell>
                                        <TableCell>
                                            <UserTypeDropdown handleUpdate={handleUpdate} userId={user.googleId} userType={user.userType}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <div className="buttonBox">
                        <Button sx={{ 
                            backgroundColor: "#41ADA4",
                            ':hover': {
                                bgcolor: '#41ADA4'
                            }
                        }}
                        
                        variant="contained" onClick={handleSubmit}>Save changes</Button>
                    </div>
                </div>
                </Box>
            
            {
                modalBool ? 
                <Modal modalText={modalText} setModalBool={setModalBool}/> :
                <></>
            }
            
        </Box>
    )
}

export default UpdateAdmin
