import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Button, Spin, Typography, Input, Image, Select } from 'antd';
import { edit_brand } from '../../../../../services/brand_service';
import { image_to_base64 } from '../../../../../utils/base64';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_brand: {},
            is_loading: false,
            mask_closable: true,
            is_update_image: false,
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
            return { mess: "Không được bỏ trống 'Tên thương hiệu' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async (id) => {
        let result = this.validation(this.state.data_brand);
        if (result.code == 0) {
            try {
                let data_brand = this.state.data_brand;
                if (this.state.is_update_image == false) { delete data_brand.image; }
                let data = await edit_brand(id, data_brand);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_brand(this.props.data_filter);
                    this.props.open_modal("edit", false);
                    this.setState({ data_brand: {}, is_update_image: false });
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
        this.setState({
            is_update_image: true,
            data_brand: {
                ...this.state.data_brand,
                image: image_new,
            }
        })
    }
    render() {
        let data_brand = this.state.data_brand;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={this.state.mask_closable}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("edit", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                        <Button disabled={this.state.is_loading} onClick={() => this.handle_edit(data_brand.id)}
                            className='bg-[#0e97ff] text-white'>
                            Xác nhận
                        </Button>
                    </>
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Ảnh</Typography.Text>
                            <div className='flex items-center justify-center'>
                                <div className='space-y-[5px]'>
                                    <Image width={200} height={100} className='object-cover' src={data_brand.image} />
                                    <input id="load_file_edit" type="file" accept="image/*" hidden
                                        onChange={(image) => this.onchange_image(image)} />
                                    <div className='text-center'>
                                        <label htmlFor="load_file_edit"
                                            className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
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
                                onChange={(event) => this.handle_onchange_input(event, "name", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Icon</Typography.Text>
                            <Input value={data_brand.icon}
                                onChange={(event) => this.handle_onchange_input(event, "icon", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Slug</Typography.Text>
                            <Input value={data_brand.slug}
                                onChange={(event) => this.handle_onchange_input(event, "slug", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Mô tả</Typography.Text>
                            <Input.TextArea value={data_brand.description} rows={3}
                                onChange={(event) => this.handle_onchange_input(event, "description", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <div><Typography.Text italic strong>Trạng thái</Typography.Text></div>
                            <Select style={{ width: 200 }} value={data_brand.is_active}
                                onChange={(event) => this.handle_onchange_input(event, "is_active", 'select')}
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
export default withRouter(modal_edit);