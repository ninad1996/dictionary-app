const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const cors = require('cors');
const corsOptions = require('./src/config/cors');
const axios = require("axios")

app.use(cors(corsOptions));


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
      axios.get(`https://trends.google.com/trends/api/widgetdata/comparedgeo?hl=en-US&tz=-330&req=%7B%22geo%22:%7B%22country%22:%22IN%22%7D,%22comparisonItem%22:%5B%7B%22time%22:%222023-07-22T11%5C%5C:07%5C%5C:46+2023-07-23T11%5C%5C:07%5C%5C:46%22,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22book%22%7D%5D%7D%7D%5D,%22resolution%22:%22REGION%22,%22locale%22:%22en-US%22,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22CM%22,%22category%22:0%7D,%22userConfig%22:%7B%22userType%22:%22USER_TYPE_LEGIT_USER%22%7D%7D&token=APP6_UEAAAAAZL5bgtXjbW0OecB57GqZYAHa5-ja0cdw`).then((response)=>{
          res.send({ express: response.data }); //Line 10
      }).catch((err)=> {
          console.log(err);
      })

}); //Line 11