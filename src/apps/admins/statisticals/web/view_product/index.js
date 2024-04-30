import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Card, Radio, Typography, Statistic, List, DatePicker, Spin, Avatar, Image, Progress, Tag, Button, Space } from 'antd';
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
            data_top_view_product: [],
        }
    }
    async componentDidMount() {
        let data_day = this.handle_day('day', new Date());
        let data_statistical = this.props.data_statistical;
        data_statistical.start = data_day.start;
        data_statistical.end = data_day.end;
        await this.props.set_statistical(data_statistical);
        await this.props.get_view_product(data_statistical);
    }

    handle_day = (type_menu, day) => {
        let start, end;
        if (type_menu === 'day') {
            start = dayjs(day).format('YYYY-MM-DD');
            end = dayjs(day).format('YYYY-MM-DD');
        }
        if (type_menu === 'month') {
            start = (dayjs(day).startOf('month')).format('YYYY-MM-DD');
            end = (dayjs(day).endOf('month')).format('YYYY-MM-DD');
        }
        if (type_menu === 'year') {
            start = (dayjs(day).startOf('year')).format('YYYY-MM-DD');
            end = (dayjs(day).endOf('year')).format('YYYY-MM-DD');
        }

        return { start, end }
    }
    onchange_menu = async (type_menu) => {
        let data_statistical = this.props.data_statistical;
        let data_day = this.handle_day(type_menu, new Date());
        data_statistical.type = type_menu;
        data_statistical.start = data_day.start;
        data_statistical.end = data_day.end;
        this.props.set_statistical(data_statistical);
        await this.props.get_view_product(data_statistical);
    }

    onchange_daypicker = async (event, day_picker) => {
        let data_statistical = this.props.data_statistical;
        let data_day = this.handle_day(data_statistical.type, day_picker);
        data_statistical.start = data_day.start;
        data_statistical.end = data_day.end;
        await this.props.get_view_product(data_statistical);
    }
    disabled_day = (current) => {
        return current && current > dayjs().endOf('day');
    };
    handle_sum_total = (data) => {
        let sum = 0;
        for (const item of data) {
            sum += item?.view_count;
        }
        return sum
    }
    render() {
        let data_view_products = this.props.data_view_products;
        let data_statistical = this.props.data_statistical;
        return (
            <div className='px-[10px]'>
                <Card title={`Top sản phẩm từ ${data_statistical?.start} đến ${data_statistical?.end}`}
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
                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Top 10 sản phẩm xem nhiều</Typography.Text>
                                        <div className=''>
                                            {data_view_products && data_view_products.map((item, index) => {
                                                return (
                                                    <div key={item?.product?.id} className='flex items-center space-x-[5px] border-b py-[10px] '>
                                                        <div>
                                                            <Image src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png'
                                                                className="object-cover" width={80} height={80} />
                                                        </div>
                                                        <div className='flex-1'>
                                                            <div className='line-clamp-1'>
                                                                <Typography.Text className='text-black dark:text-white'>{item?.product?.name}</Typography.Text>
                                                            </div>
                                                            <Progress percent={Math.round((item?.view_count / this.handle_sum_total(data_view_products)) * 100)} />

                                                            <div className='flex items-center justify-between'>
                                                                <Button className='text-black dark:text-white border border-black dark:border-white cursor-default' size='small'>
                                                                    <Space>
                                                                        <EyeOutlined />
                                                                        {item.view_count}
                                                                    </Space>
                                                                </Button>
                                                                <div className='space-x-[5px]'>
                                                                    <Button
                                                                        className='text-black dark:text-white border border-black dark:border-white w-[60px]' size='small'>
                                                                        Web
                                                                    </Button>
                                                                    <Button onClick={() => this.props.history.push(`/admin/manager/product/edit/${item?.product?.id}`)}
                                                                        className='text-black dark:text-white border border-black dark:border-white w-[60px]' size='small'>
                                                                        Admin
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
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
        data_view_products: state.statistical.data_view_products,
        data_statistical: state.statistical.data_statistical,
        is_loading: state.statistical.is_loading,
        is_result: state.statistical.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_view_product: (data) => dispatch(actions.get_view_product_redux(data)),
        set_statistical: (data) => dispatch(actions.set_statistical_redux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));