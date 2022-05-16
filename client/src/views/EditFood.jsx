import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import moment from 'moment'
import './Edit.css'


function EditFood() {
    const mynav = useNavigate()
    const {id,username} = useParams();
    

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
                    console.log(err)
                    console.log(err.response.data.errors)
                    console.log(err.response)
                    mynav('/')
                })
                return null
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
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                <input value={foodName} type="text" className="form-control" id="inputPassword3" placeholder="Food Name" onChange={(e) => setfoodName(e.target.value)} />
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Purchase Date</label>
                <div className="col-sm-10">
                <input value={purchaseDate} type="date" className="form-control" id="inputPassword3" placeholder="Purchase Date" onChange={(e) =>{ setpDate(e.target.value)
                }} />
            </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Expiration Date</label>
                <div className="col-sm-10">

                <input value={expirationDate} type="date" className="form-control" id="inputPassword3" placeholder="Expiration Date" onChange={(e) => seteDate(e.target.value)} />
                </div>
            </div>
            <div className="form-group row">
                <label  className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                <input value={qty} type="Number" className="form-control" id="inputPassword3" placeholder="Qty" onChange={(e) => setqty(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-primary">Update</button>
            </form>
            
        </div>
        
    )
}

export default EditFood