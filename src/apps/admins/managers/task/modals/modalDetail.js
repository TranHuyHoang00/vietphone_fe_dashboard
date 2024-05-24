import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13 } from '@components/displays/line13';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_task = this.props.data_task;
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
                        {textLine13('Id', data_task.task_id)}
                        {textLine13('Tên', data_task.task_name)}
                        {textLine13('Ngày tạo', data_task.date_done)}
                        {textLine13('Trạng thái', data_task.status)}
                        {textLine13('Kết quả', data_task.result)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_task: state.task.data_task,
        isLoading: state.task.isLoading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
