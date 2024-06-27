import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {

    }
    render() {
        const { dataLabels, dataSeries, height, title } = this.props;
        const options = {
            chart: {
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '60%',
                    },
                    dataLabels: {
                        name: {
                            fontSize: '14px',
                        },
                    }
                },
            },
            labels: dataLabels,
        }
        return (

            <div>
                {title && <strong>{title}</strong>}
                <ReactApexChart options={options}
                    series={dataSeries} type="radialBar"
                    height={height} />
            </div>

        );
    }

}
export default basic;