import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { columnRevenueOverViews } from './columns';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataReportTargetStaffs, dataFilter, typeActive } = this.props;
        return (
            <Table rowKey="id"
                columns={columnRevenueOverViews(typeActive, dataFilter, this.props.history)} dataSource={dataReportTargetStaffs}
                pagination={false}
                size="small" bordered scroll={{ x: 1000 }} />
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
