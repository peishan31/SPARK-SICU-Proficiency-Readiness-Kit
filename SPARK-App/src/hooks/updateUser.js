import {useState} from 'react';

function updateUser() {
    const getUser = () => {

        if (sessionStorage.hasOwnProperty('user')) {
            const userString = sessionStorage.getItem('user');
            const user = JSON.parse(userString);
            return user;
        }

        return null;
        
    }

    const [user, setUser] = useState(getUser());

    const saveUser = userObject => {
        sessionStorage.setItem('user', JSON.stringify(userObject))
        setUser(user);
      }

    return {
        setUser: saveUser,
        user
    }
}

export default updateUser
