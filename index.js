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
    res.status(500).send(err);
  });
})

app.get("/api/latlong/:lat/:long", (req, res)=>{
  let lat = req.params.lat;
  let long = req.params.long;
  axios.get(`https://api.weather.gov/points/${lat},${long}`)
  .then(result=>{
    console.log(result.data.properties.forecastHourly);
    res.send(result.data.properties.forecastHourly);
  })
  .catch(err=>{
    console.error(err);
    res.status(500).send(err);
  })

})

app.get("/api/location/:location", (req, res)=>{
  let location = req.params.location;
  axios.get(`https://nominatim.openstreetmap.org/search?q=${location.replace(" ", "%20")}&format=json`)
  .then(result=>{
    console.log(result.data);
    res.send(result.data);
  })
  .catch(err=>{
    console.err(err);
    res.status(500).send(err);
  })
})

app.listen(8000, (err)=>{
  if(err)return console.log(err);
  console.log("We are listening on http://localhost:8000");
})