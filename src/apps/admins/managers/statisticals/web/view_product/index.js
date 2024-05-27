import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Card, Radio, Typography, DatePicker, Spin, Image, Progress, Button, Space } from 'antd';
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.getData('day', new Date());
    }
    handleDay = (itemGroupButtonType, day) => {
        let start, end;
        switch (itemGroupButtonType) {
            case 'day':
                start = dayjs(day).format('YYYY-MM-DD');
                end = dayjs(day).format('YYYY-MM-DD');
                break;
            case 'month':
                start = (dayjs(day).startOf('month')).format('YYYY-MM-DD');
                end = (dayjs(day).endOf('month')).format('YYYY-MM-DD');
                break;
            case 'year':
                start = (dayjs(day).startOf('year')).format('YYYY-MM-DD');
                end = (dayjs(day).endOf('year')).format('YYYY-MM-DD');
                break;
            default:
                break;
        }
        return { start, end }
    }
    onChangeGroupButton = async (itemGroupButtonType) => {
        this.getData(itemGroupButtonType, new Date());
    }

    onChangeDayPicker = async (event, dayPicker) => {
        const { dataStatistical } = this.props;
        this.getData(dataStatistical.type, dayPicker);
    }
    getData = async (typeFilter, dayPicker) => {
        const { getViewProduct, dataStatistical, setDataStatistical } = this.props;
        const dataDay = this.handleDay(typeFilter, dayPicker);
        const newDataStatistical = {
            ...dataStatistical,
            start: dataDay.start,
            end: dataDay.end,
            type: typeFilter,
        };
        await setDataStatistical(newDataStatistical);
        await getViewProduct(newDataStatistical);

    }
    disabledDay = (current) => {
        return current && current > dayjs().endOf('day');
    };
    handleSumTotal = (data) => {
        return data.reduce((sum, item) => sum + (item?.view_count || 0), 0);
    }
    render() {
        const { dataViewProducts, dataStatistical, isLoading } = this.props;
        return (
            <div className='px-[10px]'>
                <Card title={`Top sản phẩm từ ${dataStatistical?.start} đến ${dataStatistical?.end}`}
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
                                        <Typography.Text className='text-blue-500 dark:text-white' strong>Top 10 sản phẩm xem nhiều</Typography.Text>
                                        <div className=''>
                                            {dataViewProducts && dataViewProducts.map((item, index) => {
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
                                                            <Progress percent={Math.round((item?.view_count / this.handleSumTotal(dataViewProducts)) * 100)} />

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
        dataViewProducts: state.statistical.dataViewProducts,
        dataStatistical: state.statistical.dataStatistical,
        isLoading: state.statistical.isLoading,
        isResult: state.statistical.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getViewProduct: (data) => dispatch(actions.getViewProductRedux(data)),
        setDataStatistical: (data) => dispatch(actions.setDataStatisticalRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));