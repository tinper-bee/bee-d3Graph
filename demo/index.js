
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import D3Graph from '../src';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" d3环形饼状图","code":"/**\n*\n* @title d3环形饼状图\n* @description\n* label: 标签名称\n* unit: 单位\n* title: 标题\n* circelSpan:  饼状环的宽度\n* labelLineLength1: 第一段引出线的长度\n* labelLineLength2: 第二段引出线的长度\n* value: 数据\n*\n*/\n\nimport React, { Component } from 'react';\nimport D3Graph from 'bee-d3Graph';\n\nclass Demo1 extends Component {\n\trender () {\n\t\treturn (\n\t\t\t<div style={{width: 500,height: 500}}>\n\t\t\t\t<D3Graph\n\t\t\t\t\tlabel={['健康', '异常', '未知']}\n\t\t\t\t\tunit='个'\n\t\t\t\t\ttitle='应用健康状况比例图'\n\t\t\t\t\talpha={0.5}\n\t\t\t\t\tcircleSpan={[25,15,10]}\n\t\t\t\t\tlabelLineLength1={25}\n\t\t\t\t\tlabelLineLength2={100}\n\t\t\t\t\tvalue={[10, 10, 10]}\n\t\t\t\t>\n\n\t\t\t\t</D3Graph>\n\t\t\t</div>\n\n\t\t)\n\t}\n}\n\n","desc":""}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
