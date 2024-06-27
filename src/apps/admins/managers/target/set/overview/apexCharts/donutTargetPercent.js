import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import ReactApexChart from 'react-apexcharts';
class chartTargetPercent extends Component {
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
            chart: { type: 'donut', },
            labels: dataTargets.map(item => (item?.store?.name)),
        };
        return (
            <div>
                <strong>Tổng quan Target ( % )</strong>
                <ReactApexChart options={options}
                    series={dataTargets.map(item => (item?.target / 1000000))} type="donut" />
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(chartTargetPercent));