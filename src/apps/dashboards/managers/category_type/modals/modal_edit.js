import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Button, Spin } from 'antd';
import { edit_category_type } from '../../../../../services/category_type_service';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_category_type: {},
            is_loading: false,
            mask_closable: true,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_category_type !== this.props.data_category_type) {
            this.setState({ data_category_type: this.props.data_category_type });
        }
    }
    handle_onchange_input = (event, id) => {
        let copyState = { ...this.state.data_category_type };
        copyState[id] = event.target.value;
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
    handle_edit = async (id) => {
        let result = this.validation(this.state.data_category_type);
        if (result.code == 0) {
            try {
                let data = await edit_category_type(id, this.state.data_category_type);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_category_type();
                    this.props.open_Form("edit", false);
                    this.setState({ data_category_type: {} });
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
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={this.state.mask_closable}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#ed1e24] text-white'>
                            Hủy bỏ
                        </Button>
                        <Button disabled={this.state.is_loading} onClick={() => this.handle_edit()}
                            className='bg-[#100ab6] text-white'>
                            Xác nhận
                        </Button>
                    </>
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <label className='font-semibold italic'>Tên loại danh mục <span className='text-[#ed1e24]'>*</span></label>
                            <input value={data_category_type.name}
                                onChange={(event) => this.handle_onchange_input(event, "name")}
                                className='w-full h-[40px] border border-[#07d1bc] px-[10px] rounded-[5px]' />
                        </div>
                        <div className='space-y-[3px]'>
                            <label className='font-semibold italic'>Mô tả</label>
                            <textarea value={data_category_type.description} rows="5"
                                onChange={(event) => this.handle_onchange_input(event, "description")}
                                className='w-full border border-[#07d1bc] px-[10px] rounded-[5px]' />
                        </div>
                        <div className='space-y-[3px]'>
                            <label className='font-semibold italic'>Ngày tạo</label>
                            <input disabled value={data_category_type.created_at}
                                className='w-full h-[40px] border border-[#07d1bc] px-[10px] rounded-[5px]' />
                        </div>
                        <div className='space-y-[3px]'>
                            <label className='font-semibold italic'>Ngày cập nhập</label>
                            <input disabled value={data_category_type.updated_at}
                                className='w-full h-[40px] border border-[#07d1bc] px-[10px] rounded-[5px]' />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_edit);