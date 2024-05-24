import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Collapse, Spin } from 'antd';
import { format_money } from '@utils/format_money';
import { textLine13 } from '@components/displays/line13';
import { format_day } from '@utils/format_day';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_order = this.props.data_order;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHI TIẾT" open={this.props.modalDetail}
                onCancel={() => this.props.openModal("detail", false)} width={600}
                footer={[
                    <>
                        <Button onClick={() => this.props.openModal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <Spin spinning={isLoading}>
                    <Collapse defaultActiveKey={1}>
                        <Collapse.Panel header="THÔNG TIN KHÁCH HÀNG" key="1">
                            <div className='space-y-[5px]'>
                                {textLine13('Họ và tên', (data_order.user && data_order.user.full_name))}
                                {textLine13('Số điện thoại', (data_order.user && data_order.user.phone))}
                                {textLine13('Email', (data_order.email))}
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="THÔNG TIN ĐƠN HÀNG" key="2">
                            <div className='space-y-[5px]'>
                                {textLine13('Mã đơn hàng', (data_order.code))}
                                {textLine13('Trạng thái', (data_order.status))}
                                {textLine13('Tổng tiền', format_money(data_order.total))}
                                {textLine13('Khấu trừ', format_money(data_order.total_discount))}
                                {textLine13('Địa chỉ giao', (data_order.shipping_address))}
                                {textLine13('Ngày tạo', format_day(data_order.created_at))}
                                {textLine13('Nguồn', (data_order.source))}
                                {data_order.order_lines && data_order.order_lines.map((item, index) => {
                                    return (
                                        <Collapse key={item.id}>
                                            <Collapse.Panel header={`${item.product_name}`} key="1">
                                                {textLine13('ID', (item.id))}
                                                {textLine13('Số lượng', (item.quantity))}
                                                {textLine13('Giá tiền', format_money(item.price))}
                                                {textLine13('Giá trị chiết khấu', format_money(item.discount_value))}
                                                {textLine13('Giá trị chiết khấu', format_money(item.discount_value))}
                                                {textLine13('Tỉ lệ chiết khấu', `${(item.discount_rate)} %`)}
                                                {textLine13('Số tiền chiết khấu', format_money(item.discount_amount))}

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
        isLoading: state.order.isLoading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));