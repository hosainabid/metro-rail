import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import './Login.css'
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const btnStyle = {
        padding: '15px 40px',
        borderRadius: "30px",
        border: "1px solid gray",
        display: "block",
        margin: "10px auto",
        background: 'white',
        fontWeight: "600",
        width: '100%'
    }
    const formStyle = {
        margin: "10px auto",
        padding: "10px"
    }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const gProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(gProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { isSignedIn: true, name: displayName, email: email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                const user = result.user;
                var accessToken = credential.accessToken;
                setLoggedInUser(user);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }
    const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const passwordLength = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            isFieldValid = passwordLength && passwordNumber;
        }
        if (e.target.name === 'name') {
            isFieldValid = e.target.value.length > 3;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    return (
        <div className='login-bg'>
            <div className="formDivStyle signup-form container border border-secondary">
                <form className='form-style' style={{ height: '250px' }} onSubmit={handleSubmit} style={formStyle}>
                    <div className="mb-3">
                        {newUser && <input type="text" onBlur={handleBlur} name="name" className='form-control' placeholder="Enter your name" required />}
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" name="email" onBlur={handleBlur} placeholder="Enter Your Email Address" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" onBlur={handleBlur} name="password" className="form-control" placeholder="Enter Your Password" />
                    </div>
                    <div className="mb-3">
                        <input type="checkbox" className="float m-2" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label htmlFor="newUser">New User? Sign Up</label>
                    </div>
                    <input className="btn btn-style" type="submit" value="Sign In" />
                </form> <br/>
                <div><p style={{ color: 'red', fontWeight: 'bold' }}>{user.error}</p></div>
                {user.success && <div><p style={{ color: 'green', fontWeight: 'bold' }}>Account Creation Successful</p></div>}
                <div className="third-party-signIn">
                    <button className="btn-style" style={btnStyle} onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} /> Login With Google</button>
                    <button className="btn-style" style={btnStyle} onClick={handleFbSignIn}><FontAwesomeIcon icon={faFacebook} /> Login With Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default Login;