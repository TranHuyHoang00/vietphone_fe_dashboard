import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Drawer, Typography, Select, Popconfirm, Button, Space } from 'antd';
import { AiOutlineCheck } from "react-icons/ai";
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataEdit: {
                is_active: null,
                tags: [],
                categories: [],
                product_brand: null,
                promotion_info: null,
                repair_time: null,
            },
            dataFilter: { page: 1, limit: 100, search: '' }
        }
    }
    async componentDidMount() {
        const { getListBrand, getListTag, getListCategory, getListPromotion, getListRepair } = this.props;
        const { dataFilter } = this.state;
        await getListBrand(dataFilter);
        await getListTag(dataFilter);
        await getListCategory(dataFilter);
        await getListPromotion(dataFilter);
        await getListRepair(dataFilter);
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataEdit };
        copyState[id] = event;
        this.setState({
            dataEdit: {
                ...copyState
            }
        });
    }
    cleanDataEdit = (data) => {
        return Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) => value !== null && !(Array.isArray(value) && value.length === 0)
            )
        );
    };
    handleEdit = async () => {
        const { dataEdit } = this.state;
        const { editListProduct, getListProduct, dataFilter, listItemSelected, isResult, openDrawer } = this.props;
        const cleanedDataEdit = this.cleanDataEdit(dataEdit);
        await editListProduct(listItemSelected, cleanedDataEdit);
        if (isResult) {
            await getListProduct(dataFilter);
            openDrawer('edit', false);
        }
    }
    render() {

        const { listItemSelected, dataBrands, dataTags, dataCategorys, openDrawer, drawerEditBatch,
            dataPromotions, dataRepairs } = this.props;
        const { dataEdit } = this.state;
        return (
            <Drawer title="Sửa sản phầm hàng loạt" onClose={() => openDrawer('edit', false)} open={drawerEditBatch}>
                <div className='space-y-[10px]'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Select style={{ width: "100%" }} placement='topRight' value={dataEdit.is_active}
                            onChange={(value) => this.handleOnchangeInput(value, 'is_active')}
                            options={[
                                { value: null, label: 'BỎ TRỐNG' },
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]} />
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Thương hiệu</Typography.Text>
                        <Select style={{ width: "100%" }} placement='topRight' value={dataEdit.product_brand}
                            onChange={(value) => this.handleOnchangeInput(value, 'product_brand')}
                            options={[
                                { value: null, label: 'BỎ TRỐNG' },
                                { value: "", label: 'XÓA BỎ' },
                                ...dataBrands && dataBrands.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))]} />
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Khuyến mãi</Typography.Text>
                        <Select style={{ width: "100%" }} placement='topRight' value={dataEdit.promotion_info}
                            onChange={(value) => this.handleOnchangeInput(value, 'promotion_info')}
                            options={[
                                { value: null, label: 'BỎ TRỐNG' },
                                { value: "", label: 'XÓA BỎ' },
                                ...dataPromotions && dataPromotions.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))]} />
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Sửa chữa</Typography.Text>
                        <Select style={{ width: "100%" }} placement='topRight' value={dataEdit.repair_time}
                            onChange={(value) => this.handleOnchangeInput(value, 'repair_time')}
                            options={[
                                { value: null, label: 'BỎ TRỐNG' },
                                { value: "", label: 'XÓA BỎ' },
                                ...dataRepairs && dataRepairs.map((item) => ({
                                    label: item.value,
                                    value: item.id,
                                }))]} />
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Tag</Typography.Text>
                        <Select style={{ width: "100%" }} placement='topRight' mode="multiple" value={dataEdit.tags}
                            onChange={(value) => this.handleOnchangeInput(value, 'tags')}
                            options={[
                                ...dataTags && dataTags.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))]} />
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Danh mục</Typography.Text>
                        <Select style={{ width: "100%" }} placement='topRight' mode="multiple" value={dataEdit.categories}
                            onChange={(value) => this.handleOnchangeInput(value, 'categories')}
                            options={[
                                ...dataCategorys && dataCategorys.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))]} />
                    </div>
                    <div>
                        <Popconfirm onConfirm={() => this.handleEdit()}
                            title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                            placement="bottomLeft" okType='default'>
                            <Button className='w-full bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlineCheck />
                                    XÁC NHẬN
                                </Space>
                            </Button>
                        </Popconfirm>
                    </div>
                </div>
            </Drawer>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTags: state.tag.dataTags,
        dataBrands: state.brand.dataBrands,
        dataCategorys: state.category.dataCategorys,
        dataPromotions: state.promotion.dataPromotions,
        dataRepairs: state.repair.dataRepairs,
        isResult: state.product.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListBrand: (dataFilter) => dispatch(actions.getListBrandRedux(dataFilter)),
        getListTag: (dataFilter) => dispatch(actions.getListTagRedux(dataFilter)),
        getListCategory: (dataFilter) => dispatch(actions.getListCategoryRedux(dataFilter)),
        getListPromotion: (dataFilter) => dispatch(actions.getListPromotionRedux(dataFilter)),
        getListRepair: (dataFilter) => dispatch(actions.getListRepairRedux(dataFilter)),

        editListProduct: (id, data) => dispatch(actions.editListProductRedux(id, data)),
        getListProduct: (dataFilter) => dispatch(actions.getListProductRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));