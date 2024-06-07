import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectSingle from '@components/selects/formSelectSingle';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: {
                page: 1,
                limit: 5,
                search: '',
                product_brand: '',
                tag: '',
                is_active: '',
                category: '',
                has_page: '',
                source: 'repair',
            },
        }
    }
    async componentDidMount() {
        const { setDataProduct } = this.props;
        setDataProduct({ source: "repair" });
    }
    validationData = (data) => {
        if (!data.source) {
            return { mess: "Không được bỏ trống 'Nguồn' ", check: false };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên sản phẩm' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataProduct, isResult, openModal, createProduct, setDataFilterProduct, getListProduct, setDataFilterState } = this.props;
        const { dataFilter } = this.state;
        const result = this.validationData(dataProduct);
        if (result.check) {
            await createProduct(dataProduct);
            if (isResult) {
                getListProduct(dataFilter);
                setDataFilterProduct(dataFilter);
                setDataFilterState(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataProduct, isLoading, onChangeProduct, modalCreate, openModal } = this.props;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Tên sản phẩm'} variable={'name'} value={dataProduct.name}
                            important={true}
                            onChangeInput={onChangeProduct} />
                        <FormSelectSingle name={'Nguồn'} variable={'source'} value={dataProduct.source}
                            important={false} width={'100%'}
                            options={[
                                { value: 'repair', label: 'Sửa chữa' },
                            ]}
                            onChangeInput={onChangeProduct} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataProduct: state.product.dataProduct,
        isLoading: state.product.isLoading,
        isResult: state.product.isResult,
        dataFilter: state.product.dataFilter,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProduct: (dataFilter) => dispatch(actions.getListProductRedux(dataFilter)),
        createProduct: (data) => dispatch(actions.createProductRedux(data)),
        onChangeProduct: (id, value) => dispatch(actions.onChangeProductRedux(id, value)),
        setDataProduct: (id) => dispatch(actions.setDataProductRedux(id)),
        setDataFilterProduct: (data) => dispatch(actions.setDataFilterProductRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));