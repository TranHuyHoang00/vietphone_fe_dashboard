import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Spin } from 'antd';
import TableRevenueDetail from '../component/tableRevenueDetail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
        const { match, getListReportTargetStaff, dataFilter } = this.props;
        if (match && match.params) {
            const staffId = match.params.id;
            if (staffId) { await getListReportTargetStaff(dataFilter, [staffId]); }
        }
    }
    render() {
        const { dataReportTargetStaffs, isLoadingReportTargetStaff, dataFilter,
            typeActive, dataProductCategorys, isLoadingProductCategory
        } = this.props;
        return (
            <Spin spinning={isLoadingProductCategory || isLoadingReportTargetStaff}>
                <div className="mx-[10px] space-y-[10px]">
                    <Button onClick={() => this.props.history.push(`/admin/achieve/target/staff`)}
                        className='bg-[#e94138] text-white'>
                        Quay lại
                    </Button>
                    <TableRevenueDetail typeActive={typeActive} dataFilter={dataFilter}
                        dataReportTargetStaffs={dataReportTargetStaffs}
                        dataProductCategorys={dataProductCategorys} />
                </div>
            </Spin>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataReportTargetStaffs: state.reportTarget.dataReportTargetStaffs,
        isLoadingReportTargetStaff: state.reportTarget.isLoading,

        dataFilter: state.reportTarget.dataFilterStaff,
        typeActive: state.reportTarget.typeActiveStaff,

        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListReportTargetStaff: (dataFilter, listId) => dispatch(actions.getListReportTargetStaffRedux(dataFilter, listId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
