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
        const { getDataProduct, match } = this.props;
        if (match && match.params) {
            const productId = match.params.id;
            if (productId) { getDataProduct(productId); }
        }
    }
    goBackHome = () => {
        const { address } = this.props.location.state;
        switch (address) {
            case 'product_repair':
                this.props.history.push(`/admin/manager/website/product_repair`);
                break;
            case 'product':
                this.props.history.push(`/admin/manager/website/product`);
                break;
            default:
                break;
        }
    }
    render() {
        const { isLoading, dataProduct } = this.props;
        return (
            <Spin size='large' spinning={isLoading}>
                <div className='p-[10px] space-y-[10px]'>
                    <Button onClick={() => this.goBackHome()}
                        className='bg-[#e94138] text-white'>
                        Quay lại
                    </Button>
                    <Product />
                    <Variant dataVariantIds={dataProduct?.variants} />
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
