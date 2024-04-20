import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Typography, Radio } from 'antd';
import FormSelectInput from '@components/selects/form_select_input'
class drawer_filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_filter = this.props.data_filter;
        let data_brands = [{ name: 'TẤT CẢ', id: '' }, ...this.props.data_brands];
        let data_tags = [{ name: 'TẤT CẢ', id: '' }, ...this.props.data_tags];
        let data_categorys = [{ name: 'TẤT CẢ', id: '' }, ...this.props.data_categorys];

        return (
            <Drawer title="Bộ lọc nâng cao" onClose={() => this.props.open_drawer('filter', false)} open={this.props.drawer_filter}>
                <div className='space-y-[10px]'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={data_filter.is_active} onChange={(event) => this.props.onchange_page(event.target.value, 'is_active')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Mở</Radio.Button>
                            <Radio.Button value={false}>Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Website</Typography.Text>
                        <Radio.Group value={data_filter.has_page} onChange={(event) => this.props.onchange_page(event.target.value, 'has_page')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Đã đăng</Radio.Button>
                            <Radio.Button value={false}>Chưa đăng</Radio.Button>
                        </Radio.Group>
                    </div>
                    <FormSelectInput name={'Loại sản phẩm'} variable={'category'} value={data_filter.category}
                        important={false} width={'100%'}
                        options={data_categorys.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        handle_onchange_input={this.props.onchange_page} />
                    <FormSelectInput name={'Thương hiệu'} variable={'product_brand'} value={data_filter.product_brand}
                        important={false} width={'100%'}
                        options={data_brands.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        handle_onchange_input={this.props.onchange_page} />
                    <FormSelectInput name={'Tag'} variable={'tag'} value={data_filter.tag}
                        important={false} width={'100%'}
                        options={data_tags.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        handle_onchange_input={this.props.onchange_page} />
                </div>
            </Drawer>
        );
    }

}
export default withRouter(drawer_filter);