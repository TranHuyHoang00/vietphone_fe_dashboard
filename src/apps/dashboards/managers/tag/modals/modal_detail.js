import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
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
                    {text_line_1_3('Tên danh mục', data_tag.name)}
                    {text_line_1_3('Icon', data_tag.icon)}
                    {text_line_1_3('Mô tả', data_tag.description)}
                    {text_line_1_3('Trạng thái', (data_tag && data_tag.is_active == true ? 'Mở' : 'Khóa'))}
                </div>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_tag: state.tag.data_tag,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
