import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import Product_media from '../../../elements/product_media';
import { Collapse } from 'antd';

class product_media extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        return (
            <Collapse >
                <Collapse.Panel header="Hình ảnh sản phẩm" key="1">
                    <Product_media is_edit={this.props.is_edit} data_product={this.props.data_product}
                        handle_get_media={this.props.handle_get_media} />
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_product: state.product.data_product,
        is_edit: state.product.is_edit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_product: (event, id, type) => dispatch(actions.on_change_product_redux(event, id, type)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_media));