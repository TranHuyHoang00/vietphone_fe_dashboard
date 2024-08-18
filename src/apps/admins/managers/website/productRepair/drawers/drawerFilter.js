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
            dataFilter: {
                page: 1,
                limit: process.env.REACT_APP_API_LIMIT
            }
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListBrand, getListTag, getListCategory } = this.props;
        await getListBrand(dataFilter);
        await getListTag(dataFilter);
        await getListCategory(dataFilter);
    }
    render() {

        const { dataFilterProductRepair, dataBrands, dataTags, dataCategorys, onChangePage, openDrawer, drawerFilter } = this.props;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <div className='space-y-[10px]'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilterProductRepair?.is_active} onChange={(event) => onChangePage(event.target.value, 'is_active')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Mở</Radio.Button>
                            <Radio.Button value={false}>Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Website</Typography.Text>
                        <Radio.Group value={dataFilterProductRepair?.has_page} onChange={(event) => onChangePage(event.target.value, 'has_page')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Đã đăng</Radio.Button>
                            <Radio.Button value={false}>Chưa đăng</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Nguồn</Typography.Text>
                        <Radio.Group value={dataFilterProductRepair?.source} onChange={(event) => onChangePage(event.target.value, 'source')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="sapo">Sapo</Radio.Button>
                            <Radio.Button value="web">Web</Radio.Button>
                            <Radio.Button value="repair">Sửa chữa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <FormSelectSingle name={'Loại sản phẩm'} variable={'category'} value={dataFilterProductRepair?.category}
                        important={false} width={'100%'}
                        options={[
                            { value: "", label: 'Tất cả' },
                            ...dataCategorys.map((item) => ({
                                label: item?.name,
                                value: item?.id,
                            }))]}
                        onChangeInput={onChangePage} />
                    <FormSelectSingle name={'Thương hiệu'} variable={'product_brand'} value={dataFilterProductRepair?.product_brand}
                        important={false} width={'100%'}
                        options={[
                            { value: "", label: 'Tất cả' },
                            ...dataBrands.map((item) => ({
                                label: item?.name,
                                value: item?.id,
                            }))]}
                        onChangeInput={onChangePage} />
                    <FormSelectSingle name={'Tag'} variable={'tag'} value={dataFilterProductRepair?.tag}
                        important={false} width={'100%'}
                        options={[
                            { value: "", label: 'Tất cả' },
                            ...dataTags.map((item) => ({
                                label: item?.name,
                                value: item?.id,
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
        getListBrand: (dataFilterProductRepair) => dispatch(actions.getListBrandRedux(dataFilterProductRepair)),
        getListTag: (dataFilterProductRepair) => dispatch(actions.getListTagRedux(dataFilterProductRepair)),
        getListCategory: (dataFilterProductRepair) => dispatch(actions.getListCategoryRedux(dataFilterProductRepair)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));