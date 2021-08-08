import { MapContainer, TileLayer, Marker, Tooltip,Popup,useMapEvents,MapConsumer,useMap } from "react-leaflet";
import React,{useEffect,useState,useMemo,useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
import {TaxiIcon,TaxiIconSelected} from "./taxiIcon";
import distance from '../utils/FindDistance'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

const Map = ({checked,numberOfTaxi,setpickUpTime,UpdateValue,setUpdateValue}) => {
    console.log('UpdateValue: ', UpdateValue);
    let URLString=`https://qa-interview-test.splytech.dev/api/drivers?latitude={{lat}}&longitude={{long}}&count={{count}}`
    const defaultPosition= [1.285194,103.8522982]; // Singapore position
    const LondonPosition= [51.5049375, -0.0964509]; // London position
    const [Taxis, setTaxis] = useState([])
 
    const [position, setPosition] = useState(defaultPosition)

    const ChangeView=({ center, zoom })=> {
        const map1 = useMap();
        map1.setView(center, zoom);
        return null;
      }
   

    useEffect(()=>{
        URLString=  URLString.replace('{{lat}}',position[0])
        URLString= URLString.replace('{{long}}',position[1])
        URLString= URLString.replace('{{count}}',numberOfTaxi)

        axios.get(URLString).then(res=>{
            const{pickup_eta,drivers}=res.data
            setpickUpTime(pickup_eta)
            setTaxis(drivers)
            setUpdateValue()
        })


    },[UpdateValue])

    useEffect(()=>{
        if(checked&&checked===true){
            setPosition(LondonPosition)
            URLString=  URLString.replace('{{lat}}',LondonPosition[0])
            URLString= URLString.replace('{{long}}',LondonPosition[1])
            URLString= URLString.replace('{{count}}',numberOfTaxi)
    
            axios.get(URLString).then(res=>{
                const{pickup_eta,drivers}=res.data
                setpickUpTime(pickup_eta)
                setTaxis(drivers)
            })

        }else{
            setPosition(defaultPosition)
            URLString=  URLString.replace('{{lat}}',defaultPosition[0])
            URLString= URLString.replace('{{long}}',defaultPosition[1])
            URLString= URLString.replace('{{count}}',numberOfTaxi)
    
            axios.get(URLString).then(res=>{
                const{pickup_eta,drivers}=res.data
                setpickUpTime(pickup_eta)
                setTaxis(drivers)
            })

        
        }


    },[checked])
    
    return (
        <div className="TitleContainer MapContainer">
            
        <MapContainer id="Map1" center={defaultPosition} zoom={15} scrollWheelZoom={false}>
        <ChangeView center={!checked?defaultPosition:LondonPosition} zoom={15} /> 
        {/* <MyComponent /> */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={position}
       
        >
        {/* <Marker position={defaultPosition2}/> */}
          <Popup>
            Your Current Location is at {!checked?'Splyt Singapore Pte. Ltd':'Splyt (London)'}
          </Popup>
        </Marker>
        {
           Taxis&& Taxis.length>0&& Taxis.map((w,i)=>{

               let BearingNumber=()=>{if(distance(position[0],position[1],w.location.latitude,w.location.longitude,"K")<= 0.5){
                   return true 
               }else return false
}
               return(
                   <Marker key={w}  position={[w.location.latitude,w.location.longitude]} icon={BearingNumber()?TaxiIconSelected:TaxiIcon}/>

               )
           })
        }
        
      </MapContainer>
        </div>
        
    );
  };
  
  export default Map