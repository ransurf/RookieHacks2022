import React from 'react';
import { signUpWithGoogle, signInWithGoogle, auth, userData } from '../firebase-config';

import { useAuthState } from "react-firebase-hooks/auth";

const Fireauthtest = () => {
    const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        auth.signOut();
    }

    return (
        <div styles={"text-align: center"}>
            <h1>fireauthtest</h1>
            <p>==================</p>
            <button onClick={signUpWithGoogle}>Sign Up</button>
            <p>==================</p>
            <button onClick={signInWithGoogle}>Sign In</button>
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

export default Fireauthtest;