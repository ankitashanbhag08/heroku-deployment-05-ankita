
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
    return (
      <MapContainer center={[65, 60]} zoom={2} scrollWheelZoom={false} whenCreated={(map)=>{
        map.on("dblclick",(e)=>console.log(e.latlng.lat))
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