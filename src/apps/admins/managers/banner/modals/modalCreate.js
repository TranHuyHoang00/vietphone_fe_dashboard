import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography, Carousel, Image, Button } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormSelectInput from '@components/selects/formSelectInput';
import ModalFooter from '@components/modal/modalFooter';
import { convertImageToBase64 } from '@utils/base64';
import { DeleteOutlined } from '@ant-design/icons';
import { create_media_base } from '@services/media_base_service';
import { show_notification } from '@utils/show_notification';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_medias: [],
            data_media_ids: [],
        }
    }
    async componentDidMount() {
        this.props.get_list_location({ page: 1, limit: 100, search: '' });
    }
    validationData = (data) => {
        if (this.state.data_medias.length === 0) {
            return { mess: "Không được bỏ trống 'Hình ảnh' ", check: false };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên băng rôn' ", check: false };
        }
        if (!data.location) {
            return { mess: "Không được bỏ trống 'Vị trí' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        let result = this.validationData(this.props.data_banner);
        if (result.check) {
            let data_banner = this.props.data_banner;
            if (this.state.data_medias.length !== 0) {
                let media = await this.handle_create_media(this.state.data_medias);
                data_banner.media = media;
            }
            await this.props.create_banner(data_banner);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                this.setState({ data_medias: [], data_media_ids: [] })
                await this.props.get_list_banner(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = async (event, type, index, id) => {
        let data_medias = this.state.data_medias;
        let data_media_ids = this.state.data_media_ids;
        if (type === 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await convertImageToBase64(event, i);
                data_medias.push({ image: image_new, media_type: 'image', name: this.props.data_banner.name, alt: this.props.data_banner.name });
            }
        }
        if (type === 'delete') {
            if (id !== undefined) {
                data_media_ids = data_media_ids.filter(item => item !== id);
            }
            data_medias.splice(index, 1);
        }
        this.setState({ data_medias: data_medias, data_media_ids: data_media_ids });
    }
    handle_create_media = async (data_medias) => {
        try {
            let data_media_ids_new = [];
            let data_media_ids = this.state.data_media_ids;
            for (const item of data_medias) {
                if (!item.id) {
                    item.alt = this.props.data_banner.name;
                    let data = await create_media_base(item);
                    if (data && data.data && data.data.success === 1) {
                        data_media_ids_new.push(data.data.data.id);
                    }
                }
            }
            return [...data_media_ids_new, ...data_media_ids];
        } catch (error) {
            show_notification(error);
        }
    }
    render() {
        let data_banner = this.props.data_banner;
        let isLoading = this.props.isLoading;
        let data_locations = this.props.data_locations;
        let data_medias = this.state.data_medias;
        return (

            <Modal title="TẠO MỚI" open={this.props.modalCreate}
                onCancel={() => this.props.openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Ảnh
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <div className=''>
                                <div className='space-y-[5px]'>
                                    <div className='aspect-[3/1]'>
                                        <Carousel className='h-full w-full'>
                                            {data_medias && data_medias.map((item, index) => {
                                                return (
                                                    <div id={index} className='relative'>
                                                        <Image height={'100px'} width={'100%'} src={item.image} className='object-cover' />
                                                        <div className='absolute top-0 left-0'>
                                                            <Button onClick={() => this.onChangeImage(null, 'delete', index, item.id)}
                                                                className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                    <input id='create_banner' type="file" accept="image/*" hidden multiple
                                        onChange={(image) => this.onChangeImage(image, 'create')} />
                                    <div className='text-center'>
                                        <label htmlFor='create_banner'
                                            className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
                                            Thêm ảnh
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FormInput name={'Tên băng rôn'} variable={'name'} value={data_banner.name}
                            important={true}
                            onChangeInput={this.props.on_change_banner} />

                        <FormSelectInput name={'Vị trí'} variable={'location'} value={data_banner.location}
                            important={true} width={'100%'}
                            options={data_locations.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={this.props.on_change_banner} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_banner: state.banner.data_banner,
        isLoading: state.banner.isLoading,
        isResult: state.banner.isResult,
        data_locations: state.location.data_locations,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_banner: (dataFilter) => dispatch(actions.get_list_banner_redux(dataFilter)),
        create_banner: (data) => dispatch(actions.create_banner_redux(data)),
        on_change_banner: (id, value) => dispatch(actions.on_change_banner_redux(id, value)),
        get_list_location: (dataFilter) => dispatch(actions.get_list_location_redux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));