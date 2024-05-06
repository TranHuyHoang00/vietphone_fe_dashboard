import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Card, Radio, Typography, Statistic, List, DatePicker, Spin } from 'antd';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { format_number } from '@utils/format_number';
import { ArrowDownOutlined, ArrowUpOutlined, EyeOutlined } from '@ant-design/icons';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            display_number: 9,
            data_top_view_web: [],
        }
    }
    async componentDidMount() {
        let data_day = this.handle_day('day', dayjs(new Date()).format('YYYY-MM-DD'));
        let data_statistical = this.props.data_statistical;
        data_statistical.start = data_day.start;
        data_statistical.end = data_day.end;
        await this.props.set_statistical(data_statistical);
        await this.props.get_view_web(data_statistical);
        this.handle_data_top(this.state.labels, this.props.data_view_webs);
    }
    handle_day = (type_menu, day) => {
        let start, end;
        end = dayjs(day).format('YYYY-MM-DD');
        if (type_menu === 'day') { start = dayjs(day).subtract(this.state.display_number, 'day').format('YYYY-MM-DD'); }
        if (type_menu === 'month') { start = dayjs(day).subtract(this.state.display_number, 'month').format('YYYY-MM-DD'); }
        if (type_menu === 'year') { start = dayjs(day).subtract(this.state.display_number, 'year').format('YYYY-MM-DD'); }

        let labels = [];
        for (let i = 0; i <= this.state.display_number; i++) {
            let previous_day;
            if (type_menu === 'day') { previous_day = dayjs(day).subtract(i, 'day').format('DD-MM'); }
            if (type_menu === 'month') { previous_day = dayjs(day).subtract(i, 'month').format('MM-YYYY'); }
            if (type_menu === 'year') { previous_day = dayjs(day).subtract(i, 'year').format('YYYY'); }
            labels.unshift(previous_day);
        }
        this.setState({ labels: labels })
        return { start, end }
    }
    onchange_menu = async (type_menu) => {
        let data_statistical = this.props.data_statistical;
        let data_day = this.handle_day(type_menu, data_statistical.end);
        data_statistical.type = type_menu;
        data_statistical.start = data_day.start;
        data_statistical.end = data_day.end;
        this.props.set_statistical(data_statistical);
        await this.props.get_view_web(data_statistical);
        this.handle_data_top(this.state.labels, this.props.data_view_webs);
    }

    onchange_daypicker = async (event, day_picker) => {
        let data_statistical = this.props.data_statistical;
        let data_day = this.handle_day(data_statistical.type, day_picker);
        data_statistical.start = data_day.start;
        data_statistical.end = data_day.end;
        await this.props.get_view_web(data_statistical);
        this.handle_data_top(this.state.labels, this.props.data_view_webs);
    }
    disabled_day = (current) => {
        return current && current > dayjs().endOf('day');
    };
    handle_sum_total = (data) => {
        if (data) {
            const sum = data.reduce((a, b) => { return a + b; }, 0);
            return sum;
        }
    }
    handle_data_top = (labels, datas) => {
        const sorted_datas = [...datas].sort((a, b) => b - a);
        const top5B = sorted_datas.slice(0, 5);
        const datas_new = top5B.map(value => {
            const index = datas.indexOf(value);
            return { name: labels[index], value: value };
        });
        this.setState({ data_top_view_web: datas_new })
    }
    check_ratio = (data_view_webs, type) => {
        if (data_view_webs) {
            let final_first_item = data_view_webs?.[data_view_webs.length - 1];
            let final_second_item = data_view_webs?.[data_view_webs.length - 2];
            let ratio;
            if (final_second_item && final_second_item !== 0) {
                let number = Math.round(((final_first_item - final_second_item) / final_second_item) * 100)
                ratio = number < 0 ? -number : number;
            } else {
                ratio = 100;
            }
            if (final_first_item >= final_second_item) {
                if (type === 'prefix') {
                    return <ArrowUpOutlined />
                }
                if (type === 'valueStyle') {
                    return { color: '#00db28' }
                }
                if (type === 'value') {
                    return ratio
                }
            } else {
                if (type === 'prefix') {
                    return <ArrowDownOutlined />
                }
                if (type === 'valueStyle') {
                    return { color: '#ed3b00' }
                }
                if (type === 'value') {
                    return ratio
                }
            }
        }

    }
    render() {
        let labels = this.state.labels
        return (
            <div className='px-[10px]'>
                <Card title={`Lượt truy cập từ ${labels?.[0]} đến ${labels?.[labels.length - 1]}`}
                    extra={
                        <div className='md:flex hidden items-center space-x-[10px]'>
                            <Radio.Group value={this.props.data_statistical?.type} onChange={(event) => this.onchange_menu(event.target.value)} className='flex'>
                                <Radio.Button value="day">Ngày</Radio.Button>
                                <Radio.Button value="month">Tháng</Radio.Button>
                                <Radio.Button value="year">Năm</Radio.Button>
                            </Radio.Group>
                            <DatePicker allowClear={false} onChange={(event, value) => this.onchange_daypicker(event, value)} picker={this.props.data_statistical?.type}
                                disabledDate={(day) => this.disabled_day(day)} value={dayjs(this.props.data_statistical?.end)} />
                        </div>
                    }>
                    <Spin spinning={this.props.is_loading}>
                        <div className='space-y-[10px]'>
                            <div className='md:hidden flex items-center gap-x-[10px]'>
                                <Radio.Group value={this.props.data_statistical?.type} onChange={(event) => this.onchange_menu(event.target.value)} className='flex'>
                                    <Radio.Button value="day">Ngày</Radio.Button>
                                    <Radio.Button value="month">Tháng</Radio.Button>
                                    <Radio.Button value="year">Năm</Radio.Button>
                                </Radio.Group>
                                <DatePicker allowClear={false} onChange={(event, value) => this.onchange_daypicker(event, value)} picker={this.props.data_statistical?.type}
                                    disabledDate={(day) => this.disabled_day(day)} value={dayjs(this.props.data_statistical?.end)} />
                            </div>
                            <div className='lg:grid lg:grid-cols-3 py-[10px] gap-[20px]'>
                                <div className='col-span-2'>
                                    <div className='space-y-[10px]'>
                                        <Typography.Text strong className='text-blue-500 dark:text-white'>Biểu đồ cột lượt truy cập</Typography.Text>
                                        <Bar data={{
                                            labels: this.state.labels,
                                            datasets: [
                                                {
                                                    label: 'Lượt truy cập',
                                                    backgroundColor: '#4285f4',
                                                    data: this.props.data_view_webs,
                                                },
                                            ],
                                        }} />
                                    </div>
                                </div>
                                <div className='space-y-[10px] w-full'>
                                    <div className='flex justify-between space-x-[5px] pb-[10px] border-b'>
                                        <Statistic
                                            title={<Typography.Text className='text-blue-500 dark:text-white' strong>Tổng lượt truy cập</Typography.Text>}
                                            value={this.handle_sum_total(this.props.data_view_webs)}
                                            valueStyle={{ color: '#ed3b00' }}
                                            prefix={<EyeOutlined />}
                                            suffix="lượt" />
                                        <Statistic
                                            title={
                                                <>
                                                    {this.props.data_statistical?.type === 'day' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>So với ngày trước</Typography.Text>}
                                                    {this.props.data_statistical?.type === 'month' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>So với tháng trước</Typography.Text>}
                                                    {this.props.data_statistical?.type === 'year' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>So với năm trước</Typography.Text>}
                                                </>
                                            }
                                            value={this.check_ratio(this.props.data_view_webs, 'value')}
                                            valueStyle={this.check_ratio(this.props.data_view_webs, 'valueStyle')}
                                            prefix={this.check_ratio(this.props.data_view_webs, 'prefix')}
                                            suffix="%"
                                        />
                                    </div>
                                    <div className='flex justify-between space-x-[5px] pb-[10px] border-b'>
                                        <Statistic
                                            title={
                                                <>
                                                    {this.props.data_statistical?.type === 'day' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Trung bình ngày</Typography.Text>}
                                                    {this.props.data_statistical?.type === 'month' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Trung bình tháng</Typography.Text>}
                                                    {this.props.data_statistical?.type === 'year' &&
                                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Trung bình năm</Typography.Text>}
                                                </>
                                            }
                                            value={Math.round(this.handle_sum_total(this.props.data_view_webs) / this.state.display_number)}
                                            valueStyle={{ color: '#ed3b00' }}
                                            prefix={<EyeOutlined />}
                                            suffix="lượt" />
                                    </div>
                                    <div className='space-y-[10px]'>
                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Top 5 lượt truy cập</Typography.Text>
                                        <List itemLayout="horizontal" size='small'
                                            dataSource={this.state.data_top_view_web}
                                            renderItem={(item, index) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <div className='rounded-full h-[25px] w-[25px] border flex items-center justify-center bg-gray-700 '>
                                                                <Typography.Text className='text-white' strong>{index + 1}</Typography.Text>
                                                            </div>
                                                        }
                                                        title={
                                                            <div className='flex items-center justify-between'>
                                                                <Typography.Text strong>{item.name}</Typography.Text>
                                                                <Typography.Text italic>{format_number(item.value)} lượt</Typography.Text>
                                                                <Typography.Text italic strong>{Math.round(format_number(item.value) / this.handle_sum_total(this.props.data_view_webs) * 100)} %</Typography.Text>
                                                            </div>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
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
        data_view_webs: state.statistical.data_view_webs,
        data_statistical: state.statistical.data_statistical,
        is_loading: state.statistical.is_loading,
        is_result: state.statistical.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_view_web: (data) => dispatch(actions.get_view_web_redux(data)),
        set_statistical: (data) => dispatch(actions.set_statistical_redux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));