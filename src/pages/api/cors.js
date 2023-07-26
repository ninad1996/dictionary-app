const axios = require("axios")
const puppeteer = require('puppeteer');

export default function handler(req, res) {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Content-Type', 'application/json');
    axios.get(`https://trends.google.com/trends/api/widgetdata/comparedgeo?hl=en-US&tz=-330&req=%7B%22geo%22:%7B%22country%22:%22IN%22%7D,%22comparisonItem%22:%5B%7B%22time%22:%222023-07-22T11%5C%5C:07%5C%5C:46+2023-07-23T11%5C%5C:07%5C%5C:46%22,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22book%22%7D%5D%7D%7D%5D,%22resolution%22:%22REGION%22,%22locale%22:%22en-US%22,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22CM%22,%22category%22:0%7D,%22userConfig%22:%7B%22userType%22:%22USER_TYPE_LEGIT_USER%22%7D%7D&token=APP6_UEAAAAAZL5bgtXjbW0OecB57GqZYAHa5-ja0cdw`).then((response)=>{
        console.log(response);
        res.json({ express: response.data }); //Line 10
    }).catch((err)=> {
        console.log(err);
        res.json({ error: err });
        console.log(err);
    })
  }