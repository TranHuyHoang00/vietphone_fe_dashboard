import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Button,
    Spin, Typography, message,
    Divider,
} from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { formatNumber } from '@utils/handleFuncFormat';
import dayjs from 'dayjs';
import DrawerFilter from './drawers/drawerFilter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerFilter: false,
            dataFilter: {
                start_time: dayjs().startOf('month').format("YYYY-MM-DD HH:mm:ss"),
                end_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            },
            typeActive: {
                typeTable: 'overview',
                typeTime: 'month',
                typeView: 'all',
                listId: [],
            },
            classTrue: "text-green-600 font-medium line-clamp-1",
            classFalse: "text-red-600 font-medium line-clamp-1",
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListProductCategory, getListStaff, getAllReportTargetStaff } = this.props;
        await getAllReportTargetStaff(dataFilter);
        await getListProductCategory({ page: 1, limit: 50 });
        await getListStaff({ page: 1, limit: 100, status: 'active' });
    }
    openDrawer = async (drawerName, drawerValue) => {
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                break;
            default:
                return;
        }
    }
    renderColumDetail = (datas, columnName) => {
        const { dataProductCategorys } = this.props;
        const { classTrue, classFalse } = this.state;
        const newDataPCs = dataProductCategorys.map((product) => {
            const saleProduct = datas?.revenue?.product_sales.find((sale) => sale.category === product.name);
            const targetProduct = datas?.target_product_category.find((target) => target?.product_category?.name === product.name);
            const dailyProduct = datas?.daily?.product_sales.find((daily) => daily.category === product.name);
            return {
                ...product,
                sale: saleProduct ? saleProduct : { quantity: 0, revenue: 0 },
                target: targetProduct ? targetProduct : { quantity: 0, value: 0 },
                daily: dailyProduct ? dailyProduct : { quantity: 0, revenue: 0 },
            };
        });
        const displayValue = (value, unit) => {
            if (value > 0) {
                return <span className={classTrue}>{formatNumber(value)} {unit}</span>;
            } else if (value < 0) {
                return <span className={classFalse}>{formatNumber(value)} {unit}</span>;
            } else {
                return <span>-</span>;
            }
        };
        const displayValueProviso = (proviso, value, unit) => {
            if (proviso === 0 || proviso === "0.00" || proviso === "") {
                return <span>-</span>;
            } else {
                if (value >= 0) {
                    return <span className={classTrue}>{formatNumber(value)} {unit}</span>;
                }
                if (value < 0) { return <span className={classFalse}>{formatNumber(value)} {unit}</span>; }
            }
        };
        const displayStatusProviso = (proviso, value) => {
            if (proviso === 0 || proviso === "0.00" || proviso === "") {
                return <span>-</span>;
            } else {
                if (value >= 0) {
                    return <span className={classTrue}>Đạt</span>;
                }
                if (value < 0) { return <span className={classFalse}>Chưa</span>; }
            }
        };
        if (columnName === 'namePC') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='border px-[2px] py-[2px]' key={index}>
                    <span className='line-clamp-1'>{item?.name}</span>
                </div>
            ));
        }
        if (columnName === 'targetMonth') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[2px] py-[2px] w-1/3'>
                        {item?.target?.quantity > 0 ?
                            <span className={classTrue}>
                                {item?.target?.quantity} cái
                            </span> : <span>-</span>
                        }
                    </div>
                    <div className='border px-[2px] py-[2px] w-2/3'>
                        {item?.target?.value > 0 ?
                            <span className={classTrue}>
                                {formatNumber(item?.target?.value)} đ
                            </span> : <span>-</span>
                        }
                    </div>
                </div>
            ));
        }
        if (columnName === 'achievedMonth') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[2px] py-[2px] w-1/3'>
                        {displayValue(item?.sale?.quantity, 'cái')}
                    </div>
                    <div className='border px-[2px] py-[2px] w-2/3 '>
                        {displayValue(item?.sale?.revenue, 'đ')}
                    </div>
                </div>
            ));
        }
        if (columnName === 'remainingMonth') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[2px] py-[2px] w-1/3'>
                        {displayValueProviso(item?.target?.quantity, item?.sale?.quantity - item?.target?.quantity, 'cái')}
                    </div>
                    <div className='border px-[2px] py-[2px] w-2/3'>
                        {displayValueProviso(item?.target?.value, item?.sale?.revenue - item?.target?.value, 'đ')}
                    </div>
                </div>
            ));
        }
        if (columnName === 'statusMonth') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[2px] py-[2px] w-1/2'>
                        {displayStatusProviso(item?.target?.quantity, item?.sale?.quantity - item?.target?.quantity)}
                    </div>
                    <div className='border px-[2px] py-[2px] w-1/2'>
                        {displayStatusProviso(item?.target?.value, item?.sale?.revenue - item?.target?.value)}
                    </div>
                </div>
            ));
        }
        if (columnName === 'rewardMonth') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='border px-[2px] py-[2px]' key={index}>
                    {item?.target?.quantity === 0 ? <span>-</span> :
                        <>
                            {(item?.sale?.quantity - item?.target?.quantity >= 0) &&
                                <span className="text-green-600 font-medium line-clamp-1">+ 100,000 đ</span>}
                            {(item?.sale?.quantity - item?.target?.quantity < 0) &&
                                <span>-</span>}
                        </>
                    }
                </div>
            ));
        }
        if (columnName === 'dailyDate') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[2px] py-[2px] w-1/3'>
                        {displayValue(item?.daily?.quantity, 'cái')}
                    </div>
                    <div className='border px-[2px] py-[2px] w-2/3'>
                        {displayValue(item?.daily?.revenue, 'đ')}
                    </div>
                </div>
            ));
        }
    }
    validationData = (data) => {
        return { check: true };
    }
    handleFilter = async (dataFilter, typeActive) => {
        const result = this.validationData(dataFilter);
        if (result.check) {
            this.setState({ dataFilter: dataFilter, typeActive: typeActive });
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
    getTargetDate = (end_time, targetMonth, targetAchieved) => {
        const targetRemaining = targetMonth - targetAchieved;
        const remainingDays = dayjs(end_time).daysInMonth() - dayjs(end_time).date();
        if (remainingDays === 0) {
            return targetRemaining / 1;
        } else {
            return targetRemaining / remainingDays;
        }
    }
    render() {
        const { dataFilter, drawerFilter, typeActive } = this.state;
        const { Text } = Typography;
        const { isLoading, dataReportTargetStaffs, dataStaffs } = this.props;
        const columnDetails = [
            {
                title: `${typeActive?.typeTime === 'month' ?
                    `CHI TIẾT DT THÁNG ${dayjs(dataFilter?.start_time).format('MM-YYYY')}` :
                    `CHI TIẾT DT TỪ ${dayjs(dataFilter?.start_time).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`}`,
                children: [
                    {
                        title: "TÊN LOẠI", width: 250,
                        render: (datas) => <>{this.renderColumDetail(datas, 'namePC')}</>
                    },
                    {
                        title: "TARGET", width: 200,
                        render: (datas) => <>{this.renderColumDetail(datas, 'targetMonth')}</>
                    },
                    {
                        title: "THỰC ĐẠT", width: 200,
                        render: (datas) => <>{this.renderColumDetail(datas, 'achievedMonth')}</>
                    },
                    {
                        title: "CÒN LẠI", width: 200,
                        render: (datas) => <>{this.renderColumDetail(datas, 'remainingMonth')}</>
                    },
                    {
                        title: "ĐẠT/CHƯA", width: 150,
                        render: (datas) => <>{this.renderColumDetail(datas, 'statusMonth')}</>
                    },
                    {
                        title: "THƯỞNG", width: 150,
                        render: (datas) => <>{this.renderColumDetail(datas, 'rewardMonth')}</>
                    },
                ]
            },
            {
                title: `CTDT NGÀY ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`, children: [
                    {
                        title: "THỰC ĐẠT", width: 200,
                        render: (datas) => <>{this.renderColumDetail(datas, 'dailyDate')}</>
                    }
                ]
            }

        ];
        const columnOverViewDetails = [

            {
                title: `${typeActive?.typeTime === 'month' ?
                    `TỔNG DOANH THU THÁNG ${dayjs(dataFilter?.start_time).format('MM-YYYY')}` :
                    `TỔNG DOANH THU TỪ ${dayjs(dataFilter?.start_time).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`}`,
                children: [
                    {
                        title: 'NHÂN VIÊN', dataIndex: ['staff', 'name'],
                        render: (value) => {
                            return {
                                children: <Text strong className='text-[#0574b8] dark:text-white uppercase'>{value}</Text>,
                                __style__: { color: '0574b8' }, bold: true,
                            };
                        },
                        sorter: (a, b) => a?.staff?.name.localeCompare(b?.staff?.name),
                    },
                    {
                        title: 'TARGET', dataIndex: ['value'],
                        render: (value) => {
                            return { children: <Text >{formatNumber(value)}</Text> }
                        },
                        sorter: (a, b) => a?.value - b?.value,
                    },
                    {
                        title: `NGÀY ${dayjs(dataFilter?.start_time).format('DD')} TỚI ${dayjs(dataFilter?.end_time).format('DD')}`,
                        dataIndex: ['revenue', 'total_revenue'],
                        render: (value) => {
                            return { children: <Text >{formatNumber(value)}</Text> }
                        },
                        sorter: (a, b) => a?.revenue?.total_revenue - b?.revenue?.total_revenue,
                    },
                    {
                        title: `CÒN LẠI`, dataIndex: ['revenue', 'total_revenue'],
                        render: (value, item) => {
                            const remainingRevenue = item?.value - item?.revenue?.total_revenue;
                            if (remainingRevenue > 0) {
                                return {
                                    children: <Text strong className='text-red-500'>{`-${formatNumber(remainingRevenue)}`}</Text>,
                                    __style__: { color: 'eb2315' },
                                }
                            } else {
                                return {
                                    children: <Text strong className='text-green-500'>{`+${formatNumber(Math.abs(remainingRevenue))}`}</Text>,
                                    __style__: { color: '22c55e' },
                                }
                            }
                        },
                        sorter: (a, b) => (a?.value - a?.revenue?.total_revenue) - (b?.value - b?.revenue?.total_revenue),
                    },
                    {
                        title: 'ĐẠT', dataIndex: ['revenue', 'total_revenue'],
                        render: (value, item) => {
                            const remainingRevenue = item?.value - item?.revenue?.total_revenue;
                            if (remainingRevenue > 0) {
                                return {
                                    children: <Text strong className='text-red-500'>{`CHƯA`}</Text>,
                                    __style__: { color: 'eb2315' },
                                }
                            } else {
                                return {
                                    children: <Text strong className='text-green-500'>{`ĐẠT`}</Text>,
                                    __style__: { color: '22c55e' },
                                }
                            }
                        },
                    },
                ]
            },
            {
                title: `DOANH THU NGÀY ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`, children: [
                    {
                        title: `TARGET NGÀY`, dataIndex: ['revenue', 'total_revenue'],
                        render: (value, item) => {
                            const remainingRevenue = item?.value - item?.revenue?.total_revenue;
                            if (remainingRevenue > 0) {
                                return {
                                    children: <Text>{`${formatNumber(this.getTargetDate(dataFilter?.end_time, item?.value, item?.revenue?.total_revenue))}`}</Text>
                                }
                            } else {
                                return { children: <Text>0</Text> }
                            }
                        },
                        sorter: (a, b) => (this.getTargetDate(dataFilter?.end_time, a?.value, a?.revenue?.total_revenue)) - (this.getTargetDate(dataFilter?.end_time, b?.value, b?.revenue?.total_revenue)),
                    },
                    {
                        title: `THỰC ĐẠT`, dataIndex: ['daily', 'total_revenue'],
                        render: (value) => {
                            return { children: <Text >{formatNumber(value)}</Text> }
                        },
                        sorter: (a, b) => a?.daily?.total_revenue - b?.daily?.total_revenue,
                    },
                    {
                        title: `CÒN LẠI`, dataIndex: ['daily', 'total_revenue'],
                        render: (value, item) => {
                            const remainingRevenue = item?.value - item?.revenue?.total_revenue;
                            if (remainingRevenue > 0) {
                                const remainingDaily = (this.getTargetDate(dataFilter?.end_time, item?.value, item?.revenue?.total_revenue) - item?.daily?.total_revenue);
                                if (remainingDaily > 0) {
                                    return {
                                        children: <Text strong className='text-red-500'>{`-${formatNumber(remainingDaily)}`}</Text>,
                                        __style__: { color: 'eb2315' },
                                    }
                                } else {
                                    return {
                                        children: <Text strong className='text-green-500'>{`+${formatNumber(Math.abs(remainingDaily))}`}</Text>,
                                        __style__: { color: '22c55e' },
                                    }
                                }
                            } else {
                                return { children: <Text>0</Text> }
                            }
                        },
                        sorter: (a, b) => (this.getTargetDate(dataFilter?.end_time, a?.value, a?.revenue?.total_revenue) - a?.daily?.total_revenue) - (this.getTargetDate(dataFilter?.end_time, b?.value, b?.revenue?.total_revenue) - b?.daily?.total_revenue),
                    },
                    {
                        title: 'ĐẠT', dataIndex: ['daily', 'total_revenue'],
                        render: (value, item) => {
                            const remainingRevenue = item?.value - item?.revenue?.total_revenue;
                            if (remainingRevenue > 0) {
                                const remainingDaily = (this.getTargetDate(dataFilter?.end_time, item?.value, item?.revenue?.total_revenue) - item?.daily?.total_revenue);
                                if (remainingDaily > 0) {
                                    return {
                                        children: <Text strong className='text-red-500'>{`CHƯA`}</Text>,
                                        __style__: { color: 'eb2315' },
                                    }
                                } else {
                                    return {
                                        children: <Text strong className='text-green-500'>{`ĐẠT`}</Text>,
                                        __style__: { color: '22c55e' },
                                    }
                                }
                            } else {
                                return {
                                    children: <Text strong className='text-green-500'>{`ĐẠT`}</Text>,
                                    __style__: { color: '22c55e' },
                                }
                            }
                        },
                    },
                ]
            }
        ];
        const calculateSummary = (datas) => {
            let totalTargetMoney = 0;
            let totalAchievedMoney = 0;
            let totalTargetMoneyDate = 0;
            let totalDailyMoney = 0;
            datas.forEach(({ value, revenue, daily }) => {
                totalTargetMoney += parseFloat(value);
                totalAchievedMoney += parseFloat(revenue?.total_revenue);
                totalDailyMoney += parseFloat(daily?.total_revenue);
            });
            totalTargetMoneyDate = this.getTargetDate(dataFilter?.end_time, totalTargetMoney - totalAchievedMoney, 0);
            return (
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                        <Text strong>TỔNG</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                        <Text strong>{formatNumber(totalTargetMoney)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                        <Text strong>{formatNumber(totalAchievedMoney)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                        {(totalTargetMoney - totalAchievedMoney) > 0 ?
                            <Text className='text-red-500' strong>{`-${formatNumber(totalTargetMoney - totalAchievedMoney)}`}</Text>
                            :
                            <Text className='text-green-500' strong>{`+${formatNumber(Math.abs(totalTargetMoney - totalAchievedMoney))}`}</Text>
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                        {(totalTargetMoney - totalAchievedMoney) > 0 ?
                            <Text className='text-red-500' strong>CHƯA</Text>
                            :
                            <Text className='text-green-500' strong>ĐẠT</Text>
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                        <Text strong>{formatNumber(totalTargetMoneyDate)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6}>
                        <Text strong>{formatNumber(totalDailyMoney)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={7}>
                        {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
                            <Text className='text-red-500' strong>{`-${formatNumber(totalTargetMoneyDate - totalDailyMoney)}`}</Text>
                            :
                            <Text className='text-green-500' strong>{`+${formatNumber(Math.abs(totalTargetMoneyDate - totalDailyMoney))}`}</Text>
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={8}>
                        {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
                            <Text className='text-red-500' strong>CHƯA</Text>
                            :
                            <Text className='text-green-500' strong>ĐẠT</Text>
                        }
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            );
        }
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between space-x-[5px]'>
                            <Button
                                onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiFillFilter />
                                    Lọc
                                </Space>
                            </Button>
                        </div>
                        {typeActive?.typeTable === 'detail' &&
                            <div className='space-y-[10px]'>
                                {dataReportTargetStaffs && dataReportTargetStaffs.map((item, index) => {
                                    return (
                                        <div className='space-y-[5px] bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                            <Divider>
                                                <Text strong >NHÂN VIÊN
                                                    : <Text className='text-[#0574b8] dark:text-white uppercase'>{item?.staff?.name}</Text>
                                                </Text>
                                            </Divider>
                                            <Table rowKey="id"
                                                columns={columnOverViewDetails} dataSource={[item]}
                                                pagination={false}
                                                size="small" bordered scroll={{ x: 1000 }} />
                                            <Table rowKey="id"
                                                columns={columnDetails} dataSource={[item]}
                                                pagination={false}
                                                size="small" bordered scroll={{ x: 1350 }} />
                                        </div>
                                    )
                                })}
                            </div>

                        }
                        {typeActive?.typeTable === 'overview' &&
                            <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                <Table rowKey="id"
                                    columns={columnOverViewDetails} dataSource={dataReportTargetStaffs}
                                    pagination={false}
                                    size="small" bordered scroll={{ x: 1000 }}
                                    summary={calculateSummary} />
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
        dataReportTargetStaff: state.reportTarget.dataReportTargetStaff,
        dataMeta: state.reportTarget.dataMeta,
        isLoading: state.reportTarget.isLoading,
        isResult: state.reportTarget.isResult,

        dataProductCategorys: state.productCategory.dataProductCategorys,

        dataStaffs: state.staff.dataStaffs,
        isLoadingStaff: state.staff.isLoading,
        isResultStaff: state.staff.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),

        getListReportTargetStaff: (dataFilter, listId) => dispatch(actions.getListReportTargetStaffRedux(dataFilter, listId)),
        getDataReportTargetStaff: (id) => dispatch(actions.getDataReportTargetStaffRedux(id)),

        getAllReportTargetStaff: (dataFilter) => dispatch(actions.getAllReportTargetStaffRedux(dataFilter)),

        setDataReportTarget: (id) => dispatch(actions.setDataReportTargetRedux(id)),

        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));