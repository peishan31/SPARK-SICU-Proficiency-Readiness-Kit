import React from 'react'
import { FormControl, MenuItem, Select } from '@mui/material'

function UserTypeDropdown(props) {

    const [ userType, setUserType ] = React.useState(props.userType);

    const handleChange = (event) => {
        console.log("handleChange")
        setUserType(event.target.value)
        props.handleUpdate(props.userId, event)
    };


    return (
        <div>
            <FormControl fullWidth>
                <Select
                    value={userType}
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value={"junior"}>Junior</MenuItem>
                    <MenuItem value={"senior"}>Senior</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default UserTypeDropdown
