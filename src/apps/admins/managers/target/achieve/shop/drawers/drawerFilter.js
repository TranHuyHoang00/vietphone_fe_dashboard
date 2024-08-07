import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography, Radio, Button, Select } from 'antd';
import dayjs from 'dayjs';
import { AiOutlineCheck } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa6";
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: {},
            typeActive: {},
        }
    }
    async componentDidMount() {
        const newDataFilter = {
            ...this.props.dataFilter,
            ...this.state.dataFilter,
        }
        const newTypeActive = {
            ...this.props.typeActive,
            ...this.state.typeActive,
        }
        this.setState({
            dataFilter: newDataFilter,
            typeActive: newTypeActive,
        });
    }
    onChangeDataFilter = async (value, id) => {
        const { dataFilter } = this.state;
        let copyState = { ...dataFilter };
        copyState[id] = value;
        this.setState({
            dataFilter: {
                ...copyState
            }
        });
    }
    onChangeTypeActive = async (value, id) => {
        const { typeActive } = this.state;
        let copyState = { ...typeActive };
        copyState[id] = value;
        this.setState({
            typeActive: {
                ...copyState
            }
        });
    }
    onChangeInputMonth = async (date) => {
        if (dayjs(date).isSame(dayjs(), 'month')) {
            await this.onChangeDataFilter(dayjs(date).startOf('month').format('YYYY-MM-DD HH:mm:ss'), 'start');
            await this.onChangeDataFilter(dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'), 'end');
        } else {
            await this.onChangeDataFilter(dayjs(date).startOf('month').format('YYYY-MM-DD HH:mm:ss'), 'start');
            await this.onChangeDataFilter(dayjs(date).endOf('month').format('YYYY-MM-DD HH:mm:ss'), 'end');
        }
    }
    onChangeTypeTime = (value) => {
        const { dataFilter } = this.state;
        if (value === 'month') {
            this.onChangeInputMonth(dataFilter?.start);
        }
        this.onChangeTypeActive(value, 'typeTime')
    }
    render() {
        const { openDrawer, drawerFilter, handleFilter, dataShops, disabledAcceptFilter } = this.props;
        const { dataFilter, typeActive } = this.state;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>
                            Kiểu xem
                            <Typography.Text type="danger" strong> *</Typography.Text>
                        </Typography.Text>
                        <Radio.Group buttonStyle="solid"
                            value={typeActive?.typeTable} onChange={(event) => this.onChangeTypeActive(event.target.value, 'typeTable')} className='flex'>
                            <Radio.Button value="overview">Tổng quan</Radio.Button>
                            <Radio.Button value="detail">Chi tiết</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>
                            Loại xem
                            <Typography.Text type="danger" strong> *</Typography.Text>
                        </Typography.Text>
                        <Radio.Group buttonStyle="solid"
                            value={typeActive?.typeView} onChange={(event) => this.onChangeTypeActive(event.target.value, 'typeView')} className='flex'>
                            <Radio.Button value="all">Tất cả</Radio.Button>
                            <Radio.Button value="individual">Riêng</Radio.Button>
                        </Radio.Group>
                    </div>
                    {typeActive?.typeView === "individual" &&
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Danh sách cửa hàng
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                value={typeActive?.listId}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => this.onChangeTypeActive(value, 'listId')}
                                options={dataShops && dataShops.map((item) => ({
                                    label: item?.name,
                                    value: item?.id,
                                }))}
                            />
                        </div>
                    }
                    {typeActive?.typeView && <>
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Kiểu thời gian
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Radio.Group buttonStyle="solid"
                                value={typeActive?.typeTime} onChange={(event) => this.onChangeTypeTime(event.target.value)} className='flex'>
                                <Radio.Button value="month">Tháng</Radio.Button>
                                <Radio.Button value="date">Ngày</Radio.Button>
                            </Radio.Group>
                        </div>
                        {typeActive?.typeTime && <>
                            {typeActive?.typeTime === 'month' &&
                                <div className='space-y-[2px]'>
                                    <Typography.Text strong>
                                        Thời gian (tháng)
                                        <Typography.Text type="danger" strong> *</Typography.Text>
                                    </Typography.Text>
                                    <div>
                                        <input className='border w-full h-[35px] px-[5px]'
                                            type="month" value={dayjs(dataFilter?.end).format('YYYY-MM')}
                                            onChange={(event) => this.onChangeInputMonth(event.target.value)}
                                            max={dayjs().format('YYYY-MM')} />
                                    </div>
                                </div>
                            }
                            {typeActive?.typeTime === 'date' && <>
                                <div className='space-y-[2px]'>
                                    <Typography.Text strong>
                                        Ngày bắt đầu
                                        <Typography.Text type="danger" strong> * <small>(cùng tháng - năm)</small></Typography.Text>
                                    </Typography.Text>
                                    <div>
                                        <input type='date' className='border w-full h-[35px] px-[5px]' required
                                            value={dayjs(dataFilter?.start).format('YYYY-MM-DD')}
                                            onChange={(event) => this.onChangeDataFilter(dayjs(event.target.value).startOf('day').format('YYYY-MM-DD HH:mm:ss'), 'start')} />
                                    </div>
                                </div>
                                <div className='space-y-[2px]'>
                                    <Typography.Text strong>
                                        Ngày kết thúc
                                        <Typography.Text type="danger" strong> * <small>(cùng tháng - năm)</small></Typography.Text>
                                    </Typography.Text>
                                    <div>
                                        <input type='date' className='border w-full h-[35px] px-[5px]' required
                                            value={dayjs(dataFilter?.end).format('YYYY-MM-DD')}
                                            onChange={(event) => this.onChangeDataFilter(dayjs(event.target.value).endOf('day').format('YYYY-MM-DD HH:mm:ss'), 'end')} />
                                    </div>
                                </div>
                            </>}
                            <Button disabled={disabledAcceptFilter}
                                onClick={() => handleFilter(dataFilter, typeActive)}
                                className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    {disabledAcceptFilter ? <FaSpinner className='animate-spin' /> : <AiOutlineCheck />}
                                    {disabledAcceptFilter ? 'Đang tải' : 'Áp dụng'}
                                </Space>
                            </Button>
                        </>}

                    </>}

                </Space>
            </Drawer>
        );
    }

}
export default withRouter(index);