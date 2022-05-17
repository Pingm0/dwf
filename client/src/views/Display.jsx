/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import './Display.css'


function Display() {
    const [foodData,setFooddata] = useState([]);
    const [userName,setUsername] = useState('')
    let  [deleted,setDeleted] = useState(false)
    let today =  Date.now()
    today = moment(today).format('MM-DD-YYYY')
    useEffect(()=>{
      const getLoginuser = async () => {
        try{
        const loginUser = await axios.get(`http://localhost:8000/api/users`,{withCredentials:true})
          setUsername(loginUser.data.username)
      }
      catch(err){
        console.log(err)
        
      }
    }
      getLoginuser()
    },[])
    
    useEffect( () => {
      const getFoodData = async () => {
        if (userName){
        try{
          const resp = await axios.get(`http://localhost:8000/api/foodbyuser/${userName}`,{withCredentials:true})
          console.log(resp)
          setFooddata(resp.data)
        
        }
        
        catch(err){
          console.log(err)
        }
        
      }
    }
      setDeleted(false)
      getFoodData()
    },[deleted,userName])
    function deleteHandler (id) {
      axios.delete(`http://localhost:8000/api/deletefood/${id}`,{withCredentials:true})
      .then((res) => {
          console.log(res)
          setDeleted(true)
          
      })
      .catch((err) => console.log(err))
  }

  function logout() {
    axios.post(`http://localhost:8000/api/user/logout`,{},{withCredentials:true})
      .then((res) => {
        console.log(res)
        setUsername('')
      })
      .catch((err) => {
        console.log(err)
      })
  }
    return (
        <div className='container'>
          <div className='display-header'>
            <h4>Hi {userName}</h4>
            <p><Link to={'/add'}>Add Item</Link> | <Link to={`/chart/${userName}`}  >View Charts</Link> | <Link to={'/'} onClick={logout} >Logout</Link></p>
          </div>
          <div className='todayis'>
            <div>
            Todays Date: {today}
            </div>
          </div>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Food Type</th>
                  <th scope="col">Name</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col">Expiration Date</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Actions</th>
                  </tr>
                </thead>
              <tbody>

                {
                  foodData.map((food,index) => {
                    const fpDate = moment.utc(food.purchaseDate).format('MM-DD-YYYY')
                    const xpDate = moment.utc(food.expirationDate).format('MM-DD-YYYY')
                      return(
                    <tr key={food._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{food.foodType}</td>
                      <td>{food.foodName}</td>
                      <td>{fpDate}</td>
                      <td id={xpDate < today ? 'red' : null}>{xpDate} </td>
                      <td>{food.qty}</td>
                      <td><Link to={`/food/editfood/${food._id}/${userName}`} >Edit</Link>  | <Link to={'/food'} onClick={() => {deleteHandler(food._id)}}>Delete</Link> </td>
                    </tr>
                )})
                }
              </tbody>
            </table>
        </div>
    )
}

export default Display