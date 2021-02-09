import { useEffect, useState } from 'react';
import axios from 'axios';
import './Box.css';

function Box() {
    const [Active, setActive] = useState([]);
    const [Recovered, setRecovered] = useState([]);
    const [Deaths, setDeaths] = useState([]);
    const [Confirmed, setConfirmed] = useState([]);
    useEffect(()=>{
        async function fetchData() {
          await axios.get('https://api.covid19india.org/data.json').then((x)=>{
          let active = 0, recovered = 0, deaths = 0, confirmed = 0;
            for(let i in x.data.statewise) {
                active+=parseInt(x.data.statewise[i].active);
                confirmed+=parseInt(x.data.statewise[i].confirmed);
                deaths+=parseInt(x.data.statewise[i].deaths);
            }
            recovered = confirmed - active - deaths;
            setActive(active);
            setConfirmed(confirmed);
            setDeaths(deaths)
            setRecovered(recovered);
          })
          }
          fetchData();
        },[]); 

        return (
            <div class="cnt">
                <div class ="boxed">
                    Active:<br></br>
                    {Active}
                </div>
                <div class ="boxed2">
                    Recovered:<br></br> 
                    {Recovered}
                </div>
                <div class="boxed3">
                    Deaths:<br></br> 
                    {Deaths}
                </div>
                <div class="boxed4">
                    Confirmed:<br></br> 
                    {Confirmed}
                </div>
            </div>
        )
}

export default Box;