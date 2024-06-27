import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import ReactApexChart from 'react-apexcharts';
class chartTargetProduct extends Component {
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
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
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
                categories: dataTargets.map(item => (item?.store?.name)),
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            }
        }
        return (

            <div>
                <strong>Tổng quan Kpi ( sản phẩm )</strong>
                <ReactApexChart options={options}
                    series={[
                        { name: 'Điện thoại', data: [44, 55, 41, 64, 22, 43, 21, 54, 52, 73] },
                        { name: 'Loa', data: [53, 32, 33, 52, 13, 44, 32, 64, 22, 43] },
                        { name: 'Phụ kiện', data: [102, 92, 83, 72, 93, 74, 92, 34, 92, 80] }
                    ]}
                    type="bar" height={900} />
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(chartTargetProduct));