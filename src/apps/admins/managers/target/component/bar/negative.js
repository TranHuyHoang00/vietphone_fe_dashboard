import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class negative extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
    }
    render() {
        const { dataCategories, dataSeries, height, title, unit } = this.props;
        const options = {
            chart: {
                type: 'bar',
            },
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
                enabled: false
            },
            yaxis: {
                stepSize: 1
            },
            tooltip: {
                shared: true,
                intersect: false,
                x: {
                    formatter: function (val) {
                        return val
                    }
                },
                y: {
                    formatter: function (val) {
                        return Math.abs(val) + ` ${unit}`
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
                {title && <strong>{title}</strong>}
                <ReactApexChart options={options}
                    series={dataSeries}
                    type="bar" height={height} />
            </div>

        );
    }

}
export default negative;