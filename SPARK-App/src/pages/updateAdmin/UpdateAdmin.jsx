import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserTypeDropdown from '../../components/userTypeDropdown/UserTypeDropdown';
import "./UpdateAdmin.css"
import Modal from '../../components/modal/Modal';


function UpdateAdmin() {

    const [ users, setUsers ] = useState([]);
    const [ toUpdate, setToUpdate ] = useState([]);
    const [ modalBool, setModalBool ] = useState(false);
    const [ modalText, setModalText ] = useState('');

    function handleSubmit() {
        console.log("handleSubmit")
        
        const API_URL = import.meta.env.VITE_API_URL + `/user/update`;
        let statusCode = "";
        
        try {
            axios.put(API_URL, toUpdate)
            .then(function (response) {
                console.log("success")
            })
        } catch (err) {
            console.log(err)
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
        
    }, [modalBool]

    )
    
    return (
        <Box p={4}>
            <div className="pageTitle">
                <h1 style={{fontSize: '30px', fontWeight: 'bold', marginBottom: "25px"}}>Manage Rights</h1>
            </div>

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
                                        <img referrerPolicy="no-referrer" className="profilePicture" style={{marginRight: "20px"}} src={user.picture}></img>
                                        {user.name}
                                    </TableCell>
                                    <TableCell>
                                        {user.email}
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
            
            {
                modalBool ? 
                <Modal modalText={modalText} setModalBool={setModalBool}/> :
                <></>
            }
            
        </Box>
    )
}

export default UpdateAdmin
