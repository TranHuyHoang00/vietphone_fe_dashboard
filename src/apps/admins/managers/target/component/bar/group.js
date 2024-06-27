import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class group extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataCategories, dataSeries, height, title } = this.props;
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
                enabled: true,
                offsetX: -10,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                },
                formatter: function (val, opt) {
                    return val + " triệu"
                },
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            tooltip: {
                shared: true,
                intersect: false
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
export default group;