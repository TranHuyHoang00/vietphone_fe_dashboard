import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Typography, Radio } from 'antd';
import FormSelectInput from '@components/selects/formSelectInput'
class drawer_filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let dataFilter = this.props.dataFilter;
        let dataBrands = [{ name: 'TẤT CẢ', id: '' }, ...this.props.dataBrands];
        let dataTags = [{ name: 'TẤT CẢ', id: '' }, ...this.props.dataTags];
        let dataCategorys = [{ name: 'TẤT CẢ', id: '' }, ...this.props.dataCategorys];

        return (
            <Drawer title="Bộ lọc nâng cao" onClose={() => this.props.open_drawer('filter', false)} open={this.props.drawer_filter}>
                <div className='space-y-[10px]'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter.is_active} onChange={(event) => this.props.onChangePage(event.target.value, 'is_active')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Mở</Radio.Button>
                            <Radio.Button value={false}>Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Website</Typography.Text>
                        <Radio.Group value={dataFilter.has_page} onChange={(event) => this.props.onChangePage(event.target.value, 'has_page')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Đã đăng</Radio.Button>
                            <Radio.Button value={false}>Chưa đăng</Radio.Button>
                        </Radio.Group>
                    </div>
                    <FormSelectInput name={'Loại sản phẩm'} variable={'category'} value={dataFilter.category}
                        important={false} width={'100%'}
                        options={dataCategorys.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        onChangeInput={this.props.onChangePage} />
                    <FormSelectInput name={'Thương hiệu'} variable={'product_brand'} value={dataFilter.product_brand}
                        important={false} width={'100%'}
                        options={dataBrands.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        onChangeInput={this.props.onChangePage} />
                    <FormSelectInput name={'Tag'} variable={'tag'} value={dataFilter.tag}
                        important={false} width={'100%'}
                        options={dataTags.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        onChangeInput={this.props.onChangePage} />
                </div>
            </Drawer>
        );
    }

}
export default withRouter(drawer_filter);