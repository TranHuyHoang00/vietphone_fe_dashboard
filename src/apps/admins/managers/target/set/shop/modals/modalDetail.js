import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13 } from '@components/displays/line13';
import { formatNumber } from '@utils/handleFuncFormat';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataTargetShop, isLoading, modalDetail, openModal } = this.props;
        return (
            <Modal title="CHI TIẾT" open={modalDetail}
                onCancel={() => openModal("detail", false)} width={400}
                footer={[
                    <Button onClick={() => openModal("detail", false)}
                        className='bg-[#e94138] text-white'>
                        Hủy bỏ
                    </Button>
                ]}>
                <Spin spinning={isLoading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {textLine13('Cửa hàng', dataTargetShop?.shop?.name)}
                        {textLine13('Target', `${formatNumber(dataTargetShop?.value)}đ`)}
                        {textLine13('Thời gian', dataTargetShop?.month)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargetShop: state.targetShop.dataTargetShop,
        isLoading: state.targetShop.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
