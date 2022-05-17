import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate,Link} from 'react-router-dom'
import './AddFood.css'

function AddFood() {
    const mynav = useNavigate()
    const [foodType,setFoodType] = useState("")
    const [foodName,setfoodName] = useState("")
    const [purchaseDate,setpDate] = useState("")
    const [expirationDate,seteDate] = useState("")
    const [qty,setqty] = useState("")
    const foodTyps = ['vegetables','fruits','grains','meat','poultry','fish','dairy']
    const[erros,setErrors] = useState([])




        function onSubmitHandler(e) {
            e.preventDefault()
            axios.post('http://localhost:8000/api/food',{
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
                    console.log(err)
                    setErrors(err.response.data.errors)
                    console.log(err.response.data.errors)
                    console.log(erros)
                    console.log(erros.foodName.message)

                    // console.log(err.response)
                })
        }
    return (
        <div className='container' id='add-to'>

            <form onSubmit={onSubmitHandler}>
                <div id='back-right'>
                    <Link to='/food'> Back</Link>
                </div>
                <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Foot Type</label>
                <div className="col-sm-10">
                    <select onChange={(e) => setFoodType(e.target.value)}>
                    
                        <option value={'Please Choose Food Type'}>Please Choose Food Type</option>
                        
                        {
                            foodTyps.map((food,index) => (
                                <option value={food} key={index}>{food}</option>
                            ))
                        }
                    </select>
                    {erros.foodType ? <p id='red'>{erros.foodType.message}</p> : null}
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label"> Food Name</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputPassword3" placeholder="Food Name" onChange={(e) => setfoodName(e.target.value)} />
                {erros.foodName ? <p id='red'>{erros.foodName.message}</p> : null}
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Purchase Date</label>
                <div className="col-sm-10">
                <input type="Date" className="form-control" id="inputPassword3" placeholder="Purchase Date" onChange={(e) => setpDate(e.target.value)} />
                {erros.purchaseDate ? <p id='red'>{erros.purchaseDate.message}</p> : null}

                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Expiration Date</label>
                <div className="col-sm-10">
                <input type="Date" className="form-control" id="inputPassword3" placeholder="Expiration Date" onChange={(e) => seteDate(e.target.value)} />
                {erros.expirationDate ? <p id='red'>{erros.expirationDate.message}</p> : null}
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                <input type="Number" className="form-control" id="inputPassword3" placeholder="Qty" onChange={(e) => setqty(e.target.value)} />
                {erros.qty ? <p id='red'>{erros.qty.message}</p> : null}
                </div>
            </div>
            <button className="btn btn-success">Add</button>
            </form>
            
        </div>
    )
}

export default AddFood