import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Collapse } from 'antd';
import CardAttributeValue from '../../../cards/card_attribute_value';
class variant_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Collapse defaultActiveKey={['1']} >
                <Collapse.Panel header="Thông số kĩ thuật" key="1">
                    <CardAttributeValue
                        is_edit={this.props.is_edit}
                        type_handle={'variant'}
                        data_attributes={this.props.data_variant.attribute_values}
                        handle_onchange_input={this.props.on_change_variant}
                        variant_attribute_group={this.props.data_product.variant_attribute_group} />
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        is_edit: state.variant.is_edit,
        data_variant: state.variant.data_variant,
        data_product: state.product.data_product,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_variant: (event, id, type) => dispatch(actions.on_change_variant_redux(event, id, type)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_attribute_value));
