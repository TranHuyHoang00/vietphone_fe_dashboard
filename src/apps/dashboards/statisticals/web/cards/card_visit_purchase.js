import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Card, Radio, Typography, Statistic, List } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { format_number } from '../../../../../utils/format_number';
class card_visit_purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            data_visits: [],
            data_purchases: [],
            type_menu: 'week',
            data_top_visits: [],
            data_top_purchases: [],
        }
    }
    async componentDidMount() {
        let labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        let data_visits = [1660, 959, 1880, 981, 1506, 955, 1940];
        let data_purchases = [15, 59, 20, 81, 56, 55, 40];
        let data_top_visits = this.handle_data_top(labels, data_visits);
        let data_top_purchases = this.handle_data_top(labels, data_purchases);
        this.setState({
            labels: labels,
            data_visits: data_visits,
            data_purchases: data_purchases,
            data_top_visits: data_top_visits,
            data_top_purchases: data_top_purchases,
        })
    }
    onchange_menu = (value) => {
        if (value == 'week') {
            let labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
            let data_visits = [1660, 959, 1880, 981, 1506, 955, 1940];
            let data_purchases = [15, 59, 20, 81, 56, 55, 40];
            let data_top_visits = this.handle_data_top(labels, data_visits);
            let data_top_purchases = this.handle_data_top(labels, data_purchases);

            this.setState({
                labels: labels,
                data_visits: data_visits,
                data_purchases: data_purchases,
                data_top_visits: data_top_visits,
                data_top_purchases: data_top_purchases,
            })
        }
        if (value == 'month') {
            let labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
            let data_visits = [53001, 48901, 42392, 88041];
            let data_purchases = [6500, 12009, 21000, 18801];
            let data_top_visits = this.handle_data_top(labels, data_visits);
            let data_top_purchases = this.handle_data_top(labels, data_purchases);

            this.setState({
                labels: labels,
                data_visits: data_visits,
                data_purchases: data_purchases,
                data_top_visits: data_top_visits,
                data_top_purchases: data_top_purchases,
            })
        }
        if (value == 'year') {
            let labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
            let data_visits = [593001, 1487901, 423892, 880491, 893001, 587901, 823892, 680491, 813001, 1687901, 823892, 480491];
            let data_purchases = [116500, 82009, 71000, 58801, 66500, 83009, 71000, 58801, 36500, 82009, 71000, 38801];
            let data_top_visits = this.handle_data_top(labels, data_visits);
            let data_top_purchases = this.handle_data_top(labels, data_purchases);

            this.setState({
                labels: labels,
                data_visits: data_visits,
                data_purchases: data_purchases,
                data_top_visits: data_top_visits,
                data_top_purchases: data_top_purchases,
            })
        }
        this.setState({
            type_menu: value
        })
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
    handle_total = (data) => {
        const sum = data.reduce((a, b) => {
            return a + b;
        }, 0);
        return sum;
    }
    render() {
        const option_visit_purchase = {
            scales: {
                yAxes: [
                    {
                        ticks: { beginAtZero: true, },
                    },
                ],
            },
        };
        let type_menu = this.state.type_menu;
        return (
            <Card title="Lượt xem - lượt mua"
                extra={
                    <div className='md:block hidden'>
                        <Radio.Group value={this.state.type_menu} onChange={(event) => this.onchange_menu(event.target.value)} className='flex'>
                            <Radio.Button value="week">Tuần này</Radio.Button>
                            <Radio.Button value="month">Tháng này</Radio.Button>
                            <Radio.Button value="year">Năm này</Radio.Button>
                        </Radio.Group>
                    </div>
                }>
                <div className='space-y-[10px]'>
                    <div className='block md:hidden'>
                        <Radio.Group value={this.state.type_menu} onChange={(event) => this.onchange_menu(event.target.value)} className='flex'>
                            <Radio.Button value="week">Tuần này</Radio.Button>
                            <Radio.Button value="month">Tháng này</Radio.Button>
                            <Radio.Button value="year">Năm này</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='lg:grid lg:grid-cols-4 border-b py-[10px] gap-[20px]'>
                        <div className='space-y-[10px]'>
                            <Typography.Text className='text-blue-600' strong>Tỉ trọng giữa lượt mua - không mua</Typography.Text>
                            <Doughnut data={{
                                labels: ['Mua', 'Không mua',],
                                datasets: [{
                                    label: 'My Dataset',
                                    data: [this.handle_total(this.state.data_purchases), (this.handle_total(this.state.data_visits) - this.handle_total(this.state.data_purchases))],
                                    backgroundColor: [
                                        '#00b01d',
                                        '#f60000',
                                    ],
                                    hoverOffset: 4
                                }]
                            }} />
                        </div>
                        <div className='space-y-[10px]'>
                            <div className='flex justify-between space-x-[5px]'>
                                <Statistic
                                    title={<Typography.Text className='text-blue-600' strong>Tổng không mua</Typography.Text>}
                                    value={(this.handle_total(this.state.data_visits) - this.handle_total(this.state.data_purchases))}
                                    valueStyle={{ color: '#0f0f0f' }}
                                    prefix={<ShoppingCartOutlined />}
                                    suffix="lượt"
                                />
                                <Statistic
                                    title={
                                        <>
                                            {type_menu == 'week' &&
                                                <Typography.Text className='text-blue-600' strong>So với tuần trước</Typography.Text>}
                                            {type_menu == 'month' &&
                                                <Typography.Text className='text-blue-600' strong>So với tháng trước</Typography.Text>}
                                            {type_menu == 'year' &&
                                                <Typography.Text className='text-blue-600' strong>So với năm trước</Typography.Text>}
                                        </>
                                    }
                                    value={11.28}
                                    valueStyle={{ color: '#00b01d' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                            <div className='flex justify-between space-x-[5px]'>
                                <Statistic
                                    title={<Typography.Text className='text-blue-600' strong>Tổng mua</Typography.Text>}
                                    value={this.handle_total(this.state.data_purchases)}
                                    valueStyle={{ color: '#0f0f0f' }}
                                    prefix={<ShoppingCartOutlined />}
                                    suffix="lượt"
                                />
                                <Statistic
                                    title={
                                        <>
                                            {type_menu == 'week' &&
                                                <Typography.Text className='text-blue-600' strong>So với tuần trước</Typography.Text>}
                                            {type_menu == 'month' &&
                                                <Typography.Text className='text-blue-600' strong>So với tháng trước</Typography.Text>}
                                            {type_menu == 'year' &&
                                                <Typography.Text className='text-blue-600' strong>So với năm trước</Typography.Text>}
                                        </>
                                    }
                                    value={8.28}
                                    valueStyle={{ color: '#00b01d' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                            <div className='flex justify-between space-x-[5px]'>

                                <Statistic
                                    title={<Typography.Text className='text-blue-600' strong>Tỉ lệ mua đạt</Typography.Text>}
                                    value={((this.handle_total(this.state.data_purchases) / this.handle_total(this.state.data_visits)) * 100).toFixed(2)}
                                    valueStyle={{ color: '#0f0f0f' }}
                                    suffix="%"
                                />
                                <Statistic
                                    title={
                                        <>
                                            {type_menu == 'week' &&
                                                <Typography.Text className='text-blue-600' strong>So với tuần trước</Typography.Text>}
                                            {type_menu == 'month' &&
                                                <Typography.Text className='text-blue-600' strong>So với tháng trước</Typography.Text>}
                                            {type_menu == 'year' &&
                                                <Typography.Text className='text-blue-600' strong>So với năm trước</Typography.Text>}
                                        </>
                                    }
                                    value={20.28}
                                    valueStyle={{ color: '#f60000' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='lg:grid lg:grid-cols-3 border-b py-[10px] gap-[20px]'>
                        <div className='col-span-2'>
                            <div className='space-y-[10px]'>
                                <Typography.Text className='text-blue-600' strong>Biểu đồ cột lượt xem</Typography.Text>
                                <Bar data={{
                                    labels: this.state.labels,
                                    datasets: [
                                        {
                                            label: 'Lượt xem',
                                            backgroundColor: '#36a2eb',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            borderWidth: 1,
                                            data: this.state.data_visits,
                                        },
                                    ],
                                }} options={option_visit_purchase} />
                            </div>
                        </div>
                        <div className='space-y-[10px] w-full'>
                            <div className='flex justify-between space-x-[5px] py-[10px] border-b'>
                                <Statistic
                                    title={<Typography.Text className='text-blue-600' strong>Tổng lượt xem</Typography.Text>}
                                    value={this.handle_total(this.state.data_visits)}
                                    valueStyle={{ color: '#0f0f0f' }}
                                    prefix={<EyeOutlined />}
                                    suffix="lượt"
                                />
                                <Statistic
                                    title={
                                        <>
                                            {type_menu == 'week' &&
                                                <Typography.Text className='text-blue-600' strong>So với tuần trước</Typography.Text>}
                                            {type_menu == 'month' &&
                                                <Typography.Text className='text-blue-600' strong>So với tháng trước</Typography.Text>}
                                            {type_menu == 'year' &&
                                                <Typography.Text className='text-blue-600' strong>So với năm trước</Typography.Text>}
                                        </>
                                    }
                                    value={11.28}
                                    valueStyle={{ color: '#00b01d' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                            <div className='space-y-[10px]'>
                                <Typography.Text className='text-blue-600' strong>Top lượt xem</Typography.Text>
                                <List itemLayout="horizontal" size='small'
                                    dataSource={this.state.data_top_visits}
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
                                <Typography.Text className='text-blue-600' strong>Biểu đồ cột lượt mua</Typography.Text>
                                <Bar data={{
                                    labels: this.state.labels,
                                    datasets: [
                                        {
                                            label: 'Lượt mua',
                                            backgroundColor: '#04b817',
                                            borderColor: '#018a10',
                                            borderWidth: 1,
                                            data: this.state.data_purchases,
                                        },
                                    ],
                                }} options={option_visit_purchase} />
                            </div>
                        </div>
                        <div className='space-y-[10px] w-full'>
                            <div className='flex justify-between space-x-[5px] py-[10px] border-b'>
                                <Statistic
                                    title={<Typography.Text className='text-blue-600' strong>Tổng lượt mua</Typography.Text>}
                                    value={this.handle_total(this.state.data_purchases)}
                                    valueStyle={{ color: '#0f0f0f' }}
                                    prefix={<ShoppingCartOutlined />}
                                    suffix="lượt"
                                />
                                <Statistic
                                    title={
                                        <>
                                            {type_menu == 'week' &&
                                                <Typography.Text className='text-blue-600' strong>So với tuần trước</Typography.Text>}
                                            {type_menu == 'month' &&
                                                <Typography.Text className='text-blue-600' strong>So với tháng trước</Typography.Text>}
                                            {type_menu == 'year' &&
                                                <Typography.Text className='text-blue-600' strong>So với năm trước</Typography.Text>}
                                        </>
                                    }
                                    value={8.28}
                                    valueStyle={{ color: '#00b01d' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                            <div className='space-y-[10px]'>
                                <Typography.Text className='text-blue-600' strong>Top lượt mua</Typography.Text>
                                <List itemLayout="horizontal" size='small'
                                    dataSource={this.state.data_top_purchases}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(card_visit_purchase));