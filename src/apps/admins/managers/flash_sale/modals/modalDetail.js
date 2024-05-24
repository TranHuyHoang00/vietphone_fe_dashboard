import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13 } from '@components/displays/line13';
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
        let data_flash_sale = this.props.data_flash_sale;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHI TIẾT" open={this.props.modalDetail}
                onCancel={() => this.props.openModal("detail", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => this.props.openModal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <Spin spinning={isLoading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {textLine13('Tên flash sale', data_flash_sale.name)}
                        {textLine13('Ngày bắt đầu', moment(data_flash_sale.start_time).format('HH:mm DD/MM/YYYY '))}
                        {textLine13('Ngày kết thúc', moment(data_flash_sale.end_time).format('HH:mm DD/MM/YYYY '))}
                        {textLine13('Trạng thái', (data_flash_sale && data_flash_sale.is_active ? 'Mở' : 'Khóa'))}
                        {textLine13('Mô tả', data_flash_sale.description)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sale: state.flash_sale.data_flash_sale,
        isLoading: state.flash_sale.isLoading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
