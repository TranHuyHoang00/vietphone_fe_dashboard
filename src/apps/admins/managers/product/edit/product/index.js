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
import { create_media } from '@services/media_service';
import { show_notification } from '@utils/show_notification';
import { check_permission } from '@utils/check_permission';
import { data_products } from '@datas/data_after_check_permissions';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_atbvl_ids: [],
            data_media_ids: [],
            data_media_raws: [],
            data_before_checks: {},
        }
    }
    async componentDidMount() {
        let data_before_checks = await check_permission(data_products, this.props.data_user_permissions, this.props.is_superuser);
        this.setState({
            data_before_checks: data_before_checks,
        });
    }
    handle_product_page = async () => {
        let data_product = this.props.data_product;
        let data_product_page = this.props.data_product_page;
        data_product_page.product = data_product.id;
        if (!data_product_page.id) {
            await this.props.create_product_page(data_product_page);
            this.props.get_product_page(data_product.id);
        } else {
            await this.props.edit_product_page(data_product_page.id, data_product_page);
            this.props.get_product_page(data_product.id);
        }
    }
    handle_create_media = async () => {
        try {
            let data_media_ids_new = [];
            let data_media_ids = this.state.data_media_ids;
            let data_atbvl_raws = this.state.data_media_raws;
            for (const item of data_atbvl_raws) {
                if (!item.id) {
                    let data = await create_media(item);
                    if (data && data.data && data.data.success === 1) {
                        data_media_ids_new.push(data.data.data.id);
                    }
                }
            }
            return [...data_media_ids_new, ...data_media_ids];
        } catch (error) {
            show_notification(error);
        }
    }
    handle_edit_product = async () => {
        let data_product = this.props.data_product;
        if (data_product?.id) {
            if (this.props.is_edit) {
                data_product.description = this.props.description;
                if (data_product?.variant_attribute_group?.name) { delete data_product.variant_attribute_group; }
                if (data_product?.attribute_values?.[0]?.id) { delete data_product.attribute_values; }
                let data_atbvl_ids = this.state.data_atbvl_ids;
                if (data_atbvl_ids && data_atbvl_ids.length === 0) {
                    delete data_product.attribute_values;
                } else {
                    data_product.attribute_values = data_atbvl_ids;
                }
                let media = await this.handle_create_media();
                if (media && media.length === 0) {
                    if (data_product?.media?.[0]?.id) {
                        delete data_product.media;
                    }
                } else {
                    data_product.media = media;
                }
                await this.props.edit_product(data_product.id, data_product);
                await this.handle_product_page();
                await this.props.get_product(data_product.id);
                this.props.click_edit_product();
            } else {
                this.props.click_edit_product()
            }
        }
    }
    get_data_atbvl = (data_atbvl_ids) => {
        this.setState({ data_atbvl_ids: data_atbvl_ids })
    }
    get_data_media = (data_media_ids, data_media_raws) => {
        this.setState({ data_media_ids: data_media_ids, data_media_raws: data_media_raws })
    }
    render() {
        let data_product = this.props.data_product;
        let data_before_checks = this.state.data_before_checks;
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
                        <Button disabled={!data_before_checks['product.change_product']}
                            onClick={() => this.handle_edit_product()} className='bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                            {this.props.is_edit === false ? 'Chỉnh sửa' : 'Lưu'}
                        </Button>
                    </Space>
                </div>
                <div className='space-y-[10px]'>
                    <div className='lg:grid grid-cols-2 gap-[10px] space-y-[10px] lg:space-y-0'>
                        <div className='space-y-[10px]'>
                            <ProductIntroduce />
                            <ProductPage />
                            <ProductMedia data_media_raws={data_product.media}
                                get_data_media={this.get_data_media} />
                        </div>
                        <div>
                            <ProductAttributeValue get_data_atbvl={this.get_data_atbvl}
                                data_atbvl_raws={data_product.attribute_values} />
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
        data_product: state.product.data_product,
        is_edit: state.product.is_edit,
        description: state.product.description,
        data_product_page: state.product_page.data_product_page,

        data_user_permissions: state.user.data_user_permissions,
        is_superuser: state.user.is_superuser,
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
