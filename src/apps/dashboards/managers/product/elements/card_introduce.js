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
    async componentDidUpdate(prevProps) {
        if (prevProps.data_product !== this.props.data_product) {
            this.setState({ data_product: this.props.data_product });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_product };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_product: {
                ...copyState
            }
        });
    }
    onclick_edit = async () => {
        this.props.handle_active(1);
        if (this.state.is_edit == true) {
            this.props.handle_edit(this.state.data_product);
            this.props.handle_active(0);
            this.setState({ is_edit: false });
        } else {
            this.setState({ is_edit: true });
        }
    }
    render() {
        let is_active = this.props.is_active;
        let data_product = this.state.data_product;
        let is_edit = this.state.is_edit;
        return (
            <>
                <Spin size='large' spinning={(is_active == 0 || is_active == 1) ? false : true}>
                    <Card title="Thông tin sản phẩm"
                        extra={
                            <>
                                {is_active == 1 &&
                                    <Button onClick={() => { this.props.handle_active(0); this.setState({ is_edit: false }) }}
                                        className='bg-[#e94138] text-white '>
                                        Hủy
                                    </Button>
                                }
                                <Button onClick={() => this.onclick_edit()}
                                    className='bg-[#0e97ff] text-white '>
                                    {this.state.is_edit == false ? 'Sửa' : 'Lưu'}
                                </Button>
                            </>
                        }>
                        <div className='space-y-[5px]'>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/4 flex items-center justify-between'>
                                    <span>Tên sản phẩm</span>
                                    <span>:</span>
                                </div>
                                <div className='w-3/4'>
                                    <Input disabled={!is_edit} value={data_product.name}
                                        onChange={(event) => this.handle_onchange_input(event, "name", 'input')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/4 flex items-center justify-between'>
                                    <span>Slug</span>
                                    <span>:</span>
                                </div>
                                <div className='w-3/4'>
                                    <Input disabled={!is_edit} value={data_product.slug}
                                        onChange={(event) => this.handle_onchange_input(event, "slug", 'input')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/4 flex items-center justify-between'>
                                    <span>Thương hiệu</span>
                                    <span>:</span>
                                </div>
                                <div className='w-3/4'>
                                    <Select_brand is_edit={is_edit} handle_onchange_input={this.handle_onchange_input}
                                        product_brand={data_product.product_brand} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/4 flex items-center justify-between'>
                                    <span>Danh mục</span>
                                    <span>:</span>
                                </div>
                                <div className='w-3/4'>
                                    <Select_category is_edit={is_edit} handle_onchange_input={this.handle_onchange_input}
                                        categories={data_product.categories} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/4 flex items-center justify-between'>
                                    <span>Thẻ Tag</span>
                                    <span>:</span>
                                </div>
                                <div className='w-3/4'>
                                    <Select_tag is_edit={is_edit} handle_onchange_input={this.handle_onchange_input}
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
                                        onChange={(event) => this.handle_onchange_input(event, "is_active", 'select')}
                                        options={[
                                            { value: true, label: 'Hoạt động' },
                                            { value: false, label: 'Khóa' },
                                        ]} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </Spin>
            </>
        );
    }

}
export default withRouter(card_introduce);