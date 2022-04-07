require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const db = [{ name: "tiina" }, { name: "jack1" }];
const database = require('./crudrepository')

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