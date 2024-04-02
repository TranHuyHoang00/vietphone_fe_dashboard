import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, Button } from 'antd';
import { text_line_1_3 } from '../../../components/displays/data_line_1_3';

class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_task = this.props.data_task;
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
                <div className='border-t py-[10px] space-y-[5px]'>
                    {text_line_1_3('Id', data_task.task_id)}
                    {text_line_1_3('Tên', data_task.task_name)}
                    {text_line_1_3('Ngày tạo', data_task.date_done)}
                    {text_line_1_3('Trạng thái', data_task.status)}
                    {text_line_1_3('Kết quả', data_task.result)}
                </div>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_task: state.task.data_task,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
