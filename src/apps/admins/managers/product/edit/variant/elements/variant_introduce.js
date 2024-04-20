import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Input, Typography } from 'antd';
import { text_line_1_3 } from '@components/displays/data_line_1_3';
import { format_money } from '@utils/format_money';
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
        let data_variant = this.props.data_variant;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Phiên bản" key="1">
                    {text_line_1_3('Mã SKU', data_variant.sku)}
                    {text_line_1_3('Mã Barcode', data_variant.barcode)}
                    <div className='space-y-[5px]'>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Tên phiên bản</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!this.props.is_edit} value={data_variant.name}
                                    onChange={(event) => this.props.on_change_variant(event.target.value, 'name')} />
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Giá gốc</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!this.props.is_edit} value={this.props.is_edit ? (data_variant.regular_price) : format_money(data_variant.regular_price)}
                                    onChange={(event) => this.props.on_change_variant(event.target.value, 'regular_price')} />
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Giá KM</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!this.props.is_edit} value={this.props.is_edit ? (data_variant.discount_price) : format_money(data_variant.discount_price)}
                                    onChange={(event) => this.props.on_change_variant(event.target.value, 'discount_price')} />
                            </div>
                        </div>
                        {text_line_1_3('Số lượng', `${data_variant.quantity} cái`)}
                    </div>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        is_edit: state.variant.is_edit,
        data_variant: state.variant.data_variant,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_variant: (event, id) => dispatch(actions.on_change_variant_redux(event, id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_introduce));
