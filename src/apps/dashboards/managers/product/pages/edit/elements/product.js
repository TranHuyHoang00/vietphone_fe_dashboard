import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Button, Typography, Space, message } from 'antd';
import Product_introduce from '../collapses/product_introduce';
import Product_media from '../collapses/product_media';
import Product_attribute_value from '../collapses/product_attribute_value';
import Product_content from '../collapses/product_content';
import { create_media } from '../../../../../../../services/media_service';

class product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_medias: [],
            data_media_ids: [],

            description: '',
        }
    }
    handle_edit_product = async () => {
        let data_product = this.props.data_product;
        data_product.description = this.state.description;
        if (this.props.is_edit == false) { this.props.click_edit_product() };
        if (this.props.is_edit == true) {
            if (this.state.data_medias.length !== 0) {
                let media = await this.handle_create_media(this.state.data_medias);
                data_product.media = media;
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
                    if (data && data.data && data.data.success == 1) {
                        data_media_ids_new.push(data.data.data.id);
                    }
                }
            }
            return [...data_media_ids_new, ...data_media_ids];
        } catch (e) {
            message.error('Lỗi hệ thống');
        }
    }

    onchange_content = (description) => {
        this.setState({
            description: description,
        })
    }
    render() {
        return (
            <div className='space-y-[10px]'>
                <div className='flex items-center justify-between'>
                    <Typography.Title level={4}>{this.props.data_product.name}</Typography.Title>
                    <Space>
                        {this.props.is_edit == true &&
                            <Button onClick={() => this.props.click_edit_product()}
                                className='bg-[#e94138] text-white'>
                                Hủy
                            </Button>
                        }
                        <Button onClick={() => this.handle_edit_product()} className='bg-[#0e97ff] text-white'>
                            {this.props.is_edit == false ? 'Chỉnh sửa' : 'Lưu'}
                        </Button>
                    </Space>
                </div>
                <div className='space-y-[10px]'>
                    <div className='lg:grid grid-cols-2 gap-[10px] space-y-[10px] lg:space-y-0'>
                        <div className='space-y-[10px]'>
                            <Product_introduce />
                            <Product_media handle_get_media={this.handle_get_media}
                                data_media_ids={this.props.data_product.media} />
                        </div>
                        <div>
                            <Product_attribute_value />
                        </div>
                    </div>
                    <Product_content onchange_content={this.onchange_content}
                        value={this.props.data_product.description} />
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
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_product: (id) => dispatch(actions.get_product_redux(id)),
        click_edit_product: (value) => dispatch(actions.click_edit_product_redux(value)),
        edit_product: (id, data) => dispatch(actions.edit_product_redux(id, data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product));
