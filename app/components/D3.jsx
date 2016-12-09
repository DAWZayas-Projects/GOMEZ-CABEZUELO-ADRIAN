import React, { PropTypes } from 'react';
import $ from 'jquery';
import flot from 'flot';

class D3 extends React.Component {

  componentWillMount() {
        //this.renderChart()
        this.props.fetchMainChartData()
  }

  

  componentDidUpdate(prevProps) {
        if(prevProps.main.uv && prevProps.main.uv === this.props.main.uv) {
            return
        }
        this.renderChart(this.props.main.uv, this.props.main.legends)
  }

  maxValueOfLines() {
      const lines = this.props.main.uv
      return lines.reduce( (init, arr) =>  arr[1] > init ? arr[1] : init, 0)
  }

  renderChart(uv=[], legends=[]) {
        const chartDiv = this.refs.interchart;
        const max      = uv.length > 0 ? this.maxValueOfLines(uv) : 1
        const color    = "#348fe2"

    $.plot(chartDiv, [{
            data: uv,
            label: "Actions",
            color: color,
            lines: {
                show: true,
                fill: false,
                lineWidth: 2
            },
            points: {
                show: true,
                radius: 3,
                fillColor: "#fff"
            },
            shadowSize: 0
        }], {
            xaxis: {
                ticks: legends,
                tickDecimals: 0,
                tickColor: "#ddd"
            },
            yaxis: {
                ticks: max,
                tickColor: "#ddd",
                min: 0,
                max: max
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#ddd",
                borderWidth: 1,
                backgroundColor: "#fff",
                borderColor: "#ddd"
            },
            legend: {
                labelBoxBorderColor: "#ddd",
                margin: 10,
                noColumns: 1,
                show: true
            }
        });
  }


  render() {

    if(this.props.main.chartShow) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        const date  = new Date()
        const month = monthNames[date.getMonth()]
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-inverse" data-sortable-id="index-1">
                            <div className="panel-heading">
                                <h4 className="panel-title">FTP Analytics {month}</h4>
                            </div>
                            <div className="panel-body">
                                <div id="interactive-chart" className="height-sm" ref="interchart" style={{height: '400px'}}></div>
                            </div>
                            <div className="panel-footer text-right">
                                <a href="/history/export/uv" className="btn btn-info btn-sm">Export</a>
                            </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
  }
}

export default D3
