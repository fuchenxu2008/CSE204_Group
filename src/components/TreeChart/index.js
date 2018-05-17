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
    let result = null;
    let runningTime = null;
    let error = false;

    try {
      const t0 = performance.now();
      data = getData(infixExpression);
      const t1 = performance.now();
      runningTime = t1 - t0;
      result = caculateResult(data.postfixArr);
    } catch (err) {
      console.log(err);
      error = true;
    }

    return (
      <div>
        <input type="text" className="expression-input" value={infixExpression} onChange={this.handleInputChange} />
        {
          !error && (result || result === 0) && !isNaN(result) && runningTime && data.postfixMap
            ? (
              <div>
                <h3>Result: {result}</h3>
                <small>Given input size of <span style={{ color: 'red' }}>{infixExpression.split(' ').join('').length}</span> elements, the function took <span style={{ color: 'red' }}>{runningTime}</span> milliseconds</small>
                <ReactEcharts
                    option={getOption(data.treeData)}
                    notMerge={true}
                    lazyUpdate={true}
                />
                <ul className="postfix-map">
                    {Object.keys(data.postfixMap).map(x => (
                        <li key={x} className="postfix-item">
                            {x} = <span className="postfix-value">{data.postfixMap[x]}</span>
                        </li>
                    ))}
                </ul>
              </div>
            )
            : <h3 style={{ color: 'red' }}>Invalid Expression</h3>
        }
      </div>
    )
  }
}
