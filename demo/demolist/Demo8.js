/**
*
* @title 动态时间线
*
*/

import React, { Component } from 'react';
import D3Graph from '../../src';

class Demo8 extends Component {
	componentDidMount () {
		var duration = 2500,
		    delay = 500;

		var width = 960,
		    height = 500;

		var x = d3.time.scale()
		    .domain([new Date(2010, 0, 2), new Date(2010, 1, 1)])
		    .range([0, width]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom")
		    .tickSize(6, 0)
		    .tickFormat(d3.time.format("%m/%d"));

		var svg = d3.select("#date").append("svg")
		    .attr("width", width)
		    .attr("height", height);

		var g = svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(0," + height / 2 + ")")
		    .call(xAxis);

		setInterval(update, duration + delay);

		function update() {
		  x.domain([new Date(2010, 0, 2), new Date(2010, 0, Math.floor(Math.random() * 21) + 10)]);

		  g.transition()
		      .duration(duration)
		      .call(xAxis);
		}
	}
	render () {
		return (
			<div id="date">
				
			</div>
		)
	}
}

export default Demo8;