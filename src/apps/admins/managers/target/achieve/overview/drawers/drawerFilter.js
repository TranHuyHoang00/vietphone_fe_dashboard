import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography, Radio, Button, Select } from 'antd';
import dayjs from 'dayjs';
import { AiOutlineCheck } from "react-icons/ai";
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: {
            },
        }
    }
    async componentDidMount() {
        const newDataFilter = {
            ...this.props.dataFilter,
            ...this.state.dataFilter,
        }
        this.setState({
            dataFilter: newDataFilter
        });
    }
    handleOnchangeInput = (value, id) => {
        const { dataFilter } = this.state;
        let copyState = { ...dataFilter };
        copyState[id] = value;
        this.setState({
            dataFilter: {
                ...copyState
            }
        });
    }
    onChangeInputMonth = async (date) => {
        if (dayjs(date).isSame(dayjs(), 'month')) {
            await this.handleOnchangeInput(dayjs(date).startOf('month').format('YYYY-MM-DD'), 'start');
            await this.handleOnchangeInput(dayjs().format('YYYY-MM-DD'), 'end');
        } else {
            await this.handleOnchangeInput(dayjs(date).startOf('month').format('YYYY-MM-DD'), 'start');
            await this.handleOnchangeInput(dayjs(date).endOf('month').format('YYYY-MM-DD'), 'end');
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
                            value={dataFilter?.type_object} onChange={(event) => this.handleOnchangeInput(event.target.value, 'type_object')} className='flex'>
                            <Radio.Button value="shop">Cửa hàng</Radio.Button>
                            <Radio.Button value="staff">Nhân viên</Radio.Button>
                        </Radio.Group>
                    </div>
                    {dataFilter?.type_object && <>
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Loại xem
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Radio.Group buttonStyle="solid"
                                value={dataFilter?.type_view} onChange={(event) => this.handleOnchangeInput(event.target.value, 'type_view')} className='flex'>
                                <Radio.Button value="all">Tất cả</Radio.Button>
                                <Radio.Button value="individual">Riêng</Radio.Button>
                            </Radio.Group>
                        </div>
                        {(dataFilter?.type_view === "individual" && dataFilter?.type_object === "shop") &&
                            <div className='space-y-[2px]'>
                                <Typography.Text strong>
                                    Danh sách cửa hàng
                                    <Typography.Text type="danger" strong> *</Typography.Text>
                                </Typography.Text>
                                <Select style={{ width: '100%' }} placement='bottomRight' mode='multiple'
                                    value={dataFilter?.list_id}
                                    onChange={(value) => this.handleOnchangeInput(value, 'list_id')}
                                    options={[
                                        { label: 'VIETPHONE 16', value: 1 },
                                        { label: 'VIETPHONE 21', value: 2 },
                                        { label: 'VIETPHONE 22', value: 3 },
                                        { label: 'VIETPHONE 29', value: 4 }
                                    ]} />
                            </div>
                        }
                        {dataFilter?.type_view === "individual" && dataFilter?.type_object === "staff" &&
                            <div className='space-y-[2px]'>
                                <Typography.Text strong>
                                    Danh sách nhân viên
                                    <Typography.Text type="danger" strong> *</Typography.Text>
                                </Typography.Text>
                                <Select style={{ width: '100%' }} placement='bottomRight' mode='multiple'
                                    options={[
                                        { label: 'Huy Hoàng', value: 1 },
                                        { label: 'Phúc Đại', value: 2 },
                                        { label: 'Trung An', value: 3 },
                                        { label: 'Đức Hải', value: 4 }
                                    ]} />
                            </div>
                        }
                        {dataFilter?.type_view && <>
                            <div className='space-y-[2px]'>
                                <Typography.Text strong>
                                    Kiểu thời gian
                                    <Typography.Text type="danger" strong> *</Typography.Text>
                                </Typography.Text>
                                <Radio.Group buttonStyle="solid"
                                    value={dataFilter?.type_time} onChange={(event) => this.handleOnchangeInput(event.target.value, 'type_time')} className='flex'>
                                    <Radio.Button value="month">Tháng</Radio.Button>
                                    <Radio.Button value="date">Ngày</Radio.Button>
                                </Radio.Group>
                            </div>
                            {dataFilter?.type_time && <>
                                {dataFilter?.type_time === 'month' &&
                                    <div className='space-y-[2px]'>
                                        <Typography.Text strong>
                                            Thời gian (tháng)
                                            <Typography.Text type="danger" strong> *</Typography.Text>
                                        </Typography.Text>
                                        <input className='border w-full h-[35px] px-[5px]'
                                            type="month" value={dayjs(dataFilter?.end).format('YYYY-MM')}
                                            onChange={(event) => this.onChangeInputMonth(event.target.value)}
                                            max={dayjs().format('YYYY-MM')} />
                                    </div>
                                }
                                {dataFilter?.type_time === 'date' && <>
                                    <div className='space-y-[2px]'>
                                        <Typography.Text strong>
                                            Ngày bắt đầu
                                            <Typography.Text type="danger" strong> * <small>(cùng tháng - năm)</small></Typography.Text>
                                        </Typography.Text>
                                        <input type='date' className='border w-full h-[35px] px-[5px]' required
                                            value={dayjs(dataFilter?.start).format('YYYY-MM-DD')}
                                            onChange={(event) => this.handleOnchangeInput(dayjs(event.target.value).format('YYYY-MM-DD'), 'start')} />
                                    </div>
                                    <div className='space-y-[2px]'>
                                        <Typography.Text strong>
                                            Ngày kết thúc
                                            <Typography.Text type="danger" strong> * <small>(cùng tháng - năm)</small></Typography.Text>
                                        </Typography.Text>
                                        <input type='date' className='border w-full h-[35px] px-[5px]' required
                                            value={dayjs(dataFilter?.end).format('YYYY-MM-DD')}
                                            onChange={(event) => this.handleOnchangeInput(dayjs(event.target.value).format('YYYY-MM-DD'), 'end')} />
                                    </div>
                                </>}
                                <Button onClick={() => handleFilter(dataFilter)}
                                    className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlineCheck />
                                        Xác nhận
                                    </Space>
                                </Button>
                            </>}

                        </>}
                    </>}

                </Space>
            </Drawer>
        );
    }

}
export default withRouter(index);