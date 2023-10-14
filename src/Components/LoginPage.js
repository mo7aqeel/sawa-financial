import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Main from "./Main";
import { auth, myDb } from "../firebase";
import { child, get, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const [entry, setEntry] = useState("");
    
    const loginHandler = () => {
        setIsLoading(true);
        if (email === "" || password === "") {
            setErrorMessage("يجب ملأ الحقول المطلوبة");
            setIsError(true)
            setIsLoading(false)
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setIsLogin(true);
                setIsLoading(false)
                localStorage.setItem("login", true);
                get(child(ref(myDb), "users")).then(snapshot => {
                    snapshot.forEach(snap => {
                        if (snap.child("email").val() === user.email){
                            setEntry(snap.child("name").val());
                        }
                    })
                })

                // ...
            })
            .catch((error) => {
                setErrorMessage("خطأ في البريد الالكتروني أو كلمة السر");
                setIsError(true)
                setIsLoading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
        
    if (!isLogin){
        return( 
            <div className="w-100" style={{height:'100%'}}>
                {isError?
                <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>: false}
                {isLoading?<center><div class="spinner align-middle" style={{position:'fixed', marginRight:'49%', marginTop:'15%'}}></div></center>: false}
            <div className="text-center main-login">
                <img src="sawa.png" alt="Logo" width="150" height="150" class="img-fluid"/>
                <div className="login-container container text-end shadow p-3 mb-5 bg-body-tertiary rounded w-50 p-3">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">البريد الالكتروني</label>
                        <input type="email" onChange={e => setEmail(e.target.value)} placeholder="username@sawauniversity.edu.iq" class="form-control text-end" id="exampleInputEmail1"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">كلمة السر</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" class="form-control text-end" id="exampleInputPassword1"/>
                    </div>
                    <button class="btn btn-primary form-control" onClick={loginHandler}>تسجيل الدخول</button>
                </div>
            </div>
            </div>
        )
    } else{
        return(
            <div>
                <Main list={props.list} entry={entry}/>
            </div>
        )
    }
}
export default Login;