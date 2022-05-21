import React from 'react';
import { signInWithGoogle, logout, auth, userData } from '../firebase-config';

import { useAuthState } from "react-firebase-hooks/auth";

const fireauthtest = () => {
    const [user, loading, error] = useAuthState(auth);


    return (
        <div styles={"text-align: center"}>
            <h1>fireauthtest</h1>
            <p>==================</p>
            <button onClick={signInWithGoogle}>Sign in with Google </button>
            <p>==================</p>
            {loading ? <p>Loading...</p> : null}
            {user ? <div>
                <img src={user.photoURL} />
                <p>User: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>UID: {user.uid}</p>
            </div> : null}
            <p>==================</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default fireauthtest;