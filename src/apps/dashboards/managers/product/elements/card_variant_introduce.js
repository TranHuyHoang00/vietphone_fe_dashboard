import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { table_line_1_3 } from '../../../components/table/table_line';
import { format_money } from '../../../../../utils/format_money';
class card_variant_introduce extends Component {
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
                    {table_line_1_3('Tên phiên bản', data_variant.name)}
                    {table_line_1_3('Mã SKU', data_variant.sku)}
                    {table_line_1_3('Mã Barcode', data_variant.barcode)}
                    {table_line_1_3('Giá gốc', `${format_money(data_variant.regular_price)} vnđ`)}
                    {table_line_1_3('Giảm giá', `${format_money(data_variant.discount_price)} vnđ`)}
                    {table_line_1_3('Số lượng', `${data_variant.quantity} cái`)}
                </div>
            </>
        );
    }

}
export default withRouter(card_variant_introduce);