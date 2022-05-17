import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate,useParams,Link} from 'react-router-dom'
import moment from 'moment'
import './Edit.css'


function EditFood() {
    const mynav = useNavigate()
    const {id,username} = useParams();
    const[erros,setErrors] = useState([])
    

    const [foodType,setFoodType] = useState("")
    const [foodName,setfoodName] = useState("")
    const [purchaseDate,setpDate] = useState("")
    const [expirationDate,seteDate] = useState("")
    const [qty,setqty] = useState("")
    const foodTyps = ['vegetables','fruits','grains','meat','poultry','fish','dairy']



        function onSubmitHandler(e) {
            e.preventDefault()
            axios.put(`http://localhost:8000/api/updatefood/one/${id}/${username}`,{
                foodType,
                foodName,
                purchaseDate,
                expirationDate,
                qty
            },{withCredentials:true})
                .then((res) => {
                    console.log(res)
                    mynav('/food')
                })
                .catch((err) =>{ 
                    setErrors(err.response.data.errors)
                    console.log(err)
                    console.log(err.response.data.errors)
                    console.log(err.response)
                    
                })
        }

        useEffect(() => {

            const getFoodData = async () => {
                const resp = await axios.get(`http://localhost:8000/api/onefood/${id}`)
                console.log(resp)
                setFoodType(resp.data.foodType)
                setfoodName(resp.data.foodName)
                const fpDate = moment.utc(resp.data.purchaseDate).format('YYYY-MM-DD')
                const xpDate = moment.utc(resp.data.expirationDate).format('YYYY-MM-DD')
                setpDate(fpDate)
                seteDate(xpDate)
                setqty(resp.data.qty)

                return resp;
            
            }
            getFoodData()
        },[id])


    return (
        <div className='container' id='edit'>
            <div id='back-right'>
              <Link to='/food'> Back</Link>
            </div>
            <form onSubmit={onSubmitHandler}>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Foot Type</label>
                <div className="col-sm-10">

                    <select onChange={(e) => setFoodType(e.target.value)}>
                        {
                            foodTyps.map((food,index) => (
                                <>
                                {foodType === food ? 
                                <option selected value={food} key={index} >{food}</option> :
                                <option value={food}  key={index} >{food}</option>
                                }
                                </>
                            ))
                        }
                    {erros.foodType ? <p id='red'>{erros.foodType.message}</p> : null}
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                <input value={foodName} type="text" className="form-control" id="inputPassword3" placeholder="Food Name" onChange={(e) => setfoodName(e.target.value)} />
                {erros.foodName ? <p id='red'>{erros.foodName.message}</p> : null}
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Purchase Date</label>
                <div className="col-sm-10">
                <input value={purchaseDate} type="date" className="form-control" id="inputPassword3" placeholder="Purchase Date" onChange={(e) =>{ setpDate(e.target.value)
                }} />
                {erros.purchaseDate ? <p id='red'>{erros.purchaseDate.message}</p> : null}

            </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Expiration Date</label>
                <div className="col-sm-10">

                <input value={expirationDate} type="date" className="form-control" id="inputPassword3" placeholder="Expiration Date" onChange={(e) => seteDate(e.target.value)} />
                {erros.expirationDate ? <p id='red'>{erros.expirationDate.message}</p> : null}
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                <input value={qty} type="Number" className="form-control" id="inputPassword3" placeholder="Qty" onChange={(e) => setqty(e.target.value)} />
                {erros.qty ? <p id='red'>{erros.qty.message}</p> : null}
                </div>
            </div>
            <button className="btn btn-success">Update</button>
            </form>
            
        </div>
        
    )
}

export default EditFood