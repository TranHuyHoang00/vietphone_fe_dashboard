import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Typography, Radio, Select, Space, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { AiOutlineCheck } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa6";
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: props.dataFilter,
            typeActive: props.typeActive,
        }
    }
    async componentDidMount() {
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
    onChangeListShopId = async (listShopId) => {
        await this.onChangeTypeActive(listShopId, 'listShopId');
        const { dataStaffs } = this.props;
        const listStaffId = dataStaffs
            .filter(item => listShopId.includes(item?.shop?.id))
            .map(item => item?.id);
        await this.onChangeTypeActive(listStaffId, 'listId');

    }
    onChangeTime = (date) => {
        const startOfWeek = dayjs(date).startOf('week').format('YYYY-MM-DD');;
        const endOfWeek = dayjs(date).endOf('week').format('YYYY-MM-DD');;
        this.setState({
            dataFilter: {
                start: startOfWeek,
                end: endOfWeek,
            }
        })
    };
    render() {
        const { openDrawer, drawerFilter, dataStaffs, dataShops, disabledAcceptFilter, handleFilter } = this.props;
        const { typeActive, dataFilter } = this.state;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>
                            Loại xem
                            <Typography.Text type="danger" strong> *</Typography.Text>
                        </Typography.Text>
                        <Radio.Group buttonStyle="solid"
                            value={typeActive?.typeView} onChange={(event) => this.onChangeTypeActive(event.target.value, 'typeView')} className='flex'>
                            <Radio.Button value="all">Tất cả</Radio.Button>
                            <Radio.Button value="individual">Riêng</Radio.Button>
                            <Radio.Button value="shop">Cửa hàng</Radio.Button>
                        </Radio.Group>
                    </div>
                    {typeActive?.typeView === "individual" &&
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Danh sách nhân viên
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                value={typeActive?.listId}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => this.onChangeTypeActive(value, 'listId')}
                                options={dataStaffs && dataStaffs?.map((item) => ({
                                    label: item?.name,
                                    value: item?.id,
                                }))}
                            />
                        </div>
                    }
                    {typeActive?.typeView === "shop" &&
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Danh sách cửa hàng
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                value={typeActive?.listShopId}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => this.onChangeListShopId(value)}
                                options={dataShops && dataShops?.map((item) => ({
                                    label: item?.name,
                                    value: item?.id,
                                }))}
                            />
                        </div>
                    }
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>
                            Thời gian (Tuần)
                            <Typography.Text type="danger" strong> *</Typography.Text>
                        </Typography.Text>
                        <div><DatePicker value={dayjs(dataFilter?.start)} allowClear={false}
                            onChange={(date) => this.onChangeTime(date)} picker="week" /></div>
                    </div>
                    <Button disabled={disabledAcceptFilter}
                        onClick={() => handleFilter(dataFilter, typeActive)}
                        className='bg-[#0e97ff] dark:bg-white'>
                        <Space className='text-white dark:text-black'>
                            {disabledAcceptFilter ? <FaSpinner className='animate-spin' /> : <AiOutlineCheck />}
                            {disabledAcceptFilter ? 'Đang tải' : 'Áp dụng'}
                        </Space>
                    </Button>
                </Space>
            </Drawer>
        );
    }

}
export default withRouter(index);