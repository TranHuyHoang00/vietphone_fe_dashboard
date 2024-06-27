import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Spin, Table, Typography, Button, Space, message } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { formatNumber } from '@utils/handleFuncFormat';
import dayjs from 'dayjs';
import BarGroup from '../../component/bar/group';
import DrawerFilter from './drawers/drawerFilter';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataTargets } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerFilter: false,
            dataFilter: {
                start_time: dayjs().startOf('month').format("YYYY-MM-DD"),
                end_time: dayjs().format("YYYY-MM-DD"),
                type_object: 'shop',
                type_time: 'month',
            },
            dataTargets: [],

            dataChartTargetShop: {},
            dataCheckPermis: {},

        }
    }
    async componentDidMount() {
        const { dataUserPermis, isSuperUser } = this.props;
        const dataCheckPermis = await handleCheckPermis(dataTargets, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });

        this.loadData();
    }
    validationData = (data) => {
        if (!data.start_time) {
            return { mess: "Không được bỏ trống 'Ngày bắt đầu' ", check: false };
        }
        if (!data.end_time) {
            return { mess: "Không được bỏ trống 'Ngày kết thúc' ", check: false };
        }
        const startDate = dayjs(data.start_time, 'YYYY-MM-DD');
        const endDate = dayjs(data.end_time, 'YYYY-MM-DD');
        const isDifferentMonthYear = !startDate.isSame(endDate, 'month') || !startDate.isSame(endDate, 'year');
        if (isDifferentMonthYear) {
            return { mess: "Ngày bắt đầu và ngày kết thúc không cùng tháng hoặc năm", check: false };
        }
        if (startDate.isAfter(endDate)) {
            return { mess: "Ngày bắt đầu lớn hơn ngày kết thúc", check: false };
        }
        return { check: true };
    }
    handleFilter = async (dataFilter) => {
        const result = this.validationData(dataFilter);
        if (result.check) {
            this.setState({ dataFilter: dataFilter });
            this.openDrawer('filter', false);
        } else {
            message.error(result.mess);
        }
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
    loadData = () => {
        const dataTargetShops = [
            { id: 1, shop: { id: 1, name: 'vietphone 16' }, targetMonth: 650000000, targetAchieved: 478000000, dailyIncome: 87100000 },
            { id: 2, shop: { id: 2, name: 'vietphone 21' }, targetMonth: 850000000, targetAchieved: 577010000, dailyIncome: 90000 },
            { id: 3, shop: { id: 3, name: 'vietphone 22' }, targetMonth: 450000000, targetAchieved: 454060000, dailyIncome: 1700000 },
            { id: 4, shop: { id: 4, name: 'vietphone 25' }, targetMonth: 850000000, targetAchieved: 954070000, dailyIncome: 17000 },
            { id: 5, shop: { id: 10, name: 'vietphone 26' }, targetMonth: 550000000, targetAchieved: 234000400, dailyIncome: 70000 },
            { id: 6, shop: { id: 9, name: 'vietphone 27' }, targetMonth: 450000000, targetAchieved: 462090000, dailyIncome: 580000 },
            { id: 7, shop: { id: 5, name: 'vietphone 28' }, targetMonth: 650000000, targetAchieved: 104060000, dailyIncome: 6700000 },
            { id: 8, shop: { id: 6, name: 'vietphone 29' }, targetMonth: 750000000, targetAchieved: 154040000, dailyIncome: 2700000 },
            { id: 9, shop: { id: 7, name: 'vietphone 30' }, targetMonth: 650000000, targetAchieved: 354030000, dailyIncome: 1700000 },
            { id: 10, shop: { id: 8, name: 'vietphone 31' }, targetMonth: 550000000, targetAchieved: 234005000, dailyIncome: 117000000 },
        ]
        this.setState({ dataTargets: dataTargetShops });
        this.handleDataForChart(dataTargetShops);
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
    handleDataForChart = (dataInput) => {
        const dataTargetMonths = dataInput.map(item => (item?.targetMonth / 1000000));
        const dataTargetAchieveds = dataInput.map(item => (item?.targetAchieved / 1000000));
        const dataNameShops = dataInput.map(item => (item?.shop?.name));
        const dataOutput = {
            datas: [
                { name: 'Thực đạt', data: dataTargetAchieveds },
                { name: 'Target', data: dataTargetMonths },
            ],
            labels: dataNameShops,
            height: 80 * (dataTargetMonths && dataTargetMonths.length),
        }
        this.setState({ dataChartTargetShop: dataOutput })
    }
    render() {
        const { isLoading } = this.props;
        const { dataTargets, dataFilter, dataChartTargetShop, drawerFilter, dataCheckPermis } = this.state;
        const totalRevenueColumns = [
            {
                title: `${dataFilter?.type_time === 'month' ? `TỔNG DOANH THU CỬA HÀNG THÁNG ${dayjs(dataFilter?.start_time).format('MM-YYYY')}` : `TỔNG DOANH THU CỬA HÀNG TỪ ${dayjs(dataFilter?.start_time).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`}`,
                children: [
                    {
                        title: 'Cửa hàng', dataIndex: 'id',
                        render: (id, item) =>
                            <Typography.Text strong className='text-[#0574b8] dark:text-white uppercase'>
                                {item?.shop?.name}
                            </Typography.Text>,
                        sorter: (a, b) => a?.shop?.name.localeCompare(b?.shop?.name),
                    },
                    {
                        title: 'Target tháng', dataIndex: 'targetMonth',
                        render: (targetMonth) => <Typography.Text >{formatNumber(targetMonth)}</Typography.Text>,
                        sorter: (a, b) => a?.targetMonth - b?.targetMonth,
                    },
                    {
                        title: `Ngày ${dayjs(dataFilter?.start_time).format('DD')} tới ${dayjs(dataFilter?.end_time).format('DD')}`, dataIndex: 'targetAchieved',
                        render: (targetAchieved) => <Typography.Text>{formatNumber(targetAchieved)}</Typography.Text>,
                        sorter: (a, b) => a?.targetAchieved - b?.targetAchieved,
                    },
                    {
                        title: `Còn lại`, dataIndex: 'targetAchieved',
                        render: (targetAchieved, item) =>
                            <>
                                {(item?.targetMonth - targetAchieved) > 0 ?
                                    <Typography.Text strong className='text-red-500'>
                                        -{formatNumber(item?.targetMonth - targetAchieved)}
                                    </Typography.Text>
                                    :
                                    <Typography.Text strong className='text-green-500'>
                                        +{formatNumber(targetAchieved - item?.targetMonth)}
                                    </Typography.Text>
                                }
                            </>,
                        sorter: (a, b) => (a?.targetMonth - a?.targetAchieved) - (b?.targetMonth - b?.targetAchieved),
                    },
                    {
                        title: 'Trạng thái', dataIndex: 'id',
                        render: (id, item) =>
                            <>
                                {(item?.targetMonth - item?.targetAchieved) > 0 ?
                                    <Typography.Text strong className='text-red-500'>
                                        CHƯA
                                    </Typography.Text>
                                    :
                                    <Typography.Text strong className='text-green-500'>
                                        ĐẠT
                                    </Typography.Text>
                                }
                            </>,
                    },
                ],
            },
            {
                title: `DOANH THU NGÀY ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`, children: [
                    {
                        title: `Target ngày`, dataIndex: 'targetMonth',
                        render: (targetMonth, item) =>
                            <>
                                {(item?.targetMonth - item.targetAchieved) > 0 ?
                                    <Typography.Text>
                                        {formatNumber(this.getTargetDate(dataFilter?.end_time, targetMonth, item?.targetAchieved))}
                                    </Typography.Text>
                                    :
                                    <></>
                                }
                            </>,
                        sorter: (a, b) => (this.getTargetDate(dataFilter?.end_time, a?.targetMonth, a?.targetAchieved)) - (this.getTargetDate(dataFilter?.end_time, b?.targetMonth, b?.targetAchieved)),
                    },
                    {
                        title: `Thực đạt`, dataIndex: 'dailyIncome',
                        render: (dailyIncome) => <Typography.Text>{formatNumber(dailyIncome)}</Typography.Text>,
                        sorter: (a, b) => a?.dailyIncome - b?.dailyIncome,
                    },
                    {
                        title: `Còn lại`, dataIndex: 'dailyIncome',
                        render: (dailyIncome, item) =>
                            <>
                                {(item?.targetMonth - item.targetAchieved) > 0 ?
                                    <>
                                        {(this.getTargetDate(dataFilter?.end_time, item?.targetMonth, item?.targetAchieved) - dailyIncome) > 0 ?
                                            <Typography.Text strong className='text-red-500'>
                                                -{formatNumber(this.getTargetDate(dataFilter?.end_time, item?.targetMonth, item?.targetAchieved) - dailyIncome)}
                                            </Typography.Text>
                                            :
                                            <Typography.Text strong className='text-green-500'>
                                                +{formatNumber(dailyIncome - this.getTargetDate(dataFilter?.end_time, item?.targetMonth, item?.targetAchieved))}
                                            </Typography.Text>
                                        }
                                    </>
                                    :
                                    <></>
                                }

                            </>,
                        sorter: (a, b) => (this.getTargetDate(dataFilter?.end_time, a?.targetMonth, a?.targetAchieved) - a?.dailyIncome) - (this.getTargetDate(dataFilter?.end_time, b?.targetMonth, b?.targetAchieved) - b?.dailyIncome),
                    },
                    {
                        title: 'Trạng thái', dataIndex: 'id',
                        render: (id, item) =>
                            <>
                                {(item?.targetMonth - item?.targetAchieved) > 0 ?
                                    <>
                                        {(this.getTargetDate(dataFilter?.end_time, item?.targetMonth, item?.targetAchieved) - item.dailyIncome) > 0 ?
                                            <Typography.Text strong className='text-red-500'>
                                                CHƯA
                                            </Typography.Text>
                                            :
                                            <Typography.Text strong className='text-green-500'>
                                                ĐẠT
                                            </Typography.Text>
                                        }
                                    </>
                                    :
                                    <Typography.Text strong className='text-green-500'>
                                        ĐẠT
                                    </Typography.Text>
                                }
                            </>,
                    },
                ]
            },

        ];
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <Button disabled={!dataCheckPermis['target.view_target']}
                            onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                            <Space className='text-white dark:text-black'>
                                <AiFillFilter />
                                Lọc
                            </Space>
                        </Button>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md '>
                            <Table rowKey="id"
                                columns={totalRevenueColumns} dataSource={dataTargets} pagination={false}
                                size="small" bordered scroll={{ x: 1000 }} />
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md '>
                            <div className='md:grid grid-cols-2 gap-[20px]'>
                                {dataChartTargetShop && dataChartTargetShop.datas &&
                                    <BarGroup dataSeries={dataChartTargetShop?.datas} dataCategories={dataChartTargetShop?.labels}
                                        height={dataChartTargetShop?.height} title={"Biểu đồ cột doanh thu theo cửa hàng (triệu vnđ)"} />
                                }
                            </div>
                        </div>
                    </div>
                </Spin>
                {drawerFilter && dataCheckPermis['target.view_target'] &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        handleFilter={this.handleFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargets: state.target.dataTargets,
        dataTarget: state.target.dataTarget,
        dataMeta: state.target.dataMeta,
        isLoading: state.target.isLoading,
        isResult: state.target.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTarget: (dataFilter) => dispatch(actions.getListTargetRedux(dataFilter)),
        getDataTarget: (id) => dispatch(actions.getDataTargetRedux(id)),
        editListTarget: (id, data) => dispatch(actions.editListTargetRedux(id, data)),
        deleteListTarget: (id) => dispatch(actions.deleteListTargetRedux(id)),
        setDataTarget: (id) => dispatch(actions.setDataTargetRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));