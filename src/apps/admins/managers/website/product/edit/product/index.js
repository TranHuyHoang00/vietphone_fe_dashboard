import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Typography, Space, message, Modal, notification, Spin } from 'antd';
import ProductIntroduce from './elements/product_introduce';
//import ProductAttributeValue from './elements/product_attribute_value';
import ProductPage from './elements/product_page';
import ProductContent from './elements/product_content';
import ProductMedia from './elements/product_media';
import ProductAtbvlQuillTable from './elements/productAtbvlQuillTable';
import { createMedia } from '@services/website/mediaServices';
import { showNotification } from '@utils/handleFuncNotification';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataProducts } from '@datas/dataPermissionsOrigin';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCheckPermis: {},
            isLoadingMedia: false,
        }
    }
    async componentDidMount() {
        const { dataUserPermis, isSuperUser } = this.props;
        const dataCheckPermis = await handleCheckPermis(dataProducts, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    handleProductPage = async () => {
        const { dataProduct, dataProductPage, createProductPage, getDataProductPage, editProductPage } = this.props;
        let newDataProductPage = {
            ...dataProductPage,
            product: dataProduct.id
        };
        if (newDataProductPage.title) {
            if (!newDataProductPage.id) {
                await createProductPage(newDataProductPage);
            } else {
                await editProductPage(newDataProductPage.id, newDataProductPage);
            }
            await getDataProductPage(dataProduct.id);
        } else {
            return;
        }
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
        this.setState({ isLoadingMedia: true });
        try {
            const promises = dataMedias.map(async (media) => {
                if (media.id) { return media.id; }
                try {
                    const newMediaId = await this.handleCreateMedia(media);
                    return newMediaId || null;
                } catch (error) {
                    showNotification(error);
                    return null;
                }
            });
            const newDataMediaIds = await Promise.all(promises);
            return newDataMediaIds.filter(id => id !== null);
        } finally {
            this.setState({ isLoadingMedia: false });
        }
    };
    handleDataAtbvls = async (dataAtbvls) => {
        let newDataAtbvlIds = [];
        for (const Atbvl of dataAtbvls) {
            if (Atbvl.id) {
                newDataAtbvlIds.push(Atbvl.id);
            }
        }
        return newDataAtbvlIds;
    }
    handleEditProduct = async () => {
        const { dataProduct, isEdit, clickEditProduct, description, shortDescription,
            editProduct, getDataProduct, isEditProductPage } = this.props;
        if (dataProduct?.id) {
            if (isEdit) {
                if (this.props.isEditProduct) {
                    const dataMedias = dataProduct.media;
                    // const dataAtbvls = dataProduct.attribute_values;
                    let newDataProduct = {
                        ...dataProduct,
                        description: description,
                        short_description: shortDescription,
                    }
                    if (newDataProduct?.variant_attribute_group?.id) { newDataProduct.variant_attribute_group = newDataProduct?.variant_attribute_group?.id; }
                    if (newDataProduct?.promotion_info?.id) { delete newDataProduct.promotion_info; }
                    if (newDataProduct?.repair_time?.id) { delete newDataProduct.repair_time; }

                    if (dataMedias.length !== 0) {
                        const newDataMedias = await this.handleDataMedias(dataMedias);
                        newDataProduct.media = newDataMedias;
                    }
                    delete newDataProduct.attribute_values;
                    // if (dataAtbvls.length !== 0) {
                    //     const newDataAtbvls = await this.handleDataAtbvls(dataAtbvls);
                    //     newDataProduct.attribute_values = newDataAtbvls;
                    // }
                    if (isEditProductPage) { await this.handleProductPage(); }
                    await editProduct(newDataProduct.id, newDataProduct);
                    await getDataProduct(newDataProduct.id);
                } else {
                    if (isEditProductPage) { await this.handleProductPage(); }
                    message.success('Success');
                }
                clickEditProduct();
            } else {
                clickEditProduct()
            }
        }
    }
    handleCancel = async () => {
        const { clickEditProduct } = this.props;
        if (this.props.isEditProduct) {
            confirm({
                title: 'Cảnh báo.Tác vụ chưa được lưu !!!',
                icon: <ExclamationCircleFilled />,
                content: 'Vui lòng lưu lại tác vụ',
                okText: 'Lưu lại',
                okType: 'default',
                onOk: () => {
                    this.handleEditProduct();
                },
                onCancel: async () => {
                },
            });
        } else {
            clickEditProduct();
        }
    }
    handleEdit = async () => {
        const { isEditVRA } = this.props;
        if (isEditVRA) {
            notification.open({
                message: 'CẢNH BÁO RỦI RO !!!',
                description: 'Vui lòng lưu lại các tác vụ phía dưới của bạn',
                onClick: () => {
                    return;
                },
            });
        } else {
            this.handleEditProduct()
        }
    }
    render() {
        const { dataProduct, isEdit, isLoadingProduct, } = this.props;
        const { dataCheckPermis, isLoadingMedia } = this.state;
        return (
            <Spin size='large' spinning={isLoadingProduct || isLoadingMedia}>
                <div className='space-y-[10px]'>
                    <div className='flex items-center justify-between'>
                        <Typography.Title level={4}>{dataProduct.name}</Typography.Title>
                        <Space>
                            {isEdit &&
                                <Button onClick={() => this.handleCancel()}
                                    className='bg-[#e94138] text-white'>
                                    Hủy
                                </Button>
                            }
                            <Button disabled={!dataCheckPermis['product.change_product']}
                                onClick={() => this.handleEdit()} className='bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                                {isEdit ? 'Lưu' : 'Chỉnh sửa'}
                            </Button>
                        </Space>
                    </div>
                    <div className='space-y-[10px]'>
                        <div className='lg:grid grid-cols-2 gap-[10px] space-y-[10px] lg:space-y-0'>
                            <div className='space-y-[10px]'>
                                <ProductIntroduce />
                                <ProductPage dataProduct={dataProduct} />
                            </div>
                            <div className='space-y-[10px]'>
                                <ProductAtbvlQuillTable />
                                <ProductMedia />
                                {/* <ProductAttributeValue /> */}


                            </div>
                        </div>
                        <ProductContent />
                    </div>
                </div>
            </Spin>
        );
    }

}

const mapStateToProps = state => {
    return {
        dataProduct: state.product.dataProduct,
        dataProductOriginal: state.product.dataProductOriginal,
        isEdit: state.product.isEdit,
        isLoadingProduct: state.product.isLoading,
        description: state.product.description,
        shortDescription: state.product.shortDescription,
        dataProductPage: state.productPage.dataProductPage,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,

        isEditProductPage: state.productPage.isEditProductPage,
        isEditProduct: state.product.isEditProduct,
        isEditVRA: state.variant.isEdit,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
        editProduct: (id, data) => dispatch(actions.editProductRedux(id, data)),

        clickEditProduct: (value) => dispatch(actions.clickEditProductRedux(value)),
        setIsEditProduct: (data) => dispatch(actions.setIsEditProductRedux(data)),

        setDataProduct: (data) => dispatch(actions.setDataProductRedux(data)),
        setDataProductOriginal: (data) => dispatch(actions.setDataProductOriginalRedux(data)),

        getDataProductPage: (id) => dispatch(actions.getDataProductPageRedux(id)),
        createProductPage: (data) => dispatch(actions.createProductPageRedux(data)),
        editProductPage: (id, data) => dispatch(actions.editProductPageRedux(id, data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
