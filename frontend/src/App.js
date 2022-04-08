
import "./App.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const axios = require('axios')
const App =()=> {
  const [locationData, setLocationData] = useState([]);
  useEffect(()=>{    
      async function getLocations(){
      let hr = await axios.get('/locations');
      setLocationData(hr.data);
    }
    
    
      getLocations();
  },[])

  const saveLocation = async (location)=>{
    try{
      let lat=Number(location.lat)
      let lng=Number(location.lng)
      const resp = await axios.post('/locations',{latitude:lat,longitude:lng})
      const newLocation={id:Number(resp.data), latitude:lat, longitude:lng}
      setLocationData([...locationData, newLocation])
      console.log(`Location inserted with Id ${newLocation.id}`)
      
    }catch(err){
      console.log(err)
    }
    
    

  }
    return (
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false} whenCreated={(map)=>{
        map.on("dblclick",(e)=>{saveLocation(e.latlng)})
      }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {
            locationData.map((location)=>
              <Marker position={[location.latitude, location.longitude]} key={location.id}>
                <Popup>
                  [{location.latitude},{location.longitude}]
                </Popup>
              </Marker>
            )
          }
        
      </MapContainer>
    );
  
}
export default App;