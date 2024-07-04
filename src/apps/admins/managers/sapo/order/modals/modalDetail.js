import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Collapse, Spin } from 'antd';
import { formatMoney, formatDay } from '@utils/handleFuncFormat';
import { textLine13 } from '@components/displays/line13';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataOrder, isLoading, modalDetail, openModal } = this.props;
        return (
            <Modal title="CHI TIẾT" open={modalDetail}
                onCancel={() => openModal("detail", false)} width={600}
                footer={[
                    <Button onClick={() => openModal("detail", false)}
                        className='bg-[#e94138] text-white'>
                        Hủy bỏ
                    </Button>
                ]}>
                <Spin spinning={isLoading}>
                    <Collapse defaultActiveKey={1}>
                        <Collapse.Panel header="THÔNG TIN KHÁCH HÀNG" key="1">
                            <div className='space-y-[5px]'>
                                {textLine13('Họ và tên', (dataOrder.user && dataOrder.user.full_name))}
                                {textLine13('Số điện thoại', (dataOrder.user && dataOrder.user.phone))}
                                {textLine13('Email', (dataOrder.email))}
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="THÔNG TIN ĐƠN HÀNG" key="2">
                            <div className='space-y-[5px]'>
                                {textLine13('Mã đơn hàng', (dataOrder.code))}
                                {textLine13('Trạng thái', (dataOrder.status))}
                                {textLine13('Tổng tiền', formatMoney(dataOrder.total))}
                                {textLine13('Khấu trừ', formatMoney(dataOrder.total_discount))}
                                {textLine13('Địa chỉ giao', (dataOrder.shipping_address))}
                                {textLine13('Ngày tạo', formatDay(dataOrder.created_at))}
                                {textLine13('Nguồn', (dataOrder.source))}
                                {dataOrder.order_lines && dataOrder.order_lines.map((item, index) => {
                                    return (
                                        <Collapse key={item.id}>
                                            <Collapse.Panel header={`${item.product_name}`} key="1">
                                                {textLine13('ID', (item.id))}
                                                {textLine13('Số lượng', (item.quantity))}
                                                {textLine13('Giá tiền', formatMoney(item.price))}
                                                {textLine13('Giá trị chiết khấu', formatMoney(item.discount_value))}
                                                {textLine13('Giá trị chiết khấu', formatMoney(item.discount_value))}
                                                {textLine13('Tỉ lệ chiết khấu', `${(item.discount_rate)} %`)}
                                                {textLine13('Số tiền chiết khấu', formatMoney(item.discount_amount))}

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
        dataOrder: state.order.dataOrder,
        isLoading: state.order.isLoading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));