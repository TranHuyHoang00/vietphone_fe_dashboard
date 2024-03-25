import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { text_line_1_3 } from '../../../components/displays/data_line_1_3';
import { format_money } from '../../../../../utils/format_money';
class variant_introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_variant: {},
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate() {
    }
    render() {
        let data_variant = this.props.data_variant;
        return (
            <>
                <div className='space-y-[5px]'>
                    {text_line_1_3('Tên phiên bản', data_variant.name)}
                    {text_line_1_3('Mã SKU', data_variant.sku)}
                    {text_line_1_3('Mã Barcode', data_variant.barcode)}
                    {text_line_1_3('Giá gốc', `${format_money(data_variant.regular_price)} vnđ`)}
                    {text_line_1_3('Giảm giá', `${format_money(data_variant.discount_price)} vnđ`)}
                    {text_line_1_3('Số lượng', `${data_variant.quantity} cái`)}
                </div>
            </>
        );
    }

}
export default withRouter(variant_introduce);