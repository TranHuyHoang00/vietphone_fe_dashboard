import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Button, Typography, Space, message } from 'antd';
import ProductIntroduce from '../collapses/product_introduce';
import ProductMedia from '../collapses/product_media';
import ProductAttributeValue from '../collapses/product_attribute_value';
import ProductContent from '../collapses/product_content';
import ProductPage from '../collapses/product_page';
import { create_media } from '../../../../../../../services/media_service';

class product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_medias: [],
            data_media_ids: [],
        }
    }
    handle_edit_product = async () => {
        let data_product = this.props.data_product;
        data_product.description = this.props.description;
        if (this.props.is_edit === false) { this.props.click_edit_product() };
        if (this.props.is_edit) {
            let data_product_page = this.props.data_product_page;
            data_product_page.product = data_product.id;
            if (!data_product_page.id) {
                await this.props.create_product_page(data_product_page);
                this.props.get_product_page(data_product.id);
            } else {
                await this.props.edit_product_page(data_product_page.id, data_product_page);
                this.props.get_product_page(data_product.id);
            }
            if (this.state.data_medias.length !== 0) {
                let media = await this.handle_create_media(this.state.data_medias);
                data_product.media = media;
            }
            if (this.state.data_medias == 0) {
                data_product.media = [];
            }
            await this.props.edit_product(data_product.id, data_product);
            await this.props.get_product(data_product.id);
            this.props.click_edit_product();
        }
    }
    handle_get_media = (data_medias, data_media_ids) => {
        this.setState({ data_medias: data_medias, data_media_ids: data_media_ids });
    }
    handle_create_media = async (data_medias) => {
        try {
            let data_media_ids_new = [];
            let data_media_ids = this.state.data_media_ids;
            for (const item of data_medias) {
                if (!item.id) {
                    let data = await create_media(item);
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
        return (
            <div className='space-y-[10px]'>
                <div className='flex items-center justify-between'>
                    <Typography.Title level={4}>{this.props.data_product.name}</Typography.Title>
                    <Space>
                        {this.props.is_edit &&
                            <Button onClick={() => this.props.click_edit_product()}
                                className='bg-[#e94138] text-white'>
                                Hủy
                            </Button>
                        }
                        <Button onClick={() => this.handle_edit_product()} className='bg-[#0e97ff] text-white'>
                            {this.props.is_edit === false ? 'Chỉnh sửa' : 'Lưu'}
                        </Button>
                    </Space>
                </div>
                <div className='space-y-[10px]'>
                    <div className='lg:grid grid-cols-2 gap-[10px] space-y-[10px] lg:space-y-0'>
                        <div className='space-y-[10px]'>
                            <ProductIntroduce />
                            <ProductPage />
                            <ProductMedia handle_get_media={this.handle_get_media}
                                data_media_ids={this.props.data_product.media} />
                        </div>
                        <div>
                            <ProductAttributeValue />
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
        is_loading: state.product.is_loading,
        data_product: state.product.data_product,
        is_edit: state.product.is_edit,
        data_product_page: state.product_page.data_product_page,
        description: state.product.description,
    };
};
const mapDispatchToProps = dispatch => {
    return {

        get_product: (id) => dispatch(actions.get_product_redux(id)),
        click_edit_product: (value) => dispatch(actions.click_edit_product_redux(value)),
        edit_product: (id, data) => dispatch(actions.edit_product_redux(id, data)),

        create_product_page: (data) => dispatch(actions.create_product_page_redux(data)),
        edit_product_page: (id, data) => dispatch(actions.edit_product_page_redux(id, data)),
        get_product_page: (id) => dispatch(actions.get_product_page_redux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product));
