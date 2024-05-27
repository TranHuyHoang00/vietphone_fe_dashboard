import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Typography, Space } from 'antd';
import ProductIntroduce from './elements/product_introduce';
import ProductAttributeValue from './elements/product_attribute_value';
import ProductPage from './elements/product_page';
import ProductContent from './elements/product_content';
import ProductMedia from './elements/product_media';
import { createMedia } from '@services/media_service';
import { showNotification } from '@utils/handleFuncNotification';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataProducts } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_atbvl_ids: [],
            dataMediaIds: [],
            data_media_raws: [],
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        let dataCheckPermis = await handleCheckPermis(dataProducts, this.props.dataUserPermis, this.props.isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    handle_product_page = async () => {
        let dataProduct = this.props.dataProduct;
        let dataProductPage = this.props.dataProductPage;
        dataProductPage.product = dataProduct.id;
        if (!dataProductPage.id) {
            await this.props.createProductPage(dataProductPage);
            this.props.getDataProductPage(dataProduct.id);
        } else {
            await this.props.editProductPage(dataProductPage.id, dataProductPage);
            this.props.getDataProductPage(dataProduct.id);
        }
    }
    handle_create_media = async () => {
        try {
            let data_media_ids_new = [];
            let dataMediaIds = this.state.dataMediaIds;
            let data_atbvl_raws = this.state.data_media_raws;
            for (const item of data_atbvl_raws) {
                if (!item.id) {
                    let data = await createMedia(item);
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
    handle_edit_product = async () => {
        let dataProduct = this.props.dataProduct;
        if (dataProduct?.id) {
            if (this.props.isEdit) {
                dataProduct.description = this.props.description;
                if (dataProduct?.variant_attribute_group?.name) { delete dataProduct.variant_attribute_group; }
                if (dataProduct?.attribute_values?.[0]?.id) { delete dataProduct.attribute_values; }
                let data_atbvl_ids = this.state.data_atbvl_ids;
                if (data_atbvl_ids && data_atbvl_ids.length === 0) {
                    delete dataProduct.attribute_values;
                } else {
                    dataProduct.attribute_values = data_atbvl_ids;
                }
                let media = await this.handle_create_media();
                if (media && media.length === 0) {
                    if (dataProduct?.media?.[0]?.id) {
                        delete dataProduct.media;
                    }
                } else {
                    dataProduct.media = media;
                }
                await this.props.editProduct(dataProduct.id, dataProduct);
                await this.handle_product_page();
                await this.props.getDataProduct(dataProduct.id);
                this.props.click_edit_product();
            } else {
                this.props.click_edit_product()
            }
        }
    }
    get_data_atbvl = (data_atbvl_ids) => {
        this.setState({ data_atbvl_ids: data_atbvl_ids })
    }
    get_data_media = (dataMediaIds, data_media_raws) => {
        this.setState({ dataMediaIds: dataMediaIds, data_media_raws: data_media_raws })
    }
    render() {
        let dataProduct = this.props.dataProduct;
        let dataCheckPermis = this.state.dataCheckPermis;
        return (
            <div className='space-y-[10px]'>
                <div className='flex items-center justify-between'>
                    <Typography.Title level={4}>{this.props.dataProduct.name}</Typography.Title>
                    <Space>
                        {this.props.isEdit &&
                            <Button onClick={() => this.props.click_edit_product()}
                                className='bg-[#e94138] text-white'>
                                Hủy
                            </Button>
                        }
                        <Button disabled={!dataCheckPermis['product.change_product']}
                            onClick={() => this.handle_edit_product()} className='bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                            {this.props.isEdit === false ? 'Chỉnh sửa' : 'Lưu'}
                        </Button>
                    </Space>
                </div>
                <div className='space-y-[10px]'>
                    <div className='lg:grid grid-cols-2 gap-[10px] space-y-[10px] lg:space-y-0'>
                        <div className='space-y-[10px]'>
                            <ProductIntroduce />
                            <ProductPage />
                            <ProductMedia data_media_raws={dataProduct.media}
                                get_data_media={this.get_data_media} />
                        </div>
                        <div>
                            <ProductAttributeValue get_data_atbvl={this.get_data_atbvl}
                                data_atbvl_raws={dataProduct.attribute_values} />
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
        dataProductPage: state.product_page.dataProductPage,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
        click_edit_product: (value) => dispatch(actions.clickEditProductRedux(value)),
        editProduct: (id, data) => dispatch(actions.editProductRedux(id, data)),

        createProductPage: (data) => dispatch(actions.createProductPageRedux(data)),
        editProductPage: (id, data) => dispatch(actions.editProductPageRedux(id, data)),
        getDataProductPage: (id) => dispatch(actions.getDataProductPageRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
