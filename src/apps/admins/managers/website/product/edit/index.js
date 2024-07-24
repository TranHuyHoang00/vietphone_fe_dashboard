import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Spin, Modal } from 'antd';
import Product from './product/index';
import Variant from './variant/index';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getDataProduct, match, setIsEditProduct, setIsEditVariant } = this.props;
        if (match && match.params) {
            const productId = match.params.id;
            if (productId) {
                await getDataProduct(productId);
                await setIsEditProduct(false);
                await setIsEditVariant(false);
            }
        }
    }
    goBackHome = () => {
        const { address } = this.props.location.state;
        const { clickEditProduct, clicEditVariant } = this.props;
        if (this.props.isEditPRD) { clickEditProduct(); }
        if (this.props.isEditVRA) { clicEditVariant(); }
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
    onCLickBack = () => {
        if (this.props.isEditVariant || this.props.isEditProduct) {
            confirm({
                title: 'Cảnh báo.Tác vụ chưa được lưu !!!',
                icon: <ExclamationCircleFilled />,
                content: 'Bạn có chắc chắn muốn thoát ?',
                okText: 'Trở lại',
                cancelText: 'Vẫn thoát',
                okType: 'default',
                onOk: () => {
                },
                onCancel: async () => {
                    this.goBackHome()
                },
            });
        } else {
            this.goBackHome()
        }

    }
    render() {
        const { isLoading, dataProduct } = this.props;
        return (
            <Spin size='large' spinning={isLoading}>
                <div className='p-[10px] space-y-[10px]'>
                    <Button onClick={() => this.onCLickBack()}
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
        isEditProduct: state.product.isEditProduct,
        isEditVariant: state.variant.isEditVariant,
        isEditPRD: state.product.isEdit,
        isEditVRA: state.variant.isEdit,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
        setIsEditProduct: (data) => dispatch(actions.setIsEditProductRedux(data)),
        setIsEditVariant: (data) => dispatch(actions.setIsEditVariantRedux(data)),
        clicEditVariant: (value) => dispatch(actions.clickEditVariantRedux(value)),
        clickEditProduct: (value) => dispatch(actions.clickEditProductRedux(value)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
