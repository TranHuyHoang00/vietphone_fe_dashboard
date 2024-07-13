import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Space, Button, Dropdown, Spin, message } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa";
import dayjs from 'dayjs';
import DrawerFilter from './drawers/drawerFilter';
import { exportTableAntdToExcel, exportTableAntdToImage } from '@utils/handleFuncExport'
import TableRevenueDetail from './component/tableRevenueDetail';
import TableRevenueOverView from './component/tableRevenueOverView';
import { columnRevenueOverViews } from './component/columns';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerFilter: false,
        }
    }
    async componentDidMount() {
        const { getListProductCategory, dataFilter, typeActive } = this.props;
        await this.handleFilter(dataFilter, typeActive);
        await getListProductCategory({ page: 1, limit: 50 });
    }
    openDrawer = async (drawerName, drawerValue) => {
        const { getListShop } = this.props;
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                await getListShop({ page: 1, limit: 100, status: 'active' });
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
    handleFilter = async (dataFilter, typeActive) => {
        const result = this.validationData(typeActive);
        if (result.check) {
            const { setDataFilterReportTarget, setTypeActiveReportTarget } = this.props;
            setDataFilterReportTarget(dataFilter);
            setTypeActiveReportTarget(typeActive);
            if (typeActive?.typeView === "all") {
                const { getAllReportTargetShop } = this.props;
                await getAllReportTargetShop(dataFilter);
            }
            if (typeActive?.typeView === "individual") {
                const { getListReportTargetShop } = this.props;
                await getListReportTargetShop(dataFilter, typeActive?.listId);
            }
            this.openDrawer('filter', false);
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { drawerFilter } = this.state;
        const { isLoadingReportTargetShop, dataReportTargetShops, isLoadingShop, isLoadingProductCategory,
            dataShops, dataFilter, typeActive, dataProductCategorys } = this.props;

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
                <Spin size='large' spinning={isLoadingReportTargetShop || isLoadingShop || isLoadingProductCategory}>
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
                                dataReportTargetShops={dataReportTargetShops}
                                dataProductCategorys={dataProductCategorys} />
                        }
                        {typeActive?.typeTable === 'overview' &&
                            <div id="tableReportTargetShop" className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                <TableRevenueOverView typeActive={typeActive} dataFilter={dataFilter}
                                    dataReportTargetShops={dataReportTargetShops} />
                            </div>
                        }
                    </div>
                </Spin>
                {drawerFilter &&
                    < DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        handleFilter={this.handleFilter}
                        typeActive={typeActive}
                        dataShops={dataShops} />}
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

        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,

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

        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));