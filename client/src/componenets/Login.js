import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'; 



function Login() {

    const mynav = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login",
        {
            email:email,
            password:password
        },
        {
            withCredentials:true,
        },
        )
            .then((res) => {
                console.log(res,"res");
                console.log(res.data,"is res data!")
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message)
            })
            mynav("/home")
            };
    
    return (
    <div>
        <h1>
            Login
        </h1>
        <p className='error-text'>{errorMessage ? errorMessage: ""}</p>
        <form onSubmit={login}>
            <div>
                <label>Email</label>
                <input
                    type={"text"}
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type={"password"}
                    name="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <div>
                <button>Sign In</button>
            </div>
        </form>
    </div>
    )
}

export default Login