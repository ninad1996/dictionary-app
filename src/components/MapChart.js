import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { geoPatterson } from "d3-geo-projection";
import { scaleLinear } from "d3-scale"

const geoUrl ="world.json"
// const geoUrl = "india-asia.json"
const colorScale = scaleLinear().domain([0, 100]).range(['#ddd', "#06F"])


const MapChart = (data) => {
    const [clickedCity, setClickedCity] = React.useState("");
    const width = 900
    const height = 600
    console.log(data.data);
    var mapData = {};
    if(data.data != undefined && data.data != ""){
        mapData = data.data;
        // mapData = mapData.default.geoMapData;
        // console.log(mapData);
    }
    const handleClick = (geo) => {
      setClickedCity(geo.properties.countrycode);
    }

    let projection = geoPatterson().translate([width / 2, height / 2]).scale(150).center([0,0])
    // let states = data.objects.states;
    // console.log(states);
    return (
        <ComposableMap width={width} height={height} projection={projection}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) =>{ 
              // console.log(geo);
              const isClicked = clickedCity === geo.properties.countrycode;
                let stateName = geo.properties.countrycode;
                var val = 0;
                if(mapData.length >0 ){
                  val = mapData.filter((state) => {
                      // console.log(state.geo, stateName);
                      if(state.geo == stateName){
                        return state.values; 
                      }
                    })   
                    if(val[0] !== undefined){
                        val = val[0].values[0].value;
                        if(val =="" || val == "<1"){
                          val = 20;
                        }
                        if(val < 10){val  = val * 10}
                    }else{
                        val = 0;
                    }
                }
            return(
              <Geography key={geo.rsmKey} geography={geo} 
              onClick={() => handleClick(geo)}
              fill={colorScale(val)}
              stroke={(isClicked) ? "#999" : "none"} 
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
              />
            )})
          }
        </Geographies>
      </ComposableMap>
  )
}
export default MapChart;