require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
var cors = require('cors')
//const db = [{ name: "tiina" }, { name: "jack1" }];
const database = require('./crudrepository')
app.use(express.json());
app.use(cors())
app.use(express.static("frontend/build"));
//app.get("/names", (req, res) => {
  //res.send(db);
//});

app.get("/locations", async (req, resp)=>{
    try{
        console.log("getting locations")
        const filters=req.query;
        const results = await database.findAll(filters);
        resp.send(results);
    }catch(err){
        resp.status(500).end();
    }    
});

app.post('/locations', async (req, resp)=>{
    try{
      console.log("Adding locations")
        let newLocation = req.body;
        console.log(req.body)        
            const newId=await database.save(newLocation.latitude, newLocation.longitude)
            resp.status(201).send(`${newId}`)   
        
    }catch(err){
        resp.status(500).end();
    }
})

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
}); 