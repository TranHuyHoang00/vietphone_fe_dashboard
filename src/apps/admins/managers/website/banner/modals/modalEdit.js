import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography, Carousel, Image, Button } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
import { convertImageToBase64 } from '@utils/handleFuncImage';
import { DeleteOutlined } from '@ant-design/icons';
import { createMediaBase } from '@services/media_base_service';
import { showNotification } from '@utils/handleFuncNotification';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListLocation } = this.props;
        getListLocation({ page: 1, limit: 100, search: '' });
    }
    validationData = (data) => {
        if (data.media && data.media.length === 0) {
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
        const { dataBanner, isResult, openModal, getListBanner, dataFilter, editBanner } = this.props;
        const result = this.validationData(dataBanner);
        let newDataBanner = { ...dataBanner };
        if (result.check) {
            const dataMedias = dataBanner.media;
            if (dataMedias.length !== 0) {
                const newDataMedias = await this.handleDataMedias(dataMedias);
                newDataBanner.media = newDataMedias;
            }
            await editBanner(newDataBanner.id, newDataBanner);
            if (isResult) {
                openModal("edit", false);
                await getListBanner(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }

    onChangeImage = async (valueImage, nameFuntion, indexImage) => {
        const { dataBanner, setDataBanner } = this.props;
        let newDataBanner = { ...dataBanner };
        switch (nameFuntion) {
            case 'create':
                const files = valueImage.target.files;
                for (let i = 0; i < files.length; i++) {
                    const newImage = await convertImageToBase64(valueImage, i);
                    (newDataBanner.media).push({ image: newImage, media_type: 'image', name: dataBanner.name, alt: dataBanner.name });
                }
                break;
            case 'delete':
                (newDataBanner.media).splice(indexImage, 1);
                break;
            default:
                break;
        }
        setDataBanner(newDataBanner);
    }
    handleCreateMedia = async (media) => {
        try {
            const data = await createMediaBase(media);
            if (data && data.data && data.data.success === 1) {
                return data.data.data.id;
            }
        } catch (error) {
            showNotification(error);
        }
    }
    handleDataMedias = async (dataMedias) => {
        let newDataMediaIds = [];
        for (const media of dataMedias) {
            if (media.id) { newDataMediaIds.push(media.id) }
            else {
                const newMediaId = await this.handleCreateMedia(media);
                if (newMediaId) { newDataMediaIds.push(newMediaId); }
            }
        }
        return newDataMediaIds;
    }
    render() {
        const { dataBanner, isLoading, dataLocations, modalEdit, openModal, onChangeBanner } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
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
                                            {dataBanner.media && dataBanner.media.map((item, index) => {
                                                return (
                                                    <div id={index} className='relative'>
                                                        <Image height={'100px'} width={'100%'} src={item.image} className='object-cover' />
                                                        <div className='absolute top-0 left-0'>
                                                            <Button onClick={() => this.onChangeImage(null, 'delete', index)}
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
                            onChangeInput={onChangeBanner} />

                        <FormSelectSingle name={'Vị trí'} variable={'location'} value={dataBanner.location}
                            important={true} width={'100%'}
                            options={dataLocations.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={onChangeBanner} />
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
        setDataBanner: (id) => dispatch(actions.setDataBannerRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));