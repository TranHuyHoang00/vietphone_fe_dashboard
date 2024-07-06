import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Typography, Card, message, Collapse, Select } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
import { createTargetProductCategory } from '@services/target/targetProductCategoryServices';
import { showNotification } from '@utils/handleFuncNotification';
import { getListTargetStaff } from '@services/target/targetStaffServices';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
            dataTPCs: [],
            newDataStaffs: [],
            listSelectedStaffId: [],
        }
    }
    async componentDidMount() {
        const { getListProductCategory, getListStaff, setDataTargetStaff } = this.props;
        const { dataFilter } = this.state;
        await getListProductCategory(dataFilter);
        await getListStaff(dataFilter);
        await setDataTargetStaff({ month: this.props.dataFilter.month });
        await this.handleGetListTargetStaff({ page: 1, limit: 100, month: this.props.dataFilter.month });
    }
    handleGetListTargetStaff = async (dataFilter) => {
        try {
            const data = await getListTargetStaff(dataFilter);
            const { dataStaffs } = this.props;
            if (data && data.data && data.data.success === 1) {
                const dataTargetStaffs = data.data.data.staff_monthly_target;
                this.getDataStaffs(dataStaffs, dataTargetStaffs);
            }
        } catch (error) {
            console.warn(error);
        }
    }
    handleOnchangeInput = (itemValue, itemVariable, item) => {
        const { dataTPCs } = this.state;
        const dataIndex = dataTPCs.findIndex(data => data.product_category === item.id);
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
            const newDataTPC = { product_category: item.id, name: item.name, [itemVariable]: itemValue };
            this.setState({ dataTPCs: [...dataTPCs, newDataTPC] });
        }
    }
    validationData = (data) => {
        const { listSelectedStaffId } = this.state;
        if (listSelectedStaffId && listSelectedStaffId.length === 0) {
            return { mess: "Không được bỏ trống 'Cửa hàng' ", check: false };
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
        let newDataTPCs = [];
        for (const item of dataTPCs) {
            const newTPCId = await this.handleCreateTPC(item);
            if (newTPCId) { newDataTPCs.push(newTPCId); }
        }
        return newDataTPCs;
    }
    handleCreate = async () => {
        const { dataTargetStaff, createTargetStaff, openModal, getListTargetStaff, dataFilter
        } = this.props;
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
        const dataSelected = dataTPCs.find(data => data.product_category === item.id);
        switch (itemVariable) {
            case 'value':
                return dataSelected?.value;
            case 'quantity':
                return dataSelected?.quantity;
            default:
                break;
        }
    }
    getDataStaffs = (dataStaffs, dataTargetStaffs) => {
        let targetStaffIds = dataTargetStaffs.map(item => item?.staff?.id);
        const newDataStaffs = dataStaffs.filter(staff => !targetStaffIds.includes(staff?.id));
        this.setState({ newDataStaffs: newDataStaffs })
    }
    onChangeTime = async (value) => {
        const { onChangeTargetStaff, onChangePage } = this.props;
        await onChangePage(value, 'month');
        await onChangeTargetStaff(value, 'month');
        await this.handleGetListTargetStaff({ page: 1, limit: 100, month: value });
    }
    handleOnChangeSelect = (value) => {
        this.setState({ listSelectedStaffId: value });
    };
    render() {
        const { Text } = Typography;
        const { isLoadingTargetStaff, isLoadingProductCategory, isLoadingStaff,
            onChangeTargetStaff, modalCreate, openModal,
            dataTargetStaff, dataProductCategorys, dataFilter
        } = this.props;
        const { newDataStaffs } = this.state;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={500}
                maskClosable={!isLoadingTargetStaff}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoadingTargetStaff} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoadingTargetStaff || isLoadingProductCategory || isLoadingStaff}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Text italic strong>Nhân viên<Text type="danger" strong> *</Text></Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => this.handleOnChangeSelect(value)}
                                options={newDataStaffs && newDataStaffs.map((item) => ({
                                    label: item?.user.full_name,
                                    value: item.id,
                                }))}
                            />
                        </div>
                        <div className='space-y-[10px]'>
                            <div className='flex items-center justify-center space-x-[5px]'>
                                <div className='space-y-[3px]'>
                                    <Text italic strong>
                                        Thời gian
                                        <Text type="danger" strong> *</Text>
                                    </Text>
                                    <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="month" value={dayjs(dataFilter?.month).format('YYYY-MM')}
                                        onChange={(event) => this.onChangeTime(dayjs(event.target.value).startOf('month').format('YYYY-MM-DD'))} />
                                </div>
                                <div className='space-y-[3px]'>
                                    <Text italic strong>
                                        Target
                                        <Text type="danger" strong> *</Text>
                                    </Text>
                                    <input onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                        className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="number" min="0"
                                        value={dataTargetStaff?.value}
                                        onChange={(event) => onChangeTargetStaff(event.target.value, 'value')} />
                                </div>
                            </div>
                            <Collapse size='small'>
                                <Collapse.Panel key={1} header="KPI SẢN PHẨM">
                                    <div className='space-y-[5px]'>
                                        {dataProductCategorys && dataProductCategorys.reverse().map((item, index) => {
                                            return (
                                                <Card key={item.id} title={`${item.name}`} size='small'>
                                                    <div className='flex items-center justify-center space-x-[5px]'>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Doanh thu</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={this.getValue('value', item)}
                                                                onChange={(event) => this.handleOnchangeInput(event.target.value, 'value', item)} />
                                                        </div>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Số lượng</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={this.getValue('quantity', item)}
                                                                onChange={(event) => this.handleOnchangeInput(event.target.value, 'quantity', item)} />
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
        isResultTargetStaff: state.targetStaff.isResult,

        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,
        isResultProductCategory: state.productCategory.isResult,

        dataStaffs: state.staff.dataStaffs,
        isLoadingStaff: state.staff.isLoading,
        isResultStaff: state.staff.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTargetStaff: (dataFilter) => dispatch(actions.getListTargetStaffRedux(dataFilter)),
        createTargetStaff: (data) => dispatch(actions.createTargetStaffRedux(data)),
        onChangeTargetStaff: (id, value) => dispatch(actions.onChangeTargetStaffRedux(id, value)),
        setDataTargetStaff: (data) => dispatch(actions.setDataTargetStaffRedux(data)),

        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),
        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));