import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const Login=(props)=>{
    
    let emailRef=React.createRef();
    let pwdRef=React.createRef();
    const loginAction=()=>{
        axios.post("/imageUpload/login",{email:emailRef.current.value,password:pwdRef.current.value})
        .then((result)=>{
            if(result.data.msg){
                alert(result.data.msg);
            } else {
                localStorage.setItem("token",result.data.token);
                props.history.push('/userDashboard');
            }
        })
    }
    const createUser=()=>{
        axios.post("/imageUpload/register",{email:emailRef.current.value,password:pwdRef.current.value})
        .then((result)=>{
            if(result.data.msg){
                alert(result.data.msg)
            } else {
                props.history.push('/login');
                alert("user registered Successfully")
            }
        })
    }
    return(
        <div className="loginComponent">
            <div className="email">
                <input type="text" ref={emailRef} name="email" placeholder="email"/>
            </div>
            <div className="password">
                <input type="password" ref={pwdRef} name="password" placeholder="password"/>
            </div>
            <div className="buttonContainer">
                <button onClick={loginAction}>Login</button>
                <button onClick={createUser}>Register</button>
            </div>
        </div>
    )
}


export default withRouter(Login);

