import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
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
    const USERS_PER_PAGE = 10

    const [ users, setUsers ] = useState([]);
    const [ toUpdate, setToUpdate ] = useState([]);
    const [ modalBool, setModalBool ] = useState(false);
    const [ modalText, setModalText ] = useState("");
    const [ startIdx, setStartIdx ] = useState(0);
    const [ endIdx, setEndIdx ] = useState(USERS_PER_PAGE);
    const [ currentPage, setCurrentPage ] = useState(1);

    const pageCount = Math.ceil(users.length / USERS_PER_PAGE);

    async function handleDelete(user_id) {
        console.log("handleDelete")
        console.log(user_id)

        setModalText("");
        setModalBool(true)

        const API_URL = import.meta.env.VITE_API_URL + `/user/delete/${user_id}`;

        try {
            await axios.delete(API_URL, {
                withCredentials: true
            })
                .then((response) => {
                    console.log(response.status)
                    // alert("Deleted successfully!")
                    setModalText("✅ Deleted successfully!");

                }).catch((err) => {
                    console.log(err)
                    // alert("Something went wrong")
                    setModalText("❌ Something went wrong.");
                }
                )
        } catch (err) {
            console.log(err)
            // alert("Something went wrong")
            setModalText("❌ Something went wrong.");
        }
    }

    function handleSubmit() {
        setModalText("");
        setModalBool(true)
        
        console.log("handleSubmit")
        console.log(toUpdate)

        const API_URL = import.meta.env.VITE_API_URL + `/user/update`;

        if (toUpdate.length == 0) {
            setModalText("❗ No changes made. Make changes to a user's user type before clicking save changes");
            return;
        }
        
        try {
            axios.put(API_URL, toUpdate, {
                withCredentials: true
            })
            .then((response) => {
                console.log(response.status)
                // alert("Updated successfully!")
                setModalText("✅ Updated successfully!");
            }).catch((err) => {
                console.log(err)
                // alert("Something went wrong")
                setModalText("❌ Something went wrong.");
            }
            )
        } catch (err) {
            console.log(err)
            // alert("Something went wrong")
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

    const changeCurrentPage = (value) => {
        setStartIdx(USERS_PER_PAGE * (value-1))
        setEndIdx(USERS_PER_PAGE * (value-1) + USERS_PER_PAGE)
        setCurrentPage(value)
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

    // useEffect(() => {
    //     if (modalText != "") {
    //         setModalBool(true)
    //     }
    // }, [modalText])

    if (users.length == 0) {
        return (
            <div
                style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}
                >
                    <CircularProgress color='info' size={40} thickness={4} />
            </div>
        )
    }

    
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
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                
                                {
                                
                                    users
                                    .slice(startIdx, endIdx)
                                    .map((user) => (
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
                                            <TableCell>
                                                <Button sx={{ 
                                                    backgroundColor: "#41ADA4",
                                                    ':hover': {
                                                        bgcolor: '#FFFFFF',
                                                        color: '#41ADA4'
                                                    },
                                                    color: "#FFFFFF",
                                                    textTransform: "none"
                                                }}
                                                    onClick={() => {handleDelete(user.googleId)}}>Remove</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className="paginationBox">
                        <Pagination count={pageCount} page={currentPage} onChange={(event, value) => changeCurrentPage(value)}  />
                    </div>
                    
                    <div className="buttonBox">
                        <Button sx={{ 
                            backgroundColor: "#41ADA4",
                            ':hover': {
                                bgcolor: '#41ADA4'
                            },
                            textTransform: "none"
                        }}
                        
                        variant="contained" onClick={() => {handleSubmit()}}>Save Changes</Button>
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
