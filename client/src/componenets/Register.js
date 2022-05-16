import React,{useState,useEffect} from 'react'
import axios from 'axios'



function Register() {

    const [confirmReg,setConfirmReg] = useState("")
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
});
const [errors,setErrors] = useState()



const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]:e.target.value,
    });
    console.log(user.username)
};
const register = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/users/register',
    user,
    {
        withCredentials:true
    })
        .then((res) => {
            console.log(res.data)
            setUser({
                username:'',
                email:'',
                password:'',
                confirmPassword:''
            })
            setConfirmReg("Thanks for registring, you can log in!")
            setErrors({});
        })
        .catch((err => {
            console.log(err)
            setErrors(err.response.data.errors)
        }))

}
    return (
    <div>
        <h1>Register</h1>
        {confirmReg ? <h4 style={{color: "green"}}>{confirmReg}</h4> : null}
        <form onSubmit={register}>
            <div className='myForm'>
                <div>
                <label>username</label><br />
                <label>Email</label><br />
                <label>Passowrd</label><br />
                <label>Confirm Password</label><br />
                </div>
                <div>
                <input onChange={handleChange} value={user.username} type="text" name='username' /><br />
                <input onChange={handleChange} value={user.email} type="email" name='email' /><br />
                <input onChange={handleChange} value={user.password} type="password" name='password' /><br />
                <input onChange={handleChange} value={user.confirmPassword} type="password" name='confirmPassword' /><br />
                </div>
                {console.log({user})}
            </div>
            <button>Register Me!</button>
        </form>
    </div>
    )
}

export default Register