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

class Demo1 extends Component {
	render () {
		return (
			<div style={{width: 500,height: 500}}>
				<D3Graph
					label={['健康', '异常', '未知']}
					unit='个'
					title='应用健康状况比例图'
					alpha={0.5}
					circleSpan={[25,15,10]}
					labelLineLength1={25}
					labelLineLength2={100}
					value={[10, 10, 10]}
				>

				</D3Graph>
			</div>

		)
	}
}

export default Demo1;