import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { text_line_1_3, image_line_1_3 } from '../../../components/displays/data_line_1_3';

class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_category = this.props.data_category;
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
                    {image_line_1_3('Ảnh', data_category.image, 50, 50)}
                    {text_line_1_3('Tên danh mục', data_category.name)}
                    {text_line_1_3('Icon', data_category.icon)}
                    {text_line_1_3('Mô tả', data_category.description)}
                    {text_line_1_3('Trạng thái', (data_category && data_category.is_active == true ? 'Mở' : 'Khóa'))}
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);