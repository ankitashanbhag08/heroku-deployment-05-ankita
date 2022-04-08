require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
var cors = require('cors')
const db = [{ name: "tiina" }, { name: "jack1" }];
const database = require('./crudrepository')

app.use(cors())
app.use(express.static("frontend/build"));
app.get("/names", (req, res) => {
  res.send(db);
});

app.get("/locations", async (req, resp)=>{
    try{
        const filters=req.query;
        const results = await database.findAll(filters);
        resp.send(results);
    }catch(err){
        resp.status(500).end();
    }    
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
}); 