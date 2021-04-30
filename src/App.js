import React, { useState, useEffect } from "react";
import PieDonut from "./components/PieDonut";

import "./App.css";

function App() {
  const revenueColors=["#396619","#84d037"];
  const tabletRevenue = { 'value': 120000 };
  const smartphoneRevenue = {'value':80000};

  const impresionsColors=["#2d4d63","#6fc6e0"];
  const tabletImpresions = { 'value': 20000000 };
  const smartphoneImpresions = {'value':30000000};

  const visitsColors=["#bb5414","#ecc22c"];
  const tabletVisits = { 'value': 480000000 };
  const smartphoneVisits = {'value':120000000};
  
  const values = [smartphoneRevenue, tabletRevenue, ];
  const values2 = [smartphoneImpresions, tabletImpresions];
  const values3 = [smartphoneVisits, tabletVisits];

  const generateData = (value) =>
    values.map((item)=> ({
    value: value === null || value === undefined  ? Math.round(item.value*Math.random()) : value
    
  }));
  
  const [data, setData] = useState(values);

  const totalRevenue=data[0].value+data[1].value;
  const tabletR=data[1].value;
  const percentOfTabletR=Math.round((tabletR*100)/(totalRevenue));
  const percentOfSmartphoneR=(100-percentOfTabletR);

  const totalImpresions=values2[0].value+values2[1].value;
  const tabletI=values2[1].value;
  const percentOfTabletI=Math.round((tabletI*100)/(totalImpresions));
  const percentOfSmartphoneI=(100-percentOfTabletI);

  const totalVisits=values3[0].value+values3[1].value;
  const tabletV=values3[1].value;
  const percentOfTabletV=Math.round((tabletV*100)/(totalVisits));
  const percentOfSmartphoneV=(100-percentOfTabletV);

  const changeData = () => {
    setData(generateData());    
  };
  useEffect(() => {
      //console.log(data)
    },[data]);

  console.log(data[0].value)
  //console.log(values2)
  //console.log(values3)
  return (
    <div className="App">
        <button className="custom-button" onClick={changeData}>Revenue</button>
      <div className="item">
        <span className="label-t" style={{color: revenueColors[1]}}>
          Tablet
          <ul className="ul-t" style={{color: "black"}}>{percentOfTabletR}% {((data[1].value).toLocaleString('en-US')).replace(/,/gi,'.')}€</ul> 
        </span>
        <PieDonut
          id={1}
          data={data}
          width={200}
          height={200}
          innerRadius={90}
          outerRadius={100}
          revenueColors={revenueColors}
        />
        <span className="label" style={{color: revenueColors[0]}}> Smartphone
          <ul className="ul" style={{color: "black"}}>{percentOfSmartphoneR}% {((data[0].value).toLocaleString('en-US')).replace(/,/gi,'.')}€</ul> 
        </span>
              
      </div>
      <div className="item">
      <span className="label-t" style={{color: impresionsColors[1]}}>Tablet
        <ul className="ul-t" style={{color: "black"}}>{percentOfTabletI}% {((values2[1].value).toLocaleString('en-US')).replace(/,/gi,'.')}</ul> 
      </span>

        <PieDonut
          id={2}
          data={values2}
          width={200}
          height={200}
          innerRadius={90}
          outerRadius={100}
          impresionsColors={impresionsColors}
        />
        <span className="label" style={{color: impresionsColors[0]}}>Smartphone
          <ul className="ul" style={{color: "black"}}>{percentOfSmartphoneI}% {((values2[0].value).toLocaleString('en-US')).replace(/,/gi,'.')}</ul>
        </span>
      </div>
      <div className="item">
      <span className="label-t" style={{color: visitsColors[1]}}>Tablet 
        <ul className="ul-t" style={{color: "black"}}>{percentOfTabletV}% {((values3[1].value).toLocaleString('en-US')).replace(/,/gi,'.')}</ul> 
        </span>
        <PieDonut
          id={3}
          data={values3}
          width={200}
          height={200}
          innerRadius={90}
          outerRadius={100}
          visitsColors={visitsColors}
        />
        <span className="label" style={{color: visitsColors[0]}}>Smartphone
          <ul className="ul" style={{color: "black"}}>{percentOfSmartphoneV}% {((values3[0].value).toLocaleString('en-US')).replace(/,/gi,'.')}</ul> 
        </span>
      </div>
    </div>
  );
}
export default App;