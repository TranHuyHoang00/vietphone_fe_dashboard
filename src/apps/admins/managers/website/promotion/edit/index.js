import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Spin, Typography, message } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormImage from '@components/inputs/formImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { moduleQuills, formatQuills } from '@datas/dataModuleReactQuill';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditImage: false,
        }
    }
    async componentDidMount() {
        const { getDataPromotion, match } = this.props;
        if (match && match.params) {
            const promotionId = match.params.id;
            if (promotionId) { await getDataPromotion(promotionId); }
        }
    }
    goBackHome = () => { this.props.history.push(`/admin/manager/website/promotion`) };
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên' ", check: false };
        }
        if (!data.content) {
            return { mess: "Không được bỏ trống 'Nội dung' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataPromotion, editPromotion } = this.props;
        const result = this.validationData(dataPromotion);
        const { isEditImage } = this.state;
        let newDataPromotion = { ...dataPromotion };
        if (result.check) {
            if (isEditImage === false) { delete newDataPromotion.image; }
            await editPromotion(newDataPromotion.id, newDataPromotion);
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (image) => {
        const { onChangePromotion } = this.props;
        this.setState({ isEditImage: true, })
        onChangePromotion(image, 'image');
    }
    render() {
        const { dataPromotion, isLoading, onChangePromotion } = this.props;
        return (
            <Spin size='large' spinning={isLoading}>
                <div className="mx-[10px] space-y-[10px]">
                    <div className='p-[10px] space-y-[10px] bg-white dark:bg-[#001529] rounded-[10px] shadow-md' >
                        <div className='flex items-center justify-between'>
                            <Button onClick={() => this.goBackHome()}
                                className='bg-[#e94138] text-white'>
                                Quay lại
                            </Button>
                            <Button onClick={() => this.handleEdit()}
                                className='bg-[#0e97ff] text-white'>
                                Lưu
                            </Button>
                        </div>
                        <div className="space-y-[10px]">
                            <FormImage name={'Ảnh'} variable={'image'} value={dataPromotion?.image}
                                important={true}
                                htmlFor={'loadImageEdit'} width={250} height={50}
                                onChangeImage={this.onChangeImage} />

                            <div className='flex flex-wrap gap-[10px]'>
                                <FormInput name={'Trả góp'} variable={'instalment'} value={dataPromotion?.instalment}
                                    important={true}
                                    onChangeInput={onChangePromotion} />

                                <FormInput name={'Tên'} variable={'name'} value={dataPromotion?.name}
                                    important={true}
                                    onChangeInput={onChangePromotion} />
                            </div>
                            <div className='space-y-[3px]'>
                                <Typography.Text italic strong>
                                    Nội dung
                                    <Typography.Text type="danger" strong> *</Typography.Text>
                                </Typography.Text>
                                <ReactQuill theme="snow"
                                    modules={moduleQuills}
                                    formats={formatQuills}
                                    bounds={'.app'}
                                    value={dataPromotion?.content}
                                    onChange={(value) => onChangePromotion(value, 'content')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        );
    }

}

const mapStateToProps = state => {
    return {
        dataPromotion: state.promotion.dataPromotion,
        isLoading: state.promotion.isLoading,
        isResult: state.promotion.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        editPromotion: (id, data) => dispatch(actions.editPromotionRedux(id, data)),
        onChangePromotion: (id, value) => dispatch(actions.onChangePromotionRedux(id, value)),
        getDataPromotion: (id) => dispatch(actions.getDataPromotionRedux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
