import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Button, Spin, Typography, Select, Space } from 'antd';
import { create_customer } from '../../../../../services/customer_service';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_customer: {
                gender: true,
                activate: true,
            },
            is_loading: false,
            mask_closable: true,

        }
    }
    async componentDidMount() {
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_customer };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_customer: {
                ...copyState
            }
        });
    }
    handle_loading = (value) => {
        this.setState({
            is_loading: value,
            mask_closable: !value
        });
    }
    validation_phone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validation = (data) => {
        this.handle_loading(true);
        if (!data.full_name) {
            return { mess: "Không được bỏ trống 'Họ và tên' ", code: 1 };
        }
        if (!data.phone) {
            return { mess: "Không được bỏ trống 'Số điện thoại' ", code: 1 };
        }
        if (!this.validation_phone(data.phone)) {
            return { mess: "Số điện thoại sai định dạng", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_customer);
        if (result.code == 0) {
            try {
                let data = await create_customer(this.state.data_customer);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_customer();
                    this.props.open_Form("create", false);
                    this.setState({ data_customer: {} });
                    message.success("Thành công");
                } else {
                    message.error('Thất bại');
                }
            } catch (e) {
                message.error('Lỗi hệ thống');
            }
        } else {
            message.error(result.mess);
        }
        this.handle_loading(false);
    }
    render() {
        let data_customer = this.state.data_customer;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={this.state.mask_closable}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("create", false)}
                            className='bg-[#ed1e24] text-white'>
                            Hủy bỏ
                        </Button>
                        <Button disabled={this.state.is_loading} onClick={() => this.handle_create()}
                            className='bg-[#0e97ff] text-white'>
                            Xác nhận
                        </Button>
                    </>
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Họ và tên
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_customer.full_name}
                                onChange={(event) => this.handle_onchange_input(event, "full_name", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Số điện thoại
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_customer.phone}
                                onChange={(event) => this.handle_onchange_input(event, "phone", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Email</Typography.Text>
                            <Input value={data_customer.email}
                                onChange={(event) => this.handle_onchange_input(event, "email", 'input')} />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-[3px]'>
                                <div><Typography.Text italic strong>Giới tính</Typography.Text></div>
                                <Select style={{ width: 120 }} value={data_customer.gender}
                                    onChange={(event) => this.handle_onchange_input(event, "gender", 'select')}
                                    options={[
                                        { value: true, label: 'Nam' },
                                        { value: false, label: 'Nữ' },
                                    ]} />
                            </div>
                            <div className='space-y-[3px]'>
                                <div><Typography.Text italic strong>Trạng thái</Typography.Text></div>
                                <Select style={{ width: 120 }} value={data_customer.activate}
                                    onChange={(event) => this.handle_onchange_input(event, "activate", 'select')}
                                    options={[
                                        { value: true, label: 'Mở' },
                                        { value: false, label: 'Khóa' },
                                    ]} />
                            </div>
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_create);