import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, message, Spin } from 'antd';
import { get_product } from '../../../../../services/product_service';
import Card_product from '../cards/card_product';
import Card_variant from '../cards/card_variant';
class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: null,
            data_product: [],
            is_loading: false,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let product_id = this.props.match.params.id;
            if (product_id) {
                this.get_product(product_id);
                this.setState({ product_id: product_id });
            }
        }
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_product = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_product(id);
            if (data && data.data && data.data.success == 1) {
                let data_product = data.data.data;
                this.setState({ data_product: data_product });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }

    }

    render() {
        let data_product = this.state.data_product;
        return (
            <Spin size='large' spinning={this.state.is_loading}>
                <div className='mx-[10px]'>
                    <Button onClick={() => this.props.history.goBack()}
                        className='bg-[#e94138] text-white'>
                        Quay lại
                    </Button>
                </div>

                <Card_product get_product={this.get_product} data_product={data_product}
                    handle_loading={this.handle_loading} />

                <Card_variant get_product={this.get_product} data_variant={data_product.variants}
                    handle_loading={this.handle_loading} product_id={this.state.product_id}
                    variant_attribute_group={this.state.data_product.variant_attribute_group} />
            </Spin>
        );
    }

}
export default withRouter(edit);
