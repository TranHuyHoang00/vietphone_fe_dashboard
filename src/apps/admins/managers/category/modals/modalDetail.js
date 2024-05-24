import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13, imageLine13 } from '@components/displays/line13';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_category = this.props.data_category;
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
                        {imageLine13('Ảnh', data_category.image, 50, 50)}
                        {textLine13('Tên danh mục', data_category.name)}
                        {textLine13('Icon', data_category.icon)}
                        {textLine13('Mô tả', data_category.description)}
                        {textLine13('Trạng thái', (data_category && data_category.is_active ? 'Mở' : 'Khóa'))}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_category: state.category.data_category,
        isLoading: state.category.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
