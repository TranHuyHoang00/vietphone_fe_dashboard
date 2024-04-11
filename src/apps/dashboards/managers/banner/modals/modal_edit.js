import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin, Typography, Carousel, Image, Button } from 'antd';
import FormInput from '../../../components/inputs/form_input';
import FormSelectInput from '../../../components/selects/form_select_input';
import ModalFooter from '../../../components/modal/modal_footer';
import { image_to_base64 } from '../../../../../utils/base64';
import { DeleteOutlined } from '@ant-design/icons';
import { create_media_base, get_media_base } from '../../../../../services/media_base_service';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_medias: [],
            data_media_ids: [],
            data_banner: {},
            is_loading_media: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_banner !== this.props.data_banner) {
            this.props.get_list_location({ page: 1, limit: 100, search: '' });
            this.setState({ data_media_ids: this.props.data_banner.media });
            if (this.props.data_banner.media && this.props.data_banner.media.length !== 0) {
                this.setState({ is_loading_media: true });
                await this.get_list_media(this.props.data_banner.media);
            }
        }
    }
    get_list_media = async (media) => {
        let data_medias = [];
        for (const item of media) {
            let data = await this.get_media(item);
            data_medias.push(data);
        }
        this.setState({ data_medias: data_medias, is_loading_media: false, });
    }
    get_media = async (id) => {
        try {
            let data = await get_media_base(id);
            if (data && data.data && data.data.success === 1) {
                return data.data.data
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        }
    }
    validation = (data) => {
        if (this.state.data_medias.length === 0) {
            return { mess: "Không được bỏ trống 'Hình ảnh' ", code: 1 };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên băng rôn' ", code: 1 };
        }
        if (!data.location) {
            return { mess: "Không được bỏ trống 'Vị trí' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_banner);
        if (result.code === 0) {
            let data_banner = this.props.data_banner;
            if (this.state.data_medias.length !== 0) {
                let media = await this.handle_create_media(this.state.data_medias);
                data_banner.media = media;
            }
            await this.props.edit_banner(data_banner.id, data_banner);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("edit", false);
                this.setState({ data_medias: [], data_media_ids: [] })
                await this.props.get_list_banner(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onchange_image = async (event, type, index, id) => {
        let data_medias = this.state.data_medias;
        let data_media_ids = this.state.data_media_ids;
        if (type === 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await image_to_base64(event, i);
                data_medias.push({ image: image_new, media_type: 'image', alt: this.props.data_banner.name });
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
        } catch (e) {
            message.error('Lỗi hệ thống');
        }
    }
    render() {
        let data_banner = this.props.data_banner;
        let is_loading = this.props.is_loading;
        let is_loading_media = this.state.is_loading_media;
        let data_locations = this.props.data_locations;
        let data_medias = this.state.data_medias;

        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading || is_loading_media}>
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
                                                            <Button onClick={() => this.onchange_image(null, 'delete', index, item.id)}
                                                                className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                    <input id='edit_banner' type="file" accept="image/*" hidden multiple
                                        onChange={(image) => this.onchange_image(image, 'create')} />
                                    <div className='text-center'>
                                        <label htmlFor='edit_banner'
                                            className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
                                            Thêm ảnh
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FormInput name={'Tên băng rôn'} variable={'name'} value={data_banner.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_banner} />

                        <FormSelectInput name={'Vị trí'} variable={'location'} value={data_banner.location}
                            important={true} width={'100%'}
                            options={data_locations.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            handle_onchange_input={this.props.on_change_banner} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_banner: state.banner.data_banner,
        is_loading: state.banner.is_loading,
        is_result: state.banner.is_result,
        data_locations: state.location.data_locations,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_banner: (data_filter) => dispatch(actions.get_list_banner_redux(data_filter)),
        edit_banner: (id, data) => dispatch(actions.edit_banner_redux(id, data)),
        on_change_banner: (id, value) => dispatch(actions.on_change_banner_redux(id, value)),
        get_list_location: (data_filter) => dispatch(actions.get_list_location_redux(data_filter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));