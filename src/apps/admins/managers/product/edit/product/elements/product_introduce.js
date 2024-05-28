import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Select, message, Input } from 'antd';
import FormSelectMultiple from '@components/selects/formSelectMultiple';
class product_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
        }
    }
    async componentDidMount() {
        const { getListBrand, getListTag, getListCategory, getListVariantAttributeGroup } = this.props;
        const { dataFilter } = this.state;
        getListBrand(dataFilter);
        getListTag(dataFilter);
        getListCategory(dataFilter);
        getListVariantAttributeGroup(dataFilter);
    }
    onSearch = (valueSearch, nameFormSelect) => {
        const { getListBrand, getListTag, getListCategory, getListVariantAttributeGroup } = this.props;
        const { dataFilter } = this.state;
        let newDataFilter = {
            ...dataFilter,
            search: valueSearch,
        }
        switch (nameFormSelect) {
            case 'brand':
                getListBrand(newDataFilter)
                break;
            case 'tag':
                getListTag(newDataFilter)
                break;
            case 'category':
                getListCategory(newDataFilter)
                break;
            case 'variant_attribute_group':
                getListTag(getListVariantAttributeGroup)
                break;
            default:
                break;
        }
    }
    handleCreate = async (nameFormSelect) => {
        const { getListBrand, getListTag, getListCategory, getListVariantAttributeGroup,
            createBrand, createTag, createCategory,
            dataBrand, dataTag, dataCategory,
        } = this.props;
        const { dataFilter } = this.state;
        switch (nameFormSelect) {
            case 'brand':
                if (!dataBrand.name) { message.error('Thiếu tên thương hiệu'); return; }
                await createBrand(dataBrand);
                await getListBrand(dataFilter);
                break;
            case 'tag':
                if (!dataTag.name) { message.error('Thiếu tên tag'); return; }
                await createTag(dataTag);
                await getListTag(dataFilter);
                break;
            case 'category':
                if (!dataCategory.name) { message.error('Thiếu tên danh mục'); return; }
                await createCategory(dataCategory);
                await getListCategory(dataFilter);
                break;
            case 'variant_attribute_group':
                await getListVariantAttributeGroup(dataFilter);
                break;
            default:
                break;
        }
    }
    render() {
        const { dataProduct, dataBrands, dataTags, dataCategorys, dataVariantAttributeGroups,
            isEdit, onChangeProduct, onChangeBrand, onChangeTag, onChangeCategory, onChangeVariantAttributeGroup
        } = this.props;
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
                                <Input disabled={!isEdit} value={dataProduct.name}
                                    onChange={(event) => onChangeProduct(event.target.value, 'name')} />
                            </div>
                        </div>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/3 flex items-center justify-between'>
                                <span>Thương hiệu</span>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <FormSelectMultiple width={'100%'} placeholder={'Tên thương hiệu'}
                                    nameFormSelect={'brand'}
                                    value={dataProduct.product_brand}
                                    options={dataBrands.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!isEdit}
                                    disabledButtonCreate={false}
                                    disabledSearch={false}

                                    onSearch={this.onSearch}
                                    variableSelect={'product_brand'}
                                    onChangeSelect={onChangeProduct}

                                    variableInputSearch={'name'}
                                    onChangeInput={onChangeBrand}
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
                                <FormSelectMultiple width={'100%'} placeholder={'Tên tag'}
                                    nameFormSelect={'tag'} mode={'multiple'}
                                    value={dataProduct.tags}
                                    options={dataTags.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!isEdit}
                                    disabledButtonCreate={false}
                                    disabledSearch={false}
                                    onSearch={this.onSearch}
                                    variableSelect={'tags'}
                                    onChangeSelect={onChangeProduct}
                                    variableInputSearch={'name'}
                                    onChangeInput={onChangeTag}
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
                                <FormSelectMultiple width={'100%'} placeholder={'Tên danh mục'}
                                    nameFormSelect={'category'} mode={'multiple'}
                                    value={dataProduct.categories}
                                    options={dataCategorys.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!isEdit}
                                    disabledButtonCreate={false}
                                    disabledSearch={false}
                                    onSearch={this.onSearch}
                                    variableSelect={'categories'}
                                    onChangeSelect={onChangeProduct}
                                    variableInputSearch={'name'}
                                    onChangeInput={onChangeCategory}
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
                                <FormSelectMultiple width={'100%'} placeholder={'Tên SP-TS'}
                                    nameFormSelect={'variant_attribute_group'}
                                    value={(dataProduct?.variant_attribute_group?.id) ? (dataProduct.variant_attribute_group.id) : dataProduct.variant_attribute_group}
                                    options={dataVariantAttributeGroups.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    disabledSelect={!isEdit}
                                    disabledButtonCreate={true}
                                    disabledSearch={true}
                                    onSearch={this.onSearch}
                                    variableSelect={'variant_attribute_group'}
                                    onChangeSelect={onChangeProduct}
                                    variableInputSearch={'name'}
                                    onChangeInput={onChangeVariantAttributeGroup}
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
                                <Select disabled={!isEdit} style={{ width: '100%' }} value={dataProduct.is_active}
                                    onChange={(event) => onChangeProduct(event, 'is_active')}
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
        dataProduct: state.product.dataProduct,
        dataBrands: state.brand.dataBrands,
        dataBrand: state.brand.dataBrand,
        dataTags: state.tag.dataTags,
        dataTag: state.tag.dataTag,
        dataCategorys: state.category.dataCategorys,
        dataCategory: state.category.dataCategory,
        dataVariantAttributeGroups: state.variant_attribute_group.dataVariantAttributeGroups,
        dataVariantAttributeGroup: state.variant_attribute_group.dataVariantAttributeGroup,
        isEdit: state.product.isEdit,
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

        onChangeProduct: (event, id,) => dispatch(actions.onChangeProductRedux(event, id,)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_introduce));
