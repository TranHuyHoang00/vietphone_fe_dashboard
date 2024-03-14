import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Button, Spin, Typography, Input, Image } from 'antd';
import { edit_brand } from '../../../../../services/brand_service';
import { image_to_base64 } from '../../../../../utils/base64';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_brand: {},
            is_loading: false,
            mask_closable: true,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_brand !== this.props.data_brand) {
            this.setState({ data_brand: this.props.data_brand });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_brand };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_brand: {
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
        let result = this.validation(this.state.data_brand);
        if (result.code == 0) {
            try {
                let data = await edit_brand(id, this.state.data_brand);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_brand();
                    this.props.open_Form("edit", false);
                    this.setState({ data_brand: {} });
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
    onchange_image = async (image) => {
        let image_new = await image_to_base64(image);
        this.handle_onchange_input(image_new, "image", 'select')
    }
    render() {
        let data_brand = this.state.data_brand;
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
                            className='bg-[#0e97ff] text-white'>
                            Xác nhận
                        </Button>
                    </>
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Logo</Typography.Text>
                            <div className='flex items-center justify-center'>
                                <div className='space-y-[5px]'>
                                    <Image width={240} height={80} className='object-cover' src={data_brand.image} />
                                    <input id="load_file" type="file" accept="image/*" hidden
                                        onChange={(image) => this.onchange_image(image)} />
                                    <div className='text-center'>
                                        <label htmlFor="load_file"
                                            className=' border border-gray-800 rounded-[5px] px-[10px] py-[3px] cursor-pointer '>
                                            Tải lên
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Tên thương hiệu
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_brand.name}
                                onChange={(event) => this.handle_onchange_input(event, "name", 'input')}
                            />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Slug</Typography.Text>
                            <Input value={data_brand.slug}
                                onChange={(event) => this.handle_onchange_input(event, "slug", 'input')}
                            />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Mô tả</Typography.Text>
                            <Input.TextArea value={data_brand.description} rows="3"
                                onChange={(event) => this.handle_onchange_input(event, "description", 'input')} />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_edit);