import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Button, Spin, Typography, Select, Space, Steps } from 'antd';
import { create_product } from '../../../../../../services/product_service';
import Select_brand from './elements/select_brand';
import Select_tags from './elements/select_tags';
import Select_categories from './elements/select_categories';
import Select_images from './elements/select_images';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_product: {
                gender: true,
                activate: true,
            },
            is_loading: false,
            mask_closable: true,
            step_current: 0,
        }
    }
    async componentDidMount() {
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_product };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_product: {
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
        let result = this.validation(this.state.data_product);
        if (result.code == 0) {
            try {
                let data = await create_product(this.state.data_product);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_product();
                    this.props.open_modal("create", false);
                    this.setState({ data_product: {} });
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
    onclick_next = () => {
        let step_current = this.state.step_current;
        if (step_current < 3) {
            this.setState({
                step_current: step_current + 1,
            })
        }
    }
    onclick_pre = () => {
        let step_current = this.state.step_current;
        if (step_current > 0) {
            this.setState({
                step_current: step_current - 1,
            })
        }
    }
    render() {
        let data_product = this.state.data_product;
        console.log(this.state.step_current);
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={600}
                maskClosable={this.state.mask_closable}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("create", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                        <Button disabled={this.state.is_loading} onClick={() => this.handle_create()}
                            className='bg-[#0e97ff] text-white'>
                            Xác nhận
                        </Button>
                    </>
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className='space-y-[10px]'>
                        <div className='space-y-[10px]'>
                            <div className='space-y-[3px]'>
                                <Typography.Text italic strong>
                                    Tên sản phẩm
                                    <Typography.Text type="danger" strong> *</Typography.Text>
                                </Typography.Text>
                                <Input />
                            </div>
                            <div className='space-y-[3px]'>
                                <Typography.Text italic strong>Slug</Typography.Text>
                                <Input />
                            </div>
                            <div className='space-y-[3px]'>
                                <Typography.Text italic strong>Mô tả ngắn gọn</Typography.Text>
                                <Input.TextArea rows={3} />
                            </div>
                            <div className='flex flex-wrap gap-[10px] items-center justify-between'>
                                <Select_brand />
                                <div className='space-y-[3px] '>
                                    <div>
                                        <Typography.Text italic strong>
                                            Trạng thái
                                            <Typography.Text type="danger" strong> *</Typography.Text>
                                        </Typography.Text>
                                    </div>
                                    <Select style={{ width: 120 }}
                                        options={[{ value: true, label: 'Mở' }, { value: false, label: 'Khóa' }]} />
                                </div>
                            </div>
                            <Select_tags />
                            <Select_categories />
                            <Select_images />
                        </div>
                        <Space>
                            <Button onClick={() => this.onclick_next()}>Tiếp tục</Button>
                            {this.state.step_current > 0 &&
                                <Button onClick={() => this.onclick_pre()}>Quay lại</Button>
                            }
                        </Space>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(index);