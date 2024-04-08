import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Collapse, Spin } from 'antd';
import { format_money } from '../../../../../utils/format_money';
import { text_line_1_3 } from '../../../components/displays/data_line_1_3';
import { format_day } from '../../../../../utils/format_day';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_order = this.props.data_order;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="CHI TIẾT" open={this.props.modal_detail}
                onCancel={() => this.props.open_modal("detail", false)} width={600}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <Spin spinning={is_loading}>
                    <Collapse defaultActiveKey={1}>
                        <Collapse.Panel header="THÔNG TIN KHÁCH HÀNG" key="1">
                            <div className='space-y-[5px]'>
                                {text_line_1_3('Họ và tên', (data_order.user && data_order.user.full_name))}
                                {text_line_1_3('Số điện thoại', (data_order.user && data_order.user.phone))}
                                {text_line_1_3('Email', (data_order.email))}
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="THÔNG TIN ĐƠN HÀNG" key="2">
                            <div className='space-y-[5px]'>
                                {text_line_1_3('Mã đơn hàng', (data_order.code))}
                                {text_line_1_3('Trạng thái', (data_order.status))}
                                {text_line_1_3('Tổng tiền', format_money(data_order.total))}
                                {text_line_1_3('Khấu trừ', format_money(data_order.total_discount))}
                                {text_line_1_3('Địa chỉ giao', (data_order.shipping_address))}
                                {text_line_1_3('Ngày tạo', format_day(data_order.created_at))}
                                {text_line_1_3('Nguồn', (data_order.source))}
                                {data_order.order_lines && data_order.order_lines.map((item, index) => {
                                    return (
                                        <Collapse key={item.id}>
                                            <Collapse.Panel header={`${item.product_name}`} key="1">
                                                {text_line_1_3('ID', (item.id))}
                                                {text_line_1_3('Số lượng', (item.quantity))}
                                                {text_line_1_3('Giá tiền', format_money(item.price))}
                                                {text_line_1_3('Giá trị chiết khấu', format_money(item.discount_value))}
                                                {text_line_1_3('Giá trị chiết khấu', format_money(item.discount_value))}
                                                {text_line_1_3('Tỉ lệ chiết khấu', `${(item.discount_rate)} %`)}
                                                {text_line_1_3('Số tiền chiết khấu', format_money(item.discount_amount))}

                                            </Collapse.Panel>
                                        </Collapse>
                                    )
                                })}


                            </div>
                        </Collapse.Panel>

                    </Collapse>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_order: state.order.data_order,
        is_loading: state.order.is_loading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));