const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const cors = require('cors');
const corsOptions = require('./src/config/cors');
const axios = require("axios")

const puppeteer = require('puppeteer');


app.use(cors(corsOptions));


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/api/browser', async (req, res) => { //Line 9

  const {word} = req.query;


  if (!word) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  let browser;

  try {
    // browser = await puppeteer.launch({headless:true});
    // const page = await browser.newPage();
    // await page.goto(url);
    // const screenshot = await page.screenshot({ type: 'png' });
    // let params = {"comparisonItem":[{"keyword": "red","geo":"IN","time":"now 1-d"}],"category":0,"property":""}
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const searchQueries = [word];

    const URL = `https://trends.google.com/trends/explore?date=now%207-d&q=${encodeURI(searchQueries.join(","))}&hl=en`;
    console.log(URL)
    // const URL = `https://trends.google.com/trends/api/explore?hl=en-US&tz=-330&req=${encodeURIComponent(JSON.stringify(params))}&tz=-330`;
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
    await page.goto(URL);
    await page.waitForTimeout(5000);


    await page.reload();
    // await page.waitForResponse(URL);
    const comparedByRegion = [];

    // await page.target('Page.setDownloadBehavior', {behavior: 'allow', 
    // downloadPath: 'D:\\testpuppet\\'}).createCDPSession();; // this set the destionation of file dowloaded by pup.
    const valuePattern = /%22value%22:%22(?<value>[^%]+)/gm; //https://regex101.com/r/PNcP1u/1
    page.on("response", async (response) => {
      if (response.headers()["content-type"]?.includes("application/")) {
        console.log(response);
        const responseData = await response.text();
        const responseURL = await response.url();
          const values = [...responseURL.matchAll(valuePattern)].map(({ groups }) => groups.value);
          if (responseURL.includes("widgetdata/comparedgeo?")) {
              const parsedData = JSON.parse(responseData.slice(6))?.default;
              comparedByRegion.push(
                ...parsedData.geoMapData.map((dataEl) => ({
                  geo: dataEl.geoCode,
                  location: dataEl.geoName,
                  maxValueIndex: dataEl.maxValueIndex,
                  values: searchQueries.map((queryEl, i) => ({
                    query: queryEl,
                    value: dataEl.formattedValue[i],
                    extractedValue: dataEl.value[i],
                  })),
                }))
              );    
          }
      }
    });
  
    await page.waitForTimeout(10000);
    if (browser) {
      await browser.close();
    }
    res.status(200).json({ comparedByRegion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
