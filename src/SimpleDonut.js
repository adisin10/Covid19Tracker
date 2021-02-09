import React,{ useEffect,useState } from 'react'
import './App.css';
import ReactApexChart from "react-apexcharts";


function SimpleDonut(props) {
    const [series,setSeries]=useState([(props?.data?.active/1000), (props?.data?.deaths/1000), (props?.data?.recovered/1000)])
    const[options,setOptions]=useState(
      {
        tooltip: {
          enabled:false
        },
        chart: {
          type: 'donut',
          width:400
        },
        colors:[ '#1153cf', '#5a606b','#31a34f'],
        labels: [`Active :${props?.data?.active}`, `Deceased :${props?.data?.deaths}`, `Recovered :${props?.data?.recovered}`]
      ,
        markers: {
          colors: ['#FFF']
       },
       dataLabels: {
        enabled: false,
      }, 

        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    )


    return (
        <div>
            <ReactApexChart options={options} series={series} type="donut" className='donutSimple'/>

        </div>
    )
}

export default SimpleDonut;
