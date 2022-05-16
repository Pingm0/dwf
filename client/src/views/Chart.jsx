import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GaugeChart from 'react-gauge-chart'
import { VictoryBar,VictoryChart,VictoryAxis,VictoryTheme } from 'victory';
import {useParams} from 'react-router-dom'

import './Chart.css'
import { Link } from 'react-router-dom';



function Chart() {
    const [expiredFood,setExpiredFood] = useState([])
    const [totalRec,setTotalRec] = useState('')
    const {username} = useParams('')
    const expiredFoodLength = 0

      const data = [
        {position: 1, data: expiredFood.length},
        {position: 2, data: totalRec - expiredFood.length}
      ];

    const [rend,setRen] = useState(false)


    useEffect(() => {

        const getFoodData = async () => {
            const resp = await axios.get(`http://localhost:8000/api/food/all/expired/${username}`)
            const respTotal = await axios.get(`http://localhost:8000/api/foodbyuser/${username}`,{withCredentials:true})

            setExpiredFood(resp.data)
            console.log(resp)
            setTotalRec(respTotal.data.length)
            console.log(respTotal.data.length)

            setRen(true)

        }

        getFoodData()
        },[username])


    let expiredFoodPercentage = ( expiredFood.length / totalRec) 


  return (
    <div  >
            <div id='back-right'>
              <Link to='/food'> Back</Link>
            </div>
        <div className='main container '>    
        <div className='xpFood piChart'>

              {rend ? <GaugeChart id="gauge-chart1" 
              nrOfLevels={20} 
              percent={expiredFoodPercentage}
              arcWidth={0.2} 
              textColor={'black'}
              /> : <p>Please Wiat</p>}
              Expired food Percentage
          </div>
          <div className='xpFood'>
          <VictoryChart
          // adding the material theme provided with Victory
          theme={VictoryTheme.material}
          domainPadding={50}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        >
          <VictoryAxis
            tickFormat={["Expired Items", "Fresh Items"]}
          />
          <VictoryAxis
            dependentAxis
            domain={[0,totalRec]}
          />
          <VictoryBar
            data={data}
            x="position"
            y="data"
          />
        </VictoryChart>
          </div>
      </div>
      {console.log(totalRec)}
    </div>
  )
}

export default Chart