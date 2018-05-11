import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { getOption } from './option';
import { getData, caculateResult } from './getData';

export default class TreeChart extends Component {
    state = {
        infixExpression: '( 1 + 2 / 3 * ( 4 + 5 ) - 6 )',
    }

    handleInputChange = e => {
        this.setState({ infixExpression: e.target.value });
    }

    render() {
        const { infixExpression } = this.state;
        let data = {};
        let treeData = [];
        let result = null;
        let error = false;
        try {
            data = getData(infixExpression);
            treeData = data.treeData;
            result = caculateResult(data.postfixArr);
        } catch (err) {
            console.log(err);
            error = true;
        }

        return (
        <div>
            <input type="text" className="expression-input" value={infixExpression} onChange={this.handleInputChange} />
            {
                error
                    ? <h3 style={{ color: 'red' }}>Invalid Expression</h3>
                    : <h3>Result: {result}</h3>

            }
            <ReactEcharts
                option={getOption(treeData)}
                notMerge={true}
                lazyUpdate={true}
            />
            {
                data.postfixMap &&
                <ul className="postfix-map">
                    {Object.keys(data.postfixMap).map(x => (
                        <li key={x} className="postfix-item">
                            {x} = <span className="postfix-value">{data.postfixMap[x]}</span>
                        </li>
                    ))}
                </ul>
            }
            
        </div>
        )
    }
}
