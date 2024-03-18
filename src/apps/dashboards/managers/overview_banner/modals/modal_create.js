import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Button, Spin, Typography, Select, Space, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { create_banner } from '../../../../../services/banner_service';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { image_to_base64 } from '../../../../../utils/base64';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_banner: {
                gender: true,
                activate: true,
            },
            is_loading: false,
            mask_closable: true,
            data_images: [],
        }
    }
    async componentDidMount() {
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_banner };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_banner: {
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
        let result = this.validation(this.state.data_banner);
        if (result.code == 0) {
            try {
                let data = await create_banner(this.state.data_banner);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_list_banner();
                    this.props.open_modal("create", false);
                    this.setState({ data_banner: {} });
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
    onchange_image = async (event, type, index) => {
        let data_images = this.state.data_images;
        if (type == 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await image_to_base64(event, i);
                data_images.push(image_new);
            }
        }
        if (type == 'delete') {
            data_images.splice(index, 1);
        }
        this.setState({ data_images: data_images });
    }
    render() {
        let data_banner = this.state.data_banner;
        const responsive = {
            desktop: { breakpoint: { max: 3000, min: 640 }, items: 3, slidesToSlide: 2 },
            mobile: { breakpoint: { max: 640, min: 300 }, items: 2, slidesToSlide: 1 }
        };
        let data_images = this.state.data_images;
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
                                Tiêu đề
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_banner.title}
                                onChange={(event) => this.handle_onchange_input(event, "title", 'input')} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Mô tả</Typography.Text>
                            <Input.TextArea value={data_banner.description} rows={3}
                                onChange={(event) => this.handle_onchange_input(event, "description", 'input')}
                            />
                        </div>
                        <div className='space-y-[3px]'>
                            <div>
                                <Typography.Text italic strong>Hỉnh ảnh</Typography.Text>
                            </div>
                            <div className='space-y-[10px]'>
                                <input id="load_file" type="file" accept="image/*" hidden multiple
                                    onChange={(event) => this.onchange_image(event, 'create')} />
                                <div className='text-center'>
                                    <label htmlFor="load_file"
                                        className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
                                        Thêm ảnh
                                    </label>
                                </div>
                                <Carousel responsive={responsive} swipeable={true} draggable={true} showDots={true}
                                    infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                    {data_images && data_images.map((item, index) => {
                                        return (
                                            <div key={index} className="slider" >
                                                <div className='relative'>
                                                    <Image width={150} height={150} className='object-cover' src={item} />
                                                    <div className='absolute top-0'>
                                                        <Button onClick={() => this.onchange_image(null, 'delete', index)}
                                                            className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_create);