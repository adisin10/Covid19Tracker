import React, { useEffect,useState } from 'react';
import './App.css';
import axios from 'axios';
import Covid from './Covid';
import Cards from './Card';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SimpleDonut from './SimpleDonut';
import { scaleQuantile } from 'd3-scale';

import { 
  ComposableMap, Geographies, Geography 
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import LinearGradient from './LinearGradient.js';
import Box from './Box';
import IndiaMap from './IndiaMap';


const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937]
};

const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];
const DEFAULT_COLOR = '#EEE';
const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

const getHeatMapData = () => {
  return [
    { id: 'AP', state: 'Andhra Pradesh', value: getRandomInt() },
    { id: 'AR', state: 'Arunachal Pradesh', value: getRandomInt() },
    { id: 'AS', state: 'Assam', value: getRandomInt() },
    { id: 'BR', state: 'Bihar', value: getRandomInt() },
    { id: 'CT', state: 'Chhattisgarh', value: getRandomInt() },
    { id: 'GA', state: 'Goa', value: 21 },
    { id: 'GJ', state: 'Gujarat', value: 22 },
    { id: 'HR', state: 'Haryana', value: getRandomInt() },
    { id: 'HP', state: 'Himachal Pradesh', value: 24 },
    { id: 'JH', state: 'Jharkhand', value: 26 },
    { id: 'KA', state: 'Karnataka', value: 27 },
    { id: 'KL', state: 'Kerala', value: getRandomInt() },
    { id: 'MP', state: 'Madhya Pradesh', value: getRandomInt() },
    { id: 'MH', state: 'Maharashtra', value: getRandomInt() },
    { id: 'MN', state: 'Manipur', value: getRandomInt() },
    { id: 'ML', state: 'Meghalaya', value: 59 },
    { id: 'MZ', state: 'Mizoram', value: getRandomInt() },
    { id: 'NL', state: 'Nagaland', value: 59 },
    { id: 'OR', state: 'Odisha', value: 59 },
    { id: 'PB', state: 'Punjab', value: getRandomInt() },
    { id: 'RJ', state: 'Rajasthan', value: getRandomInt() },
    { id: 'SK', state: 'Sikkim', value: getRandomInt() },
    { id: 'TN', state: 'Tamil Nadu', value: getRandomInt() },
    { id: 'TG', state: 'Telangana', value: getRandomInt() },
    { id: 'TR', state: 'Tripura', value: 14 },
    { id: 'UT', state: 'Uttarakhand', value: getRandomInt() },
    { id: 'UP', state: 'Uttar Pradesh', value: 15 },
    { id: 'WB', state: 'West Bengal', value: 17 },
    { id: 'WB', state: 'West Bengal', value: 17 },
    { id: 'AN', state: 'Andaman and Nicobar Islands', value: getRandomInt() },
    { id: 'CH', state: 'Chandigarh', value: getRandomInt() },
    { id: 'DN', state: 'Dadra and Nagar Haveli', value: 19 },
    { id: 'DD', state: 'Daman and Diu', value: 20 },
    { id: 'DL', state: 'Delhi', value: 59 },
    { id: 'JK', state: 'Jammu and Kashmir', value: 25 },
    { id: 'LA', state: 'Ladakh', value: getRandomInt() },
    { id: 'LD', state: 'Lakshadweep', value: getRandomInt() },
    { id: 'PY', state: 'Puducherry', value: getRandomInt() }
  ];
};


function App() {
  const [x,setX] = useState([]);
  const[tt,setTT]=useState()
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());


 const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };


  useEffect(async()=>{
    await axios.get('https://api.covid19india.org/data.json').then((x)=>{
    // console.log(x)
    setX(x)
    setTT(x?.data?.statewise[0])
    }) 
    },[])   


    

    
  return (
    
    <div className="covid-app">
      <h1 className='header'>INDIA COVID-19 TRACKER </h1>
      <p>Let's all pray to make our earth Covid-19 free soon,
        Stay Safe and Do the Locate </p>
        
 
      
   { tt && <SimpleDonut data={tt}/>
   
   }
      
      
      <div className='state-container'>
            <div className='state-row'>
                <div className='state-data'>
                    
                    <p className='state'>STATE/UT</p>
                    <p className='confirmed'>CONFIRMED</p>
                    <p className='active'>ACTIVE</p>
                    <p className='recovered'>RECOVERED</p> 
                    <p className='deceased'>DECEASED</p>
                    
                </div>
            </div>
            
        </div>
      {



       x && x?.data?.statewise.map((d)=>{
          return(
            <Covid
      name={d.state}
      confirmed={d.confirmed}
      active={d.active}
      recovered={d.recovered}
      deceased={d.deaths}
      />  
 
          )
        
        })
        
      }
  
   {/* <Cards/> */}
<Box />

   {
     x?.data?.statewise && <IndiaMap data={x?.data?.statewise} />
     
     }

     <br />
     <br />

   
     



    </div>
  
  );
};


export default App;
