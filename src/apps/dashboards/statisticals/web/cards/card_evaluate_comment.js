import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Card, Radio, Typography, Statistic, List, DatePicker, Progress } from 'antd';
import { AiFillStar } from "react-icons/ai";
import dayjs from 'dayjs';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { format_number } from '../../../../../utils/format_number';
import { ArrowDownOutlined, ArrowUpOutlined, EyeOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 'date',
            date_picker: '',
            labels: [],
            data_evaluates: [],
            data_ratings: [],
            data_comments: [],
            data_top_evaluates: [],
            data_top_comments: [],
        }
    }
    async componentDidMount() {
        let date_picker = dayjs().format('YYYY-MM-DD');
        this.setState({ date_picker: date_picker })
        let labels = this.handle_get_labels_to_date(this.state.type_menu, date_picker);
        this.handle_get_datas_to_date(this.state.type_menu, labels);
    }
    onchange_menu = (type_menu) => {
        this.setState({ type_menu: type_menu });
        let labels = this.handle_get_labels_to_date(type_menu, this.state.date_picker);
        this.handle_get_datas_to_date(type_menu, labels);
    }

    onchange_datepicker = async (event, date_picker) => {
        this.setState({ date_picker: date_picker });
        let labels = this.handle_get_labels_to_date(this.state.type_menu, date_picker);
        this.handle_get_datas_to_date(this.state.type_menu, labels);
    }
    handle_get_labels_to_date = (type_menu, date) => {
        let labels = [];
        let date_format = dayjs(date);
        for (let i = 0; i < 10; i++) {
            if (type_menu === 'date') {
                labels.push(date_format.format('DD/MM'));
                date_format = date_format.subtract(1, 'day');
            }
            if (type_menu === 'month') {
                labels.push(date_format.format('MM/YYYY'));
                date_format = date_format.subtract(1, 'month');
            }
            if (type_menu === 'year') {
                labels.push(date_format.year());
                date_format = date_format.subtract(1, 'year');
            }
        }
        this.setState({ labels: labels });
        return labels;
    }
    handle_get_datas_to_date = (type_menu, labels) => {
        if (type_menu === 'date') {
            let data_evaluates = [115, 59, 20, 81, 56, 55, 40, 102, 12, 42];
            let data_comments = [25, 19, 60, 81, 56, 35, 40, 12, 12, 52];
            let data_ratings = [54, 41, 31, 123, 111];
            let data_top_evaluates = this.handle_data_top(labels, data_evaluates);
            let data_top_comments = this.handle_data_top(labels, data_comments);
            this.setState({
                data_evaluates: data_evaluates,
                data_comments: data_comments,
                data_top_evaluates: data_top_evaluates,
                data_top_comments: data_top_comments,
                data_ratings: data_ratings,
            })
        }
        if (type_menu === 'month') {
            let data_evaluates = [215, 159, 210, 181, 156, 255, 140, 102, 112, 142];
            let data_comments = [125, 129, 610, 81, 126, 135, 410, 122, 212, 132];
            let data_ratings = [154, 211, 431, 723, 1111];
            let data_top_evaluates = this.handle_data_top(labels, data_evaluates);
            let data_top_comments = this.handle_data_top(labels, data_comments);
            this.setState({
                data_evaluates: data_evaluates,
                data_comments: data_comments,
                data_top_evaluates: data_top_evaluates,
                data_top_comments: data_top_comments,
                data_ratings: data_ratings,
            })
        }
        if (type_menu === 'year') {
            let data_evaluates = [2115, 3159, 2210, 1181, 1256, 2155, 1440, 1102, 1212, 4122];
            let data_comments = [2115, 1129, 1031, 2211, 1256, 2135, 2140, 1112, 1212, 5122];
            let data_ratings = [1154, 711, 1431, 1723, 12111];
            let data_top_evaluates = this.handle_data_top(labels, data_evaluates);
            let data_top_comments = this.handle_data_top(labels, data_comments);
            this.setState({
                data_evaluates: data_evaluates,
                data_comments: data_comments,
                data_top_evaluates: data_top_evaluates,
                data_top_comments: data_top_comments,
                data_ratings: data_ratings,
            })
        }
    }
    disabled_date = (current) => {
        return current && current > dayjs().endOf('day');
    };
    handle_sum_total = (data) => {
        const sum = data.reduce((a, b) => {
            return a + b;
        }, 0);
        return sum;
    }
    handle_data_top = (labels, datas) => {
        const sorted_datas = [...datas].sort((a, b) => b - a);
        const top5B = sorted_datas.slice(0, 5);
        const datas_new = top5B.map(value => {
            const index = datas.indexOf(value);
            return { name: labels[index], value: value };
        });
        return datas_new;
    }
    render() {
        let type_menu = this.state.type_menu;
        return (
            <Card title="Đánh giá - bình luận"
                extra={
                    <div className='md:flex hidden items-center space-x-[10px]'>
                        <Radio.Group value={type_menu} onChange={(event) => this.onchange_menu(event.target.value)} className='flex'>
                            <Radio.Button value="date">Ngày</Radio.Button>
                            <Radio.Button value="month">Tháng</Radio.Button>
                            <Radio.Button value="year">Năm</Radio.Button>
                        </Radio.Group>
                        <DatePicker allowClear={false} onChange={(event, value) => this.onchange_datepicker(event, value)} picker={type_menu} value={dayjs(this.state.date_picker)}
                            disabledDate={this.disabled_date} />
                    </div>
                }>
                <div className='space-y-[10px]'>
                    <div className='md:hidden flex items-center gap-x-[10px]'>
                        <Radio.Group value={type_menu} onChange={(event) => this.onchange_menu(event.target.value)} className='flex'>
                            <Radio.Button value="date">Ngày</Radio.Button>
                            <Radio.Button value="month">Tháng</Radio.Button>
                            <Radio.Button value="year">Năm</Radio.Button>
                        </Radio.Group>
                        <DatePicker onChange={(event, value) => this.onchange_datepicker(event, value)} picker={type_menu} value={dayjs(this.state.date_picker)}
                            disabledDate={this.disabled_date} />
                    </div>
                    {/* <Typography.Text className='text-blue-500' strong>Tỷ lệ lượng đánh giá</Typography.Text>
                    <div className='lg:grid lg:grid-cols-4 border-b py-[10px] gap-[20px]'>
                        <div className='space-y-[10px]'>
                            <Doughnut data={{
                                labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
                                datasets: [{
                                    label: 'My Dataset',
                                    data: this.state.data_ratings,
                                    backgroundColor: [
                                        '#ff0000',
                                        '#ff5500',
                                        '#ffaa00',
                                        '#f0f000',
                                        '#50d027',
                                    ],
                                    hoverOffset: 4
                                }]
                            }} />
                        </div>
                    </div> */}
                    <div className='lg:grid lg:grid-cols-3 border-b py-[10px] gap-[20px]'>
                        <div className='col-span-2'>
                            <div className='space-y-[10px]'>
                                <Typography.Text className='text-blue-500' strong>Biểu đồ cột lượng đánh giá</Typography.Text>
                                <Bar data={{
                                    labels: this.state.labels,
                                    datasets: [
                                        {
                                            label: 'Lượng đánh giá',
                                            backgroundColor: '#4285f4',
                                            data: this.state.data_evaluates,
                                        },
                                    ],
                                }} />
                            </div>
                        </div>
                        <div className='space-y-[10px] w-full'>
                            <div className='flex justify-between space-x-[5px] pb-[10px] border-b'>
                                <Statistic
                                    title={<Typography.Text className='text-blue-500' strong>Tổng lượng đánh giá</Typography.Text>}
                                    value={this.handle_sum_total(this.state.data_evaluates)}
                                    valueStyle={{ color: '#0f0f0f' }}
                                    prefix={<CommentOutlined />}
                                    suffix="lượt"
                                />
                                <Statistic
                                    title={
                                        <>
                                            {type_menu == 'date' &&
                                                <Typography.Text className='text-blue-500' strong>So với ngày trước</Typography.Text>}
                                            {type_menu == 'month' &&
                                                <Typography.Text className='text-blue-500' strong>So với tháng trước</Typography.Text>}
                                            {type_menu == 'year' &&
                                                <Typography.Text className='text-blue-500' strong>So với năm trước</Typography.Text>}
                                        </>
                                    }
                                    value={11.28}
                                    valueStyle={{ color: '#50d027' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                            <div className='space-y-[10px]'>
                                <Typography.Text className='text-blue-500' strong>Top lượng đánh giá</Typography.Text>
                                <List itemLayout="horizontal" size='small'
                                    dataSource={this.state.data_top_evaluates}
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
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='lg:grid lg:grid-cols-3 border-b py-[10px] gap-[20px]'>
                        <div className='col-span-2'>
                            <div className='space-y-[10px]'>
                                <Typography.Text className='text-blue-500' strong>Biểu đồ cột lượng bình luận</Typography.Text>
                                <Bar data={{
                                    labels: this.state.labels,
                                    datasets: [
                                        {
                                            label: 'Lượng bình luận',
                                            backgroundColor: '#50d027',
                                            data: this.state.data_comments,
                                        },
                                    ],
                                }} />
                            </div>
                        </div>
                        <div className='space-y-[10px] w-full'>
                            <div className='flex justify-between space-x-[5px] pb-[10px] border-b'>
                                <Statistic
                                    title={<Typography.Text className='text-blue-500' strong>Tổng lượng bình luận</Typography.Text>}
                                    value={this.handle_sum_total(this.state.data_comments)}
                                    valueStyle={{ color: '#0f0f0f' }}
                                    prefix={<CommentOutlined />}
                                    suffix="lượt"
                                />
                                <Statistic
                                    title={
                                        <>
                                            {type_menu == 'date' &&
                                                <Typography.Text className='text-blue-500' strong>So với ngày trước</Typography.Text>}
                                            {type_menu == 'month' &&
                                                <Typography.Text className='text-blue-500' strong>So với tháng trước</Typography.Text>}
                                            {type_menu == 'year' &&
                                                <Typography.Text className='text-blue-500' strong>So với năm trước</Typography.Text>}
                                        </>
                                    }
                                    value={11.28}
                                    valueStyle={{ color: '#50d027' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                            <div className='space-y-[10px]'>
                                <Typography.Text className='text-blue-500' strong>Top lượng bình luận</Typography.Text>
                                <List itemLayout="horizontal" size='small'
                                    dataSource={this.state.data_top_comments}
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
            </Card>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));