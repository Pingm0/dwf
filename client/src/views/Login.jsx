import React,{useState,} from 'react'
import axios from 'axios'
import {Link, useNavigate,} from 'react-router-dom'


function Login(props) {
    const mynav = useNavigate()
    
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })
    const[erros,setErrors] = useState([])


    const hadnleChange = (e) => {
        setLoginInfo({
            ...loginInfo,[e.target.name]:e.target.value
        })
    }

    async function loginHand(e){
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/login',loginInfo,{withCredentials:true})
            .then((data) => {
                console.log('login in successfully')
                console.log(data)
                mynav('/food')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.message)
                console.log(err.response.data.message)
            })


    }


    return (
        <div className=' container ' >
            <form className='login-form align-items-center  ' onSubmit={loginHand}>
                <h1>Welcome Back!</h1>
                <div className='login-from-element row mb-3  '>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Email: </label>
                    <input className='form-control form-control-sm' onChange={(e) =>hadnleChange(e)} name="email" value={loginInfo.email} type="email" placeholder='use your email to login' />
                </div>
                <div className='login-from-element row mb-3'>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Password:  </label>
                    <input className='form-control form-control-sm'  onChange={(e) =>hadnleChange(e)} name="password" value={loginInfo.passowrd} type="password" placeholder='enter your password' />
                    {erros ? <p id='red'>{erros}</p> : null}
                </div>
                
                <div className='login-btn-reg'>
                    <button className="btn btn-success" >Login</button>
                    <p className='create-account'> <Link to='/reg'>Create Account / Register</Link></p>
                </div>

            </form>
        </div>
    )
}

export default Login