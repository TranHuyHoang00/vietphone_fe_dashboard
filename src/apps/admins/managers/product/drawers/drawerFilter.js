import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Drawer, Typography, Radio } from 'antd';
import FormSelectSingle from '@components/selects/formSelectSingle'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListBrand, getListTag, getListCategory } = this.props;
        await getListBrand({ page: 1, limit: 100, search: '' });
        await getListTag({ page: 1, limit: 100, search: '' });
        await getListCategory({ page: 1, limit: 100, search: '' });
    }
    render() {

        const { dataFilter, dataBrands, dataTags, dataCategorys, onChangePage, openDrawer, drawerFilter } = this.props;
        return (
            <Drawer title="Bộ lọc nâng cao" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <div className='space-y-[10px]'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter.is_active} onChange={(event) => onChangePage(event.target.value, 'is_active')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Mở</Radio.Button>
                            <Radio.Button value={false}>Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Website</Typography.Text>
                        <Radio.Group value={dataFilter.has_page} onChange={(event) => onChangePage(event.target.value, 'has_page')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Đã đăng</Radio.Button>
                            <Radio.Button value={false}>Chưa đăng</Radio.Button>
                        </Radio.Group>
                    </div>
                    <FormSelectSingle name={'Loại sản phẩm'} variable={'category'} value={dataFilter.category}
                        important={false} width={'100%'}
                        options={[
                            { value: "", label: 'Tất cả' },
                            ...dataCategorys.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))]}
                        onChangeInput={onChangePage} />
                    <FormSelectSingle name={'Thương hiệu'} variable={'product_brand'} value={dataFilter.product_brand}
                        important={false} width={'100%'}
                        options={[
                            { value: "", label: 'Tất cả' },
                            ...dataBrands.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))]}
                        onChangeInput={onChangePage} />
                    <FormSelectSingle name={'Tag'} variable={'tag'} value={dataFilter.tag}
                        important={false} width={'100%'}
                        options={[
                            { value: "", label: 'Tất cả' },
                            ...dataTags.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))]}
                        onChangeInput={onChangePage} />
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
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListBrand: (dataFilter) => dispatch(actions.getListBrandRedux(dataFilter)),
        getListTag: (dataFilter) => dispatch(actions.getListTagRedux(dataFilter)),
        getListCategory: (dataFilter) => dispatch(actions.getListCategoryRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));