/**
*
* @title 线性图
*
*/

import React, { Component } from 'react';
import D3Graph from '../../src';


class Demo6 extends Component {
    componentDidMount () {
        var margin = {top: 40, right: 40, bottom: 40, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain([0, 1])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, 1])
        .range([height, 0]);

    var z = d3.scale.linear()
        .domain([2 / 3, 1]) // D3 3.x tension is buggy!
        .range(["brown", "steelblue"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("cardinal")
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    var svg = d3.select("#tsv").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data.tsv", type, function(error, data) {
      if (error) throw error;

      svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "axis axis--y")
          .call(yAxis);

      svg.selectAll(".line")
          .data(z.ticks(6))
        .enter().append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line.tension(d)(data); })
          .style("stroke", z);

      svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", function(d) { return x(d.x); })
          .attr("cy", function(d) { return y(d.y); })
          .attr("r", 3.5);
    });

    function type(d) {
      d.x = +d.x;
      d.y = +d.y;
      return d;
    }
    }
    render () {
        return (
            <div id="tsv"></div>
        )
    }
}

export default Demo6;