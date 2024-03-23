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
        let data_attribute_value = this.props.data_attribute_value;
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
                    {text_line_1_3('Giá trị', data_attribute_value.value)}
                    {text_line_1_3('Mô tả', data_attribute_value.description)}
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);