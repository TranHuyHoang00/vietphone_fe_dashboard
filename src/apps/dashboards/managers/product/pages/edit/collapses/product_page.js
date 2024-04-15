import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Collapse, Input, Spin, Button, message } from 'antd';

class product_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.set_data_product_page({});
        if (this.props.match && this.props.match.params) {
            let product_id = this.props.match.params.id;
            if (product_id) { this.props.get_product_page(product_id); }
        }
    }
    handle_delete = () => {
        let data_product_page = this.props.data_product_page;
        if (data_product_page && data_product_page.id) {
            this.props.delete_list_product_page([data_product_page.id]);
            if (this.props.is_result) {
                this.props.set_data_product_page({});
            }
        } else {
            message.error('Không có bài để xóa');
            return;
        }
    }
    render() {
        let data_product_page = this.props.data_product_page;
        return (
            <Collapse defaultActiveKey={['1']} >
                <Collapse.Panel header="Sản phẩm trên Website" key="1"
                    extra={<Button onClick={() => this.handle_delete()} className='bg-[#e94138] text-white' disabled={!this.props.is_edit}>Xóa bài</Button>}>
                    <Spin spinning={this.props.is_loading}>
                        <div className='space-y-[5px]'>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Tiêu đề</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={data_product_page.title} width={'100%'} disabled={!this.props.is_edit}
                                        onChange={(event) => this.props.on_change_product_page(event.target.value, 'title')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Slug</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={data_product_page.slug} width={'100%'} disabled={!this.props.is_edit}
                                        onChange={(event) => this.props.on_change_product_page(event.target.value, 'slug')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Mô tả</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <textarea className='w-full border p-[5px]' rows={4} value={data_product_page.search_description} width={'100%'} disabled={!this.props.is_edit}
                                        onChange={(event) => this.props.on_change_product_page(event.target.value, 'search_description')} />
                                </div>
                            </div>
                        </div>
                    </Spin>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_product_page: state.product_page.data_product_page,
        is_loading: state.product_page.is_loading,
        is_edit: state.product.is_edit,
        is_result: state.tag.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_product_page: (id) => dispatch(actions.get_product_page_redux(id)),
        on_change_product_page: (id, value) => dispatch(actions.on_change_product_page_redux(id, value)),
        set_data_product_page: (id) => dispatch(actions.set_data_product_page_redux(id)),
        delete_list_product_page: (id) => dispatch(actions.delete_list_product_page_redux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_page));