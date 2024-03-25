import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Input } from 'antd';
import Select_brand from '../components/selects/select_brand';
import Select_category from '../components/selects/select_category';
import Select_tag from '../components/selects/select_tag';
import Select_variant_attribute_group from '../components/selects/select_variant_attribute_group.js';
import { text_line_1_3 } from '../../../components/displays/data_line_1_3';
class product_introduce extends Component {
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
                    {text_line_1_3('Tên sản phẩm', data_product.name)}

                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/3 flex items-center justify-between'>
                            <span>Thương hiệu</span>
                            <span>:</span>
                        </div>
                        <div className='w-2/3'>
                            <Select_brand is_edit={is_edit} handle_onchange_input={this.props.handle_onchange_input}
                                product_brand={data_product.product_brand} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/3 flex items-center justify-between'>
                            <span>Danh mục</span>
                            <span>:</span>
                        </div>
                        <div className='w-2/3'>
                            <Select_category is_edit={is_edit} handle_onchange_input={this.props.handle_onchange_input}
                                categories={data_product.categories} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/3 flex items-center justify-between'>
                            <span>Thẻ Tag</span>
                            <span>:</span>
                        </div>
                        <div className='w-2/3'>
                            <Select_tag is_edit={is_edit} handle_onchange_input={this.props.handle_onchange_input}
                                tags={data_product.tags} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/3 flex items-center justify-between'>
                            <span>Trạng thái</span>
                            <span>:</span>
                        </div>
                        <div className='w-2/3'>
                            <Select disabled={!is_edit} style={{ width: '100%' }} value={data_product.is_active}
                                onChange={(event) => this.props.handle_onchange_input(event, "is_active", 'select')}
                                options={[
                                    { value: true, label: 'Hoạt động' },
                                    { value: false, label: 'Khóa' },
                                ]} />
                        </div>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-1/3 flex items-center justify-between'>
                            <span>Loại sản phẩm</span>
                            <span>:</span>
                        </div>
                        <div className='w-2/3'>
                            <Select_variant_attribute_group is_edit={is_edit} handle_onchange_input={this.props.handle_onchange_input}
                                value={data_product.variant_attribute_group} />
                        </div>
                    </div>
                </div>

            </>
        );
    }

}
export default withRouter(product_introduce);