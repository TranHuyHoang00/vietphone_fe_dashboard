import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Collapse, Select } from 'antd';
import { text_line_1_3 } from '../../../../../components/displays/data_line_1_3';
import FormSelectItem from '../../../../../components/selects/form_select_item';
class product_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_filter: { page: 1, limit: 100, search: '' },
        }
    }
    async componentDidMount() {
        this.props.get_list_brand(this.state.data_filter);
        this.props.get_list_tag(this.state.data_filter);
        this.props.get_list_category(this.state.data_filter);
        this.props.get_list_variant_attribute_group(this.state.data_filter);
    }
    on_search = (value, form_name) => {
        let data_filter = this.state.data_filter;
        data_filter.search = value;
        if (form_name === 'brand') { this.props.get_list_brand(data_filter); }
        if (form_name === 'tag') { this.props.get_list_tag(data_filter); }
        if (form_name === 'category') { this.props.get_list_category(data_filter); }
        if (form_name === 'variant_attribute_group') { this.props.get_list_variant_attribute_group(data_filter); }
    }
    handle_create = async (form_name) => {
        if (form_name === 'brand') {
            await this.props.create_brand(this.props.data_brand);
            await this.props.get_list_brand(this.state.data_filter);
        }
        if (form_name === 'tag') {
            await this.props.create_tag(this.props.data_tag);
            await this.props.get_list_tag(this.state.data_filter);
        }
        if (form_name === 'category') {
            await this.props.create_category(this.props.data_category);
            await this.props.get_list_category(this.state.data_filter);
        }
        if (form_name === 'variant_attribute_group') {
            await this.props.get_list_variant_attribute_group(this.state.data_filter);
        }
    }
    render() {
        let data_product = this.props.data_product;
        let data_brands = this.props.data_brands;
        let data_tags = this.props.data_tags;
        let data_categorys = this.props.data_categorys;
        let data_variant_attribute_groups = this.props.data_variant_attribute_groups;
        return (
            <Collapse defaultActiveKey={['1']} >
                <Collapse.Panel header="Thông tin sản phẩm" key="1">
                    <div className='space-y-[5px]'>
                        {text_line_1_3('Tên sản phẩm', data_product.name)}

                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <span>Thương hiệu</span>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <FormSelectItem width={'100%'} placeholder={'Tên thương hiệu'}
                                    form_name={'brand'}
                                    value={data_product.product_brand}
                                    options={data_brands.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabled_select={!this.props.is_edit}
                                    disabled_button={false}
                                    disabled_search={false}

                                    on_search={this.on_search}
                                    variable_select={'product_brand'}
                                    on_change_select={this.props.on_change_product}

                                    variable_input={'name'}
                                    on_change_input={this.props.on_change_brand}
                                    handle_create={this.handle_create}
                                />

                            </div>
                        </div>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <span>Tag</span>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <FormSelectItem width={'100%'} placeholder={'Tên tag'}
                                    form_name={'tag'} mode={'multiple'}
                                    value={data_product.tags}
                                    options={data_tags.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabled_select={!this.props.is_edit}
                                    disabled_button={true}
                                    disabled_search={true}
                                    on_search={this.on_search}
                                    variable_select={'tags'}
                                    on_change_select={this.props.on_change_product}
                                    variable_input={'name'}
                                    on_change_input={this.props.on_change_tag}
                                    handle_create={this.handle_create}
                                />

                            </div>
                        </div>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <span>Danh mục</span>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <FormSelectItem width={'100%'} placeholder={'Tên danh mục'}
                                    form_name={'category'} mode={'multiple'}
                                    value={data_product.categories}
                                    options={data_categorys.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabled_select={!this.props.is_edit}
                                    disabled_button={true}
                                    disabled_search={true}
                                    on_search={this.on_search}
                                    variable_select={'categories'}
                                    on_change_select={this.props.on_change_product}
                                    variable_input={'name'}
                                    on_change_input={this.props.on_change_category}
                                    handle_create={this.handle_create}
                                />

                            </div>
                        </div>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <span>Loại SP-TS </span>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <FormSelectItem width={'100%'} placeholder={'Tên SP-TS'}
                                    form_name={'variant_attribute_group'}
                                    value={data_product.variant_attribute_group}
                                    options={data_variant_attribute_groups.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabled_select={!this.props.is_edit}
                                    disabled_button={true}
                                    disabled_search={true}
                                    on_search={this.on_search}
                                    variable_select={'variant_attribute_group'}
                                    on_change_select={this.props.on_change_product}
                                    variable_input={'name'}
                                    on_change_input={this.props.on_change_variant_attribute_group}
                                    handle_create={this.handle_create}
                                />

                            </div>
                        </div>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <span>Trạng thái</span>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Select disabled={!this.props.is_edit} style={{ width: '100%' }} value={this.props.data_product.is_active}
                                    onChange={(event) => this.props.on_change_product(event, 'is_active')}
                                    options={[
                                        { value: true, label: 'Mở' },
                                        { value: false, label: 'Khóa' },
                                    ]} />
                            </div>
                        </div>
                    </div>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_product: state.product.data_product,
        data_brands: state.brand.data_brands,
        data_brand: state.brand.data_brand,
        data_tags: state.tag.data_tags,
        data_tag: state.tag.data_tag,
        data_categorys: state.category.data_categorys,
        data_category: state.category.data_category,
        data_variant_attribute_groups: state.variant_attribute_group.data_variant_attribute_groups,
        data_variant_attribute_group: state.variant_attribute_group.data_variant_attribute_group,
        is_edit: state.product.is_edit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_brand: (data_filter) => dispatch(actions.get_list_brand_redux(data_filter)),
        on_change_brand: (event, id,) => dispatch(actions.on_change_brand_redux(event, id,)),
        create_brand: (data) => dispatch(actions.create_brand_redux(data)),

        get_list_tag: (data_filter) => dispatch(actions.get_list_tag_redux(data_filter)),
        on_change_tag: (event, id,) => dispatch(actions.on_change_tag_redux(event, id,)),
        create_tag: (data) => dispatch(actions.create_tag_redux(data)),

        get_list_category: (data_filter) => dispatch(actions.get_list_category_redux(data_filter)),
        on_change_category: (event, id,) => dispatch(actions.on_change_category_redux(event, id,)),
        create_category: (data) => dispatch(actions.create_category_redux(data)),

        get_list_variant_attribute_group: (data_filter) => dispatch(actions.get_list_variant_attribute_group_redux(data_filter)),
        on_change_variant_attribute_group: (event, id,) => dispatch(actions.on_change_variant_attribute_group_redux(event, id,)),
        create_variant_attribute_group: (data) => dispatch(actions.create_variant_attribute_group_redux(data)),

        on_change_product: (event, id,) => dispatch(actions.on_change_product_redux(event, id,)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_introduce));
