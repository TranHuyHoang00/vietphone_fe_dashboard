import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Space, Button, Dropdown, Spin, message } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa";
import dayjs from 'dayjs';
import DrawerFilter from './drawers/drawerFilter';
import ChartTarget from './component/chartTarget';
import { exportTableAntdToExcel, exportTableAntdToImage } from '@utils/handleFuncExport'
import TableRevenueDetail from './component/tableRevenueDetail';
import TableRevenueOverView from './component/tableRevenueOverView';
import { columnRevenueOverViews } from './component/columns';
import { FaChartSimple } from "react-icons/fa6";

class index extends Component {
    constructor(props) {
        super(props);
        this.chartTargetRef = createRef();
        this.state = {
            drawerFilter: false,
            openChart: false,
            disabledAcceptFilter: false,
        }
    }
    async componentDidMount() {
        const { dataFilter, dataReportTargetShops, getAllReportTargetShop } = this.props;
        if (dataReportTargetShops && dataReportTargetShops.length === 0) {
            await getAllReportTargetShop(dataFilter);
        } else {
            this.setState({ openChart: true, })
        }
    }
    openDrawer = async (drawerName, drawerValue) => {
        const { getListShop, dataShops } = this.props;
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                if (drawerValue && drawerValue === true && dataShops && dataShops.length === 0) {
                    await getListShop({ page: 1, limit: 100, status: 'active' });
                }
                break;
            default:
                return;
        }
    }
    validationData = (typeActive) => {
        if (typeActive?.typeView === "individual" && typeActive?.listId.length === 0) {
            return { mess: "Vui lòng chọn cửa hàng", check: false };
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
        const { getAllReportTargetShop, getListReportTargetShop } = this.props;
        if (typeActive?.typeView === "all") {
            await getAllReportTargetShop(dataFilter);
        }
        if (typeActive?.typeView === "individual") {
            await getListReportTargetShop(dataFilter, typeActive?.listId);
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
    // HIDE AND SCROLL TO CHART
    handleScrollChart = () => {
        if (!this.state.openChart) {
            this.setState({ openChart: true }, this.scrollToChart);
        } else {
            this.scrollToChart();
        }
    };
    scrollToChart = () => {
        setTimeout(() => {
            if (this.chartTargetRef.current) {
                this.chartTargetRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    };
    render() {
        const { drawerFilter, disabledAcceptFilter, openChart } = this.state;
        const { isLoadingReportTargetShop, dataReportTargetShops, isLoadingShop,
            dataShops, dataFilter, typeActive } = this.props;

        const items = [
            {
                key: '1',
                label: (
                    // eslint-disable-next-line
                    <a onClick={() => exportTableAntdToExcel(columnRevenueOverViews(typeActive, dataFilter, this.props.history), dataReportTargetShops, dayjs().format("HH-mm/DD-MM-YYYY"))}>
                        Excel
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    // eslint-disable-next-line
                    <a onClick={() => exportTableAntdToImage('tableReportTargetShop', dayjs().format("HH-mm/DD-MM-YYYY"))}>
                        Ảnh
                    </a>
                ),
            },
        ];
        return (
            <>
                <Spin size='large' spinning={isLoadingReportTargetShop || isLoadingShop}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between space-x-[5px]'>
                            <Space>
                                <Button
                                    onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiFillFilter />
                                        Lọc
                                    </Space>
                                </Button>
                                <Button onClick={() => this.handleScrollChart()}
                                    className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <FaChartSimple />
                                        Biểu đồ
                                    </Space>
                                </Button>
                            </Space>
                            {typeActive?.typeTable === "overview" &&
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
                            <div id="tableReportTargetShop">
                                <TableRevenueDetail typeActive={typeActive} dataFilter={dataFilter}
                                    dataReportTargetShops={dataReportTargetShops} />
                            </div>
                        }
                        {typeActive?.typeTable === 'overview' &&
                            <div id="tableReportTargetShop" className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                <TableRevenueOverView typeActive={typeActive} dataFilter={dataFilter}
                                    dataReportTargetShops={dataReportTargetShops} />
                            </div>
                        }
                        {openChart &&
                            <div id='chartTarget' ref={this.chartTargetRef}><ChartTarget /></div>
                        }
                    </div>
                </Spin>
                {drawerFilter &&
                    < DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        handleFilter={this.handleFilter}
                        typeActive={typeActive}
                        dataShops={dataShops}
                        disabledAcceptFilter={disabledAcceptFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataReportTargetShops: state.reportTarget.dataReportTargetShops,
        isLoadingReportTargetShop: state.reportTarget.isLoading,
        dataFilter: state.reportTarget.dataFilterShop,
        typeActive: state.reportTarget.typeActiveShop,

        dataShops: state.shop.dataShops,
        isLoadingShop: state.shop.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListReportTargetShop: (dataFilter, listId) => dispatch(actions.getListReportTargetShopRedux(dataFilter, listId)),
        getAllReportTargetShop: (dataFilter) => dispatch(actions.getAllReportTargetShopRedux(dataFilter)),
        setDataFilterReportTarget: (data) => dispatch(actions.setDataFilterReportTargetShopRedux(data)),
        setTypeActiveReportTarget: (data) => dispatch(actions.setTypeActiveReportTargetShopRedux(data)),

        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));