import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Input, Button, Spin, Card } from 'antd';
import Select_brand from './select_brand';
import Select_category from './select_category';
import Select_tag from './select_tag';
class card_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_edit: false,
            data_product: [],
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_product = this.props.data_product;
        let is_edit = this.props.is_edit;
        return (
            <>
                <div className='space-y-[5px]'>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/4 flex items-center justify-between'>
                            <span>Tên sản phẩm</span>
                            <span>:</span>
                        </div>
                        <div className='w-3/4'>
                            <Input disabled={!is_edit} value={data_product.name}
                                onChange={(event) => this.props.handle_onchange_input(event, "name", 'input')} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/4 flex items-center justify-between'>
                            <span>Thương hiệu</span>
                            <span>:</span>
                        </div>
                        <div className='w-3/4'>
                            <Select_brand is_edit={is_edit} handle_onchange_input={this.props.handle_onchange_input}
                                product_brand={data_product.product_brand} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/4 flex items-center justify-between'>
                            <span>Danh mục</span>
                            <span>:</span>
                        </div>
                        <div className='w-3/4'>
                            <Select_category is_edit={is_edit} handle_onchange_input={this.props.handle_onchange_input}
                                categories={data_product.categories} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/4 flex items-center justify-between'>
                            <span>Thẻ Tag</span>
                            <span>:</span>
                        </div>
                        <div className='w-3/4'>
                            <Select_tag is_edit={is_edit} handle_onchange_input={this.props.handle_onchange_input}
                                tags={data_product.tags} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/4 flex items-center justify-between'>
                            <span>Trạng thái</span>
                            <span>:</span>
                        </div>
                        <div className='w-3/4'>
                            <Select disabled={!is_edit} style={{ width: '100%' }} value={data_product.is_active}
                                onChange={(event) => this.props.handle_onchange_input(event, "is_active", 'select')}
                                options={[
                                    { value: true, label: 'Hoạt động' },
                                    { value: false, label: 'Khóa' },
                                ]} />
                        </div>
                    </div>
                </div>

            </>
        );
    }

}
export default withRouter(card_introduce);