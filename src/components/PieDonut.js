import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import  "./pie-donut.styles.css";

//console.log('Not THE re-render')
const Pie = props => {
  //console.log(props.data)
  const dataId = props.id;  
  
  
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const createArc2 = d3
    .arc()
    .innerRadius(props.innerRadius-10)
    .outerRadius(props.outerRadius-10);
  let colors; 
  let dataName; 
  let currencySymbol;
  switch (dataId) {
    case 1:
      colors = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(["Dark Green","Light Green"])
      .range(props.revenueColors);
      dataName = 'REVENUE';
      currencySymbol ='€';
      break;
    case 2:
      colors = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(["Dark Blue","Light Blue"])
      .range(["#2d4d63","#6fc6e0"]);
      dataName = 'IMPRESIONS';
      currencySymbol ='';
      break;
    case 3:
      colors = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(["Orange","Yellow"])
      .range(["#bb5414","#ecc22c"]);
      dataName = 'VISITS';
      currencySymbol ='';
      break;
    default:
      colors = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(["Dark Green","Light Green"])
      .range(["#396619","#84d037"]);
      dataName = 'UNKNOWN';
      currencySymbol ='';
  } 
  
  const format = d3.format(",d");
  //const format = d3.format(".2f");
  
  useEffect(    
    () => {
      const data = createPie(props.data);
      //console.log('New re-render', props.data)

      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors(i));

      const path2 = groupWithUpdate
        .append("path")

      path2
        .attr("class", "arc")
        .attr("d", createArc2)
        //.attr("d", createArc2)
        .attr("fill", "white");
        
      
      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));        
      text        
        .attr("dy", "0.4em")
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .style("font-size", 30)
        .style("font-weight", 0)
        .text((format(props.data[0].value+props.data[1].value)+currencySymbol).replace(/,/gi,'.'));

      const text2 = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text2")); 
      text2        
        .attr("dy", "-1em")
        .style("text-anchor", "middle")
        .style("font-size", 20)
        .style('fill', 'grey')
        .text(dataName);
    },[props.data]);

  return (
    <div className="svg"> 
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
    </div>
  );
};

export default Pie;
