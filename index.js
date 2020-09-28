const express = require("express");
const axios = require("axios")
const app = express();


app.use(express.static("./static"))

app.get("/weather", (req, res)=>{
  axios.get("https://api.weather.gov/gridpoints/OAX/79,59/forecast/hourly")
  .then(result =>{
    res.send(result.data);
  })
  .catch(err=>{
    res.send(err);
  });
})

app.listen(8000, (err)=>{
  if(err)return console.log(err);
  console.log("We are listening on http://localhost:8000");
})