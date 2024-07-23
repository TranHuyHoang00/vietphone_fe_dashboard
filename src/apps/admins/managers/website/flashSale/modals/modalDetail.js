import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13, imageLine13 } from '@components/displays/line13';
import moment from 'moment';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataFlashSale, isLoading, modalDetail, openModal } = this.props;
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
                        {imageLine13('Ảnh', dataFlashSale?.image, 100, 50)}
                        {textLine13('Tên flash sale', dataFlashSale?.name)}
                        {textLine13('Ngày bắt đầu', moment(dataFlashSale?.start_time).format('HH:mm DD/MM/YYYY '))}
                        {textLine13('Ngày kết thúc', moment(dataFlashSale?.end_time).format('HH:mm DD/MM/YYYY '))}
                        {textLine13('Màu nền', dataFlashSale?.color)}
                        {textLine13('Trạng thái', (dataFlashSale?.is_active ? 'Mở' : 'Khóa'))}
                        {textLine13('Mô tả', dataFlashSale?.description)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataFlashSale: state.flashSale.dataFlashSale,
        isLoading: state.flashSale.isLoading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
