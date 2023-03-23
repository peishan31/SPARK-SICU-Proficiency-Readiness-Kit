import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions, useAppState } from '../overmind';

export default function useLoginUser() {

    const userActions = useActions().user;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const getUser = () => {
        if ( "user" in sessionStorage && user == null) {
            const userString = sessionStorage.getItem('user');
            const user = JSON.parse(userString);
            userActions.updateUser(user);
            setUser(user);
            navigate(`/`);
            return user;
        }
        
        return null;
    };

    const saveUser = user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        userActions.updateUser(user);
        setUser(user);
    };

    const clearUser = () => {
        sessionStorage.clear();
        setUser(null);
    };

    return {
        setUser: saveUser,
        clearUser: clearUser,
        user: user,
        getUser: getUser
    }

}