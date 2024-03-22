import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { table_line_1_3, image_line_1_3 } from '../../../components/table/table_line';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_tag = this.props.data_tag;
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
                    {image_line_1_3('Ảnh', data_tag.image, 50, 50)}
                    {table_line_1_3('Tên Tag', data_tag.name)}
                    {table_line_1_3('Icon', data_tag.icon)}
                    {table_line_1_3('Mô tả', data_tag.description)}
                    {table_line_1_3('Trạng thái', (data_tag && data_tag.is_active == true ? 'Mở' : 'Khóa'))}
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);