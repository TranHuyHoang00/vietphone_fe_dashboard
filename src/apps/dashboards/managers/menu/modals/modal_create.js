import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Button, Spin, Typography, Select } from 'antd';
import { create_menu } from '../../../../../services/menu_service';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_menu: {},
            is_loading: false,
            mask_closable: true,

        }
    }
    async componentDidMount() {
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_menu };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_menu: {
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
        if (!data.category_id) {
            return { mess: "Không được bỏ trống 'Danh mục' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_menu);
        if (result.code == 0) {
            try {
                let data = await create_menu(this.state.data_menu);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_menu();
                    this.props.open_modal("create", false);
                    this.setState({ data_menu: {} });
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
        let data_menu = this.state.data_menu;
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
                            <div><Typography.Text italic strong>Danh mục</Typography.Text></div>
                            <Select className='w-full' value={data_menu.category_id}
                                onChange={(event) => this.handle_onchange_input(event, "category_id", 'select')}
                                options={[
                                    { value: 1, label: 'Điện thoại' },
                                    { value: 2, label: 'Phụ kiện' },
                                ]} />
                        </div>
                        <div className='space-y-[3px]'>
                            <div><Typography.Text italic strong>Trạng thái</Typography.Text></div>
                            <Select style={{ width: 100 }} value={data_menu.activate}
                                onChange={(event) => this.handle_onchange_input(event, "activate", 'select')}
                                options={[
                                    { value: true, label: 'Mở' },
                                    { value: false, label: 'Khóa' },
                                ]} />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_create);