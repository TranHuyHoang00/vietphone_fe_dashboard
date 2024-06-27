import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class category extends Component {
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
                    barHeight: '80%',
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: 'bottom'
                    },
                }
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: ['#404040'],
                    fontSize: '12px',
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + " triệu"
                },
                offsetX: 20,
            },
            xaxis: {
                categories: dataCategories,
            },
            yaxis: { labels: { show: false } },
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
export default category;