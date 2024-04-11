import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { text_line_1_3 } from '../../../components/displays/data_line_1_3';
import moment from 'moment';

class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_flash_sale = this.props.data_flash_sale;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="CHI TIẾT" open={this.props.modal_detail}
                onCancel={() => this.props.open_modal("detail", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <Spin spinning={is_loading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {text_line_1_3('Tên flash sale', data_flash_sale.name)}
                        {text_line_1_3('Ngày bắt đầu', moment(data_flash_sale.start_time).format('HH:mm DD/MM/YYYY '))}
                        {text_line_1_3('Ngày kết thúc', moment(data_flash_sale.end_time).format('HH:mm DD/MM/YYYY '))}
                        {text_line_1_3('Trạng thái', (data_flash_sale && data_flash_sale.is_active ? 'Mở' : 'Khóa'))}
                        {text_line_1_3('Mô tả', data_flash_sale.description)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sale: state.flash_sale.data_flash_sale,
        is_loading: state.flash_sale.is_loading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
