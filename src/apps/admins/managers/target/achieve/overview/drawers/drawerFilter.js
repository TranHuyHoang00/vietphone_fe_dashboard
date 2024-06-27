import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography, Radio, Button } from 'antd';
import dayjs from 'dayjs';
import { AiOutlineCheck } from "react-icons/ai";
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: {},
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.props;
        this.setState({ dataFilter: dataFilter });
    }
    onChangePage = async (pageValue, pageType) => {
        const { dataFilter } = this.state;
        let newDataFilter = { ...dataFilter };
        switch (pageType) {
            case 'type_time':
                newDataFilter.type_time = pageValue;
                break;
            case 'type_object':
                newDataFilter.type_object = pageValue;
                break;
            case 'start_time':
                newDataFilter.start_time = pageValue;
                break;
            case 'end_time':
                newDataFilter.end_time = pageValue;
                break;
            default:
                break;
        }
        this.setState({ dataFilter: newDataFilter })

    }
    onChangeInputMonth = async (date) => {
        if (dayjs(date).isSame(dayjs(), 'month')) {
            await this.onChangePage(dayjs(date).startOf('month').format('YYYY-MM-DD'), 'start_time');
            await this.onChangePage(dayjs().format('YYYY-MM-DD'), 'end_time');
        } else {
            await this.onChangePage(dayjs(date).startOf('month').format('YYYY-MM-DD'), 'start_time');
            await this.onChangePage(dayjs(date).endOf('month').format('YYYY-MM-DD'), 'end_time');
        }
    }
    render() {
        const { openDrawer, drawerFilter, handleFilter } = this.props;
        const { dataFilter } = this.state;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>
                            Kiểu đối tượng
                            <Typography.Text type="danger" strong> *</Typography.Text>
                        </Typography.Text>
                        <Radio.Group buttonStyle="solid"
                            value={dataFilter?.type_object} onChange={(event) => this.onChangePage(event.target.value, 'type_object')} className='flex'>
                            <Radio.Button value="shop">Cửa hàng</Radio.Button>
                            <Radio.Button value="staff">Nhân viên</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>
                            Kiểu thời gian
                            <Typography.Text type="danger" strong> *</Typography.Text>
                        </Typography.Text>
                        <Radio.Group buttonStyle="solid"
                            value={dataFilter?.type_time} onChange={(event) => this.onChangePage(event.target.value, 'type_time')} className='flex'>
                            <Radio.Button value="month">Tháng</Radio.Button>
                            <Radio.Button value="date">Ngày</Radio.Button>
                        </Radio.Group>
                    </div>
                    {dataFilter?.type_time === 'month' &&
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Thời gian (tháng)
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <input className='border w-full h-[35px] px-[5px]'
                                type="month" value={dayjs(dataFilter?.end_time).format('YYYY-MM')}
                                onChange={(event) => this.onChangeInputMonth(event.target.value)}
                                max={dayjs().format('YYYY-MM')} />
                        </div>
                    }
                    {dataFilter?.type_time === 'date' &&
                        <>
                            <div className='space-y-[2px]'>
                                <Typography.Text strong>
                                    Ngày bắt đầu
                                    <Typography.Text type="danger" strong> * <small>(cùng tháng - năm)</small></Typography.Text>
                                </Typography.Text>
                                <input type='date' className='border w-full h-[35px] px-[5px]' required
                                    value={dayjs(dataFilter?.start_time).format('YYYY-MM-DD')}
                                    onChange={(event) => this.onChangePage(dayjs(event.target.value).format('YYYY-MM-DD'), 'start_time')} />
                            </div>
                            <div className='space-y-[2px]'>
                                <Typography.Text strong>
                                    Ngày kết thúc
                                    <Typography.Text type="danger" strong> * <small>(cùng tháng - năm)</small></Typography.Text>
                                </Typography.Text>
                                <input type='date' className='border w-full h-[35px] px-[5px]' required
                                    value={dayjs(dataFilter?.end_time).format('YYYY-MM-DD')}
                                    onChange={(event) => this.onChangePage(dayjs(event.target.value).format('YYYY-MM-DD'), 'end_time')} />
                            </div>
                        </>
                    }
                    <Button onClick={() => handleFilter(dataFilter)}
                        className='bg-[#0e97ff] dark:bg-white'>
                        <Space className='text-white dark:text-black'>
                            <AiOutlineCheck />
                            Xác nhận
                        </Space>
                    </Button>
                </Space>
            </Drawer>
        );
    }

}
export default withRouter(index);