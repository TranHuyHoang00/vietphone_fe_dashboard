import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Button, Spin, Typography, Image, Select } from 'antd';
import { create_category } from '../../../../../services/category_service';
import { image_to_base64 } from '../../../../../utils/base64';
import Select_category_type from './elements/select_category_type';
import Select_category from './elements/select_category';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_category: {
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
        let copyState = { ...this.state.data_category };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_category: {
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
            return { mess: "Không được bỏ trống 'Tên danh mục' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_category);
        if (result.code == 0) {
            try {
                let data = await create_category(this.state.data_category);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_category(this.state.data_filter);
                    this.props.open_modal("create", false);
                    this.setState({ data_category: { is_active: true } });
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
            data_category: {
                ...this.state.data_category,
                image: image_new,
            }
        });
    }
    render() {
        let data_category = this.state.data_category;
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
                            <Typography.Text italic strong>Ảnh</Typography.Text>
                            <div className='flex items-center justify-center'>
                                <div className='space-y-[5px]'>
                                    <Image width={100} height={100} className='object-cover' src={data_category.image} />
                                    <input id="load_file_create" type="file" accept="image/*" hidden
                                        onChange={(image) => this.onchange_image(image)} />
                                    <div className='text-center'>
                                        <label htmlFor="load_file_create"
                                            className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
                                            Thêm ảnh
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Tên danh mục
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_category.name}
                                onChange={(event) => this.handle_onchange_input(event, "name", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Icon</Typography.Text>
                            <Input value={data_category.icon}
                                onChange={(event) => this.handle_onchange_input(event, "icon", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Slug</Typography.Text>
                            <Input value={data_category.slug}
                                onChange={(event) => this.handle_onchange_input(event, "slug", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Mô tả</Typography.Text>
                            <Input.TextArea value={data_category.description} rows={3}
                                onChange={(event) => this.handle_onchange_input(event, "description", 'input')} />
                        </div>
                        <Select_category_type handle_onchange_input={this.handle_onchange_input}
                            category_type={data_category.category_type} />
                        <Select_category handle_onchange_input={this.handle_onchange_input}
                            category={data_category.parent} />
                        <div className='space-y-[3px]'>
                            <div><Typography.Text italic strong>
                                Trạng thái
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            </div>
                            <Select style={{ width: 200 }} value={data_category.is_active}
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