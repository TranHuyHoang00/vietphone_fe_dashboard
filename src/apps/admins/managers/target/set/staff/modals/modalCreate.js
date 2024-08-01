import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Typography, Card, message, Collapse, Select, Button } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
import { createTargetProductCategory } from '@services/target/targetProductCategoryServices';
import { showNotification } from '@utils/handleFuncNotification';
import FormSelectSingle from '@components/selects/formSelectSingle';
import { handleOnChangePage } from '@utils/handleFuncPage';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilterStaff: { page: 1, limit: process.env.REACT_APP_API_LIMIT, search: '', role: '', shift: '', shop: '', status: 'active' },
            dataTPCs: [
                {
                    target_product_category: 2,
                    name: "TỔNG PHỤ KIỆN",
                    value: "10000000",
                    quantity: 0
                },
                {
                    target_product_category: 4,
                    name: "TỔNG ĐIỆN THOẠI",
                    value: "0",
                    quantity: 10
                },
                {
                    target_product_category: 3,
                    name: "TỔNG ÂM THANH",
                    value: "25000000",
                    quantity: 0
                }
            ],
            newDataStaffs: [],
            listSelectedStaffId: [],
            dataFilter: { page: 1, limit: process.env.REACT_APP_API_LIMIT },

        }
    }
    async componentDidMount() {
        const { getListProductCategoryTarget, getListStaff, setDataTargetStaff, getListStaffRole, getListShop } = this.props;
        const { dataFilterStaff, dataFilter } = this.state;
        await getListProductCategoryTarget(dataFilter);
        await getListStaff(dataFilterStaff);
        await getListShop(dataFilter);
        await getListStaffRole(dataFilter);
        await setDataTargetStaff({ month: this.props.dataFilter.month });
        await this.getDataStaffRemaings(this.props.dataStaffs, this.props.dataTargetStaffs);
    }

    handleOnchangeInput = (itemValue, itemVariable, item) => {
        const { dataTPCs } = this.state;
        const dataIndex = dataTPCs.findIndex(data => data?.target_product_category === item?.id);
        if (dataIndex !== -1) {
            const updatedDataTPCs = dataTPCs.map((data, index) => {
                if (index === dataIndex) {
                    return {
                        ...data,
                        [itemVariable]: itemValue
                    };
                }
                return data;
            });
            this.setState({ dataTPCs: updatedDataTPCs });
        } else {
            const newDataTPC = { target_product_category: item.id, name: item.name, [itemVariable]: itemValue };
            this.setState({ dataTPCs: [...dataTPCs, newDataTPC] });
        }
    }
    validationData = (data) => {
        const { listSelectedStaffId } = this.state;
        if (listSelectedStaffId && listSelectedStaffId.length === 0) {
            return { mess: "Không được bỏ trống 'Nhân viên' ", check: false };
        }
        if (!data.month) {
            return { mess: "Không được bỏ trống 'Thời gian' ", check: false };
        }
        if (!data.value) {
            return { mess: "Không được bỏ trống 'Target' ", check: false };
        }
        return { check: true };
    }
    handleCreateTPC = async (item) => {
        try {
            const data = await createTargetProductCategory(item);
            if (data && data.data && data.data.success === 1) {
                return data.data.data.id;
            }
        } catch (error) {
            showNotification(error);
        }
    }
    handleDataTPCs = async (dataTPCs) => {
        const promises = dataTPCs.map(async (item) => {
            const newTPCId = await this.handleCreateTPC(item);
            return newTPCId;
        });
        const results = await Promise.all(promises);
        const newDataTPCs = results.filter(id => id != null);
        return newDataTPCs;
    }
    handleCreate = async () => {
        const { dataTargetStaff, createTargetStaff, openModal, getListTargetStaff, dataFilter } = this.props;
        const { dataTPCs } = this.state;
        const result = this.validationData(dataTargetStaff);
        if (result.check) {
            let newDataTargetStaff = { ...dataTargetStaff }
            const { listSelectedStaffId } = this.state;
            if (dataTPCs && dataTPCs.length !== 0) {
                const newDataTPCIds = await this.handleDataTPCs(dataTPCs);
                newDataTargetStaff.target_product_category = newDataTPCIds;
            }
            const promises = listSelectedStaffId.map(async staffId => {
                newDataTargetStaff.staff = staffId;
                return createTargetStaff(newDataTargetStaff);
            });
            await Promise.all(promises);
            message.success('Thành công');
            await getListTargetStaff(dataFilter);
            openModal("create", false);
        } else {
            message.error(result.mess);
        }
    }
    getValue = (itemVariable, item) => {
        const { dataTPCs } = this.state;
        const dataSelected = dataTPCs.find(data => data.target_product_category === item.id);
        switch (itemVariable) {
            case 'value':
                return dataSelected?.value;
            case 'quantity':
                return dataSelected?.quantity;
            default:
                break;
        }

    }

    getDataStaffRemaings = async (dataStaffs, dataTargetStaffs) => {
        const targetStaffIds = dataTargetStaffs.map(item => item?.staff?.id);
        const newDataStaffs = dataStaffs.filter(staff => !targetStaffIds.includes(staff?.id));
        this.setState({ newDataStaffs: newDataStaffs });
    }
    onChangeTime = async (value) => {
        const { onChangeTargetStaff, onChangePage } = this.props;
        await onChangePage(value, 'month');
        await onChangeTargetStaff(value, 'month');
        await this.getDataStaffRemaings(this.props.dataStaffs, this.props.dataTargetStaffs);
    }
    onChangePageForDataStaffs = async (pageValue, pageType) => {
        const { dataFilterStaff } = this.state;
        const { getListStaff } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilterStaff);
        const dataFilter = { ...newDataFilter, limit: 101 }
        this.setState({ dataFilterStaff: dataFilter });
        await getListStaff(dataFilter);
        await this.getDataStaffRemaings(this.props.dataStaffs, this.props.dataTargetStaffs);
    }
    render() {
        const { Text } = Typography;
        const { isLoadingTargetStaff, isLoadingProductCategoryTarget, isLoadingStaff,
            onChangeTargetStaff, modalCreate, openModal, dataStaffRoles, isLoadingStaffRole,
            dataTargetStaff, dataProductCategoryTargets, dataFilter, dataShops, isLoadingShop
        } = this.props;
        const { newDataStaffs, dataFilterStaff, listSelectedStaffId } = this.state;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoadingTargetStaff}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoadingTargetStaff} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoadingTargetStaff || isLoadingProductCategoryTarget || isLoadingStaff || isLoadingStaffRole || isLoadingShop}>
                    <div className="space-y-[10px]">
                        <FormSelectSingle name={'Cửa hàng'} variable={'shop'} value={dataFilterStaff?.shop}
                            important={false} width={'100%'}
                            options={[
                                { label: 'Tất cả', value: '' },
                                ...dataShops && dataShops
                                    .map((item) => ({
                                        label: item?.name,
                                        value: item?.id,
                                    })),
                            ]}
                            onChangeInput={this.onChangePageForDataStaffs} />
                        <FormSelectSingle name={'Phân quyền'} variable={'role'} value={dataFilterStaff?.role}
                            important={false} width={'100%'}
                            options={[
                                { label: 'Tất cả', value: '' },
                                ...dataStaffRoles && dataStaffRoles
                                    .map((item) => ({
                                        label: item?.name,
                                        value: item?.id,
                                    })),
                            ]}
                            onChangeInput={this.onChangePageForDataStaffs} />
                        <FormSelectSingle name={'Ca làm'} variable={'shift'} value={dataFilterStaff?.shift}
                            important={false} width={'100%'}
                            options={[
                                { label: 'Tất cả', value: '' },
                                { label: 'LÀM FULL', value: 'ft' },
                                { label: 'LÀM CA', value: 'pt' },
                            ]}
                            onChangeInput={this.onChangePageForDataStaffs} />
                        <div className='space-y-[3px]'>
                            <Text italic strong>Nhân viên<Text type="danger" strong> *</Text></Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                value={listSelectedStaffId}
                                onChange={(value) => this.setState({ listSelectedStaffId: value })}
                                options={newDataStaffs && newDataStaffs.map((item) => ({
                                    label: item?.name,
                                    value: item?.id,
                                }))}
                            />
                        </div>
                        <div className='space-y-[10px]'>
                            <div className='flex items-center justify-center space-x-[5px]'>
                                <div className='space-y-[3px]'>
                                    <Text italic strong>Thời gian<Text type="danger" strong> *</Text></Text>
                                    <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="month" value={dayjs(dataFilter?.month).format('YYYY-MM')}
                                        onChange={(event) => this.onChangeTime(dayjs(event.target.value).startOf('month').format('YYYY-MM-DD'))} />
                                </div>
                                <div className='space-y-[3px]'>
                                    <Text italic strong>Target<Text type="danger" strong> *</Text></Text>
                                    <input onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                        className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="number" min="0"
                                        value={dataTargetStaff?.value || ''}
                                        onChange={(event) => onChangeTargetStaff(event.target.value, 'value')} />
                                </div>
                            </div>
                            <Collapse defaultActiveKey={[1]} size='small' >
                                <Collapse.Panel key={1} header="KPI SẢN PHẨM"
                                    extra={<Button onClick={() => this.setState({ dataTPCs: [] })} className='bg-red-500 text-white'>Xóa</Button>}>
                                    <div className='space-y-[5px]'>
                                        {dataProductCategoryTargets && dataProductCategoryTargets.map((item, index) => {
                                            return (
                                                <Card key={index} title={`${item.name}`} size='small'>
                                                    <div className='flex items-center justify-center space-x-[5px]'>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Doanh thu</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={this.getValue('value', item) || ''}
                                                                disabled
                                                            //onChange={(event) => this.handleOnchangeInput(event.target.value, 'value', item)} 
                                                            />
                                                        </div>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Số lượng</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={this.getValue('quantity', item) || ''}
                                                                disabled
                                                            //onChange={(event) => this.handleOnchangeInput(event.target.value, 'quantity', item)} 
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </Collapse.Panel>
                            </Collapse>
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargetStaff: state.targetStaff.dataTargetStaff,
        dataTargetStaffs: state.targetStaff.dataTargetStaffs,
        isLoadingTargetStaff: state.targetStaff.isLoading,

        dataProductCategoryTargets: state.productCategoryTarget.dataProductCategoryTargets,
        isLoadingProductCategoryTarget: state.productCategoryTarget.isLoading,

        dataStaffs: state.staff.dataStaffs,
        isLoadingStaff: state.staff.isLoading,

        dataStaffRoles: state.staffRole.dataStaffRoles,
        isLoadingStaffRole: state.staffRole.isLoading,

        dataShops: state.shop.dataShops,
        isLoadingShop: state.shop.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTargetStaff: (dataFilter) => dispatch(actions.getListTargetStaffRedux(dataFilter)),
        createTargetStaff: (data) => dispatch(actions.createTargetStaffRedux(data)),
        onChangeTargetStaff: (id, value) => dispatch(actions.onChangeTargetStaffRedux(id, value)),
        setDataTargetStaff: (data) => dispatch(actions.setDataTargetStaffRedux(data)),

        getListProductCategoryTarget: (dataFilter) => dispatch(actions.getListProductCategoryTargetRedux(dataFilter)),
        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),

        getListStaffRole: (dataFilter) => dispatch(actions.getListStaffRoleRedux(dataFilter)),
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));