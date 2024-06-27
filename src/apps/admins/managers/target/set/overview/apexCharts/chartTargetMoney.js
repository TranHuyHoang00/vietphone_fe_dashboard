import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import ReactApexChart from 'react-apexcharts';
class chartTargetMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {

    }
    render() {
        const { dataTargets } = this.props;
        const options = {
            chart: {
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    barHeight: '90%',
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
                    colors: ['#fff'],
                    fontSize: '12px',
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + " triệu"
                },
                offsetX: 0,
            },
            xaxis: {
                categories: dataTargets.map(item => (item?.store?.name)),
            },
            yaxis: { labels: { show: false } },
        }
        return (

            <div>
                <strong>Tổng quan Target ( triệu vnd )</strong>
                <ReactApexChart options={options}
                    series={[{ name: 'Target', data: dataTargets.map(item => (item?.target / 1000000)) }]}
                    type="bar" height={380} />
            </div>

        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargets: state.target.dataTargets,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTarget: (dataFilter) => dispatch(actions.getListTargetRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(chartTargetMoney));