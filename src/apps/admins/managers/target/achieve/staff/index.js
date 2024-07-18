import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Space, Button, Dropdown, Spin, message, } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa";
import dayjs from 'dayjs';
import DrawerFilter from './drawers/drawerFilter';
import { exportTableAntdToExcel, exportTableAntdToImage } from '@utils/handleFuncExport';
import TableRevenueDetail from './component/tableRevenueDetail';
import TableRevenueOverView from './component/tableRevenueOverView';
import { columnRevenueOverViews } from './component/columns';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerFilter: false,
            disabledAcceptFilter: false,
        }
    }
    async componentDidMount() {
        const { dataFilter, getAllReportTargetStaff, dataReportTargetStaffs } = this.props;
        if (dataReportTargetStaffs && dataReportTargetStaffs.length === 0) {
            await getAllReportTargetStaff(dataFilter);
        }
    }
    openDrawer = async (drawerName, drawerValue) => {
        const { getListTargetStaff, dataFilter, dataTargetStaffs } = this.props;
        switch (drawerName) {
            case 'filter':
                if (dataTargetStaffs && dataTargetStaffs.length === 0) {
                    await getListTargetStaff({ page: 1, limit: 50, month: dayjs(dataFilter?.start).startOf('month').format("YYYY-MM-DD"), })
                }
                this.setState({ drawerFilter: drawerValue });
                break;
            default:
                return;
        }
    }
    validationData = (typeActive) => {
        if (typeActive?.typeView === "individual" && typeActive?.listId.length === 0) {
            return { mess: "Vui lòng chọn nhân viên", check: false };
        }
        return { check: true };
    }
    handleEqualObj = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    handleEqualArrays = (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
            return false;
        }
        const sortedArr1 = arr1.slice().sort();
        const sortedArr2 = arr2.slice().sort();
        for (let i = 0; i < sortedArr1.length; i++) {
            if (sortedArr1[i] !== sortedArr2[i]) {
                return false;
            }
        }
        return true;
    }
    handleGetDataReport = async (dataFilter, typeActive) => {
        const { getAllReportTargetStaff, getListReportTargetStaff } = this.props;
        if (typeActive?.typeView === "all") {
            await getAllReportTargetStaff(dataFilter);
        }
        if (typeActive?.typeView === "individual" || typeActive?.typeView === "shop") {
            await getListReportTargetStaff(dataFilter, typeActive?.listId);
        }
        this.openDrawer('filter', false);
        this.setState({ disabledAcceptFilter: false });
    }
    handleFilter = async (dataFilterNew, typeActiveNew) => {
        const { setDataFilterReportTarget, setTypeActiveReportTarget, dataFilter, typeActive } = this.props;
        const result = this.validationData(typeActiveNew);
        if (!result.check) {
            return message.error(result.mess);
        }
        this.setState({ disabledAcceptFilter: true });

        const equalFilter = this.handleEqualObj(dataFilterNew, dataFilter);
        const equalTypeTime = typeActiveNew.typeTime === typeActive.typeTime;
        const equalTypeView = typeActiveNew.typeView === typeActive.typeView;
        const equalListId = this.handleEqualArrays(typeActiveNew.listId, typeActive.listId);

        if (!equalFilter || !equalTypeTime || !equalTypeView || !equalListId) {
            await this.handleGetDataReport(dataFilterNew, typeActiveNew);
        } else {
            this.openDrawer('filter', false);
        }
        this.setState({ disabledAcceptFilter: false });
        setDataFilterReportTarget(dataFilterNew);
        setTypeActiveReportTarget(typeActiveNew);
    }
    render() {
        const { drawerFilter, disabledAcceptFilter } = this.state;
        const { dataReportTargetStaffs, isLoadingReportTargetStaff,
            typeActive, dataFilter, dataTargetStaffs
        } = this.props;
        const items = [
            {
                key: '1',
                label: (
                    // eslint-disable-next-line
                    <a onClick={() => exportTableAntdToExcel(columnRevenueOverViews(typeActive, dataFilter, this.props.history), dataReportTargetStaffs, dayjs().format("HH-mm/DD-MM-YYYY"))}>
                        Excel
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    // eslint-disable-next-line
                    <a onClick={() => exportTableAntdToImage('tableReportTargetStaff', dayjs().format("HH-mm/DD-MM-YYYY"))}>
                        Ảnh
                    </a>
                ),
            },
        ];
        return (
            <>
                <Spin size='large' spinning={isLoadingReportTargetStaff}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between space-x-[5px]'>
                            <Button
                                onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiFillFilter />
                                    Lọc
                                </Space>
                            </Button>
                            {typeActive?.typeTable === 'overview' &&
                                <Dropdown menu={{ items }} placement="bottomLeft">
                                    <Button className='bg-[#0e97ff] dark:bg-white'>
                                        <Space className='text-white dark:text-black'>
                                            <FaFileExport />
                                            Xuất file
                                        </Space>
                                    </Button>
                                </Dropdown>
                            }
                        </div>
                        {typeActive?.typeTable === 'detail' &&
                            <TableRevenueDetail typeActive={typeActive} dataFilter={dataFilter}
                                dataReportTargetStaffs={dataReportTargetStaffs} />
                        }
                        {typeActive?.typeTable === 'overview' &&
                            <div id='tableReportTargetStaff'
                                className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                <TableRevenueOverView typeActive={typeActive} dataFilter={dataFilter}
                                    dataReportTargetStaffs={dataReportTargetStaffs} />
                            </div>
                        }
                    </div>
                </Spin>
                {drawerFilter &&
                    < DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        handleFilter={this.handleFilter}
                        typeActive={typeActive}
                        dataStaffs={dataTargetStaffs}
                        disabledAcceptFilter={disabledAcceptFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataReportTargetStaffs: state.reportTarget.dataReportTargetStaffs,
        isLoadingReportTargetStaff: state.reportTarget.isLoading,
        dataFilter: state.reportTarget.dataFilterStaff,
        typeActive: state.reportTarget.typeActiveStaff,

        dataTargetStaffs: state.targetStaff.dataTargetStaffs,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListReportTargetStaff: (dataFilter, listId) => dispatch(actions.getListReportTargetStaffRedux(dataFilter, listId)),
        getAllReportTargetStaff: (dataFilter) => dispatch(actions.getAllReportTargetStaffRedux(dataFilter)),
        setDataFilterReportTarget: (data) => dispatch(actions.setDataFilterReportTargetStaffRedux(data)),
        setTypeActiveReportTarget: (data) => dispatch(actions.setTypeActiveReportTargetStaffRedux(data)),

        getListTargetStaff: (dataFilter) => dispatch(actions.getListTargetStaffRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));