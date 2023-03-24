import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions, useAppState } from '../overmind';

export default function useLoginUser() {

    const userActions = useActions().user;
    const chapterActions = useActions().chapters;
    const navigate = useNavigate();

    const [user, setUser] = useState(null)

    const getUser = () => {
        // if the user refreshed the page, then update state management
        if ( "user" in sessionStorage && user == null) {
            const userString = sessionStorage.getItem('user');
            const user = JSON.parse(userString);
            userActions.updateUser(user);
            setUser(user);

            // if user was on the view subchapters page when refreshing
            if ( "selectedChapter" in sessionStorage ) {
                const selectedChapterString = sessionStorage.getItem('selectedChapter');
                const selectedChapter = JSON.parse(selectedChapterString);

                chapterActions.setSelectedChapter(selectedChapter);
            }
            // navigate(`/`);
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
        navigate(`/`);
    };

    return {
        setUser: saveUser,
        clearUser: clearUser,
        user: user,
        getUser: getUser
    }

}