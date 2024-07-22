import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Drawer, Space, Typography, Radio, Select } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListStaff, getListShop } = this.props;
        await getListStaff({ page: 1, limit: process.env.REACT_APP_API_LIMIT, search: '', status: 'active' });
        await getListShop({ page: 1, limit: process.env.REACT_APP_API_LIMIT });
    }
    render() {
        const { dataFilter, openDrawer, drawerFilter, onChangePage, dataStaffs, dataShops } = this.props;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter?.status} onChange={(event) => onChangePage(event.target.value, 'status')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="success">Thành công</Radio.Button>
                            <Radio.Button value="unconfirmed">Chưa xác nhận</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Nguồn</Typography.Text>
                        <Radio.Group value={dataFilter?.source} onChange={(event) => onChangePage(event.target.value, 'source')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="sapo">Sapo</Radio.Button>
                            <Radio.Button value="web">Web</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Người tạo đơn</Typography.Text>
                        <div>
                            <Select style={{ width: '100%' }} showSearch
                                onSelect={(value) => onChangePage(value, 'staff')}
                                value={dataFilter?.staff}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    { label: 'Bỏ trống', value: '' },
                                    ...dataStaffs && dataStaffs
                                        .map((item) => ({
                                            label: item?.name,
                                            value: item?.id,
                                        })),
                                ]} />
                        </div>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Người bán</Typography.Text>
                        <div>
                            <Select style={{ width: '100%' }} showSearch
                                onSelect={(value) => onChangePage(value, 'assignee')}
                                value={dataFilter?.assignee}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    { label: 'Bỏ trống', value: '' },
                                    ...dataStaffs && dataStaffs
                                        .map((item) => ({
                                            label: item?.name,
                                            value: item?.id,
                                        })),
                                ]} />
                        </div>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Cửa hàng</Typography.Text>
                        <div>
                            <Select style={{ width: '100%' }} showSearch
                                onSelect={(value) => onChangePage(value, 'shop')}
                                value={dataFilter?.shop}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                options={[
                                    { label: 'Bỏ trống', value: '' },
                                    ...dataShops && dataShops
                                        .map((item) => ({
                                            label: item?.name,
                                            value: item?.id,
                                        })),
                                ]} />
                        </div>
                    </div>
                </Space>
            </Drawer>
        );
    }

}

const mapStateToProps = state => {
    return {
        dataStaffs: state.staff.dataStaffs,
        isLoadingStaff: state.staff.isLoading,

        dataShops: state.shop.dataShops,
        isLoadingShop: state.shop.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));