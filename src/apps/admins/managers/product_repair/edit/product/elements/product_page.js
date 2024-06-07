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
        const { setDataProductPage, match, getDataProductPage } = this.props;
        setDataProductPage({});
        if (match && match.params) {
            const productId = match.params.id;
            if (productId) { getDataProductPage(productId); }
        }
    }
    handleDelete = () => {
        const { dataProductPage, deleteListProductPage, isResult, setDataProductPage } = this.props;
        if (dataProductPage && dataProductPage.id) {
            deleteListProductPage([dataProductPage.id]);
            if (isResult) {
                setDataProductPage({});
            }
        }
    }
    render() {
        const { dataProductPage, isLoading, onChangeProductPage, isEdit } = this.props;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Sản phẩm trên Website" key="1"
                    extra={<Button onClick={() => this.handleDelete()} className='bg-[#e94138] text-white' disabled={(isEdit && dataProductPage?.id) ? false : true}>Xóa bài</Button>}>
                    <Spin spinning={isLoading}>
                        <div className='space-y-[5px]'>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Tiêu đề</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={dataProductPage.title} width={'100%'} disabled={!isEdit}
                                        onChange={(event) => onChangeProductPage(event.target.value, 'title')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Slug</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={dataProductPage.slug} width={'100%'} disabled={!isEdit}
                                        onChange={(event) => onChangeProductPage(event.target.value, 'slug')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Mô tả</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <textarea className='w-full border p-[5px]' rows={4} value={dataProductPage.search_description} width={'100%'} disabled={!isEdit}
                                        onChange={(event) => onChangeProductPage(event.target.value, 'search_description')} />
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px]'>
                                <div className='w-1/3 flex items-center justify-between'>
                                    <span>Keyword</span>
                                    <span>:</span>
                                </div>
                                <div className='w-2/3'>
                                    <Input value={dataProductPage.keywords} width={'100%'} disabled={!isEdit}
                                        onChange={(event) => onChangeProductPage(event.target.value, 'keywords')} />
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
        onChangeProductPage: (id, value) => dispatch(actions.onChangeProductPageRedux(id, value)),
        setDataProductPage: (id) => dispatch(actions.setDataProductPageRedux(id)),
        deleteListProductPage: (id) => dispatch(actions.deleteListProductPageRedux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_page));
