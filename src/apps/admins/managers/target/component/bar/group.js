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
        const { dataCategories, dataSeries, height, title, unit, colors } = this.props;
        const formatValue = (value) => {
            if (unit === 'money') {
                if (value < 1 && value >= -1) {
                    return formatNumber(value * 1000, 0, 1) + " ngàn";
                }
                return formatNumber(value, 0, 2) + " triệu";
            }
            return value;
        }
        const options = {
            chart: {
                type: 'bar',
            },
            title: {
                text: title,
                fontSize: '8px',
            },
            colors: colors,
            plotOptions: {
                bar: {
                    barHeight: '90%',
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: 50,
                style: {
                    fontSize: '12px',
                    colors: ['#242424']
                },
                formatter: function (val) {
                    return formatValue(val);
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
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
            xaxis: {
                categories: dataCategories,
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
                    type="bar" height={height} />
            </div>

        );
    }

}
export default group;