/**
*
* @title d3环形饼状图
* @description
* label: 标签名称
* unit: 单位
* title: 标题
* circelSpan:  饼状环的宽度
* labelLineLength1: 第一段引出线的长度
* labelLineLength2: 第二段引出线的长度
* value: 数据
*
*/

import React, { Component } from 'react';
import D3Graph from '../../src';

class Demo4 extends Component {
	componentDidMount () {
		this.InitCanvas();
	}

	InitCanvas = () => {
        let root = {
		        "honourInfo": [
		            {
		                "userName": "郑龙强",
		                "avatar": "http://staticoss.upesn.com/5417/3125390/201704/7/149156392540abee656cab633426e40098a4083cfb.jpg"
		            },
		            {
		                "amount": 2,
		                "avatar": "http://staticoss.upesn.com/5417/2902446/201704/5/14914020994f450245f3229a29f635243a0a2b6ac2.jpg",
		                "memberId": 5423,
		                "userName": "郭永峰"
		            },
		            {
		                "amount": 2,
		                "avatar": "http://staticoss.upesn.com/5417/2902446/201704/5/14914020994f450245f3229a29f635243a0a2b6ac2.jpg",
		                "memberId": 5423,
		                "userName": "郭永峰1"
		            }
		        ]
		}
      	var maxWidth = 600;
      	var width, height, img_h, img_w, radius, text_dx, text_dy;

	    try {
	          if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
	              width = maxWidth - 20;
	              height = 400;
	              img_w = maxWidth / 3;
	              img_h = maxWidth / 3;
	              radius = 70;
	              text_dx = -50;
	              text_dy = -20;
	              var svg = d3
	                  .select("#app")
	                  .append("svg")
	                  .attr("width", width)
	                  .attr("height", height);

	              var len = root.honourInfo.length;
	              root.edges = [];

	              for(var i=0;i<len;i++) {
	                  root.edges.push({ "source": 0 , "target": i });
	              }
	              //D3力导向布局
	              var force = d3.layout.force()
	                  .nodes(root.honourInfo)
	                  .links(root.edges)
	                  .size([width,height])
	                  .linkDistance(350)
	                  .charge(-2000)
	                  .start();
	          } else {
	              width = maxWidth - 20;
	              height = 400;
	              img_w = maxWidth / 4;
	              img_h = maxWidth / 4;
	              radius = 30;
	              text_dx = -35;
	              text_dy = 10;
	              var svg = d3
	                  .select("#app")
	                  .append("svg")
	                  .attr("width", width)
	                  .attr("height", height);

	              var len = root.honourInfo.length;
	              root.edges = [];

	              for(var i=0;i<len;i++) {
	                  root.edges.push({ "source": 0 , "target": i });
	              }
	              //D3力导向布局
	              var force = d3.layout.force()
	                  .nodes(root.honourInfo)
	                  .links(root.edges)
	                  .size([width,height])
	                  .linkDistance(150)
	                  .charge(-2000)
	                  .start();
	          }
	    } catch (e) {
	    }
        //边
        var edges_line = svg.selectAll("line")
                            .data(root.edges)
                            .enter()
                            .append("line")
                            .style("stroke","#e0e0e0")
                            .style("stroke-width",3);

        //边上的文字（人物之间的关系）
        var edges_text = svg.selectAll(".linetext")
                            .data(root.edges)
                            .enter()
                            .append("text")
                            .attr("class","linetext")
                            .text(function(d){
                                return d.relation;
                            });


        // 圆形图片节点（人物头像）
        var nodes_img = svg.selectAll("image")
                            .data(root.honourInfo)
                            .enter()
                            .append("circle")
                            .attr("class", "circleImg")
                            .attr("r", radius)
                            .attr("fill", function(d, i){

                                //创建圆形图片
                                var defs = svg.append("defs").attr("id", "imgdefs")

                                var catpattern = defs.append("pattern")
                                                        .attr("id", "catpattern" + i)
                                                        .attr("height", 1)
                                                        .attr("width", 1)

                                catpattern.append("image")
                                        .attr("x", - (img_w / 2 - radius))
                                        .attr("y", - (img_h / 2 - radius))
                                        .attr("width", img_w)
                                        .attr("height", img_h)
                                        .attr("xlink:href", d.avatar)

                                return "url(#catpattern" + i + ")";

                            })
                            // .on("mouseover",function(d,i){
                            //     //显示连接线上的文字
                            //     edges_text.style("fill-opacity",function(edge){
                            //         if( edge.source === d || edge.target === d ){
                            //             return 1.0;
                            //         }
                            //     });
                            // })
                            // .on("mouseout",function(d,i){
                            //     //隐去连接线上的文字
                            //     edges_text.style("fill-opacity",function(edge){
                            //         if( edge.source === d || edge.target === d ){
                            //             return 0.0;
                            //         }
                            //     });
                            // })
                            .call(force.drag);



        var nodes_text = svg.selectAll(".nodetext")
                            .data(root.honourInfo)
                            .enter()
                            .append("text")
                            .attr("class","nodetext")
                            .attr("dx",text_dx)
                            .attr("dy",text_dy)
                            .text(function(d){
                              if(d.amount) {
                                return d.userName + d.amount + "项";
                              } else {
                                return "";
                              }
                            });


        force.on("tick", function(){

            //限制结点的边界
            root.honourInfo.forEach(function(d,i){
                d.x = d.x - img_w/2 < 0     ? img_w/2 : d.x ;
                d.x = d.x + img_w/2 > width ? width - img_w/2 : d.x ;
                d.y = d.y - img_h/2 < 0      ? img_h/2 : d.y ;
                d.y = d.y + img_h/2 + text_dy > height ? height - img_h/2 - text_dy : d.y ;
            });

            //更新连接线的位置
             edges_line.attr("x1",function(d){ return d.source.x; });
             edges_line.attr("y1",function(d){ return d.source.y; });
             edges_line.attr("x2",function(d){ return d.target.x; });
             edges_line.attr("y2",function(d){ return d.target.y; });

             //更新连接线上文字的位置
             edges_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
             edges_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });


             //更新结点图片和文字
             nodes_img.attr("cx",function(d){ return d.x });
             nodes_img.attr("cy",function(d){ return d.y });

             nodes_text.attr("x",function(d){ return d.x });
             nodes_text.attr("y",function(d){ return d.y + img_w/2; });
        });
       

  	}
	render () {
		return (
			<div id="app"></div>

		)
	}
}

export default Demo4;