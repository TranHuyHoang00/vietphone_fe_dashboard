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
        let data_brand = this.props.data_brand;
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
                        {imageLine13('Ảnh', data_brand.image, 100, 50)}
                        {textLine13('Tên danh mục', data_brand.name)}
                        {textLine13('Icon', data_brand.icon)}
                        {textLine13('Mô tả', data_brand.description)}
                        {textLine13('Trạng thái', (data_brand && data_brand.is_active ? 'Mở' : 'Khóa'))}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_brand: state.brand.data_brand,
        isLoading: state.brand.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
