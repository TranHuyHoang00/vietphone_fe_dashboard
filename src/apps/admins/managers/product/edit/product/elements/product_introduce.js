import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Select, message, Input } from 'antd';
import FormSelectItem from '@components/selects/form_select_item';
class product_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
        }
    }
    async componentDidMount() {
        this.props.get_list_brand(this.state.dataFilter);
        this.props.getListTag(this.state.dataFilter);
        this.props.get_list_category(this.state.dataFilter);
        this.props.get_list_variant_attribute_group(this.state.dataFilter);
    }
    on_search = (value, form_name) => {
        let dataFilter = this.state.dataFilter;
        dataFilter.search = value;
        if (form_name === 'brand') { this.props.get_list_brand(dataFilter); }
        if (form_name === 'tag') { this.props.getListTag(dataFilter); }
        if (form_name === 'category') { this.props.get_list_category(dataFilter); }
        if (form_name === 'variant_attribute_group') { this.props.get_list_variant_attribute_group(dataFilter); }
    }
    handleCreate = async (form_name) => {
        if (form_name === 'brand') {
            if (!this.props.data_brand.name) { message.error('Thiếu tên thương hiệu'); return; }
            await this.props.create_brand(this.props.data_brand);
            await this.props.get_list_brand(this.state.dataFilter);
        }
        if (form_name === 'tag') {
            if (!this.props.dataTag.name) { message.error('Thiếu tên tag'); return; }
            await this.props.createTag(this.props.dataTag);
            await this.props.getListTag(this.state.dataFilter);
        }
        if (form_name === 'category') {
            if (!this.props.data_category.name) { message.error('Thiếu tên danh mục'); return; }
            await this.props.create_category(this.props.data_category);
            await this.props.get_list_category(this.state.dataFilter);
        }
        if (form_name === 'variant_attribute_group') {
            await this.props.get_list_variant_attribute_group(this.state.dataFilter);
        }
    }
    render() {
        let data_product = this.props.data_product;
        let data_brands = this.props.data_brands;
        let dataTags = this.props.dataTags;
        let data_categorys = this.props.data_categorys;
        let data_variant_attribute_groups = this.props.data_variant_attribute_groups;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Thông tin sản phẩm" key="1">
                    <div className='space-y-[5px]'>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <span>Trạng thái</span>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Input disabled={!this.props.is_edit} value={data_product.name}
                                    onChange={(event) => this.props.on_change_product(event.target.value, 'name')} />
                            </div>
                        </div>
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
                                    handleCreate={this.handleCreate}
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
                                    options={dataTags.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabled_select={!this.props.is_edit}
                                    disabled_button={false}
                                    disabled_search={false}
                                    on_search={this.on_search}
                                    variable_select={'tags'}
                                    on_change_select={this.props.on_change_product}
                                    variable_input={'name'}
                                    on_change_input={this.props.onChangeTag}
                                    handleCreate={this.handleCreate}
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
                                    disabled_button={false}
                                    disabled_search={false}
                                    on_search={this.on_search}
                                    variable_select={'categories'}
                                    on_change_select={this.props.on_change_product}
                                    variable_input={'name'}
                                    on_change_input={this.props.on_change_category}
                                    handleCreate={this.handleCreate}
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
                                    value={(data_product?.variant_attribute_group?.id) ? (data_product.variant_attribute_group.id) : data_product.variant_attribute_group}
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
                                    handleCreate={this.handleCreate}
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
        dataTags: state.tag.dataTags,
        dataTag: state.tag.dataTag,
        data_categorys: state.category.data_categorys,
        data_category: state.category.data_category,
        data_variant_attribute_groups: state.variant_attribute_group.data_variant_attribute_groups,
        data_variant_attribute_group: state.variant_attribute_group.data_variant_attribute_group,
        is_edit: state.product.is_edit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_brand: (dataFilter) => dispatch(actions.get_list_brand_redux(dataFilter)),
        on_change_brand: (event, id,) => dispatch(actions.on_change_brand_redux(event, id,)),
        create_brand: (data) => dispatch(actions.create_brand_redux(data)),

        getListTag: (dataFilter) => dispatch(actions.getListTagRedux(dataFilter)),
        onChangeTag: (event, id,) => dispatch(actions.onChangeTagRedux(event, id,)),
        createTag: (data) => dispatch(actions.createTagRedux(data)),

        get_list_category: (dataFilter) => dispatch(actions.get_list_category_redux(dataFilter)),
        on_change_category: (event, id,) => dispatch(actions.on_change_category_redux(event, id,)),
        create_category: (data) => dispatch(actions.create_category_redux(data)),

        get_list_variant_attribute_group: (dataFilter) => dispatch(actions.get_list_variant_attribute_group_redux(dataFilter)),
        on_change_variant_attribute_group: (event, id,) => dispatch(actions.on_change_variant_attribute_group_redux(event, id,)),
        create_variant_attribute_group: (data) => dispatch(actions.create_variant_attribute_group_redux(data)),

        on_change_product: (event, id,) => dispatch(actions.on_change_product_redux(event, id,)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_introduce));
