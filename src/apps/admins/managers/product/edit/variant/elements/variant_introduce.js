import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Input, Typography, Select } from 'antd';
import { textLine13 } from '@components/displays/line13';
import { formatMoney } from '@utils/handleFuncFormat';
class variant_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate() {
    }
    render() {
        let dataVariant = this.props.dataVariant;
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
                                <Input disabled={!this.props.isEdit} value={dataVariant.name}
                                    onChange={(event) => this.props.on_change_variant(event.target.value, 'name')} />
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Giá gốc</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!this.props.isEdit} value={this.props.isEdit ? (dataVariant.regular_price) : formatMoney(dataVariant.regular_price)}
                                    onChange={(event) => this.props.on_change_variant(event.target.value, 'regular_price')} />
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Giá KM</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!this.props.isEdit} value={this.props.isEdit ? (dataVariant.discount_price) : formatMoney(dataVariant.discount_price)}
                                    onChange={(event) => this.props.on_change_variant(event.target.value, 'discount_price')} />
                            </div>
                        </div>
                        {textLine13('Số lượng', `${dataVariant.quantity} cái`)}
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <Typography.Text type="secondary">Trạng thái</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Select disabled={!this.props.isEdit} style={{ width: '100%' }} value={dataVariant.is_active}
                                    onChange={(event) => this.props.on_change_variant(event, 'is_active')}
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
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_variant: (event, id) => dispatch(actions.on_change_variant_redux(event, id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_introduce));
