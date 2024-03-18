import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Input, Typography, Select, Collapse } from 'antd';
import { format_number } from '../../../../../utils/format_number';
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
                <Collapse defaultActiveKey={1}>
                    <Collapse.Panel header="THÔNG TIN KHÁCH HÀNG" key="1">
                        <div className='space-y-[5px]'>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Họ và tên</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text strong className='text-[#0574b8]'>: {data_order.user && data_order.user.full_name}</Typography.Text>
                                </div>
                            </div>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Số điện thoại</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text strong italic >: {data_order.user && data_order.user.phone}</Typography.Text>
                                </div>
                            </div>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Email</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text>: {data_order.email}</Typography.Text>
                                </div>
                            </div>
                        </div>
                    </Collapse.Panel>
                    <Collapse.Panel header="THÔNG TIN ĐƠN HÀNG" key="2">
                        <div className='space-y-[5px]'>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Mã đơn hàng</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text strong>: {data_order.code}</Typography.Text>
                                </div>
                            </div>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Trạng thái</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text>: {data_order.status}</Typography.Text>
                                </div>
                            </div>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Địa chỉ giao </Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text>: {data_order.shipping_address}</Typography.Text>
                                </div>
                            </div>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Tổng tiền</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text strong className='text-[#0574b8]'>: {format_number(data_order.total)} vnđ</Typography.Text>
                                </div>
                            </div>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Khấu trừ</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text strong className='text-red-600'>: {format_number(data_order.total_discount)} vnđ</Typography.Text>
                                </div>
                            </div>
                            <div className='flex gap-[5px]'>
                                <div className='w-1/3'>
                                    <Typography.Text className='text-gray-700'>Ngày tạo</Typography.Text>
                                </div>
                                <div className='w-2/3'>
                                    <Typography.Text>: {data_order.created_at}</Typography.Text>
                                </div>
                            </div>
                            {data_order.order_lines && data_order.order_lines.map((item, index) => {
                                return (
                                    <Collapse key={index}>
                                        <Collapse.Panel header={`${item.product_name}`} key="1">
                                            <div className='flex gap-[5px]'>
                                                <div className='w-1/3'>
                                                    <Typography.Text className='text-gray-700'>ID</Typography.Text>
                                                </div>
                                                <div className='w-2/3'>
                                                    <Typography.Text strong>: {item.id}</Typography.Text>
                                                </div>
                                            </div>
                                            <div className='flex gap-[5px]'>
                                                <div className='w-1/3'>
                                                    <Typography.Text className='text-gray-700'>Số lượng</Typography.Text>
                                                </div>
                                                <div className='w-2/3'>
                                                    <Typography.Text>: {item.quantity} cái</Typography.Text>
                                                </div>
                                            </div>
                                            <div className='flex gap-[5px]'>
                                                <div className='w-1/3'>
                                                    <Typography.Text className='text-gray-700'>Giá tiền</Typography.Text>
                                                </div>
                                                <div className='w-2/3'>
                                                    <Typography.Text strong className='text-[#0574b8]'>: {format_number(item.price)} vnđ</Typography.Text>
                                                </div>
                                            </div>
                                            <div className='flex gap-[5px]'>
                                                <div className='w-1/3'>
                                                    <Typography.Text className='text-gray-700'>Giá trị chiết khấu</Typography.Text>
                                                </div>
                                                <div className='w-2/3'>
                                                    <Typography.Text strong className='text-red-600'>: {format_number(item.discount_value)} vnđ</Typography.Text>
                                                </div>
                                            </div>
                                            <div className='flex gap-[5px]'>
                                                <div className='w-1/3'>
                                                    <Typography.Text className='text-gray-700'>Tỉ lệ chiết khấu</Typography.Text>
                                                </div>
                                                <div className='w-2/3'>
                                                    <Typography.Text strong className='text-red-600'>: {format_number(item.discount_rate)} %</Typography.Text>
                                                </div>
                                            </div>
                                            <div className='flex gap-[5px]'>
                                                <div className='w-1/3'>
                                                    <Typography.Text className='text-gray-700'>Số tiền chiết khấu</Typography.Text>
                                                </div>
                                                <div className='w-2/3'>
                                                    <Typography.Text strong className='text-red-600'>: {format_number(item.discount_amount)} vnđ</Typography.Text>
                                                </div>
                                            </div>
                                        </Collapse.Panel>
                                    </Collapse>
                                )
                            })}


                        </div>
                    </Collapse.Panel>

                </Collapse>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);