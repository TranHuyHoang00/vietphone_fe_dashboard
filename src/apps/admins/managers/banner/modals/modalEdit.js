import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography, Carousel, Image, Button } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modal/modalFooter';
import { convertImageToBase64 } from '@utils/handleFuncImage';
import { DeleteOutlined } from '@ant-design/icons';
import { createMediaBase, get_media_base } from '@services/media_base_service';
import { showNotification } from '@utils/handleFuncNotification';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMedias: [],
            dataMediaIds: [],
            dataBanner: {},
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.dataBanner !== this.props.dataBanner) {
            this.props.getListLocation({ page: 1, limit: 100, search: '' });
            this.setState({ dataMediaIds: this.props.dataBanner.media });
            if (this.props.dataBanner.media && this.props.dataBanner.media.length !== 0) {
                await this.get_list_media(this.props.dataBanner.media);
            }
        }
    }
    get_list_media = async (media) => {
        let dataMedias = [];
        for (const item of media) {
            let data = await this.get_media(item);
            dataMedias.push(data);
        }
        this.setState({ dataMedias: dataMedias });
    }
    get_media = async (id) => {
        try {
            let data = await get_media_base(id);
            if (data && data.data && data.data.success === 1) {
                return data.data.data
            }
        } catch (error) {
            showNotification(error);
        }
    }
    validationData = (data) => {
        if (this.state.dataMedias.length === 0) {
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
    handleEdit = async () => {
        let result = this.validationData(this.props.dataBanner);
        if (result.check) {
            let dataBanner = this.props.dataBanner;
            if (this.state.dataMedias.length !== 0) {
                let media = await this.handle_create_media(this.state.dataMedias);
                dataBanner.media = media;
            }
            await this.props.editBanner(dataBanner.id, dataBanner);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                this.setState({ dataMedias: [], dataMediaIds: [] })
                await this.props.getListBanner(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = async (event, type, index, id) => {
        let dataMedias = this.state.dataMedias;
        let dataMediaIds = this.state.dataMediaIds;
        if (type === 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await convertImageToBase64(event, i);
                dataMedias.push({ image: image_new, media_type: 'image', name: this.props.dataBanner.name, alt: this.props.dataBanner.name });
            }
        }
        if (type === 'delete') {
            if (id !== undefined) {
                dataMediaIds = dataMediaIds.filter(item => item !== id);
            }
            dataMedias.splice(index, 1);
        }
        this.setState({ dataMedias: dataMedias, dataMediaIds: dataMediaIds });
    }
    handle_create_media = async (dataMedias) => {
        try {
            let data_media_ids_new = [];
            let dataMediaIds = this.state.dataMediaIds;
            for (const item of dataMedias) {
                if (!item.id) {
                    item.alt = this.props.dataBanner.name;
                    let data = await createMediaBase(item);
                    if (data && data.data && data.data.success === 1) {
                        data_media_ids_new.push(data.data.data.id);
                    }
                }
            }
            return [...data_media_ids_new, ...dataMediaIds];
        } catch (error) {
            showNotification(error);
        }
    }
    render() {
        let dataBanner = this.props.dataBanner;
        let isLoading = this.props.isLoading;
        let dataLocations = this.props.dataLocations;
        let dataMedias = this.state.dataMedias;

        return (
            <Modal title="CHỈNH SỬA" open={this.props.modalEdit}
                onCancel={() => this.props.openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
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
                                            {dataMedias && dataMedias.map((item, index) => {
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
                                    <input id='editBanner' type="file" accept="image/*" hidden multiple
                                        onChange={(image) => this.onChangeImage(image, 'create')} />
                                    <div className='text-center'>
                                        <label htmlFor='editBanner'
                                            className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
                                            Thêm ảnh
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FormInput name={'Tên băng rôn'} variable={'name'} value={dataBanner.name}
                            important={true}
                            onChangeInput={this.props.onChangeBanner} />

                        <FormSelectSingle name={'Vị trí'} variable={'location'} value={dataBanner.location}
                            important={true} width={'100%'}
                            options={dataLocations.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={this.props.onChangeBanner} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataBanner: state.banner.dataBanner,
        isLoading: state.banner.isLoading,
        isResult: state.banner.isResult,
        dataLocations: state.location.dataLocations,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListBanner: (dataFilter) => dispatch(actions.getListBannerRedux(dataFilter)),
        editBanner: (id, data) => dispatch(actions.editBannerRedux(id, data)),
        onChangeBanner: (id, value) => dispatch(actions.onChangeBannerRedux(id, value)),
        getListLocation: (dataFilter) => dispatch(actions.getListLocationRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));