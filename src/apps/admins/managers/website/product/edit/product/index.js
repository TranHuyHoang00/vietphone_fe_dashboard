import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Typography, Space, message } from 'antd';
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
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCheckPermis: {},
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
            editProduct, getDataProduct, isEditProductPage, isEditProduct } = this.props;
        if (dataProduct?.id) {
            if (isEdit) {
                if (isEditProduct) {
                    const dataMedias = dataProduct.media;
                    // const dataAtbvls = dataProduct.attribute_values;
                    let newDataProduct = {
                        ...dataProduct,
                        description: description,
                        short_description: shortDescription,
                    }
                    if (newDataProduct?.variant_attribute_group?.id) { delete newDataProduct.variant_attribute_group; }
                    if (newDataProduct?.promotion_info?.id) { delete newDataProduct.promotion_info; }
                    if (newDataProduct?.repair_time?.id) { delete newDataProduct.repair_time; }

                    if (dataMedias.length !== 0) {
                        const newDataMedias = await this.handleDataMedias(dataMedias);
                        newDataProduct.media = newDataMedias;
                    }
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
    render() {
        const { dataProduct, isEdit, clickEditProduct } = this.props;
        const { dataCheckPermis } = this.state;
        return (
            <div className='space-y-[10px]'>
                <div className='flex items-center justify-between'>
                    <Typography.Title level={4}>{dataProduct.name}</Typography.Title>
                    <Space>
                        {isEdit &&
                            <Button onClick={() => clickEditProduct()}
                                className='bg-[#e94138] text-white'>
                                Hủy
                            </Button>
                        }
                        <Button disabled={!dataCheckPermis['product.change_product']}
                            onClick={() => this.handleEditProduct()} className='bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                            {isEdit ? 'Lưu' : 'Chỉnh sửa'}
                        </Button>
                    </Space>
                </div>
                <div className='space-y-[10px]'>
                    <div className='lg:grid grid-cols-2 gap-[10px] space-y-[10px] lg:space-y-0'>
                        <div className='space-y-[10px]'>
                            <ProductIntroduce />
                            <ProductPage dataProduct={dataProduct} />
                            <ProductMedia />
                        </div>
                        <div>
                            <ProductAtbvlQuillTable />
                            {/* <ProductAttributeValue /> */}
                        </div>
                    </div>
                    <ProductContent />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        dataProduct: state.product.dataProduct,
        isEdit: state.product.isEdit,
        description: state.product.description,
        shortDescription: state.product.shortDescription,
        dataProductPage: state.productPage.dataProductPage,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,

        isEditProductPage: state.productPage.isEditProductPage,
        isEditProduct: state.product.isEditProduct,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
        clickEditProduct: (value) => dispatch(actions.clickEditProductRedux(value)),
        editProduct: (id, data) => dispatch(actions.editProductRedux(id, data)),

        createProductPage: (data) => dispatch(actions.createProductPageRedux(data)),
        editProductPage: (id, data) => dispatch(actions.editProductPageRedux(id, data)),
        getDataProductPage: (id) => dispatch(actions.getDataProductPageRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
