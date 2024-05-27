import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Card, Radio, Typography, Statistic, DatePicker, Spin } from 'antd';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line
import Chart from 'chart.js/auto';
import { ArrowDownOutlined, ArrowUpOutlined, EyeOutlined } from '@ant-design/icons';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            displayNumber: 9,
            dataTopViewWebs: [],
        }
    }
    async componentDidMount() {
        this.getData('day', new Date());
    }
    handleDay = (itemGroupButtonType, day) => {
        let start, end;
        let labels = [];
        end = dayjs(day).format('YYYY-MM-DD');
        const { displayNumber } = this.state;
        switch (itemGroupButtonType) {
            case 'day':
                start = dayjs(day).subtract(displayNumber, 'day').format('YYYY-MM-DD');
                break;
            case 'month':
                start = dayjs(day).subtract(displayNumber, 'month').format('YYYY-MM-DD');
                break;
            case 'year':
                start = dayjs(day).subtract(displayNumber, 'year').format('YYYY-MM-DD');
                break;
            default:
                break;
        }

        for (let i = 0; i <= displayNumber; i++) {
            let previousDay;
            switch (itemGroupButtonType) {
                case 'day':
                    previousDay = dayjs(day).subtract(i, 'day').format('DD-MM');
                    break;
                case 'month':
                    previousDay = dayjs(day).subtract(i, 'month').format('MM-YYYY');
                    break;
                case 'year':
                    previousDay = dayjs(day).subtract(i, 'year').format('YYYY');
                    break;
                default:
                    break;
            }
            labels.unshift(previousDay);
        }
        this.setState({ labels: labels })
        return { start, end, labels }
    }
    onChangeGroupButton = async (itemGroupButtonType) => {
        this.getData(itemGroupButtonType, new Date());
    }
    onChangeDayPicker = async (event, dayPicker) => {
        const { dataStatistical } = this.props;
        this.getData(dataStatistical.type, dayPicker);
    }
    getData = async (typeFilter, dayPicker) => {
        const { getViewWeb, dataStatistical, setDataStatistical } = this.props;
        const dataDay = this.handleDay(typeFilter, dayPicker);
        const newDataStatistical = {
            ...dataStatistical,
            start: dataDay.start,
            end: dataDay.end,
            type: typeFilter,
        };
        await setDataStatistical(newDataStatistical);
        await getViewWeb(newDataStatistical);

    }
    disabledDay = (current) => {
        return current && current > dayjs().endOf('day');
    };
    handleSumTotal = (data) => {
        return data.reduce((a, b) => { return a + b; }, 0);
    }
    checkRatio = (dataViewWebs, type) => {
        if (dataViewWebs) {
            const finalFirstItem = dataViewWebs?.[dataViewWebs.length - 1];
            const finalSecondItem = dataViewWebs?.[dataViewWebs.length - 2];
            let ratio;
            if (finalSecondItem && finalSecondItem !== 0) {
                const number = Math.round(((finalFirstItem - finalSecondItem) / finalSecondItem) * 100)
                ratio = number < 0 ? -number : number;
            } else {
                ratio = 100;
            }
            if (finalFirstItem >= finalSecondItem) {
                switch (type) {
                    case 'prefix':
                        return <ArrowUpOutlined />
                    case 'valueStyle':
                        return { color: '#00db28' }
                    case 'value':
                        return ratio
                    default:
                        break;
                }
            } else {
                switch (type) {
                    case 'prefix':
                        return <ArrowDownOutlined />
                    case 'valueStyle':
                        return { color: '#ed3b00' }
                    case 'value':
                        return ratio
                    default:
                        break;
                }
            }
        }

    }
    render() {
        const { labels, displayNumber } = this.state;
        const { dataStatistical, isLoading, dataViewWebs } = this.props;
        return (
            <div className='px-[10px]'>
                <Card title={`Lượt truy cập từ ${labels?.[0]} đến ${labels?.[labels.length - 1]}`}
                    extra={
                        <div className='md:flex hidden items-center space-x-[10px]'>
                            <Radio.Group value={dataStatistical?.type} onChange={(event) => this.onChangeGroupButton(event.target.value)} className='flex'>
                                <Radio.Button value="day">Ngày</Radio.Button>
                                <Radio.Button value="month">Tháng</Radio.Button>
                                <Radio.Button value="year">Năm</Radio.Button>
                            </Radio.Group>
                            <DatePicker allowClear={false} onChange={(event, value) => this.onChangeDayPicker(event, value)} picker={dataStatistical?.type}
                                disabledDate={(day) => this.disabledDay(day)} value={dayjs(dataStatistical?.end)} />
                        </div>
                    }>
                    <Spin spinning={isLoading}>
                        <div className='space-y-[10px]'>
                            <div className='md:hidden flex items-center gap-x-[10px]'>
                                <Radio.Group value={dataStatistical?.type} onChange={(event) => this.onChangeGroupButton(event.target.value)} className='flex'>
                                    <Radio.Button value="day">Ngày</Radio.Button>
                                    <Radio.Button value="month">Tháng</Radio.Button>
                                    <Radio.Button value="year">Năm</Radio.Button>
                                </Radio.Group>
                                <DatePicker allowClear={false} onChange={(event, value) => this.onChangeDayPicker(event, value)} picker={dataStatistical?.type}
                                    disabledDate={(day) => this.disabledDay(day)} value={dayjs(dataStatistical?.end)} />
                            </div>
                            <div className='lg:grid lg:grid-cols-3 py-[10px] gap-[20px]'>
                                <div className='col-span-2'>
                                    <div className='space-y-[10px]'>
                                        <Typography.Text strong className='text-blue-500 dark:text-white'>Biểu đồ cột lượt truy cập</Typography.Text>
                                        <Bar data={{
                                            labels: labels,
                                            datasets: [
                                                {
                                                    label: 'Lượt truy cập',
                                                    backgroundColor: '#4285f4',
                                                    data: dataViewWebs,
                                                },
                                            ],
                                        }} />
                                    </div>
                                </div>
                                <div className='space-y-[10px] w-full'>
                                    <div className='flex justify-between space-x-[5px] pb-[10px] border-b'>
                                        <Statistic
                                            title={<Typography.Text className='text-blue-500 dark:text-white' strong>Tổng lượt truy cập</Typography.Text>}
                                            value={this.handleSumTotal(dataViewWebs)}
                                            valueStyle={{ color: '#ed3b00' }}
                                            prefix={<EyeOutlined />}
                                            suffix="lượt" />
                                        <Statistic
                                            title={
                                                <>
                                                    {dataStatistical?.type === 'day' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>So với ngày trước</Typography.Text>}
                                                    {dataStatistical?.type === 'month' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>So với tháng trước</Typography.Text>}
                                                    {dataStatistical?.type === 'year' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>So với năm trước</Typography.Text>}
                                                </>
                                            }
                                            value={this.checkRatio(dataViewWebs, 'value')}
                                            valueStyle={this.checkRatio(dataViewWebs, 'valueStyle')}
                                            prefix={this.checkRatio(dataViewWebs, 'prefix')}
                                            suffix="%"
                                        />
                                    </div>
                                    <div className='flex justify-between space-x-[5px] pb-[10px] border-b'>
                                        <Statistic
                                            title={
                                                <>
                                                    {dataStatistical?.type === 'day' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Trung bình ngày</Typography.Text>}
                                                    {dataStatistical?.type === 'month' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Trung bình tháng</Typography.Text>}
                                                    {dataStatistical?.type === 'year' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Trung bình năm</Typography.Text>}
                                                </>
                                            }
                                            value={Math.round(this.handleSumTotal(dataViewWebs) / displayNumber)}
                                            valueStyle={{ color: '#ed3b00' }}
                                            prefix={<EyeOutlined />}
                                            suffix="lượt" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Spin>
                </Card>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataViewWebs: state.statistical.dataViewWebs,
        dataStatistical: state.statistical.dataStatistical,
        isLoading: state.statistical.isLoading,
        isResult: state.statistical.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getViewWeb: (data) => dispatch(actions.getViewWebRedux(data)),
        setDataStatistical: (data) => dispatch(actions.setDataStatisticalRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));