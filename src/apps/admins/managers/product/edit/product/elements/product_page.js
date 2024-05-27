import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Input, Spin, Button } from 'antd';

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
            if (product_id) { this.props.getDataProductPage(product_id); }
        }
    }
    handle_delete = () => {
        let dataProductPage = this.props.dataProductPage;
        if (dataProductPage && dataProductPage.id) {
            this.props.delete_list_product_page([dataProductPage.id]);
            if (this.props.isResult) {
                this.props.set_data_product_page({});
            }
        }
    }
    render() {
        let dataProductPage = this.props.dataProductPage;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Sản phẩm trên Website" key="1"
                    extra={<Button onClick={() => this.handle_delete()} className='bg-[#e94138] text-white' disabled={(this.props.isEdit === true && dataProductPage?.id) ? false : true}>Xóa bài</Button>}>
                    <Spin spinning={this.props.isLoading}>
                        <div className='space-y-[5px]'>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Tiêu đề</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={dataProductPage.title} width={'100%'} disabled={!this.props.isEdit}
                                        onChange={(event) => this.props.on_change_product_page(event.target.value, 'title')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Slug</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={dataProductPage.slug} width={'100%'} disabled={!this.props.isEdit}
                                        onChange={(event) => this.props.on_change_product_page(event.target.value, 'slug')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Mô tả</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <textarea className='w-full border p-[5px]' rows={4} value={dataProductPage.search_description} width={'100%'} disabled={!this.props.isEdit}
                                        onChange={(event) => this.props.on_change_product_page(event.target.value, 'search_description')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Keyword</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={dataProductPage.keywords} width={'100%'} disabled={!this.props.isEdit}
                                        onChange={(event) => this.props.on_change_product_page(event.target.value, 'keywords')} />
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
        dataProductPage: state.product_page.dataProductPage,
        isLoading: state.product_page.isLoading,
        isEdit: state.product.isEdit,
        isResult: state.tag.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataProductPage: (id) => dispatch(actions.getDataProductPageRedux(id)),
        on_change_product_page: (id, value) => dispatch(actions.onChangeProductPageRedux(id, value)),
        set_data_product_page: (id) => dispatch(actions.setDataProductPageRedux(id)),
        delete_list_product_page: (id) => dispatch(actions.deleteListProductPageRedux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_page));
