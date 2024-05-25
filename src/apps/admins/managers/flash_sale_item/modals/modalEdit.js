import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modal/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        return { check: true };
    }
    handleEdit = async () => {
        let result = this.validationData(this.props.data_flash_sale_item);
        if (result.check) {
            let data_flash_sale_item = this.props.data_flash_sale_item;
            let data_flash_sale = this.props.data_flash_sale;
            await this.props.edit_flash_sale_item(data_flash_sale_item.id, data_flash_sale_item);
            let isResult = this.props.isResult;
            if (isResult) {
                await this.props.getDataFlashSale(data_flash_sale.id);
                this.props.openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_flash_sale_item = this.props.data_flash_sale_item;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modalEdit}
                onCancel={() => this.props.openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Giá khuyến mãi'} variable={'discount_price'} value={data_flash_sale_item.discount_price}
                            important={true}
                            onChangeInput={this.props.on_change_flash_sale_item}
                        />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sale_item: state.flash_sale_item.data_flash_sale_item,
        isLoading: state.flash_sale_item.isLoading,
        isResult: state.flash_sale_item.isResult,
        data_flash_sale: state.flash_sale.data_flash_sale,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        edit_flash_sale_item: (id, data) => dispatch(actions.edit_flash_sale_item_redux(id, data)),
        on_change_flash_sale_item: (id, value) => dispatch(actions.on_change_flash_sale_item_redux(id, value)),
        getDataFlashSale: (id) => dispatch(actions.getDataFlashSaleRedux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));