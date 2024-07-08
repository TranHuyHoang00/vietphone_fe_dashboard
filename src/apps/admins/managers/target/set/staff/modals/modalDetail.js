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
        const { dataTargetStaff, isLoading, modalDetail, openModal } = this.props;
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
                        {textLine13('Nhân viên', dataTargetStaff?.staff?.name)}
                        {textLine13('Target', `${formatNumber(dataTargetStaff.value)}đ`)}
                        {textLine13('Thời gian', dataTargetStaff.month)}
                        {dataTargetStaff && dataTargetStaff.target_product_category && dataTargetStaff.target_product_category.length !== 0 &&
                            dataTargetStaff.target_product_category.map((item) => {
                                return (
                                    <div key={item?.id}>
                                        {textLine13(`${item?.product_category?.name}`, `${item?.quantity} cái - ${formatNumber(item?.value)}đ`)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargetStaff: state.targetStaff.dataTargetStaff,
        isLoading: state.targetStaff.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
