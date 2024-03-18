import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Button, Spin, Typography, Select, Space } from 'antd';
import { create_location } from '../../../../../services/location_service';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_location: {
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
        let copyState = { ...this.state.data_location };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_location: {
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
            return { mess: "Không được bỏ trống 'Tên vị trí' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_location);
        if (result.code == 0) {
            try {
                let data = await create_location(this.state.data_location);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_location();
                    this.props.open_modal("create", false);
                    this.setState({ data_location: {} });
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
        let data_location = this.state.data_location;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
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
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Tên vị trí
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_location.name}
                                onChange={(event) => this.handle_onchange_input(event, "name", 'input')}
                            />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_create);