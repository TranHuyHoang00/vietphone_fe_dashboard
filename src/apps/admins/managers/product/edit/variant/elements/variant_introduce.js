import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Input, Typography, Select } from 'antd';
import { textLine13 } from '@components/displays/line13';
import { formatMoney } from '@utils/handleFuncFormat';
import FormSelectMultiple from '@components/selects/formSelectMultiple';
class variant_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
        }
    }
    async componentDidMount() {
        const { getListWarranty } = this.props;
        const { dataFilter } = this.state;
        await getListWarranty(dataFilter);
    }
    onSearch = (valueSearch, nameFormSelect) => {
        const { getListWarranty } = this.props;
        const { dataFilter } = this.state;
        let newDataFilter = {
            ...dataFilter,
            search: valueSearch,
        }
        switch (nameFormSelect) {
            case 'warranty':
                getListWarranty(newDataFilter)
                break;
            default:
                break;
        }
    }
    render() {
        const { dataVariant, onChangeVariant, isEdit, dataWarrantys, onChangeWarranty } = this.props;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Phiên bản" key="1">
                    {textLine13('Mã SKU', dataVariant.sku)}
                    {textLine13('Mã Barcode', dataVariant.barcode)}
                    <div className='space-y-[5px]'>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Tên phiên bản</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!isEdit} value={dataVariant.name}
                                    onChange={(event) => onChangeVariant(event.target.value, 'name')} />
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Giá gốc</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!isEdit} value={isEdit ? (dataVariant.regular_price) : formatMoney(dataVariant.regular_price)}
                                    onChange={(event) => onChangeVariant(event.target.value, 'regular_price')} />
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Giá KM</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!isEdit} value={isEdit ? (dataVariant.discount_price) : formatMoney(dataVariant.discount_price)}
                                    onChange={(event) => onChangeVariant(event.target.value, 'discount_price')} />
                            </div>
                        </div>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <Typography.Text type="secondary">Bảo hành</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <FormSelectMultiple width={'100%'} placeholder={'Tên bảo hành'}
                                    nameFormSelect={'warranty'}
                                    value={dataVariant?.warranty?.id ? dataVariant?.warranty?.id : dataVariant?.warranty}
                                    options={dataWarrantys.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!isEdit}
                                    disabledButtonCreate={true}
                                    disabledSearch={false}

                                    onSearch={this.onSearch}
                                    variableSelect={'warranty'}
                                    onChangeSelect={onChangeVariant}
                                    variableInputSearch={'name'}
                                    onChangeInput={onChangeWarranty}
                                // handleCreate={this.handleCreate}
                                />

                            </div>
                        </div>
                        {textLine13('Số lượng', `${dataVariant.quantity} cái`)}
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <Typography.Text type="secondary">Trạng thái</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Select disabled={!isEdit} style={{ width: '100%' }} value={dataVariant.is_active}
                                    onChange={(event) => onChangeVariant(event, 'is_active')}
                                    options={[
                                        { value: true, label: 'Mở' },
                                        { value: false, label: 'Khóa' },
                                    ]} />
                            </div>
                        </div>
                    </div>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        isEdit: state.variant.isEdit,
        dataVariant: state.variant.dataVariant,
        dataWarrantys: state.warranty.dataWarrantys,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onChangeVariant: (event, id) => dispatch(actions.onChangeVariantRedux(event, id)),
        getListWarranty: (dataFilter) => dispatch(actions.getListWarrantyRedux(dataFilter)),
        onChangeWarranty: (id, value) => dispatch(actions.onChangeWarrantyRedux(id, value)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_introduce));
