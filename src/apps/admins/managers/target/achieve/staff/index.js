import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Button, Dropdown,
    Spin, Typography, message,
    Divider,
} from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa";
import { formatNumber } from '@utils/handleFuncFormat';
import dayjs from 'dayjs';
import DrawerFilter from './drawers/drawerFilter';
import { exportTableAntdToExcel, exportTableAntdToImage } from '@utils/handleFuncExport';
import { calculateSalary } from '@utils/handleFuncCalculator';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerFilter: false,
            dataFilter: {
                start: dayjs().startOf('month').format("YYYY-MM-DD HH:mm:ss"),
                end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            },
            typeActive: {
                typeTable: 'overview',
                typeTime: 'month',
                typeView: 'all',
                listId: [],
            },
            classTrue: "text-green-600 font-medium line-clamp-1",
            classFalse: "text-red-600 font-medium line-clamp-1",

            dataStaffs: [],
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListProductCategory, getAllReportTargetStaff } = this.props;
        await getAllReportTargetStaff(dataFilter);
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
    getTargetDate = (end, targetMonth, targetAchieved) => {
        const targetRemaining = targetMonth - targetAchieved;
        const remainingDays = dayjs(end).daysInMonth() - dayjs(end).date();
        if (remainingDays === 0) {
            return targetRemaining / 1;
        } else {
            return targetRemaining / remainingDays;
        }
    }

    // RENDER COLUMNS TABLE
    getDataTableRevenueDetail = (datas, columnName) => {
        const { dataProductCategorys } = this.props;
        const { classTrue, classFalse } = this.state;
        const newDataPCs = dataProductCategorys.map((productCategory) => {
            const revenueMonth = datas?.revenueShopMonth?.product_sales ?? datas?.revenue?.product_sales;
            const revenueDaily = datas?.revenueShopDaily?.product_sales ?? datas?.daily?.product_sales;

            let dailyProduct = { quantity: 0, revenue: 0 };
            let saleProduct = { quantity: 0, revenue: 0 };

            if (revenueDaily) { dailyProduct = revenueDaily.find((daily) => daily.category_name === productCategory.name); }
            if (revenueMonth) { saleProduct = revenueMonth.find((sale) => sale.category_name === productCategory.name); }

            return {
                ...productCategory,
                sale: saleProduct ? saleProduct : { quantity: 0, revenue: 0 },
                daily: dailyProduct ? dailyProduct : { quantity: 0, revenue: 0 },
            };
        });
        const displayValue = (value, unit) => {
            if (value === 0) { return <span>-</span>; }
            const className = value > 0 ? classTrue : classFalse;
            return <span className={className}>{formatNumber(value)} {unit}</span>;
        };
        if (columnName === 'nameProductCategory') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='border px-[5px] py-[2px]' key={index}>
                    <span className='line-clamp-1'>{item?.name}</span>
                </div>
            ));
        }
        if (columnName === 'revenueMonth') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[5px] py-[2px] w-1/3'>
                        {displayValue(item?.sale?.quantity, 'cái')}
                    </div>
                    <div className='border px-[5px] py-[2px] w-2/3 '>
                        {displayValue(item?.sale?.revenue, 'đ')}
                    </div>
                </div>
            ));
        }
        if (columnName === 'revenueDaily') {
            return newDataPCs && newDataPCs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[5px] py-[2px] w-1/3'>
                        {displayValue(item?.daily?.quantity, 'cái')}
                    </div>
                    <div className='border px-[5px] py-[2px] w-2/3'>
                        {displayValue(item?.daily?.revenue, 'đ')}
                    </div>
                </div>
            ));
        }
    }
    getDataTableKPIDetail = (datas, columnName) => {
        const { classTrue, classFalse } = this.state;
        const newDataPCTs = datas?.staff_monthly_target?.target_product_category;
        const displayValue = (value, unit) => {
            if (value === 0) { return <span>-</span>; }
            const className = value > 0 ? classTrue : classFalse;
            return <span className={className}>{formatNumber(value)} {unit}</span>;
        };
        const displayValueProviso = (proviso, value, unit) => {
            if (proviso === 0 || proviso === "0.00" || proviso === "") {
                return <span>-</span>;
            }

            const className = value >= 0 ? classTrue : classFalse;
            return <span className={className}>{formatNumber(value)} {unit}</span>;
        };
        const displayStatusProviso = (proviso, value) => {
            if (proviso === 0 || proviso === "0.00" || proviso === "") {
                return <span>-</span>;
            }
            const statusText = value >= 0 ? "ĐẠT" : "CHƯA";
            const className = value >= 0 ? classTrue : classFalse;

            return <span className={className}>{statusText}</span>;
        };
        if (columnName === 'nameProductCategoryTarget') {
            return newDataPCTs && newDataPCTs.map((item, index) => (
                <div className='border px-[5px] py-[2px]' key={index}>
                    <span className='line-clamp-1'>{item?.target_product_category?.name}</span>
                </div>
            ));
        }
        if (columnName === 'targetMonth') {
            return newDataPCTs && newDataPCTs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[5px] py-[2px] w-1/3'>
                        {item?.quantity > 0 ?
                            <span className={classTrue}>
                                {item?.quantity} cái
                            </span> : <span>-</span>
                        }
                    </div>
                    <div className='border px-[5px] py-[2px] w-2/3'>
                        {item?.value > 0 ?
                            <span className={classTrue}>
                                {formatNumber(item?.value)} đ
                            </span> : <span>-</span>
                        }
                    </div>
                </div>
            ));
        }
        if (columnName === 'revenueMonth') {
            return newDataPCTs && newDataPCTs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[5px] py-[2px] w-1/3'>
                        {displayValue(item?.actual_achieved?.quantity, 'cái')}
                    </div>
                    <div className='border px-[5px] py-[2px] w-2/3 '>
                        {displayValue(item?.actual_achieved?.revenue, 'đ')}
                    </div>
                </div>
            ));
        }
        if (columnName === 'remainingMonth') {
            return newDataPCTs && newDataPCTs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[5px] py-[2px] w-1/3'>
                        {displayValueProviso(item?.quantity, item?.actual_achieved?.quantity - item?.quantity, 'cái')}
                    </div>
                    <div className='border px-[5px] py-[2px] w-2/3'>
                        {displayValueProviso(item?.value, item?.actual_achieved?.revenue - item?.value, 'đ')}
                    </div>
                </div>
            ));
        }
        if (columnName === 'statusMonth') {
            return newDataPCTs && newDataPCTs.map((item, index) => (
                <div className='flex items-center justify-between' key={index}>
                    <div className='border px-[5px] py-[2px] w-1/2'>
                        {displayStatusProviso(item?.quantity, item?.actual_achieved?.quantity - item?.quantity)}
                    </div>
                    <div className='border px-[5px] py-[2px] w-1/2'>
                        {displayStatusProviso(item?.value, item?.actual_achieved?.revenue - item?.value)}
                    </div>
                </div>
            ));
        }
        if (columnName === 'rewardMonth') {
            const dataRewards = calculateSalary(datas, 'kpi');
            const dataRewardKPIs = dataRewards?.dataRewardKPIs;
            if (dataRewardKPIs && dataRewardKPIs.length !== 0) {
                return newDataPCTs && newDataPCTs.map((item, index) => {
                    const itemSelected = dataRewardKPIs.find((rewardKPI) => rewardKPI?.code === item?.target_product_category?.code);
                    return (
                        <div key={index} className='border px-[5px] py-[2px]'>
                            {itemSelected === undefined ?
                                <span>-</span>
                                :
                                <>
                                    {itemSelected?.rewardKPI === 0 ?
                                        <span >-</span>
                                        :
                                        <span className={classTrue}>{formatNumber(itemSelected?.rewardKPI)} đ</span>
                                    }
                                </>
                            }
                        </div>
                    );
                });
            } else {
                return <span>-</span>;
            }
        }
    }
    getDataTableSalaryOverView = (datas, columnName) => {
        const dataRewards = calculateSalary(datas, 'all');
        if (columnName === 'salaryBasic') {
            const dataSalarys = dataRewards?.dataSalarys;
            const salaryBasic = dataSalarys.find(item => item?.code === "LCB")
            return `${salaryBasic ? formatNumber(salaryBasic?.value) : 0}`;
        }
        if (columnName === 'salarySubsidy') {
            const dataSalarys = dataRewards?.dataSalarys;
            const salarySubsidy = dataSalarys.find(item => item?.code === "PC")
            return `${salarySubsidy ? formatNumber(salarySubsidy?.value) : 0}`;
        }
        if (columnName === 'rewardKPI') {
            const dataRewardKPIs = dataRewards?.dataRewardKPIs ?? [];
            const totalRewardKPI = dataRewardKPIs.reduce((a, b) => a + b.rewardKPI, 0);
            return `${formatNumber(totalRewardKPI)}`;
        }
        if (columnName === 'rewardTarget') {
            const dataRewardTarget = dataRewards?.dataRewardTarget;
            return `${dataRewardTarget ? formatNumber(dataRewardTarget) : 0}`;
        }
        if (columnName === 'salaryTotal') {
            const totalRewardKPI = dataRewards?.dataRewardKPIs?.reduce((a, b) => a + b.rewardKPI, 0) ?? 0;
            const totalRewardSalary = dataRewards?.dataSalarys?.reduce((a, b) => a + b.value, 0) ?? 0;
            const totalRewardTarget = dataRewards?.dataRewardTarget ?? 0;
            const totalSalary = totalRewardKPI + totalRewardSalary + totalRewardTarget;
            return `${formatNumber(totalSalary)}`;
        }
    }
    getDataTableRevenueOverView = (datas, columnName) => {
        if (columnName === "revenueMonth") {
            const revenueShopMonth = datas?.revenueShopMonth;
            return revenueShopMonth?.total_revenue ?? datas?.revenue?.total_revenue;
        }
        if (columnName === "revenueDaily") {
            const revenueShopDaily = datas?.revenueShopDaily;
            return revenueShopDaily?.total_revenue ?? datas?.daily?.total_revenue;
        }
    }
    render() {
        const { dataFilter, drawerFilter, typeActive, dataStaffs } = this.state;
        const { Text } = Typography;
        const { isLoading, dataReportTargetStaffs } = this.props;
        const columnRevenueDetails = [
            {
                title: `${typeActive?.typeTime === 'month' ?
                    `CHI TIẾT DOANH THU THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
                    `CHI TIẾT DT TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
                children: [
                    {
                        title: "TÊN LOẠI", width: 250,
                        render: (datas) => <>{this.getDataTableRevenueDetail(datas, 'nameProductCategory')}</>
                    },
                    {
                        title: "THỰC ĐẠT", width: 200,
                        render: (datas) => <>{this.getDataTableRevenueDetail(datas, 'revenueMonth')}</>
                    },
                ]
            },
            {
                title: `CHI TIẾT DOANH THU NGÀY ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`, children: [
                    {
                        title: "THỰC ĐẠT", width: 200,
                        render: (datas) => <>{this.getDataTableRevenueDetail(datas, 'revenueDaily')}</>
                    }
                ]
            }

        ];
        const columnRevenueOverViews = [
            {
                title: `${typeActive?.typeTime === 'month' ?
                    `TỔNG DOANH THU THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
                    `TỔNG DOANH THU TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
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
                        title: 'TARGET', dataIndex: ['staff_monthly_target', 'value'],
                        render: (value) => {
                            return { children: <Text >{formatNumber(value)}</Text> }
                        },
                        sorter: (a, b) => a?.staff_monthly_target?.value - b?.staff_monthly_target?.value,
                    },
                    {
                        title: `NGÀY ${dayjs(dataFilter?.start).format('DD')} TỚI ${dayjs(dataFilter?.end).format('DD')}`,
                        dataIndex: 'revenue',
                        render: (value, datas) => {
                            const revenueMonth = this.getDataTableRevenueOverView(datas, 'revenueMonth');
                            return { children: <Text >{formatNumber(revenueMonth)}</Text> }
                        },
                        sorter: (a, b) => this.getDataTableRevenueOverView(a, 'revenueMonth') - this.getDataTableRevenueOverView(b, 'revenueMonth'),
                    },
                    {
                        title: `CÒN LẠI`, dataIndex: ['staff_monthly_target', 'value'],
                        render: (value, datas) => {
                            const revenueMonth = this.getDataTableRevenueOverView(datas, 'revenueMonth');
                            const remainingRevenue = value - revenueMonth;
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
                        sorter: (a, b) => (a?.staff_monthly_target?.value - this.getDataTableRevenueOverView(a, 'revenueMonth')) - (b?.staff_monthly_target?.value - this.getDataTableRevenueOverView(b, 'revenueMonth')),
                    },
                    {
                        title: 'ĐẠT', dataIndex: ['staff_monthly_target', 'value'],
                        render: (value, datas) => {
                            const revenueMonth = this.getDataTableRevenueOverView(datas, 'revenueMonth');
                            const remainingRevenue = value - revenueMonth;
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
                    {
                        title: `TARGET NGÀY`, dataIndex: ['staff_monthly_target', 'value'],
                        render: (value, datas) => {
                            const revenueMonth = this.getDataTableRevenueOverView(datas, 'revenueMonth');
                            const remainingRevenue = value - revenueMonth;
                            if (remainingRevenue > 0) {
                                return {
                                    children: <Text>{`${formatNumber(this.getTargetDate(dataFilter?.end, value, revenueMonth))}`}</Text>
                                }
                            } else {
                                return { children: <Text>0</Text> }
                            }
                        },
                        sorter: (a, b) => (this.getTargetDate(dataFilter?.end, a?.staff_monthly_target?.value, this.getDataTableRevenueOverView(a, 'revenueMonth'))) - (this.getTargetDate(dataFilter?.end, b?.staff_monthly_target?.value, this.getDataTableRevenueOverView(a, 'revenueMonth'))),
                    },
                ]
            },
            {
                title: `DOANH THU NGÀY ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`, children: [
                    {
                        title: `THỰC ĐẠT`,
                        dataIndex: 'revenue',
                        render: (value, datas) => {
                            const revenueDaily = this.getDataTableRevenueOverView(datas, 'revenueDaily');
                            return { children: <Text >{formatNumber(revenueDaily)}</Text> }
                        },
                        sorter: (a, b) => this.getDataTableRevenueOverView(a, 'revenueDaily') - this.getDataTableRevenueOverView(b, 'revenueDaily'),
                    },
                    {
                        title: `CÒN LẠI`, dataIndex: ['staff_monthly_target', 'value'],
                        render: (value, datas) => {
                            const revenueMonth = this.getDataTableRevenueOverView(datas, 'revenueMonth');
                            const remainingRevenue = value - revenueMonth;
                            const revenueDaily = this.getDataTableRevenueOverView(datas, 'revenueDaily');
                            if (remainingRevenue > 0) {
                                const remainingDaily = (this.getTargetDate(dataFilter?.end, value, revenueMonth) - revenueDaily);
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
                        sorter: (a, b) => (this.getTargetDate(dataFilter?.end, a?.staff_monthly_target?.value, this.getDataTableRevenueOverView(a, 'revenueMonth')) - this.getDataTableRevenueOverView(a, 'revenueDaily')) - (this.getTargetDate(dataFilter?.end, b?.staff_monthly_target?.value, this.getDataTableRevenueOverView(b, 'revenueMonth')) - this.getDataTableRevenueOverView(b, 'revenueDaily')),
                    },
                    {
                        title: 'ĐẠT',
                        dataIndex: ['staff_monthly_target', 'value'],
                        render: (value, datas) => {
                            const revenueMonth = this.getDataTableRevenueOverView(datas, 'revenueMonth');
                            const remainingRevenue = value - revenueMonth;
                            const revenueDaily = this.getDataTableRevenueOverView(datas, 'revenueDaily');
                            if (remainingRevenue > 0) {
                                const remainingDaily = (this.getTargetDate(dataFilter?.end, value, revenueMonth) - revenueDaily);
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
        const columnKPIDetails = [
            {
                title: `${typeActive?.typeTime === 'month' ?
                    `CHI TIẾT KPI THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
                    `CHI TIẾT KPI TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
                children: [
                    {
                        title: 'TÊN LOẠI', width: 250,
                        render: (datas) => <>{this.getDataTableKPIDetail(datas, 'nameProductCategoryTarget')}</>
                    },
                    {
                        title: "TARGET THÁNG", width: 200,
                        render: (datas) => <>{this.getDataTableKPIDetail(datas, 'targetMonth')}</>
                    },
                    {
                        title: "THỰC ĐẠT", width: 200,
                        render: (datas) => <>{this.getDataTableKPIDetail(datas, 'revenueMonth')}</>
                    },
                    {
                        title: "CÒN LẠI", width: 200,
                        render: (datas) => <>{this.getDataTableKPIDetail(datas, 'remainingMonth')}</>
                    },
                    {
                        title: "ĐẠT", width: 200,
                        render: (datas) => <>{this.getDataTableKPIDetail(datas, 'statusMonth')}</>
                    },
                    {
                        title: "THƯỞNG", width: 200,
                        render: (datas) => <>{this.getDataTableKPIDetail(datas, 'rewardMonth')}</>
                    }
                ]
            }
        ]
        const columnSalaryOverviews = [
            {
                title: `${typeActive?.typeTime === 'month' ?
                    `TỔNG QUAN BẢNG LƯƠNG THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
                    `TỔNG QUAN BẢNG LƯƠNG TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
                children: [
                    {
                        title: 'NHÂN VIÊN', dataIndex: ['staff', 'name'], width: 250,
                        render: (value) => {
                            return {
                                children: <Text strong className='text-[#0574b8] dark:text-white uppercase'>{value}</Text>,
                                __style__: { color: '0574b8' }, bold: true,
                            };
                        },
                        sorter: (a, b) => a?.staff?.name.localeCompare(b?.staff?.name),
                    },
                    {
                        title: 'LƯƠNG CƠ BẢN', width: 150,
                        render: (datas) => <>{this.getDataTableSalaryOverView(datas, 'salaryBasic')}</>
                    },
                    {
                        title: 'PHỤ CẤP', width: 150,
                        render: (datas) => <>{this.getDataTableSalaryOverView(datas, 'salarySubsidy')}</>
                    },
                    {
                        title: 'THƯỞNG KPI', width: 150,
                        render: (datas) => <>{this.getDataTableSalaryOverView(datas, 'rewardKPI')}</>
                    },
                    {
                        title: 'THƯỞNG TARGET', width: 150,
                        render: (datas) => <>{this.getDataTableSalaryOverView(datas, 'rewardTarget')}</>
                    },
                    {
                        title: 'TỔNG', width: 150,
                        render: (datas) => <>{this.getDataTableSalaryOverView(datas, 'salaryTotal')}</>
                    },

                ]
            }
        ];
        // const calculateSummary = (datas) => {
        //     let totalTargetMoney = 0;
        //     let totalAchievedMoney = 0;
        //     let totalTargetMoneyDate = 0;
        //     let totalDailyMoney = 0;
        //     datas.forEach(({ staff_monthly_target, revenue, daily }) => {
        //         totalTargetMoney += parseFloat(staff_monthly_target?.value);
        //         totalAchievedMoney += parseFloat(revenue?.total_revenue);
        //         totalDailyMoney += parseFloat(daily?.total_revenue);
        //     });
        //     totalTargetMoneyDate = this.getTargetDate(dataFilter?.end, totalTargetMoney - totalAchievedMoney, 0);
        //     return (
        //         <Table.Summary.Row>
        //             <Table.Summary.Cell index={0}>
        //                 <Text strong>TỔNG</Text>
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={1}>
        //                 <Text strong>{formatNumber(totalTargetMoney)}</Text>
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={2}>
        //                 <Text strong>{formatNumber(totalAchievedMoney)}</Text>
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={3}>
        //                 {(totalTargetMoney - totalAchievedMoney) > 0 ?
        //                     <Text className='text-red-500' strong>{`-${formatNumber(totalTargetMoney - totalAchievedMoney)}`}</Text>
        //                     :
        //                     <Text className='text-green-500' strong>{`+${formatNumber(Math.abs(totalTargetMoney - totalAchievedMoney))}`}</Text>
        //                 }
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={4}>
        //                 {(totalTargetMoney - totalAchievedMoney) > 0 ?
        //                     <Text className='text-red-500' strong>CHƯA</Text>
        //                     :
        //                     <Text className='text-green-500' strong>ĐẠT</Text>
        //                 }
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={5}>
        //                 <Text strong>{formatNumber(totalTargetMoneyDate)}</Text>
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={6}>
        //                 <Text strong>{formatNumber(totalDailyMoney)}</Text>
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={7}>
        //                 {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
        //                     <Text className='text-red-500' strong>{`-${formatNumber(totalTargetMoneyDate - totalDailyMoney)}`}</Text>
        //                     :
        //                     <Text className='text-green-500' strong>{`+${formatNumber(Math.abs(totalTargetMoneyDate - totalDailyMoney))}`}</Text>
        //                 }
        //             </Table.Summary.Cell>
        //             <Table.Summary.Cell index={8}>
        //                 {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
        //                     <Text className='text-red-500' strong>CHƯA</Text>
        //                     :
        //                     <Text className='text-green-500' strong>ĐẠT</Text>
        //                 }
        //             </Table.Summary.Cell>
        //         </Table.Summary.Row>
        //     );
        // }
        const items = [
            {
                key: '1',
                label: (
                    // eslint-disable-next-line
                    <a onClick={() => exportTableAntdToExcel(columnRevenueOverViews, dataReportTargetStaffs, dayjs().format("HH-mm/DD-MM-YYYY"))}>
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
                                                columns={columnSalaryOverviews} dataSource={[item]}
                                                pagination={false}
                                                size="small" bordered scroll={{ x: 1000 }} />
                                            <Table rowKey="id"
                                                columns={columnRevenueOverViews} dataSource={[item]}
                                                pagination={false}
                                                size="small" bordered scroll={{ x: 1000 }} />
                                            {item?.staff?.shift === "pt" && (item?.staff?.role?.code === "officialStaffSales" || item?.staff?.role?.code === "probationStaffSales") &&
                                                <Table rowKey="id"
                                                    columns={columnKPIDetails} dataSource={[item]}
                                                    pagination={false}
                                                    size="small" bordered scroll={{ x: 1000 }} />
                                            }
                                            <Table rowKey="id"
                                                columns={columnRevenueDetails} dataSource={[item]}
                                                pagination={false}
                                                size="small" bordered scroll={{ x: 650 }} />
                                        </div>
                                    )
                                })}
                            </div>

                        }
                        {typeActive?.typeTable === 'overview' &&
                            <div id='tableReportTargetStaff' className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                <Table rowKey="id"
                                    columns={columnRevenueOverViews} dataSource={dataReportTargetStaffs}
                                    pagination={false}
                                    size="small" bordered scroll={{ x: 1000 }}
                                // summary={calculateSummary}
                                />
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