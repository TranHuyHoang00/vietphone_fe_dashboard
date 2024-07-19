import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { formatNumber } from '@utils/handleFuncFormat';
class group extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { labels, height, title, unit, colors, dataSeries } = this.props;
        const formatValue = (value) => {
            if (unit === 'money') {
                if (value < 1 && value >= -1) {
                    return formatNumber(value * 1000, 0, 1);
                }
                return formatNumber(value, 0, 1);
            }
            return value;
        }
        const options = {
            chart: {
                type: 'line',
            },
            title: {
                text: title,
                fontSize: '8px',
            },
            colors: colors,

            stroke: {
                width: [3, 3],
                curve: 'smooth'
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0, 1],
                formatter: function (val) {
                    return formatValue(val);
                }
            },

            plotOptions: {
            },
            fill: {
                opacity: [1, 0.5],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100]
                }
            },
            xaxis: {
                categories: labels,
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return Math.round(value);
                    }
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (val) {
                        return formatValue(val);
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            }
        }
        return (
            <div>
                <ReactApexChart options={options}
                    series={dataSeries}
                    type="line" height={height} width={1000} />
            </div>

        );
    }

}
export default group;