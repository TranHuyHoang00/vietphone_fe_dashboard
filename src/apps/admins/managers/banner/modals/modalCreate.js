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
import { createMediaBase } from '@services/media_base_service';
import { showNotification } from '@utils/handleFuncNotification';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMedias: [],
        }
    }
    async componentDidMount() {
        const { getListLocation } = this.props;
        getListLocation({ page: 1, limit: 100, search: '' });
    }
    validationData = (data) => {
        const { dataMedias } = this.state;
        if (dataMedias.length === 0) {
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
        const { dataBanner, isResult, openModal, getListBanner, createBanner, dataFilter } = this.props;
        const result = this.validationData(dataBanner);
        const { dataMedias } = this.state;
        if (result.check) {
            let newDataBanner = { ...dataBanner };
            if (dataMedias.length !== 0) {
                const media = await this.createMedia(dataMedias);
                newDataBanner.media = media;
            }
            await createBanner(newDataBanner);
            if (isResult) {
                openModal("create", false);
                this.setState({ dataMedias: [] })
                await getListBanner(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = async (valueImage, nameFuntion, index, id) => {
        let { dataMedias } = this.state;
        const { dataBanner } = this.props;
        switch (nameFuntion) {
            case 'create':
                const files = valueImage.target.files;
                for (let i = 0; i < files.length; i++) {
                    const newImage = await convertImageToBase64(valueImage, i);
                    dataMedias.push({ image: newImage, media_type: 'image', name: dataBanner.name, alt: dataBanner.name });
                }
                break;
            case 'delete':
                dataMedias.splice(index, 1);
                break;
            default:
                break;
        }
        this.setState({ dataMedias: dataMedias });
    }
    createMedia = async (dataMedias) => {
        try {
            const mediaPromises = dataMedias.map(async item => {
                const data = await createMediaBase(item);
                if (data && data.data && data.data.success === 1) {
                    return data.data.data.id;
                }
                return null;
            });
            const newDataMediaIds = (await Promise.all(mediaPromises)).filter(id => id !== null);
            return newDataMediaIds;
        } catch (error) {
            showNotification(error);
            return [];
        }
    }
    render() {
        const { dataBanner, isLoading, dataLocations, modalCreate, openModal, onChangeBanner } = this.props;
        const { dataMedias } = this.state;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
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
                                            {dataMedias && dataMedias.map((item, index) => {
                                                return (
                                                    <div id={index} className='relative'>
                                                        <Image height={'100px'} width={'100%'} src={item.image} className='object-cover' />
                                                        <div className='absolute top-0 left-0'>
                                                            <Button onClick={() => this.onChangeImage(undefined, 'delete', index, item.id)}
                                                                className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                    <input id='createBanner' type="file" accept="image/*" hidden multiple
                                        onChange={(image) => this.onChangeImage(image, 'create')} />
                                    <div className='text-center'>
                                        <label htmlFor='createBanner'
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

                        <FormSelectInput name={'Vị trí'} variable={'location'} value={dataBanner.location}
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
        createBanner: (data) => dispatch(actions.createBannerRedux(data)),
        onChangeBanner: (id, value) => dispatch(actions.onChangeBannerRedux(id, value)),
        getListLocation: (dataFilter) => dispatch(actions.getListLocationRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));