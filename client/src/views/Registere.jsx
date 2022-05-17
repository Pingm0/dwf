import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate,Link} from 'react-router-dom'


function Registere() {
    const mynav = useNavigate()
    const [regInfo,setRegInfo] = useState({
        username:"",
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const[erros,setErrors] = useState([])

    const hadnleChange = (e) => {
        setRegInfo({
            ...regInfo,[e.target.name]:e.target.value
        })
    }

    async function regHand(e){
        e.preventDefault()
        axios.post('http://localhost:8000/api/user',regInfo,{withCredentials:true})
            .then((data) => {
                console.log('Successfull Registred!')
                mynav('/')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
                console.log(err.response.data.errors)
                console.log(err.response)
            })


    }


    return (
        <div className='container'>

            <form className='login-form align-items-center  ' onSubmit={regHand}>
                <div id='back-right'>
                        <Link to='/'> Back</Link>
                </div>
                <div className='login-from-element row mb-3'>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>User Name: </label>
                    <input className='form-control form-control-sm' onChange={(e) =>hadnleChange(e)} name="username" value={regInfo.username} type="text" />
                {erros.username ? <p id='red'>{erros.username.message}</p> : null}
                </div>
                <div className='login-from-element row mb-3'>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Name: </label>
                    <input className='frm-control form-control-sm' onChange={(e) =>hadnleChange(e)} name="name" value={regInfo.name} type="text" />
                {erros.name ? <p id='red'>{erros.name.message}</p> : null}
                </div>
                <div className='login-from-element row mb-3'>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Email: </label>
                    <input className='form-control form-control-sm' onChange={(e) =>hadnleChange(e)} name="email" value={regInfo.email} type="email" />
                {erros.email ? <p id='red'>{erros.email.message}</p> : null}
                </div>
                <div className='login-from-element row mb-3'>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Password: </label>
                    <input className='form-control form-control-sm' onChange={(e) =>hadnleChange(e)} name="password" value={regInfo.password} type="Password" />
                {erros.password ? <p id='red'>{erros.password.message}</p> : null}

                </div>
                <div className='login-from-element row mb-3'>
                    <label className='col-sm-1 col-form-label col-form-label-sm'>Confirm Password: </label>
                    <input className='form-control form-control-sm' onChange={(e) =>hadnleChange(e)} name="confirmPassword" value={regInfo.confirmPassword} type="Password" />
                {erros.confirmPassword ? <p id='red'>{erros.confirmPassword.message}</p> : null}
                </div>
                <button className="btn btn-success">Register</button>
            </form>
        </div>
    )
}

export default Registere