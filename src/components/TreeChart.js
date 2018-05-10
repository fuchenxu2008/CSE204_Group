import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { getOption } from './option';
import { data } from './data';

export default class TreeChart extends Component {
    render() {
        return (
        <div>
            <ReactEcharts
                option={getOption(data)}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
                // onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
                // opts={}
            />
        </div>
        )
    }
}
