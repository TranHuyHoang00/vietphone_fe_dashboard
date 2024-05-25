import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Select, message, Input } from 'antd';
import FormSelectItem from '@components/selects/formSelectItem';
class product_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
        }
    }
    async componentDidMount() {
        this.props.getListBrand(this.state.dataFilter);
        this.props.getListTag(this.state.dataFilter);
        this.props.getListCategory(this.state.dataFilter);
        this.props.getListVariantAttributeGroup(this.state.dataFilter);
    }
    onSearch = (value, nameFormSelect) => {
        let dataFilter = this.state.dataFilter;
        dataFilter.search = value;
        if (nameFormSelect === 'brand') { this.props.getListBrand(dataFilter); }
        if (nameFormSelect === 'tag') { this.props.getListTag(dataFilter); }
        if (nameFormSelect === 'category') { this.props.getListCategory(dataFilter); }
        if (nameFormSelect === 'variant_attribute_group') { this.props.getListVariantAttributeGroup(dataFilter); }
    }
    handleCreate = async (nameFormSelect) => {
        if (nameFormSelect === 'brand') {
            if (!this.props.dataBrand.name) { message.error('Thiếu tên thương hiệu'); return; }
            await this.props.createBrand(this.props.dataBrand);
            await this.props.getListBrand(this.state.dataFilter);
        }
        if (nameFormSelect === 'tag') {
            if (!this.props.dataTag.name) { message.error('Thiếu tên tag'); return; }
            await this.props.createTag(this.props.dataTag);
            await this.props.getListTag(this.state.dataFilter);
        }
        if (nameFormSelect === 'category') {
            if (!this.props.dataCategory.name) { message.error('Thiếu tên danh mục'); return; }
            await this.props.createCategory(this.props.dataCategory);
            await this.props.getListCategory(this.state.dataFilter);
        }
        if (nameFormSelect === 'variant_attribute_group') {
            await this.props.getListVariantAttributeGroup(this.state.dataFilter);
        }
    }
    render() {
        let data_product = this.props.data_product;
        let dataBrands = this.props.dataBrands;
        let dataTags = this.props.dataTags;
        let dataCategorys = this.props.dataCategorys;
        let dataVariantAttributeGroups = this.props.dataVariantAttributeGroups;
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
                                    nameFormSelect={'brand'}
                                    value={data_product.product_brand}
                                    options={dataBrands.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!this.props.is_edit}
                                    disabledButtonCreate={false}
                                    disabledSearch={false}

                                    onSearch={this.onSearch}
                                    variableSelect={'product_brand'}
                                    onChangeSelect={this.props.on_change_product}

                                    variableInputSearch={'name'}
                                    onChangeInput={this.props.onChangeBrand}
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
                                    nameFormSelect={'tag'} mode={'multiple'}
                                    value={data_product.tags}
                                    options={dataTags.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!this.props.is_edit}
                                    disabledButtonCreate={false}
                                    disabledSearch={false}
                                    onSearch={this.onSearch}
                                    variableSelect={'tags'}
                                    onChangeSelect={this.props.on_change_product}
                                    variableInputSearch={'name'}
                                    onChangeInput={this.props.onChangeTag}
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
                                    nameFormSelect={'category'} mode={'multiple'}
                                    value={data_product.categories}
                                    options={dataCategorys.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!this.props.is_edit}
                                    disabledButtonCreate={false}
                                    disabledSearch={false}
                                    onSearch={this.onSearch}
                                    variableSelect={'categories'}
                                    onChangeSelect={this.props.on_change_product}
                                    variableInputSearch={'name'}
                                    onChangeInput={this.props.onChangeCategory}
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
                                    nameFormSelect={'variant_attribute_group'}
                                    value={(data_product?.variant_attribute_group?.id) ? (data_product.variant_attribute_group.id) : data_product.variant_attribute_group}
                                    options={dataVariantAttributeGroups.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!this.props.is_edit}
                                    disabledButtonCreate={true}
                                    disabledSearch={true}
                                    onSearch={this.onSearch}
                                    variableSelect={'variant_attribute_group'}
                                    onChangeSelect={this.props.on_change_product}
                                    variableInputSearch={'name'}
                                    onChangeInput={this.props.onChangeVariantAttributeGroup}
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
        dataBrands: state.brand.dataBrands,
        dataBrand: state.brand.dataBrand,
        dataTags: state.tag.dataTags,
        dataTag: state.tag.dataTag,
        dataCategorys: state.category.dataCategorys,
        dataCategory: state.category.dataCategory,
        dataVariantAttributeGroups: state.variant_attribute_group.dataVariantAttributeGroups,
        dataVariantAttributeGroup: state.variant_attribute_group.dataVariantAttributeGroup,
        is_edit: state.product.is_edit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListBrand: (dataFilter) => dispatch(actions.getListBrandRedux(dataFilter)),
        onChangeBrand: (event, id,) => dispatch(actions.onChangeBrandRedux(event, id,)),
        createBrand: (data) => dispatch(actions.createBrandRedux(data)),

        getListTag: (dataFilter) => dispatch(actions.getListTagRedux(dataFilter)),
        onChangeTag: (event, id,) => dispatch(actions.onChangeTagRedux(event, id,)),
        createTag: (data) => dispatch(actions.createTagRedux(data)),

        getListCategory: (dataFilter) => dispatch(actions.getListCategoryRedux(dataFilter)),
        onChangeCategory: (event, id,) => dispatch(actions.onChangeCategoryRedux(event, id,)),
        createCategory: (data) => dispatch(actions.createCategoryRedux(data)),

        getListVariantAttributeGroup: (dataFilter) => dispatch(actions.getListVariantAttributeGroupRedux(dataFilter)),
        onChangeVariantAttributeGroup: (event, id,) => dispatch(actions.onChangeVariantAttributeGroupRedux(event, id,)),
        createVariantAttributeGroup: (data) => dispatch(actions.createVariantAttributeGroupRedux(data)),

        on_change_product: (event, id,) => dispatch(actions.on_change_product_redux(event, id,)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_introduce));
