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
            dataStaffs: [],
        }
    }
    async componentDidMount() {
        const { getListProductCategory, dataFilter, typeActive } = this.props;
        await this.handleFilter(dataFilter, typeActive);
        await getListProductCategory({ page: 1, limit: 50 });
        this.setState({ dataStaffs: this.props.dataReportTargetStaffs });
    }
    openDrawer = async (drawerName, drawerValue) => {
        const { getListStaff } = this.props;
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                await getListStaff({ page: 1, limit: 100, status: 'active' });
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
    handleFilter = async (dataFilter, typeActive) => {
        const result = this.validationData(typeActive);
        if (result.check) {
            const { setDataFilterReportTarget, setTypeActiveReportTarget } = this.props;
            setDataFilterReportTarget(dataFilter);
            setTypeActiveReportTarget(typeActive);
            if (typeActive?.typeView === "all") {
                const { getAllReportTargetStaff } = this.props;
                await getAllReportTargetStaff(dataFilter);
            }
            if (typeActive?.typeView === "individual") {
                const { getListReportTargetStaff } = this.props;
                await getListReportTargetStaff(dataFilter, typeActive?.listId);
            }
            this.openDrawer('filter', false);
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { drawerFilter, dataStaffs } = this.state;
        const { isLoadingStaff, dataReportTargetStaffs, isLoadingReportTargetStaff,
            isLoadingProductCategory, typeActive, dataFilter, dataProductCategorys,
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
                <Spin size='large' spinning={isLoadingReportTargetStaff || isLoadingStaff || isLoadingProductCategory}>
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
                                dataReportTargetStaffs={dataReportTargetStaffs}
                                dataProductCategorys={dataProductCategorys} />
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
                        dataStaffs={dataStaffs} />}
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

        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,

        dataStaffs: state.staff.dataStaffs,
        isLoadingStaff: state.staff.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListReportTargetStaff: (dataFilter, listId) => dispatch(actions.getListReportTargetStaffRedux(dataFilter, listId)),
        getAllReportTargetStaff: (dataFilter) => dispatch(actions.getAllReportTargetStaffRedux(dataFilter)),
        setDataFilterReportTarget: (data) => dispatch(actions.setDataFilterReportTargetStaffRedux(data)),
        setTypeActiveReportTarget: (data) => dispatch(actions.setTypeActiveReportTargetStaffRedux(data)),

        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),
        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));