import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Space, message, Spin } from 'antd';
import VariantOverview from './elements/variant_overview';
import VariantIntroduce from './elements/variant_introduce';
import VariantMedia from './elements/variant_media';
import VariantAttributeValue from './elements/variant_attribute_value';
import { createMedia } from '@services/media_service';
import { showNotification } from '@utils/handleFuncNotification';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataProducts } from '@datas/dataPermissionsOrigin';
import ModalCreate from './modals/modalCreate';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            dataVariants: [],

            dataVariant: {},
            activeVariant: '',

            dataAttributes: [],

            dataCheckPermis: {},
            dataVariantIds: [],

        }
    }
    async componentDidMount() {
        const { dataUserPermis, isSuperUser } = this.props;
        const dataCheckPermis = await handleCheckPermis(dataProducts, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    async componentDidUpdate(prevProps) {
        const { dataVariantIds, dataProduct } = this.props;
        if (!this.arraysEqual(prevProps.dataVariantIds, dataVariantIds)) {
            const dataAttributes = dataProduct?.variant_attribute_group?.attribute ? dataProduct?.variant_attribute_group?.attribute : []
            if (dataVariantIds && dataVariantIds.length !== 0) {
                this.setState({ dataVariantIds: dataVariantIds, dataAttributes: dataAttributes });
                await this.getListVariant(dataVariantIds);
            }
        }
    }
    arraysEqual = (arr1, arr2) => {
        if (arr1 && arr1) {
            if (arr1.length !== arr2.length) return false;
            const sortedArr1 = [...arr1].sort();
            const sortedArr2 = [...arr2].sort();
            for (let i = 0; i < sortedArr1.length; i++) {
                if (sortedArr1[i] !== sortedArr2[i]) return false;
            }
            return true;
        } else {
            return;
        }
    }
    getListVariant = async (dataVariantIds) => {
        const { getDataVariant } = this.props;
        let dataVariants = [];
        for (const id of dataVariantIds) {
            await getDataVariant(id);
            dataVariants.push(this.props.dataVariant);
        }
        this.setState({ dataVariants: dataVariants, activeVariant: (dataVariants.length) - 1 });
    }
    selectVariant = async (index) => {
        const { isEdit, getDataVariant } = this.props;
        const { dataVariants } = this.state;
        if (isEdit) {
            message.error('Bạn vui lòng lưu lại thay đổi');
            return;
        } else {
            this.setState({ activeVariant: index })
            await getDataVariant(dataVariants[index].id);
        }
    }
    handleEditVariant = async () => {
        const { dataVariant, isEdit, clicEditVariant, editVariant, getDataVariant, isResultVariant, getDataProduct,
            dataProduct
        } = this.props;
        const dataMedias = dataVariant.media;
        const dataAtbvls = dataVariant.attribute_values;
        const { dataAttributes } = this.state;
        if (dataVariant?.id) {
            if (isEdit) {
                let newDataVariant = { ...dataVariant };
                if (newDataVariant?.warranty?.id) { delete newDataVariant.warranty; }
                if (dataMedias && dataMedias.length !== 0) {
                    const newDataMedias = await this.handleDataMedias(dataMedias);
                    newDataVariant.media = newDataMedias;
                }
                if (dataAtbvls && dataAttributes) {
                    if (dataAtbvls.length === dataAttributes.length) {
                        if (dataAtbvls.length !== 0) {
                            const newDataAtbvls = await this.handleDataAtbvls(dataAtbvls);
                            newDataVariant.attribute_values = newDataAtbvls;
                        } else {
                            delete newDataVariant.attribute_values;
                        }
                    } else {
                        message.error('Thiếu hoặc chưa đủ thông số, vui sửa lại');
                        return;
                    }
                }
                await editVariant(newDataVariant.id, newDataVariant);
                if (isResultVariant) {
                    await getDataVariant(newDataVariant.id);
                    clicEditVariant();
                    await getDataProduct(dataProduct.id);
                }
            } else {
                clicEditVariant();
            }
        }
    }
    handleDataAtbvls = async (dataAtbvls) => {
        let newDataAtbvlIds = [];
        for (const Atbvl of dataAtbvls) {
            if (Atbvl.id) {
                newDataAtbvlIds.push(Atbvl.id);
            }
        }
        return newDataAtbvlIds;
    }
    handleCreateMedia = async (media) => {
        try {
            const data = await createMedia(media);
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
    openModal = () => {
        this.setState({ modalCreate: !this.state.modalCreate });
    }
    render() {
        const { dataProduct, isEdit, clicEditVariant } = this.props;
        const { dataCheckPermis, dataVariants, activeVariant, modalCreate } = this.state;
        return (
            <>
                <Spin size='large' spinning={this.props.isLoading}>
                    <div className=" space-y-[10px]">
                        <div className='flex items-center justify-between'>
                            <Button disabled={!dataCheckPermis['product.change_product']}
                                onClick={() => this.openModal()} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    Tạo mới
                                </Space>
                            </Button>
                            <Space>
                                {isEdit &&
                                    <Button onClick={() => clicEditVariant()}
                                        className='bg-[#e94138] text-white'>
                                        Hủy
                                    </Button>
                                }
                                <Button disabled={!dataCheckPermis['product.change_product']}
                                    onClick={() => this.handleEditVariant()} className='bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                                    {isEdit ? 'Lưu' : 'Chỉnh sửa'}
                                </Button>
                            </Space>
                        </div>
                        <div className='lg:grid grid-cols-3 gap-[10px] space-y-[10px] lg:space-y-0 '>
                            <div>
                                <VariantOverview dataVariants={dataVariants}
                                    selectVariant={this.selectVariant}
                                    activeVariant={activeVariant} />
                            </div>
                            <div className='col-span-2 space-y-[10px]'>
                                <div className='md:grid grid-cols-3 gap-[10px] space-y-[10px] md:space-y-0'>
                                    <div className='col-span-2 '>
                                        <VariantIntroduce />
                                    </div>
                                    <div>
                                        <VariantMedia />
                                    </div>
                                </div>
                                <VariantAttributeValue dataAttributes={dataProduct?.variant_attribute_group?.attribute} />
                            </div>
                        </div>
                    </div>
                </Spin>
                {modalCreate && dataCheckPermis['product.change_product'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal} />}
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.variant.isLoading,
        dataProduct: state.product.dataProduct,
        dataVariant: state.variant.dataVariant,
        isResultVariant: state.variant.isResult,

        isEdit: state.variant.isEdit,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataVariant: (id) => dispatch(actions.getDataVariantRedux(id)),
        clicEditVariant: (value) => dispatch(actions.clickEditVariantRedux(value)),
        editVariant: (id, data) => dispatch(actions.editVariantRedux(id, data)),
        setDataVariant: (data) => dispatch(actions.setDataVariantRedux(data)),
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
