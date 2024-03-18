import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Button, Spin, Typography } from 'antd';
import { create_category_type } from '../../../../../services/category_type_service';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_category_type: {
                is_active: true,
            },
            is_loading: false,
            mask_closable: true,
            data_filter: {
                page: 1,
                limit: 5,
                search_query: ''
            },
        }
    }
    async componentDidMount() {
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_category_type };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_category_type: {
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
    validation = (data) => {
        this.handle_loading(true);
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại danh mục' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_category_type);
        if (result.code == 0) {
            try {
                let data = await create_category_type(this.state.data_category_type);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_category_type(this.state.data_filter);
                    this.props.open_modal("create", false);
                    this.setState({ data_category_type: { is_active: true } });
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
        let data_category_type = this.state.data_category_type;
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
                                Tên loại danh mục
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_category_type.name}
                                onChange={(event) => this.handle_onchange_input(event, "name", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Mô tả</Typography.Text>
                            <Input.TextArea value={data_category_type.description} rows={3}
                                onChange={(event) => this.handle_onchange_input(event, "description", 'input')} />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_create);