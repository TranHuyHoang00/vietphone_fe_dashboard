import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        let data_group_attribute = this.props.data_group_attribute;
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
                    {text_line_1_3('Tên loại thông số', data_group_attribute.name)}
                    {text_line_1_3('Mô tả', data_group_attribute.description)}
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);