import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions';
import { Button, Spin } from 'antd';
import Product from './elements/product';
import Variant from './elements/variant';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let product_id = this.props.match.params.id;
            if (product_id) { this.props.get_product(product_id); }
        }
    }
    render() {
        return (
            <Spin size='large' spinning={this.props.is_loading}>
                <div className='p-[10px] space-y-[10px]'>
                    <Button onClick={() => this.props.history.goBack()}
                        className='bg-[#e94138] text-white'>
                        Quay lại
                    </Button>
                    <Product />
                    <Variant data_variants={this.props.data_product.variants} />
                </div>
            </Spin>
        );
    }

}

const mapStateToProps = state => {
    return {
        data_product: state.product.data_product,
        is_loading: state.product.is_loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_product: (id) => dispatch(actions.get_product_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
