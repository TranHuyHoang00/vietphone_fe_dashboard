import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Drawer, Space, Typography, Radio, Spin } from 'antd';
import FormSelectSingle from '@components/selects/formSelectSingle';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100 }

        }
    }
    async componentDidMount() {
        const { getListStaffRole, getListShop } = this.props;
        const { dataFilter } = this.state;
        await getListStaffRole(dataFilter);
        await getListShop(dataFilter);
    }
    render() {
        const { dataFilter, openDrawer, drawerFilter, onChangePage, dataStaffRoles, isLoadingStaffRole,
            dataShops, isLoadingShop
        } = this.props;
        return (
            <Spin spinning={isLoadingShop || isLoadingStaffRole}>
                <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                    <Space direction='vertical'>
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>Trạng thái</Typography.Text>
                            <Radio.Group value={dataFilter.status} buttonStyle="solid"
                                onChange={(event) => onChangePage(event.target.value, 'status')} className='flex'>
                                <Radio.Button value="">Tất cả</Radio.Button>
                                <Radio.Button value="active">Mở</Radio.Button>
                                <Radio.Button value="inactive">Khóa</Radio.Button>
                            </Radio.Group>
                        </div>
                        <FormSelectSingle
                            name={'Phân quyền'} variable={'role'} value={dataFilter.role}
                            important={false} width={'100%'}
                            options={[
                                { label: 'Tất cả', value: '' },
                                ...dataStaffRoles && dataStaffRoles
                                    .map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    })),
                            ]}
                            onChangeInput={onChangePage} />
                        <FormSelectSingle
                            name={'Cửa hàng'} variable={'shop'} value={dataFilter.shop}
                            important={false} width={'100%'}
                            options={[
                                { label: 'Tất cả', value: '' },
                                ...dataShops && dataShops
                                    .map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    })),
                            ]}
                            onChangeInput={onChangePage} />
                        <FormSelectSingle
                            name={'Ca làm'} variable={'shift'} value={dataFilter.shift}
                            important={false} width={'100%'}
                            options={[
                                { label: 'Tất cả', value: '' },
                                { label: 'LÀM FULL', value: 'ft' },
                                { label: 'LÀM CA', value: 'pt' },
                            ]}
                            onChangeInput={onChangePage} />
                    </Space>
                </Drawer>
            </Spin>
        );
    }

}


const mapStateToProps = state => {
    return {
        dataStaffRoles: state.staffRole.dataStaffRoles,
        isLoadingStaffRole: state.staffRole.isLoading,

        dataShops: state.shop.dataShops,
        isLoadingShop: state.shop.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaffRole: (dataFilter) => dispatch(actions.getListStaffRoleRedux(dataFilter)),
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));