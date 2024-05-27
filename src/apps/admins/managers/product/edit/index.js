import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Spin } from 'antd';
import Product from './product/index';
import Variant from './variant/index';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let product_id = this.props.match.params.id;
            if (product_id) { this.props.getDataProduct(product_id); }
        }
    }
    handle_go_back = () => {
        this.props.history.push(`/admin/manager/product`)
    }
    render() {
        let dataProduct = this.props.dataProduct;
        return (
            <Spin size='large' spinning={this.props.isLoading}>
                <div className='p-[10px] space-y-[10px]'>
                    <Button onClick={() => this.handle_go_back()}
                        className='bg-[#e94138] text-white'>
                        Quay lại
                    </Button>
                    <Product />
                    <Variant data_variant_ids={dataProduct.variants} />
                </div>
            </Spin>
        );
    }

}

const mapStateToProps = state => {
    return {
        dataProduct: state.product.dataProduct,
        isLoading: state.product.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
